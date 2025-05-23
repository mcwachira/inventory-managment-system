"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockItems } from "@/lib/data";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const ItemDetails = ({ id }: { id: string }) => {
  // const { itemId } = useParams();

  console.log(id);
  // Find the item in mock data

  const item = mockItems.find((i) => i.id === id);

  if (!item) {
    return (
      <Alert variant="destructive" className="mt-4">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Item not found</AlertTitle>
        <AlertDescription>
          The item you&apos;'re looking for doesn&apos;'t exist or has been
          removed.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">{item.name}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge
                variant={item.status === "In Stock" ? "default" : "secondary"}
              >
                {item.status}
              </Badge>
              <Badge variant="outline">{item.category}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">
              ${item.sellingPrice.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Cost: ${item.costPrice.toFixed(2)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SKU:</span>
                      <span>{item.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Barcode:</span>
                      <span>{item.barcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand:</span>
                      <span>{item.brand}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>{item.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>{item.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="attributes">
                  <AccordionTrigger>Additional Attributes</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.attributes &&
                        Object.entries(item.attributes).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">
                              {key}:
                            </span>
                            <span>{value as string}</span>
                          </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Stock Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Current Stock:
                      </span>
                      <span>{item.stockQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Minimum Stock:
                      </span>
                      <span>{item.minStockLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Reorder Point:
                      </span>
                      <span>{item.reorderPoint}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Warehouse:</span>
                      <span>{item.location?.warehouse || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aisle:</span>
                      <span>{item.location?.aisle || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shelf:</span>
                      <span>{item.location?.shelf || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Alert>
                <AlertTitle>Transaction History</AlertTitle>
                <AlertDescription>
                  This feature will display the complete transaction history for
                  this item.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemDetails;
