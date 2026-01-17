"use client";

import { useState } from "react";
import { useProduct, useAddToCart } from "@/hooks/buyerhooks/useBuyer.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart, Loader2, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { data: product, isLoading, error } = useProduct(productId || "");
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!productId || isAdding || isAddingToCart) return;
    
    setIsAdding(true);
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Product added to cart!");
          setIsAdding(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to add to cart");
          setIsAdding(false);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-destructive text-lg font-semibold mb-2">
            Product not found
          </p>
          <Button onClick={() => router.push("/dashboards/buyer")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => router.push("/dashboards/buyer")}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative w-full h-96 lg:h-[500px] bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.title || "product image"}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                    Category
                  </h3>
                  <p className="text-lg font-medium">{product.category}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                    Stock Available
                  </h3>
                  <p className="text-lg font-medium">
                    {product.stock} {product.stock === 1 ? "unit" : "units"}
                  </p>
                </div>

                {product.email && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                      Seller Contact
                    </h3>
                    <p className="text-lg">{product.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isAdding || isAddingToCart || product.stock === 0}
              size="lg"
              className="w-full"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock === 0
                ? "Out of Stock"
                : isAdding || isAddingToCart
                ? "Adding to Cart..."
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
