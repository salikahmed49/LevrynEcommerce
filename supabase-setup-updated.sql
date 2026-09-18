-- Updated Supabase Setup for Levryn Ecommerce
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist (optional - only if starting fresh)
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;

-- Create products table with updated schema
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  size TEXT NOT NULL,
  image TEXT NOT NULL,
  best_selling BOOLEAN DEFAULT FALSE,
  description TEXT,
  rendition TEXT,
  notes TEXT,
  pricing JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert all 11 products with updated data
INSERT INTO products (name, price, size, image, best_selling, description, rendition, notes, pricing) VALUES
('Outlands', 3500, '50ml', '/images/outlands.png', true, 'A captivating fragrance that takes you on a journey through untamed landscapes.', 'Rendition of Amouage Outlands', 'Top: Bergamot, Pink Pepper, Cardamom | Middle: Lavender, Geranium, Nutmeg | Base: Vanilla, Amber, Sandalwood, Patchouli', '{"30ml": {"price": 2500, "inStock": false}, "50ml": {"price": 3500, "inStock": true}, "100ml": {"price": 5500, "inStock": false}}'::jsonb),
('Coco', 2250, '50ml', '/images/coco.png', true, 'An elegant and sophisticated scent with timeless appeal.', 'Rendition of Chanel Coco Mademoiselle', 'Top: Orange, Mandarin, Bergamot | Middle: Rose, Jasmine, Mimosa | Base: Patchouli, Vanilla, Tonka Bean, White Musk', '{"30ml": {"price": 1500, "inStock": false}, "50ml": {"price": 2250, "inStock": true}, "100ml": {"price": 4000, "inStock": false}}'::jsonb),
('Medusa', 2250, '50ml', '/images/medusa.png', false, 'A mysterious and alluring fragrance that captivates the senses.', 'Rendition of Victoria Secret Bombshell', 'Top: Purple Passion Fruit, Tangelo, Grapefruit | Middle: Red Berries, Shangri-La Peony, Passion Flower | Base: Vanilla Orchid, Woody Notes', '{"30ml": {"price": 1500, "inStock": false}, "50ml": {"price": 2250, "inStock": true}, "100ml": {"price": 3750, "inStock": false}}'::jsonb),
('Althair', 1500, '30ml', '/images/althair.png', true, 'A warm and inviting scent with rich, luxurious notes.', 'Rendition of PDM Althair', 'Top: Cinnamon, Nutmeg, Cardamom | Middle: Vanilla, Tonka Bean, Almond | Base: Amber, Musk, Sandalwood', '{"30ml": {"price": 1500, "inStock": true}, "50ml": {"price": 2500, "inStock": false}, "100ml": {"price": 3500, "inStock": false}}'::jsonb),
('Office', 2500, '50ml', '/images/office.png', true, 'Professional and refined, perfect for the modern workplace.', 'Original Creation', 'Top: Citrus, Green Apple, Bergamot | Middle: Lavender, Geranium, Violet | Base: Cedarwood, Amber, White Musk', '{"30ml": {"price": 1800, "inStock": false}, "50ml": {"price": 2500, "inStock": true}, "100ml": {"price": 4000, "inStock": false}}'::jsonb),
('Issey', 1700, '50ml', '/images/issey.png', false, 'Fresh and vibrant, inspired by the essence of nature.', 'Rendition of L''Eau d''Issey Miyake', 'Top: Yuzu, Mandarin, Bergamot, Calone | Middle: Lily of the Valley, Rose, Freesia, Watery Notes | Base: Amber, Musk, Cedarwood', '{"30ml": {"price": 1200, "inStock": false}, "50ml": {"price": 1700, "inStock": true}, "100ml": {"price": 2800, "inStock": false}}'::jsonb),
('Cadenza', 3000, '50ml', '/images/cadenza.png', false, 'A harmonious blend of notes that creates a perfect symphony.', 'Rendition of Maison Crivelli Oud Cadenza', 'Top: Saffron, Pink Pepper, Bergamot | Middle: Oud, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla', '{"30ml": {"price": 2200, "inStock": false}, "50ml": {"price": 3000, "inStock": true}, "100ml": {"price": 5000, "inStock": false}}'::jsonb),
('Intensely', 1500, '30ml', '/images/Intensely.png', false, 'A bold and intense fragrance for those who dare to stand out.', 'Rendition of Emporio Armani Stronger With You Intensely', 'Top: Cardamom, Pink Pepper, Cinnamon | Middle: Vanilla, Chestnut, Rum | Base: Tonka Bean, Amber, Guaiac Wood', '{"30ml": {"price": 1500, "inStock": true}, "50ml": {"price": 2200, "inStock": false}, "100ml": {"price": 3500, "inStock": false}}'::jsonb),
('Marshmallow', 2250, '50ml', '/images/marshmallow.png', false, 'Sweet and comforting, like a warm embrace.', 'Rendition of Kayali Yum Boujee Marshmallow', 'Top: Marshmallow, Vanilla, Sugar | Middle: Jasmine, Orange Blossom, Heliotrope | Base: Musk, Amber, Sandalwood', '{"30ml": {"price": 1500, "inStock": false}, "50ml": {"price": 2250, "inStock": true}, "100ml": {"price": 3500, "inStock": false}}'::jsonb),
('11z01', 3500, '50ml', '/images/11z01.png', false, 'A unique and exclusive fragrance with a distinctive character.', 'Rendition of Aventus Creed 2010 Batch', 'Top: Pineapple, Blackcurrant, Apple, Bergamot | Middle: Rose, Birch, Patchouli, Jasmine | Base: Musk, Oakmoss, Ambergris, Vanilla', '{"30ml": {"price": 2500, "inStock": false}, "50ml": {"price": 3500, "inStock": true}, "100ml": {"price": 5500, "inStock": false}}'::jsonb),
('TK4', 3000, '50ml', '/images/tk4.png', false, 'A sophisticated and refined fragrance with exceptional depth.', 'Rendition of Thomas Kosmala No 4', 'Top: Bergamot, Pink Pepper, Cardamom | Middle: Iris, Rose, Jasmine | Base: Patchouli, Amber, Sandalwood, Vanilla', '{"30ml": {"price": 2200, "inStock": false}, "50ml": {"price": 3000, "inStock": true}, "100ml": {"price": 5000, "inStock": false}}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_postal_code TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  voucher_code TEXT,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  subtotal NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_size TEXT NOT NULL,
  product_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read access to products)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policies for orders
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (true);

-- Create function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'LEV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('orders_id_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

