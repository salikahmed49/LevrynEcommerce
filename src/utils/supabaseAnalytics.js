// Supabase Analytics Tracking
import { supabase } from '../config/supabase';
import { logger } from './logger';

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('levryn_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('levryn_session', sessionId);
  }
  return sessionId;
};

// Track event to Supabase
export const trackEvent = async (eventType, productData = null) => {
  try {
    await supabase.from('analytics_events').insert([{
      event_type: eventType,
      product_id: productData?.id?.toString() || null,
      product_name: productData?.name || null,
      product_price: productData?.price || null,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
    }]);
  } catch (error) {
    logger.error('Analytics tracking error:', error);
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

// Track page view
export const trackPageView = (pageName) => {
  trackEvent('page_view', { name: pageName });
};
