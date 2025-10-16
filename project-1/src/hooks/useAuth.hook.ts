import { useMutation } from "@tanstack/react-query";
import { signIn, signUp, signOut } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { SignUpCredentials, SignInCredentials } from "@/types/auth";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: SignUpCredentials) => signUp(credentials),
    onSuccess: () => {
      router.push("/signin");
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: (credentials: SignInCredentials) => signIn(credentials),
    onSuccess: (data, variables) => {
      // Navigate based on role
      switch (variables.role) {
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
          router.push("/");
      }
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
