export interface Todo {
  id: string;
  title: string;
  email: string;
  description: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TodoData {
  title: string;
  email: string;
  description: string;
  image?: FileList;
}

export interface TodoCreateInput {
  title: string;
  email: string;
  description: string;
  image_url?: string;
}
