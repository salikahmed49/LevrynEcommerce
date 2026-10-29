# Levryn Fragrance Catalog, FAQ, Coupons & Supabase Setup Guide

This document details:
1. Updated FAQ with Pakistan delivery timeline, Rs. 250 flat shipping, Extrait de Parfum explanation, fragrance testing/testers info, strict broken-only return policy, and No COD policy.
2. Removal of all **Best Seller** badges from the store.
3. Updated catalog with Cupid, Fiery Xtreme, Vanilla Candy, and Hibiscus.
4. Active coupon codes (`LEVRYN10`, `LEVRYN20`, `LEVRYN30`).
5. Complete Supabase SQL query.
6. Git deployment commands for Vercel.

---

## 1. Store Policies & FAQ Updates

The [`/faq`](file:///d:/LevrynFinal-main/src/app/faq/page.js) page and checkout flows reflect these policies:

- **Delivery Time across Pakistan:**
  > Orders within Karachi typically dispatch within 1–2 business days. Rest all take within 2–3 business days to dispatched within 3–5 business days via tracked express couriers.
- **Delivery Charges:**
  > Orders carry a flat delivery fee of Rs. 250 across Pakistan.
- **What Extrait de Parfum Means:**
  > Extrait de Parfum is the highest concentration tier in fine perfumery, containing a significantly richer concentration of pure perfume oils compared to standard Eau de Parfum or Eau de Toilette. This formulation results in greater depth, an intricate evolution of notes, and enduring presence on skin.
- **Testing Fragrances & Testers:**
  > Our 30ml flacons offer an accessible way to explore multiple fragrance profiles and accord families before committing to larger 100ml flacons. For testers (3ml, 5ml, 10ml), customers can reach out directly with customer care on WhatsApp.
- **Return & Exchange Policy:**
  > Strict No return/exchange policy. Returns or replacements only exist if a customer receives a broken or damaged product upon delivery.
- **Payment Method:**
  > No Cash on Delivery (No COD). All orders are placed via direct online bank transfer verification (HBL, Raast, Nayapay, Sadapay, etc.).

---

## 2. Product Catalog (50ml Only, Best Seller Badge Removed)

All `isBestSeller` tags and badge displays were removed from the product cards and flacon pages:

| Product Name | Volume | Price (PKR) | Inspiration | Image |
| :--- | :--- | :--- | :--- | :--- |
| **Cupid** | 50ml | Rs. 1,500 | Reminds me of Versace Eros | `/images/Cupid.png` |
| **Fiery Xtreme** | 50ml | Rs. 2,500 | Reminds me of Viktor&Rolf Spicebomb Extreme | `/images/fiery Xtreme.png` |
| **Vanilla Candy** | 50ml | Rs. 2,000 | Reminds me of Parfums de Marly Althaïr | `/images/Vanilla Candy.png` |
| **Hibiscus** | 50ml | Rs. 2,500 | Reminds me of Maison Crivelli Hibiscus Mahajad | `/images/Hibiscus.png` |

---

## 3. Active Coupon Codes

Customers can apply these in the Cart Drawer or on Checkout:
- `LEVRYN10` or `Levryn 10` &rarr; **10% OFF**
- `LEVRYN20` or `levryn 20` &rarr; **20% OFF**
- `LEVRYN30` or `levryn30` &rarr; **30% OFF**

---

## 4. Complete Updated Supabase SQL Query

Run this in **Supabase > SQL Editor > New Query**:

```sql
-- ============================================================
-- LEVRYN ECOMMERCE — COMPLETE SUPABASE SETUP
-- 4 Active Fragrances (50ml Only, No Best Seller Flags)
-- Includes Vouchers (10%, 20%, 30%), Orders & RLS
-- Copy & Paste into: Supabase > SQL Editor > New Query
-- ============================================================

-- 1. DROP EXISTING TABLES (Clean Slate)
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS vouchers CASCADE;

-- ============================================================
-- 2. CREATE PRODUCTS TABLE (50ml Single Size)
-- ============================================================
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  discount INTEGER DEFAULT 0,
  on_sale BOOLEAN DEFAULT FALSE,
  size TEXT DEFAULT '50ml',
  image TEXT NOT NULL,
  best_selling BOOLEAN DEFAULT FALSE,
  description TEXT,
  rendition TEXT,
  notes TEXT,
  pricing JSONB DEFAULT '{"50ml": {"price": 0, "inStock": false}}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 3. CREATE VOUCHERS / COUPONS TABLE
-- ============================================================
CREATE TABLE vouchers (
  code         TEXT PRIMARY KEY,
  discount_pct NUMERIC(5, 2) NOT NULL CHECK (discount_pct > 0 AND discount_pct <= 50),
  active       BOOLEAN DEFAULT true,
  max_uses     INTEGER DEFAULT NULL,
  used_count   INTEGER DEFAULT 0,
  expires_at   TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 4. CREATE ORDERS TABLE
-- ============================================================
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_postal_code TEXT,
  customer_notes TEXT,
  payment_method TEXT DEFAULT 'bank_transfer',
  payment_status TEXT DEFAULT 'pending_verification',
  order_status TEXT DEFAULT 'placed',
  bank_name TEXT,
  bank_account_number TEXT,
  bank_account_title TEXT,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  voucher_code TEXT,
  shipping_fee NUMERIC(10, 2) DEFAULT 250,
  total_amount NUMERIC(10, 2),
  total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  client_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 5. CREATE ORDER_ITEMS TABLE
-- ============================================================
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  product_size TEXT NOT NULL DEFAULT '50ml',
  product_price NUMERIC(10, 2),
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10, 2)
);

-- ============================================================
-- 6. CREATE PRODUCT_REVIEWS TABLE
-- ============================================================
CREATE TABLE product_reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 7. CREATE ANALYTICS_EVENTS TABLE
-- ============================================================
CREATE TABLE analytics_events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_type TEXT NOT NULL,
  product_id TEXT,
  product_name TEXT,
  product_price NUMERIC(10, 2),
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 8. CREATE INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_products_on_sale ON products(on_sale);
CREATE INDEX idx_products_best_selling ON products(best_selling);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_reviews_approved ON product_reviews(approved);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);

-- ============================================================
-- 9. INSERT COUPON CODES
-- ============================================================
INSERT INTO vouchers (code, discount_pct, active) VALUES
  ('LEVRYN10', 10.00, true),
  ('LEVRYN20', 20.00, true),
  ('LEVRYN30', 30.00, true)
ON CONFLICT (code) DO NOTHING;

CREATE OR REPLACE FUNCTION validate_voucher(p_code TEXT)
RETURNS NUMERIC
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT discount_pct
  FROM   vouchers
  WHERE  code        = UPPER(REPLACE(TRIM(p_code), ' ', ''))
    AND  active      = true
    AND  (expires_at IS NULL OR expires_at > NOW())
    AND  (max_uses   IS NULL OR used_count < max_uses);
$$;

-- ============================================================
-- 10. INSERT PRODUCTS (4 Active on Top, No Best Selling Badges)
-- ============================================================
INSERT INTO products (name, price, discount, on_sale, size, image, best_selling, description, rendition, notes, pricing) VALUES

-- 🌟 1. CUPID (IN-STOCK, ACTIVE)
('Cupid', 1500, 0, false, '50ml', '/images/Cupid.png', false,
  'A vibrant burst of crisp green apple, zesty lemon, and cooling mint opens the fragrance with energetic freshness. Aromatic geranium and tonka bean introduce smooth sweetness, while ambroxan adds a modern, sensual character. The fragrance settles into creamy vanilla, earthy vetiver, and dry cedarwood, leaving a fresh, confidently sweet woody trail.',
  'Reminds me of Versace Eros',
  'Top: Mint, Green Apple, Italian Lemon | Middle: Tonka Bean, Geranium, Ambroxan | Base: Madagascar Vanilla, Cedarwood, Vetiver, Oakmoss',
  '{"50ml": {"price": 1500, "inStock": true}}'::jsonb),

-- 🌟 2. FIERY XTREME (IN-STOCK, ACTIVE)
('Fiery Xtreme', 2500, 0, false, '50ml', '/images/fiery Xtreme.png', false,
  'An intense opening of fiery black pepper and aromatic lavender sets the tone, followed by a rich heart of cinnamon, cumin, and saffron. As the spices deepen, warm tobacco and smooth bourbon nuances blend with creamy vanilla and woody amber. The result is a bold, enveloping fragrance with dark sweetness and lingering warmth.',
  'Reminds me of Viktor&Rolf Spicebomb Extreme',
  'Top: Black Pepper, Lavender | Middle: Cinnamon, Cumin, Saffron | Base: Tobacco, Bourbon Accord, Vanilla, Woody Amber',
  '{"50ml": {"price": 2500, "inStock": true}}'::jsonb),

-- 🌟 3. VANILLA CANDY (IN-STOCK, ACTIVE)
('Vanilla Candy', 2000, 0, false, '50ml', '/images/Vanilla Candy.png', false,
  'Bright bergamot and mandarin introduce lively citrus freshness, complemented by the resinous, aromatic character of elemi. Orange blossom softens the transition into a warm heart of cinnamon and cardamom. At its core, rich bourbon vanilla merges with sweet praline and smooth guaiac wood, creating a creamy, refined fragrance that balances gourmand richness with polished woody depth.',
  'Reminds me of Parfums de Marly Althaïr',
  'Top: Bergamot, Mandarin, Elemi | Middle: Orange Blossom, Cinnamon, Cardamom | Base: Bourbon Vanilla, Guaiac Wood, Praline',
  '{"50ml": {"price": 2000, "inStock": true}}'::jsonb),

-- 🌟 4. HIBISCUS (IN-STOCK, ACTIVE)
('Hibiscus', 2500, 0, false, '50ml', '/images/Hibiscus.png', false,
  'A vivid floral-fruity composition built around the striking contrast of hibiscus and rich Damask rose. Tart blackcurrant and cool spearmint add brightness, creating a lively opening against an opulent floral heart. As the fragrance develops, velvety vanilla and supple leather introduce smooth, sensual warmth, while musk and ambrette provide a soft, lingering depth. The overall impression is lavish, fruity-floral, and distinctly leathery.',
  'Reminds me of Maison Crivelli Hibiscus Mahajad',
  'Key Notes: Hibiscus, Damask Rose, Blackcurrant, Spearmint, Vanilla, Leather, Musk, Cinnamon, Ambrette',
  '{"50ml": {"price": 2500, "inStock": true}}'::jsonb),

-- 🚫 REST OF CATALOG (OUT OF STOCK / INACTIVE)
('Outlands', 3500, 0, false, '50ml', '/images/Outlands.png', false,
  'A captivating fragrance that takes you on a journey through untamed landscapes.',
  'Rendition of Amouage Outlands',
  'Top: Bergamot, Pink Pepper, Cardamom | Middle: Lavender, Geranium, Nutmeg | Base: Vanilla, Amber, Sandalwood, Patchouli',
  '{"50ml": {"price": 3500, "inStock": false}}'::jsonb),

('Coco', 2500, 0, false, '50ml', '/images/coco.png', false,
  'An elegant and sophisticated scent with timeless appeal.',
  'Rendition of Chanel Coco Mademoiselle',
  'Top: Orange, Mandarin, Bergamot | Middle: Rose, Jasmine, Mimosa | Base: Patchouli, Vanilla, Tonka Bean, White Musk',
  '{"50ml": {"price": 2500, "inStock": false}}'::jsonb),

('Medusa', 2500, 0, false, '50ml', '/images/medusa.png', false,
  'A mysterious and alluring fragrance that captivates the senses.',
  'Rendition of Victoria Secret Bombshell',
  'Top: Purple Passion Fruit, Tangelo, Grapefruit | Middle: Red Berries, Shangri-La Peony, Passion Flower | Base: Vanilla Orchid, Woody Notes',
  '{"50ml": {"price": 2500, "inStock": false}}'::jsonb),

('Office', 2800, 0, false, '50ml', '/images/Office.png', false,
  'Professional and refined, perfect for the modern workplace.',
  'Original Creation',
  'Top: Citrus, Green Apple, Bergamot | Middle: Lavender, Geranium, Violet | Base: Cedarwood, Amber, White Musk',
  '{"50ml": {"price": 2800, "inStock": false}}'::jsonb),

('Issey', 1750, 0, false, '50ml', '/images/Issey.png', false,
  'Fresh and vibrant, inspired by the essence of nature.',
  'Rendition of L''Eau d''Issey Miyake',
  'Top: Yuzu, Mandarin, Bergamot, Calone | Middle: Lily of the Valley, Rose, Freesia, Watery Notes | Base: Amber, Musk, Cedarwood',
  '{"50ml": {"price": 1750, "inStock": false}}'::jsonb),

('Cadenza', 3250, 0, false, '50ml', '/images/Cadenza.png', false,
  'A harmonious blend of notes that creates a perfect symphony.',
  'Rendition of Maison Crivelli Oud Cadenza',
  'Top: Saffron, Pink Pepper, Bergamot | Middle: Oud, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla',
  '{"50ml": {"price": 3250, "inStock": false}}'::jsonb),

('Intensely', 2800, 0, false, '50ml', '/images/Intensely.png', false,
  'A bold and intense fragrance for those who dare to stand out.',
  'Rendition of Emporio Armani Stronger With You Intensely',
  'Top: Cardamom, Pink Pepper, Cinnamon | Middle: Vanilla, Chestnut, Rum | Base: Tonka Bean, Amber, Guaiac Wood',
  '{"50ml": {"price": 2800, "inStock": false}}'::jsonb),

('Marshmallow', 2250, 0, false, '50ml', '/images/Marshmallow.png', false,
  'Sweet and comforting, like a warm embrace.',
  'Rendition of Kayali Yum Boujee Marshmallow',
  'Top: Marshmallow, Vanilla, Sugar | Middle: Jasmine, Orange Blossom, Heliotrope | Base: Musk, Amber, Sandalwood',
  '{"50ml": {"price": 2250, "inStock": false}}'::jsonb),

('11z01', 3500, 0, false, '50ml', '/images/11z01.png', false,
  'A unique and exclusive fragrance with a distinctive character.',
  'Rendition of Aventus Creed 2010 Batch',
  'Top: Pineapple, Blackcurrant, Apple, Bergamot | Middle: Rose, Birch, Patchouli, Jasmine | Base: Musk, Oakmoss, Ambergris, Vanilla',
  '{"50ml": {"price": 3500, "inStock": false}}'::jsonb),

('TK4', 3000, 0, false, '50ml', '/images/tk4.png', false,
  'A sophisticated and refined fragrance with exceptional depth.',
  'Rendition of Thomas Kosmala No 4',
  'Top: Bergamot, Pink Pepper, Cardamom | Middle: Iris, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla',
  '{"50ml": {"price": 3000, "inStock": false}}'::jsonb),

('Victoris', 3000, 0, false, '50ml', '/images/victoris.png', false,
  'A sophisticated and refined fragrance with exceptional depth.',
  'Rendition of Aventus Cologne',
  'Top: Bergamot, Cardamom, Pink Pepper | Middle: Iris, Vetiver, Birch | Base: Oakmoss, Ambergris, Musk',
  '{"50ml": {"price": 3000, "inStock": false}}'::jsonb),

('Code', 1750, 0, false, '50ml', '/images/code.png', false,
  'A sophisticated and modern fragrance.',
  'Rendition of Armani Code',
  'Top: Lemon, Bergamot | Middle: Star Anise, Olive Blossom | Base: Leather, Tobacco',
  '{"50ml": {"price": 1750, "inStock": false}}'::jsonb),

('Stronger Oud', 1850, 0, false, '50ml', '/images/stronger oud.png', false,
  'A rich and intense oud variation.',
  'Rendition of Stronger With You Oud',
  'Top: Lavender, Pink Pepper | Middle: Oud, Vanilla | Base: Amber, Woods',
  '{"50ml": {"price": 1850, "inStock": false}}'::jsonb),

('Arctic Frost', 1750, 0, false, '50ml', '/images/arcticfrost.png', false,
  'A fresh, icy and invigorating scent.',
  'Rendition of Hawas Ice',
  'Top: Apple, Bergamot, Lemon | Middle: Cardamom, Plum | Base: Ambergris, Musk',
  '{"50ml": {"price": 1750, "inStock": false}}'::jsonb),

('Oceanic Rush', 2350, 0, false, '50ml', '/images/oceanicrush.png', false,
  'A fresh, aquatic, and energetic fragrance.',
  'Rendition of Invictus Aqua',
  'Top: Yuzu, Grapefruit | Middle: Sea Water, Violet Leaf | Base: Ambergris, Guaiac Wood',
  '{"50ml": {"price": 2350, "inStock": false}}'::jsonb),

('Elixir', 3000, 0, false, '50ml', '/images/elixir.png', false,
  'A warm, sweet, and seductive elixir.',
  'Rendition of Le Male Elixir',
  'Top: Lavender, Mint | Middle: Vanilla, Benzoin | Base: Honey, Tobacco, Tonka Bean',
  '{"50ml": {"price": 3000, "inStock": false}}'::jsonb),

('Royal Alexandria', 2500, 0, false, '50ml', '/images/royalalexandria.png', false,
  'An opulent, rich woody and floral composition.',
  'Rendition of Alexandria II',
  'Top: Apple, Cinnamon, Rose Wood | Middle: Cedar, Rose, Lily of the Valley | Base: Amber, Musk, Sandalwood, Oud',
  '{"50ml": {"price": 2500, "inStock": false}}'::jsonb),

('Guidance', 3350, 0, false, '50ml', '/images/guidance.png', false,
  'A delicate yet powerful floral symphony.',
  'Rendition of Guidance 46 Amouage',
  'Top: Pear, Hazelnut, Frankincense | Middle: Saffron, Rose, Jasmine | Base: Sandalwood, Vanilla, Ambergris',
  '{"50ml": {"price": 3350, "inStock": false}}'::jsonb),

('Fiery Spice', 1950, 0, false, '50ml', '/images/fieryspice.png', false,
  'An explosive and fiery spicy oriental fragrance.',
  'Rendition of Spicebomb Extreme',
  'Top: Black Pepper, Grapefruit | Middle: Cinnamon, Cumin, Saffron | Base: Tobacco, Vanilla, Bourbon',
  '{"50ml": {"price": 1950, "inStock": false}}'::jsonb),

('Verdant', 1750, 0, false, '50ml', '/images/verdant.png', false,
  'A classic, gentlemanly green and fresh scent.',
  'Rendition of Green Irish Tweed',
  'Top: Lemon, Verbena, Peppermint | Middle: Violet Leaves | Base: Iris, Sandalwood, Ambergris',
  '{"50ml": {"price": 1750, "inStock": false}}'::jsonb),

('Apex', 3000, 0, false, '50ml', '/images/apex.png', false,
  'A luminous, spicy and citrus-forward creation.',
  'Rendition of LV Meteore',
  'Top: Mandarin, Sicilian Orange, Bergamot | Middle: Pink Pepper, Pepper, Nutmeg | Base: Vetiver',
  '{"50ml": {"price": 3000, "inStock": false}}'::jsonb),

('Stellar', 2500, 0, false, '50ml', '/images/stellar.png', false,
  'A dreamy, woody and floral escape through time.',
  'Rendition of LV Stellar Times',
  'Top: Orange Blossom | Middle: White Amber | Base: Peru Balsam, Woody Notes',
  '{"50ml": {"price": 2500, "inStock": false}}'::jsonb),

('Coastal Drift', 1850, 0, false, '50ml', '/images/coastaldrift.png', false,
  'A breezy and refreshing escape to a windswept coast.',
  'Rendition of Jo Malone Wood Sage & Sea Salt',
  'Top: Ambrette Seeds | Middle: Sea Salt, Grapefruit | Base: Sage, Red Algae',
  '{"50ml": {"price": 1850, "inStock": false}}'::jsonb),

('Profondeur', 3000, 0, false, '50ml', '/images/profondeur.png', false,
  'A deep, aquatic and intensely refreshing marine scent.',
  'Rendition of Acqua Di Gio Profondo',
  'Top: Sea Notes, Aquozone, Bergamot | Middle: Rosemary, Lavender, Cypress | Base: Mineral Notes, Musk, Patchouli',
  '{"50ml": {"price": 3000, "inStock": false}}'::jsonb),

('Shadows Of Unlived Days', 3750, 0, false, '50ml', '/images/shadowsofunliveddays.png', false,
  'A hauntingly beautiful, dark and poetic oud masterpiece.',
  'Rendition of TSOD Turath',
  'Top: Saffron, Rose | Middle: Oud, Leather, Incense | Base: Musk, Amber, Sandalwood',
  '{"50ml": {"price": 3750, "inStock": false}}'::jsonb),

('Checkmate', 2950, 0, false, '50ml', '/images/checkmate.png', false,
  'A bold, smoky and addictive tobacco-forward fragrance for the daring.',
  'Rendition of Montabaco by Masque Milano',
  'Top: Tobacco Leaf, Black Pepper, Violet | Middle: Leather, Labdanum, Incense | Base: Oud, Vetiver, Musk',
  '{"50ml": {"price": 2950, "inStock": false}}'::jsonb),

('Giveaway', 0, 0, false, '50ml', '/images/giveaway.png', false,
  'Special giveaway exclusive from Levryn! A mystery scent crafted to surprise and delight.',
  'Original Levryn Exclusive',
  'A carefully curated surprise — notes revealed upon delivery.',
  '{"50ml": {"price": 0, "inStock": false}}'::jsonb),

('Rain Tea', 4000, 0, false, '50ml', '/images/raintea.png', false,
  'A fresh and invigorating fragrance inspired by rainy garden tea.',
  'Rendition of LV Rain Tea',
  'Top: Green Tea, Lemon, Bergamot | Middle: Jasmine, Iris, Geranium | Base: Musk, Vetiver, Cedar',
  '{"50ml": {"price": 4000, "inStock": false}}'::jsonb),

('Lucid', 4000, 0, false, '50ml', '/images/lucid.png', false,
  'A vivid and imaginative fragrance that sparks creativity.',
  'Rendition of LV Imagination',
  'Top: Yuzu, Pink Pepper, Bergamot | Middle: Iris, Vetiver, Rose | Base: Amber, Patchouli, Sandalwood',
  '{"50ml": {"price": 4000, "inStock": false}}'::jsonb),

('Tygar', 2800, 0, false, '50ml', '/images/tygar.png', false,
  'A fierce and untamed fragrance with bold character.',
  'Rendition of Bvlgari Tygar',
  'Top: Saffron, Pink Pepper, Cardamom | Middle: Iris, Vetiver, Oud | Base: Amber, Musk, Cedar',
  '{"50ml": {"price": 2800, "inStock": false}}'::jsonb),

('Saltwind', 2500, 0, false, '50ml', '/images/saltwind.png', false,
  'A fresh and aquatic fragrance with oceanic notes.',
  'Rendition of Sel d''Issey',
  'Top: Sea Notes, Grapefruit, Bergamot | Middle: Lily of the Valley, Rose, Freesia | Base: Musk, Amber, Cedar',
  '{"50ml": {"price": 2500, "inStock": false}}'::jsonb),

('Alpha', 1850, 0, false, '50ml', '/images/alpha.png', false,
  'A refined and noble fragrance for the confident man.',
  'Rendition of Ralph Lauren Polo Blue',
  'Top: Bergamot, Lemon, Mandarin | Middle: Lavender, Geranium, Rose | Base: Vetiver, Musk, Cedarwood',
  '{"50ml": {"price": 1850, "inStock": false}}'::jsonb),

('Legend', 1950, 0, false, '50ml', '/images/legend.png', false,
  'A timeless and sophisticated fragrance for true gentlemen.',
  'Rendition of Mont Blanc Legend',
  'Top: Bergamot, Grapefruit, Neroli | Middle: Lavender, Oakmoss, Cinnamon | Base: Sandalwood, Musk, Cedarwood',
  '{"50ml": {"price": 1950, "inStock": false}}'::jsonb);

-- ============================================================
-- 11. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 12. ROW LEVEL SECURITY POLICIES
-- ============================================================
DROP POLICY IF EXISTS "Public can read products" ON products;
CREATE POLICY "Public can read products" ON products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can place orders" ON orders;
CREATE POLICY "Public can place orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view own order" ON orders;
CREATE POLICY "Public can view own order" ON orders FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can add items" ON order_items;
CREATE POLICY "Public can add items" ON order_items FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view order items" ON order_items;
CREATE POLICY "Public can view order items" ON order_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read approved reviews" ON product_reviews;
CREATE POLICY "Public can read approved reviews" ON product_reviews FOR SELECT TO anon, authenticated USING (approved = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can write reviews" ON product_reviews;
CREATE POLICY "Public can write reviews" ON product_reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can log analytics" ON analytics_events;
CREATE POLICY "Public can log analytics" ON analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);

GRANT EXECUTE ON FUNCTION validate_voucher(TEXT) TO anon, authenticated;

-- ============================================================
-- 13. VERIFICATION QUERY
-- ============================================================
SELECT name, price, size, rendition, best_selling, pricing->'50ml'->>'inStock' AS in_stock
FROM products 
WHERE pricing->'50ml'->>'inStock' = 'true';
```

---

## 5. Git Deployment Commands

Run these terminal commands in your project directory (`d:\LevrynFinal-main`):

```bash
git add .
git commit -m "feat: update FAQ delivery, return & no COD policies, set flat delivery fee Rs. 250, and remove best seller badges"
git push origin main
```
