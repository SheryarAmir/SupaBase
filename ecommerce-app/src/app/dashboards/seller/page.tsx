"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/pages/seller/DashboardSidebar";
import { DashboardOverview } from "@/pages/seller/dashboard-overview";
import MyProducts from "@/pages/seller/MyProducts";
import AddProduct from "@/pages/seller/AddProduct";
import { Orders } from "@/pages/seller/Orders";
import { Messages } from "@/pages/seller/Messages";
import { Analytics } from "@/pages/seller/Analytics";
import ProfileSettings  from "@/pages/seller/ProfileSettings";
import { AccountSettings } from "@/pages/seller/AccountSettings";
import { useSwitchRole } from "@/hooks/sellerhooks/profileSettings.hook";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { mutate: switchRole, isPending: isSwitching } = useSwitchRole();

  const handleSwitchToBuyer = () => {
    switchRole("buyer", {
      onSuccess: () => {
        toast.success("Switched to buyer mode!");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to switch role");
      },
    });
  };

  const renderSection = () => {
    switch (activeSection) {  
      case "dashboard":
        return <DashboardOverview />;
      case "products":
        return <MyProducts />;
      case "add-product":
        return <AddProduct />;
      case "orders":
        return <Orders />;
      case "messages":
        return <Messages />;
      case "analytics":
        return <Analytics />;
      case "profile":
        return <ProfileSettings />;
      case "account":
        return <AccountSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-semibold">Seller Dashboard</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSwitchToBuyer}
                  disabled={isSwitching}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isSwitching ? "Switching..." : "Switch to Buyer"}
                </Button>
                <div className="text-sm text-muted-foreground">
                  Welcome back,{" "}
                  <span className="font-medium text-foreground">Seller</span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8">{renderSection()}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
