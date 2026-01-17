import { supabase } from "@/constant/supabase-client";
import { IncommingProductData, CreateProductPayload } from "@/types/product";

export const fetchAllProducts = async (): Promise<IncommingProductData[]> => {
  // Get current logged-in user to filter products by seller
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  // Only fetch products for the current seller
  const { data, error } = await supabase
    .from("sellerproduct")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addProduct = async (Newproduct: CreateProductPayload) => {
  //  Get current logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("this is user id ", user?.id);

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  // ✅ Add the user ID to the product payload
  const productWithUser = {
    ...Newproduct,
    user_id: user.id, // or seller_id / profile_id based on your FK
  };

  //  Insert product with foreign key attached
  const { data, error } = await supabase
    .from("sellerproduct")
    .insert([productWithUser])
    .select();

  if (error) throw error;
  console.log("✅ Product saved in Supabase:", data);
  return data;
};

export const deleteProduct = async (id: string) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("sellerproduct")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;

  if (!data || data.length === 0) {
    throw new Error("Product not found or unauthorized");
  }

  return data;
};
export const updateProduct = async (
  id: string,
  updates: Partial<IncommingProductData>
) => {
  const { data, error } = await supabase
    .from("sellerproduct")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
