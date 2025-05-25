"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  FileText,
  DollarSign,
  RotateCcw,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SalesOrderDialog from "@/components/sales/SalesOrderDialog";
import SalesOrderList from "@/components/sales/SalesOrderList";
import QuoteDialog from "@/components/sales/OuoteDialog";
import SalesReturnDialog from "@/components/sales/SalesReturnDialog";
const Sales = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${search}"`,
    });
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "orders":
        return <DollarSign className="h-4 w-4" />;
      case "quotes":
        return <FileText className="h-4 w-4" />;
      case "returns":
        return <RotateCcw className="h-4 w-4" />;
      case "customers":
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "orders":
        return "New Sales Order";
      case "quotes":
        return "New Quote";
      case "returns":
        return "New Return";
      case "customers":
        return "New Customer";
      default:
        return "New";
    }
  };

  const handleAddNew = () => {
    switch (activeTab) {
      case "orders":
        setIsOrderDialogOpen(true);
        break;
      case "quotes":
        setIsQuoteDialogOpen(true);
        break;
      case "returns":
        setIsReturnDialogOpen(true);
        break;
      case "customers":
        toast({
          title: "Add Customer",
          description: "Customer management dialog would open here.",
        });
        break;
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Management</h1>
        <p className="text-gray-500">
          Create and manage sales orders and quotations
        </p>
      </div>

      <Tabs
        defaultValue="orders"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              {getTabIcon("orders")}
              <span className="hidden sm:inline">Sales Orders</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              {getTabIcon("quotes")}
              <span className="hidden sm:inline">Quotes</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center gap-2">
              {getTabIcon("returns")}
              <span className="hidden sm:inline">Returns</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              {getTabIcon("customers")}
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
              <Button type="submit" variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </form>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              {getAddButtonText()}
            </Button>
          </div>
        </div>

        <TabsContent value="orders" className="mt-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <SalesOrderList status="all" />
            </TabsContent>
            <TabsContent value="draft" className="mt-4">
              <SalesOrderList status="draft" />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <SalesOrderList status="pending" />
            </TabsContent>
            <TabsContent value="confirmed" className="mt-4">
              <SalesOrderList status="confirmed" />
            </TabsContent>
            <TabsContent value="shipped" className="mt-4">
              <SalesOrderList status="shipped" />
            </TabsContent>
            <TabsContent value="delivered" className="mt-4">
              <SalesOrderList status="delivered" />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="quotes" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Quotes & Estimates</p>
            <p className="text-gray-500 mb-4">
              Create and manage quotes for potential customers
            </p>
            <Button onClick={() => setIsQuoteDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Quote
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <RotateCcw className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Sales Returns</p>
            <p className="text-gray-500 mb-4">
              Process returns and issue credit notes
            </p>
            <Button onClick={() => setIsReturnDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Process Your First Return
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Customer Database</p>
            <p className="text-gray-500 mb-4">
              Manage customer information and transaction history
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <SalesOrderDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
      />

      <QuoteDialog
        isOpen={isQuoteDialogOpen}
        onClose={() => setIsQuoteDialogOpen(false)}
      />

      <SalesReturnDialog
        isOpen={isReturnDialogOpen}
        onClose={() => setIsReturnDialogOpen(false)}
      />
    </>
  );
};

export default Sales;
