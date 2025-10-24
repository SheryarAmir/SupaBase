import { supabase } from "@/constant/supabase-client";
import { IncommingProductData, CreateProductPayload } from "@/types/product";

export const fetchAllProducts = async (): Promise<IncommingProductData[]> => {
  const { data, error } = await supabase.from("sellerProduct").select("*");
  if (error) throw error;
  return data || [];
};

export const addProduct = async (newProduct: CreateProductPayload) => {
  const { data, error } = await supabase
    .from("sellerProduct")
    .insert([newProduct])
    .select();

  console.log("the data", data);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("sellerProduct")
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
    .from("sellerProduct")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
