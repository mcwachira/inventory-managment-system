"use client";
import React, { useState } from "react";
import AppSideBar from "@/components/AppSideBar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
      open={isMobile ? sidebarOpen : undefined}
      onOpenChange={isMobile ? setSidebarOpen : undefined}
    >
      <div className="min-h-screen flex bg-gray-50 w-full">
        <AppSideBar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main
            className={`flex-1 overflow-auto p-4 md:p-6 transition-all ${isMobile && sidebarOpen ? "opacity-50" : ""}`}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
