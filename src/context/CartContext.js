'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHIPPING_CONFIG } from '@/lib/config';
import { validateCoupon } from '@/lib/catalog';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null); // { code: 'LEVRYN10', discountPct: 10 }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('levryn_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem('levryn_coupon');
      if (storedCoupon) {
        const parsed = JSON.parse(storedCoupon);
        const valid = validateCoupon(parsed.code);
        if (valid) setCoupon(valid);
      }
    } catch (e) {
      console.warn('Failed to load cart from storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('levryn_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to storage', e);
    }
  }, [cart, isLoaded]);

  // Sync coupon to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (coupon) {
        localStorage.setItem('levryn_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('levryn_coupon');
      }
    } catch (e) {
      console.warn('Failed to save coupon to storage', e);
    }
  }, [coupon, isLoaded]);

  const addToCart = (product, size = '50ml', quantity = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === size) || product.sizes[0];
    const price = sizeObj ? sizeObj.price : product.sizes[0].price;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(20, next[existingIndex].quantity + quantity),
        };
        return next;
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          subtitle: product.subtitle,
          size,
          price,
          quantity: Math.max(1, quantity),
          image: product.images[0] || null,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: Math.min(20, newQty) } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    try {
      localStorage.removeItem('levryn_cart');
      localStorage.removeItem('levryn_coupon');
    } catch (e) {}
  };

  const applyCoupon = (code) => {
    const valid = validateCoupon(code);
    if (valid) {
      setCoupon(valid);
      return { success: true, coupon: valid };
    }
    return { success: false, error: 'Invalid coupon code. Try LEVRYN10, LEVRYN20, or LEVRYN30' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.discountPct) / 100) : 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const standardDeliveryFee = SHIPPING_CONFIG.standardDeliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        coupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        subtotalAfterDiscount,
        totalItemCount,
        standardDeliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
