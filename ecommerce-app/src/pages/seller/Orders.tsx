import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Order } from "@/types/dashboard";

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    productName: "Wireless Headphones",
    buyer: "John Doe",
    status: "delivered",
    date: "2025-01-15",
    total: 79.99,
  },
  {
    id: "ORD-002",
    productName: "Smart Watch Pro",
    buyer: "Jane Smith",
    status: "shipped",
    date: "2025-01-18",
    total: 299.99,
  },
  {
    id: "ORD-003",
    productName: "Running Shoes",
    buyer: "Mike Johnson",
    status: "processing",
    date: "2025-01-20",
    total: 89.99,
  },
  {
    id: "ORD-004",
    productName: "Yoga Mat Premium",
    buyer: "Sarah Williams",
    status: "pending",
    date: "2025-01-22",
    total: 34.99,
  },
  {
    id: "ORD-005",
    productName: "Coffee Maker Deluxe",
    buyer: "Tom Brown",
    status: "cancelled",
    date: "2025-01-19",
    total: 129.99,
  },
  {
    id: "ORD-006",
    productName: "Wireless Headphones",
    buyer: "Emily Davis",
    status: "delivered",
    date: "2025-01-14",
    total: 79.99,
  },
];

export function Orders() {
  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      pending: "secondary",
      processing: "default",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
    } as const;

    const labels = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const handleViewOrder = (orderId: string) => {
    alert(`View details for order: ${orderId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all customer orders
        </p>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>All orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOrder(order.id)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
