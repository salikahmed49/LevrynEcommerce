import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import './Contact.css';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Levryn Perfumes Pakistan | WhatsApp, Email, Phone | Buy Perfume Online</title>
        <meta name="description" content="Contact Levryn Perfumes Pakistan. Reach us via WhatsApp at +92 327 2332833, email info@levryn.com, or Instagram @levryn__. We offer fast delivery of luxury perfumes across Pakistan." />
        <meta name="keywords" content="contact Levryn, Levryn WhatsApp, buy perfume Pakistan contact, perfume shop contact Karachi, Levryn customer service" />
        <link rel="canonical" href="https://www.shoplevryn.com/contact" />
        <meta property="og:title" content="Contact Levryn Perfumes Pakistan" />
        <meta property="og:description" content="Get in touch with Levryn for luxury perfume inquiries. WhatsApp, Email, Phone support available." />
        <meta property="og:url" content="https://www.shoplevryn.com/contact" />
      </Helmet>
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: 'Home', path: '/' },
            { label: 'Contact', path: '/contact' },
          ]} />
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">Get in touch with Levryn</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <a href="mailto:info@levryn.com">info@levryn.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <a href="tel:+923272332833">+92 327 2332833</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon whatsapp-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>WhatsApp</h3>
                <a href="https://wa.me/923272332833" target="_blank" rel="noopener noreferrer">
                  +92 327 2332833
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon instagram-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Instagram</h3>
                <a href="https://www.instagram.com/levryn__/" target="_blank" rel="noopener noreferrer">
                  @levryn__
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon facebook-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Facebook</h3>
                <a href="https://www.facebook.com/profile.php?id=61580660576348" target="_blank" rel="noopener noreferrer">
                  Levryn
                </a>
              </div>
            </div>
          </div>
          
          {/* Internal Links */}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/faq" className="btn btn-secondary">Read FAQ First</Link>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;

