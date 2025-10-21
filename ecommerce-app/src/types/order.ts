export interface Order {
  id: string;
  user_id: string;
  seller_id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address: string;
  payment_status: "pending" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CreateOrderDTO {
  items: {
    product_id: string;
    quantity: number;
  }[];
  shipping_address: string;
}

export interface UpdateOrderDTO {
  id: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status?: "pending" | "completed" | "failed";
}
