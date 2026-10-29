import React from 'react';
import Link from 'next/link';
import { Truck, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1E2B28',
        color: '#E8ECEB',
        paddingTop: '64px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        marginTop: '80px',
      }}
    >
      <div className="container">
        {/* Top Feature Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <Sparkles size={24} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                Extrait de Parfum
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#A2B1AD' }}>
                Artisanal formulations handcrafted with premium fragrance oils.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <Truck size={24} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                Nationwide Courier
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#A2B1AD' }}>
                Dispatched in custom protective packaging and delivered via tracked express courier across Karachi, Lahore, Islamabad & all Pakistan.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <MessageCircle size={24} color="#C5A059" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>
                Personalized Care
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#A2B1AD' }}>
                Direct consultation and responsive support via WhatsApp at +92 327 2332833.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              LEVRYN
            </span>
            <p style={{ fontSize: '0.85rem', color: '#A2B1AD', lineHeight: 1.6 }}>
              Founded by Salik Ahmed Bhatti. Handcrafted in Pakistan, creating master renditions and
              original creations that honor fine perfumery traditions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              The Shop
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/shop" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  Explore All Perfumes
                </Link>
              </li>
              <li>
                <Link href="/shop" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  Signature Extraits
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  Artisanal Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/about" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  About Levryn
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  Shipping & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#A2B1AD', fontSize: '0.88rem' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Connect
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href="https://wa.me/923272332833"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#A2B1AD',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp: +92 327 2332833
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@levryn.com"
                  style={{
                    color: '#A2B1AD',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Mail size={16} /> info@levryn.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/levryn__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#A2B1AD',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <InstagramIcon size={16} /> @levryn__
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61580660576348"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#A2B1AD',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <FacebookIcon size={16} /> Levryn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.75rem',
            color: '#7E918C',
          }}
        >
          <p>
            *Disclaimer: Name trademarks and copyrights are properties of their respective manufacturers and/or designers. Levryn has no affiliation with the manufacturers/designers. Our interpretations are original handcrafted formulations inspired by classic olfactory fragrance families.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span>&copy; {new Date().getFullYear()} Levryn Perfumes. All rights reserved.</span>
            <span>Canonical Domain: https://www.shoplevryn.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
