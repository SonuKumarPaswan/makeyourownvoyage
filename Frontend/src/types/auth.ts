export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin" | "agent";
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  otp?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password?: string;
}
