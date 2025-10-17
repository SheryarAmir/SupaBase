export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  role: "Super-Admin" | "Admin" | "Student";
}

export interface SignInCredentials {
  email: string;
  password: string;
}
