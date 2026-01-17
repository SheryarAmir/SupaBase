import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProduct,
  searchProducts,
  filterProducts,
  getCart,
  getCartCount,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  createOrder,
  getUserOrders,
} from "@/services/buyer/buyer.services";
import { supabase } from "@/constant/supabase-client";

// Hook to get all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 30000, // Consider data fresh for 30 seconds to reduce unnecessary refetches
  });
};

// Hook to get a single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

// Hook to search products
export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: searchTerm.length > 0,
  });
};

// Hook to filter products
export const useFilterProducts = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useQuery({
    queryKey: ["products", "filter", filters],
    queryFn: () => filterProducts(filters),
  });
};

// Hook to get user's cart
export const useCart = (userId: string) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId, // Only fetch if userId is available
    staleTime: 0, // Always refetch to ensure fresh data after role switch
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on mount
  });
};

// Hook to get cart count
export const useCartCount = () => {
  const userId = useUserId();
  
  return useQuery({
    queryKey: ["cartCount", userId],
    queryFn: () => {
      if (!userId) return 0;
      return getCartCount(userId);
    },
    enabled: !!userId,
    refetchInterval: 2000, // Refetch every 2 seconds to keep count updated
  });
};

// Hook to get current user ID
export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    
    getSession();

    // Listen for auth state changes (e.g., role switching)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      subscription.unsubscribe();
    };
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
        // Use exact match to avoid invalidating other queries
        queryClient.invalidateQueries({ queryKey: ["cart", userId], exact: true });
        queryClient.invalidateQueries({ queryKey: ["cartCount", userId], exact: true });
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
        queryClient.invalidateQueries({ queryKey: ["cartCount", userId] });
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
        queryClient.invalidateQueries({ queryKey: ["cartCount", userId] });
      }
    },
  });
};

// Hook to create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();

  return useMutation({
    mutationFn: async (orderData: {
      shipping_address: string;
      shipping_city: string;
      shipping_state: string;
      shipping_zip: string;
      shipping_country: string;
      payment_method: string;
    }) => {
      if (!userId) throw new Error("User not authenticated");
      return createOrder(orderData);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
        queryClient.invalidateQueries({ queryKey: ["cartCount", userId] });
        queryClient.invalidateQueries({ queryKey: ["orders", userId] });
      }
    },
  });
};

// Hook to get user orders
export const useUserOrders = () => {
  const userId = useUserId();

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => {
      if (!userId) return [];
      return getUserOrders(userId);
    },
    enabled: !!userId,
  });
};
