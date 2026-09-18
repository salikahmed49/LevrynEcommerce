import React, { useState, useEffect } from 'react';
import './QuickView.css';

const QuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  const sizes = product.pricing || {};
  const availableSizes = Object.entries(sizes).filter(([_, data]) => data.stock > 0);

  if (!selectedSize && availableSizes.length > 0) {
    setSelectedSize(availableSizes[0][0]);
  }

  const currentPrice = selectedSize ? sizes[selectedSize]?.price : product.price;
  const currentStock = selectedSize ? sizes[selectedSize]?.stock : product.stock;
  
  /* Discount logic removed */

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-close" onClick={onClose}>×</button>
        
        <div className="quick-view-content">
          <div className="quick-view-image">
            <img src={product.image} alt={product.name} />
            {product.bestSeller && <span className="qv-badge">Best Seller</span>}
          </div>

          <div className="quick-view-info">
            <h2 className="qv-name">{product.name}</h2>
            <p className="qv-rendition">{product.rendition}</p>
            
            <div className="qv-price">
              <span className="qv-price-value">Rs. {currentPrice?.toLocaleString()}</span>
            </div>

            <div className="qv-sizes">
              <h3>Select Size</h3>
              <div className="qv-size-options">
                {availableSizes.map(([size, data]) => (
                  <button
                    key={size}
                    className={`qv-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="qv-quantity">
              <h3>Quantity</h3>
              <div className="qv-quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}>+</button>
              </div>
            </div>

            <div className="qv-actions">
              <button className="qv-add-cart btn btn-primary">
                Add to Cart
              </button>
              <button className="qv-view-full btn btn-secondary" onClick={() => window.location.href = `/product/${product.id}`}>
                View Full Details
              </button>
            </div>

            {product.notes && (
              <div className="qv-notes">
                <h3>Fragrance Notes</h3>
                <div className="qv-notes-list">
                  {product.notes.top && <div className="qv-note"><strong>Top:</strong> {product.notes.top}</div>}
                  {product.notes.middle && <div className="qv-note"><strong>Heart:</strong> {product.notes.middle}</div>}
                  {product.notes.base && <div className="qv-note"><strong>Base:</strong> {product.notes.base}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
