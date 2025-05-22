import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockActivities } from "@/lib/data";

const RecentActivities = () => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "stock_in":
        return (
          <div className="bg-green-100 text-green-600 p-2 rounded-full">📥</div>
        );
      case "order":
        return (
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">🛒</div>
        );
      case "shipment":
        return (
          <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
            🚚
          </div>
        );
      case "adjustment":
        return (
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
            ⚖️
          </div>
        );
      case "payment":
        return (
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
            💰
          </div>
        );
      case "item":
        return (
          <div className="bg-pink-100 text-pink-600 p-2 rounded-full">📦</div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-600 p-2 rounded-full">📌</div>
        );
    }
  };

  return (
    <Card className="col-span-1 mb-6">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest inventory activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {getActivityIcon(activity.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
