import { supabase } from "@/constant/supabase-client";

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// Update the signed-in user's password
export const updatePassword = async ({
  newPassword,
}: UpdatePasswordPayload) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;

  return data;
};

// Delete the signed-in user's profile row and sign them out
export const deleteAccount = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  // Remove profile data; adjust table/key as needed
  const { error } = await supabase.from("profiles").delete().eq("id", user.id);
  if (error) throw error;

  await supabase.auth.signOut();
  return { success: true };
};
