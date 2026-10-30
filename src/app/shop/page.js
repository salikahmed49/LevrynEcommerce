'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/catalog';
import { Search, X } from 'lucide-react';

function ShopContent() {
  const allProducts = getAllProducts();
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const q = searchParams?.get('q');
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Robust multi-term search matching across name, inspiration, notes, family, gender, and description
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    const raw = searchQuery.trim().toLowerCase();
    if (raw) {
      // Split user query into tokens (e.g. "eros versace" or "vanilla men")
      const tokens = raw.split(/\s+/).filter(Boolean);

      result = result.filter((p) => {
        // Collect all searchable text fields for this perfume
        const topNotes = p.notes?.top?.join(' ') || '';
        const heartNotes = p.notes?.heart?.join(' ') || '';
        const baseNotes = p.notes?.base?.join(' ') || '';
        const allNotes = `${topNotes} ${heartNotes} ${baseNotes}`;

        const searchableCorpus = [
          p.name,
          p.subtitle,
          p.family,
          p.gender,
          p.description,
          p.inspiration || '',
          allNotes,
        ]
          .join(' ')
          .toLowerCase();

        // Every token typed by the user must match the product corpus
        return tokens.every((token) => searchableCorpus.includes(token));
      });
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allProducts, searchQuery, sortBy]);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', paddingBottom: '96px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-alt)',
          padding: 'clamp(44px, 6vw, 76px) 0',
          borderBottom: '1px solid var(--color-border-subtle)',
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        <div className="container" style={{ maxWidth: '640px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '8px',
            }}
          >
            The Collection
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
              marginBottom: '12px',
              color: 'var(--color-text-main)',
            }}
          >
            Shop Fragrances
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Explore our complete collection of artisanal perfume renditions and original creations.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '1',
              minWidth: '220px',
              maxWidth: '380px',
              position: 'relative',
            }}
          >
            <Search size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search by perfume, inspiration (e.g. Eros), or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                padding: '4px 24px 4px 0',
                fontSize: '0.85rem',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                width: '100%',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '4px',
                  color: 'var(--color-text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                width: 'auto',
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '20px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          Showing <strong>{filteredProducts.length}</strong> fragrance
          {filteredProducts.length === 1 ? '' : 's'}
        </div>

        {/* 4-col desktop, 2-col mobile Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: 'var(--color-bg-alt)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>
              No perfumes match your search.
            </p>
            <button onClick={() => setSearchQuery('')} className="btn btn-secondary">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: '#FFFFFF' }} />}>
      <ShopContent />
    </Suspense>
  );
}
