"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  Filter,
} from "lucide-react";
import { mockCustomerActivities } from "@/lib/data";

const ActivityLog = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "proposal":
        return <FileText className="h-4 w-4" />;
      case "payment":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-600";
      case "call":
        return "bg-green-100 text-green-600";
      case "meeting":
        return "bg-purple-100 text-purple-600";
      case "proposal":
        return "bg-orange-100 text-orange-600";
      case "payment":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredActivities =
    selectedFilter === "all"
      ? mockCustomerActivities
      : mockCustomerActivities.filter(
          (activity) => activity.type === selectedFilter,
        );
  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <Tabs defaultValue="all" onValueChange={setSelectedFilter}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="email">Emails</TabsTrigger>
            <TabsTrigger value="call">Calls</TabsTrigger>
            <TabsTrigger value="meeting">Meetings</TabsTrigger>
            <TabsTrigger value="proposal">Proposals</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Tabs>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 border rounded-lg"
            >
              <div
                className={`p-2 rounded-full ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{activity.title}</h4>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600">{activity.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Customer: {activity.customer}</span>
                    <span>•</span>
                    <span>By: {activity.user}</span>
                  </div>
                  <span>{activity.timestamp.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calls Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Meetings Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityLog;
