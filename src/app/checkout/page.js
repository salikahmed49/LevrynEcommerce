'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { BANK_CONFIG, SHIPPING_CONFIG } from '@/lib/config';
import { getProductById } from '@/lib/catalog';
import PerfumeBottlePlaceholder from '@/components/PerfumeBottlePlaceholder';
import {
  Copy,
  Check,
  ArrowLeft,
  Truck,
  Building,
  CheckCircle2,
  ExternalLink,
  Tag,
  X,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    subtotal,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    subtotalAfterDiscount,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Karachi',
    notes: '',
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const shippingFee = SHIPPING_CONFIG.standardDeliveryFee;
  const estimatedTotal = subtotalAfterDiscount + shippingFee;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_CONFIG.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ text: `Coupon ${res.coupon.code} applied (${res.coupon.discountPct}% OFF)!`, type: 'success' });
      setCouponInput('');
    } else {
      setCouponMessage({ text: res.error, type: 'error' });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage({ text: '', type: '' });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
          couponCode: coupon?.code || null,
          items: cart.map((item) => ({
            id: item.id,
            slug: item.slug,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order. Please review your details.');
      }

      // Success: Save confirmation details and clear cart
      setOrderConfirmation(data);
      clearCart();
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State Screen ──────────────────────────────────────────────────
  if (orderConfirmation) {
    const whatsappText = encodeURIComponent(
      `Hi Levryn team! I have placed Order ${orderConfirmation.orderNumber} for Rs. ${orderConfirmation.total.toLocaleString()}. Here is my payment receipt screenshot.`
    );
    const whatsappUrl = `https://wa.me/${BANK_CONFIG.supportWhatsApp}?text=${whatsappText}`;

    return (
      <div style={{ backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              padding: 'clamp(28px, 5vw, 48px)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(21, 128, 61, 0.1)',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Order Placed Successfully
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                marginBottom: '12px',
                color: 'var(--color-text-main)',
              }}
            >
              Thank You, {orderConfirmation.customer.name.split(' ')[0]}
            </h1>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Your order number is{' '}
              <strong style={{ color: 'var(--color-text-main)' }}>
                {orderConfirmation.orderNumber}
              </strong>
              .
            </p>

            {/* Bank Transfer Instructions Card */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'left',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                }}
              >
                <Building size={18} />
                <span>Bank Transfer Instructions (No COD)</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--color-text-main)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Bank Name:</span>
                  <strong>{orderConfirmation.bankDetails.bankName}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Account Title:</span>
                  <strong>{orderConfirmation.bankDetails.accountTitle}</strong>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block' }}>
                      Account Number:
                    </span>
                    <strong style={{ fontSize: '1rem', letterSpacing: '0.04em' }}>
                      {orderConfirmation.bankDetails.accountNumber}
                    </strong>
                  </div>
                  <button
                    onClick={handleCopyAccount}
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
                  >
                    {copied ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--color-border-subtle)',
                    fontSize: '1rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Amount Payable:</span>
                  <strong style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>
                    Rs. {orderConfirmation.total.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
                style={{
                  backgroundColor: '#25D366',
                  borderColor: '#25D366',
                  padding: '14px 24px',
                  fontSize: '0.95rem',
                }}
              >
                <span>Send Payment Screenshot via WhatsApp</span>
                <ExternalLink size={16} />
              </a>

              <Link href="/shop" className="btn btn-secondary btn-block" style={{ padding: '12px 24px' }}>
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout Form ─────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', minHeight: '85vh', padding: '48px 0 96px' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '28px' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Boutique</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Delivery & Customer Info */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              padding: 'clamp(24px, 4vw, 36px)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Direct Delivery
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                marginBottom: '20px',
                color: 'var(--color-text-main)',
              }}
            >
              Shipping Address
            </h2>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                }}
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmitOrder}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Tariq Mehmood"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '6px',
                      }}
                    >
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03001234567"
                      required
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '6px',
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tariq@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Apartment #, Street, Sector/Area"
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Nearby landmark, gate code, or preferred timing"
                  />
                </div>

                {/* Bank Transfer Details Box */}
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px',
                    marginTop: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    <Building size={18} />
                    <span>Payment Method: {BANK_CONFIG.bankName} (No COD)</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      marginBottom: '14px',
                      lineHeight: 1.5,
                    }}
                  >
                    Orders are processed upon bank transfer. Cash on Delivery (COD) is not available. Please transfer the total to our bank account.
                  </p>

                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--color-text-muted)',
                          display: 'block',
                        }}
                      >
                        Account Number:
                      </span>
                      <strong style={{ fontSize: '1rem', letterSpacing: '0.04em' }}>
                        {BANK_CONFIG.accountNumber}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
                    >
                      {copied ? (
                        <>
                          <Check size={14} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                    <div>
                      Account Title: <strong>{BANK_CONFIG.accountTitle}</strong>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-block"
                  style={{
                    padding: '16px 24px',
                    fontSize: '1rem',
                    marginTop: '12px',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Validating Order on Server…' : 'Place Order via Bank Transfer'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              padding: 'clamp(24px, 4vw, 32px)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                marginBottom: '16px',
                borderBottom: '1px solid var(--color-border-subtle)',
                paddingBottom: '12px',
              }}
            >
              Order Summary ({cart.length})
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                marginBottom: '24px',
              }}
            >
              {cart.map((item) => {
                const itemImage = item.image || getProductById(item.id)?.images?.[0];
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '65px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          border: '1px solid var(--color-border-subtle)',
                          backgroundColor: '#FFFFFF',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {itemImage ? (
                          <img
                            src={itemImage}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <PerfumeBottlePlaceholder name={item.name} />
                        )}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.92rem', marginBottom: '2px' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {item.size} &times; {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code Section */}
            <div
              style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '16px',
                marginBottom: '18px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--color-text-main)',
                }}
              >
                <Tag size={14} color="var(--color-primary)" />
                <span>Have a Coupon Code?</span>
              </label>

              {coupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(21, 128, 61, 0.08)',
                    border: '1px solid #86efac',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d' }}>
                    {coupon.code} applied ({coupon.discountPct}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#b91c1c',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Remove coupon"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. LEVRYN10, LEVRYN20"
                    style={{
                      flex: 1,
                      textTransform: 'uppercase',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponMessage.text && (
                <span
                  style={{
                    display: 'block',
                    marginTop: '6px',
                    fontSize: '0.78rem',
                    color: couponMessage.type === 'success' ? '#15803d' : '#b91c1c',
                  }}
                >
                  {couponMessage.text}
                </span>
              )}
            </div>

            {/* Calculations */}
            <div
              style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d' }}>
                  <span>Discount ({coupon?.code}):</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Nationwide Delivery:</span>
                <span>Rs. {shippingFee}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '14px',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}
              >
                <span>Total:</span>
                <span>Rs. {estimatedTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Reassurance */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <Truck size={16} color="var(--color-primary)" />
              <span>Tracked express delivery across Pakistan &middot; No COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
