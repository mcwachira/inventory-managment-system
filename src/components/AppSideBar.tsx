"use client";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Users,
  FileText,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Main navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: Package,
  },
  {
    title: "Sales",
    path: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Purchases",
    path: "/purchases",
    icon: ShoppingBag,
  },
  {
    title: "Items",
    path: "/items",
    icon: Package,
  },
];

// Management navigation items
const managementNavItems = [
  {
    title: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    title: "Vendors",
    path: "/vendors",
    icon: Users,
  },
  {
    title: "Invoices",
    path: "/invoices",
    icon: FileText,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function AppSideBar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded p-1">
          <div className="text-inventory-primary font-bold text-">SWIFT</div>
        </div>
        <h1 className="text-white text-sm mt-2">Goods in Motion</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link href={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link href={item.path}>
                      <item.icon className="h-5 w-5'use client'" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-inventory-secondary flex items-center justify-center text-black font-semibold">
              JS
            </div>

            <div className="ml-2">
              <div className="text-sm font-medium text-black">Mcwachira</div>
              <div className="text-xs text-gray-600">Administrator</div>
            </div>
          </div>
          <button className="p-2 rounded-md hover:bg-inventory-secondary text-black">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
