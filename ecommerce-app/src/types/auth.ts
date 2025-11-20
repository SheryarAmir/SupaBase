export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  role: "seller" | "buyer";
  bio: string;
  storeName: string;
  profileImage?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
