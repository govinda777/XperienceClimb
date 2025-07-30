'use client';

import React from 'react';
import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { privyConfig } from '@/lib/privy';

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return <div>Authentication not configured</div>;
  }

  return (
    <BasePrivyProvider
      appId={appId}
      config={privyConfig}
    >
      {children}
    </BasePrivyProvider>
  );
} 