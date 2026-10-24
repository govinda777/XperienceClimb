'use client';

import { User, UserPreferences } from '@/core/entities/User';
import React, { createContext, useContext } from 'react';

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

export const AuthContext = createContext<AuthContextType | null>(null);

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const existingContext = useContext(AuthContext);
  if (existingContext) {
    return <>{children}</>;
  }

  // Em ambiente de teste Jest, conecta o provider do Privy para compatibilidade com mocks
  if (process.env.NODE_ENV === 'test') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const {
        PrivyConnectedAuthProvider,
      } = require('@/components/providers/PrivyConnectedAuthProvider');
      return <PrivyConnectedAuthProvider>{children}</PrivyConnectedAuthProvider>;
    } catch {
      // Fallback para guest caso ocorra erro
    }
  }

  return <AuthContext.Provider value={defaultGuestAuthContext}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultGuestAuthContext;
  }
  return context;
}
