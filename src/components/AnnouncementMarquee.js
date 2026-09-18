import React from 'react';
import './AnnouncementMarquee.css';

const AnnouncementMarquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span>Free shipping all over Pakistan for orders above Rs. 6,000</span>
        <span className="marquee-separator">•</span>
        <span>Up to 50% off - Limited Time Offer</span>
        <span className="marquee-separator">•</span>
        <span>Premium Quality Designer Fragrances</span>
        <span className="marquee-separator">•</span>
        {/* Repeat for seamless loop */}
        <span>Free shipping all over Pakistan for orders above Rs. 6,000</span>
        <span className="marquee-separator">•</span>
        <span>Up to 50% off - Limited Time Offer</span>
        <span className="marquee-separator">•</span>
        <span>Premium Quality Designer Fragrances</span>
      </div>
    </div>
  );
};

export default AnnouncementMarquee;
