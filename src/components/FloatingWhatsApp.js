'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BANK_CONFIG } from '@/lib/config';

export default function FloatingWhatsApp() {
  const phone = (BANK_CONFIG.supportWhatsApp || '923272332833').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hi Levryn team! I have an inquiry about your perfumes & notes.'
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Levryn Fragrance Consultant on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
        zIndex: 999,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.55)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.4)';
      }}
    >
      <MessageCircle size={28} />
    </a>
  );
}

