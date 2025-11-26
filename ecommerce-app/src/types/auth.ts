export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
  role: "seller" | "buyer";
  image?: FileList; // For form input
  profileImage?: string;
  contactNumber:string
  storeDescription:string
  
}

export interface SignInCredentials {
  email: string;
  password: string;
}
