import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  signUp,
  signOut,
  getUserProfile,
} from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { SignUpCredentials, SignInCredentials } from "@/types/auth";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: SignUpCredentials) => signUp(credentials),
    onSuccess: (data) => {
      console.log("Signup successful, redirecting to signin", data);
      router.push("/signin");
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: (credentials: SignInCredentials) => signIn(credentials),
    onSuccess: async (data) => {
      console.log("Sign in successful:", data.role);

      // Prefetch the user profile
      await queryClient.prefetchQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
      });

      // Navigate based on role from the profile
      switch (data.role) {
        case "Super-Admin":
          router.push("/dashboards/super-admin");
          break;
        case "Admin":
          router.push("/dashboards/admin");
          break;
        case "Student":
          router.push("/dashboards/student");
          break;
        default:
          router.push("/main");
      }
    },
    onError: (error: Error) => {
      console.error("Sign in error:", error);
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signout"],
    mutationFn: signOut,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
