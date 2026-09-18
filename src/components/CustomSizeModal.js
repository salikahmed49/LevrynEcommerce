import React, { useEffect, useState } from 'react';
import './CustomSizeModal.css';

const CustomSizeModal = ({ product, isOpen, onClose, onSelectSize }) => {
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const defaultSize = '50ml';
  const sizeInfo = product.pricing?.[defaultSize];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      onSelectSize(defaultSize);
      onClose();
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="size-modal-close" onClick={onClose}>×</button>
        <div className="size-modal-header">
          <h2>Add to Cart</h2>
          <p>{product.name}</p>
        </div>
        
        <div className="size-modal-single">
          <div className="single-size-info">
            <div className="size-display">
              <span className="size-value">50ml</span>
              <span className="size-label">Standard Size</span>
            </div>
            <div className="size-price">
              <span className="price-value">Rs. {sizeInfo?.price?.toLocaleString()}</span>
              {product.discount > 0 && (
                <span className="size-discount">Save {product.discount}%</span>
              )}
            </div>
          </div>

          <button 
            className={`size-modal-add-btn ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding || !sizeInfo?.inStock}
          >
            <span className="btn-icon">🛒</span>
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>

          {!sizeInfo?.inStock && (
            <p className="out-of-stock-message">Currently Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSizeModal;
