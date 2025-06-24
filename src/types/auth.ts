export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  companyName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
} 