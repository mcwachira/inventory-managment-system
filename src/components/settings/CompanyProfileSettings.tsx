"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanyProfileSettings = () => {
  const [companyData, setCompanyData] = useState({
    name: "Goods in Motion",
    email: "contact@goodsinmotion.com",
    phone: "+1 (555) 123-4567",
    website: "www.goodsinmotion.com",
    taxId: "TX-123456789",
    address: "123 Business Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    description: "Leading inventory management solutions provider",
    logo: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Settings saved",
      description: "Company profile has been updated successfully.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyData((prev) => ({
          ...prev,
          logo: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Logo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={companyData.logo} alt="Company Logo" />
              <AvatarFallback>
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </span>
                </Button>
              </Label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              value={companyData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-id">Tax ID</Label>
            <Input
              id="tax-id"
              value={companyData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={companyData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={companyData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={companyData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={companyData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Address Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={companyData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={companyData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={companyData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP/Postal Code</Label>
            <Input
              id="zip"
              value={companyData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={companyData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
export default CompanyProfileSettings;
