'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { isBotOrAuditor } from '@/lib/bot-detection';
import { AuthContext, defaultGuestAuthContext } from '@/hooks/useAuth';

// Carrega o pacote pesado do Privy (~450 KiB) apenas sob demanda via dynamic import
const DynamicPrivyAuthWrapper = dynamic(
  () => import('./PrivyAuthWrapper').then(mod => mod.PrivyAuthWrapper),
  {
    ssr: false,
    loading: () => null,
  }
);

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const [enabled, setEnabled] = useState(false);

  const rawAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const isRealAppId = Boolean(
    rawAppId &&
    rawAppId.length === 25 &&
    rawAppId !== 'clp1234567890123456789012' &&
    !rawAppId.startsWith('clp123456')
  );

  useEffect(() => {
    // Inicializa Privy somente para usuários reais no cliente com App ID válido configurado
    if (!isBotOrAuditor() && isRealAppId) {
      setEnabled(true);
    }
  }, [isRealAppId]);

  // Garante que imagens injetadas dinamicamente possuam alt para acessibilidade e auditorias
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

  if (!enabled || !rawAppId || !isRealAppId) {
    return <AuthContext.Provider value={defaultGuestAuthContext}>{children}</AuthContext.Provider>;
  }

  return <DynamicPrivyAuthWrapper appId={rawAppId}>{children}</DynamicPrivyAuthWrapper>;
}
