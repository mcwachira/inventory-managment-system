"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: "percentage" | "fixed";
  applicable: string;
}

const TaxesCurrenciesSettings = () => {
  const [currencySettings, setCurrencySettings] = useState({
    baseCurrency: "USD",
    currencySymbol: "$",
    currencyPosition: "before" as "before" | "after",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    enableMultiCurrency: false,
  });

  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    {
      id: "1",
      name: "Sales Tax",
      rate: 8.25,
      type: "percentage",
      applicable: "Sales",
    },
    { id: "2", name: "VAT", rate: 20, type: "percentage", applicable: "All" },
    {
      id: "3",
      name: "Service Tax",
      rate: 5,
      type: "percentage",
      applicable: "Services",
    },
  ]);

  const [newTaxRate, setNewTaxRate] = useState({
    name: "",
    rate: 0,
    type: "percentage" as "percentage" | "fixed",
    applicable: "All",
  });

  const { toast } = useToast();

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ];

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
  ];

  const handleCurrencyChange = (field: string, value: any) => {
    setCurrencySettings((prev) => ({ ...prev, [field]: value }));

    if (field === "baseCurrency") {
      const currency = currencies.find((c) => c.code === value);
      if (currency) {
        setCurrencySettings((prev) => ({
          ...prev,
          currencySymbol: currency.symbol,
        }));
      }
    }
  };

  const handleAddTaxRate = () => {
    if (!newTaxRate.name || newTaxRate.rate <= 0) {
      toast({
        title: "Error",
        description: "Please provide a valid tax name and rate.",
        variant: "destructive",
      });
      return;
    }

    const taxRate: TaxRate = {
      id: `tax${Date.now()}`,
      ...newTaxRate,
    };

    setTaxRates((prev) => [...prev, taxRate]);
    setNewTaxRate({ name: "", rate: 0, type: "percentage", applicable: "All" });

    toast({
      title: "Tax rate added",
      description: "New tax rate has been added successfully.",
    });
  };

  const handleDeleteTaxRate = (id: string) => {
    setTaxRates((prev) => prev.filter((rate) => rate.id !== id));
    toast({
      title: "Tax rate removed",
      description: "Tax rate has been removed successfully.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Tax and currency settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Currency Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Currency Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base-currency">Base Currency</Label>
            <Select
              value={currencySettings.baseCurrency}
              onValueChange={(value) =>
                handleCurrencyChange("baseCurrency", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-position">Currency Symbol Position</Label>
            <Select
              value={currencySettings.currencyPosition}
              onValueChange={(value: "before" | "after") =>
                handleCurrencyChange("currencyPosition", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Before amount ($100)</SelectItem>
                <SelectItem value="after">After amount (100$)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimal-places">Decimal Places</Label>
            <Select
              value={currencySettings.decimalPlaces.toString()}
              onValueChange={(value) =>
                handleCurrencyChange("decimalPlaces", parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 (100)</SelectItem>
                <SelectItem value="2">2 (100.00)</SelectItem>
                <SelectItem value="3">3 (100.000)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thousands-separator">Thousands Separator</Label>
            <Select
              value={currencySettings.thousandsSeparator}
              onValueChange={(value) =>
                handleCurrencyChange("thousandsSeparator", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=",">Comma (1,000)</SelectItem>
                <SelectItem value=".">Period (1.000)</SelectItem>
                <SelectItem value=" ">Space (1 000)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex items-center space-x-2">
            <Switch
              id="multi-currency"
              checked={currencySettings.enableMultiCurrency}
              onCheckedChange={(checked) =>
                handleCurrencyChange("enableMultiCurrency", checked)
              }
            />
            <Label htmlFor="multi-currency">
              Enable Multi-Currency Support
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Tax Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tax Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="tax-name">Tax Name</Label>
              <Input
                id="tax-name"
                value={newTaxRate.name}
                onChange={(e) =>
                  setNewTaxRate((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Sales Tax"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Rate</Label>
              <Input
                id="tax-rate"
                type="number"
                step="0.01"
                value={newTaxRate.rate}
                onChange={(e) =>
                  setNewTaxRate((prev) => ({
                    ...prev,
                    rate: parseFloat(e.target.value) || 0,
                  }))
                }
                placeholder="8.25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-type">Type</Label>
              <Select
                value={newTaxRate.type}
                onValueChange={(value: "percentage" | "fixed") =>
                  setNewTaxRate((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Action</Label>
              <Button onClick={handleAddTaxRate} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Applicable To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.name}</TableCell>
                  <TableCell>
                    {rate.rate}
                    {rate.type === "percentage"
                      ? "%"
                      : currencySettings.currencySymbol}
                  </TableCell>
                  <TableCell className="capitalize">{rate.type}</TableCell>
                  <TableCell>{rate.applicable}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTaxRate(rate.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Regional Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="America/New_York">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select defaultValue="MM/DD/YYYY">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default TaxesCurrenciesSettings;
