"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FilePlus, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PurchaseOrderDialog from "@/components/purchases/PurchaseOrderDialog";
import PurchaseOrderList from "@/components/purchases/PurchaseOrderList";

const Purchases = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNew = () => {
    setIsDialogOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${search}"`,
    });
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Purchase Management
        </h1>
        <p className="text-gray-500">
          Create and manage purchase orders, track bills, and manage suppliers
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">All Purchase Orders</h2>
        </div>

        <div className="flex space-x-2">
          <form action="" onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search purchase orders..."
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
            <FilePlus className="h-4 w-4 mr-2" />
            New Purchase Order
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-md shadow">
        <PurchaseOrderList />
      </div>

      <PurchaseOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Purchases;
