import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import { useNavigate } from 'react-router-dom';
import './AdminPortal.css';

/* ── Tiny SVG bar chart ─────────────────────────────────────────── */
const RevenueChart = ({ data }) => {
  const maxVal = Math.max(...data.map((d) => d.revenue), 1);
  const W = 420;
  const H = 90;
  const barW = Math.floor(W / data.length) - 6;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} className="revenue-svg">
      {data.map((d, i) => {
        const barH = Math.max(2, (d.revenue / maxVal) * H);
        const x = i * (W / data.length) + 3;
        const y = H - barH;
        const isToday = i === data.length - 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="3"
              fill={isToday ? '#D4AF37' : 'rgba(212,175,55,0.35)'}
            />
            {d.revenue > 0 && (
              <text
                x={x + barW / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize="8"
                fill={isToday ? '#D4AF37' : '#555'}
              >
                {d.revenue >= 1000 ? `${(d.revenue / 1000).toFixed(1)}k` : d.revenue}
              </text>
            )}
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize="9" fill="#444">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Status pill ────────────────────────────────────────────────── */
const StatusPill = ({ status }) => {
  const map = {
    pending:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Pending'    },
    processing: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  label: 'Processing' },
    shipped:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  label: 'Shipped'    },
    delivered:  { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   label: 'Delivered'  },
    cancelled:  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   label: 'Cancelled'  },
  };
  const s = map[status?.toLowerCase()] || { color: '#666', bg: 'rgba(255,255,255,0.05)', label: status };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '3px 10px', borderRadius: '999px',
        background: s.bg, color: s.color, fontSize: '11px',
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
        border: `1px solid ${s.color}40`,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {s.label}
    </span>
  );
};

/* ── KPI Card ───────────────────────────────────────────────────── */
const KpiCard = ({ icon, label, value, sub, accent, trend }) => (
  <div className="kpi-card" style={{ '--kpi-accent': accent || '#D4AF37' }}>
    <div className="kpi-top">
      <span className="kpi-icon" style={{ background: `${accent || '#D4AF37'}18`, color: accent || '#D4AF37' }}>
        {icon}
      </span>
      {trend !== undefined && (
        <span className="kpi-trend" style={{ color: trend >= 0 ? '#22c55e' : '#ef4444' }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="kpi-value">{value}</div>
    <div className="kpi-label">{label}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */
const AdminPortal = () => {
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const navigate = useNavigate();

  /* ── Fetch ──────────────────────────────────────────────────── */
  const fetchOrders = useCallback(async () => {
    logger.log('[ADMIN] Fetching orders…');
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('[ADMIN] Fetch error:', error.message);
    } else {
      setOrders(data || []);
      setLastRefresh(new Date());
      logger.log('[ADMIN] Orders loaded:', data?.length);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
    const channel = supabase
      .channel('admin_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        logger.log('[ADMIN] Realtime update — refreshing…');
        fetchOrders();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchOrders]);

  /* ── KPI computation ────────────────────────────────────────── */
  const stats = useMemo(() => {
    const byStatus = (s) => orders.filter((o) => o.status === s);
    const delivered  = byStatus('delivered');
    const pending    = byStatus('pending');
    const processing = byStatus('processing');
    const shipped    = byStatus('shipped');
    const cancelled  = byStatus('cancelled');

    const totalRevenue  = delivered.reduce((s, o) => s + (o.total || 0), 0);
    const avgOrderValue = delivered.length > 0 ? totalRevenue / delivered.length : 0;

    // Today
    const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0);
    const todayOrders  = orders.filter((o) => new Date(o.created_at) >= dayStart);
    const todayRevenue = todayOrders.filter((o) => o.status === 'delivered')
      .reduce((s, o) => s + (o.total || 0), 0);

    // Last 7 days bar data
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i)); d.setHours(0, 0, 0, 0);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      const rev = orders
        .filter((o) => { const t = new Date(o.created_at); return t >= d && t < next; })
        .reduce((s, o) => s + (o.total || 0), 0);
      return { label: days[d.getDay()], revenue: rev };
    });

    // Top product by quantity sold
    const productQty = {};
    orders.forEach((o) =>
      (o.order_items || []).forEach((item) => {
        productQty[item.product_name] = (productQty[item.product_name] || 0) + item.quantity;
      })
    );
    const [topProduct, topQty] = Object.entries(productQty).sort(([, a], [, b]) => b - a)[0] || ['—', 0];

    // Repeat customers
    const emailCount = {};
    orders.forEach((o) => { if (o.customer_email) emailCount[o.customer_email] = (emailCount[o.customer_email] || 0) + 1; });
    const repeatCustomers = Object.values(emailCount).filter((c) => c > 1).length;

    return {
      totalRevenue, avgOrderValue, totalOrders: orders.length,
      pending: pending.length, processing: processing.length,
      shipped: shipped.length, delivered: delivered.length, cancelled: cancelled.length,
      todayOrders: todayOrders.length, todayRevenue,
      weeklyData, topProduct, topQty, repeatCustomers,
    };
  }, [orders]);

  /* ── Filtered orders ────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return orders.filter((o) => {
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchSearch = !q ||
        o.order_number?.toLowerCase().includes(q) ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.customer_email?.toLowerCase().includes(q) ||
        o.customer_phone?.includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  /* ── Actions ────────────────────────────────────────────────── */
  const handleStatusUpdate = async (orderId, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) { alert('Failed to update: ' + error.message); return; }
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const handleDelete = async (orderId, orderNum) => {
    if (!window.confirm(`Delete order ${orderNum}? This cannot be undone.`)) return;
    const { error: ie } = await supabase.from('order_items').delete().eq('order_id', orderId);
    if (ie) { alert('Error deleting items: ' + ie.message); return; }
    const { error: oe } = await supabase.from('orders').delete().eq('id', orderId);
    if (oe) { alert('Error deleting order: ' + oe.message); return; }
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const toggleExpand = (id) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  /* ── Loading state ──────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="admin-full-loading">
        <div className="admin-spinner" />
        <p>Loading dashboard…</p>
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Levryn</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-shell">

        {/* ── Sidebar ── */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <span className="sidebar-logo">L</span>
            <span className="sidebar-wordmark">Levryn</span>
          </div>
          <nav className="sidebar-nav">
            <span className="sidebar-nav-item active">📊 Dashboard</span>
            <span className="sidebar-nav-item" onClick={() => navigate('/levryn-product-management')}>📦 Products</span>
          </nav>
          <div className="sidebar-footer">
            <button className="sidebar-logout" onClick={handleLogout}>⎋ Sign Out</button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="admin-main">

          {/* Header */}
          <header className="admin-topbar">
            <div>
              <h1 className="admin-page-title">Dashboard</h1>
              <p className="admin-page-sub">
                Last updated: {lastRefresh.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                <span className="live-dot" />
              </p>
            </div>
            <div className="topbar-actions">
              <button className="admin-btn-ghost" onClick={fetchOrders}>↻ Refresh</button>
              <button className="admin-btn-primary" onClick={() => navigate('/levryn-product-management')}>
                + Manage Products
              </button>
            </div>
          </header>

          {/* ── KPI Row 1 ── */}
          <div className="kpi-grid">
            <KpiCard
              icon="💰"
              label="Total Revenue"
              value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
              sub={`Today: Rs. ${stats.todayRevenue.toLocaleString()}`}
              accent="#D4AF37"
            />
            <KpiCard
              icon="🛍️"
              label="Total Orders"
              value={stats.totalOrders}
              sub={`Today: ${stats.todayOrders} new`}
              accent="#3b82f6"
            />
            <KpiCard
              icon="📊"
              label="Avg Order Value"
              value={`Rs. ${Math.round(stats.avgOrderValue).toLocaleString()}`}
              sub="Based on delivered"
              accent="#8b5cf6"
            />
            <KpiCard
              icon="🔁"
              label="Repeat Customers"
              value={stats.repeatCustomers}
              sub="Ordered 2+ times"
              accent="#22c55e"
            />
          </div>

          {/* ── KPI Row 2 ── */}
          <div className="kpi-grid">
            <KpiCard icon="⏳" label="Pending"    value={stats.pending}    accent="#f59e0b" />
            <KpiCard icon="🔄" label="Processing" value={stats.processing} accent="#3b82f6" />
            <KpiCard icon="🚚" label="Shipped"    value={stats.shipped}    accent="#8b5cf6" />
            <KpiCard icon="✅" label="Delivered"  value={stats.delivered}  accent="#22c55e" />
          </div>

          {/* ── Analytics Row ── */}
          <div className="analytics-row">

            {/* Revenue chart */}
            <div className="analytics-card chart-card">
              <div className="analytics-card-header">
                <h2 className="analytics-card-title">Revenue — Last 7 Days</h2>
                <span className="analytics-badge">Rs.</span>
              </div>
              <RevenueChart data={stats.weeklyData} />
            </div>

            {/* Status breakdown */}
            <div className="analytics-card breakdown-card">
              <div className="analytics-card-header">
                <h2 className="analytics-card-title">Order Status</h2>
              </div>
              {[
                { label: 'Delivered',  value: stats.delivered,  color: '#22c55e' },
                { label: 'Pending',    value: stats.pending,    color: '#f59e0b' },
                { label: 'Processing', value: stats.processing, color: '#3b82f6' },
                { label: 'Shipped',    value: stats.shipped,    color: '#8b5cf6' },
                { label: 'Cancelled',  value: stats.cancelled,  color: '#ef4444' },
              ].map(({ label, value, color }) => {
                const pct = stats.totalOrders > 0 ? Math.round((value / stats.totalOrders) * 100) : 0;
                return (
                  <div key={label} className="status-bar-row">
                    <div className="status-bar-label">
                      <span style={{ color }}>{label}</span>
                      <span className="status-bar-count">{value}</span>
                    </div>
                    <div className="status-bar-track">
                      <div className="status-bar-fill" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="status-bar-pct">{pct}%</span>
                  </div>
                );
              })}

              <div className="top-product-row">
                <span className="top-product-label">🏆 Top Product</span>
                <span className="top-product-value">{stats.topProduct} <em>×{stats.topQty}</em></span>
              </div>
            </div>

          </div>

          {/* ── Orders section ── */}
          <section className="orders-section">
            <div className="orders-toolbar">
              <h2 className="orders-title">
                Orders
                <span className="orders-count-badge">{filtered.length}</span>
              </h2>
              <div className="toolbar-controls">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by order #, name, email…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="no-orders">
                <span className="no-orders-icon">📭</span>
                <p>No orders found.</p>
              </div>
            ) : (
              <div className="orders-list">
                {filtered.map((order) => {
                  const isOpen = expandedIds.has(order.id);
                  const emailCount = orders.filter((o) => o.customer_email === order.customer_email).length;
                  return (
                    <div key={order.id} className={`order-row ${isOpen ? 'order-row--open' : ''}`}>

                      {/* ── Row summary (always visible) ── */}
                      <div className="order-row-summary" onClick={() => toggleExpand(order.id)}>
                        <div className="order-row-left">
                          <span className="order-row-num">{order.order_number}</span>
                          <StatusPill status={order.status} />
                        </div>
                        <div className="order-row-meta">
                          <span className="order-row-name">{order.customer_name}</span>
                          <span className="order-row-date">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="order-row-right">
                          <span className="order-row-total">Rs. {order.total?.toLocaleString()}</span>
                          <span className="order-row-chevron">{isOpen ? '▲' : '▼'}</span>
                        </div>
                      </div>

                      {/* ── Expanded detail ── */}
                      {isOpen && (
                        <div className="order-row-detail">
                          <div className="detail-grid">

                            {/* Customer info */}
                            <div className="detail-section">
                              <h4 className="detail-section-title">Customer</h4>
                              <dl className="detail-dl">
                                <dt>Name</dt><dd>{order.customer_name}
                                  {emailCount > 1 && <span className="repeat-badge">⭐ Repeat ×{emailCount}</span>}
                                </dd>
                                <dt>Email</dt><dd>{order.customer_email}</dd>
                                <dt>Phone</dt><dd>{order.customer_phone}</dd>
                                <dt>Address</dt>
                                <dd>{order.customer_address}, {order.customer_city} {order.customer_postal_code}</dd>
                              </dl>
                            </div>

                            {/* Payment & voucher */}
                            <div className="detail-section">
                              <h4 className="detail-section-title">Payment</h4>
                              <dl className="detail-dl">
                                <dt>Method</dt><dd>{order.payment_method === 'bankTransfer' ? 'Bank Transfer' : order.payment_method}</dd>
                                <dt>Subtotal</dt><dd>Rs. {order.subtotal?.toLocaleString()}</dd>
                                {order.voucher_code && <><dt>Voucher</dt><dd>{order.voucher_code} (–Rs. {order.discount_amount?.toLocaleString()})</dd></>}
                                <dt>Total</dt><dd className="detail-total">Rs. {order.total?.toLocaleString()}</dd>
                              </dl>
                            </div>

                            {/* Items */}
                            <div className="detail-section detail-section--items">
                              <h4 className="detail-section-title">Items</h4>
                              <div className="detail-items">
                                {(order.order_items || []).map((item, i) => (
                                  <div key={i} className="detail-item">
                                    <span className="detail-item-name">{item.product_name}</span>
                                    <span className="detail-item-size">{item.product_size}</span>
                                    <span className="detail-item-qty">×{item.quantity}</span>
                                    <span className="detail-item-price">Rs. {(item.product_price * item.quantity).toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Actions */}
                          <div className="detail-actions">
                            <div className="status-change">
                              <label>Status</label>
                              <select
                                className="detail-status-select"
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                style={{
                                  borderColor: {
                                    pending:'#f59e0b', processing:'#3b82f6', shipped:'#8b5cf6',
                                    delivered:'#22c55e', cancelled:'#ef4444',
                                  }[order.status] || '#333',
                                }}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>

                            <button
                              className="detail-btn detail-btn--delete"
                              onClick={() => handleDelete(order.id, order.order_number)}
                            >
                              🗑 Delete Order
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </main>
      </div>
    </>
  );
};

export default AdminPortal;