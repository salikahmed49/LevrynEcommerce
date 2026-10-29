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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
        style={{
          padding: '18px 18px 16px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '4px',
            display: 'block',
          }}
        >
          {product.family} &middot; {product.gender}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.22rem',
            margin: '0 0 4px',
            color: 'var(--color-text-main)',
            fontWeight: 500,
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
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            margin: '0 0 14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em',
          }}
        >
          {product.subtitle}
        </p>

        {/* Price & Cart Actions */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Rs. {defaultSizeObj.price.toLocaleString()}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                marginTop: '1px',
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
              padding: '8px 14px',
              fontSize: '0.8rem',
              gap: '4px',
            }}
            aria-label={`Add ${product.name} to bag`}
          >
            {added ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <Plus size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
