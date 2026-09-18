-- ============================================================
-- LEVRYN — SUPABASE STORAGE SETUP FOR PRODUCT IMAGES
-- Run this in the Supabase SQL Editor
-- ============================================================
-- This creates a public "product-images" storage bucket so the
-- admin can upload images directly from the admin portal.
-- ============================================================

-- ── 1. Create the storage bucket ────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,                                         -- public: anyone can view images via URL
  5242880,                                      -- 5 MB max per file
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. Storage RLS policies ──────────────────────────────────

-- Allow authenticated admin to upload (INSERT)
CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Allow authenticated admin to update/replace
CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

-- Allow authenticated admin to delete
CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- Allow everyone to view public images (needed for the storefront)
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- ============================================================
-- After running this:
--   1. Go to Storage in your Supabase dashboard
--   2. You should see the "product-images" bucket
--   3. The admin portal will now upload images to this bucket
--      and save the public URL to the products table
-- ============================================================
