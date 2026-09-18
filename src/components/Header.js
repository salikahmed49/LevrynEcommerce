import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AnnouncementMarquee from './AnnouncementMarquee';
import CartDrawer from './CartDrawer';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Device detection for UI optimization
  React.useEffect(() => {
    // We already have a responsive CSS system, but keeping the resize listener 
    // for future JS-based layout optimizations if needed.
    const handleResize = () => {
      // Logic for mobile check removed to fix lint warning
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      closeMenu();
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Auto-open cart drawer when item is added
  React.useEffect(() => {
    const handleCartAdded = () => {
      setIsCartOpen(true);
    };
    window.addEventListener('levryn:cart:added', handleCartAdded);
    return () => window.removeEventListener('levryn:cart:added', handleCartAdded);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <AnnouncementMarquee />
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => { closeMenu(); scrollToTop(); }}>
          <h1>Levryn</h1>
        </Link>
        
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/products" className="nav-link" onClick={closeMenu}>Shop</Link>
          <Link to="/premium-lineup" className="nav-link" onClick={closeMenu}>Premium</Link>
          <Link to="/budget-series" className="nav-link" onClick={closeMenu}>Budget</Link>
          <Link to="/corporate-orders" className="nav-link" onClick={closeMenu}>Corporate</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          
          <div className="nav-utils">
            <button 
              className="nav-util-btn" 
              onClick={() => { closeMenu(); setIsSearchOpen(true); }}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>

            <button 
              className="nav-util-btn cart-link" 
              onClick={() => { closeMenu(); setIsCartOpen(true); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {isSearchOpen && (
          <div className="search-modal-overlay" onClick={() => setIsSearchOpen(false)}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSearchSubmit} className="search-modal-form">
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="What are you looking for?" 
                  className="search-modal-input"
                />
                <button type="button" className="search-modal-close" onClick={() => setIsSearchOpen(false)}>×</button>
              </form>
            </div>
          </div>
        )}
        
        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </header>
  );
};

export default Header;

