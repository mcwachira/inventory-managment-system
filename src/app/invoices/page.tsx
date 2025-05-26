"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Plus, Search, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoiceDialog from "@/components/invoices/InvoiceDialog";
import InvoiceList from "@/components/invoices/InvoiceList";
import InvoiceFilters from "@/components/invoices/InvoiceFilters";
import InvoiceBulkActions from "@/components/invoices/InvoiceBulkActions";

const InvoicesPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filters, setFilters] = useState({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${search}"`,
    });
  };

  const handleCreateInvoice = () => {
    setIsDialogOpen(true);
  };

  const handleBulkDelete = () => {
    toast({
      title: "Invoices deleted",
      description: `${selectedInvoices.length} invoice(s) have been deleted.`,
    });
    setSelectedInvoices([]);
  };

  const handleBulkEmail = () => {
    toast({
      title: "Emails sent",
      description: `Emails sent for ${selectedInvoices.length} invoice(s).`,
    });
  };

  const handleBulkDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading ${selectedInvoices.length} invoice(s) as PDF.`,
    });
  };

  const handleSelectAll = () => {
    // This would select all visible invoices
    toast({
      title: "All invoices selected",
      description: "All visible invoices have been selected.",
    });
  };

  const handleClearSelection = () => {
    setSelectedInvoices([]);
  };

  console.log(filters);
  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Invoices
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Manage your invoices and billing
            </p>
          </div>
          <Button onClick={handleCreateInvoice} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Search and Actions - Responsive */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
            <Input
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="outline"
              size="icon"
              className="ml-2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Bulk Actions - Show when invoices are selected */}
          {selectedInvoices.length > 0 && (
            <div className="w-full lg:w-auto">
              <InvoiceBulkActions
                selectedCount={selectedInvoices.length}
                onDelete={handleBulkDelete}
                onEmail={handleBulkEmail}
                onDownload={handleBulkDownload}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
              />
            </div>
          )}
        </div>

        {/* Filters - Collapsible on mobile */}
        <div className="w-full">
          <InvoiceFilters onFiltersChange={setFilters} />
        </div>

        {/* Invoice List - Responsive */}
        <div className="w-full">
          <InvoiceList
            searchTerm={search}
            selectedInvoices={selectedInvoices}
            onSelectionChange={setSelectedInvoices}
            filters={filters}
          />
        </div>

        {/* Dialog */}
        <InvoiceDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </>
  );
};

export default InvoicesPage;
