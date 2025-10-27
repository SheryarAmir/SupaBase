"use client";

import { useState } from "react";
import {
  useGetAllProducts,
  useDeleteProduct,
  useUpdateTodo,
} from "@/hooks/useSeller.hook";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Edit } from "lucide-react";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetAllProducts();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateTodo();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  console.log("data come from supabase", products);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load products 😢
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">No products found.</div>
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
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {products.map((product: any) => (
        <Card key={product.id} className="p-4 shadow-sm">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg">
              {editingId === product.user_id ? (
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New title"
                />
              ) : (
                product.title
              )}
            </CardTitle>
            <div className="flex gap-2">
              {editingId === product.id ? (
                <Button
                  size="sm"
                  onClick={() => handleUpdate(product.user_id)}
                  disabled={updateProduct.isPending}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(product.user_id);
                    setNewTitle(product.user_id);
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.user_id)}
                disabled={deleteProduct.isPending}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </CardHeader>

          <CardContent className="text-sm text-gray-600">
            <Image
              src={product.image_url}
              alt="product image"
              width={50}
              height={50}
            ></Image>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Email: {product.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
