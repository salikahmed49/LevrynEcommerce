import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Levryn</h3>
          <p>Luxury perfumes crafted to elevate your senses. Experience the essence of elegance and sophistication. Pakistan's premier destination for designer fragrance renditions.</p>
        </div>
        <div className="footer-section">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/premium-lineup">Premium Collection</Link>
          <Link to="/budget-series">Budget Series</Link>
          <Link to="/corporate-orders">Corporate Orders</Link>
        </div>
        <div className="footer-section">
          <h4>Help & Info</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/track-order">Track Order</Link>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p><a href="mailto:info@levryn.com">info@levryn.com</a></p>
          <p><a href="tel:+923272332833">+92 327 2332833</a></p>
          <p><a href="https://wa.me/923272332833" target="_blank" rel="noopener noreferrer">WhatsApp Support</a></p>
          <div className="social-links">
            <a href="https://www.instagram.com/levryn__/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61580660576348" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-seo-text">
        <p>
          Levryn - Buy luxury perfumes online in Pakistan. Designer fragrance renditions of Chanel, Dior, Creed, Amouage & more. 
          Delivery across Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan. 
          Affordable premium scents from Rs. 1,200.
        </p>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Levryn. All rights reserved. | <Link to="/faq" style={{ color: 'inherit' }}>FAQ</Link> | <Link to="/about" style={{ color: 'inherit' }}>About</Link> | <Link to="/contact" style={{ color: 'inherit' }}>Contact</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
