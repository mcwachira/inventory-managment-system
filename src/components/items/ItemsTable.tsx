"use client";

import React, { useState } from "react";
import { mockItems } from "@/lib/data";
import {
  Edit,
  Trash2,
  Plus,
  FileText,
  ArrowUpDown,
  Search,
  Filter,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStock, setFilterStock] = useState<string>("all");

  // Get unique categories for filter dropdown
  const categories = [...new Set(mockItems.map((item) => item.category))];
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Handle sort change
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort items
  const filteredItems = mockItems
    .filter((item) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        filterCategory === "all" || item.category === filterCategory;

      // Stock filter
      const matchesStock =
        filterStock === "all" ||
        (filterStock === "low" && item.stockQuantity <= item.reorderLevel) ||
        (filterStock === "in-stock" && item.stockQuantity > 0) ||
        (filterStock === "out-of-stock" && item.stockQuantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      // Custom sorting logic
      let comparison = 0;

      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "stock") {
        comparison = a.stockQuantity - b.stockQuantity;
      } else if (sortField === "price") {
        comparison = a.price - b.price;
      } else if (sortField === "updated") {
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Items</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" /> Export
          </Button>
          <Link href="/items/add">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search items..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStock} onValueChange={setFilterStock}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" /> More Filters
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Item Name</span>
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortField === "name" ? "text-primary" : ""}`}
                  />
                </div>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortField === "price" ? "text-primary" : ""}`}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("stock")}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortField === "stock" ? "text-primary" : ""}`}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("updated")}
              >
                <div className="flex items-center space-x-1">
                  <span>Updated</span>
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortField === "updated" ? "text-primary" : ""}`}
                  />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No items match your filters</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/items/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.warehouse || "Main Warehouse"}</TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={`font-medium ${item.stockQuantity <= item.reorderLevel ? "text-red-500" : "text-green-600"}`}
                      >
                        {item.stockQuantity}
                      </span>
                      {item.stockQuantity <= item.reorderLevel && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {formatDate(item.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Link href={`/items/${item.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredItems.length}</span>{" "}
          results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={filteredItems.length === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={filteredItems.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
