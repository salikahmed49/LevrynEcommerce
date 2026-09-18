// Google Analytics 4 Setup
export const GA_MEASUREMENT_ID = 'G-NRNRE4NDFR';

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line no-inner-declarations
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
};

// Track page view
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track product view
export const trackProductView = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'PKR',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        item_category: product.rendition || 'Perfume',
        item_brand: 'Levryn',
      }]
    });
  }
};

// Track add to cart
export const trackAddToCart = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'PKR',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
        item_category: product.rendition || 'Perfume',
        item_brand: 'Levryn',
      }]
    });
  }
};

// Track remove from cart
export const trackRemoveFromCart = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'PKR',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
      }]
    });
  }
};

// Track begin checkout
export const trackBeginCheckout = (cart, total) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'PKR',
      value: total,
      items: cart.map(item => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: item.rendition || 'Perfume',
        item_brand: 'Levryn',
      }))
    });
  }
};

// Track purchase
export const trackPurchase = (orderNumber, total, items) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderNumber,
      value: total,
      currency: 'PKR',
      tax: 0,
      shipping: 300, // Delivery charges
      items: items.map(item => ({
        item_id: item.id?.toString() || 'unknown',
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: item.rendition || 'Perfume',
        item_brand: 'Levryn',
      }))
    });
  }
};

// Track search
export const trackSearch = (searchTerm) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm
    });
  }
};

// Track view cart
export const trackViewCart = (cart, total) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_cart', {
      currency: 'PKR',
      value: total,
      items: cart.map(item => ({
        item_id: item.id.toString(),
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    });
  }
};
