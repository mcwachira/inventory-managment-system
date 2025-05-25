"use client";
import ActivityLog from "@/components/crm/ActivityLog";
import CommunicationTemplates from "@/components/crm/CommunicationTemplates";
import CRMCustomerList from "@/components/crm/CRMCustomerList";
import CustomerEngagementDialog from "@/components/crm/CustomerEngagementDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Filter,
  Mail,
  MessageSquare,
  Search,
  UserPlus,
} from "lucide-react";
import React, { useState } from "react";

const CRMPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("customers");
  const [isEngagementDialogOpen, setIsEngagementDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${search}"`,
    });
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "customers":
        return "Customer Database";
      case "activities":
        return "Activity Logs";
      case "templates":
        return "Communication Templates";
      default:
        return "Customers";
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          CRM & Customer Engagement
        </h1>
        <p className="text-gray-500">
          Manage customer relationships and communications
        </p>
      </div>

      <Tabs
        defaultValue="customers"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder={`Search ${getTabContent()}...`}
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

            {activeTab === "customers" && (
              <Button onClick={() => setIsEngagementDialogOpen(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Engage Customer
              </Button>
            )}

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="customers" className="mt-0">
          <CRMCustomerList />
        </TabsContent>

        <TabsContent value="activities" className="mt-0">
          <ActivityLog />
        </TabsContent>

        <TabsContent value="templates" className="mt-0">
          <CommunicationTemplates />
        </TabsContent>
      </Tabs>
      <CustomerEngagementDialog
        isOpen={isEngagementDialogOpen}
        onClose={() => setIsEngagementDialogOpen(false)}
      />
    </>
  );
};

export default CRMPage;
