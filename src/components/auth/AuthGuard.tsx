'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true 
}: AuthGuardProps) {
  const { ready, authenticated, login } = usePrivy();

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-climb-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // If authentication is not required, show children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If not authenticated and auth is required, show fallback or login prompt
  if (!authenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-climb-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              🧗‍♂️
            </div>
            <h2 className="text-2xl font-bold text-climb-600 mb-2">
              Login Necessário
            </h2>
            <p className="text-neutral-600">
              Faça login para acessar essa funcionalidade e continuar sua jornada de escalada.
            </p>
          </div>
          <Button onClick={login} size="lg" className="w-full">
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  // User is authenticated, show protected content
  return <>{children}</>;
} 