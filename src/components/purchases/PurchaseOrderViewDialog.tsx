import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Mail, Printer, FileCheck } from "lucide-react";
import { PurchaseOrder } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import ConvertToBillDialog from "./ConvertToBillDialog";

interface PurchaseOrderViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrder: PurchaseOrder | null;
}

const PurchaseOrderViewDialog = ({
  isOpen,
  onClose,
  purchaseOrder,
}: PurchaseOrderViewDialogProps) => {
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);

  if (!purchaseOrder) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between mt-4">
              <span>Purchase Order #{purchaseOrder.poNumber}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button size="sm" variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                {purchaseOrder.status === "approved" &&
                  !purchaseOrder.billCreated && (
                    <Button size="sm" onClick={() => setIsBillDialogOpen(true)}>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Convert to Bill
                    </Button>
                  )}
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-800">Supplier</h3>
                <p className="text-gray-600">{purchaseOrder.supplierName}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">PO #: {purchaseOrder.poNumber}</p>
                <p className="text-gray-600">
                  Date: {new Date(purchaseOrder.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Due: {new Date(purchaseOrder.dueDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Status:
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      purchaseOrder.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : purchaseOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : purchaseOrder.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {purchaseOrder.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="items">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">Order Items</TabsTrigger>
              <TabsTrigger value="history">Order History</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrder.items &&
                      purchaseOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${Number(item.price).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(item.quantity * item.price).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end mt-4 space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Subtotal:</p>
                    <p className="text-sm text-gray-600">Tax:</p>
                    <p className="font-medium">Total:</p>
                  </div>
                  <div className="text-right w-24">
                    <p className="text-sm text-gray-600">
                      $
                      {(purchaseOrder.total - (purchaseOrder.tax || 0)).toFixed(
                        2,
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${(purchaseOrder.tax || 0).toFixed(2)}
                    </p>
                    <p className="font-medium">
                      ${purchaseOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {purchaseOrder.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium">Notes</h4>
                    <p className="text-sm text-gray-600">
                      {purchaseOrder.notes}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="mt-4 space-y-4">
                {purchaseOrder.history && purchaseOrder.history.length > 0 ? (
                  purchaseOrder.history.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                          event.type === "status_change"
                            ? "bg-blue-500"
                            : event.type === "comment"
                              ? "bg-gray-500"
                              : "bg-green-500"
                        }`}
                      >
                        {event.type === "status_change"
                          ? "S"
                          : event.type === "comment"
                            ? "C"
                            : "U"}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{event.user}</span>
                          <span>
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-500">
                    No history available
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="attachments">
              <div className="mt-4">
                {purchaseOrder.attachments &&
                purchaseOrder.attachments.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {purchaseOrder.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="border rounded-md p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-gray-500">
                            {attachment.type} • Added{" "}
                            {new Date(
                              attachment.dateAdded,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-gray-500">No attachments found</p>
                    <Button variant="outline" className="mt-2">
                      Add Attachment
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ConvertToBillDialog
        isOpen={isBillDialogOpen}
        onClose={() => setIsBillDialogOpen(false)}
        purchaseOrder={purchaseOrder}
      />
    </>
  );
};

export default PurchaseOrderViewDialog;
