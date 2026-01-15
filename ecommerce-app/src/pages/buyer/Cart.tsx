"use client";

import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/buyerhooks/useBuyer.hook";
import { useUserId } from "@/hooks/buyerhooks/useBuyer.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const userId = useUserId();
  const { data: cartItems, isLoading } = useCart(userId || "");
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart();
  const router = useRouter();

  const handleQuantityChange = (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    
    updateQuantity(
      { itemId, quantity: newQuantity },
      {
        onSuccess: () => {
          toast.success("Cart updated");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to update cart");
        },
      }
    );
  };

  const handleRemove = (itemId: string) => {
    removeItem(itemId, {
      onSuccess: () => {
        toast.success("Item removed from cart");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to remove item");
      },
    });
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total: number, item: any) => {
      const product = item.sellerproduct || item.product_id;
      const price = typeof product === "object" ? product?.price || 0 : 0;
      return total + price * (item.quantity || 0);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Button onClick={() => router.push("/dashboards/buyer")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => {
              const product = item.sellerproduct || item.product_id;
              const productData = typeof product === "object" ? product : null;
              
              if (!productData) return null;

              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link href={`/dashboards/buyer/products/${productData.id}`}>
                        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={productData.image_url || "/placeholder.svg"}
                            alt={productData.title || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/dashboards/buyer/products/${productData.id}`}>
                            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                              {productData.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {productData.description}
                          </p>
                          <p className="text-lg font-bold text-primary mt-2">
                            ${productData.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              disabled={isUpdating || item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              disabled={isUpdating || (productData.stock && item.quantity >= productData.stock)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(item.id)}
                            disabled={isRemoving}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/dashboards/buyer/checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
