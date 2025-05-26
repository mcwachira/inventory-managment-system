"use client";
import React, { useState } from "react";

import AdminSettings from "@/components/settings/AdminSettings";
import CompanyProfileSettings from "@/components/settings/CompanyProfileSettings";
import TaxesCurrenciesSettings from "@/components/settings/TaxesCurrenciesSettings";
import UsersRolesSettings from "@/components/settings/UsersRolesSettings";
import WarehouseSettings from "@/components/settings/WarehouseSettings";
import EmailNotificationSettings from "@/components/notifications/EmailNotificationSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Building,
  Building2,
  DollarSign,
  Settings as SettingsIcon,
  Shield,
  Users,
  Warehouse,
} from "lucide-react";
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            Settings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your system preferences and configurations
          </p>
        </div>

        <Tabs
          defaultValue="notifications"
          className="w-full"
          onValueChange={setActiveTab}
        >
          {/* Responsive Tabs */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 min-w-max">
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Notify</span>
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Company</span>
                <span className="sm:hidden">Co.</span>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Users</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="warehouse"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Warehouse className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Warehouse</span>
                <span className="sm:hidden">WH</span>
              </TabsTrigger>
              <TabsTrigger
                value="taxes"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <SettingsIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Taxes</span>
                <span className="sm:hidden">Tax</span>
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Admin</span>
                <span className="sm:hidden">Admin</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content - Responsive */}
          <div className="mt-6">
            <TabsContent value="notifications" className="mt-0">
              <div className="max-w-4xl">
                <EmailNotificationSettings />
              </div>
            </TabsContent>

            <TabsContent value="company" className="mt-0">
              <div className="max-w-4xl">
                <CompanyProfileSettings />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <div className="max-w-4xl">
                <UsersRolesSettings />
              </div>
            </TabsContent>

            <TabsContent value="warehouse" className="mt-0">
              <div className="max-w-4xl">
                <WarehouseSettings />
              </div>
            </TabsContent>

            <TabsContent value="taxes" className="mt-0">
              <div className="max-w-4xl">
                <TaxesCurrenciesSettings />
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-0">
              <div className="max-w-4xl">
                <AdminSettings />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsPage;
