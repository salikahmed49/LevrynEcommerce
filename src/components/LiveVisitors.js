import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import './LiveVisitors.css';

const LiveVisitors = ({ productId }) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate a realistic-looking viewer count (3-15 range)
    // Plus track real page views in Supabase
    const baseViewers = Math.floor(Math.random() * 8) + 3;
    setViewerCount(baseViewers);
    setIsVisible(true);

    // Track this page view
    trackPageView(productId);

    // Simulate real-time fluctuation
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(2, Math.min(20, newCount));
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [productId]);

  const trackPageView = async (pageId) => {
    try {
      const sessionId = getOrCreateSessionId();
      
      await supabase
        .from('page_views')
        .insert([{
          page_path: window.location.pathname,
          product_id: pageId || null,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          timestamp: new Date().toISOString(),
        }]);
    } catch (err) {
      // Silently fail - analytics shouldn't break the app
      logger.info('[Analytics] Page view tracking failed:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="live-visitors" aria-live="polite">
      <span className="live-dot"></span>
      <span className="live-text">
        <strong>{viewerCount}</strong> people are viewing this right now
      </span>
    </div>
  );
};

// Session ID management
const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem('levryn_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('levryn_session_id', sessionId);
  }
  return sessionId;
};

export default LiveVisitors;
