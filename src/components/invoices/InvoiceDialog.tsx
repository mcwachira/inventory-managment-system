"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockItems, Invoice } from "@/lib/data";

interface InvoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
}

const InvoiceDialog = ({ isOpen, onClose, invoice }: InvoiceDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!invoice;
  const [invoiceItems, setInvoiceItems] = useState<any[]>(invoice?.items || []);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // Update calculations when items, tax or discount changes
  React.useEffect(() => {
    const calculatedSubtotal = invoiceItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    const calculatedTax = calculatedSubtotal * (tax / 100);
    const calculatedDiscount = calculatedSubtotal * (discount / 100);
    const calculatedTotal =
      calculatedSubtotal + calculatedTax - calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setTotal(calculatedTotal);
  }, [invoiceItems, tax, discount]);

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const handleRemoveItem = (itemId: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== itemId));
  };

  const handleItemChange = (itemId: string, field: string, value: any) => {
    setInvoiceItems(
      invoiceItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [field]:
                field === "price" || field === "quantity"
                  ? Number(value)
                  : value,
            }
          : item,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `Invoice ${isEditing ? "updated" : "created"} successfully`,
      description: `Invoice has been ${isEditing ? "updated" : "created"}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                placeholder="INV-00001"
                defaultValue={invoice?.invoiceNumber || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                placeholder="Select customer"
                defaultValue={invoice?.customerName || ""}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Invoice Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={
                  invoice?.date
                    ? new Date(invoice.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                defaultValue={
                  invoice?.dueDate
                    ? new Date(invoice.dueDate).toISOString().split("T")[0]
                    : ""
                }
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-lg">Invoice Items</h3>
              <Button type="button" onClick={handleAddItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Qty</TableHead>
                  <TableHead className="w-24">Price</TableHead>
                  <TableHead className="w-24">Total</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No items added to this invoice
                    </TableCell>
                  </TableRow>
                ) : (
                  invoiceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(item.id, "name", e.target.value)
                          }
                          placeholder="Item name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "quantity",
                              e.target.value,
                            )
                          }
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(item.id, "price", e.target.value)
                          }
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="w-60 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Tax (%):</span>
                <Input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-20"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <span>${((subtotal * tax) / 100).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Discount (%):</span>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-20"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <span>-${((subtotal * discount) / 100).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="Additional notes"
              defaultValue={invoice?.notes || ""}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
