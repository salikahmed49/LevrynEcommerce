-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  size TEXT NOT NULL,
  image TEXT NOT NULL,
  best_selling BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert products
INSERT INTO products (name, price, size, image, best_selling, description) VALUES
('Outlands', 3500, '50ml', '/images/outlands.jpg', true, 'A captivating fragrance that takes you on a journey through untamed landscapes.'),
('Coco', 2250, '50ml', '/images/coco.jpg', true, 'An elegant and sophisticated scent with timeless appeal.'),
('Medusa', 2250, '50ml', '/images/placeholder.jpg', false, 'A mysterious and alluring fragrance that captivates the senses.'),
('Althair', 1500, '30ml', '/images/althair.jpg', true, 'A warm and inviting scent with rich, luxurious notes.'),
('Office', 2500, '50ml', '/images/office.jpg', true, 'Professional and refined, perfect for the modern workplace.'),
('Issey', 1700, '50ml', '/images/issey.jpg', false, 'Fresh and vibrant, inspired by the essence of nature.'),
('Cadenza', 3000, '50ml', '/images/cadenza.jpg', false, 'A harmonious blend of notes that creates a perfect symphony.'),
('Intensely', 1500, '30ml', '/images/placeholder.jpg', false, 'A bold and intense fragrance for those who dare to stand out.'),
('Marshmallow', 2250, '50ml', '/images/placeholder.jpg', false, 'Sweet and comforting, like a warm embrace.'),
('11z01', 3500, '50ml', '/images/11z01.jpg', false, 'A unique and exclusive fragrance with a distinctive character.')
ON CONFLICT DO NOTHING;

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
  product_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read access to products)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policies for orders (users can only see their own orders)
-- Adjust these policies based on your authentication requirements
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (true);

