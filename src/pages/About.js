import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import './About.css';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Levryn - Pakistan's Premier Luxury Perfume Brand | Handcrafted Designer Fragrances</title>
        <meta name="description" content="Learn about Levryn, Pakistan's premier destination for handcrafted luxury perfumes. Founded by Salik Ahmed Bhatti, we create premium designer fragrance renditions with passion and precision. Over 1,000+ happy customers." />
        <meta name="keywords" content="about Levryn, Levryn perfumes Pakistan, Salik Ahmed Bhatti, handcrafted perfumes Pakistan, luxury perfume brand Pakistan, designer fragrance renditions" />
        
        <link rel="canonical" href="https://www.shoplevryn.com/about" />
        
        <meta property="og:title" content="About Levryn - Pakistan's Premier Luxury Perfume Brand" />
        <meta property="og:description" content="Discover the story behind Levryn. Handcrafted luxury fragrances made with passion." />
        <meta property="og:url" content="https://www.shoplevryn.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="about-page">
        <div className="about-hero">
          <div className="container">
            <Breadcrumbs items={[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
            ]} />
            <h1 className="about-title">About Levryn</h1>
            <p className="about-subtitle">The Art of Accessible Luxury</p>
          </div>
        </div>

        <div className="about-content">
          <div className="container">
            <div className="about-section">
              <p className="about-intro">
                Levryn is born from a singular vision: to make the world of exquisite fragrance both personal and accessible. Founded by Salik Ahmed Bhatti, we are not just a brand; we are a promise of unparalleled artisanal quality delivered directly from our hands to yours.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-heading">The Artisan's Pledge</h2>
              <p>
                I, Salik Ahmed Bhatti, am the Artisan Creator behind every scent at Levryn. My journey started from a deep passion, building everything from scratch to ensure meticulous control over every detail. This is where high-end fragrance meets true hand-craftsmanship.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-heading">Iconic Renditions</h2>
              <p>
                Meticulously crafted interpretations of the world's most cherished fragrances, offering their complexity and depth at a fraction of the cost. Browse our <Link to="/premium-lineup" style={{ color: 'var(--gold-primary)', fontWeight: '500' }}>Premium Collection</Link> for luxury scents.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-heading">Original Creations</h2>
              <p>
                Unique, handcrafted scents formulated in-house, designed to become your next signature aroma. Explore our <Link to="/budget-series" style={{ color: 'var(--gold-primary)', fontWeight: '500' }}>Budget Series</Link> for everyday luxury.
              </p>
            </div>

            <div className="about-section">
              <p className="about-conclusion">
                Every drop is carefully measured, blended, and bottled by hand, reflecting a commitment to quality that mass production simply cannot match. Levryn is where passion, precision, and the belief that true luxury should be within reach, converge.
              </p>
              <p className="about-tagline">
                Elevate your essence with Levryn.
              </p>
            </div>

            {/* Internal Links CTA */}
            <div className="about-cta-section">
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
              <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
              <Link to="/faq" className="btn btn-secondary">Read FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
