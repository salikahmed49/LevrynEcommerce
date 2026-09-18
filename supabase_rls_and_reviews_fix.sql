-- ============================================
-- SECURITY AND REVIEWS FIX MIGRATION
-- ============================================

-- 1. RECREATE REVIEWS TABLE
CREATE TABLE IF NOT EXISTS product_reviews (
  id BIGSERIAL PRIMARY KEY,
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

-- 2. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- 3. PRODUCTS POLICIES
-- Anyone can view products
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Products are viewable by everyone'
  ) THEN
    CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
  END IF;
END $$;

-- Only authenticated users (admins) can modify products
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Products are modifiable by authenticated users'
  ) THEN
    CREATE POLICY "Products are modifiable by authenticated users" ON products FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- 4. ORDERS AND ORDER ITEMS POLICIES
-- Anyone can insert an order (checkout as guest)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Anyone can insert orders'
  ) THEN
    CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Only authenticated users can view/modify all orders, but a user could view if we had auth, using true implies ANYONE CAN VIEW ORDERS which is a security risk. So we drop the "true" select policy if it exists and make it stricter, or leave it if guest checkout is standard. For this fix, let's keep it safe.
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Orders viewable by authenticated users" ON orders FOR SELECT USING (auth.role() = 'authenticated');

-- Order items
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Anyone can insert order items'
  ) THEN
    CREATE POLICY "Anyone can insert order items" ON order_items FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
CREATE POLICY "Order items viewable by authenticated users" ON order_items FOR SELECT USING (auth.role() = 'authenticated');

-- 5. REVIEWS POLICIES
-- Anyone can view approved reviews
CREATE POLICY "Approved reviews are viewable by everyone" ON product_reviews
  FOR SELECT USING (approved = true OR auth.role() = 'authenticated');

-- Anonymous users can only insert unapproved reviews
CREATE POLICY "Anyone can insert an unapproved review" ON product_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR approved = false);

-- Only authenticated users can update/delete reviews
CREATE POLICY "Reviews are modifiable by authenticated users" ON product_reviews
  FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Reviews are deletable by authenticated users" ON product_reviews
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- 6. AUTOMATED INVENTORY CONTROL RPC
-- ============================================

-- Function to get the total items ordered by name
-- SECURITY DEFINER allows it to read order_items regardless of RLS, letting anonymous checkout shoppers verify public inventory caps securely without exposing personal order data.
CREATE OR REPLACE FUNCTION get_total_ordered(p_name TEXT)
RETURNS INTEGER 
SECURITY DEFINER
AS $$
DECLARE
  total_qty INTEGER;
BEGIN
  SELECT COALESCE(SUM(quantity), 0) INTO total_qty
  FROM order_items
  WHERE product_name ILIKE p_name;
  
  RETURN total_qty;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- NEXT STEPS: RUN THIS SCRIPT IN SUPABASE
-- SUPABASE DASHBOARD -> SQL EDITOR -> NEW QUERY
-- ============================================
