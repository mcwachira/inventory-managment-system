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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Printer, Download, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShippingLabelDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShippingLabelDialog = ({
  isOpen,
  onClose,
}: ShippingLabelDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orderNumber: "",
    carrier: "fedex",
    service: "ground",
    labelFormat: "4x6",
    includeReturnLabel: false,
    signatureRequired: false,
    insurance: false,
    insuranceAmount: "",
  });

  const handleGenerate = () => {
    console.log("Generating shipping label:", formData);
    toast({
      title: "Shipping Label Generated",
      description: "Your shipping label has been created successfully.",
    });
  };

  const handlePrint = () => {
    console.log("Printing shipping label");
    toast({
      title: "Printing Label",
      description: "Shipping label is being sent to printer.",
    });
  };

  const handleDownload = () => {
    console.log("Downloading shipping label");
    toast({
      title: "Downloading Label",
      description: "Shipping label PDF is being downloaded.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Shipping Label
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Label Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderNumber">Order Number</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="labelFormat">Label Format</Label>
                  <Select
                    value={formData.labelFormat}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, labelFormat: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4x6">4" x 6" (Standard)</SelectItem>
                      <SelectItem value="4x8">4" x 8" (Large)</SelectItem>
                      <SelectItem value="8.5x11">
                        8.5" x 11" (Letter)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carrier">Carrier</Label>
                  <Select
                    value={formData.carrier}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, carrier: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedex">FedEx</SelectItem>
                      <SelectItem value="ups">UPS</SelectItem>
                      <SelectItem value="dhl">DHL</SelectItem>
                      <SelectItem value="usps">USPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, service: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ground">Ground</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="overnight">Overnight</SelectItem>
                      <SelectItem value="2day">2-Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeReturnLabel"
                    checked={formData.includeReturnLabel}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        includeReturnLabel: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="includeReturnLabel">
                    Include return label
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="signatureRequired"
                    checked={formData.signatureRequired}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        signatureRequired: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="signatureRequired">
                    Signature required on delivery
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={formData.insurance}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        insurance: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="insurance">Add insurance</Label>
                </div>

                {formData.insurance && (
                  <div className="ml-6">
                    <Label htmlFor="insuranceAmount">
                      Insurance Amount ($)
                    </Label>
                    <Input
                      id="insuranceAmount"
                      type="number"
                      step="0.01"
                      value={formData.insuranceAmount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          insuranceAmount: e.target.value,
                        }))
                      }
                      placeholder="0.00"
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Label Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Label Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Label preview will appear here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Format: {formData.labelFormat} • Carrier:{" "}
                  {formData.carrier.toUpperCase()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleGenerate}>
                Generate Label
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingLabelDialog;
