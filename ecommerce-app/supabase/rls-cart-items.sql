-- =============================================================================
-- RLS: Cart Items Policies
-- =============================================================================
-- Run this in Supabase Dashboard: SQL Editor
-- This allows authenticated users to manage their own cart items
-- =============================================================================

-- 1. Ensure RLS is enabled on cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist (optional, prevents errors)
DROP POLICY IF EXISTS "Users can view their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can insert their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON cart_items;

-- 3. Policy: Users can SELECT their own cart items
CREATE POLICY "Users can view their own cart items"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Policy: Users can INSERT their own cart items
CREATE POLICY "Users can insert their own cart items"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Users can UPDATE their own cart items (e.g., quantity changes)
CREATE POLICY "Users can update their own cart items"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Policy: Users can DELETE their own cart items
CREATE POLICY "Users can delete their own cart items"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =============================================================================
-- NOTE: After running this, test by:
-- 1. Adding a product to cart from the buyer dashboard
-- 2. Viewing your cart
-- 3. Updating quantity
-- 4. Removing an item
-- =============================================================================
