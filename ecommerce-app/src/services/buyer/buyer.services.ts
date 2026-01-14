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
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)
    `
    )
    .eq("user_id", userId);

  if (error) throw error;
  return data;
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
