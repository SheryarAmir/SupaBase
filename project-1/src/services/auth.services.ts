import { supabase } from "@/constant/supabase-client";
import { SignUpCredentials, SignInCredentials } from "@/types/auth";

export const signUp = async ({
  email,
  password,
  name,
  role,
}: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  });

  if (error) throw error;

  // Create a profile entry with the role
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        name,
        role,
        email,
      },
    ]);

    if (profileError) throw profileError;
  }

  return data;
};

export const signIn = async ({ email, password, role }: SignInCredentials) => {
  // First sign in the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Verify the user's role
  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;

    // Check if the role matches
    if (profile?.role !== role) {
      throw new Error("Access denied. Invalid role for this account.");
    }
  }

  return data;
};

export const getUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
