import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../config/supabase';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('order_number', orderId.trim().toUpperCase())
        .single();

      if (fetchError || !data) {
        setError('Order not found. Please check your order number and try again.');
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Track order error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status?.toLowerCase()] || '#666';
  };

  const getStatusSteps = (currentStatus) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus?.toLowerCase());
    
    return steps.map((step, index) => ({
      name: step.charAt(0).toUpperCase() + step.slice(1),
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order - Levryn Perfumes</title>
        <meta name="description" content="Track your Levryn perfume order status. Enter your order ID to see real-time updates on your luxury fragrance delivery." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="track-order-page">
        <div className="container">
          <div className="track-order-header">
            <h1>Track Your Order</h1>
            <p>Enter your order number to check the status of your delivery</p>
          </div>

          <div className="track-order-form-container">
            <form onSubmit={handleTrackOrder} className="track-order-form">
              <div className="form-group">
                <label htmlFor="orderId">Order Number</label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="LEV-123456"
                  required
                  className="mobile-full-width"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>

            {error && (
              <div className="error-message-box">
                <p>{error}</p>
              </div>
            )}

            {order && (
              <div className="order-tracking-result">
                <div className="order-header">
                  <h2>Order {order.order_number}</h2>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status?.toUpperCase()}
                  </span>
                </div>

                {/* Status Timeline */}
                <div className="status-timeline">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div 
                      key={step.name} 
                      className={`timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}
                    >
                      <div className="timeline-dot">
                        {step.completed && <span>✓</span>}
                      </div>
                      <div className="timeline-label">{step.name}</div>
                      {index < 3 && <div className="timeline-line"></div>}
                    </div>
                  ))}
                </div>

                {/* Customer Information */}
                <div className="order-details-grid">
                  <div className="detail-card">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> {order.customer_name}</p>
                    <p><strong>Email:</strong> {order.customer_email}</p>
                    <p><strong>Phone:</strong> {order.customer_phone}</p>
                  </div>

                  <div className="detail-card">
                    <h3>Shipping Address</h3>
                    <p>{order.customer_address}</p>
                    <p>{order.customer_city}, {order.customer_postal_code}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items-section">
                  <h3>Order Items</h3>
                  <div className="order-items-list">
                    {order.order_items && order.order_items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <div className="item-info">
                          <span className="item-name">{item.product_name}</span>
                          <span className="item-size">{item.product_size}</span>
                        </div>
                        <div className="item-pricing">
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">Rs. {item.product_price?.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <span>Total Amount:</span>
                    <span className="total-amount">Rs. {order.total?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Date */}
                <div className="order-footer">
                  <p className="order-date">
                    Order placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
