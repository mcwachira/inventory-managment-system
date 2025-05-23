"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash, FileCheck } from "lucide-react";
import PurchaseOrderDialog from "./PurchaseOrderDialog";
import PurchaseOrderViewDialog from "./PurchaseOrderViewDialog";
import { mockPurchaseOrders } from "@/lib/data";
import ConvertToBillDialog from "./ConvertToBillDialog";

const PurchaseOrderList = () => {
  const [editPurchaseOrder, setEditPurchaseOrder] = useState<any | null>(null);
  const [viewPurchaseOrder, setViewPurchaseOrder] = useState<any | null>(null);
  const [convertToBillOrder, setConvertToBillOrder] = useState<any | null>(
    null,
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PO Number</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPurchaseOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No purchase orders found
              </TableCell>
            </TableRow>
          ) : (
            mockPurchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.poNumber}</TableCell>
                <TableCell>{order.supplierName}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "b<g-yellow-100 text-yellow-800"
                          : order.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewPurchaseOrder(order)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditPurchaseOrder(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {order.status === "approved" && !order.billCreated && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConvertToBillOrder(order)}
                      >
                        <FileCheck className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <PurchaseOrderDialog
        isOpen={!!editPurchaseOrder}
        onClose={() => setEditPurchaseOrder(null)}
        purchaseOrder={editPurchaseOrder}
      />

      <PurchaseOrderViewDialog
        isOpen={!!viewPurchaseOrder}
        onClose={() => setViewPurchaseOrder(null)}
        purchaseOrder={viewPurchaseOrder}
      />

      <ConvertToBillDialog
        isOpen={!!convertToBillOrder}
        onClose={() => setConvertToBillOrder(null)}
        purchaseOrder={convertToBillOrder}
      />
    </div>
  );
};

export default PurchaseOrderList;
