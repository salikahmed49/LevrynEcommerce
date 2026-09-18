import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { trackProductView } from '../utils/analytics';
import { trackProductView as trackProductViewSupabase } from '../utils/supabaseAnalytics';
import CustomerReviews from '../components/CustomerReviews';
import RelatedProducts from '../components/RelatedProducts';
import Breadcrumbs from '../components/Breadcrumbs';
import LiveVisitors from '../components/LiveVisitors';
import CustomSizeModal from '../components/CustomSizeModal';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, loading } = useProducts();
  const product = getProductById(id);
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Update scroll when product loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Track product view - must be before early return
  useEffect(() => {
    if (product) {
      trackProductView(product);
      trackProductViewSupabase(product);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-detail-content">
            <div className="product-image-section">
              <div className="product-detail-skeleton">
                <div className="skeleton-image-large"></div>
              </div>
            </div>
            <div className="product-info-section">
              <div className="skeleton-text skeleton-subtitle"></div>
              <div className="skeleton-text skeleton-title-large"></div>
              <div className="skeleton-text skeleton-description"></div>
              <div className="skeleton-text skeleton-description"></div>
              <div className="skeleton-text skeleton-price-large"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found - Levryn</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="product-detail-page">
          <div className="container">
            <div className="product-not-found">
              <h2>Product not found</h2>
              <button onClick={() => navigate('/products')} className="btn btn-primary">
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Simplified pricing for detail page (modal handles specific selection)
  const lowestPrice = Math.min(...Object.values(product.pricing).map(p => p.price));
  const isInStock = Object.values(product.pricing).some(p => p.inStock);

  const handleAddToCartClick = () => {
    setShowSizeModal(true);
  };

  const onSelectSize = (size) => {
    const sizeInfo = product.pricing[size];
    if (!sizeInfo.inStock) {
      alert(`${product.name} (${size}) is currently out of stock.`);
      return;
    }
    
    const productToAdd = {
      ...product,
      price: sizeInfo.price,
      size: size,
    };
    addToCart(productToAdd);
  };

  // JSON-LD Structured Data for Product with AggregateRating
  const productStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://www.shoplevryn.com${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Levryn"
    },
    "sku": `LEV-${product.id}`,
    "mpn": `LEV-${product.id}`,
    "category": "Fragrances",
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://www.shoplevryn.com/product/${product.id}`,
      "priceCurrency": "PKR",
      "lowPrice": lowestPrice,
      "highPrice": Math.max(...Object.values(product.pricing).map(p => p.price)),
      "offerCount": Object.keys(product.pricing).length,
      "availability": isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Levryn Perfumes"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "4",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: product.name, path: `/product/${product.id}` },
  ];

  return (
    <>
      <Helmet>
        <title>{`Buy ${product.name} Perfume Online in Pakistan | ${product.rendition} | Levryn`}</title>
        <meta name="description" content={`Buy ${product.name} perfume online at Levryn Pakistan. ${product.description} Notes: ${product.notes}. Price from Rs. ${lowestPrice.toLocaleString()}. Fast delivery across Pakistan.`} />
        <meta name="keywords" content={`${product.name} perfume, ${product.rendition}, buy ${product.name} online, luxury perfume Pakistan, Levryn ${product.name}, ${product.rendition.replace('Rendition of ', '')} dupe Pakistan, affordable designer perfume`} />
        
        <link rel="canonical" href={`https://www.shoplevryn.com/product/${product.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - ${product.rendition} | Levryn Perfumes`} />
        <meta property="og:description" content={`${product.description} Starting from Rs. ${lowestPrice.toLocaleString()}`} />
        <meta property="og:image" content={`https://www.shoplevryn.com${product.image}`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://www.shoplevryn.com/product/${product.id}`} />
        <meta property="product:price:amount" content={lowestPrice} />
        <meta property="product:price:currency" content="PKR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - Levryn Perfumes`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={`https://www.shoplevryn.com${product.image}`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
      </Helmet>
      
      <div className="product-detail-page">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
          
          <button onClick={() => navigate('/products')} className="back-button">
            ← Back to Products
          </button>

          <div className="product-detail-content">
            <div className="product-image-section">
              <img
                src={product.image}
                alt={`${product.name} - ${product.rendition} - Luxury Perfume by Levryn Pakistan`}
                className="product-detail-image img-product"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/placeholder.png';
                }}
              />
            </div>

            <div className="product-info-section">
              <p className="product-rendition">{product.rendition}</p>
              <h1 className="product-detail-name">{product.name}</h1>
              
              {/* Live Visitors for social proof */}
              <LiveVisitors productId={product.id} />
              
              <p className="product-description">{product.description}</p>

              <div className="product-notes">
                <h3>Fragrance Notes</h3>
                <p>{product.notes}</p>
              </div>

              <div className="product-price-section">
                <div className="current-price">
                  <span className="price-label">Price Starting From:</span>
                  <span className="price-value">Rs. {Math.min(...Object.values(product.pricing).map(p => p.price)).toLocaleString()}</span>
                </div>
              </div>

              <button
                className="btn btn-primary add-to-cart-detail"
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </button>

              {product.bestSelling && (
                <div className="best-selling-badge">
                  <span>Best Seller</span>
                </div>
              )}


            </div>
          </div>

          {/* Customer Reviews Section */}
          <CustomerReviews productId={product.id} productName={product.name} />

          {/* Related Products (Internal Linking) */}
          <RelatedProducts currentProductId={product.id} />
        </div>

        <CustomSizeModal 
          product={product}
          isOpen={showSizeModal}
          onClose={() => setShowSizeModal(false)}
          onSelectSize={onSelectSize}
        />
      </div>
    </>
  );
};

export default ProductDetail;
