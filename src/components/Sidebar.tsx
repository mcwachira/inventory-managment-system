import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { navigationItems } from "@/lib/data";
import NavLink from "./NavLink";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const isMobile = useIsMobile();

  const handleClose = () => {
    if (isMobile) {
      setOpen(false);
    }
  };
  return (
    <>
      {/* mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* sidebar */}

      <aside
        className={cn(
          "text-white bg-inventory-primary flex flex-col fixed inset-y-0 z-30 transition-all duration-300 ease-in-out",
          isMobile ? (open ? "left-0" : "-left-64") : "left-0",
          "w-64",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-inventory-primary/40">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="bg-white rounded p-1">
              <div className="text-inventory-primary font-bold text-xl">
                Swift
              </div>
            </div>
            <span className="font-bold text-xl">Inventory</span>
          </Link>

          {isMobile && (
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  href={item.path}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2.5 rounded-md transition-colors",
                      "hover:bg-inventory-secondary hover:text-white",
                      isActive
                        ? "bg-inventory-secondary text-white"
                        : "text-gray-200",
                    )
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
