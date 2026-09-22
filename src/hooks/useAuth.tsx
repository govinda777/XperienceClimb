'use client';

import { usePrivy } from '@privy-io/react-auth';
import { User, UserPreferences } from '@/core/entities/User';
import React, { useMemo, createContext, useContext } from 'react';

export type AuthContextType = {
  ready: boolean;
  authenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
  isGuest: boolean;
  isLoggedIn: boolean;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  userPreferences?: UserPreferences;
};

export const AuthContext = createContext<AuthContextType | null>(null);

function usePrivyAuthImpl(): AuthContextType {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Convert user to our domain User entity
  const domainUser: User | null = useMemo(() => {
    if (!authenticated || !user) return null;

    // Get user preferences from localStorage or use defaults
    let savedPrefs = null;
    try {
      savedPrefs =
        typeof window !== 'undefined' ? localStorage.getItem(`userPrefs_${user.id}`) : null;
    } catch (error) {
      console.warn('Failed to read user preferences from localStorage:', error);
    }

    const preferences = savedPrefs
      ? JSON.parse(savedPrefs)
      : {
          experienceLevel: 'beginner' as const,
          notifications: true,
          language: 'pt' as const,
        };

    // Extract email from Privy user object
    const emailAddress = user.email?.address || '';

    return {
      id: user.id,
      email: emailAddress,
      name: emailAddress.split('@')[0] || 'Usuário',
      avatar: undefined,
      createdAt: new Date(),
      preferences,
    };
  }, [authenticated, user]);

  const updateUserPreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!domainUser) throw new Error('User not authenticated');

    const updatedPrefs = { ...domainUser.preferences, ...newPreferences } as UserPreferences;

    // Store in localStorage (in production, you might store this in your backend)
    localStorage.setItem(`userPrefs_${domainUser.id}`, JSON.stringify(updatedPrefs));

    // Update the user object (this will trigger a re-render)
    if (domainUser) {
      domainUser.preferences = updatedPrefs;
    }
  };

  return {
    // Privy state
    ready,
    authenticated,

    // Domain user
    user: domainUser,

    // Actions
    login,
    logout,
    updateUserPreferences,

    // Computed values
    isLoading: !ready,
    isGuest: ready && !authenticated,
    isLoggedIn: ready && authenticated && !!domainUser,

    // User info shortcuts
    userEmail: domainUser?.email,
    userName: domainUser?.name,
    userAvatar: domainUser?.avatar,
    userPreferences: domainUser?.preferences,
  };
}

export const defaultGuestAuthContext: AuthContextType = {
  ready: true,
  authenticated: false,
  user: null,
  login: () => {
    console.warn('Authentication is not active in this environment.');
  },
  logout: () => {},
  updateUserPreferences: async () => {},
  isLoading: false,
  isGuest: true,
  isLoggedIn: false,
};

export function PrivyConnectedAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = usePrivyAuthImpl();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const existingContext = useContext(AuthContext);
  if (existingContext) {
    return <>{children}</>;
  }
  return <PrivyConnectedAuthProvider>{children}</PrivyConnectedAuthProvider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultGuestAuthContext;
  }
  return context;
}
