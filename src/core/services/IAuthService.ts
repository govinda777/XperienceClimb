import { User, LoginCredentials, LoginResult } from '../entities/User';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<LoginResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
} 