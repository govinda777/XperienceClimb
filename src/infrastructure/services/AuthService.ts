import { IAuthService } from '@/core/services/IAuthService';
import { User, LoginCredentials, LoginResult } from '@/core/entities/User';

export class AuthService implements IAuthService {
  async login(_credentials: LoginCredentials): Promise<LoginResult> {
    try {
      // Note: This service is a bridge between use cases and Privy
      // The actual login logic is handled by Privy hooks in components
      // This method serves as a contract for the use case layer
      throw new Error('AuthService.login should be called through Privy hooks in React components');
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Note: This service is a bridge between use cases and Privy
      // The actual logout logic is handled by Privy hooks in components
      throw new Error('AuthService.logout should be called through Privy hooks in React components');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // Note: This service is a bridge between use cases and Privy
      // The actual user data comes from Privy hooks in components
      // This method serves as a contract for the use case layer
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      // Note: This service is a bridge between use cases and Privy
      // The actual authentication state comes from Privy hooks in components
      return false;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }
} 