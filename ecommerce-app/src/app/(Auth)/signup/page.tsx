"use client";
 import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/hooks/Authhooks/useAuth.hook";
import Link from "next/link";
import { SignUpFormData, signUpSchema } from "@/schema/auth.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sellerProfileImage } from "@/services/seller/sellerProfileImage.service";

export default function SignUp() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  


  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUp, isPending, error: submitError } = useSignUp();

  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5000000) {
        alert("Image must be less than 5MB");
        return;
      }

      // Validate file type
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        )
      ) {
        alert("Only .jpg, .jpeg, .png and .webp formats are supported");
        return;
      }

      setImageFile(file);
     
    }
  };

  /* send the data to hook*/
  const onSubmit = async (data: SignUpFormData) => {
    console.log("this is the data sending to backend", data);
    try {
      let imageUrl = undefined;

      // Handle image upload if a file was selected
      if (imageFile) {
        toast.loading("Uploading image...");
        imageUrl = await sellerProfileImage(imageFile);
        console.log("the image url", imageFile);
        toast.dismiss();
      }

      // Create product data with image_url
      signUp(
        {
          name: data.name,
          role:data.role,
          password:data.password,
          email: data.email,
          profileImage: imageUrl,
          contactNumber:data.contactNumber,
          storeDescription:data.storeDescription
          


        },

        {
          onSuccess: () => {
            toast.success("Product added successfully!");
          },
          onError: (error) => {
            toast.error(`Failed to add product: ${error.message}`);
          },
        }
      );
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              {/* profile image */}
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>

              <input
                {...register("profileImage")}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isPending}
              />
              {errors.profileImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profileImage?.message as string}
                </p>
              )}
            </div>




            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* contact number */}
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                {...register("contactNumber")}
                id="contactNumber"
                type="tel"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="+1 555 123 4567"
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            {/* store description */}
            <div>
              <label
                htmlFor="storeDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Store Description
              </label>
              <textarea
                {...register("storeDescription")}
                id="storeDescription"
                rows={4}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Tell customers about your store..."
              />
              {errors.storeDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storeDescription.message}
                </p>
              )}
            </div>
            {/* role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="seller">seller</option>
                <option value="buyer">buyer</option>
              </select>

              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                {...register("password")}
                id="password"
                type="password"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* { {submitError && (
            <div className="text-red-500 text-sm text-center">
              {submitError.message}
            </div>
          )} } */}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 `}
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
