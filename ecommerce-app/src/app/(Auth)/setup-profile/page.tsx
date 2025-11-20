"use client";

import { useForm } from "react-hook-form";
import { Cloud } from "lucide-react";
import { useSignupStore } from "@/store/signupStore";
import { useRouter } from "next/navigation";

export default function SetupProfile() {
  const { register, handleSubmit } = useForm();
  const { setStep2 } = useSignupStore();
  const router = useRouter();

  const onSubmit = (data: any) => {
    setStep2(data);
    // navigate to review page where user can submit final signup
    router.push("/complete-signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Set up your profile to get started
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-slate-900 rounded-xl shadow-lg dark:shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6"
        >
          {/* Profile Image Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
              Profile Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                {...register("profileImage")}
                className="hidden"
                id="profileImage"
              />
              <label
                htmlFor="profileImage"
                className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-slate-50 dark:bg-slate-800/50"
              >
                <div className="text-center">
                  <Cloud className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Click to upload image
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Bio Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
              Bio
            </label>
            <textarea
              {...register("bio")}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about yourself"
              rows={4}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Max 250 characters
            </p>
          </div>

          {/* Store Name Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
              Store Name
            </label>
            <input
              type="text"
              {...register("storeName")}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your store name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:shadow-lg active:scale-95 mt-2"
          >
            Save & Continue
          </button>

          {/* Footer Note */}
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Your information is secure and will never be shared
          </p>
        </form>
      </div>
    </div>
  );
}
