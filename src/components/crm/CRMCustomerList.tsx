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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mail, Phone, MessageSquare, Star, Calendar } from "lucide-react";
import { mockCustomers } from "@/lib/data";
import CustomerEngagementDialog from "./CustomerEngagementDialog";

const CRMCustomerList = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [isEngagementDialogOpen, setIsEngagementDialogOpen] = useState(false);

  const handleEngageCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEngagementDialogOpen(true);
  };

  const getCustomerScore = (customer: any) => {
    // Mock engagement score calculation
    const baseScore = Math.floor(Math.random() * 50) + 50;
    return baseScore;
  };

  const getLastContactDate = (customer: any) => {
    // Mock last contact date
    const days = Math.floor(Math.random() * 30) + 1;
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toLocaleDateString();
  };

  const customers = mockCustomers.filter((c) => c.type === "customer");
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">89% active rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">VIP customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+2% this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Engagement Score</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {customer.company}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary">VIP</Badge>
                    <Badge variant="outline">Regular</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(getCustomerScore(customer) / 20)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {getCustomerScore(customer)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    {getLastContactDate(customer)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "active" ? "default" : "secondary"
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEngageCustomer(customer)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomerEngagementDialog
        isOpen={isEngagementDialogOpen}
        onClose={() => setIsEngagementDialogOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CRMCustomerList;
