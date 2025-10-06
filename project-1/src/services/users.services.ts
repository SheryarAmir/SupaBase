import { supabase } from "@/constant/supabase-client";
import { User, FormData } from "@/types/users";

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data || [];
};

export const addUser = async (newUser: FormData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const updateUser = async (id: string, updates: Partial<FormData>) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
