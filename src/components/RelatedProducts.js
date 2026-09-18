import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

const RelatedProducts = ({ currentProductId, category }) => {
  const { products } = useProducts();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const currentProduct = products.find(p => p.id === parseInt(currentProductId));
      if (currentProduct) {
        const filtered = products.filter(p => p.id !== parseInt(currentProductId));
        const priceRange = currentProduct.price * 0.4;
        let related = filtered.filter(p => 
          Math.abs(p.price - currentProduct.price) <= priceRange
        );

        // If not enough in same price range, fill with random products
        if (related.length < 4) {
          const remaining = filtered.filter(p => !related.find(r => r.id === p.id));
          related = [...related, ...remaining.sort(() => Math.random() - 0.5)];
        }

        setRelatedProducts(related.slice(0, 4));
      }
    }
  }, [products, currentProductId, category]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="related-products-section" style={{
      padding: 'var(--spacing-3xl) 0',
      borderTop: '1px solid var(--gray-light)',
      marginTop: 'var(--spacing-3xl)',
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)',
        color: 'var(--black)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        You May Also Like
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }} className="products-grid">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
        <Link to="/products" className="btn btn-secondary">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;
