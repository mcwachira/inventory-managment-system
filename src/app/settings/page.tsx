import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Bell,
  Users,
  Building2,
  DollarSign,
  Warehouse,
  Shield,
} from "lucide-react";
import CompanyProfileSettings from "@/components/settings/CompanyProfileSettings";
import UsersRolesSettings from "@/components/settings/UsersRolesSettings";
import AdminSettings from "@/components/settings/AdminSettings";
import TaxesCurrenciesSettings from "@/components/settings/TaxesCurrenciesSettings";
import WarehouseSettings from "@/components/settings/WarehouseSettings";
const SettingsPage = () => {
  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            {/* <SettingsIcon className="h-6 w-6 sm:h-8 sm:w-8" /> */}
            Settings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your system preferences and configurations
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Taxes</span>
            </TabsTrigger>
            <TabsTrigger value="warehouse" className="flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              <span className="hidden sm:inline">Warehouse</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>
                  Manage your company information and branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompanyProfileSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Users & Roles</CardTitle>
                <CardDescription>
                  Manage user accounts and role permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersRolesSettings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="taxes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Taxes & Currencies</CardTitle>
                <CardDescription>
                  Configure tax rates, currency settings, and regional
                  preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaxesCurrenciesSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warehouse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Configuration</CardTitle>
                <CardDescription>
                  Manage warehouse locations and inventory settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WarehouseSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Administrator Settings</CardTitle>
                <CardDescription>
                  System administration, security, and data management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsPage;
