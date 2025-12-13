import { supabase } from "@/constant/supabase-client";

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// Update the signed-in user's password
export const updatePassword = async ({
  currentPassword,
  newPassword,
}: UpdatePasswordPayload) => {
  console.log("updatePassword called", { currentPassword, newPassword });
  // Verify current password by reauthenticating before updating
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("current user response", { user, userError });

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  // Re-authenticate with current password to ensure it matches
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword(
    {
      email: user.email ?? "",
      password: currentPassword,
    }
  );

  console.log("reauth result", { signInData, signInError });

  if (signInError) throw signInError;

  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  console.log("updateUser result", { data, error });

  if (error) throw error;

  return data;
};

// Delete the signed-in user's profile row and sign them out
export const deleteAccount = async () => {
  console.log("deleteAccount called");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("current user response", { user, userError });

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  // Remove profile data; adjust table/key as needed
  const { error } = await supabase.from("profiles").delete().eq("id", user.id);

  console.log("delete profile result", { error });

  if (error) throw error;

  await supabase.auth.signOut();

  console.log("sign out completed");

  return { success: true };
};
