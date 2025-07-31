'use client';

import React from 'react';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui';
import { User, LogOut } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LoginButton({ variant = 'primary', size = 'md' }: LoginButtonProps) {
  const { ready, authenticated, user } = usePrivy();
  const { login } = useLogin();
  const { logout } = useLogout();

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <Button variant={variant} size={size} disabled>
        Loading...
      </Button>
    );
  }

  // Show logout button if authenticated
  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="hidden sm:block text-sm text-neutral-700">
          Olá, {user.email?.address || 'Usuário'}
        </div>
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
      leftIcon={<User className="w-4 h-4" />}
    >
      Entrar
    </Button>
  );
} 