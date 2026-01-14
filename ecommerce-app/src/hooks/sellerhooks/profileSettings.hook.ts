import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile, switchRole } from "@/services/seller/profileSettings.service";

export const useProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return { data, isLoading, error };
};

interface UpdateProfileArgs {
  name: string;
  storeDescription: string;
  profileImage?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileArgs) => updateProfile(payload),
    onSuccess: (data) => {
      // Update cache so UI reflects latest profile without extra refetch delay
      queryClient.setQueryData(["profile"], data);
    },
  });
};

export const useSwitchRole = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (newRole: "seller" | "buyer") => switchRole(newRole),
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(["profile"], data);
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
      // Redirect based on new role
      if (data.role === "buyer") {
        router.push("/dashboards/buyer");
      } else {
        router.push("/dashboards/seller");
      }
    },
  });
};
