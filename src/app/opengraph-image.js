import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Levryn | Artisanal Haute Parfumerie & Handcrafted Extrait de Parfum';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1E2B28',
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(47, 79, 79, 0.45) 0%, rgba(30, 43, 40, 0.95) 70%)',
          color: '#FFFFFF',
          padding: '60px 80px',
          fontFamily: 'serif',
          textAlign: 'center',
        }}
      >
        {/* Brand Monogram / Accent */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C5A059',
            marginBottom: 20,
            fontFamily: 'sans-serif',
            fontWeight: 600,
          }}
        >
          LEVRYN &middot; LUXURY PERFUMES
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 900,
            letterSpacing: '-0.02em',
            color: '#F9FAFB',
          }}
        >
          Artisanal Extrait de Parfum
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#D1D5DB',
            maxWidth: 720,
            lineHeight: 1.45,
            fontFamily: 'sans-serif',
            fontWeight: 300,
            marginBottom: 36,
          }}
        >
          Handcrafted in Pakistan &middot; High Concentration Fragrances
        </div>

        {/* Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            padding: '10px 28px',
            borderRadius: 4,
            fontSize: 18,
            color: '#EFEFEF',
            fontFamily: 'sans-serif',
          }}
        >
          <span>From Rs. 1,500</span>
          <span>&middot;</span>
          <span>Flat Rs. 250 Nationwide Delivery</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
