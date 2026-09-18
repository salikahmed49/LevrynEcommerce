import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import { products as fallbackProducts } from '../data/products';

const ProductsContext = createContext();

// Map Supabase snake_case columns to frontend camelCase
const mapProduct = (p) => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  discount: p.discount || 0,
  onSale: p.on_sale || false,
  size: p.size,
  image: p.image,
  bestSelling: p.best_selling || false,
  description: p.description || '',
  rendition: p.rendition || '',
  notes: p.notes || '',
  pricing: typeof p.pricing === 'object' && p.pricing !== null ? p.pricing : {},
});

// Map frontend camelCase back to Supabase snake_case for writes
export const mapToSupabase = (p) => ({
  name: p.name,
  price: parseFloat(p.price),
  discount: parseInt(p.discount) || 0,
  on_sale: Boolean(p.onSale),
  size: p.size || '50ml',
  image: p.image || '',
  best_selling: Boolean(p.bestSelling),
  description: p.description || '',
  rendition: p.rendition || '',
  notes: p.notes || '',
  pricing: p.pricing || {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setProducts(data.map(mapProduct));
      } else {
        // Table exists but is empty — use fallback
        logger.warn('No products in Supabase, using fallback data.');
        setProducts(fallbackProducts);
      }
    } catch (err) {
      logger.error('Failed to fetch products from Supabase:', err);
      setError(err.message);
      // Fall back to static data so the site still works
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    // ── Realtime subscription ─────────────────────────────────────────────
    // Any INSERT / UPDATE / DELETE on the products table in Supabase triggers
    // an automatic re-fetch so the storefront (and any other open tabs) stay
    // in sync with whatever the admin just saved — no page reload required.
    const channel = supabase
      .channel('products_live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          logger.log('[PRODUCTS] Realtime change detected — refreshing product list…');
          fetchProducts();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id) => products.find((product) => product.id === parseInt(id)),
    [products]
  );

  const value = {
    products,
    loading,
    error,
    getProductById,
    refreshProducts: fetchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
