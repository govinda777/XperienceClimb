export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  preferences?: UserPreferences;
  isAdmin?: boolean;
}

export interface UserPreferences {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  notifications: boolean;
  language: 'pt' | 'en';
}

export interface LoginCredentials {
  email?: string;
  provider?: 'email';
  password?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}
