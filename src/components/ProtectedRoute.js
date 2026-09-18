import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

// The only email permitted to access admin routes
const ADMIN_EMAIL = 'salikahmed49@gmail.com';

/**
 * ProtectedRoute — wraps admin routes in App.js.
 * Renders a full-screen loading state while the Supabase session is being
 * verified. Only renders children after confirmation. Redirects to the
 * login gate if unauthenticated or the email doesn't match.
 */
const ProtectedRoute = ({ children }) => {
  // 'checking' | 'authorized' | 'unauthorized'
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (session && session.user?.email === ADMIN_EMAIL) {
          setAuthStatus('authorized');
        } else {
          setAuthStatus('unauthorized');
        }
      } catch {
        if (isMounted) setAuthStatus('unauthorized');
      }
    };

    verify();

    // Stay in sync if the auth state changes mid-session (e.g. manual signOut)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session && session.user?.email === ADMIN_EMAIL) {
        setAuthStatus('authorized');
      } else {
        setAuthStatus('unauthorized');
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authStatus === 'checking') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid rgba(212,175,55,0.2)',
            borderTopColor: '#D4AF37',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p
          style={{
            color: '#555',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Verifying access…
        </p>
      </div>
    );
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to="/levryn-auth-gate" replace />;
  }

  return children;
};

export default ProtectedRoute;
