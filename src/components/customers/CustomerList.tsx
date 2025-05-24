"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash } from "lucide-react";
import CustomerDialog from "./CustomerDialog";
import CustomerDetailDialog from "./CustomerDetailDialog";
import { mockCustomers } from "@/lib/data";

interface CustomerListProps {
  type: "customer" | "vendor";
}

const CustomerList = ({ type }: CustomerListProps) => {
  const [editCustomer, setEditCustomer] = useState<any | null>(null);
  const [viewCustomer, setViewCustomer] = useState<any | null>(null);

  const isCustomer = type === "customer";

  const filteredCustomers = mockCustomers.filter((c) =>
    isCustomer ? c.type === "customer" : c.type === "vendor",
  );
  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No {isCustomer ? "customers" : "vendors"} found
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {customer.address}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewCustomer(customer)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditCustomer(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomerDialog
        isOpen={!!editCustomer}
        onClose={() => setEditCustomer(null)}
        type={type}
        customer={editCustomer}
      />

      <CustomerDetailDialog
        isOpen={!!viewCustomer}
        onClose={() => setViewCustomer(null)}
        customer={viewCustomer}
      />
    </div>
  );
};

export default CustomerList;
