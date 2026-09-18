import React, { useEffect, useRef } from 'react';
import './TestimonialsCarousel.css';

const testimonials = [
  {
    id: 1,
    name: "Ayesha K.",
    review: "The fragrances are incredibly long-lasting. Better than most high-end brands I've tried!",
    rating: 5,
    product: "Velvet Rose Rendition"
  },
  {
    id: 2,
    name: "Zain O.",
    review: "Fast delivery and the packaging was absolutely premium. It feels like unlocking a new experience.",
    rating: 5,
    product: "Oud Wood Intense"
  },
  {
    id: 3,
    name: "Fatima S.",
    review: "I get compliments every time I wear Levryn. The scent trail is just magical.",
    rating: 5,
    product: "Baccarat Rouge 540 Impression"
  },
  {
    id: 4,
    name: "Ali R.",
    review: "Amazing customer service and the scent is identical to the original designer perfume. Highly recommend.",
    rating: 5,
    product: "Savage Elixir"
  }
];

const TestimonialsCarousel = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    let requestID;

    const smoothScroll = () => {
      scrollContainer.scrollLeft += scrollStep;
      scrollAmount += scrollStep;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      }
      requestID = requestAnimationFrame(smoothScroll);
    };

    requestID = requestAnimationFrame(smoothScroll);

    const handleMouseEnter = () => cancelAnimationFrame(requestID);
    const handleMouseLeave = () => {
      requestID = requestAnimationFrame(smoothScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(requestID);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-title">What They Are Saying</h2>
          <div className="trust-badges">
            <span className="trust-badge">Over 1,000+ Happy Customers</span>
            <span className="trust-badge">Quality Guaranteed</span>
          </div>
        </div>
      </div>
      <div className="testimonials-carousel" ref={scrollRef}>
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((t, index) => (
            <div className="testimonial-card" key={`${t.id}-${index}`}>
              <div className="stars" style={{ color: '#f59e0b', fontSize: '18px' }}>
                {"★".repeat(t.rating)}
              </div>
              <p className="review-text">"{t.review}"</p>
              <div className="review-author">
                <span className="author-name">{t.name}</span>
                <span className="verified-badge">✓ Verified Buyer</span>
              </div>
              <div className="review-product">On {t.product}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
