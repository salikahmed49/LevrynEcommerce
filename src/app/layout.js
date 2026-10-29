import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.shoplevryn.com'),
  title: {
    default: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,200',
    template: '%s | Levryn Perfumes',
  },
  description:
    'Discover artisanal handcrafted perfumes in Pakistan by Levryn. Long-lasting Extrait de Parfum renditions featuring rich woody, fresh aquatic, and warm amber accords.',
  alternates: {
    canonical: 'https://www.shoplevryn.com',
  },
  openGraph: {
    title: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,200',
    description:
      'Artisanal Extrait de Parfum handcrafted in Pakistan. Long-lasting renditions featuring rich woody, fresh aquatic, and warm amber accords.',
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
    title: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,200',
    description:
      'Artisanal Extrait de Parfum handcrafted in Pakistan. Master renditions starting from Rs. 1,200.',
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

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Levryn Perfumes',
    url: 'https://www.shoplevryn.com',
    description:
      'Artisanal Extrait de Parfum handcrafted in Pakistan. Master renditions of classic fragrance profiles.',
    priceRange: 'PKR 1,200 - PKR 5,400',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
