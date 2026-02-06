-- =============================================================================
-- RLS: Orders and Order Items Policies
-- =============================================================================
-- Run this in Supabase Dashboard: SQL Editor
-- This allows buyers and sellers to view and manage orders
-- =============================================================================

-- =============================================================================
-- ORDERS TABLE
-- =============================================================================

-- 1. Ensure RLS is enabled on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist (optional)
DROP POLICY IF EXISTS "Buyers can view their own orders" ON orders;
DROP POLICY IF EXISTS "Sellers can view orders for their products" ON orders;
DROP POLICY IF EXISTS "Buyers can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Sellers can update order status" ON orders;

-- 3. Policy: Buyers can SELECT their own orders
CREATE POLICY "Buyers can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id);

-- 4. Policy: Sellers can SELECT orders where they are the seller
CREATE POLICY "Sellers can view orders for their products"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = seller_id);

-- 5. Policy: Buyers can INSERT orders
CREATE POLICY "Buyers can insert their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- 6. Policy: Sellers can UPDATE their order status (e.g., processing, shipped)
CREATE POLICY "Sellers can update order status"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- =============================================================================
-- ORDER_ITEMS TABLE
-- =============================================================================

-- 7. Ensure RLS is enabled on order_items table
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 8. Drop existing policies if they exist (optional)
DROP POLICY IF EXISTS "Users can view order items for their orders" ON order_items;
DROP POLICY IF EXISTS "Users can insert order items" ON order_items;

-- 9. Policy: Users can SELECT order items if they are the buyer or seller
--    This requires a join with the orders table to check buyer_id or seller_id
CREATE POLICY "Users can view order items for their orders"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

-- 10. Policy: Users can INSERT order items if they are creating their own order
CREATE POLICY "Users can insert order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.buyer_id = auth.uid()
    )
  );

-- =============================================================================
-- NOTE: After running this, test the complete flow:
-- 1. Add products to cart
-- 2. Checkout (create order)
-- 3. View order history as buyer
-- 4. View orders as seller
-- =============================================================================
