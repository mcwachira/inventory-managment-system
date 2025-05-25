"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { mockWarehouses } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface WarehouseConfig {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  email: string;
  capacity: number;
  status: "active" | "inactive";
  autoReorder: boolean;
  lowStockAlert: boolean;
}

const WarehouseSettings = () => {
  const [warehouses, setWarehouses] = useState(mockWarehouses);

  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    manager: "",
    phone: "",
    email: "",
    capacity: 0,
    status: "active" as "active" | "inactive",
    autoReorder: false,
    lowStockAlert: true,
  });

  const [inventorySettings, setInventorySettings] = useState({
    defaultReorderLevel: 10,
    autoCreatePO: false,
    requireApproval: true,
    enableBarcodeScanning: true,
    trackSerialNumbers: false,
    enableLocationTracking: true,
  });

  const { toast } = useToast();

  const handleAddWarehouse = () => {
    if (!newWarehouse.name || !newWarehouse.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const warehouse: WarehouseConfig = {
      id: `w${Date.now()}`,
      ...newWarehouse,
    };

    setWarehouses((prev) => [...prev, warehouse]);
    setNewWarehouse({
      name: "",
      location: "",
      manager: "",
      phone: "",
      email: "",
      capacity: 0,
      status: "active",
      autoReorder: false,
      lowStockAlert: true,
    });
    setIsAddWarehouseOpen(false);

    toast({
      title: "Warehouse added",
      description: `${newWarehouse.name} has been added successfully.`,
    });
  };

  const handleDeleteWarehouse = (id: string) => {
    setWarehouses((prev) => prev.filter((warehouse) => warehouse.id !== id));
    toast({
      title: "Warehouse removed",
      description: "Warehouse has been removed successfully.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Warehouse settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Warehouse Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Warehouse Locations</CardTitle>
          <Dialog
            open={isAddWarehouseOpen}
            onOpenChange={setIsAddWarehouseOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Warehouse
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Warehouse</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse-name">Warehouse Name</Label>
                  <Input
                    id="warehouse-name"
                    value={newWarehouse.name}
                    onChange={(e) =>
                      setNewWarehouse((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter warehouse name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse-location">Location</Label>
                  <Input
                    id="warehouse-location"
                    value={newWarehouse.location}
                    onChange={(e) =>
                      setNewWarehouse((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse-manager">Manager</Label>
                  <Input
                    id="warehouse-manager"
                    value={newWarehouse.manager}
                    onChange={(e) =>
                      setNewWarehouse((prev) => ({
                        ...prev,
                        manager: e.target.value,
                      }))
                    }
                    placeholder="Manager name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse-capacity">Capacity (sq ft)</Label>
                  <Input
                    id="warehouse-capacity"
                    type="number"
                    value={newWarehouse.capacity}
                    onChange={(e) =>
                      setNewWarehouse((prev) => ({
                        ...prev,
                        capacity: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="10000"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddWarehouseOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddWarehouse}>Add Warehouse</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">
                    {warehouse.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {warehouse.location}
                    </div>
                  </TableCell>
                  <TableCell>{warehouse.manager}</TableCell>
                  <TableCell>
                    {warehouse.capacity.toLocaleString()} sq ft
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        warehouse.status === "active" ? "default" : "secondary"
                      }
                    >
                      {warehouse.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Inventory Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Inventory Management Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="default-reorder">Default Reorder Level</Label>
              <Input
                id="default-reorder"
                type="number"
                value={inventorySettings.defaultReorderLevel}
                onChange={(e) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    defaultReorderLevel: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-create-po"
                checked={inventorySettings.autoCreatePO}
                onCheckedChange={(checked) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    autoCreatePO: checked,
                  }))
                }
              />
              <Label htmlFor="auto-create-po">
                Automatically create purchase orders when stock is low
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="require-approval"
                checked={inventorySettings.requireApproval}
                onCheckedChange={(checked) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    requireApproval: checked,
                  }))
                }
              />
              <Label htmlFor="require-approval">
                Require approval for high-value purchase orders
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="barcode-scanning"
                checked={inventorySettings.enableBarcodeScanning}
                onCheckedChange={(checked) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    enableBarcodeScanning: checked,
                  }))
                }
              />
              <Label htmlFor="barcode-scanning">
                Enable barcode scanning for inventory management
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="serial-numbers"
                checked={inventorySettings.trackSerialNumbers}
                onCheckedChange={(checked) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    trackSerialNumbers: checked,
                  }))
                }
              />
              <Label htmlFor="serial-numbers">
                Track serial numbers for individual items
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="location-tracking"
                checked={inventorySettings.enableLocationTracking}
                onCheckedChange={(checked) =>
                  setInventorySettings((prev) => ({
                    ...prev,
                    enableLocationTracking: checked,
                  }))
                }
              />
              <Label htmlFor="location-tracking">
                Enable detailed location tracking (aisle, shelf)
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default WarehouseSettings;
