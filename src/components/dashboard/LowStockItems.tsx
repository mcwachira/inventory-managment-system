import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { getLowStockItems } from "@/lib/data";

const LowStockItems = () => {
  const lowStockItems = getLowStockItems();

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Low Stock Items</CardTitle>
          <CardDescription>Items that need reordering</CardDescription>
        </div>
        <div className="bg-red-100 text-red-600 p-2 rounded-lg">
          <AlertCircle size={20} />
        </div>
      </CardHeader>
      <CardContent>
        {lowStockItems.length > 0 ? (
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm font-semibold mr-2">
                    {item.stockQuantity}
                  </div>
                  <div className="h-2 w-12 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        item.stockQuantity <= item.reorderLevel / 2
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: `${(item.stockQuantity / item.reorderLevel) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No low stock items!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default LowStockItems;
