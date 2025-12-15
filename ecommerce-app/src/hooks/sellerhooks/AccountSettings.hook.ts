"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteAccount, updatePassword } from "@/services/seller/account.service";
import type { AccountFormData } from "@/types/dashboard";

type PasswordPayload = Pick<AccountFormData, "currentPassword" | "newPassword">;

export const useAccountSettings = () => {
  const router = useRouter();

  const updatePasswordMutation = useMutation({
    mutationKey: ["account", "password"],
    mutationFn: (payload: PasswordPayload) => updatePassword(payload),
    onSuccess: async () => {
      toast.success("Password updated successfully!", {
        description: "Your account password has been changed.",
      });
      // Force user to sign in again after password change
      router.push("/signin");
    },
    onError: (error: Error) => {
      toast.error("Password update failed", {
        description: error.message ?? "Please try again.",
      });
    },
  });


  
  const deleteAccountMutation = useMutation({
    mutationKey: ["account", "delete"],
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      toast.error("Account deletion initiated", {
        description: "Your account will be deleted within 24 hours.",
      });
    },
    onError: (error: Error) => {
      toast.error("Account deletion failed", {
        description: error.message ?? "Please try again.",
      });
    },
  });

  return {
    updatePassword: updatePasswordMutation.mutateAsync,
    isUpdatingPassword: updatePasswordMutation.isPending,
    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeletingAccount: deleteAccountMutation.isPending,
  };
};