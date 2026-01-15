"use client";

import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/hooks/buyerhooks/useBuyer.hook";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function CartCounter() {
  const { data: cartCount = 0, isLoading } = useCartCount();

  return (
    <Link href="/dashboards/buyer/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {isLoading ? "..." : cartCount > 99 ? "99+" : cartCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
