import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import './Products.css';

const PremiumLineUp = () => {
  const { products, loading } = useProducts();
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');


  const filteredAndSortedProducts = useMemo(() => {
    // Filter out premium products (price >= 2000)
    let filtered = products.filter((p) => p.price >= 2000);

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return b.id - a.id; 
        case 'popular':
          return b.bestSelling ? -1 : 1;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, sortBy]);

  return (
    <>
      <Helmet>
        <title>Premium Lineup | Luxury Perfumes Online Pakistan | Levryn</title>
        <meta name="description" content="Explore Levryn's Premium Lineup. The finest and most eternal luxury fragrances crafted to make a bold statement." />
      </Helmet>
      
      <div className="products-page" style={{ background: 'var(--cream)' }}>
        <div className="products-header" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <h1 className="products-title">Premium Lineup</h1>
            <p className="products-subtitle">Eternal Elegance</p>
          </div>
        </div>

        <div className="products-content">
          <div className="container">
            <div className="filters-section" style={{ justifyContent: 'flex-end', background: 'var(--cream)' }}>
              <div className="filter-group">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <div className="view-toggles" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: viewMode === 'grid' ? 1 : 0.4 }}
                  aria-label="Grid View"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: viewMode === 'list' ? 1 : 0.4 }}
                  aria-label="List View"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="results-count">
              {filteredAndSortedProducts.length} Products
            </div>

            <div className={`products-grid ${viewMode}-view`}>
              {loading ? (
                <p style={{ textAlign: 'center', width: '100%', padding: '2rem', opacity: 0.6 }}>Loading products...</p>
              ) : (
                filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="no-products">
                <p>No products found in this collection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumLineUp;
