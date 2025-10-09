export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface FormData {
  name: string;
  email: string;
  age: number;
  password: string;
  image?: FileList;
}

export interface UserCreateInput {
  name: string;
  email: string;
  age: number;
  password: string;
  image_url?: string;
}
