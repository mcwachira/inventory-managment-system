import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ReportsChartsProps {
  data: any[];
  reportType: string;
  isLoading: boolean;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const ReportsCharts = ({
  data,
  reportType,
  isLoading,
}: ReportsChartsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getChartData = () => {
    switch (reportType) {
      case "inventory":
        return {
          barData: [
            { name: "Electronics", value: 45, quantity: 120 },
            { name: "Clothing", value: 32, quantity: 85 },
            { name: "Books", value: 28, quantity: 200 },
            { name: "Home & Garden", value: 19, quantity: 65 },
            { name: "Sports", value: 15, quantity: 45 },
          ],
          lineData: [
            { month: "Jan", stock: 400, orders: 240 },
            { month: "Feb", stock: 300, orders: 320 },
            { month: "Mar", stock: 450, orders: 280 },
            { month: "Apr", stock: 380, orders: 350 },
            { month: "May", stock: 420, orders: 300 },
            { month: "Jun", stock: 350, orders: 400 },
          ],
          pieData: [
            { name: "In Stock", value: 65 },
            { name: "Low Stock", value: 20 },
            { name: "Out of Stock", value: 10 },
            { name: "Discontinued", value: 5 },
          ],
        };
      case "sales":
        return {
          barData: [
            { name: "Q1", value: 15000, quantity: 45 },
            { name: "Q2", value: 18000, quantity: 52 },
            { name: "Q3", value: 22000, quantity: 61 },
            { name: "Q4", value: 25000, quantity: 68 },
          ],
          lineData: [
            { month: "Jan", revenue: 12000, profit: 3000 },
            { month: "Feb", revenue: 15000, profit: 4200 },
            { month: "Mar", revenue: 18000, profit: 5100 },
            { month: "Apr", revenue: 16000, profit: 4800 },
            { month: "May", revenue: 20000, profit: 6000 },
            { month: "Jun", revenue: 22000, profit: 7200 },
          ],
          pieData: [
            { name: "Online", value: 45 },
            { name: "In-Store", value: 35 },
            { name: "Phone Orders", value: 15 },
            { name: "Wholesale", value: 5 },
          ],
        };
      default:
        return {
          barData: [],
          lineData: [],
          pieData: [],
        };
    }
  };

  const chartData = getChartData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Category Analysis</CardTitle>
          <CardDescription>Performance by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>Monthly trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={Object.keys(chartData.lineData[0] || {})[1]}
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey={Object.keys(chartData.lineData[0] || {})[2]}
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution</CardTitle>
          <CardDescription>Status distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsCharts;
