"use client";

import { useForm } from "react-hook-form";

export default function SetupProfile() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("profile setup", data);
    // call API to save profile details
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 bg-white shadow rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">
          Complete Your Profile
        </h2>

        <div>
          <label className="block text-sm font-medium">Profile Image</label>
          <input type="file" accept="image/*" {...register("profileImage")} />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border rounded p-2"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Store Name</label>
          <input
            type="text"
            {...register("storeName")}
            className="w-full border rounded p-2"
            placeholder="Enter store name"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded p-2"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
