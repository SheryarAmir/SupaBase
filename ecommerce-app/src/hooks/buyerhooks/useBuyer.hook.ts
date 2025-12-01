import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
} from "@/services/buyer/buyer.services";
import { supabase } from "@/constant/supabase-client";

// Hook to get all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

// Hook to get user's cart
export const useCart = (userId: string) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId, // Only fetch if userId is available
  });
};

// Hook to get current user ID
const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    getSession();
  }, []);

  return userId;
};

// Hook to add item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      if (!userId) throw new Error("User not authenticated");
      return addToCart(userId, productId, quantity);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      }
    },
  });
};

// Hook to update cart item quantity
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();

  return useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => {
      if (!userId) throw new Error("User not authenticated");
      return updateCartItemQuantity(itemId, quantity);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      }
    },
  });
};

// Hook to remove item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();

  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!userId) throw new Error("User not authenticated");
      return removeFromCart(itemId);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      }
    },
  });
};
