import { SHIPPING_CONFIG } from './config.js';

/**
 * Revamped Product Catalog
 * Authoritative catalog source for Next.js application & server-side validation.
 * 
 * Active Lineup (50ml only):
 * 1. Cupid - Rs. 1,500
 * 2. Fiery Xtreme - Rs. 2,500
 * 3. Vanilla Candy - Rs. 2,000
 * 4. Hibiscus - Rs. 2,500
 */
export const PRODUCTS = [
  {
    id: 'lev-cupid',
    slug: 'cupid',
    name: 'Cupid',
    subtitle: 'Crisp Mint, Green Apple & Radiant Ambroxan',
    family: 'Fresh & Woody Oriental',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    description:
      'A vibrant burst of crisp green apple, zesty lemon, and cooling mint opens the fragrance with energetic freshness. Aromatic geranium and tonka bean introduce smooth sweetness, while ambroxan adds a modern, sensual character. The fragrance settles into creamy vanilla, earthy vetiver, and dry cedarwood, leaving a fresh, confidently sweet woody trail.',
    inspiration: 'Reminds me of Versace Eros',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1500, inStock: true },
    ],
    notes: {
      top: ['Mint', 'Green Apple', 'Italian Lemon'],
      heart: ['Tonka Bean', 'Geranium', 'Ambroxan'],
      base: ['Madagascar Vanilla', 'Cedarwood', 'Vetiver', 'Oakmoss'],
    },
    images: ['/images/Cupid.png'],
  },
  {
    id: 'lev-fiery-xtreme',
    slug: 'fiery-xtreme',
    name: 'Fiery Xtreme',
    subtitle: 'Black Pepper, Rich Spices & Bourbon Accord',
    family: 'Warm Spice & Oriental',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'An intense opening of fiery black pepper and aromatic lavender sets the tone, followed by a rich heart of cinnamon, cumin, and saffron. As the spices deepen, warm tobacco and smooth bourbon nuances blend with creamy vanilla and woody amber. The result is a bold, enveloping fragrance with dark sweetness and lingering warmth.',
    inspiration: 'Reminds me of Viktor&Rolf Spicebomb Extreme',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, inStock: true },
    ],
    notes: {
      top: ['Black Pepper', 'Lavender'],
      heart: ['Cinnamon', 'Cumin', 'Saffron'],
      base: ['Tobacco', 'Bourbon Accord', 'Vanilla', 'Woody Amber'],
    },
    images: ['/images/fiery Xtreme.png'],
  },
  {
    id: 'lev-vanilla-candy',
    slug: 'vanilla-candy',
    name: 'Vanilla Candy',
    subtitle: 'Citrus Elemi, Orange Blossom & Bourbon Vanilla',
    family: 'Gourmand & Warm Woody',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'Bright bergamot and mandarin introduce lively citrus freshness, complemented by the resinous, aromatic character of elemi. Orange blossom softens the transition into a warm heart of cinnamon and cardamom. At its core, rich bourbon vanilla merges with sweet praline and smooth guaiac wood, creating a creamy, refined fragrance that balances gourmand richness with polished woody depth.',
    inspiration: 'Reminds me of Parfums de Marly Althaïr',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2000, inStock: true },
    ],
    notes: {
      top: ['Bergamot', 'Mandarin', 'Elemi'],
      heart: ['Orange Blossom', 'Cinnamon', 'Cardamom'],
      base: ['Bourbon Vanilla', 'Guaiac Wood', 'Praline'],
    },
    images: ['/images/Vanilla Candy.png'],
  },
  {
    id: 'lev-hibiscus',
    slug: 'hibiscus',
    name: 'Hibiscus',
    subtitle: 'Red Hibiscus, Damask Rose & Supple Leather',
    family: 'Floral & Exotic Amber Leather',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'A vivid floral-fruity composition built around the striking contrast of hibiscus and rich Damask rose. Tart blackcurrant and cool spearmint add brightness, creating a lively opening against an opulent floral heart. As the fragrance develops, velvety vanilla and supple leather introduce smooth, sensual warmth, while musk and ambrette provide a soft, lingering depth. The overall impression is lavish, fruity-floral, and distinctly leathery.',
    inspiration: 'Reminds me of Maison Crivelli Hibiscus Mahajad',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, inStock: true },
    ],
    notes: {
      top: ['Hibiscus', 'Blackcurrant', 'Spearmint'],
      heart: ['Damask Rose', 'Cinnamon', 'Ambrette'],
      base: ['Bourbon Vanilla', 'Leather', 'Sensual Musk'],
    },
    images: ['/images/Hibiscus.png'],
  },
];

// Helper queries
export function getAllProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getBestSellers() {
  return PRODUCTS.filter((p) => p.isBestSeller);
}

export function getProductsByFamily(family) {
  return PRODUCTS.filter((p) => p.family.toLowerCase().includes(family.toLowerCase()));
}

export function getProductsByGender(gender) {
  if (!gender || gender === 'All') return PRODUCTS;
  return PRODUCTS.filter(
    (p) => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === 'Unisex'
  );
}

/**
 * Valid Coupon Codes Definition
 * Case-insensitive lookup supporting:
 * - LEVRYN10 / LEVRYN 10 -> 10%
 * - LEVRYN20 / LEVRYN 20 -> 20%
 * - LEVRYN30 / LEVRYN 30 -> 30%
 */
export const VALID_COUPONS = {
  LEVRYN10: 10,
  LEVRYN20: 20,
  LEVRYN30: 30,
};

export function validateCoupon(code) {
  if (!code || typeof code !== 'string') return null;
  const normalized = code.toUpperCase().replace(/\s+/g, '');
  if (VALID_COUPONS[normalized] !== undefined) {
    return {
      code: normalized,
      discountPct: VALID_COUPONS[normalized],
    };
  }
  return null;
}

/**
 * Server-Side Cart & Coupon Calculation
 * Prevents client-side price tampering by resolving each item to the canonical catalog.
 */
export function calculateOrderTotals(items, couponCode = null) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty');
  }

  const validatedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = getProductById(item.id) || PRODUCTS.find((p) => p.slug === item.slug);
    if (!product) {
      throw new Error(`Product not found or unavailable`);
    }

    const requestedSize = item.size || '50ml';
    const sizeConfig = product.sizes.find((s) => s.size === requestedSize);
    if (!sizeConfig) {
      throw new Error(`Size ${requestedSize} not available for ${product.name}`);
    }

    if (!sizeConfig.inStock) {
      throw new Error(`${product.name} (${requestedSize}) is currently out of stock`);
    }

    const quantity = Math.max(1, Math.min(20, parseInt(item.quantity, 10) || 1));
    const unitPrice = sizeConfig.price;
    const itemTotal = unitPrice * quantity;

    subtotal += itemTotal;

    validatedItems.push({
      productId: product.id,
      productName: product.name,
      size: requestedSize,
      unitPrice,
      quantity,
      itemTotal,
      image: product.images[0] || null,
    });
  }

  // Calculate discount if valid coupon provided
  let discountAmount = 0;
  let appliedCoupon = null;

  if (couponCode) {
    const coupon = validateCoupon(couponCode);
    if (coupon) {
      appliedCoupon = coupon.code;
      discountAmount = Math.round((subtotal * coupon.discountPct) / 100);
    }
  }

  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  // Flat delivery fee of Rs. 250 across Pakistan
  const shippingFee = SHIPPING_CONFIG.standardDeliveryFee;

  const total = subtotalAfterDiscount + shippingFee;

  return {
    items: validatedItems,
    subtotal,
    discountAmount,
    couponCode: appliedCoupon,
    subtotalAfterDiscount,
    shippingFee,
    total,
  };
}
