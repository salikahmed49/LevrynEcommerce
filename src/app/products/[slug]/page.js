'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getProductBySlug, getAllProducts } from '@/lib/catalog';
import PerfumeBottlePlaceholder from '@/components/PerfumeBottlePlaceholder';
import ProductCard from '@/components/ProductCard';
import CustomerReviews from '@/components/CustomerReviews';
import {
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Check,
} from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Monitor scroll for mobile sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return notFound();
  }

  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const relatedProducts = getAllProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Google JSON-LD Product & Offer Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [`https://www.shoplevryn.com${product.images[0]}`],
    brand: {
      '@type': 'Brand',
      name: 'Levryn',
    },
    offers: {
      '@type': 'Offer',
      price: currentSizeObj.price,
      priceCurrency: 'PKR',
      availability: currentSizeObj.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://www.shoplevryn.com/products/${product.slug}`,
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '12',
    },
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '85vh', paddingBottom: '96px' }}>
      {/* Embed Structured Data for Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-bg-alt)',
          padding: '14px 0',
        }}
      >
        <div className="container">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>
              Shop
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="container" style={{ paddingTop: 'clamp(32px, 5vw, 64px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(36px, 6vw, 72px)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Media Presentation */}
          <div>
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-alt)',
                position: 'relative',
              }}
            >
              {product.images && product.images.length > 0 && !imageError ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 5',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <PerfumeBottlePlaceholder name={product.name} concentration={product.concentration} />
              )}
            </div>

            {/* Thumbnail row if multiple images exist */}
            {product.images && product.images.length > 1 && !imageError && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      position: 'relative',
                      width: '64px',
                      height: '80px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: `2px solid ${
                        activeImageIndex === idx ? 'var(--color-primary)' : 'var(--color-border-subtle)'
                      }`,
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Buy Box */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {product.family} &middot; {product.gender}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                marginBottom: '8px',
                color: 'var(--color-text-main)',
              }}
            >
              {product.name}
            </h1>

            {/* Olfactory Inspiration Badge */}
            {product.inspiration && (
              <div style={{ marginBottom: '18px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-bg-alt)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ fontSize: '0.85rem' }}>✨</span>
                  {product.inspiration}
                </span>
              </div>
            )}

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              {product.subtitle}
            </p>

            {/* Price display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--color-border-subtle)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Rs. {currentSizeObj.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Tax included
              </span>
            </div>

            {/* Size Selector Pills */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Select Size
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>Extrait Concentration</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    disabled={!s.inStock}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border:
                        selectedSize === s.size
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                      backgroundColor: selectedSize === s.size ? 'var(--color-bg-alt)' : '#FFFFFF',
                      textAlign: 'center',
                      cursor: s.inStock ? 'pointer' : 'not-allowed',
                      opacity: s.inStock ? 1 : 0.45,
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '0.92rem',
                        color:
                          selectedSize === s.size ? 'var(--color-primary)' : 'var(--color-text-main)',
                      }}
                    >
                      {s.size}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '2px',
                      }}
                    >
                      Rs. {s.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '14px 16px', color: 'var(--color-text-main)' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    minWidth: '32px',
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  style={{ padding: '14px 16px', color: 'var(--color-text-main)' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!currentSizeObj.inStock}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  fontSize: '0.95rem',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Bag
                  </>
                ) : !currentSizeObj.inStock ? (
                  'Currently Out of Stock'
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Bag &middot; Rs.{' '}
                    {(currentSizeObj.price * quantity).toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Olfactory Accord Pyramid & Notes Breakdown */}
        <section
          style={{
            marginTop: '80px',
            paddingTop: '64px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Fragrance Architecture
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>
              The Olfactory Pyramid
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              {product.description}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Top Notes */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '32px 24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Opening Accord
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '14px' }}>
                Top Notes
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                The immediate impression upon first application.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {product.notes.top.map((note) => (
                  <span
                    key={note}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Heart Notes */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '32px 24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                The Soul
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '14px' }}>
                Heart Notes
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                The core character that blooms as the fragrance settles.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {product.notes.heart.map((note) => (
                  <span
                    key={note}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Notes */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                padding: '32px 24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                The Drydown
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '14px' }}>
                Base Notes
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Rich lingering depth providing lasting sillage and resonance.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {product.notes.base.map((note) => (
                  <span
                    key={note}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Real Customer Feedback & Reviews Section */}
        <CustomerReviews productSlug={product.slug} productName={product.name} />

        {/* You May Also Like */}
        <section style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Complementary Accords
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>
              You May Also Appreciate
            </h2>
          </div>

          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Buy Bar */}
      {showStickyBar && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            padding: '12px 20px',
            zIndex: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>
              {product.name} &middot; {selectedSize}
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              Rs. {(currentSizeObj.price * quantity).toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!currentSizeObj.inStock}
            className="btn btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            {added ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      )}
    </div>
  );
}
