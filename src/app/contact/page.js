import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/SocialIcons';

export const metadata = {
  title: 'Contact Levryn Perfumes Pakistan | WhatsApp, Email, Phone',
  description:
    'Contact Levryn Perfumes Pakistan. Reach us via WhatsApp at +92 327 2332833, email info@levryn.com, or Instagram @levryn__. Fast delivery across Pakistan.',
  alternates: {
    canonical: 'https://www.shoplevryn.com/contact',
  },
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: 'Email',
      value: 'info@levryn.com',
      href: 'mailto:info@levryn.com',
      icon: Mail,
      action: 'Send an Email',
    },
    {
      title: 'Phone',
      value: '+92 327 2332833',
      href: 'tel:+923272332833',
      icon: Phone,
      action: 'Call Directly',
    },
    {
      title: 'WhatsApp',
      value: '+92 327 2332833',
      href: 'https://wa.me/923272332833',
      icon: MessageCircle,
      action: 'Chat on WhatsApp',
    },
    {
      title: 'Instagram',
      value: '@levryn__',
      href: 'https://www.instagram.com/levryn__/',
      icon: InstagramIcon,
      action: 'Follow on Instagram',
    },
    {
      title: 'Facebook',
      value: 'Levryn',
      href: 'https://www.facebook.com/profile.php?id=61580660576348',
      icon: FacebookIcon,
      action: 'Visit Facebook Page',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '64px 0 96px' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            Direct Assistance
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              marginBottom: '12px',
            }}
          >
            Contact Us
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
            Get in touch with Levryn. We are here to assist with fragrance recommendations, order tracking, and general inquiries.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '56px',
          }}
        >
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.title}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  backgroundColor: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                }}
                className="contact-card"
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    marginBottom: '4px',
                    color: 'var(--color-text-main)',
                  }}
                >
                  {channel.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginBottom: '8px',
                    display: 'block',
                  }}
                >
                  {channel.value}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  {channel.action} &rarr;
                </span>
              </a>
            );
          })}
        </div>

        {/* Internal Action CTAs */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <Link href="/faq" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
            Read FAQ First
          </Link>
          <Link href="/shop" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            Browse Fragrances
          </Link>
        </div>
      </div>
    </div>
  );
}
