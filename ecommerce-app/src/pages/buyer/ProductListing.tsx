"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/buyerhooks/useBuyer.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Search, ShoppingCart, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { useAddToCart } from "@/hooks/buyerhooks/useBuyer.hook";
import { toast } from "sonner";

const categories = [
  "All",
  "electronics",
  "fashion",
  "home",
  "books",
  "sports",
];

export default function ProductListing() {
  const { data: products, isLoading, error } = useProducts();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product: any) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // Price filter
      const price = product.price || 0;
      const matchesMinPrice = priceRange.min === "" || price >= Number(priceRange.min);
      const matchesMaxPrice = priceRange.max === "" || price <= Number(priceRange.max);

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const handleAddToCart = (productId: string) => {
    // Prevent multiple clicks on the same product
    if (addingProductId === productId) return;
    
    setAddingProductId(productId);
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Product added to cart!");
          setAddingProductId(null);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to add to cart");
          setAddingProductId(null);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold mb-2">
            Failed to load products 😢
          </p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Shop Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing products from sellers
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category and Price Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Min price ($)"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Max price ($)"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} product(s)
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-lg">No products found.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Link 
                  href={`/dashboards/buyer/products/${product.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-48 bg-muted overflow-hidden cursor-pointer">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.title || "product image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <CardContent className="flex-1 p-5 flex flex-col">
                  <div className="mb-4 flex-1">
                    <Link 
                      href={`/dashboards/buyer/products/${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary cursor-pointer">
                        {product.title || "Untitled Product"}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
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
                          {product.stock > 0
                            ? `${product.stock} available`
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (addingProductId !== product.id && product.stock > 0) {
                        handleAddToCart(product.id);
                      }
                    }}
                    disabled={addingProductId === product.id || product.stock === 0}
                    className="w-full"
                    variant={product.stock === 0 ? "outline" : "default"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0
                      ? "Out of Stock"
                      : addingProductId === product.id
                      ? "Adding..."
                      : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
