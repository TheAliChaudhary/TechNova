export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  users: UserState;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 