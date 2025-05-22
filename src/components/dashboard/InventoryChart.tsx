"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { salesData } from "@/lib/data";

const InventoryChart = () => {
  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#4299E1", // your blue
    },
    purchases: {
      label: "Purchases",
      color: "#9F7AEA", // your purple
    },
  } satisfies ChartConfig;

  return (
    <Card className="col-span-1 lg:col-span-2 mb-6">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales and purchase trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="#4299E1" />
              <Bar dataKey="purchases" name="Purchases" fill="#9F7AEA" />
            </BarChart>
          </ResponsiveContainer> */}
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={salesData}>
              <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              <Bar
                dataKey="purchases"
                fill="var(--color-purchases)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryChart;
