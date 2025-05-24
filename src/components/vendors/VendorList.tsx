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
import CustomerDialog from "../customers/CustomerDialog";
import VendorDetailDialog from "./VendorDetailDialog";
import { mockCustomers } from "@/lib/data";

const VendorList = () => {
  const [editVendor, setEditVendor] = useState<any | null>(null);
  const [viewVendor, setViewVendor] = useState<any | null>(null);

  // Filter only vendors from the mockCustomers data
  const vendors = mockCustomers.filter((c) => c.type === "vendor");
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No vendors found
              </TableCell>
            </TableRow>
          ) : (
            vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.company || "-"}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      vendor.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewVendor(vendor)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditVendor(vendor)}
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
        isOpen={!!editVendor}
        onClose={() => setEditVendor(null)}
        type="vendor"
        customer={editVendor}
      />

      <VendorDetailDialog
        isOpen={!!viewVendor}
        onClose={() => setViewVendor(null)}
        vendor={viewVendor}
      />
    </div>
  );
};

export default VendorList;
