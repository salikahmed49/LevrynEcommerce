import { SHIPPING_CONFIG } from './config.js';

/**
 * Revamped Product Catalog
 * Authoritative catalog source for Next.js application & server-side validation.
 * 
 * Active Lineup (50ml Extrait de Parfum):
 * 1. Cupid - Rs. 1,500 (Versace Eros)
 * 2. Seventh Petals - Rs. 2,500 (Sale from 3,000) (Hibiscus Mahajad Maison Crivelli)
 * 3. Marj - Rs. 2,000 (Sale from 3,000) (Ahmed Al Maghribi Marj)
 * 4. Outlands - Rs. 3,500 (Amouage Outlands)
 * 5. Bleu Intense - Rs. 2,500 (Bleu de Chanel Parfum)
 * 6. Office - Rs. 2,500 (Sale from 3,000) (Office for Men)
 * 7. Arctic Frost - Rs. 1,800 (Sale from 2,200) (Rasasi Hawas Ice)
 * 8. Rebel - Rs. 1,800 (Sale from 2,200) (Afnan 9pm Rebel)
 * 9. Intoxicated - Rs. 1,800 (Sale from 3,000) (Drunk Lovers)
 * 10. Fiery Xtreme - Rs. 2,500 (Spicebomb Extreme)
 * 11. Vanilla Candy - Rs. 2,000 (PDM Althaïr)
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
    inspiration: 'Rendition of Versace Eros',
    isBestSeller: true,
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
    id: 'lev-seventh-petals',
    slug: 'seventh-petals',
    name: 'Seventh Petals',
    subtitle: 'Red Hibiscus, Damask Rose & Supple Leather Accord',
    family: 'Floral & Exotic Amber Leather',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'An opulent floral-fruity masterpiece contrasting radiant red hibiscus and Damask rose against tart blackcurrant and spearmint. As the fragrance develops, smooth bourbon vanilla and rich leather merge with ambrette seed, creating an irresistible, opulent sillage.',
    inspiration: 'Rendition of Maison Crivelli Hibiscus Mahajad',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Hibiscus Accord', 'Blackcurrant', 'Spearmint'],
      heart: ['Damask Rose Absolute', 'Cinnamon', 'Ambrette Seed'],
      base: ['Bourbon Vanilla', 'Leather Accord', 'Sensual Musk'],
    },
    images: ['/images/seventhpetals.png'],
  },
  {
    id: 'lev-marj',
    slug: 'marj',
    name: 'Marj',
    subtitle: 'Precious Saffron, Smoky Oud & Velvet Spices',
    family: 'Rich Oriental & Woody Spice',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'A rich, royal oriental blend featuring luminous saffron, nutmeg, and aromatic pink pepper leading into a majestic heart of smoky agarwood, amber, and refined patchouli. Designed for those who demand authority, warmth, and enduring projection.',
    inspiration: 'Rendition of Ahmed Al Maghribi Marj',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2000, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Saffron', 'Nutmeg', 'Pink Pepper'],
      heart: ['Smoky Oud', 'Amber', 'Damask Rose'],
      base: ['Refined Patchouli', 'Musk', 'Precious Woods'],
    },
    images: ['/images/marj.png'],
  },
  {
    id: 'lev-outlands',
    slug: 'outlands',
    name: 'Outlands',
    subtitle: 'Smoky Frankincense, Resinous Amber & Cardamom',
    family: 'High Amber & Exotic Woods',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'An enigmatic, high-concept fragrance capturing the raw majesty of untamed wilderness. Cold aromatic cardamom and incense encounter deep benzoin, balsamic woods, and rare amber, evoking profound mystery and timeless grandeur.',
    inspiration: 'Rendition of Amouage Outlands',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 3500, inStock: true },
    ],
    notes: {
      top: ['Cardamom', 'Lemon Zest', 'Frankincense Mist'],
      heart: ['Anise', 'Patchouli', 'Balsamic Resins'],
      base: ['Amber Woods', 'Benzoin', 'Olibanum'],
    },
    images: ['/images/Outlands.png'],
  },
  {
    id: 'lev-bleu-intense',
    slug: 'bleu-intense',
    name: 'Bleu Intense',
    subtitle: 'Zesty Citrus, Fresh Lavender & Deep New Caledonian Sandalwood',
    family: 'Woody Aromatic & Fresh Citrus',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    description:
      'A pure, powerful aromatic woody masterpiece. Crisp lemon zest and cool mint transition into rich lavender and geranium, settling over a dense, velvety base of creamy New Caledonian sandalwood, cedar, and ambery cedarwood.',
    inspiration: 'Rendition of Bleu de Chanel Parfum',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, inStock: true },
    ],
    notes: {
      top: ['Lemon Zest', 'Bergamot', 'Mint'],
      heart: ['Lavender', 'Geranium', 'Pineapple Notes'],
      base: ['New Caledonian Sandalwood', 'Cedarwood', 'Amberwood'],
    },
    images: ['/images/bleuintense.png'],
  },
  {
    id: 'lev-office',
    slug: 'office',
    name: 'Office',
    subtitle: 'Clean Bergamot, Ambroxan Burst & Woody Patchouli',
    family: 'Modern Clean Woody & Citrus',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    description:
      'Our meticulously tweaked, amplified rendition of the ultimate executive scent. Opening with an effervescent burst of bergamot and green accords, energized by massive doses of crisp ambroxan, radiant florals, and a grounding woody patchouli drydown that commands respect without shouting.',
    inspiration: 'Tweaked rendition of Office for Men',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Bergamot', 'Crisp Apple', 'Lemon'],
      heart: ['Ambroxan', 'Floral Accords', 'Jasmine'],
      base: ['Patchouli', 'Woody Accords', 'Clean Musk'],
    },
    images: ['/images/Office.png'],
  },
  {
    id: 'lev-arctic-frost',
    slug: 'arctic-frost',
    name: 'Arctic Frost',
    subtitle: 'Icy Apple, Italian Bergamot & Frosted Aquatic Woods',
    family: 'Fresh Aquatic & Fruity Ice',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    description:
      'An invigorating avalanche of icy freshness. Frozen crisp green apple, star anise, and sparkling Italian bergamot combine with maritime aquatic accords, spiced cardamom, and cold musk for unmatched heat performance and projection.',
    inspiration: 'Rendition of Rasasi Hawas Ice',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 2200, inStock: true },
    ],
    notes: {
      top: ['Frozen Apple', 'Italian Bergamot', 'Star Anise'],
      heart: ['Plum Accord', 'Orange Blossom', 'Cardamom'],
      base: ['Aquatic Woods', 'Ambroxan', 'Cold Musk', 'Moss'],
    },
    images: ['/images/arcticfrost.png'],
  },
  {
    id: 'lev-rebel',
    slug: 'rebel',
    name: 'Rebel',
    subtitle: 'Juicy Pineapple, Crisp Green Apple & Sensual Vanilla Wood',
    family: 'Fruity Gourmand & Vibrant Amber',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    description:
      'Bold, magnetic, and relentlessly youthful. Rebel leads with a sweet explosion of fresh pineapple, tart apple, and zesty citrus, seamlessly transitioning into sweet spices, warm vanilla, and golden amber.',
    inspiration: 'Rendition of Afnan 9pm Rebel',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 2200, inStock: true },
    ],
    notes: {
      top: ['Fresh Pineapple', 'Green Apple', 'Mandarin'],
      heart: ['Spicy Accords', 'Lavender', 'Cedar'],
      base: ['Warm Vanilla', 'Golden Amber', 'Oakmoss'],
    },
    images: ['/images/rebel.png'],
  },
  {
    id: 'lev-intoxicated',
    slug: 'intoxicated',
    name: 'Intoxicated',
    subtitle: 'Red Wine Accord, Spiced Cognac & Dark Patchouli',
    family: 'Gourmand Boozy & Warm Amber',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    description:
      'A deeply hypnotic, seductive cocktail of rich red wine accords, juniper berries, and aged brandy nuances. Melted into roasted coffee, velvety bourbon vanilla, and dark sensual patchouli for an intimate, magnetic trail.',
    inspiration: 'Rendition of Drunk Lovers (BORNTOSTANDOUT)',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Red Wine Accord', 'Juniper Berries', 'Bergamot'],
      heart: ['Spiced Cognac', 'Clary Sage', 'Cinnamon Bark'],
      base: ['Dark Patchouli', 'Bourbon Vanilla', 'Ambergris', 'Vetiver'],
    },
    images: ['/images/intoxicated.png'],
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
    inspiration: 'Rendition of Viktor&Rolf Spicebomb Extreme',
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
    inspiration: 'Rendition of Parfums de Marly Althaïr',
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
