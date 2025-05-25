"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Package,
  Truck,
  FileText,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ShipmentDialog from "@/components/shipping/ShipmentDialog";
import ShipmentList from "@/components/shipping/ShipmentList";
import PackingSlipDialog from "@/components/shipping/PackingSlipDialog";
import ShippingLabelDialog from "@/components/shipping/ShippingLabelDialog";
const ShippingPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("shipments");
  const [isShipmentDialogOpen, setIsShipmentDialogOpen] = useState(false);
  const [isPackingSlipDialogOpen, setIsPackingSlipDialogOpen] = useState(false);
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${search}"`,
    });
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "shipments":
        return <Package className="h-4 w-4" />;
      case "tracking":
        return <MapPin className="h-4 w-4" />;
      case "labels":
        return <FileText className="h-4 w-4" />;
      case "carriers":
        return <Truck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "shipments":
        return "New Shipment";
      case "labels":
        return "Create Label";
      default:
        return "New";
    }
  };

  const handleAddNew = () => {
    switch (activeTab) {
      case "shipments":
        setIsShipmentDialogOpen(true);
        break;
      case "labels":
        setIsLabelDialogOpen(true);
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: "This feature is under development.",
        });
    }
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Shipping & Fulfillment
            </h1>
            <p className="text-gray-500">
              Manage shipments, tracking, and delivery operations
            </p>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="shipments"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="shipments" className="flex items-center gap-2">
              {getTabIcon("shipments")}
              <span className="hidden sm:inline">Shipments</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              {getTabIcon("tracking")}
              <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="labels" className="flex items-center gap-2">
              {getTabIcon("labels")}
              <span className="hidden sm:inline">Labels</span>
            </TabsTrigger>
            <TabsTrigger value="carriers" className="flex items-center gap-2">
              {getTabIcon("carriers")}
              <span className="hidden sm:inline">Carriers</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder="Search shipments..."
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
            {(activeTab === "shipments" || activeTab === "labels") && (
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                {getAddButtonText()}
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="shipments" className="mt-0">
          <ShipmentList />
        </TabsContent>

        <TabsContent value="tracking" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <MapPin className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Package Tracking</p>
            <p className="text-gray-500 mb-4">
              Track shipments across multiple carriers
            </p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Track Package
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="labels" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Shipping Labels</p>
            <p className="text-gray-500 mb-4">
              Create and manage shipping labels
            </p>
            <Button onClick={() => setIsLabelDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Shipping Label
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="carriers" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <Truck className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Carrier Settings</p>
            <p className="text-gray-500 mb-4">
              Configure shipping carriers and rates
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Carrier
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <ShipmentDialog
        isOpen={isShipmentDialogOpen}
        onClose={() => setIsShipmentDialogOpen(false)}
      />

      <PackingSlipDialog
        isOpen={isPackingSlipDialogOpen}
        onClose={() => setIsPackingSlipDialogOpen(false)}
      />

      <ShippingLabelDialog
        isOpen={isLabelDialogOpen}
        onClose={() => setIsLabelDialogOpen(false)}
      />
    </>
  );
};

export default ShippingPage;
