export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "draft" | "out_of_stock";
  image?: string;
}

export interface Order {
  id: string;
  productName: string;
  buyer: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  total: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  recentOrders: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: FileList;
}

export interface ProfileFormData {
  storeName: string;
  email: string;
  bio: string;
  profileImage?: FileList;
}

export interface AccountFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
