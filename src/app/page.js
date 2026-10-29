import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/catalog';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const allProducts = getAllProducts();

  return (
    <div>
      {/* 1. Hero Section: Optimized Responsive Banner */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '0 0 clamp(24px, 3vw, 40px)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="container" style={{ padding: '0 clamp(16px, 3vw, 24px)' }}>
          <Link
            href="/shop"
            style={{
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
              margin: '20px 0 0',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 7',
              maxHeight: '75vh',
            }}
            aria-label="Explore The Fragrance Collection"
          >
            <Image
              src="/images/hero.jpg"
              alt="Levryn Haute Parfumerie Hero Banner"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{
                objectFit: 'cover',
              }}
            />
          </Link>
        </div>
      </section>

      {/* 2. Fragrance Showcase */}
      <section
        style={{
          padding: '56px 0 96px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
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
                Handcrafted Flacons
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>
                The Fragrance Collection
              </h2>
            </div>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              View In Shop <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
