-- =============================================================================
-- E-commerce Database Schema for Supabase (aligned with app)
-- =============================================================================
-- The app uses: sellerproduct (user_id), cart_items, orders, order_items.
-- Run this in Supabase SQL Editor. If you have existing `products` or other
-- tables, backup first and migrate data as needed.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Products table: sellerproduct (app expects this name and user_id)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sellerproduct (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  email VARCHAR(255),
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  color VARCHAR(50),
  size VARCHAR(50),
  brand VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'out_of_stock')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. Cart items
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES sellerproduct(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- -----------------------------------------------------------------------------
-- 3. Orders
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_zip VARCHAR(20),
  shipping_country VARCHAR(100),
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. Order items
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES sellerproduct(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_sellerproduct_user_id ON sellerproduct(user_id);
CREATE INDEX IF NOT EXISTS idx_sellerproduct_category ON sellerproduct(category);
CREATE INDEX IF NOT EXISTS idx_sellerproduct_status ON sellerproduct(status);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- -----------------------------------------------------------------------------
-- 6. Row Level Security (RLS)
-- -----------------------------------------------------------------------------
ALTER TABLE sellerproduct ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- --- sellerproduct: buyers see all active; sellers see and manage their own ---
CREATE POLICY "Users can view all active products"
  ON sellerproduct FOR SELECT TO authenticated
  USING (status = 'active');

CREATE POLICY "Sellers can view their own products"
  ON sellerproduct FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Sellers can manage their own products"
  ON sellerproduct FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --- cart_items ---
CREATE POLICY "Users can manage their own cart"
  ON cart_items FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- --- orders ---
CREATE POLICY "Buyers can view their own orders"
  ON orders FOR SELECT TO authenticated
  USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers can view orders for their products"
  ON orders FOR SELECT TO authenticated
  USING (auth.uid() = seller_id);

CREATE POLICY "Buyers can create their own orders"
  ON orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update their orders"
  ON orders FOR UPDATE TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- --- order_items ---
CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

CREATE POLICY "Buyers can create order items for their orders"
  ON order_items FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.buyer_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- 7. Triggers: update updated_at
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_sellerproduct_updated_at ON sellerproduct;
CREATE TRIGGER update_sellerproduct_updated_at
  BEFORE UPDATE ON sellerproduct
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
