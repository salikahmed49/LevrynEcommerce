import React from 'react';

/**
 * Clean SVG Luxury Perfume Silhouette.
 * Ensures the storefront looks complete, elegant, and editorial before custom product images are uploaded.
 */
export default function PerfumeBottlePlaceholder({ name, concentration = 'Extrait de Parfum', className = '' }) {
  return (
    <div className={`perfume-placeholder ${className}`}>
      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${name} fragrance bottle preview`}
      >
        {/* Soft Shadow */}
        <ellipse cx="100" cy="265" rx="58" ry="8" fill="#141C1A" fillOpacity="0.08" />

        {/* Cap */}
        <rect x="86" y="24" width="28" height="34" rx="3" fill="#2F4F4F" />
        <rect x="88" y="26" width="24" height="6" rx="1" fill="#C5A059" fillOpacity="0.4" />

        {/* Atomizer Neck */}
        <rect x="91" y="58" width="18" height="12" fill="#C5A059" />
        <line x1="91" y1="64" x2="109" y2="64" stroke="#966F23" strokeWidth="1" />

        {/* Heavy Glass Flacon Body */}
        <rect
          x="44"
          y="70"
          width="112"
          height="180"
          rx="6"
          fill="#FFFFFF"
          stroke="#2F4F4F"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Liquid Gradient / Level */}
        <rect
          x="50"
          y="100"
          width="100"
          height="144"
          rx="3"
          fill="url(#perfume_liquid)"
          fillOpacity="0.35"
        />

        {/* Minimalist Label */}
        <rect
          x="58"
          y="120"
          width="84"
          height="92"
          rx="2"
          fill="#FAFAFA"
          stroke="#2F4F4F"
          strokeWidth="0.75"
          strokeOpacity="0.2"
        />
        <text
          x="100"
          y="142"
          textAnchor="middle"
          fill="#2F4F4F"
          fontSize="11"
          letterSpacing="2.5"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
        >
          LEVRYN
        </text>
        <line x1="78" y1="150" x2="122" y2="150" stroke="#C5A059" strokeWidth="0.8" />
        <text
          x="100"
          y="172"
          textAnchor="middle"
          fill="#141C1A"
          fontSize="10"
          letterSpacing="0.8"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="500"
        >
          {name ? name.toUpperCase() : 'FRAGRANCE'}
        </text>
        <text
          x="100"
          y="194"
          textAnchor="middle"
          fill="#5C6E6A"
          fontSize="6.5"
          letterSpacing="1"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          EXTRAIT DE PARFUM
        </text>

        {/* Gradient Defs */}
        <defs>
          <linearGradient id="perfume_liquid" x1="100" y1="100" x2="100" y2="244" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6ECE9" />
            <stop offset="1" stopColor="#D2DFDC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
