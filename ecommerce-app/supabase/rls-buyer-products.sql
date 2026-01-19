-- =============================================================================
-- RLS: Allow buyers to see all products from all sellers (sellerproduct)
-- =============================================================================
-- Run this in Supabase Dashboard: SQL Editor
-- This enables buyers to list products from different sellers when on the
-- buyer dashboard. If RLS was previously disabled, also run the optional
-- seller policies at the end so sellers can still add/edit/delete their products.
-- =============================================================================

-- 1. Ensure RLS is enabled on sellerproduct (no-op if already enabled)
ALTER TABLE sellerproduct ENABLE ROW LEVEL SECURITY;

-- 2. Policy: Any authenticated user (including buyers) can SELECT all products
--    Products are from different sellers (user_id). Buyers need to browse all.
CREATE POLICY "Buyers can view all products"
  ON sellerproduct
  FOR SELECT
  TO authenticated
  USING (true);

-- 3. (Optional) If you don't yet have policies for sellers to manage their own:
--    Sellers can INSERT their own products
CREATE POLICY "Sellers can insert own products"
  ON sellerproduct
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

--    Sellers can UPDATE their own products
CREATE POLICY "Sellers can update own products"
  ON sellerproduct
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

--    Sellers can DELETE their own products
CREATE POLICY "Sellers can delete own products"
  ON sellerproduct
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =============================================================================
-- NOTE: If "policy already exists" errors appear, you can drop and recreate, e.g.:
--   DROP POLICY IF EXISTS "Buyers can view all products" ON sellerproduct;
--   -- then run the CREATE POLICY again
-- =============================================================================
