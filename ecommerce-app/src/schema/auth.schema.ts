import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["seller", "buyer"]),
  profileImage: z.any().refine((files) => files?.length > 0, {
    message: "Please upload an image",
  }),
  contactNumber:z.string().min(5, "enter you phone number"),
  storeDescription:z.string().min(5, "enter a short description about the the product that you want to buy or sell")
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
