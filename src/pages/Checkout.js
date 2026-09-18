import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { supabase } from '../config/supabase';
import { trackPurchase, trackBeginCheckout } from '../utils/analytics';
import { trackPurchase as trackPurchaseSupabase } from '../utils/supabaseAnalytics';
import { sendOrderNotification } from '../utils/emailNotifier';
import { logger } from '../utils/logger';
import './Checkout.css';

// ─── Constants ────────────────────────────────────────────────────────────────
// Giveaway product identified by its stable DB id, not by name string.
const GIVEAWAY_PRODUCT_ID = 29;
const GIVEAWAY_CAP = 60;
const MAX_VOUCHER_DISCOUNT_PCT = 30; // hard cap — codes above 30% are clamped

// ─── Component ────────────────────────────────────────────────────────────────
const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bankTransfer',
    voucherCode: '',
  });

  // Voucher state
  const [voucherApplied, setVoucherApplied]         = useState(false);
  const [voucherDiscount, setVoucherDiscount]       = useState(0);
  const [voucherDiscountPct, setVoucherDiscountPct] = useState(0);
  const [voucherLoading, setVoucherLoading]         = useState(false);

  // Form state
  const [errors, setErrors]           = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [globalError, setGlobalError]   = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Totals (re-computed whenever voucher changes)
  const subtotal = getCartTotal();
  const discount = voucherApplied ? voucherDiscount : 0;
  const total    = Math.max(0, subtotal - discount);

  // ── Track begin-checkout once ─────────────────────────────────────────────
  useEffect(() => {
    if (cart.length > 0) {
      trackBeginCheckout(cart, total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Input handlers ────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Voucher validation (Supabase RPC) ─────────────────────────────────────
  //
  //  Idempotency: if the exact same code is already applied, clicking Apply
  //  again is a no-op — the state doesn't change.
  //
  //  One-per-order: once a voucher is applied the input is locked so a second
  //  code cannot be entered or applied for the same checkout session.
  //
  const handleVoucherApply = async () => {
    const code = formData.voucherCode.trim().toUpperCase();
    if (!code) return;

    // ── Idempotency: already applied the same code → no-op ──────────────────
    if (voucherApplied) return;

    setVoucherLoading(true);
    setErrors((prev) => ({ ...prev, voucherCode: '' }));

    try {
      const { data, error } = await supabase.rpc('validate_voucher', { p_code: code });

      if (error || data === null || data === undefined) {
        // code doesn't exist, is inactive, or is expired
        setErrors((prev) => ({ ...prev, voucherCode: 'Invalid or expired voucher code.' }));
        setVoucherApplied(false);
        setVoucherDiscount(0);
        setVoucherDiscountPct(0);
      } else {
        // Clamp to hard cap of 30%
        const pct = Math.min(parseFloat(data), MAX_VOUCHER_DISCOUNT_PCT);
        const discountAmount = Math.round(subtotal * pct / 100);
        setVoucherDiscount(discountAmount);
        setVoucherDiscountPct(pct);
        setVoucherApplied(true);
        setErrors((prev) => ({ ...prev, voucherCode: '' }));
      }
    } catch (err) {
      logger.error('[CHECKOUT] Voucher validation error:', err);
      setErrors((prev) => ({ ...prev, voucherCode: 'Could not validate code. Please try again.' }));
    } finally {
      setVoucherLoading(false);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherApplied(false);
    setVoucherDiscount(0);
    setVoucherDiscountPct(0);
    setFormData((prev) => ({ ...prev, voucherCode: '' }));
    setErrors((prev) => ({ ...prev, voucherCode: '' }));
  };

  // ── Form validation ───────────────────────────────────────────────────────
  const validateForm = () => {
    const e = {};
    if (!formData.name.trim())       e.name       = 'Name is required';
    if (!formData.email.trim())      e.email      = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email is invalid';
    if (!formData.phone.trim())      e.phone      = 'Phone is required';
    if (!formData.address.trim())    e.address    = 'Address is required';
    if (!formData.city.trim())       e.city       = 'City is required';
    if (!formData.postalCode.trim()) e.postalCode = 'Postal code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    logger.log('[CHECKOUT] Submission started');
    if (!validateForm()) { logger.log('[CHECKOUT] Validation failed'); return; }

    setIsSubmitting(true);
    setGlobalError('');

    try {
      // ── Giveaway inventory check (by stable product ID, not name) ──────────
      const giveawayItem = cart.find((item) => item.id === GIVEAWAY_PRODUCT_ID);
      if (giveawayItem) {
        logger.log('[CHECKOUT] Checking giveaway inventory cap…');
        const { data: totalGiveaways, error: rpcError } = await supabase.rpc('get_total_ordered', {
          p_name: 'giveaway',
        });
        if (!rpcError) {
          const orderedSoFar = parseInt(totalGiveaways || 0, 10);
          if (orderedSoFar + giveawayItem.quantity > GIVEAWAY_CAP) {
            const remaining = Math.max(0, GIVEAWAY_CAP - orderedSoFar);
            setGlobalError(
              `Sorry — Giveaway limited to ${GIVEAWAY_CAP} bottles. Only ${remaining} left.`
            );
            setIsSubmitting(false);
            return;
          }
        } else {
          logger.error('[CHECKOUT] Giveaway RPC error:', rpcError);
        }
      }

      // ── Generate order number ──────────────────────────────────────────────
      const orderNumber = `LEV-${Math.floor(100000 + Math.random() * 900000)}`;
      logger.log('[CHECKOUT] Order number:', orderNumber);

      // ── Insert order ───────────────────────────────────────────────────────
      const orderPayload = {
        order_number: orderNumber,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        customer_city: formData.city,
        customer_postal_code: formData.postalCode,
        payment_method: formData.paymentMethod,
        subtotal,
        discount_amount: discount,
        voucher_code: voucherApplied ? formData.voucherCode.trim().toUpperCase() : null,
        total,
        status: 'pending',
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single();

      if (orderError) throw orderError;
      logger.log('[CHECKOUT] Order created:', order.id);

      // ── Insert order items ─────────────────────────────────────────────────
      if (!order?.id) throw new Error('Order was not created properly');

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        product_size: item.size || '50ml',
        product_price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      // ── Analytics ──────────────────────────────────────────────────────────
      trackPurchase(orderNumber, total, cart);
      trackPurchaseSupabase({ order_number: orderNumber, total });

      // ── Success ────────────────────────────────────────────────────────────
      setOrderSuccess({ orderNumber, name: formData.name, total });
      clearCart();

      // Email notification (non-blocking)
      sendOrderNotification(
        {
          orderNumber,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          subtotal,
          discount,
          total,
          paymentMethod: formData.paymentMethod,
        },
        cart
      ).then((result) => {
        if (result.success) logger.log('[CHECKOUT] Admin email sent');
        else logger.warn('[CHECKOUT] Email failed (non-critical):', result.error);
      });
    } catch (err) {
      logger.error('[CHECKOUT] ERROR:', err.message);
      setGlobalError(
        `Order submission failed: ${err.message || 'Unknown error'}. Please try again or contact support.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Clipboard ─────────────────────────────────────────────────────────────
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 3000);
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 3000);
    });
  };

  const openWhatsApp = () => {
    const message =
      `Hi! I've placed an order on Levryn.\n\nOrder ID: ${orderSuccess.orderNumber}\nName: ${orderSuccess.name}\nTotal: Rs. ${orderSuccess.total.toLocaleString()}\n\nI've completed the bank transfer. Please confirm.`;
    window.open(`https://wa.me/923272332833?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ── Success page ──────────────────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <>
        <Helmet>
          <title>Order Successful — Levryn Perfumes</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="checkout-page">
          <div className="container">
            <div className="order-success-modal">
              <div className="success-icon">✓</div>
              <h1>Order Placed Successfully!</h1>
              <p className="order-number">Order Number: <strong>{orderSuccess.orderNumber}</strong></p>
              <p className="order-total">Total: <strong>Rs. {orderSuccess.total.toLocaleString()}</strong></p>
              <div className="success-instructions">
                <h3>Next Steps:</h3>
                <ol>
                  <li>Complete your bank transfer to the account details provided</li>
                  <li>Click the button below to send payment confirmation via WhatsApp</li>
                  <li>We'll process your order once payment is confirmed</li>
                </ol>
              </div>
              <div className="success-actions">
                <button onClick={openWhatsApp} className="btn btn-primary btn-lg">
                  Send WhatsApp Confirmation
                </button>
                <button onClick={() => navigate('/')} className="btn btn-secondary">
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout — Levryn Perfumes</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="checkout-page">
          <div className="container">
            <h1 className="page-title">Checkout</h1>
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => navigate('/products')} className="btn btn-primary">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Checkout form ─────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Checkout — Levryn Perfumes | Secure Payment</title>
        <meta name="description" content="Complete your Levryn perfume order. Secure checkout with bank transfer payment. Fast delivery across Pakistan." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="checkout-page">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          {globalError && (
            <div className="global-error-banner" role="alert">{globalError}</div>
          )}
          <div className="checkout-content">
            <div className="checkout-form-section">
              <form onSubmit={handleSubmit} className="checkout-form">

                {/* ── Shipping ── */}
                <section className="form-section">
                  <h2>Shipping Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'error' : ''} />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'error' : ''} />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? 'error' : ''} />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={errors.city ? 'error' : ''} />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code *</label>
                      <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className={errors.postalCode ? 'error' : ''} />
                      {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                    </div>
                  </div>
                </section>

                {/* ── Payment ── */}
                <section className="form-section">
                  <h2>Payment Method</h2>
                  <div className="payment-methods">
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="bankTransfer" checked={formData.paymentMethod === 'bankTransfer'} onChange={handleInputChange} />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                  {formData.paymentMethod === 'bankTransfer' && (
                    <div className="bank-details">
                      <h3>Bank Transfer Details</h3>
                      <div className="bank-info">
                        <div className="bank-account-row">
                          <div>
                            <p><strong>Account Number:</strong> 00857902268603</p>
                          </div>
                          <button type="button" onClick={() => copyToClipboard('00857902268603')} className="btn btn-sm btn-secondary copy-btn">
                            Copy
                          </button>
                        </div>
                        {copiedAccount && <div className="copy-toast">Account number copied to clipboard</div>}
                        <p><strong>Bank:</strong> HBL</p>
                        <p><strong>Account Holder:</strong> Salik Ahmed AA</p>
                      </div>
                      <p className="bank-note">Please complete your bank transfer and include your order number in the transfer reference.</p>
                    </div>
                  )}
                </section>

                {/* ── Voucher ── */}
                <section className="form-section">
                  <h2>Voucher Code</h2>
                  <div className="voucher-section">
                    {!voucherApplied ? (
                      <>
                        <div className="voucher-input-group">
                          <input
                            type="text"
                            name="voucherCode"
                            value={formData.voucherCode}
                            onChange={handleInputChange}
                            placeholder="Enter voucher code"
                            className={errors.voucherCode ? 'error' : ''}
                            style={{ textTransform: 'uppercase' }}
                          />
                          <button
                            type="button"
                            onClick={handleVoucherApply}
                            className="btn btn-secondary"
                            disabled={voucherLoading || !formData.voucherCode.trim()}
                          >
                            {voucherLoading ? 'Checking…' : 'Apply'}
                          </button>
                        </div>
                        {errors.voucherCode && (
                          <span className="error-message">{errors.voucherCode}</span>
                        )}
                      </>
                    ) : (
                      <div className="voucher-applied-banner">
                        <span>
                          ✓ <strong>{formData.voucherCode.toUpperCase()}</strong> — {voucherDiscountPct}% off applied
                          &nbsp;(saving Rs. {voucherDiscount.toLocaleString()})
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={handleRemoveVoucher}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </section>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-order-btn">
                  {isSubmitting ? 'Processing…' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* ── Order summary ── */}
            <div className="order-summary-section">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-quantity">{item.quantity} × {item.price.toLocaleString()}</span>
                      </div>
                      <span className="order-item-total">{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="total-row"><span>Subtotal:</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                  {voucherApplied && (
                    <div className="total-row discount">
                      <span>Discount ({voucherDiscountPct}%):</span>
                      <span>−Rs. {voucherDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="total-row final-total"><span>Total:</span><span>Rs. {total.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;