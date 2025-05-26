"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { X, Filter, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface InvoiceFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export const InvoiceFilters = ({ onFiltersChange }: InvoiceFiltersProps) => {
  const [filters, setFilters] = useState({
    status: "all",
    customer: "",
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    amountMin: "",
    amountMax: "",
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update active filters - exclude 'all' status and empty values
    const newActiveFilters = Object.entries(newFilters)
      .filter(([filterKey, val]) => {
        if (filterKey === "status" && val === "all") return false;
        return val !== "" && val !== undefined && val !== "all";
      })
      .map(([key, _]) => key);
    setActiveFilters(newActiveFilters);
  };

  const clearFilter = (key: string) => {
    if (key === "status") {
      handleFilterChange(key, "all");
    } else {
      handleFilterChange(key, key.includes("date") ? undefined : "");
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: "all",
      customer: "",
      dateFrom: undefined,
      dateTo: undefined,
      amountMin: "",
      amountMax: "",
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Invoices
        </h3>
        {activeFilters.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Customer</Label>
          <Input
            placeholder="Customer name"
            value={filters.customer}
            onChange={(e) => handleFilterChange("customer", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Date From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateFrom
                  ? format(filters.dateFrom, "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateFrom}
                onSelect={(date) => handleFilterChange("dateFrom", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Date To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateTo}
                onSelect={(date) => handleFilterChange("dateTo", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Amount Range</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.amountMin}
              onChange={(e) => handleFilterChange("amountMin", e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.amountMax}
              onChange={(e) => handleFilterChange("amountMax", e.target.value)}
            />
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filterKey) => (
            <Badge
              key={filterKey}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filterKey}:{" "}
              {filterKey.includes("date") &&
              filters[filterKey as keyof typeof filters]
                ? format(
                    filters[filterKey as keyof typeof filters] as Date,
                    "MMM dd, yyyy",
                  )
                : String(filters[filterKey as keyof typeof filters])}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => clearFilter(filterKey)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceFilters;
