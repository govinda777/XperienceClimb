'use client';

import { usePrivy } from '@privy-io/react-auth';
import { User } from '@/core/entities/User';
import { useMemo } from 'react';

export function useAuth() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Convert Privy user to our domain User entity
  const domainUser: User | null = useMemo(() => {
    if (!authenticated || !user) return null;

    // Get user preferences from localStorage or use defaults
    const savedPrefs = typeof window !== 'undefined' 
      ? localStorage.getItem(`userPrefs_${user.id}`)
      : null;
    
    const preferences = savedPrefs ? JSON.parse(savedPrefs) : {
      experienceLevel: 'beginner' as const,
      notifications: true,
      language: 'pt' as const
    };

    return {
      id: user.id,
      email: user.email?.address || '',
      name: user.google?.name || user.apple?.name || user.email?.address?.split('@')[0] || '',
      avatar: user.google?.pictureUrl || user.apple?.pictureUrl,
      createdAt: user.createdAt || new Date(),
      preferences
    };
  }, [authenticated, user]);

  const updateUserPreferences = async (newPreferences: Partial<User['preferences']>) => {
    if (!domainUser) throw new Error('User not authenticated');

    const updatedPrefs = { ...domainUser.preferences, ...newPreferences };
    
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
    userPreferences: domainUser?.preferences
  };
} 