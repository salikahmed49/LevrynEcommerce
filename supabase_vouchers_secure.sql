-- ============================================================
-- LEVRYN — SECURE VOUCHER SYSTEM
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── 1. Vouchers table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS vouchers (
  code         TEXT PRIMARY KEY,                         -- e.g. 'LEVRYN20'
  discount_pct NUMERIC(5, 2) NOT NULL                    -- percentage (max 30)
                 CHECK (discount_pct > 0 AND discount_pct <= 30),
  active       BOOLEAN DEFAULT true,
  max_uses     INTEGER DEFAULT NULL,                     -- NULL = unlimited
  used_count   INTEGER DEFAULT 0,
  expires_at   TIMESTAMP WITH TIME ZONE DEFAULT NULL,    -- NULL = never expires
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 2. Enable RLS (nobody can read the list from the client) ─
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;

-- No SELECT / INSERT / UPDATE / DELETE policies for anonymous users.
-- The validate_voucher() function below uses SECURITY DEFINER to
-- bypass RLS safely — clients only ever get back a discount number,
-- never the raw table contents.

-- ── 3. Validation function ──────────────────────────────────
-- Returns the discount_pct for a valid, active, non-expired code.
-- Returns NULL if the code is invalid, inactive, expired, or
-- has exceeded its max_uses limit.
-- SECURITY DEFINER means it runs with the role that created it
-- (service role), bypassing the client's RLS restrictions.
CREATE OR REPLACE FUNCTION validate_voucher(p_code TEXT)
RETURNS NUMERIC
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT discount_pct
  FROM   vouchers
  WHERE  code        = UPPER(TRIM(p_code))
    AND  active      = true
    AND  (expires_at IS NULL OR expires_at > NOW())
    AND  (max_uses   IS NULL OR used_count < max_uses);
$$;

-- ── 4. Usage-increment function (call after order is placed) ─
-- This is optional but lets you enforce max_uses per code.
-- Call it from your backend / Supabase Edge Function after
-- a successful order insert.
CREATE OR REPLACE FUNCTION increment_voucher_usage(p_code TEXT)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE vouchers
  SET    used_count = used_count + 1
  WHERE  code = UPPER(TRIM(p_code));
$$;

-- ── 5. Insert voucher codes ─────────────────────────────────
-- These codes live only in the database — NEVER in the frontend
-- bundle. Adjust, rename, or expire them at any time without
-- redeploying the app.

INSERT INTO vouchers (code, discount_pct, active, max_uses, expires_at) VALUES
  -- General codes
  ('LEVRYN10',   10, true, NULL,  NULL),   -- 10% off, unlimited, never expires
  ('LEVRYN15',   15, true, NULL,  NULL),   -- 15% off, unlimited, never expires
  ('LEVRYN20',   20, true, NULL,  NULL),   -- 20% off, unlimited, never expires
  ('LEVRYN25',   25, true, NULL,  NULL),   -- 25% off, unlimited, never expires

  -- Welcome / first-order codes
  ('WELCOME15',  15, true, NULL,  NULL),   -- 15% off welcome code
  ('WELCOME30',  30, true, NULL,  NULL),   -- 30% off (max cap), welcome

  -- Seasonal / campaign codes
  ('LUXE20',     20, true, NULL,  NULL),   -- Luxury tier promo
  ('SUMMER15',   15, true, NULL,  NULL),   -- Summer campaign
  ('NEWSEASON25',25, true, NULL,  NULL),   -- New season launch

  -- Limited-use flash codes
  ('FLASH30',    30, true, 50,    NULL),   -- 30% off — first 50 uses only
  ('FIRSTORDER', 20, true, 200,   NULL),   -- 20% off — first 200 uses

  -- VIP / influencer code (never expiry, unlimited)
  ('VIP30',      30, true, NULL,  NULL)
ON CONFLICT (code) DO NOTHING;

-- ── 6. Grant execute to anon/authenticated roles ────────────
-- So the Supabase JS client can call the RPC functions.
GRANT EXECUTE ON FUNCTION validate_voucher(TEXT)          TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_voucher_usage(TEXT)   TO anon, authenticated;

-- ── Notes ───────────────────────────────────────────────────
-- • To deactivate a code:  UPDATE vouchers SET active = false WHERE code = 'FLASH30';
-- • To expire a code:      UPDATE vouchers SET expires_at = NOW() WHERE code = 'SUMMER15';
-- • To add a new code:     INSERT INTO vouchers (code, discount_pct) VALUES ('AUTUMN20', 20);
-- • Codes are case-insensitive on insert and lookup (UPPER() applied in function).
