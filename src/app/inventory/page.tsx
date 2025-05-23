import InventoryTable from "@/components/inventory/InventoryTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, RefreshCcw } from "lucide-react";

const Inventory = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Control</h1>
        <p className="text-gray-500">
          Manage stock levels and inventory movements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-500">Stock Value</div>
            <div className="text-2xl font-bold">$47,351.52</div>
          </div>
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
            <RefreshCcw size={20} />
          </div>
        </Card>

        <Card className="p-4 flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-500">
              Total Stock In
            </div>
            <div className="text-2xl font-bold text-green-600">+352</div>
          </div>
          <div className="p-2 bg-green-100 text-green-600 rounded-full">
            <ArrowUp size={20} />
          </div>
        </Card>

        <Card className="p-4 flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-500">
              Total Stock Out
            </div>
            <div className="text-2xl font-bold text-blue-600">-186</div>
          </div>
          <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
            <ArrowDown size={20} />
          </div>
        </Card>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button>Stock In</Button>
        <Button variant="outline">Stock Out</Button>
        <Button variant="outline">Stock Transfer</Button>
        <Button variant="outline">Stock Adjustment</Button>
        <Button variant="outline">Stock Count</Button>
      </div>
      <InventoryTable />
    </>
  );
};
export default Inventory;
