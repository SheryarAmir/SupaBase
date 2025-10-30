"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
];

const productData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Books", value: 20 },
  { name: "Other", value: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

function SalesChart() {
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <div className="space-y-4">
      <div className="flex gap-8">
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-4">Sales</h3>
          <div className="space-y-3">
            {salesData.map((item) => (
              <div key={item.month} className="flex items-end gap-2">
                <span className="text-xs font-medium w-8">{item.month}</span>
                <div
                  className="flex-1 bg-blue-200 rounded h-8"
                  style={{ width: `${(item.sales / maxSales) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground w-12 text-right">
                  ${item.sales}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-4">Orders</h3>
          <div className="space-y-3">
            {salesData.map((item) => (
              <div key={item.month} className="flex items-end gap-2">
                <span className="text-xs font-medium w-8">{item.month}</span>
                <div
                  className="flex-1 bg-green-200 rounded h-8"
                  style={{ width: `${(item.orders / 240) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {item.orders}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PieChart() {
  const conic = `conic-gradient(
    ${COLORS[0]} 0% 35%,
    ${COLORS[1]} 35% 60%,
    ${COLORS[2]} 60% 80%,
    ${COLORS[3]} 80% 100%
  )`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-48 h-48 rounded-full" style={{ background: conic }} />
      <div className="space-y-2 w-full">
        {productData.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[idx] }}
            />
            <span className="text-sm">{item.name}</span>
            <span className="text-sm font-semibold ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your store performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">8 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales & Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">Order #{1000 + i}</p>
                  <p className="text-sm text-muted-foreground">Customer {i}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(Math.random() * 500 + 50).toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
