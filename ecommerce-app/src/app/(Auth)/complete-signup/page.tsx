"use client";

import { useSignUp } from "@/hooks/Authhooks/useAuth.hook";
import { useSignupStore } from "@/store/signupStore";
import { SignUpCredentials } from "@/types/auth";

export default function CompleteSignupExample() {
  const { step1, step2 } = useSignupStore();
  const { mutate: signup, isPending, error } = useSignUp();

  const handleSubmitSignup = async () => {
    try {
      // Combine data from both steps
      const signupData: SignUpCredentials = {
        email: step1.email,
        password: step1.password,
        name: step1.name,
        role: step1.role as "seller" | "buyer",
        bio: step2.bio,
        storeName: step2.storeName,
        profileImage: step2.profileImage,
      };

      console.log("Submitting signup with complete data:", signupData);
      // Call the signup mutation
      signup(signupData);
    } catch (err) {
      console.error("Error preparing signup:", err);
    }
  };

  return (
    <div>
      <h2>Complete Your Registration</h2>

      {/* Submit button */}
      <button
        onClick={handleSubmitSignup}
        disabled={isPending}
        className="submit-btn"
      >
        {isPending ? "Creating Account..." : "Complete Signup"}
      </button>

      {/* Error handling */}
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}
