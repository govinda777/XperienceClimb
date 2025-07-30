import { IAuthService } from '../../services/IAuthService';
import { IUserRepository } from '../../repositories/IUserRepository';
import { LoginCredentials, LoginResult } from '../../entities/User';

export class LoginUser {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      // Delegate to Privy for actual authentication
      const result = await this.authService.login(credentials);
      
      if (result.success && result.user) {
        // User profile is automatically managed by Privy
        return result;
      }
      
      return {
        success: false,
        error: result.error || 'Authentication failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 