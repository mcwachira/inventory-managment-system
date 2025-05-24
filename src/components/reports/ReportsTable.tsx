import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReportsTableProps {
  data: any[];
  reportType: string;
  isLoading: boolean;
}

export const ReportsTable = ({
  data,
  reportType,
  isLoading,
}: ReportsTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-100 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTableData = () => {
    switch (reportType) {
      case "inventory":
        return [
          {
            id: 1,
            name: 'Laptop Pro 15"',
            category: "Electronics",
            quantity: 45,
            value: "$1,250.00",
            status: "In Stock",
          },
          {
            id: 2,
            name: "Wireless Mouse",
            category: "Electronics",
            quantity: 120,
            value: "$29.99",
            status: "In Stock",
          },
          {
            id: 3,
            name: "Office Chair",
            category: "Furniture",
            quantity: 8,
            value: "$199.99",
            status: "Low Stock",
          },
          {
            id: 4,
            name: "Desk Lamp",
            category: "Lighting",
            quantity: 0,
            value: "$45.00",
            status: "Out of Stock",
          },
          {
            id: 5,
            name: "Notebook Set",
            category: "Stationery",
            quantity: 200,
            value: "$12.99",
            status: "In Stock",
          },
        ];
      case "sales":
        return [
          {
            id: 1,
            date: "2024-01-15",
            customer: "John Smith",
            amount: "$1,250.00",
            items: 3,
            status: "Completed",
          },
          {
            id: 2,
            date: "2024-01-14",
            customer: "Sarah Wilson",
            amount: "$89.99",
            items: 2,
            status: "Completed",
          },
          {
            id: 3,
            date: "2024-01-13",
            customer: "Mike Johnson",
            amount: "$455.50",
            items: 5,
            status: "Pending",
          },
          {
            id: 4,
            date: "2024-01-12",
            customer: "Lisa Brown",
            amount: "$199.99",
            items: 1,
            status: "Completed",
          },
          {
            id: 5,
            date: "2024-01-11",
            customer: "David Lee",
            amount: "$75.00",
            items: 3,
            status: "Refunded",
          },
        ];
      default:
        return [];
    }
  };

  const tableData = getTableData();

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "destructive" | "outline" | "secondary"
    > = {
      "In Stock": "default",
      "Low Stock": "outline",
      "Out of Stock": "destructive",
      Completed: "default",
      Pending: "outline",
      Refunded: "destructive",
    };

    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const renderTableContent = () => {
    if (reportType === "inventory") {
      return (
        <>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      );
    }

    if (reportType === "sales") {
      return (
        <>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.customer}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.items}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      );
    }

    return null;
  };

  const getTableTitle = () => {
    switch (reportType) {
      case "inventory":
        return "Inventory Report";
      case "sales":
        return "Sales Report";
      case "purchases":
        return "Purchase Report";
      case "movements":
        return "Stock Movements Report";
      default:
        return "Report Data";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTableTitle()}</CardTitle>
        <CardDescription>
          Detailed report data based on your selected filters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>{renderTableContent()}</Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTable;
