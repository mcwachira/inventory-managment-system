"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";
import { mockItems, mockCustomers } from "@/lib/data";
import { PurchaseOrder } from "@/lib/data";

interface PurchaseOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrder?: PurchaseOrder | null;
}

const PurchaseOrderDialog = ({
  isOpen,
  onClose,
  purchaseOrder,
}: PurchaseOrderDialogProps) => {
  const { toast } = useToast();

  const [lineItems, setLineItems] = useState<any[]>([
    { itemId: "", description: "", quantity: 1, price: 0 },
  ]);

  // Filter only vendors from the mockCustomers data
  const vendors = mockCustomers.filter((c) => c.type === "vendor");

  // Default date values
  const today = new Date();
  const dueIn30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const formSchema = z.object({
    supplierName: z.string().min(3, {
      message: "Supplier name is required.",
    }),
    supplierId: z.string().min(1, {
      message: "Supplier ID is required.",
    }),
    date: z
      .date({
        required_error: "Date is required.",
        invalid_type_error: "Invalid date.",
      })
      .default(today),
    dueDate: z
      .date({
        required_error: "Due date is required.",
        invalid_type_error: "Invalid due date.",
      })
      .default(dueIn30Days),
    notes: z.string().optional(),
    status: z
      .enum(["draft", "pending", "approved", "completed", "cancelled"], {
        required_error: "Status is required.",
        invalid_type_error: "Invalid status.",
      })
      .default("draft"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      supplierId: "",
      date: today,
      dueDate: dueIn30Days,
      status: "draft",
      notes: "",
    },
  });

  useEffect(() => {
    if (purchaseOrder) {
      form.reset({
        supplierName: purchaseOrder.supplierName,
        supplierId: purchaseOrder.supplierId,
        date: new Date(purchaseOrder.date),
        dueDate: new Date(purchaseOrder.dueDate),
        status: purchaseOrder.status,
        notes: purchaseOrder.notes || "",
      });
      setLineItems(
        purchaseOrder.items || [
          { itemId: "", description: "", quantity: 1, price: 0 },
        ],
      );
    } else {
      form.reset({
        supplierName: "",
        supplierId: "",
        date: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "draft",
        notes: "",
      });
      setLineItems([{ itemId: "", description: "", quantity: 1, price: 0 }]);
    }
  }, [purchaseOrder, form]);

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { itemId: "", description: "", quantity: 1, price: 0 },
    ]);
  };

  const handleRemoveLineItem = (index: number) => {
    const newLineItems = [...lineItems];
    newLineItems.splice(index, 1);
    setLineItems(newLineItems);
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const newLineItems = [...lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };

    // If item is selected, populate description and price
    if (field === "itemId" && value) {
      const selectedItem = mockItems.find((item) => item.id === value);
      if (selectedItem) {
        newLineItems[index].description = selectedItem.description;
        newLineItems[index].price = selectedItem.price;
      }
    }

    setLineItems(newLineItems);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => {
      return sum + Number(item.quantity) * Number(item.price);
    }, 0);
  };

  const onSubmit = (data: any) => {
    if (lineItems.some((item) => !item.itemId)) {
      toast({
        title: "Validation error",
        description: "All items must have a product selected",
        variant: "destructive",
      });
      return;
    }

    // Combine form data with line items
    const formData = {
      ...data,
      items: lineItems,
      total: calculateTotal(),
    };

    toast({
      title: purchaseOrder
        ? "Purchase Order Updated"
        : "Purchase Order Created",
      description: `${purchaseOrder ? "Updated" : "Created"} purchase order for ${data.supplierName}`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {purchaseOrder ? "Edit Purchase Order" : "Create Purchase Order"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const selectedVendor = vendors.find(
                          (v) => v.id === value,
                        );
                        if (selectedVendor) {
                          form.setValue("supplierName", selectedVendor.name);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Delivery Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-md p-4 mt-">
              <h3 className="font-medium mb-2">Order Items</h3>

              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <div className="col-span-3">
                      <Select
                        value={item.itemId}
                        onValueChange={(value) =>
                          handleLineItemChange(index, "itemId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockItems.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleLineItemChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Description"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleLineItemChange(
                            index,
                            "quantity",
                            e.target.value,
                          )
                        }
                        placeholder="Qty"
                        min="1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleLineItemChange(index, "price", e.target.value)
                        }
                        placeholder="Price"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLineItem(index)}
                        disabled={lineItems.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleAddLineItem}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="flex justify-end mt-4">
              <div className="border-t pt-2 text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-medium">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes or instructions..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {purchaseOrder
                  ? "Update Purchase Order"
                  : "Create Purchase Order"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseOrderDialog;
