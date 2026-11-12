import { SHIPPING_CONFIG } from './config.js';

/**
 * Revamped Product Catalog
 * Authoritative catalog source for Next.js application & server-side validation.
 * 
 * Active Lineup (50ml Extrait de Parfum):
 * 1. Cupid - Rs. 1,500 (Sale from 2,000) (Versace Eros)
 * 2. Seventh Petals - Rs. 2,500 (Sale from 3,000) (Hibiscus Mahajad Maison Crivelli)
 * 3. Marj - Rs. 2,000 (Sale from 3,000) (Ahmed Al Maghribi Marj)
 * 4. Outlands - Rs. 3,500 (Amouage Outlands)
 * 5. Bleu Intense - Rs. 2,500 (Bleu de Chanel Parfum)
 * 6. Office - Rs. 2,500 (Sale from 3,000) (Office for Men)
 * 7. Arctic Frost - Rs. 1,800 (Sale from 2,200) (Rasasi Hawas Ice)
 * 8. Rebel - Rs. 1,800 (Sale from 2,200) (Afnan 9pm Rebel)
 * 9. Intoxicated - Rs. 1,800 (Sale from 3,000) (Drunk Lovers BORNTOSTANDOUT)
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
      'A luminous, magnetic opening of cooling spearmint, tart green apple, and Italian lemon. The heart unfolds with warm tonka bean, radiant ambroxan, and aromatic geranium, settling into creamy Madagascar vanilla, Virginian cedarwood, and earthy vetiver. Confident, charismatic, and legendary in projection.',
    inspiration: 'Rendition of Versace Eros',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1500, originalPrice: 2000, inStock: true },
    ],
    notes: {
      top: ['Mint Leaves', 'Green Apple', 'Italian Lemon Zest'],
      heart: ['Tonka Bean', 'Ambroxan', 'Geranium Flower'],
      base: ['Madagascar Vanilla', 'Virginian Cedar', 'Atlas Cedar', 'Vetiver', 'Oakmoss'],
    },
    images: ['/images/cupid.webp'],
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
      'An opulent floral-fruity masterpiece contrasting radiant red hibiscus and Damask rose absolute against tart blackcurrant and crushed spearmint. As the fragrance settles, rich leather nuances, creamy bourbon vanilla, and ambrette seed envelop the senses in an extraordinary, room-filling sillage.',
    inspiration: 'Rendition of Maison Crivelli Hibiscus Mahajad',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Spearmint', 'Blackcurrant', 'Cinnamon'],
      heart: ['Hibiscus Accord', 'Damask Rose Absolute', 'Leather Nuances'],
      base: ['Bourbon Vanilla', 'Ambrette (Musk Mallow)', 'Sensual Musk'],
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
      'A royal oriental symphony opening with honeyed citrus, nutmeg, elemi, and spicy pink pepper. A regal heart of cashmere wood, saffron, cinnamon, and velvety rose gives way to a monumental base of smoky agarwood, golden amber, leather, and sandalwood.',
    inspiration: 'Rendition of Ahmed Al Maghribi Marj',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2000, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Oud Nuances', 'Honey', 'Nutmeg', 'Pink Pepper', 'Bergamot'],
      heart: ['Cashmere Wood', 'Saffron', 'Cinnamon', 'Rose', 'Patchouli'],
      base: ['Agarwood (Oud)', 'Amber', 'Ambergris', 'Leather', 'Sandalwood', 'Musk'],
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
      'An enigmatic, high-concept fragrance capturing the raw majesty of untamed wilderness. Aromatic green cardamom, Sichuan pepper, and lemon meet mystical frankincense and balsamic patchouli, unfolding onto rich benzoin, labdanum, birch, and smoky vanilla amber.',
    inspiration: 'Rendition of Amouage Outlands',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 3500, inStock: true },
    ],
    notes: {
      top: ['Cardamom', 'Frankincense (Olibanum)', 'Sichuan Pepper', 'Lemon Zest'],
      heart: ['Patchouli', 'Anise', 'Geranium', 'Davana', 'Saffron'],
      base: ['Benzoin', 'Labdanum', 'Opoponax', 'Birch', 'Bourbon Vanilla', 'Ambergris', 'Oud'],
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
      'A dense, commanding aromatic woody masterpiece. Crisp lemon zest, bergamot, and cooling mint transition into rich French lavender and geranium, settling over a luxurious foundation of creamy New Caledonian sandalwood, cedarwood, and rich amberwood.',
    inspiration: 'Rendition of Bleu de Chanel Parfum',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, inStock: true },
    ],
    notes: {
      top: ['Lemon Zest', 'Bergamot', 'Mint', 'Artemisia'],
      heart: ['Lavender', 'Geranium', 'Pineapple Accords', 'Green Accords'],
      base: ['New Caledonian Sandalwood', 'Cedarwood', 'Amberwood', 'Tonka Bean'],
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
      'Our meticulously tweaked, amplified rendition of the ultimate executive scent. Energizing Italian bergamot and orris root transition into a massive signature core of radiant ambroxan and jasmine, grounded by crisp woody patchouli, cashalox, and modern musk.',
    inspiration: 'Tweaked rendition of Office for Men',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Bergamot', 'Ambroxan', 'Orris Root'],
      heart: ['Woody Notes', 'Floral Notes', 'Jasmine', 'Ambergris'],
      base: ['Woody Notes', 'Patchouli', 'Cashalox', 'Clean Musk'],
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
      'An exhilarating blast of sub-zero freshness engineered for heat. Frozen crisp green apple, star anise, and Sicilian bergamot open with immense energy, followed by sweet plum and cardamom over an enduring base of driftwood, aquatic amber, and clean musk.',
    inspiration: 'Rendition of Rasasi Hawas Ice',
    isBestSeller: true,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 2200, inStock: true },
    ],
    notes: {
      top: ['Frozen Apple', 'Sicilian Bergamot', 'Italian Lemon', 'Star Anise'],
      heart: ['Plum Accord', 'Orange Blossom', 'Cardamom'],
      base: ['Driftwood', 'Moss (Oakmoss)', 'Amber Accords', 'Clean Musk'],
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
      'Daring, playful, and addictive. Opening with an intoxicating cocktail of ripe tropical pineapple, granny smith apple, and juicy mandarin. The heart develops with cedarwood, creamy vanilla, and oakmoss, anchored by rich caramel, ambergris, and warm musk.',
    inspiration: 'Rendition of Afnan 9pm Rebel',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 2200, inStock: true },
    ],
    notes: {
      top: ['Tropical Pineapple', 'Granny Smith Apple', 'Mandarin'],
      heart: ['Cedarwood', 'Vanilla Planifolia', 'Oakmoss'],
      base: ['Salted Caramel', 'Dry Wood', 'Ambergris', 'Sensual Musk'],
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
      'A deeply hypnotic, nocturnal aphrodisiac inspired by hedonistic romance. Tart red berries, bergamot, and juniper merge with spicy aged cognac, clary sage, and ginger. Melts into a dark seductive base of Sumatra benzoin, bourbon vanilla, dark patchouli, and sandalwood.',
    inspiration: 'Rendition of Drunk Lovers (BORNTOSTANDOUT)',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 1800, originalPrice: 3000, inStock: true },
    ],
    notes: {
      top: ['Red Berries', 'Juniper', 'Bergamot', 'Grapefruit'],
      heart: ['Spiced Cognac (Brandy)', 'Clary Sage', 'Ginger', 'Pepper', 'Cypress'],
      base: ['Dark Patchouli', 'Sumatra Benzoin', 'Bourbon Vanilla', 'Sandalwood', 'Vetiver', 'Amber'],
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
      'An explosive burst of fiery black pepper, pimento berry, and aromatic lavender. The heart deepens with rich cinnamon bark, cumin, and saffron, settling over a dark, luxurious bed of cured pipe tobacco, bourbon vanilla, and smoky woody amber.',
    inspiration: 'Rendition of Viktor&Rolf Spicebomb Extreme',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2500, inStock: true },
    ],
    notes: {
      top: ['Black Pepper', 'Pimento', 'Lavender'],
      heart: ['Cinnamon Bark', 'Cumin', 'Saffron'],
      base: ['Pipe Tobacco', 'Bourbon Accord', 'Vanilla', 'Woody Amber'],
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
      'Bright Italian bergamot and mandarin introduce lively citrus freshness, complemented by resinous elemi. Orange blossom softens the transition into warm cinnamon and cardamom, grounded in rich Madagascar bourbon vanilla, sweet praline, and guaiac wood.',
    inspiration: 'Rendition of Parfums de Marly Althaïr',
    isBestSeller: false,
    isFeatured: true,
    sizes: [
      { size: '50ml', price: 2000, inStock: true },
    ],
    notes: {
      top: ['Italian Bergamot', 'Mandarin', 'Elemi Resin'],
      heart: ['Orange Blossom', 'Ceylon Cinnamon', 'Cardamom'],
      base: ['Bourbon Vanilla', 'Guaiac Wood', 'Sweet Praline', 'Musk'],
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
