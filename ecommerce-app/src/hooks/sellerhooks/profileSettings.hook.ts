import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/services/seller/profileSettings.service";

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
