import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/seller/profileSettings.service";

export const useProfile = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  return { data, isLoading, error };
};