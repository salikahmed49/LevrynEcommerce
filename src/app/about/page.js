import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "About Levryn | Pakistan's Handcrafted Luxury Perfume Brand",
  description:
    'Learn about Levryn, founded by Salik Ahmed Bhatti. Handcrafted designer fragrance renditions and original creations with meticulous artisanal quality.',
  alternates: {
    canonical: 'https://www.shoplevryn.com/about',
  },
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '64px 0 96px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            The Art of Accessible Luxury
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              marginBottom: '16px',
              color: 'var(--color-text-main)',
            }}
          >
            About Levryn
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Levryn is born from a singular vision: to make the world of exquisite fragrance both personal and accessible. Founded by Salik Ahmed Bhatti, we are not just a brand; we are a promise of unparalleled artisanal quality delivered directly from our hands to yours.
          </p>
        </div>

        {/* Narrative Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', lineHeight: 1.7 }}>
          <section
            style={{
              backgroundColor: 'var(--color-bg-alt)',
              padding: 'clamp(28px, 4vw, 36px)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                marginBottom: '12px',
                color: 'var(--color-text-main)',
              }}
            >
              The Artisan&apos;s Pledge
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', margin: 0 }}>
              I, <strong>Salik Ahmed Bhatti</strong>, am the Artisan Creator behind every scent at Levryn. My journey started from a deep passion, building everything from scratch to ensure meticulous control over every detail. This is where high-end fragrance meets true hand-craftsmanship.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                marginBottom: '12px',
                color: 'var(--color-text-main)',
              }}
            >
              Iconic Renditions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem' }}>
              Meticulously crafted interpretations of the world&apos;s most cherished fragrances, offering their complexity and depth at an accessible price point. Each blend captures the intricate balance and rich silage of classic olfactory masterpieces.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                marginBottom: '12px',
                color: 'var(--color-text-main)',
              }}
            >
              Original Creations
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem' }}>
              Unique, handcrafted scents formulated in-house, designed to become your next signature aroma with distinctive, memorable scent accords.
            </p>
          </section>

          <section
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: '32px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', marginBottom: '16px' }}>
              Every drop is carefully measured, blended, and bottled by hand, reflecting a commitment to quality that mass production simply cannot match. Levryn is where passion, precision, and the belief that true luxury should be within reach, converge.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'var(--color-primary)',
                marginBottom: '32px',
              }}
            >
              Elevate your essence with Levryn.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                Shop Fragrances
              </Link>
              <Link href="/contact" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                Get in Touch
              </Link>
              <Link href="/faq" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                Read FAQ
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
