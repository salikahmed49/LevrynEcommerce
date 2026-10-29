'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import PerfumeBottlePlaceholder from './PerfumeBottlePlaceholder';
import { Plus, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [added, setAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const hasImages = product.images && product.images.length > 0 && !imageFailed;
  const primaryImage = product.images?.[0];
  const hoverImage = product.images?.[1] || primaryImage;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition)',
        position: 'relative',
      }}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Bottle Presentation & Link */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        {hasImages ? (
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 5',
              backgroundColor: '#F8F9F9',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={isHovered && hoverImage ? hoverImage : primaryImage}
              alt={product.name}
              onError={() => setImageFailed(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease, opacity 0.3s ease',
              }}
            />
          </div>
        ) : (
          <PerfumeBottlePlaceholder name={product.name} concentration={product.concentration} />
        )}
      </Link>

      {/* Product Info */}
      <div
        style={{
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {product.family} &middot; {product.gender}
          </span>

          <Link href={`/products/${product.slug}`}>
            <h3
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)',
                marginBottom: '4px',
                color: 'var(--color-text-main)',
              }}
            >
              {product.name}
            </h3>
          </Link>

          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.subtitle}
          </p>
        </div>

        {/* Size Pills & Quick Add */}
        <div>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '12px',
            }}
          >
            {product.sizes.map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(s.size);
                }}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: selectedSize === s.size ? 600 : 400,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${
                    selectedSize === s.size ? 'var(--color-primary)' : 'var(--color-border)'
                  }`,
                  backgroundColor:
                    selectedSize === s.size ? 'var(--color-primary-subtle)' : 'transparent',
                  color: selectedSize === s.size ? 'var(--color-primary)' : 'var(--color-text-muted)',
                }}
              >
                {s.size}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {selectedSize}
              </span>
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                Rs. {defaultSizeObj.price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              type="button"
              className="btn btn-primary"
              style={{
                padding: '8px 12px',
                fontSize: '0.75rem',
                gap: '4px',
              }}
              aria-label={`Add ${product.name} ${selectedSize} to cart`}
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <Plus size={14} /> Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover {
          border-color: rgba(47, 79, 79, 0.28);
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
