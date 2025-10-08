export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  created_at: string; // default column
  updated_at: string; // default column
}
export interface FormData {
  name: string;
  email: string;
  age: number;
  password: string;
  image: FileList;
}
