"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShipmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentToEdit?: any;
}

const carriers = [
  { id: "fedex", name: "FedEx", services: ["Express", "Ground", "Overnight"] },
  {
    id: "ups",
    name: "UPS",
    services: ["Ground", "Next Day Air", "2nd Day Air"],
  },
  {
    id: "dhl",
    name: "DHL",
    services: ["Express", "International Express", "Ground"],
  },
  {
    id: "usps",
    name: "USPS",
    services: ["Priority Mail", "Express Mail", "Ground Advantage"],
  },
];

export const ShipmentDialog = ({
  isOpen,
  onClose,
  shipmentToEdit,
}: ShipmentDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orderNumber: "",
    carrier: "",
    service: "",
    recipientName: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "",
    recipientZip: "",
    recipientCountry: "US",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",
    signatureRequired: false,
    insuranceAmount: "",
    specialInstructions: "",
  });

  const selectedCarrier = carriers.find((c) => c.id === formData.carrier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Shipment Data:", {
      ...formData,
      trackingNumber: `TRK${Date.now()}`,
      status: "pending",
      createdDate: new Date().toISOString(),
    });

    toast({
      title: "Shipment Created",
      description: "Shipment has been created and ready for processing.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {shipmentToEdit ? "Edit Shipment" : "Create New Shipment"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderNumber">Order Number *</Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orderNumber: e.target.value,
                    }))
                  }
                  placeholder="SO-2023-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="declaredValue">Declared Value</Label>
                <Input
                  id="declaredValue"
                  type="number"
                  step="0.01"
                  value={formData.declaredValue}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      declaredValue: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Carrier & Service
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carrier">Carrier *</Label>
                <Select
                  value={formData.carrier}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      carrier: value,
                      service: "",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map((carrier) => (
                      <SelectItem key={carrier.id} value={carrier.id}>
                        {carrier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="service">Service *</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, service: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCarrier?.services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="recipientAddress">Address *</Label>
                <Input
                  id="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientAddress: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="recipientCity">City *</Label>
                  <Input
                    id="recipientCity"
                    value={formData.recipientCity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recipientCity: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recipientState">State *</Label>
                  <Input
                    id="recipientState"
                    value={formData.recipientState}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recipientState: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recipientZip">ZIP Code *</Label>
                  <Input
                    id="recipientZip"
                    value={formData.recipientZip}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recipientZip: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recipientCountry">Country *</Label>
                  <Select
                    value={formData.recipientCountry}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        recipientCountry: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="MX">Mexico</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (lbs) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="length">Length (in)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={formData.length}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        length: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (in)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        width: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (in)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        height: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialInstructions: e.target.value,
                    }))
                  }
                  placeholder="Any special handling instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {shipmentToEdit ? "Update Shipment" : "Create Shipment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShipmentDialog;
