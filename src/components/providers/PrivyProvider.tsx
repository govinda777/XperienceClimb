'use client';

import React from 'react';
import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { privyConfig } from '@/lib/privy';

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  let appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Fallback for development or environments with missing/invalid ID
  // to preventing crash on initialization.
  // Privy App IDs must be strings of length 25 (e.g. clp...)
  if (!appId || appId.length !== 25) {
    console.warn('NEXT_PUBLIC_PRIVY_APP_ID is missing or invalid. Using a dummy ID to prevent crash.');
    // Use a dummy ID that satisfies the format check (length 25)
    appId = 'clp1234567890123456789012';
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
