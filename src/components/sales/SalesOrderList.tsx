"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  FileText,
  MoreHorizontal,
  ArrowRightLeft,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockSalesOrders } from "@/lib/data";

interface SalesOrderListProps {
  status?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SalesOrderList = ({ status }: SalesOrderListProps) => {
  const { toast } = useToast();
  const [orders] = useState(mockSalesOrders);

  const filteredOrders =
    status && status != "all"
      ? orders.filter((order) => order.status === status)
      : orders;

  const handleConvertToInvoice = (order: any) => {
    console.log("Converting to invoice:", order);
    toast({
      title: "Converting to Invoice",
      description: `Sales order ${order.orderNumber} is being converted to an invoice.`,
    });
  };

  const handleEdit = (order: any) => {
    console.log("Editing order:", order);
    toast({
      title: "Edit Order",
      description: `Opening edit form for ${order.orderNumber}`,
    });
  };

  const handleView = (order: any) => {
    console.log("Viewing order:", order);
    toast({
      title: "View Order",
      description: `Opening details for ${order.orderNumber}`,
    });
  };

  const handleDelete = (order: any) => {
    console.log("Deleting order:", order);
    toast({
      title: "Order Deleted",
      description: `Sales order ${order.orderNumber} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.dueDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {order.invoiceCreated ? (
                    <Badge className="bg-green-100 text-green-800">
                      Created
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(order)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(order)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {!order.invoiceCreated && (
                        <DropdownMenuItem
                          onClick={() => handleConvertToInvoice(order)}
                        >
                          <ArrowRightLeft className="mr-2 h-4 w-4" />
                          Convert to Invoice
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(order)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesOrderList;
