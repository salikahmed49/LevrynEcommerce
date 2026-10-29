import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Levryn Luxury Perfumes';
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2F4F4F',
          backgroundImage: 'radial-gradient(circle at 50% 40%, #3D6666 0%, #1E3434 100%)',
          color: '#FFFFFF',
          padding: '48px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Subtle Luxury Border Inset */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            borderRadius: '8px',
            pointerEvents: 'none',
          }}
        />

        <span
          style={{
            fontSize: 16,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#C5A059',
            marginBottom: 16,
            fontFamily: 'sans-serif',
            fontWeight: 600,
          }}
        >
          Haute Parfumerie &middot; Pakistan
        </span>

        <h1
          style={{
            fontSize: 76,
            fontWeight: 500,
            letterSpacing: 10,
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          LEVRYN
        </h1>

        <p
          style={{
            fontSize: 24,
            color: '#D2DFDC',
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 0 28px 0',
            fontFamily: 'sans-serif',
            fontWeight: 300,
            lineHeight: 1.4,
          }}
        >
          Handcrafted Extrait de Parfum &middot; Artisanal Blends
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            padding: '10px 28px',
            borderRadius: 4,
            fontSize: 18,
            color: '#EFEFEF',
            fontFamily: 'sans-serif',
          }}
        >
          <span>From Rs. 1,200</span>
          <span>&middot;</span>
          <span>Complimentary Delivery over Rs. 3,500</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
