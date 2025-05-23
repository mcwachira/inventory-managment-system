"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { PurchaseOrder } from "@/lib/data";
import { FileCheck } from "lucide-react";

interface ConvertToBillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrder: PurchaseOrder | null;
}

const ConvertToBillDialog = ({
  isOpen,
  onClose,
  purchaseOrder,
}: ConvertToBillDialogProps) => {
  const { toast } = useToast();
  const [billNumber, setBillNumber] = useState("");
  const [billDate, setBillDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );

  if (!purchaseOrder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Purchase Order Converted to Bill",
      description: `Bill #${billNumber} has been created successfully`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            <span>Convert to Bill</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm mb-4">
              You are converting Purchase Order #{purchaseOrder.poNumber} to a
              bill. This will mark the items as received and create a bill
              record for payment.
            </p>

            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Supplier:</span>
                <span className="text-sm">{purchaseOrder.supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">PO Total:</span>
                <span className="text-sm">
                  ${purchaseOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="billNumber">Bill Number</Label>
              <Input
                id="billNumber"
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                placeholder="Enter bill number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="billDate">Bill Date</Label>
                <Input
                  id="billDate"
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  required
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="billAmount">Amount</Label>
              <Input
                id="billAmount"
                type="number"
                defaultValue={purchaseOrder.total.toFixed(2)}
                step="0.01"
                min="0"
                required
              />
              <p className="text-xs text-gray-500">
                You can adjust the amount if the final bill differs from the
                purchase order.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Bill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConvertToBillDialog;
