export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  notifications: boolean;
  language: 'pt' | 'en';
}

export interface LoginCredentials {
  email?: string;
  provider?: 'email';
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
} 