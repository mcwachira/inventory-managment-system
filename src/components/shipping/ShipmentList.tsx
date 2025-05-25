"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  FileText,
  MoreHorizontal,
  Package,
  Truck,
  MapPin,
  Printer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockShipments } from "@/lib/data";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "exception":
      return "bg-red-100 text-red-800";
    case "returned":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCarrierIcon = (carrier: string) => {
  // In a real app, you'd have carrier-specific icons
  return <Truck className="h-4 w-4" />;
};

const ShipmentList = () => {
  const { toast } = useToast();
  const [shipments] = useState(mockShipments);

  const handleViewDetails = (shipment: any) => {
    console.log("Viewing shipment:", shipment);
    toast({
      title: "Shipment Details",
      description: `Opening details for ${shipment.trackingNumber}`,
    });
  };

  const handleTrackPackage = (shipment: any) => {
    console.log("Tracking package:", shipment);
    toast({
      title: "Package Tracking",
      description: `Tracking ${shipment.trackingNumber} with ${shipment.carrier}`,
    });
  };

  const handlePrintLabel = (shipment: any) => {
    console.log("Printing label:", shipment);
    toast({
      title: "Printing Label",
      description: `Printing shipping label for ${shipment.trackingNumber}`,
    });
  };

  const handleGeneratePackingSlip = (shipment: any) => {
    console.log("Generating packing slip:", shipment);
    toast({
      title: "Packing Slip",
      description: `Generating packing slip for ${shipment.orderNumber}`,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Shipments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Est. Delivery</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getCarrierIcon(shipment.carrier)}
                    {shipment.trackingNumber}
                  </div>
                </TableCell>
                <TableCell>{shipment.orderNumber}</TableCell>
                <TableCell>{shipment.customerName}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{shipment.carrier}</div>
                    <div className="text-sm text-gray-500">
                      {shipment.service}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(shipment.status)}>
                    {shipment.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.estimatedDelivery}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(shipment)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTrackPackage(shipment)}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Track Package
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePrintLabel(shipment)}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print Label
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleGeneratePackingSlip(shipment)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Packing Slip
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShipmentList;
