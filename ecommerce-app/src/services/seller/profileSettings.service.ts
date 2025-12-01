import { supabase } from "@/constant/supabase-client";

export async function getProfile() {
  const { data, error } = await supabase.from("profiles").select("*").single();
  if (error) throw error;
  console.log("this is data", data);
  return data;
  
}
