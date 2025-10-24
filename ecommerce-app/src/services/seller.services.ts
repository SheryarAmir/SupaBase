import { supabase } from "@/constant/supabase-client";
import { IncommingProductData, CreateProductPayload } from "@/types/product";

export const fetchAllProducts = async (): Promise<IncommingProductData[]> => {
  const { data, error } = await supabase.from("sellerproduct").select("*");
  if (error) throw error;
  return data || [];
};

export const addProduct = async ({
  title,
  description,
  email,
  category,
  price,
  stock,
  image_url,
}: CreateProductPayload) => {
  //  Get current logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("this is user id ", user?.id);

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  //  Insert product with user.id as foreign key
  const { data, error } = await supabase
    .from("sellerproduct")
    .insert([
      {
        profile_id: user.id, // now defined properly
        title,
        description,
        email,
        category,
        price,
        stock,
        image_url,
      },
    ])
    .select();

  if (error) throw error;
  console.log("✅ Product saved in Supabase:", data);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("sellerproduct")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
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
