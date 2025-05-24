import React from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/lib/data";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "customer" | "vendor";
  customer?: Customer | null;
}

const CustomerDialog = ({
  isOpen,
  onClose,
  type,
  customer,
}: CustomerDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!customer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `${isEditing ? "Updated" : "Created"} successfully`,
      description: `${type === "customer" ? "Customer" : "Vendor"} has been ${isEditing ? "updated" : "created"}`,
    });
    onClose();
  };

  const title = isEditing
    ? `Edit ${type === "customer" ? "Customer" : "Vendor"}`
    : `Add New ${type === "customer" ? "Customer" : "Vendor"}`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="billing">Billing Details</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    defaultValue={customer?.name || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    defaultValue={customer?.company || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Additional notes"
                  defaultValue={customer?.notes || ""}
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    defaultValue={customer?.email || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    defaultValue={customer?.phone || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Full address"
                  defaultValue={customer?.address || ""}
                />
              </div>
            </TabsContent>
            <TabsContent value="billing" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / VAT</Label>
                  <Input
                    id="taxId"
                    placeholder="Tax identification number"
                    defaultValue={customer?.taxId || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Input
                    id="paymentTerms"
                    placeholder="e.g. Net 30"
                    defaultValue={customer?.paymentTerms || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input
                  id="billingAddress"
                  placeholder="Billing address (if different)"
                  defaultValue={customer?.billingAddress || ""}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
