'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import PerfumeBottlePlaceholder from './PerfumeBottlePlaceholder';
import { Plus, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize] = useState('50ml');
  const [added, setAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [, setIsHovered] = useState(false);

  const defaultSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const hasImages = product.images && product.images.length > 0 && !imageFailed;
  const primaryImage = product.images?.[0];

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
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 5',
            backgroundColor: 'var(--color-bg-alt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {hasImages ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <PerfumeBottlePlaceholder name={product.name} />
          )}
        </div>
      </Link>

      {/* Product Information Body */}
      <div
        className="product-card-body"
        style={{
          padding: 'clamp(12px, 3vw, 18px)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '3px',
            display: 'block',
          }}
        >
          {product.family}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
            margin: '0 0 3px',
            color: 'var(--color-text-main)',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          <Link
            href={`/products/${product.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {product.name}
          </Link>
        </h3>

        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.35,
            margin: '0 0 10px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
          }}
        >
          {product.subtitle}
        </p>

        {/* Price & Action Area: Clean responsive layout on both mobile & desktop */}
        <div
          className="product-card-footer"
          style={{
            marginTop: 'auto',
            paddingTop: '10px',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ minWidth: '70px', lineHeight: 1.15 }}>
            <span
              style={{
                fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-sans)',
                display: 'block',
                letterSpacing: '-0.01em',
              }}
            >
              Rs. {defaultSizeObj.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              50ml Flacon
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            type="button"
            className="btn btn-primary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              gap: '4px',
              borderRadius: 'var(--radius-sm)',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
            aria-label={`Add ${product.name} to bag`}
          >
            {added ? (
              <>
                <Check size={13} /> Added
              </>
            ) : (
              <>
                <Plus size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
