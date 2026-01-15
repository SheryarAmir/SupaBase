"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ProductListing from "@/pages/buyer/ProductListing";
import { useSwitchRole } from "@/hooks/sellerhooks/profileSettings.hook";
import { Store, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/sellerhooks/profileSettings.hook";
import { CartCounter } from "@/components/CartCounter";

export default function BuyerDashboard() {
  const { data: profile } = useProfile();
  const { mutate: switchRole, isPending: isSwitching } = useSwitchRole();

  const handleSwitchToSeller = () => {
    switchRole("seller", {
      onSuccess: () => {
        toast.success("Switched to seller mode!");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to switch role");
      },
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-semibold">Buyer Dashboard</h2>
              <div className="flex items-center gap-4">
                <CartCounter />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSwitchToSeller}
                  disabled={isSwitching}
                  className="flex items-center gap-2"
                >
                  <Store className="h-4 w-4" />
                  {isSwitching ? "Switching..." : "Switch to Seller"}
                </Button>
                <div className="text-sm text-muted-foreground">
                  Welcome,{" "}
                  <span className="font-medium text-foreground">
                    {profile?.name || "Buyer"}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8">
            <ProductListing />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
