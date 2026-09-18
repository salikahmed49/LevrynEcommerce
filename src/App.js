import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import TrackOrder from './pages/TrackOrder';
import BudgetSeries from './pages/BudgetSeries';
import PremiumLineUp from './pages/PremiumLineUp';
import CorporateOrders from './pages/CorporateOrders';
import FAQ from './pages/FAQ';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductsProvider } from './context/ProductsContext';
import AdminPortal from './pages/AdminPortal';
import AdminLogin from './pages/AdminLogin';
import ProductManagement from './pages/ProductManagement';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ProductsProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
            <ScrollToTop />
            <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/budget-series" element={<BudgetSeries />} />
                <Route path="/premium-lineup" element={<PremiumLineUp />} />
                <Route path="/corporate-orders" element={<CorporateOrders />} />
                <Route path="/faq" element={<FAQ />} />
                {/* Auth Gate — public */}
                <Route path="/levryn-auth-gate" element={<AdminLogin />} />
                {/* Admin Routes — protected by ProtectedRoute guard */}
                <Route
                  path="/levryn-admin"
                  element={
                    <ProtectedRoute>
                      <AdminPortal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/levryn-product-management"
                  element={
                    <ProtectedRoute>
                      <ProductManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ProductsProvider>
  </HelmetProvider>
  );
}

export default App;
