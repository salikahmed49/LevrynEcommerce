import React from 'react';

export const metadata = {
  title: 'Frequently Asked Questions | Levryn',
  description:
    'Information regarding our handcrafted perfumes, shipping across Pakistan, return policy, and checkout guidelines.',
  alternates: {
    canonical: 'https://www.shoplevryn.com/faq',
  },
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'How do I place an order and complete payment?',
      a: 'Add your chosen fragrances to your bag and proceed to checkout. On checkout, you will receive your unique Order ID along with our verified bank account details. Simply transfer the order total using your preferred banking app (mobile banking, Raast, Nayapay, Sadapay) and share your transfer receipt screenshot on WhatsApp for expedited packing and dispatch. Please note that we do not offer Cash on Delivery (No COD).',
    },
    {
      q: 'What is the delivery time across Pakistan?',
      a: 'Orders within Karachi typically dispatch within 1–2 business days. Rest all take within 2–3 business days to dispatched within 3–5 business days via tracked express couriers.',
    },
    {
      q: 'What are the delivery charges?',
      a: 'Orders carry a flat delivery fee of Rs. 250 across Pakistan.',
    },
    {
      q: 'What does Extrait de Parfum mean?',
      a: 'Extrait de Parfum is the highest concentration tier in fine perfumery, containing a significantly richer concentration of pure perfume oils compared to standard Eau de Parfum or Eau de Toilette. This formulation results in greater depth, an intricate evolution of notes, and enduring presence on skin.',
    },
    {
      q: 'Can I test multiple fragrances?',
      a: 'Yes, our 30ml flacons offer an accessible way to explore multiple fragrance profiles and accord families before committing to larger 100ml flacons. For testers (3ml, 5ml, 10ml), please reach out directly with customer care on WhatsApp.',
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We have a strict No return / exchange policy. Returns or replacements are only entertained if a customer receives a broken or damaged product upon delivery. In such an event, please notify our customer care team on WhatsApp immediately with photos of the damaged item.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'No, we do not offer Cash on Delivery (COD). All orders are confirmed and dispatched upon direct online bank transfer verification (HBL, Raast, Nayapay, Sadapay, etc.).',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '64px 0 96px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
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
            Help & Guidelines
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
              marginBottom: '12px',
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Everything you need to know about our handcrafted flacons, nationwide delivery, and ordering policies.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '24px 28px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  marginBottom: '10px',
                  color: 'var(--color-text-main)',
                }}
              >
                {faq.q}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '56px',
            padding: '32px',
            textAlign: 'center',
            backgroundColor: '#F3F7F6',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '8px' }}>
            Have a question not listed here?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
            Our team is available on WhatsApp for scent notes, testers, or order inquiries.
          </p>
          <a
            href="https://wa.me/923272332833?text=Hi%20Levryn,%20I%20have%20an%20inquiry%20regarding%20an%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Chat with Customer Care
          </a>
        </div>
      </div>
    </div>
  );
}
