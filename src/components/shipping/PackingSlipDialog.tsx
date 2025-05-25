"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Printer, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { mockOrderData } from "@/lib/data";

interface PackingSlipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: any;
}

const mockOrderData = {
  orderNumber: "SO-2023-001",
  customerName: "Tech Solutions Inc.",
  customerAddress: "123 Business Ave\nNew York, NY 10001",
  orderDate: "2023-06-15",
  items: [
    {
      id: 1,
      name: "Wireless Mouse",
      sku: "WM001",
      quantity: 2,
      location: "A1-B2",
    },
    { id: 2, name: "USB Cable", sku: "UC003", quantity: 5, location: "A2-C1" },
    { id: 3, name: "Keyboard", sku: "KB007", quantity: 1, location: "B1-A3" },
  ],
};

export const PackingSlipDialog = ({
  isOpen,
  onClose,
  orderData = mockOrderData,
}: PackingSlipDialogProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    console.log("Printing packing slip for:", orderData.orderNumber);
    toast({
      title: "Printing Packing Slip",
      description: `Packing slip for ${orderData.orderNumber} is being printed.`,
    });
  };

  const handleDownload = () => {
    console.log("Downloading packing slip for:", orderData.orderNumber);
    toast({
      title: "Downloading Packing Slip",
      description: `Packing slip for ${orderData.orderNumber} is being downloaded.`,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Packing Slip - {orderData.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Header */}
              <div className="border-b pb-6 mb-6">
                <h1 className="text-3xl font-bold text-center">PACKING SLIP</h1>
                <div className="mt-4 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ship From:</h3>
                    <div className="text-gray-600">
                      <p>Your Company Name</p>
                      <p>123 Warehouse Street</p>
                      <p>City, State 12345</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ship To:</h3>
                    <div className="text-gray-600">
                      <p className="font-medium">{orderData.customerName}</p>
                      {orderData.customerAddress
                        .split("\n")
                        .map((line: string, idx: number) => (
                          <p key={idx}>{line}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p>
                    <span className="font-semibold">Order Number:</span>{" "}
                    {orderData.orderNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Order Date:</span>{" "}
                    {orderData.orderDate}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Packed Date:</span>{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Packed By:</span> Warehouse
                    Staff
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Description</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Qty Ordered</TableHead>
                    <TableHead className="text-center">Qty Packed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="border rounded w-12 h-8 mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-2">Packer Notes:</h4>
                    <div className="border rounded p-4 h-24 bg-gray-50">
                      <p className="text-sm text-gray-500">
                        Any special notes or instructions...
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Package Count:</h4>
                    <p>
                      Total Packages:{" "}
                      <span className="border-b border-black px-2">1</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Packed by: _________________ Date: _________
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackingSlipDialog;
