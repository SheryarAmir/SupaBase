import { supabase } from "@/constant/supabase-client";
import { SignUpCredentials, SignInCredentials } from "@/types/auth";
import { UserProfile } from "@/types/profile";

// Sign in with Google OAuth
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        // Pass access_type to ensure we get a refresh token
        access_type: "offline",
        // Request user's email and profile info
        prompt: "consent",
        scope: "email profile",
      },
    },
  });

  if (error) throw error;
  return data;
};

// Get user profile with role
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

// Sign up with email and password
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

// Sign in with email and password

export const signIn = async ({ email, password }: SignInCredentials) => {
  // First sign in the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get the user's role from profiles
  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      user: data.user,
      role: profile.role,
    };
  }

  throw new Error("Failed to get user profile");
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get the user profile information hook is in the useUserRole hook

// export const getUserProfile = async (): Promise<UserProfile> => {
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();
//   if (userError) throw userError;
//   if (!user) throw new Error("Not authenticated");

//   const { data, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", user.id)
//     .single();

//   if (error) throw error;
//   return data as UserProfile;
// };
