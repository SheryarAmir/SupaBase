import { supabase } from "@/constant/supabase-client";
import { Product } from "@/types/product";

// Get all products (from sellerproduct table)
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("sellerproduct")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
};

// Get a single product
export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("sellerproduct")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Product;
};

// Search products by title or description
export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("sellerproduct")
    .select("*")
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Product[];
};

// Filter products by category, price range
export const filterProducts = async (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  let query = supabase.from("sellerproduct").select("*");

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) throw error;
  return data as Product[];
};

// Get cart items for a user
export const getCart = async (userId: string) => {
  // First get cart items
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId);

  if (cartError) throw cartError;
  if (!cartItems || cartItems.length === 0) return [];

  // Then get product details for each cart item
  const productIds = cartItems.map((item) => item.product_id);
  const { data: products, error: productsError } = await supabase
    .from("sellerproduct")
    .select("id, title, description, price, stock, image_url, category")
    .in("id", productIds);

  if (productsError) throw productsError;

  // Combine cart items with product data
  const cartWithProducts = cartItems.map((item) => ({
    ...item,
    sellerproduct: products?.find((p) => p.id === item.product_id) || null,
  }));

  return cartWithProducts;
};

// Get cart count for a user
export const getCartCount = async (userId: string) => {
  const { data: items, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", userId);

  if (error) throw error;
  return items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
};

// Add item to cart
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1
) => {
  // First check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // Update quantity if item exists
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);

    if (error) throw error;
  } else {
    // Insert new item if it doesn't exist
    const { error } = await supabase.from("cart_items").insert([
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
    ]);

    if (error) throw error;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
) => {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId);

  if (error) throw error;
};

// Remove item from cart
export const removeFromCart = async (itemId: string) => {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) throw error;
};

// Create order from cart
export const createOrder = async (orderData: {
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  payment_method: string;
}) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const buyerId = user.id;

  // Get cart items
  const cartItems = await getCart(buyerId);

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Group items by seller
  const itemsBySeller = new Map<string, any[]>();
  
  for (const item of cartItems) {
    // Get product to find seller_id (user_id in sellerproduct table)
    const { data: product } = await supabase
      .from("sellerproduct")
      .select("user_id, price")
      .eq("id", item.product_id)
      .single();

    if (!product) continue;

    const sellerId = product.user_id;
    if (!itemsBySeller.has(sellerId)) {
      itemsBySeller.set(sellerId, []);
    }
    itemsBySeller.get(sellerId)!.push({
      ...item,
      price: product.price,
    });
  }

  // Create orders for each seller
  const orders = [];
  for (const [sellerId, items] of itemsBySeller.entries()) {
    const totalAmount = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          buyer_id: buyerId,
          seller_id: sellerId,
          total_amount: totalAmount,
          ...orderData,
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    orders.push(order);
  }

  // Clear cart after successful order
  const { error: clearError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", buyerId);

  if (clearError) {
    console.warn("Failed to clear cart:", clearError);
  }

  return orders;
};

// Get user orders
export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        sellerproduct:product_id (
          id,
          title,
          image_url,
          price
        )
      )
    `
    )
    .eq("buyer_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
