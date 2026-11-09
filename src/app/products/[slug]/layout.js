import { getProductBySlug } from '@/lib/catalog';

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Perfume Not Found | Levryn',
      description: 'The requested perfume could not be found.',
    };
  }

  const price = product.sizes?.[0]?.price || 1500;
  const inspirationText = product.inspiration ? ` (${product.inspiration})` : '';

  return {
    title: `${product.name} - Extrait de Parfum${inspirationText} | Levryn`,
    description: `${product.name} by Levryn: ${product.subtitle}. Handcrafted long-lasting Extrait de Parfum in Pakistan starting from Rs. ${price.toLocaleString()}.`,
    alternates: {
      canonical: `https://www.shoplevryn.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - Luxury Extrait de Parfum | Levryn`,
      description: `${product.name}: ${product.subtitle}. Available across Pakistan.`,
      url: `https://www.shoplevryn.com/products/${product.slug}`,
      images: [
        {
          url: `https://www.shoplevryn.com${product.images[0]}`,
          width: 800,
          height: 1000,
          alt: `${product.name} by Levryn`,
        },
      ],
    },
  };
}

export default function ProductLayout({ children }) {
  return children;
}
