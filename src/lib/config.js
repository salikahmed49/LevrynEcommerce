// Server-controlled business & bank configuration
export const BANK_CONFIG = {
  bankName: 'Habib Bank Limited (HBL)',
  accountNumber: '00857902268603',
  accountTitle: 'Salik Ahmed AA',
  bankCode: 'HBL',
  instructions:
    'Transfer the total amount via your banking app (HBL, Raast, Nayapay, Sadapay, etc.). Use your Order ID as the transfer reference and share the screenshot via WhatsApp for expedited dispatch.',
  supportWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923272332833',
  supportEmail: 'info@levryn.com',
  instagram: 'https://www.instagram.com/levryn__/',
  facebook: 'https://www.facebook.com/profile.php?id=61580660576348',
};

export const SHIPPING_CONFIG = {
  freeDeliveryThreshold: Infinity, // Flat delivery fee across Pakistan; no free shipping threshold override
  standardDeliveryFee: 250,        // Rs. 250 flat shipping across Pakistan
  currency: 'PKR',
  currencySymbol: 'Rs.',
};

export const SITE_CONFIG = {
  name: 'Levryn',
  tagline: 'Artisanal Perfumery & Handcrafted Extrait de Parfum',
  canonicalUrl: 'https://www.shoplevryn.com',
  defaultTitle: 'Levryn | Luxury Perfumes in Pakistan from Rs. 1,500',
  defaultDescription:
    'Discover artisanal handcrafted perfumes in Pakistan by Levryn. Long-lasting renditions featuring rich woody, fresh citrus, and amber accords.',
};
