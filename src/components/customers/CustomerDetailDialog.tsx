import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Mail, Printer } from "lucide-react";
import { Customer } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomerDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const CustomerDetailDialog = ({
  isOpen,
  onClose,
  customer,
}: CustomerDetailDialogProps) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className=" mt-4">
          <DialogTitle className="flex justify-between">
            <span className="mt-2">Customer Details</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
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
              <h3 className="font-medium text-gray-800">{customer.name}</h3>
              <p className="text-gray-600">{customer.company}</p>
              <p className="text-gray-600">{customer.email}</p>
              <p className="text-gray-600">{customer.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Customer ID: {customer.id}</p>
              <p className="text-gray-600">
                Status:
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    customer.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {customer.status}
                </span>
              </p>
              <p className="text-gray-600">
                Since: {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Address:</span>{" "}
                      {customer.address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span>{" "}
                      {customer.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span>{" "}
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Billing Details</h4>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Tax ID:</span>{" "}
                      {customer.taxId || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Payment Terms:</span>{" "}
                      {customer.paymentTerms || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Billing Address:</span>{" "}
                      {customer.billingAddress || "Same as contact address"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-gray-700">
                  {customer.notes || "No notes available"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.transactions && customer.transactions.length > 0 ? (
                    customer.transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No transaction history found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="attachments">
            <div className="mt-4">
              {customer.attachments && customer.attachments.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {customer.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="border rounded-md p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-gray-500">
                          {attachment.type} • Added{" "}
                          {new Date(attachment.dateAdded).toLocaleDateString()}
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
  );
};

export default CustomerDetailDialog;
