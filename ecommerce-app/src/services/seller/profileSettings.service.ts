import { supabase } from "@/constant/supabase-client";

export async function getProfile() {
  const { data, error } = await supabase.from("profiles").select("*").single();
  if (error) throw error;
  return data;
}

interface UpdateProfilePayload {
  name: string;
  storeDescription: string;
  profileImage?: string;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  // Ensure we are updating the currently signed-in user's profile
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: payload.name,
      storeDescription: payload.storeDescription,
      profileImage: payload.profileImage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
