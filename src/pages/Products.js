import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.rendition?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.notes?.toLowerCase().includes(q)
      );
    }

    // Apply filters
    if (filter === 'bestSelling') {
      filtered = products.filter((p) => p.bestSelling);
    } else if (filter === 'onSale') {
      filtered = products.filter((p) => p.onSale);
    } else if (filter === 'inStock') {
      filtered = products.filter((p) => {
        // Check if any size is in stock
        return Object.values(p.pricing).some(size => size.inStock);
      });
    } else if (filter === 'outOfStock') {
      filtered = products.filter((p) => {
        // Check if all sizes are out of stock
        return Object.values(p.pricing).every(size => !size.inStock);
      });
    } else if (filter === 'under3000') {
      filtered = products.filter((p) => p.price < 3000);
    } else if (filter === 'above3000') {
      filtered = products.filter((p) => p.price >= 3000);
    } else if (filter === '50ml') {
      filtered = products.filter((p) => p.pricing['50ml']);
    } else if (filter === '100ml') {
      filtered = products.filter((p) => p.pricing['100ml']);
    }

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
          return b.id - a.id; // Assuming higher ID = newer
        case 'popular':
          return b.bestSelling - a.bestSelling; // Best sellers first
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, filter, sortBy, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Shop Luxury Perfumes Online Pakistan | Levryn Collection - 27+ Designer Fragrances from Rs. 1,200</title>
        <meta name="description" content="Browse Levryn's complete collection of 27+ luxury perfumes. Designer fragrance renditions of Chanel, Dior, Creed Aventus, Amouage & more. Prices from Rs. 1,200. Free shipping over Rs. 3,000. Fast delivery to Karachi, Lahore, Islamabad & all Pakistan." />
        <meta name="keywords" content="buy perfumes online Pakistan, luxury fragrances, designer perfumes Karachi, perfume shop Lahore, Levryn collection, Chanel perfume, Dior perfume, Creed Aventus dupe, premium scents Islamabad, affordable luxury perfume Pakistan, best online perfume shop Pakistan" />
        
        <link rel="canonical" href="https://www.shoplevryn.com/products" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Shop 27+ Luxury Perfumes - Levryn Collection Pakistan | From Rs. 1,200" />
        <meta property="og:description" content="Browse our complete collection of luxury perfumes and designer fragrance renditions. Premium quality at affordable prices. Fast delivery across Pakistan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shoplevryn.com/products" />
        <meta property="og:image" content="https://www.shoplevryn.com/images/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Luxury Perfumes - Levryn Collection" />
        <meta name="twitter:description" content="27+ designer fragrance renditions from Rs. 1,200. Fast delivery across Pakistan." />
      </Helmet>
      
      <div className="products-page">
        <div className="products-header">
          <div className="container">
            <h1 className="products-title">{searchQuery ? `Search Results for "${searchQuery}"` : 'The Collection'}</h1>
            <p className="products-subtitle">{searchQuery ? 'Discover your perfect scent' : 'Curated Luxury Fragrances'}</p>
          </div>
        </div>

        <div className="products-content">
          <div className="container">
            <div className="filters-section">
              <div className="filter-group">
                <label htmlFor="filter">Filter:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Products</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="onSale">On Sale</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                  <option value="under3000">Under Rs. 3,000</option>
                  <option value="above3000">Above Rs. 3,000</option>
                  <option value="50ml">50ml Size</option>
                  <option value="100ml">100ml Size</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>


            </div>

            <div className="results-count">
              {filteredAndSortedProducts.length} Products
            </div>

            <div className="products-grid">
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <div key={i} className="product-card-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-text skeleton-title"></div>
                      <div className="skeleton-text skeleton-price"></div>
                    </div>
                  </div>
                ))
              ) : (
                filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


