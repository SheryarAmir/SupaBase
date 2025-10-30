"use client";

import { useState } from "react";
import {
  useGetAllProducts,
  useDeleteProduct,
  useUpdateTodo,
} from "@/hooks/sellerhooks/useSeller.hook";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Package } from "lucide-react";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetAllProducts();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateTodo();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  console.log("data come from supabase", products);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold mb-2">
            Failed to load products 😢
          </p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground text-lg">No products found.</p>
        </div>
      </div>
    );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete id", id);
      await deleteProduct.mutateAsync(id);
    }
  };

  const handleUpdate = async (id: string) => {
    await updateProduct.mutateAsync({
      id,
      updates: { title: newTitle },
    });
    setEditingId(null);
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Products Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage and view all your products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col h-full"
            >
              <div className="relative w-full h-48 bg-muted overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.title || "product image"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="flex-1 p-5 flex flex-col">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {product.title || "Untitled Product"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium text-foreground bg-secondary/50 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Stock:</span>
                      <span
                        className={`font-semibold ${
                          product.stock > 0
                            ? "text-green-600"
                            : "text-destructive"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-sm text-foreground text-right break-all">
                        {product.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteProduct.isPending}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
