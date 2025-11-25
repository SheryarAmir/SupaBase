"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  signUp,
  signOut,
  signInWithGoogle,
  getUserProfile,
} from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { SignUpCredentials, SignInCredentials } from "@/types/auth";

// Hook for user sign-up with complete profile data
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: SignUpCredentials) => signUp(credentials),
    onSuccess: (data) => {
      console.log("Signup successful", data);
      router.push("/signin");
    },
    onError: (error: Error) => {
      console.error("Signup error:", error.message);
    },
  });
};

// Hook for Google sign-in with role
export const useGoogleSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["googleSignin"],
    mutationFn: signInWithGoogle,
    onError: (error) => {
      console.error("Google sign in error:", error);
    },
    onSuccess: (data) => {
      console.log("Google sign in successful:", data);
      router.push("/dashboards/seller");
    },
  });
};

//  Hook for user sign-in
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
        case "seller":
          router.push("/dashboards/seller");
          break;
        case "buyer":
          router.push("/dashboards/buyer");
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

//  Hook for user sign-out
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
