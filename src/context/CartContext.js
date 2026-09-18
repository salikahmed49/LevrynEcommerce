import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackAddToCart, trackRemoveFromCart } from '../utils/analytics';
import { trackAddToCart as trackAddToCartSupabase } from '../utils/supabaseAnalytics';


const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('levryn_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('levryn_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    // Track analytics
    trackAddToCart(product);
    trackAddToCartSupabase(product);
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Signal the Header to open the cart drawer
    window.dispatchEvent(new CustomEvent('levryn:cart:added'));
  };

  const removeFromCart = (productId) => {
    // Track removal
    const product = cart.find(item => item.id === productId);
    if (product) {
      trackRemoveFromCart(product);
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('levryn_cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
      
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#D4AF37',
            color: '#1a1a1a',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 9999,
            fontWeight: '600',
            fontSize: '14px',
            animation: 'slideIn 0.3s ease',
            maxWidth: '300px',
          }}
        >
          ✓ {notification}
        </div>
      )}
      
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @media (max-width: 768px) {
            [style*="position: fixed"][style*="bottom: 20px"] {
              bottom: 80px !important;
              right: 16px !important;
              left: 16px !important;
              max-width: calc(100% - 32px) !important;
            }
          }
        `}
      </style>
    </CartContext.Provider>
  );
};

