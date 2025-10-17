export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Super-Admin" | "Admin" | "Student";
  created_at?: string;
}