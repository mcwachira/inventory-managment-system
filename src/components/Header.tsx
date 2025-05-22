import React from "react";
import { BellIcon, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const isMobile = useIsMobile();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 h-16 flexx items-center justify-between">
        {/* Left: Menu button and search */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <SidebarTrigger onClick={() => setSidebarOpen(!sidebarOpen)} />
          )}

          <div className="hidden md:block w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 pr-4 py-2 w-full"
                placeholder="Search inventory..."
                type="search"
              />
            </div>
          </div>
        </div>
        {/* Right: Actions  */}

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>

          <Button size="sm" variant="outline">
            Create Order
          </Button>
          <Button size="sm">+ Add Item</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
