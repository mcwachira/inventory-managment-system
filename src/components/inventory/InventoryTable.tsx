import { mockStockMovements } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter, FileText } from "lucide-react";

export const InventoryTable = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (type: "in" | "out" | "adjustment") => {
    switch (type) {
      case "in":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Stock In
          </Badge>
        );
      case "out":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Stock Out
          </Badge>
        );
      case "adjustment":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Adjustment
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Inventory Movements
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full inventory-table">
          <thead>
            <tr>
              <th>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th>Reference</th>
              <th>Item</th>
              <th>Type</th>
              <th>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>Quantity</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {mockStockMovements.map((movement) => (
              <tr key={movement.id}>
                <td className="text-gray-700">{formatDate(movement.date)}</td>
                <td className="font-mono text-sm">
                  {movement.referenceNumber || "-"}
                </td>
                <td className="font-medium">{movement.itemName}</td>
                <td>{getStatusBadge(movement.type)}</td>
                <td
                  className={`font-semibold ${
                    movement.type === "in"
                      ? "text-green-600"
                      : movement.type === "out"
                        ? "text-blue-600"
                        : "text-yellow-600"
                  }`}
                >
                  {movement.type === "in" ? "+" : ""}
                  {movement.quantity}
                </td>
                <td className="text-gray-500">{movement.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">8</span> of{" "}
          <span className="font-medium">8</span> results
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
