"use client";

import { useForm } from "react-hook-form";
import { useAddUser } from "@/hooks/useUser.hook";
import { FormData } from "@/types/users";
import Getusers from "@/app/getusers/page";
import { useSignOut } from "@/hooks/useAuth.hook";

export default function UserList() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: addUser, isPending, error } = useAddUser();

  const { mutate } = useSignOut();

  const onSubmit = (data: FormData) => {
    console.log(data);
    addUser(data, {
      onSuccess: () => {
        reset(); // clear form
      },
    });
  };

  const handlerLogOut = () => {
    mutate();
  };

  return (
    <section className="space-y-4 p-4 border rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
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
