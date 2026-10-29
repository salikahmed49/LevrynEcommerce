'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const { totalItemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const leftNavLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Our Story', href: '/about' },
  ];

  const rightNavLinks = [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border-subtle)',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '74px',
          }}
        >
          {/* Mobile Menu Button + Desktop Nav Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifySelf: 'start' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                color: 'var(--color-text-main)',
              }}
              className="mobile-only-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Navigation Left */}
            <nav className="desktop-nav" style={{ display: 'none', gap: '24px' }}>
              {leftNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-main)',
                  }}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centered Brand Logo */}
          <Link
            href="/"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              padding: '4px 0',
              justifySelf: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--color-primary)',
                display: 'block',
                lineHeight: 1,
              }}
            >
              LEVRYN
            </span>
          </Link>

          {/* Desktop Navigation Right + Utilities */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', justifySelf: 'end' }}>
            <nav className="desktop-nav" style={{ display: 'none', gap: '24px', marginRight: '8px' }}>
              {rightNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-main)',
                  }}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search perfumes"
              style={{
                padding: '8px',
                color: 'var(--color-text-main)',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Search size={20} />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                position: 'relative',
              }}
            >
              <ShoppingBag size={19} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{totalItemCount}</span>
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div
            style={{
              padding: '16px 0',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--color-border-subtle)',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <div className="container" style={{ maxWidth: '640px' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                style={{ display: 'flex', gap: '8px' }}
              >
                <input
                  type="text"
                  placeholder="Search by fragrance or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--color-border)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[...leftNavLinks, ...rightNavLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-main)',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Responsive Nav Media Queries */}
      <style jsx>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-only-btn {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: var(--color-primary) !important;
        }
      `}</style>
    </>
  );
}
