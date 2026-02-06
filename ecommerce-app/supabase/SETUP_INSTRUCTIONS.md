# Database Setup Instructions

## Issues Fixed

1. ✅ **All product buttons getting clicked** - Fixed in the frontend code
2. ✅ **Empty cart** - Requires running SQL scripts in Supabase

## Step-by-Step Setup

Follow these steps **in order** to set up your database correctly:

### Step 1: Create Tables (if they don't exist)

Go to **Supabase Dashboard** → **SQL Editor** and run:

```sql
-- File: complete-schema.sql
```

This creates the following tables if they don't exist:
- `cart_items` - stores user cart items
- `orders` - stores order information
- `order_items` - stores items within each order

### Step 2: Set Up RLS Policies for Products

Run this to allow buyers to see all products from all sellers:

```sql
-- File: rls-buyer-products.sql
```

This enables:
- ✅ Buyers can view ALL products (from all sellers)
- ✅ Sellers can add, edit, and delete their own products

### Step 3: Set Up RLS Policies for Cart

Run this to allow users to manage their cart:

```sql
-- File: rls-cart-items.sql
```

This enables:
- ✅ Users can add items to their cart
- ✅ Users can view their cart items
- ✅ Users can update cart item quantities
- ✅ Users can remove items from their cart

### Step 4: Set Up RLS Policies for Orders

Run this to allow buyers and sellers to manage orders:

```sql
-- File: rls-orders.sql
```

This enables:
- ✅ Buyers can create orders
- ✅ Buyers can view their own orders
- ✅ Sellers can view orders for their products
- ✅ Sellers can update order status

---

## Testing the Fixes

After running all the SQL scripts:

### Test 1: Add to Cart
1. Go to the buyer dashboard
2. Click "Add to Cart" on a product
3. **Expected**: Only that button should show "Adding..." and become disabled
4. **Expected**: You should see a success toast message
5. **Expected**: Other product buttons should remain clickable

### Test 2: View Cart
1. Click the cart icon in the navigation
2. **Expected**: You should see the product(s) you added
3. **Expected**: Each item should show image, title, price, and quantity
4. **Expected**: You can increase/decrease quantities
5. **Expected**: You can remove items

### Test 3: Checkout
1. From the cart, click "Proceed to Checkout"
2. Fill in shipping information
3. **Expected**: Order should be created successfully
4. **Expected**: Cart should be cleared
5. **Expected**: You can view the order in "Order History"

---

## Troubleshooting

### Cart is still empty after adding products

1. Open browser console (F12)
2. Look for any error messages when clicking "Add to Cart"
3. Common issues:
   - **"new row violates row-level security policy"** - RLS policies not applied correctly
   - **"relation does not exist"** - Tables not created yet
   - **"insert or update on table violates foreign key constraint"** - Product or user doesn't exist

### Products not showing

1. Check that `rls-buyer-products.sql` was run successfully
2. Verify that RLS is enabled: 
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'sellerproduct';
   ```
3. Should show `rowsecurity = true`

### Policy already exists errors

If you see "policy already exists" errors:

```sql
-- Drop existing policies first
DROP POLICY IF EXISTS "policy_name" ON table_name;
-- Then run the CREATE POLICY again
```

---

## Quick Setup (All-in-One)

If you want to run everything at once, copy and paste ALL the content from these files in order:

1. `complete-schema.sql`
2. `rls-buyer-products.sql`
3. `rls-cart-items.sql`
4. `rls-orders.sql`

Paste them into the SQL Editor and click **Run**.

---

## Database Structure

```
sellerproduct (products table)
├── id (UUID)
├── user_id (UUID) - seller who created the product
├── title, description, price, stock, category, image_url
└── RLS: Any authenticated user can SELECT, only owner can INSERT/UPDATE/DELETE

cart_items
├── id (UUID)
├── user_id (UUID) - buyer who added to cart
├── product_id (UUID) - references sellerproduct
├── quantity (INTEGER)
└── RLS: Users can only manage their own cart items

orders
├── id (UUID)
├── buyer_id (UUID)
├── seller_id (UUID)
├── total_amount, status, shipping info, payment_method
└── RLS: Buyers see their orders, sellers see orders for their products

order_items
├── id (UUID)
├── order_id (UUID) - references orders
├── product_id (UUID) - references sellerproduct
├── quantity, price
└── RLS: Can view if you're the buyer or seller of the order
```
