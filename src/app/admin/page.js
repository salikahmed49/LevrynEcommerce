'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  Clock,
  Truck,
  MessageCircle,
  Lock,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AdminPortalPage() {
  const [passphrase, setPassphrase] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [loading, setLoading] = useState(false);
  const [kpis, setKpis] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Check saved passphrase in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('levryn_admin_secret');
    if (saved) {
      setPassphrase(saved);
      loadDashboard(saved);
    }
  }, []);

  const loadDashboard = async (secretToUse) => {
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`/api/admin/orders?secret=${encodeURIComponent(secretToUse)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setKpis(data.kpis);
      setOrders(data.orders);
      setIsAuthenticated(true);
      sessionStorage.setItem('levryn_admin_secret', secretToUse);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check your admin PIN.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passphrase.trim()) return;
    loadDashboard(passphrase.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('levryn_admin_secret');
    setIsAuthenticated(false);
    setPassphrase('');
  };

  const updateOrderStatus = async (orderId, updates) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: passphrase,
          orderId,
          ...updates,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
        );
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !searchQuery.trim() ||
      o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone?.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && (o.payment_status === 'pending_verification' || o.status === 'pending')) ||
      (statusFilter === 'verified' && o.payment_status === 'verified') ||
      (statusFilter === 'dispatched' && (o.order_status === 'dispatched' || o.order_status === 'shipped'));

    return matchesSearch && matchesStatus;
  });

  // ── Login Gate ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-alt)', padding: '24px' }}>
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '36px 32px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(47, 79, 79, 0.1)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Lock size={26} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
            Levryn Executive Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
            Authorized access only. Enter your administrator passkey.
          </p>

          {loginError && (
            <div
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                fontSize: '0.8rem',
                marginBottom: '16px',
              }}
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter Admin PIN / Passkey"
              style={{ marginBottom: '16px', textAlign: 'center', letterSpacing: '0.15em' }}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
              style={{ padding: '12px' }}
            >
              {loading ? 'Authenticating…' : 'Access Portal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Executive Dashboard ───────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', minHeight: '90vh', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Top Control Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
              }}
            >
              Management Console
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: '4px 0 0' }}>
              Operations & Orders KPI
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => loadDashboard(passphrase)}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        {kpis && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            {/* Revenue */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Gross Revenue
                </span>
                <TrendingUp size={20} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Rs. {kpis.totalRevenue.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Across {kpis.totalOrders} total orders
              </span>
            </div>

            {/* Pending Payments */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Pending Verification
                </span>
                <Clock size={20} color="#d97706" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d97706' }}>
                {kpis.pendingOrders}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Awaiting receipt / Raast check
              </span>
            </div>

            {/* Dispatched */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Dispatched Courier
                </span>
                <Truck size={20} color="#15803d" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#15803d' }}>
                {kpis.dispatchedOrders}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Tracked courier shipments
              </span>
            </div>

            {/* AOV */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Average Order Value
                </span>
                <Package size={20} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                Rs. {kpis.aov.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Basket value per checkout
              </span>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px', flex: 1 }}>
            <Search size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search by order #, customer name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'pending', 'verified', 'dispatched'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  border: statusFilter === st ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: statusFilter === st ? 'var(--color-primary)' : '#FFFFFF',
                  color: statusFilter === st ? '#FFFFFF' : 'var(--color-text-main)',
                  cursor: 'pointer',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Order #</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Customer</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>City</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Total</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Payment</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '14px 16px', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No orders found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const cleanPhone = (o.customer_phone || '').replace(/[^0-9]/g, '');
                    const waPhone = cleanPhone.startsWith('03') ? `92${cleanPhone.slice(1)}` : cleanPhone;
                    const waText = encodeURIComponent(
                      `Hi ${o.customer_name}, this is Levryn regarding your order ${o.order_number} for Rs. ${(o.total || o.total_amount).toLocaleString()}.`
                    );
                    const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

                    const isVerified = o.payment_status === 'verified';
                    const isDispatched = o.order_status === 'dispatched' || o.order_status === 'shipped';

                    return (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                          <div>{o.order_number}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: 600 }}>{o.customer_name}</div>
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{o.customer_phone}</div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>{o.customer_city}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                          Rs. {(Number(o.total) || Number(o.total_amount) || 0).toLocaleString()}
                          {o.voucher_code && (
                            <div style={{ fontSize: '0.7rem', color: '#15803d' }}>
                              Code: {o.voucher_code}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: isVerified ? 'rgba(21, 128, 61, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                              color: isVerified ? '#15803d' : '#d97706',
                            }}
                          >
                            {isVerified ? 'Verified' : 'Pending Receipt'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: isDispatched ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                              color: isDispatched ? '#15803d' : '#475569',
                            }}
                          >
                            {isDispatched ? 'Dispatched' : (o.order_status || 'Placed')}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary"
                              style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: '#25D366', color: '#FFFFFF', borderColor: '#25D366' }}
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle size={14} />
                            </a>

                            {!isVerified && (
                              <button
                                onClick={() => updateOrderStatus(o.id, { paymentStatus: 'verified' })}
                                className="btn btn-secondary"
                                style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#15803d' }}
                                title="Mark Payment Verified"
                              >
                                Verify
                              </button>
                            )}

                            {!isDispatched && (
                              <button
                                onClick={() => updateOrderStatus(o.id, { orderStatus: 'dispatched' })}
                                className="btn btn-secondary"
                                style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--color-primary)' }}
                                title="Mark Dispatched"
                              >
                                Dispatch
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

