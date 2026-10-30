'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/catalog';
import PerfumeBottlePlaceholder from './PerfumeBottlePlaceholder';
import { X, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    subtotalAfterDiscount,
    standardDeliveryFee,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponStatus, setCouponStatus] = useState({ text: '', isError: false });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (res.success) {
      setCouponStatus({ text: `Applied ${res.coupon.code} (${res.coupon.discountPct}% OFF)`, isError: false });
      setCouponCodeInput('');
    } else {
      setCouponStatus({ text: res.error, isError: true });
    }
  };

  return (
    <>
      {/* Dark overlay backdrop */}
      <div className="drawer-backdrop" onClick={closeCart} />

      {/* Slide-in Drawer Container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-drawer)',
          animation: 'slideLeft 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-serif)' }}>
              Your Bag
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {cart.length === 0
                ? '0 items'
                : `${cart.reduce((sum, item) => sum + item.quantity, 0)} items selected`}
            </span>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
            }}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Delivery Policy Note */}
        <div
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--color-bg-alt)',
            borderBottom: '1px solid var(--color-border-subtle)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-text-main)',
          }}
        >
          <Truck size={14} color="var(--color-primary)" />
          <span>Flat nationwide delivery fee of Rs. {standardDeliveryFee} across Pakistan</span>
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-bg-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'var(--color-text-muted)',
                }}
              >
                <Truck size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px' }}>
                Your bag is empty
              </h4>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '20px',
                  maxWidth: '260px',
                }}
              >
                Discover our artisanal collection of handcrafted extraits.
              </p>
              <button onClick={closeCart} className="btn btn-secondary">
                <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Explore Fragrances
                </Link>
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemImage = item.image || getProductById(item.id)?.images?.[0];
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '68px',
                      height: '84px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-bg-alt)',
                      flexShrink: 0,
                      border: '1px solid var(--color-border-subtle)',
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

                  {/* Details */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            margin: 0,
                            color: 'var(--color-text-main)',
                          }}
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--color-text-muted)',
                          display: 'block',
                          marginTop: '2px',
                        }}
                      >
                        Size: {item.size}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                      }}
                    >
                      {/* Quantity Stepper */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          style={{ padding: '4px 8px', color: 'var(--color-text-main)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            minWidth: '24px',
                            textAlign: 'center',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          style={{ padding: '4px 8px', color: 'var(--color-text-main)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: 'var(--color-primary)',
                        }}
                      >
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '16px 24px 20px',
              borderTop: '1px solid var(--color-border-subtle)',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Quick Coupon in Drawer */}
            <div style={{ marginBottom: '14px' }}>
              {coupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    backgroundColor: 'rgba(21, 128, 61, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ color: '#15803d', fontWeight: 600 }}>
                    {coupon.code} ({coupon.discountPct}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      fontSize: '0.78rem',
                      textTransform: 'uppercase',
                    }}
                  />
                  <button type="submit" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                    Apply
                  </button>
                </form>
              )}
              {couponStatus.text && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: couponStatus.isError ? '#b91c1c' : '#15803d',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  {couponStatus.text}
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                marginBottom: '6px',
              }}
            >
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: '#15803d',
                  marginBottom: '6px',
                }}
              >
                <span>Discount ({coupon?.code}):</span>
                <span>- Rs. {discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '16px',
                paddingTop: '6px',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>Total (est.):</span>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}
              >
                Rs. {(subtotalAfterDiscount + standardDeliveryFee).toLocaleString()}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary btn-block"
              style={{
                padding: '14px 20px',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                display: 'block',
                marginTop: '10px',
              }}
            >
              Includes Rs. {standardDeliveryFee} delivery &middot; Bank transfer accepted
            </span>
          </div>
        )}
      </div>
    </>
  );
}
