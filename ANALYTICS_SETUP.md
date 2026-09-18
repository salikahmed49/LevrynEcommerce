# Analytics & Traffic Tracking Setup Guide

## 📊 Overview

This guide will help you set up comprehensive analytics tracking to understand customer behavior and product interest on your Levryn platform.

---

## 🎯 What We'll Track

### **1. Product Analytics**
- Most viewed products
- Most added to cart
- Most purchased products
- Product page visits
- Time spent on product pages

### **2. User Behavior**
- Page views
- Session duration
- Cart abandonment rate
- Checkout completion rate
- Popular navigation paths

### **3. Sales Analytics**
- Revenue by product
- Average order value
- Conversion rate
- Popular price ranges
- Best-selling sizes

---

## 🚀 Quick Setup (3 Options)

### **Option 1: Google Analytics 4 (Recommended - FREE)**

#### Step 1: Create GA4 Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Create account name: "Levryn"
4. Create property: "Levryn Website"
5. Select industry: "Retail"
6. Choose "Web" platform

#### Step 2: Get Measurement ID
1. After setup, you'll get a Measurement ID (G-XXXXXXXXXX)
2. Copy this ID

#### Step 3: Add to Your Website
Create file: `src/utils/analytics.js`

```javascript
// Google Analytics 4 Setup
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your ID

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
};

// Track page view
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track product view
export const trackProductView = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'PKR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.rendition,
      }]
    });
  }
};

// Track add to cart
export const trackAddToCart = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'PKR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
      }]
    });
  }
};

// Track purchase
export const trackPurchase = (orderNumber, total, items) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderNumber,
      value: total,
      currency: 'PKR',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    });
  }
};
```

#### Step 4: Add GA4 Script to index.html
In `public/index.html`, add before `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Step 5: Track Events in Components

**In ProductDetail.js:**
```javascript
import { trackProductView } from '../utils/analytics';

useEffect(() => {
  if (product) {
    trackProductView(product);
  }
}, [product]);
```

**In CartContext.js:**
```javascript
import { trackAddToCart } from '../utils/analytics';

const addToCart = (product) => {
  trackAddToCart(product);
  // ... rest of code
};
```

**In Checkout.js:**
```javascript
import { trackPurchase } from '../utils/analytics';

// After successful order
trackPurchase(orderNumber, total, cart);
```

---

### **Option 2: Simple Supabase Analytics (Custom)**

#### Create Analytics Table in Supabase:

```sql
-- Create analytics table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  product_id TEXT,
  product_name TEXT,
  product_price NUMERIC,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_product_id ON analytics_events(product_id);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);
```

#### Create Analytics Helper:

```javascript
// src/utils/supabaseAnalytics.js
import { supabase } from '../config/supabase';

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('levryn_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('levryn_session', sessionId);
  }
  return sessionId;
};

// Track event
export const trackEvent = async (eventType, productData = null) => {
  try {
    await supabase.from('analytics_events').insert([{
      event_type: eventType,
      product_id: productData?.id || null,
      product_name: productData?.name || null,
      product_price: productData?.price || null,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
    }]);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Track product view
export const trackProductView = (product) => {
  trackEvent('product_view', product);
};

// Track add to cart
export const trackAddToCart = (product) => {
  trackEvent('add_to_cart', product);
};

// Track purchase
export const trackPurchase = (orderData) => {
  trackEvent('purchase', {
    id: orderData.order_number,
    name: `Order ${orderData.order_number}`,
    price: orderData.total,
  });
};
```

---

### **Option 3: Meta Pixel (Facebook/Instagram Ads)**

#### Setup Meta Pixel:
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Create a Pixel
3. Get your Pixel ID

#### Add to index.html:
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

---

## 📊 Admin Analytics Dashboard

Create file: `src/pages/Analytics.js`

```javascript
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    mostViewed: [],
    mostAddedToCart: [],
    topSelling: [],
    recentActivity: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Check admin auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || session.user.email !== 'salikahmed49@gmail.com') {
        navigate('/levryn-auth-gate');
        return;
      }

      try {
        // Most viewed products (last 30 days)
        const { data: viewedData } = await supabase
          .from('analytics_events')
          .select('product_id, product_name, product_price')
          .eq('event_type', 'product_view')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        const viewCounts = {};
        viewedData?.forEach(item => {
          if (item.product_id) {
            viewCounts[item.product_id] = (viewCounts[item.product_id] || 0) + 1;
          }
        });

        const mostViewed = Object.entries(viewCounts)
          .map(([id, count]) => {
            const product = viewedData.find(p => p.product_id === id);
            return { id, count, name: product?.product_name, price: product?.product_price };
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Most added to cart
        const { data: cartData } = await supabase
          .from('analytics_events')
          .select('product_id, product_name, product_price')
          .eq('event_type', 'add_to_cart')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        const cartCounts = {};
        cartData?.forEach(item => {
          if (item.product_id) {
            cartCounts[item.product_id] = (cartCounts[item.product_id] || 0) + 1;
          }
        });

        const mostAddedToCart = Object.entries(cartCounts)
          .map(([id, count]) => {
            const product = cartData.find(p => p.product_id === id);
            return { id, count, name: product?.product_name, price: product?.product_price };
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Top selling products from actual orders
        const { data: orderItems } = await supabase
          .from('order_items')
          .select('product_name, product_price, quantity')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        const salesCounts = {};
        orderItems?.forEach(item => {
          const key = item.product_name;
          if (!salesCounts[key]) {
            salesCounts[key] = { name: key, quantity: 0, revenue: 0, price: item.product_price };
          }
          salesCounts[key].quantity += item.quantity;
          salesCounts[key].revenue += item.product_price * item.quantity;
        });

        const topSelling = Object.values(salesCounts)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 10);

        // Recent activity
        const { data: recentData } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        setAnalytics({
          mostViewed,
          mostAddedToCart,
          topSelling,
          recentActivity: recentData || [],
        });
      } catch (error) {
        console.error('Analytics fetch error:', error);
      }

      setLoading(false);
    };

    fetchAnalytics();
  }, [navigate]);

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <button onClick={() => navigate('/admin-levryn-dashboard')} className="btn btn-outline">
          Back to Orders
        </button>
      </div>

      <div className="analytics-grid">
        {/* Most Viewed Products */}
        <div className="analytics-card">
          <h2>👁️ Most Viewed Products (30 Days)</h2>
          <div className="analytics-list">
            {analytics.mostViewed.map((item, index) => (
              <div key={item.id} className="analytics-item">
                <span className="rank">#{index + 1}</span>
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span className="item-meta">{item.count} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Added to Cart */}
        <div className="analytics-card">
          <h2>🛒 Most Added to Cart (30 Days)</h2>
          <div className="analytics-list">
            {analytics.mostAddedToCart.map((item, index) => (
              <div key={item.id} className="analytics-item">
                <span className="rank">#{index + 1}</span>
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span className="item-meta">{item.count} times</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="analytics-card">
          <h2>💰 Top Selling Products (30 Days)</h2>
          <div className="analytics-list">
            {analytics.topSelling.map((item, index) => (
              <div key={index} className="analytics-item">
                <span className="rank">#{index + 1}</span>
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span className="item-meta">
                    {item.quantity} sold • Rs. {item.revenue.toLocaleString()} revenue
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card full-width">
          <h2>📊 Recent Activity</h2>
          <div className="activity-list">
            {analytics.recentActivity.map((event) => (
              <div key={event.id} className="activity-item">
                <span className="activity-type">{event.event_type}</span>
                <span className="activity-product">{event.product_name || 'N/A'}</span>
                <span className="activity-time">
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
```

---

## 🎨 Analytics CSS

Create file: `src/pages/Analytics.css`

```css
.analytics-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-light) 0%, var(--gold-lighter) 100%);
  padding: var(--spacing-xl);
}

.analytics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.analytics-header h1 {
  font-size: 32px;
  color: var(--black);
  margin: 0;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.analytics-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.analytics-card.full-width {
  grid-column: 1 / -1;
}

.analytics-card h2 {
  font-size: 20px;
  margin-bottom: var(--spacing-lg);
  color: var(--black);
  border-bottom: 2px solid var(--gold-primary);
  padding-bottom: var(--spacing-md);
}

.analytics-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.analytics-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--gray-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.analytics-item:hover {
  background: var(--gold-lighter);
  transform: translateX(4px);
}

.rank {
  font-size: 18px;
  font-weight: 700;
  color: var(--gold-dark);
  min-width: 40px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
}

.item-meta {
  font-size: 13px;
  color: var(--gray-dark);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.activity-item {
  display: grid;
  grid-template-columns: 150px 1fr 200px;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--gray-medium);
}

.activity-type {
  font-weight: 600;
  color: var(--gold-dark);
  text-transform: uppercase;
  font-size: 12px;
}

.activity-product {
  color: var(--black);
}

.activity-time {
  color: var(--gray-dark);
  font-size: 13px;
  text-align: right;
}

@media (max-width: 768px) {
  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .activity-item {
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
  }

  .activity-time {
    text-align: left;
  }
}
```

---

## 🔗 Add Analytics Route

In `App.js`:

```javascript
import Analytics from './pages/Analytics';

// Add route
<Route path="/analytics" element={<Analytics />} />
```

---

## 📊 What You'll See

### **Most Viewed Products**
- Top 10 products by page views
- View count for each
- Last 30 days

### **Most Added to Cart**
- Top 10 products added to cart
- Add-to-cart count
- Conversion insights

### **Top Selling Products**
- Actual sales data
- Quantity sold
- Revenue generated

### **Recent Activity**
- Real-time event stream
- Product views, cart adds, purchases
- Timestamps

---

## ✅ Setup Checklist

- [ ] Choose analytics option (GA4 recommended)
- [ ] Create analytics account
- [ ] Add tracking code to website
- [ ] Create analytics helper functions
- [ ] Add tracking to ProductDetail
- [ ] Add tracking to CartContext
- [ ] Add tracking to Checkout
- [ ] Create Analytics page (if using Supabase)
- [ ] Add Analytics route
- [ ] Test tracking events
- [ ] Verify data in dashboard

---

**Analytics system ready to deploy!** 📊

Choose your preferred option and follow the setup guide to start tracking customer behavior and product interest.

---

*Created: January 4, 2026, 9:36 PM*
