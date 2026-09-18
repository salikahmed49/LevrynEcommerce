import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Tilt from 'react-parallax-tilt';
import QuickView from './QuickView';
import CustomSizeModal from './CustomSizeModal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showQuickView, setShowQuickView] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setShowSizeModal(true);
  };

  const onSelectSize = (size) => {
    const sizeInfo = product.pricing?.[size];
    const productToAdd = {
      ...product,
      price: sizeInfo ? sizeInfo.price : product.price,
      size: size
    };
    addToCart(productToAdd);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  // Check if default size is in stock
  const defaultSize = product.size || '50ml';
  const sizeInfo = product.pricing?.[defaultSize];
  const isInStock = sizeInfo ? sizeInfo.inStock : true;

  // Calculate discounted price savings
  const hasDiscount = product.discount > 0 && product.onSale;
  const savings = hasDiscount 
    ? Math.round(product.price * (product.discount / 100))
    : 0;

  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <Tilt 
        className="tilt-wrapper" 
        tiltMaxAngleX={8} 
        tiltMaxAngleY={8} 
        perspective={1000} 
        scale={1.02} 
        transitionSpeed={1000}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="bottom"
      >
        <div className="product-card">
          <button 
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={inWishlist ? "var(--gold-primary)" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <Link to={`/product/${product.id}`} className="product-link">
            <div className="product-image-container">
              {!isInStock && <div className="out-of-stock-badge">Sold Out</div>}
              {product.bestSelling && <div className="best-seller-badge">Best Seller</div>}
              {hasDiscount && <div className="sale-badge">Save Rs. {savings.toLocaleString()}</div>}
              <img
                src={product.image}
                alt={`${product.name} - ${product.size}`}
                className="product-image img-product"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              
              {/* Hover Actions Container */}
              <div className="product-hover-actions">
                <button 
                  className={`add-to-cart-overlay-btn ${!isInStock ? 'disabled' : ''}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(e); }}
                  disabled={!isInStock}
                >
                  {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button 
                  className="quick-view-icon-btn"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickView(e); }}
                  aria-label="Quick view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="product-info">
              {product.rendition && product.rendition !== 'Original Creation' && (
                <p className="product-rendition">
                  {product.rendition.replace('Rendition of ', '')}
                </p>
              )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                From Rs. {Math.min(...Object.values(product.pricing).map(p => p.price)).toLocaleString()}
              </p>
            </div>
          </Link>
        </div>
      </Tilt>

      {showQuickView && (
        <QuickView 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}

      <CustomSizeModal
        product={product}
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        onSelectSize={onSelectSize}
      />
    </>
  );
};

export default ProductCard;

