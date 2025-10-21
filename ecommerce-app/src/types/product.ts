import { Order } from "./order";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  seller_id: string;
  status: "active" | "inactive" | "out_of_stock";
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  status?: "active" | "inactive" | "out_of_stock";
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  created_at: string;
  updated_at: string;
}

export interface SellerStats {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  recent_orders?: Order[];
}
