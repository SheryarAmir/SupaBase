export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "seller" | "buyer";
  created_at?: string;
}
