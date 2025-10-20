export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  role: "seller" | "buyer";
}

export interface SignInCredentials {
  email: string;
  password: string;
}
