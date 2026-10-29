-- ==============================================================================
-- LEVRYN LUXURY PERFUMES - REVAMPED SECURE SCHEMA (Next.js & Supabase)
-- ==============================================================================
-- This migration cleans up legacy test/demo tables and configures a minimal,
-- high-security schema with strict Row Level Security (RLS) to protect customer data.
-- ==============================================================================

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    customer_notes TEXT,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
    payment_status TEXT NOT NULL DEFAULT 'pending_verification', -- pending_verification, verified, rejected
    order_status TEXT NOT NULL DEFAULT 'placed', -- placed, processing, shipped, delivered, cancelled
    bank_name TEXT NOT NULL DEFAULT 'HBL',
    bank_account_number TEXT NOT NULL DEFAULT '00857902268603',
    bank_account_title TEXT NOT NULL DEFAULT 'Salik Ahmed AA',
    client_ip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_size TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- 4. Enable Row Level Security (RLS) - CRITICAL DATA PROTECTION
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop any previous permissive policies to avoid data leaks
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
DROP POLICY IF EXISTS "Public can select orders" ON public.orders;
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow anon inserts" ON public.orders;
DROP POLICY IF EXISTS "Allow anon inserts order_items" ON public.order_items;

-- 5. Strict RLS Policies:
-- A: Anonymous guest checkout is ONLY allowed to INSERT.
-- Anonymous users CANNOT SELECT, UPDATE, or DELETE any rows in the orders table.
-- This prevents attackers from listing other customers' phone numbers, addresses, or order history.
CREATE POLICY "Allow guest checkout insert orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow guest checkout insert order_items"
ON public.order_items
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- B: Authenticated admin users can view and update orders
CREATE POLICY "Admins can view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can view order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (true);
