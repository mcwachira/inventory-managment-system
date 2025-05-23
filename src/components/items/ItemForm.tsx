"use client";
import React, { useState, useEffect } from "react";
import { mockItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

interface ItemFormProps {
  itemId?: string;
}

const ItemForm = ({ itemId }: ItemFormProps) => {
  // Find item if in edit mode
  const existingItem = itemId
    ? mockItems.find((i) => i.id.toString() === itemId)
    : null;

  // Form state
  const [formData, setFormData] = useState({
    name: existingItem?.name || "",
    sku: existingItem?.sku || "",
    category: existingItem?.category || "",
    brand: existingItem?.brand || "",
    price: existingItem?.price || 0,
    stock: existingItem?.stockQuantity || 0,
    reorderLevel: existingItem?.reorderLevel || 0,
    description: existingItem?.description || "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "price" || id === "stock" || id === "reorderLevel"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would normally save the data to your backend
    // For now, we'll just show a success message and redirect

    toast({
      title: itemId ? "Item Updated" : "Item Created",
      description: `Successfully ${itemId ? "updated" : "created"} item "${formData.name}"`,
    });

    // Redirect to items list
    redirect("/items");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{itemId ? "Edit Item" : "Add New Item"}</CardTitle>

        <CardDescription>
          {itemId
            ? "Update item details in your inventory"
            : "Enter item details to add to inventory"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. IT-001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => handleSelectChange("brand", value)}
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techgear">TechGear</SelectItem>
                  <SelectItem value="viewclear">ViewClear</SelectItem>
                  <SelectItem value="connectpro">ConnectPro</SelectItem>
                  <SelectItem value="soundwave">SoundWave</SelectItem>
                  <SelectItem value="ergopro">ErgoPro</SelectItem>
                  <SelectItem value="datafast">DataFast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id="price"
                  type="number"
                  className="pl-7"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                type="number"
                placeholder="0"
                value={formData.reorderLevel}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter item description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="space-y-2">
            <Label>Item Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="space-y-2">
                <div className="text-gray-500">Drag and drop an image or</div>
                <Button variant="outline" type="button">
                  Browse Files
                </Button>
                <div className="text-xs text-gray-500">PNG, JPG up to 5MB</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/items")}
            >
              Cancel
            </Button>
            <Button type="submit">{itemId ? "Update Item" : "Add Item"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
