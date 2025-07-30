import { User } from '../entities/User';

export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  getUserProfile(privyId: string): Promise<User | null>;
  updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<void>;
  // Note: User creation/update handled by Privy automatically
} 