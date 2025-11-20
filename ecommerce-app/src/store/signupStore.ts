import { create } from "zustand";

interface SignupState {
  step1: {
    name: string;
    email: string;
    password: string;
    role: "seller" | "buyer" | "";
  };
  step2: {
    bio: string;
    storeName: string;
    profileImage: string;
  };

  setStep1: (data: any) => void;
  setStep2: (data: any) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  step1: { name: "", email: "", password: "", role: "" },
  step2: { bio: "", storeName: "", profileImage: "" },

  setStep1: (data) => {
    console.log("Step 1 Data:", data);
    set({ step1: data });
  },

  setStep2: (data) => {
    console.log("Step 2 Data:", data);
    set({ step2: data });
  },

  reset: () =>
    set({
      step1: { name: "", email: "", password: "", role: "" },
      step2: {
        bio: "",
        storeName: "",
        profileImage: "",
      },
    }),
}));
