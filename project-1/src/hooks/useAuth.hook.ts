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
    onSuccess: () => {
      //   router.push("/");

      alert("you are success fully signin");
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signout"],
    mutationFn: signOut,
    onSuccess: () => {
      router.push("/signin");
    },
  });
};
