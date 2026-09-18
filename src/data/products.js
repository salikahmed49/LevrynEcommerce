// Product data - mirrors Supabase DB exactly
export const products = [
  {
    id: 1,
    name: 'Outlands',
    price: 3500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Outlands.png',
    bestSelling: true,
    description: 'A captivating fragrance that takes you on a journey through untamed landscapes.',
    rendition: 'Rendition of Amouage Outlands',
    notes: 'Top: Bergamot, Pink Pepper, Cardamom | Middle: Lavender, Geranium, Nutmeg | Base: Vanilla, Amber, Sandalwood, Patchouli',
    pricing: {
      '50ml': { price: 3500, inStock: true }
    }
  },
  {
    id: 2,
    name: 'Coco',
    price: 2250,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/coco.png',
    bestSelling: true,
    description: 'An elegant and sophisticated scent with timeless appeal.',
    rendition: 'Rendition of Chanel Coco Mademoiselle',
    notes: 'Top: Orange, Mandarin, Bergamot | Middle: Rose, Jasmine, Mimosa | Base: Patchouli, Vanilla, Tonka Bean, White Musk',
    pricing: {
      '50ml': { price: 2250, inStock: true }
    }
  },
  {
    id: 3,
    name: 'Medusa',
    price: 2250,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/medusa.png',
    bestSelling: false,
    description: 'A mysterious and alluring fragrance that captivates the senses.',
    rendition: 'Rendition of Victoria Secret Bombshell',
    notes: 'Top: Purple Passion Fruit, Tangelo, Grapefruit | Middle: Red Berries, Shangri-La Peony, Passion Flower | Base: Vanilla Orchid, Woody Notes',
    pricing: {
      '50ml': { price: 2250, inStock: true }
    }
  },
  {
    id: 4,
    name: 'Vanilla Candy',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/vanillacandy.png',
    bestSelling: true,
    description: 'A warm and inviting scent with rich, luxurious notes.',
    rendition: 'Rendition of PDM Althair',
    notes: 'Top: Cinnamon, Nutmeg, Cardamom | Middle: Vanilla, Tonka Bean, Almond | Base: Amber, Musk, Sandalwood',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 5,
    name: 'Office',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Office.png',
    bestSelling: true,
    description: 'Professional and refined, perfect for the modern workplace.',
    rendition: 'Original Creation',
    notes: 'Top: Citrus, Green Apple, Bergamot | Middle: Lavender, Geranium, Violet | Base: Cedarwood, Amber, White Musk',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 6,
    name: 'Issey',
    price: 1750,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Issey.png',
    bestSelling: false,
    description: 'Fresh and vibrant, inspired by the essence of nature.',
    rendition: "Rendition of L'Eau d'Issey Miyake",
    notes: 'Top: Yuzu, Mandarin, Bergamot, Calone | Middle: Lily of the Valley, Rose, Freesia, Watery Notes | Base: Amber, Musk, Cedarwood',
    pricing: {
      '50ml': { price: 1750, inStock: true }
    }
  },
  {
    id: 7,
    name: 'Cadenza',
    price: 3250,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Cadenza.png',
    bestSelling: false,
    description: 'A harmonious blend of notes that creates a perfect symphony.',
    rendition: 'Rendition of Maison Crivelli Oud Cadenza',
    notes: 'Top: Saffron, Pink Pepper, Bergamot | Middle: Oud, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla',
    pricing: {
      '50ml': { price: 3250, inStock: true }
    }
  },
  {
    id: 8,
    name: 'Intensely',
    price: 2250,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Intensely.png',
    bestSelling: false,
    description: 'A bold and intense fragrance for those who dare to stand out.',
    rendition: 'Rendition of Emporio Armani Stronger With You Intensely',
    notes: 'Top: Cardamom, Pink Pepper, Cinnamon | Middle: Vanilla, Chestnut, Rum | Base: Tonka Bean, Amber, Guaiac Wood',
    pricing: {
      '50ml': { price: 2250, inStock: true }
    }
  },
  {
    id: 9,
    name: 'Marshmallow',
    price: 2250,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/Marshmallow.png',
    bestSelling: false,
    description: 'Sweet and comforting, like a warm embrace.',
    rendition: 'Rendition of Kayali Yum Boujee Marshmallow',
    notes: 'Top: Marshmallow, Vanilla, Sugar | Middle: Jasmine, Orange Blossom, Heliotrope | Base: Musk, Amber, Sandalwood',
    pricing: {
      '50ml': { price: 2250, inStock: true }
    }
  },
  {
    id: 10,
    name: '11z01',
    price: 3500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/11z01.png',
    bestSelling: false,
    description: 'A unique and exclusive fragrance with a distinctive character.',
    rendition: 'Rendition of Aventus Creed 2010 Batch',
    notes: 'Top: Pineapple, Blackcurrant, Apple, Bergamot | Middle: Rose, Birch, Patchouli, Jasmine | Base: Musk, Oakmoss, Ambergris, Vanilla',
    pricing: {
      '50ml': { price: 3500, inStock: true }
    }
  },
  {
    id: 11,
    name: 'TK4',
    price: 3000,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/tk4.png',
    bestSelling: false,
    description: 'A sophisticated and refined fragrance with exceptional depth.',
    rendition: 'Rendition of Thomas Kosmala No 4',
    notes: 'Top: Bergamot, Pink Pepper, Cardamom | Middle: Iris, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla',
    pricing: {
      '50ml': { price: 3000, inStock: true }
    }
  },
  {
    id: 12,
    name: 'Victoris',
    price: 3000,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/victoris.png',
    bestSelling: false,
    description: 'A sophisticated and refined fragrance with exceptional depth.',
    rendition: 'Rendition of Aventus Cologne',
    notes: 'Top: Bergamot, Cardamom, Pink Pepper | Middle: Iris, Vetiver, Birch | Base: Oakmoss, Ambergris, Musk',
    pricing: {
      '50ml': { price: 3000, inStock: true }
    }
  },
  {
    id: 13,
    name: 'Code',
    price: 1750,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/code.png',
    bestSelling: false,
    description: 'A sophisticated and modern fragrance.',
    rendition: 'Rendition of Armani Code',
    notes: 'Top: Lemon, Bergamot | Middle: Star Anise, Olive Blossom | Base: Leather, Tobacco',
    pricing: {
      '50ml': { price: 1750, inStock: true }
    }
  },
  {
    id: 14,
    name: 'Stronger Oud',
    price: 1850,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/stronger_oud.png',
    bestSelling: false,
    description: 'A rich and intense oud variation.',
    rendition: 'Rendition of Stronger With You Oud',
    notes: 'Top: Lavender, Pink Pepper | Middle: Oud, Vanilla | Base: Amber, Woods',
    pricing: {
      '50ml': { price: 1850, inStock: true }
    }
  },
  {
    id: 15,
    name: 'Arctic Frost',
    price: 1750,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/arcticfrost.png',
    bestSelling: false,
    description: 'A fresh, icy and invigorating scent.',
    rendition: 'Rendition of Hawas Ice',
    notes: 'Top: Apple, Bergamot, Lemon | Middle: Cardamom, Plum | Base: Ambergris, Musk',
    pricing: {
      '50ml': { price: 1750, inStock: true }
    }
  },
  {
    id: 16,
    name: 'Oceanic Rush',
    price: 2350,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/oceanicrush.png',
    bestSelling: false,
    description: 'A fresh, aquatic, and energetic fragrance.',
    rendition: 'Rendition of Invictus Aqua',
    notes: 'Top: Yuzu, Grapefruit | Middle: Sea Water, Violet Leaf | Base: Ambergris, Guaiac Wood',
    pricing: {
      '50ml': { price: 2350, inStock: true }
    }
  },
  {
    id: 17,
    name: 'Elixir',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/elixir.png',
    bestSelling: false,
    description: 'A warm, sweet, and seductive elixir.',
    rendition: 'Rendition of Le Male Elixir',
    notes: 'Top: Lavender, Mint | Middle: Vanilla, Benzoin | Base: Honey, Tobacco, Tonka Bean',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 18,
    name: 'Royal Alexandria',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/royalalexandria.png',
    bestSelling: false,
    description: 'An opulent, rich woody and floral composition.',
    rendition: 'Rendition of Alexandria II',
    notes: 'Top: Apple, Cinnamon, Rose Wood | Middle: Cedar, Rose, Lily of the Valley | Base: Amber, Musk, Sandalwood, Oud',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 19,
    name: 'Guidance',
    price: 3350,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/guidance.png',
    bestSelling: false,
    description: 'A delicate yet powerful floral symphony.',
    rendition: 'Rendition of Guidance 46 Amouage',
    notes: 'Top: Pear, Hazelnut, Frankincense | Middle: Saffron, Rose, Jasmine | Base: Sandalwood, Vanilla, Ambergris',
    pricing: {
      '50ml': { price: 3350, inStock: true }
    }
  },
  {
    id: 20,
    name: 'Dominion',
    price: 3350,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/dominion.png',
    bestSelling: false,
    description: 'An exceptionally fresh, citrus and black tea blend.',
    rendition: 'Rendition of LV Imagination',
    notes: 'Top: Citron, Bergamot, Orange | Middle: Ginger, Cinnamon, Black Tea | Base: Ambroxan, Guaiac Wood',
    pricing: {
      '50ml': { price: 3350, inStock: true }
    }
  },
  {
    id: 21,
    name: 'Fiery Spice',
    price: 1950,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/fieryspice.png',
    bestSelling: false,
    description: 'An explosive and fiery spicy oriental fragrance.',
    rendition: 'Rendition of Spicebomb Extreme',
    notes: 'Top: Black Pepper, Grapefruit | Middle: Cinnamon, Cumin, Saffron | Base: Tobacco, Vanilla, Bourbon',
    pricing: {
      '50ml': { price: 1950, inStock: true }
    }
  },
  {
    id: 22,
    name: 'Verdant',
    price: 1750,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/verdant.png',
    bestSelling: false,
    description: 'A classic, gentlemanly green and fresh scent.',
    rendition: 'Rendition of Green Irish Tweed',
    notes: 'Top: Lemon, Verbena, Peppermint | Middle: Violet Leaves | Base: Iris, Sandalwood, Ambergris',
    pricing: {
      '50ml': { price: 1750, inStock: true }
    }
  },
  {
    id: 23,
    name: 'Apex',
    price: 3000,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/apex.png',
    bestSelling: false,
    description: 'A luminous, spicy and citrus-forward creation.',
    rendition: 'Rendition of LV Meteore',
    notes: 'Top: Mandarin, Sicilian Orange, Bergamot | Middle: Pink Pepper, Pepper, Nutmeg | Base: Vetiver',
    pricing: {
      '50ml': { price: 3000, inStock: true }
    }
  },
  {
    id: 24,
    name: 'Stellar',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/stellar.png',
    bestSelling: false,
    description: 'A dreamy, woody and floral escape through time.',
    rendition: 'Rendition of LV Stellar Times',
    notes: 'Top: Orange Blossom | Middle: White Amber | Base: Peru Balsam, Woody Notes',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 25,
    name: 'Coastal Drift',
    price: 1850,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/coastaldrift.png',
    bestSelling: false,
    description: 'A breezy and refreshing escape to a windswept coast.',
    rendition: 'Rendition of Jo Malone Wood Sage & Sea Salt',
    notes: 'Top: Ambrette Seeds | Middle: Sea Salt, Grapefruit | Base: Sage, Red Algae',
    pricing: {
      '50ml': { price: 1850, inStock: true }
    }
  },
  {
    id: 26,
    name: 'Profondeur',
    price: 2500,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/profondeur.png',
    bestSelling: false,
    description: 'A deep, aquatic and intensely refreshing marine scent.',
    rendition: 'Rendition of Acqua Di Gio Profondo',
    notes: 'Top: Sea Notes, Aquozone, Bergamot | Middle: Rosemary, Lavender, Cypress | Base: Mineral Notes, Musk, Patchouli',
    pricing: {
      '50ml': { price: 2500, inStock: true }
    }
  },
  {
    id: 27,
    name: 'Shadows Of Unlived Days',
    price: 3750,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/shadowsofunliveddays.png',
    bestSelling: false,
    description: 'A hauntingly beautiful, dark and poetic oud masterpiece.',
    rendition: 'Rendition of TSOD Turath',
    notes: 'Top: Saffron, Rose | Middle: Oud, Leather, Incense | Base: Musk, Amber, Sandalwood',
    pricing: {
      '50ml': { price: 3750, inStock: true }
    }
  },
  {
    id: 28,
    name: 'Checkmate',
    price: 2950,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/checkmate.png',
    bestSelling: false,
    description: 'A bold, smoky and addictive tobacco-forward fragrance for the daring.',
    rendition: 'Rendition of Montabaco by Masque Milano',
    notes: 'Top: Tobacco Leaf, Black Pepper, Violet | Middle: Leather, Labdanum, Incense | Base: Oud, Vetiver, Musk',
    pricing: {
      '50ml': { price: 2950, inStock: true }
    }
  },
  {
    id: 29,
    name: 'Giveaway',
    price: 0,
    discount: 0,
    onSale: false,
    size: '50ml',
    image: '/images/giveaway.png',
    bestSelling: false,
    description: 'Special giveaway exclusive from Levryn! A mystery scent crafted to surprise and delight.',
    rendition: 'Original Levryn Exclusive',
    notes: 'A carefully curated surprise — notes revealed upon delivery.',
    pricing: {
      '55ml': { price: 0, inStock: true }
    }
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};