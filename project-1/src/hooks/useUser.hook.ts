import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from "@/services/users.services";
import { FormData } from "@/types/users";

export const useUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data, isLoading, error };
};

// Add user mutation
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users"],
    mutationFn: (user: FormData) => addUser(user),
    onSuccess: () => {
      // refresh user list after insert
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users"],
    mutationFn: ({ id, updates }: { id: string; updates: Partial<FormData> }) =>
      updateUser(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
