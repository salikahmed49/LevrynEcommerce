import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);

  if (breadcrumbItems.length <= 1) return null;

  // JSON-LD structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.shoplevryn.com${item.path}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbItems.map((item, index) => (
            <li 
              key={item.path} 
              className="breadcrumb-item"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {index < breadcrumbItems.length - 1 ? (
                <>
                  <Link to={item.path} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className="breadcrumb-separator">/</span>
                </>
              ) : (
                <span className="breadcrumb-current" itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={index + 1} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Auto-generate breadcrumbs from path
const generateBreadcrumbs = (pathname) => {
  const pathMap = {
    '/': 'Home',
    '/products': 'Shop',
    '/about': 'About',
    '/contact': 'Contact',
    '/cart': 'Cart',
    '/checkout': 'Checkout',
    '/track-order': 'Track Order',
    '/budget-series': 'Budget Series',
    '/premium-lineup': 'Premium Lineup',
    '/corporate-orders': 'Corporate Orders',
    '/faq': 'FAQ',
  };

  const crumbs = [{ label: 'Home', path: '/' }];
  
  if (pathname !== '/') {
    // Check if it's a product detail page
    if (pathname.startsWith('/product/')) {
      crumbs.push({ label: 'Shop', path: '/products' });
      crumbs.push({ label: 'Product Details', path: pathname });
    } else if (pathMap[pathname]) {
      crumbs.push({ label: pathMap[pathname], path: pathname });
    }
  }

  return crumbs;
};

export default Breadcrumbs;
