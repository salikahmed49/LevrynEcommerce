'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Clock, Truck, CheckCircle2 } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    const cleanQuery = orderQuery.trim().toUpperCase();
    if (!cleanQuery) return;

    setLoading(true);
    setError('');
    setSearched(true);
    setOrder(null);

    try {
      const { data, error: dbError } = await supabase
        .from('orders')
        .select('order_number, customer_name, customer_city, total, total_amount, payment_status, order_status, status, created_at')
        .or(`order_number.eq.${cleanQuery},customer_phone.eq.${cleanQuery}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbError) throw dbError;
      if (!data) {
        setError('No order found with this Order ID or Phone number. Please check and retry.');
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError('An error occurred while tracking. Please contact support via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const isVerified = order?.payment_status === 'verified';
  const isDispatched = order?.order_status === 'dispatched' || order?.order_status === 'shipped';

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', minHeight: '80vh', padding: '60px 0 96px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
            Live Tracking
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '10px' }}>
            Track Your Order
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            Enter your Order ID (e.g. LEV-1234) or phone number to check status.
          </p>
        </div>

        {/* Search Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '28px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '28px',
          }}
        >
          <form onSubmit={handleTrack} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. LEV-8492 or 03001234567"
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '0.92rem',
                textTransform: 'uppercase',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.9rem', gap: '6px' }}
            >
              <Search size={16} />
              <span>{loading ? 'Searching…' : 'Track'}</span>
            </button>
          </form>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              border: '1px solid #ef4444',
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        {/* Order Details Card */}
        {order && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              padding: '32px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '18px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Order Reference
                </span>
                <h3 style={{ fontSize: '1.4rem', margin: '2px 0 0', fontFamily: 'var(--font-serif)' }}>
                  {order.order_number}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Total Amount
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Rs. {(Number(order.total) || Number(order.total_amount) || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {/* Step 1: Placed */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#15803d',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Order Placed</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Verification */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isVerified ? '#15803d' : '#f59e0b',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isVerified ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                    Payment: {isVerified ? 'Verified' : 'Awaiting Transfer Verification'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {isVerified
                      ? 'Bank receipt verified by accounts team.'
                      : 'Please share your payment screenshot on WhatsApp.'}
                  </div>
                </div>
              </div>

              {/* Step 3: Courier Dispatch */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isDispatched ? '#15803d' : 'var(--color-border)',
                    color: isDispatched ? '#FFFFFF' : 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Truck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                    Courier: {isDispatched ? 'Dispatched' : 'Preparing for Dispatch'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Destination City: {order.customer_city}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/923272332833?text=Hi%20Levryn,%20checking%20status%20for%20order%20${order.order_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-block"
              style={{ padding: '12px', fontSize: '0.88rem' }}
            >
              Contact Support on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
