'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { User as UserIcon, LogOut } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LoginButton({ variant = 'primary', size = 'md' }: LoginButtonProps) {
  const { ready, authenticated, user, userEmail, userName, login, logout } = useAuth();

  // Show loading state while auth is initializing
  if (!ready) {
    return (
      <Button variant={variant} size={size} disabled>
        Loading...
      </Button>
    );
  }

  // Show logout button if authenticated
  if (authenticated && user) {
    const displayIdentifier =
      userEmail ||
      (typeof user.email === 'string' ? user.email : (user.email as any)?.address) ||
      userName ||
      'Usuário';

    return (
      <div className="flex items-center space-x-3">
        <div className="hidden sm:block text-sm text-neutral-700">Olá, {displayIdentifier}</div>
        <Button
          variant="ghost"
          size={size}
          onClick={logout}
          leftIcon={<LogOut className="w-4 h-4" />}
        >
          Sair
        </Button>
      </div>
    );
  }

  // Show login button if not authenticated
  return (
    <Button
      variant={variant}
      size={size}
      onClick={login}
      leftIcon={<UserIcon className="w-4 h-4" />}
    >
      Entrar
    </Button>
  );
}
