import DashboardCards from "@/components/dashboard/DashboardCards";
import DashboardLayout from "../layout";
import InventoryChart from "@/components/dashboard/InventoryChart";
import LowStockItems from "@/components/dashboard/LowStockItems";
import RecentActivities from "@/components/RecentActivities";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to your inventory management system
        </p>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InventoryChart />
        <div className="lg:col-span-1">
          <RecentActivities />
          <div className="mt-6"></div>
          <LowStockItems />
        </div>
      </div>
    </>
  );
}
