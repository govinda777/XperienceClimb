import { IUserRepository } from '@/core/repositories/IUserRepository';
import { User } from '@/core/entities/User';

export class UserRepository implements IUserRepository {
  async getCurrentUser(): Promise<User | null> {
    try {
      // This should be called within a component that has access to Privy context
      // For now, we'll return null - the actual implementation will be in a custom hook
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async getUserProfile(_privyId: string): Promise<User | null> {
    try {
      // In a real implementation, this might fetch additional user data
      // from your backend or Privy's API
      // For now, return null as user data comes directly from Privy
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<void> {
    try {
      // In a real implementation, this would update user preferences
      // in your backend or using Privy's metadata API
      console.log('Updating user preferences:', { userId, preferences });
      
      // For demo purposes, we'll store in localStorage
      const existingPrefs = localStorage.getItem(`userPrefs_${userId}`);
      const currentPrefs = existingPrefs ? JSON.parse(existingPrefs) : {
        experienceLevel: 'beginner',
        notifications: true,
        language: 'pt'
      };
      
      const updatedPrefs = { ...currentPrefs, ...preferences };
      localStorage.setItem(`userPrefs_${userId}`, JSON.stringify(updatedPrefs));
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  }
} 