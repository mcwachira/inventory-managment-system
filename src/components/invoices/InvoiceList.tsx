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
import { Edit, FileText, Printer, Mail, Trash } from "lucide-react";
import InvoiceDialog from "./InvoiceDialog";
import InvoiceViewDialog from "./InvoiceViewDialog";
import { mockInvoices } from "@/lib/data";
import { Checkbox } from "@radix-ui/react-checkbox";

interface InvoiceListProps {
  searchTerm: string;
  selectedInvoices: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  filters: any;
}

const InvoiceList = ({
  searchTerm,
  selectedInvoices,
  onSelectionChange,
  filters,
}: InvoiceListProps) => {
  const [editInvoice, setEditInvoice] = useState<any | null>(null);
  const [viewInvoice, setViewInvoice] = useState<any | null>(null);

  // Filter invoices based on search term and filters
  const filteredInvoices = mockInvoices.filter((invoice) => {
    // Search filter
    if (
      searchTerm &&
      !invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (
      filters.status &&
      filters.status !== "all" &&
      invoice.status !== filters.status
    ) {
      return false;
    }

    // Customer filter
    if (
      filters.customer &&
      !invoice.customerName
        .toLowerCase()
        .includes(filters.customer.toLowerCase())
    ) {
      return false;
    }

    // Add more filter logic as needed for date ranges and amounts

    return true;
  });

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedInvoices, invoiceId]);
    } else {
      onSelectionChange(selectedInvoices.filter((id) => id !== invoiceId));
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "sent":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedInvoices.length === filteredInvoices.length &&
                  filteredInvoices.length > 0
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectionChange(
                      filteredInvoices.map((invoice) => invoice.id),
                    );
                  } else {
                    onSelectionChange([]);
                  }
                }}
              />
            </TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={(checked) =>
                      handleSelectInvoice(invoice.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>
                  {new Date(invoice.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusClass(invoice.status)}`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewInvoice(invoice)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditInvoice(invoice)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
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

      <InvoiceDialog
        isOpen={!!editInvoice}
        onClose={() => setEditInvoice(null)}
        invoice={editInvoice}
      />

      <InvoiceViewDialog
        isOpen={!!viewInvoice}
        onClose={() => setViewInvoice(null)}
        invoice={viewInvoice}
      />
    </div>
  );
};

export default InvoiceList;
