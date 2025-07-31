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
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is required. Please configure your Privy App ID.');
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