import { supabase } from "@/constant/supabase-client";

const clearClientState = async () => {
  // Guard for non-browser environments
  if (typeof window === "undefined") return;

  // Clear all cookies by expiring them
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.warn("Failed to clear web storage", error);
  }

  if ("caches" in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    } catch (error) {
      console.warn("Failed to clear caches", error);
    }
  }
};

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

  // Sign out to invalidate existing sessions after password change
  await supabase.auth.signOut();

  // Clear client-side cookies, storage, and caches to prevent stale sessions
  await clearClientState();

  return data;
};

// Delete the signed-in user's profile row and auth user
export const deleteAccount = async () => {
  console.log("deleteAccount called");

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("current user response", { user, userError });

    if (userError) throw userError;
    if (!user) throw new Error("User not authenticated");

    const userId = user.id;

    // Remove profile data first
    const { error: deleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    console.log("delete profile result", { deleteError });

    if (deleteError) throw deleteError;

    // Call API route to delete auth user (requires admin API)
    const response = await fetch("/api/auth/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete account");
    }

    console.log("Auth user deleted successfully");

    // Sign out after deletion
    const { error: signOutError } = await supabase.auth.signOut();
    console.log("sign out completed", { signOutError });

    if (signOutError) throw signOutError;

    // Clear client-side state
    await clearClientState();

    return { success: true };
  } catch (error) {
    console.error("deleteAccount error:", error);
    throw error;
  }
};
