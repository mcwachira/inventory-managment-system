import React from "react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">Ksh 24,780</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12.5% from last month</span>
              </div>
            </div>
            <div className="p-2 bg-blue-100 text-inventory-primary rounded-lg">
              <ShoppingCart size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 ">
            Items in Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">1,423</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>4.2% from last month</span>
              </div>
            </div>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Package size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">$175,962</div>
              <div className="flex items-center text-sm text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>2.3% from last month</span>
              </div>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">387</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>9.1% from last month</span>
              </div>
            </div>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Users size={24} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
