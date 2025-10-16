import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "@/services/todo.services";
import { TodoCreateInput, TodoData } from "@/types/todos";

export const useTodos = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return { data, isLoading, error };
};

// Add user mutation
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos"],
    mutationFn: (user: TodoCreateInput) => addTodo(user),
    onSuccess: () => {
      // refresh user list after insert
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// Delete mutation
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos"],
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TodoData> }) =>
      updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
