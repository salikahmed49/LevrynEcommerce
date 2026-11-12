import './globals.css';
import Script from 'next/script';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '192x192', type: 'image/png' },
    ],
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
    <html lang="en" className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Google Tag Manager (GTM-WNW67D5Q) */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WNW67D5Q');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WNW67D5Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
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
