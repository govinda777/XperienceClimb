import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../entities/User';

export class GetUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId?: string): Promise<User | null> {
    try {
      if (userId) {
        return await this.userRepository.getUserProfile(userId);
      }
      
      // Get current logged-in user
      return await this.userRepository.getCurrentUser();
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }
} 