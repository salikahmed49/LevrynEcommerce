import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: 'linear-gradient(135deg, #1E3434 0%, #2F4F4F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          borderRadius: 36,
          fontWeight: 700,
          fontFamily: 'serif',
          border: '4px solid #C5A059',
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}

