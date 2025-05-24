"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserPlus, Search, FileText, Download } from "lucide-react";
import CustomerList from "@/components/customers/CustomerList";
import { useToast } from "@/hooks/use-toast";
import CustomerDialog from "@/components/customers/CustomerDialog";

const Customers = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("customers");

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
          Customers Management
        </h1>

        <p className="text-gray-500">
          Manage your customers and their informations
        </p>
      </div>

      <Tabs
        defaultValue="customers"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <form action="" onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />

              <Button type="submit" variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Button onClick={handleAddNew}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="customers" className="mt-0">
          <CustomerList type="customer" />
        </TabsContent>

        <TabsContent value="vendors" className="mt-0">
          <CustomerList type="vendor" />
        </TabsContent>
      </Tabs>

      <CustomerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type={activeTab === "customers" ? "customer" : "vendor"}
      />
    </>
  );
};

export default Customers;
