-- ============================================================
-- LEVRYN — SECURE RLS POLICIES FIX
-- Run this in the Supabase SQL Editor AFTER supabase-setup-updated.sql
-- ============================================================
-- PROBLEM: The original setup allowed ANY anonymous user to SELECT
--          all rows from orders and order_items (USING (true)),
--          exposing all customer PII.
-- FIX:     Only authenticated sessions (i.e., the admin) can read
--          orders. Anonymous users can still INSERT (checkout flow).
-- ============================================================

-- ── Drop the insecure open-read policies ────────────────────
DROP POLICY IF EXISTS "Users can view their own orders"      ON orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;

-- Also drop the overly-permissive Analytics read policy if it exists
DROP POLICY IF EXISTS "Analytics events are viewable by authenticated users" ON analytics_events;

-- ── Orders: anonymous INSERT allowed (checkout), SELECT only for authenticated ──
CREATE POLICY "Anonymous users can insert orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated admin can view all orders"
  ON orders
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin can update orders"
  ON orders
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin can delete orders"
  ON orders
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── order_items: anonymous INSERT, authenticated SELECT/DELETE ──
CREATE POLICY "Anonymous users can insert order items"
  ON order_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated admin can view all order items"
  ON order_items
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admin can delete order items"
  ON order_items
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── Analytics: insert by anyone, view only by admin ─────────
CREATE POLICY "Analytics are insertable by everyone"
  ON analytics_events
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Analytics are viewable by authenticated users"
  ON analytics_events
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- ── Products: public read (needed for storefront), auth write ──
-- These should already exist from previous setup; run IF NOT EXISTS variants.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'products' AND policyname = 'Products are viewable by everyone'
  ) THEN
    CREATE POLICY "Products are viewable by everyone"
      ON products FOR SELECT USING (true);
  END IF;
END $$;

-- ============================================================
-- After running this script:
--   ✓ Anonymous users can place orders (INSERT)
--   ✓ NOBODY except your logged-in admin can SELECT order data
--   ✓ Customer PII (name, email, phone, address) is protected
-- ============================================================
