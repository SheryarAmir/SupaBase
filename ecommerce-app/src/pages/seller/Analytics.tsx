import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

const salesData = [
  { period: "Week 1", sales: 2400, orders: 24 },
  { period: "Week 2", sales: 3200, orders: 32 },
  { period: "Week 3", sales: 2800, orders: 28 },
  { period: "Week 4", sales: 4100, orders: 41 },
];

const categoryData = [
  { name: "Electronics", value: 45, color: "from-primary to-accent" },
  { name: "Clothing", value: 25, color: "from-success to-emerald-400" },
  { name: "Home & Garden", value: 15, color: "from-warning to-yellow-400" },
  { name: "Sports", value: 15, color: "from-accent to-purple-400" },
];

export function Analytics() {
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Sales</h1>
        <p className="text-muted-foreground mt-2">
          Track your store performance and insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Order Value
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${avgOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" />
              -2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>
              Sales performance over the last 4 weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 p-4">
              {salesData.map((data, index) => {
                const maxSales = Math.max(...salesData.map((d) => d.sales));
                const height = (data.sales / maxSales) * 100;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 gap-2"
                  >
                    <div className="text-sm font-medium text-muted-foreground">
                      ${(data.sales / 1000).toFixed(1)}k
                    </div>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-muted-foreground">
                      {data.period}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Revenue distribution across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      {category.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} transition-all`}
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
