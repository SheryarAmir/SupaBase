"use client";

import { useForm } from "react-hook-form";
import { useAddUser } from "@/hooks/useUser.hook";
import { FormData } from "@/types/users";
import Getusers from "@/app/getusers/page";
import { useSignOut } from "@/hooks/useAuth.hook";
import { uploadImage } from "@/services/upload.services";

export default function UserList() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: addUser, isPending, error } = useAddUser();

  const { mutate } = useSignOut();

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl = undefined;

      // Handle image upload if a file was selected and get the URL back and use it to store in the database table
      if (data.image && data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      // Create user data with image_url
      const { image, ...userData } = data;
      addUser(
        {
          ...userData,
          image_url: imageUrl, // Using the correct column name in your table
        },
        {
          onSuccess: () => {
            reset(); // clear form
          },
        }
      );
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handlerLogOut = () => {
    mutate();
  };

  return (
    <section className="space-y-4 p-4 border rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="file"
            {...register("image", { required: true })}
            className="border p-1 w-full"
          />
        </div>

        <div>
          <label>Name</label>
          <input
            {...register("name", { required: true })}
            className="border p-1 w-full"
          />
        </div>

        <div>
          <label>Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true, required: true })}
            className="border p-1 w-full"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="border p-1 w-full"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="border p-1 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded"
        >
          {isPending ? "Adding..." : "Add User"}
        </button>

        {error && (
          <p className="text-red-500">Error: {(error as Error).message}</p>
        )}
      </form>

      <button
        className="bg-orange-500 text-white px-4 py-2  rounded"
        onClick={handlerLogOut}
      >
        logout
      </button>
      <Getusers />
    </section>
  );
}
