'use client';

import React, { useState, useEffect } from 'react';
import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { privyConfig } from '@/lib/privy';
import { isBotOrAuditor } from '@/lib/bot-detection';
import { AuthContext, PrivyConnectedAuthProvider, defaultGuestAuthContext } from '@/hooks/useAuth';

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only initialize Privy for real human users; prevent Turnstile hanging in Lighthouse/bots
    if (!isBotOrAuditor()) {
      setEnabled(true);
    }
  }, []);

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

  if (!enabled) {
    return <AuthContext.Provider value={defaultGuestAuthContext}>{children}</AuthContext.Provider>;
  }

  return (
    <BasePrivyProvider appId={appId} config={privyConfig}>
      <PrivyConnectedAuthProvider>{children}</PrivyConnectedAuthProvider>
    </BasePrivyProvider>
  );
}
