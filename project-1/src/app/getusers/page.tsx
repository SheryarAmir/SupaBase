"use client";

import { useUsers, useDeleteUser, useUpdateUser } from "@/hooks/useUser.hook";
import { useState } from "react";

export default function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  const handleEdit = async (id: string) => {
    const user = users?.find((u) => u.id === id);
    if (!user) return;

    const newName = prompt("Enter new name:", user.name);
    if (!newName) return;

    try {
      await updateUser({ id, updates: { name: newName } });
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  if (isLoading) return <p className="text-center p-4">Loading...</p>;
  if (error)
    return <p className="text-center p-4 text-red-500">Something went wrong</p>;
  if (!users || users.length === 0)
    return <p className="text-center p-4">No users found.</p>;

  return (
    <section className="max-w-2xl mx-auto p-4">
      <ul className="space-y-4">
        {users.map((user: any) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <span className="font-medium">{user.name}</span>
              <span className="text-gray-600 mx-2">({user.email})</span>
              <span className="text-sm text-gray-500">Age {user.age}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user.id)}
                disabled={isUpdating}
                className={`px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Updating..." : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={isDeleting}
                className={`px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
