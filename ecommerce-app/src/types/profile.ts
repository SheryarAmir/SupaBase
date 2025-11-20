export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "seller" | "buyer";
  bio?: string;
  storeName?: string;
  profileImage?: string;
  created_at?: string;
  updated_at?: string;
}
