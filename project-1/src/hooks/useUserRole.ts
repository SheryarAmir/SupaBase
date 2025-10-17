import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "@/services/auth.services";
import { supabase } from "@/constant/supabase-client";
import { UserProfile } from "@/types/profile";

export const useUserRole = () => {
  const queryClient = useQueryClient(); //

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    });
    return () => listener.subscription.unsubscribe();
  }, [queryClient]);

  const role = profile?.role;

  return {
    profile,
    role,
    isLoading,
    error,
    isSuperAdmin: role === "Super-Admin",
    isAdmin: role === "Admin",
    isStudent: role === "Student",
  };
};
