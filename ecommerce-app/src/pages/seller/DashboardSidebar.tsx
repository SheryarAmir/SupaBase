import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", title: "Dashboard Overview", icon: LayoutDashboard },
  { id: "products", title: "My Products", icon: Package },
  { id: "add-product", title: "Add New Product", icon: PlusCircle },
  { id: "orders", title: "Orders", icon: ShoppingCart },
  { id: "messages", title: "Messages", icon: MessageSquare },
  { id: "analytics", title: "Analytics", icon: TrendingUp },
  { id: "profile", title: "Profile Settings", icon: User },
  { id: "account", title: "Account Settings", icon: Settings },
];

export function DashboardSidebar({
  activeSection,
  onSectionChange,
}: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    alert(
      "Logout functionality - This would clear session and redirect to login"
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-6 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="space-y-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seller Hub
              </h2>
              <p className="text-xs text-muted-foreground">Manage your store</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    className="transition-all duration-300"
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  tooltip="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
