import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import ParticleBackground from '../components/ParticleBackground';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import './Home.css';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.filter((p) => p.bestSelling).slice(0, 4);

  // WebSite structured data with SearchAction for Google sitelinks search
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Levryn Perfumes",
    "url": "https://www.shoplevryn.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.shoplevryn.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Local Business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Levryn Perfumes",
    "description": "Buy luxury perfumes online in Pakistan. Premium designer fragrance renditions handcrafted with passion. Fast delivery across Pakistan.",
    "url": "https://www.shoplevryn.com",
    "logo": "https://www.shoplevryn.com/images/logo.png",
    "image": "https://www.shoplevryn.com/images/logo.png",
    "telephone": "+92-327-2332833",
    "email": "info@levryn.com",
    "priceRange": "Rs. 1200 - Rs. 5800",
    "currenciesAccepted": "PKR",
    "paymentAccepted": "Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-327-2332833",
      "contactType": "Customer Service",
      "areaServed": "PK",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.instagram.com/levryn__/",
      "https://www.facebook.com/profile.php?id=61580660576348"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    }
  };

  return (
    <>
      <Helmet>
        <title>Buy Luxury Perfumes Online in Pakistan | Levryn - Designer Fragrances from Rs. 1,200 | Free Shipping</title>
        <meta name="description" content="Shop luxury perfumes online in Pakistan at Levryn. Premium quality designer fragrance renditions including Chanel, Dior, Creed Aventus & more starting from Rs. 1,200. Fast delivery across Pakistan. Cash on delivery available. Over 1,000+ happy customers." />
        <meta name="keywords" content="buy perfume online Pakistan, luxury perfumes Pakistan, designer fragrances Pakistan, perfume shop online, Levryn perfumes, premium scents Karachi, Chanel perfume Pakistan, Dior perfume online, Creed Aventus dupe Pakistan, affordable luxury perfume, best perfume shop Pakistan, online perfume delivery, Amouage rendition, handcrafted perfumes" />
        
        <link rel="canonical" href="https://www.shoplevryn.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Levryn Perfumes" />
        <meta property="og:title" content="Levryn Perfumes - Buy Luxury Fragrances Online in Pakistan | From Rs. 1,200" />
        <meta property="og:description" content="Experience luxury fragrances crafted with passion and precision. 27+ premium perfumes. Fast delivery across Pakistan. 1,000+ happy customers." />
        <meta property="og:image" content="https://www.shoplevryn.com/images/logo.png" />
        <meta property="og:url" content="https://www.shoplevryn.com" />
        <meta property="og:locale" content="en_PK" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levryn Perfumes - Luxury Fragrances Pakistan" />
        <meta name="twitter:description" content="Premium designer fragrance renditions. 27+ luxury perfumes from Rs. 1,200. Fast delivery across Pakistan." />
        <meta name="twitter:image" content="https://www.shoplevryn.com/images/logo.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      </Helmet>
      
      <div className="home">
        <section className="hero">
          <ParticleBackground />
          <div className="hero-content">
            <h1 className="hero-title">Levryn</h1>
            <p className="hero-subtitle">The Art of Scent</p>
            <p className="hero-description">
              Experience luxury fragrances crafted with passion and precision.
              Each bottle is a journey in artisanal excellence.
            </p>
            <Link to="/products" className="btn btn-primary hero-cta">
              Explore Collection
            </Link>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Best Sellers</h2>
            <div className="products-grid">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="product-card-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-text skeleton-title"></div>
                      <div className="skeleton-text skeleton-price"></div>
                    </div>
                  </div>
                ))
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            <div className="view-all">
              <Link to="/products" className="btn btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Levryn - SEO Content Section */}
        <section className="why-choose-section">
          <div className="container">
            <h2 className="section-title">Why Choose Levryn?</h2>
            <div className="why-choose-grid">
              <div className="why-card">
                <h3>Handcrafted Quality</h3>
                <p>Every fragrance is personally blended and bottled by our founder, ensuring premium quality that mass production cannot match.</p>
              </div>
              <div className="why-card">
                <h3>Affordable Luxury</h3>
                <p>Experience designer-quality fragrances starting from just Rs. 1,200. Premium scents without the premium price tag.</p>
              </div>
              <div className="why-card">
                <h3>Nationwide Delivery</h3>
                <p>Fast shipping across all of Pakistan. From Karachi to Peshawar, your perfume arrives safely at your doorstep.</p>
              </div>
              <div className="why-card">
                <h3>1,000+ Happy Customers</h3>
                <p>Join our growing community of fragrance lovers. Rated 4.8/5 by verified buyers across Pakistan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Category - Internal Links */}
        <section className="category-section">
          <div className="container">
            <h2 className="section-title">Shop By Category</h2>
            <div className="category-grid">
              <Link to="/premium-lineup" className="category-card premium">
                <div className="category-content">
                  <h3>Premium Collection</h3>
                  <p>Luxury renditions of iconic designer fragrances</p>
                  <span className="category-cta">Explore →</span>
                </div>
              </Link>
              <Link to="/budget-series" className="category-card budget">
                <div className="category-content">
                  <h3>Budget Series</h3>
                  <p>Quality fragrances starting from Rs. 1,200</p>
                  <span className="category-cta">Explore →</span>
                </div>
              </Link>
              <Link to="/corporate-orders" className="category-card corporate">
                <div className="category-content">
                  <h3>Corporate Orders</h3>
                  <p>Bulk orders & custom corporate gifting</p>
                  <span className="category-cta">Explore →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsCarousel />

        {/* SEO Content Block - Hidden but crawlable */}
        <section className="seo-content-section">
          <div className="container">
            <h2>Buy Luxury Perfumes Online in Pakistan - Levryn</h2>
            <p>
              Looking to <strong>buy luxury perfumes online in Pakistan</strong>? Levryn is Pakistan's premier destination for 
              <strong> designer fragrance renditions</strong>. Our collection of 27+ handcrafted perfumes offers the same 
              sophisticated scent profiles as brands like <strong>Chanel, Dior, Creed Aventus, Amouage,</strong> and 
              <strong> Louis Vuitton</strong> at a fraction of the cost.
            </p>
            <p>
              Whether you're searching for a <Link to="/products">premium perfume in Karachi</Link>, 
              need <Link to="/corporate-orders">corporate gifting solutions</Link>, or want an 
              <Link to="/budget-series"> affordable fragrance for daily wear</Link>, Levryn has 
              the perfect scent for every occasion. Enjoy fast delivery across all cities in Pakistan 
              including Lahore, Islamabad, Rawalpindi, Faisalabad, and more.
            </p>
            <p>
              Visit our <Link to="/faq">FAQ page</Link> for common questions, or <Link to="/contact">contact us</Link> for 
              personalized fragrance recommendations. <Link to="/about">Learn our story</Link> and discover why over 
              1,000 customers trust Levryn for their luxury fragrance needs.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
