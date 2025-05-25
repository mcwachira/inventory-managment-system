"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockCustomers, mockItems } from "@/lib/data";

interface SalesReturnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  returnToEdit?: any;
}

export const SalesReturnDialog = ({
  isOpen,
  onClose,
  returnToEdit,
}: SalesReturnDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    originalOrderId: "",
    originalInvoiceId: "",
    date: new Date().toISOString().split("T")[0],
    reason: "",
    status: "pending",
    notes: "",
    items: [
      {
        itemId: "",
        name: "",
        quantityReturned: 1,
        originalPrice: 0,
        refundAmount: 0,
        reason: "",
      },
    ],
  });

  const customers = mockCustomers.filter((c) => c.type === "customer");
  const returnReasons = [
    "Defective product",
    "Wrong item shipped",
    "Damaged in transit",
    "Customer changed mind",
    "Product not as described",
    "Quality issues",
    "Other",
  ];

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    setFormData((prev) => ({
      ...prev,
      customerId,
      customerName: customer?.name || "",
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const items = [...formData.items];
    if (field === "itemId") {
      const item = mockItems.find((i) => i.id === value);
      items[index] = {
        ...items[index],
        itemId: value,
        name: item?.name || "",
        originalPrice: item?.sellingPrice || 0,
        refundAmount: item?.sellingPrice || 0,
      };
    } else if (field === "quantityReturned") {
      items[index] = {
        ...items[index],
        [field]: value,
        refundAmount: value * items[index].originalPrice,
      };
    } else {
      items[index] = { ...items[index], [field]: value };
    }
    setFormData((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemId: "",
          name: "",
          quantityReturned: 1,
          originalPrice: 0,
          refundAmount: 0,
          reason: "",
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateTotalRefund = () => {
    return formData.items.reduce((sum, item) => sum + item.refundAmount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalRefund = calculateTotalRefund();

    console.log("Sales Return Data:", {
      ...formData,
      totalRefund,
      returnNumber: `RET-${Date.now()}`,
    });

    toast({
      title: "Sales Return Created",
      description: "Sales return has been created successfully.",
    });

    onClose();
  };

  const totalRefund = calculateTotalRefund();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            {returnToEdit ? "Edit Sales Return" : "Create Sales Return"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer">Customer *</Label>
              <Select
                value={formData.customerId}
                onValueChange={handleCustomerChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="originalOrderId">Original Order ID</Label>
              <Input
                placeholder="SO-2023-001"
                value={formData.originalOrderId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    originalOrderId: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="originalInvoiceId">Original Invoice ID</Label>
              <Input
                placeholder="INV-2023-001"
                value={formData.originalInvoiceId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    originalInvoiceId: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="date">Return Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="reason">Return Reason</Label>
              <Select
                value={formData.reason}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, reason: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {returnReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Return Items
                <Button type="button" onClick={addItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg"
                >
                  <div className="col-span-3">
                    <Label>Item</Label>
                    <Select
                      value={item.itemId}
                      onValueChange={(value) =>
                        handleItemChange(index, "itemId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockItems.map((mockItem) => (
                          <SelectItem key={mockItem.id} value={mockItem.id}>
                            {mockItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantityReturned}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantityReturned",
                          parseInt(e.target.value) || 1,
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Original Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.originalPrice}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "originalPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Refund Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.refundAmount}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "refundAmount",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Item Reason</Label>
                    <Select
                      value={item.reason}
                      onValueChange={(value) =>
                        handleItemChange(index, "reason", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {returnReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Refund:</span>
                <span>${totalRefund.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              placeholder="Additional notes about the return"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {returnToEdit ? "Update Return" : "Create Return"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalesReturnDialog;
