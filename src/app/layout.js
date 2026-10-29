import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata = {
  metadataBase: new URL('https://www.shoplevryn.com'),
  title: {
    default: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,500',
    template: '%s | Levryn Perfumes',
  },
  description:
    'Discover artisanal handcrafted perfumes in Pakistan by Levryn. Long-lasting Extrait de Parfum renditions starting from Rs. 1,500 featuring rich woody, warm spice, and oriental accords.',
  alternates: {
    canonical: 'https://www.shoplevryn.com',
  },
  openGraph: {
    title: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,500',
    description:
      'Artisanal Extrait de Parfum handcrafted in Pakistan. Long-lasting renditions featuring rich woody, warm spice, and gourmand accords.',
    url: 'https://www.shoplevryn.com',
    siteName: 'Levryn Perfumes',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.shoplevryn.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Levryn Artisanal Perfumes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,500',
    description:
      'Artisanal Extrait de Parfum handcrafted in Pakistan. Master renditions starting from Rs. 1,500.',
    images: ['https://www.shoplevryn.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#1E2B28',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
