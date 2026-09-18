import React from 'react';
import './CorporateOrders.css';
import { Helmet } from 'react-helmet-async';

const CorporateOrders = () => {
  return (
    <>
      <Helmet>
        <title>Corporate Orders | Bulk Perfumes Pakistan | Levryn</title>
        <meta name="description" content="Elevate your corporate gifting with Levryn's premium luxury fragrances. Perfect for employee appreciation, client gifts, and events." />
      </Helmet>
      
      <div className="corporate-page">
        <div className="corporate-hero">
          <div className="container">
            <h1 className="corporate-title">Corporate Orders</h1>
            <p className="corporate-subtitle">Elevate Your Corporate Gifting</p>
          </div>
        </div>

        <div className="corporate-content">
          <div className="container">
            <div className="corporate-info-section">
              <div className="info-text">
                <h2>Why Choose Levryn for Corporate Gifting?</h2>
                <p>
                  A signature scent creates lasting memories. Whether you are looking to reward your employees, impress important clients, or celebrate a milestone, Levryn offers tailored solutions that leave an unforgettable impression.
                </p>
                <ul>
                  <li><strong>Premium Quality:</strong> Extrait de Parfum with highest oil concentration.</li>
                  <li><strong>Customization:</strong> Option for elegant presentation and bespoke packaging for bulk orders.</li>
                  <li><strong>Exclusive Discounts:</strong> Benefit from volume-based savings on our complete catalog.</li>
                  <li><strong>Dedicated Support:</strong> Personalized assistance to help you find the perfect fragrances.</li>
                </ul>
              </div>

            </div>

            <div className="corporate-form-container">
              <h2>Request a Quote</h2>
              <p>Fill out the form below or contact us directly at <a href="mailto:info@levryn.com">info@levryn.com</a></p>
              
              <form className="corporate-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input type="text" required placeholder="Enter your company name" />
                  </div>
                  <div className="form-group">
                    <label>Contact Person *</label>
                    <input type="text" required placeholder="Full Name" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" required placeholder="work@company.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" required placeholder="+92 3XX XXXXXXX" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Estimated Quantity *</label>
                    <select required>
                      <option value="">Select quantity</option>
                      <option value="10-50">10 - 50 bottles</option>
                      <option value="51-100">51 - 100 bottles</option>
                      <option value="101-500">101 - 500 bottles</option>
                      <option value="500+">500+ bottles</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Delivery Date</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Additional Requirements / Message</label>
                  <textarea rows="5" placeholder="Tell us about your gifting needs..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">Submit Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorporateOrders;
