"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Invoice } from "@/lib/data";
import { Edit, Printer, Mail, Download, Loader2 } from "lucide-react";
import { downloadInvoicePDF } from "@/lib/pdfUtils";
import InvoiceEmailDialog from "./InvoiceEmailDialog";

interface InvoiceViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const InvoiceViewDialog = ({
  isOpen,
  onClose,
  invoice,
}: InvoiceViewDialogProps) => {
  const { toast } = useToast();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    setIsEmailDialogOpen(true);
  };

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadInvoicePDF(invoice);
      toast({
        title: "PDF Downloaded",
        description: "Invoice PDF has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Invoice #{invoice.invoiceNumber}</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleEmail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button size="sm" variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownload}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  PDF
                </Button>
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 border rounded-md">
            {/* Invoice Header */}
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  INVOICE
                </h2>
                <p className="text-gray-500">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Goods in Motion</h3>
                <p className="text-gray-500">123 Inventory Street</p>
                <p className="text-gray-500">Warehouse City, WC 12345</p>
                <p className="text-gray-500">contact@goodsinmotion.com</p>
              </div>
            </div>

            {/* Invoice Info */}
            <div className="flex justify-between mb-8">
              <div>
                <h3 className="font-bold mb-1">Bill To:</h3>
                <p className="text-gray-700">{invoice.customerName}</p>
                <p className="text-gray-500">
                  {invoice.customerAddress || "123 Client Street"}
                </p>
                <p className="text-gray-500">
                  {invoice.customerCity || "Client City, CC 54321"}
                </p>
                <p className="text-gray-500">
                  {invoice.customerEmail || "client@example.com"}
                </p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="font-medium">Invoice Date: </span>
                  <span>{new Date(invoice.date).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Due Date: </span>
                  <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : invoice.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Item</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items &&
                  invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">{item.description}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Invoice Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-1">
                  <span>Subtotal:</span>
                  <span>
                    $
                    {(invoice.amount - invoice.tax + invoice.discount).toFixed(
                      2,
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Tax:</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Discount:</span>
                  <span>-${invoice.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 font-bold border-t border-gray-200">
                  <span>Total:</span>
                  <span>${invoice.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-gray-600">
                {invoice.notes || "Thank you for your business!"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <InvoiceEmailDialog
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        invoice={invoice}
      />
    </>
  );
};

export default InvoiceViewDialog;
