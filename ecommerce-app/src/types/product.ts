export interface IncommingProductData {
  title: string;
  description: string;
  email: string;
  category: string;
  price: number;
  stock: number;
  image?: FileList; // For form input
  image_url?: string; // For database storage
}

export interface Product {
  id: string;
  title: string;
  description: string;
  email: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  email: string;
  category: string;
  price: number;
  stock: number;
  image_url?: string;
}
