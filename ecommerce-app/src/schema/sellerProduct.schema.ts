import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  image: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
