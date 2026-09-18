import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="close-drawer-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-drawer-content">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your cart is empty</p>
              <button 
                className="btn btn-primary" 
                onClick={() => { onClose(); navigate('/products'); }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-drawer-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-size">{item.size || '50ml'}</p>
                    <p className="cart-item-price">Rs. {item.price.toLocaleString()}</p>
                    
                    <div className="cart-quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>Rs. {getCartTotal().toLocaleString()}</span>
            </div>
            <p className="shipping-notice">Shipping and taxes calculated at checkout.</p>
            <button 
              className="btn btn-primary btn-block checkout-btn" 
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              Checkout Now
            </button>
            <Link 
              to="/cart" 
              className="view-cart-link" 
              onClick={onClose}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
