'use client';

import React, { useEffect } from 'react';
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
    console.warn(
      'NEXT_PUBLIC_PRIVY_APP_ID is missing or invalid. Using a dummy ID to prevent crash.'
    );
    // Use a dummy ID that satisfies the format check (length 25)
    appId = 'clp1234567890123456789012';
  }

  // Ensure any dynamically injected third-party images have an alt attribute for SEO & accessibility
  useEffect(() => {
    const fixMissingAlts = () => {
      document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', '');
      });
    };

    fixMissingAlts();
    const observer = new MutationObserver(fixMissingAlts);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <BasePrivyProvider appId={appId} config={privyConfig}>
      {children}
    </BasePrivyProvider>
  );
}
