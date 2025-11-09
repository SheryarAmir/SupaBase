import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/services/seller.services";
import { CreateProductPayload, IncommingProductData } from "@/types/product";

// sheryar amir

export const useGetAllProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: fetchAllProducts,
  });

  return { data, isLoading, error };
};

// Add user mutation
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (data: CreateProductPayload) => addProduct(data),
    onSuccess: () => {
      // refresh user list after insert
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

// Delete mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todos"],
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<IncommingProductData>;
    }) => updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
