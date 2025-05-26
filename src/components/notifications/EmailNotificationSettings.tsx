"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Bell, AlertTriangle, Package, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailNotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    paymentReceived: true,
    orderUpdates: true,
    invoiceReminders: true,
    shipmentUpdates: false,
    marketingEmails: false,
    notificationEmail: "admin@company.com",
    frequency: "immediate",
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const notificationTypes = [
    {
      key: "lowStockAlerts",
      icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
      title: "Low Stock Alerts",
      description: "Get notified when inventory levels are low",
    },
    {
      key: "paymentReceived",
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
      title: "Payment Notifications",
      description: "Notifications when payments are received",
    },
    {
      key: "orderUpdates",
      icon: <Package className="h-4 w-4 text-blue-500" />,
      title: "Order Updates",
      description: "Updates on order status changes",
    },
    {
      key: "invoiceReminders",
      icon: <Mail className="h-4 w-4 text-purple-500" />,
      title: "Invoice Reminders",
      description: "Automatic invoice payment reminders",
    },
    {
      key: "shipmentUpdates",
      icon: <Package className="h-4 w-4 text-orange-500" />,
      title: "Shipment Updates",
      description: "Tracking and delivery notifications",
    },
    {
      key: "marketingEmails",
      icon: <Mail className="h-4 w-4 text-pink-500" />,
      title: "Marketing Emails",
      description: "Product updates and promotional content",
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="font-medium">
              Email Notifications
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable or disable all email notifications
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>

        <Separator />

        {/* Notification Email */}
        <div className="space-y-2">
          <Label htmlFor="notification-email">Notification Email</Label>
          <Input
            id="notification-email"
            type="email"
            value={settings.notificationEmail}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                notificationEmail: e.target.value,
              }))
            }
            placeholder="Enter email address"
          />
        </div>

        <Separator />

        {/* Individual Notification Types */}
        <div className="space-y-4">
          <h3 className="font-medium">Notification Types</h3>
          {notificationTypes.map((type) => (
            <div
              key={type.key}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-start gap-3">
                {type.icon}
                <div>
                  <Label className="font-medium">{type.title}</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={
                  settings.emailNotifications &&
                  (settings[type.key as keyof typeof settings] as boolean)
                }
                onCheckedChange={() => handleToggle(type.key)}
                disabled={!settings.emailNotifications}
              />
            </div>
          ))}
        </div>

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailNotificationSettings;
