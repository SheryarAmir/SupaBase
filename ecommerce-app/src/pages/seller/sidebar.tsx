"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    label: "Analytics",
    href: "/seller/analytics",
    icon: BarChart3,
  },
  {
    label: "Payments",
    href: "/seller/payments",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "/seller/help",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {isOpen && (
              <h1 className="text-xl font-bold text-sidebar-foreground">
                Seller Hub
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  !isOpen && "rotate-90"
                )}
              />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {isOpen && (
            <div className="px-2 py-2 text-xs text-sidebar-foreground/60">
              Store Name
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
