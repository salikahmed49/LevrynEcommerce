import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './FAQ.css';

const faqs = [
  {
    category: 'Products & Quality',
    items: [
      {
        q: 'Are Levryn perfumes original designer fragrances?',
        a: 'Levryn creates artisanal fragrance renditions — high-quality interpretations of iconic designer scents. Each fragrance is meticulously hand-crafted by our founder Salik Ahmed Bhatti using premium ingredients. While inspired by designer houses, these are our own unique creations offering similar scent profiles at a fraction of the cost.',
      },
      {
        q: 'How long do Levryn perfumes last on skin?',
        a: 'Our fragrances typically last 6-10 hours depending on the concentration, your skin type, and environmental conditions. Eau de Parfum concentrations generally last longer. For best results, apply on pulse points (wrists, neck, behind ears) after moisturizing your skin.',
      },
      {
        q: 'What sizes are available?',
        a: 'Most of our fragrances come in three sizes: 30ml (perfect for trying a scent), 50ml (our most popular size), and 100ml (best value). Check individual product pages for availability in each size.',
      },
      {
        q: 'What ingredients do you use?',
        a: 'We use premium fragrance oils sourced from renowned suppliers. Our ingredients are skin-safe, alcohol-based formulations suitable for daily wear. All ingredients meet international cosmetic safety standards.',
      },
      {
        q: 'How do I choose the right perfume for me?',
        a: 'Each product page includes detailed fragrance notes (Top, Middle, Base) to help you decide. For fresh and energetic vibes, look for citrus and aquatic notes. For warm and cozy scents, choose vanilla, amber, or oud-based fragrances. You can also browse our Budget Series for affordable options or Premium Lineup for luxury scents.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our collection, add your desired fragrances to the cart, and proceed to checkout. Fill in your shipping details, apply any voucher codes, and complete the bank transfer. Then confirm via WhatsApp for fastest processing!',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We currently accept Bank Transfer (HBL). After placing your order, you\'ll receive bank account details. Complete the transfer and send confirmation via WhatsApp for quick processing. We\'re working on adding more payment options soon.',
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Currently, we process orders through bank transfer for security and efficiency. However, you can contact us on WhatsApp at +92 327 2332833 to discuss alternative payment arrangements.',
      },
      {
        q: 'Do you have any discounts or voucher codes?',
        a: 'Yes! We regularly offer promotional voucher codes through our Instagram and Facebook pages. Follow us @levryn__ on Instagram for exclusive discount codes and flash sales. New customers can also check our announcements for welcome offers.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'Do you deliver across all of Pakistan?',
        a: 'Yes! We deliver to all major cities and towns across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad, Multan, and more. Delivery charges are Rs. 300 for all orders.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3-5 business days for major cities and 5-7 business days for other areas. Orders are processed within 24 hours of payment confirmation.',
      },
      {
        q: 'How can I track my order?',
        a: 'After your order is shipped, you\'ll receive a tracking number via WhatsApp. You can also use our Track Order page on the website to check your order status anytime.',
      },
      {
        q: 'Is the packaging discreet?',
        a: 'Yes, all orders are packaged in premium, discreet packaging. Each bottle is carefully wrapped to ensure safe delivery. The outer packaging does not reveal the contents.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    items: [
      {
        q: 'What is your return policy?',
        a: 'If you receive a damaged or incorrect product, contact us within 48 hours via WhatsApp with photos. We\'ll arrange a replacement or full refund. Due to the nature of fragrances, returns for personal preference are handled on a case-by-case basis.',
      },
      {
        q: 'How do I contact customer support?',
        a: 'You can reach us via WhatsApp at +92 327 2332833 (fastest response), Email at info@levryn.com, Instagram DM @levryn__, or through our Contact page. We typically respond within 2-4 hours during business hours.',
      },
      {
        q: 'Can I order in bulk or for corporate gifts?',
        a: 'Absolutely! We offer special pricing for bulk and corporate orders. Visit our Corporate Orders page or contact us directly on WhatsApp to discuss your requirements and get a custom quote.',
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate all Q&A pairs for structured data
  const allQAPairs = faqs.flatMap(cat => cat.items);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allQAPairs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  let globalIndex = 0;

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Levryn Perfumes Pakistan | Buy Perfume Online</title>
        <meta name="description" content="Find answers to common questions about Levryn perfumes. Learn about our delivery across Pakistan, payment methods, return policy, fragrance quality, and how to buy luxury perfumes online at affordable prices." />
        <meta name="keywords" content="Levryn FAQ, buy perfume online Pakistan, perfume delivery Pakistan, luxury perfume questions, designer fragrance Pakistan, cash on delivery perfume, perfume return policy" />
        
        <meta property="og:title" content="FAQ - Levryn Perfumes Pakistan" />
        <meta property="og:description" content="Got questions about our luxury fragrances? Find answers about ordering, delivery, quality, and more." />
        <meta property="og:url" content="https://www.shoplevryn.com/faq" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://www.shoplevryn.com/faq" />

        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div className="faq-page">
        <div className="faq-hero">
          <div className="container">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-subtitle">Everything you need to know about Levryn perfumes</p>
          </div>
        </div>

        <div className="faq-content">
          <div className="container">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="faq-category">
                <h2 className="faq-category-title">{category.category}</h2>
                <div className="faq-list">
                  {category.items.map((item, itemIndex) => {
                    const currentIndex = globalIndex++;
                    return (
                      <div 
                        key={itemIndex} 
                        className={`faq-item ${openIndex === currentIndex ? 'open' : ''}`}
                      >
                        <button 
                          className="faq-question"
                          onClick={() => toggleFAQ(currentIndex)}
                          aria-expanded={openIndex === currentIndex}
                        >
                          <span>{item.q}</span>
                          <span className="faq-icon">
                            {openIndex === currentIndex ? '−' : '+'}
                          </span>
                        </button>
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Internal Links Section for SEO */}
            <div className="faq-cta-section">
              <h2>Still Have Questions?</h2>
              <p>Our team is here to help. Reach out through any of these channels:</p>
              <div className="faq-cta-links">
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                <a href="https://wa.me/923272332833" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  WhatsApp Support
                </a>
              </div>
              <div className="faq-internal-links">
                <h3>Explore More</h3>
                <div className="faq-links-grid">
                  <Link to="/products">Browse All Perfumes</Link>
                  <Link to="/budget-series">Budget-Friendly Options</Link>
                  <Link to="/premium-lineup">Premium Collection</Link>
                  <Link to="/corporate-orders">Corporate Orders</Link>
                  <Link to="/about">Our Story</Link>
                  <Link to="/track-order">Track Your Order</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
