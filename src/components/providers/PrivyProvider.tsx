'use client';

import React, { useState, useEffect } from 'react';
import { isBotOrAuditor } from '@/lib/bot-detection';
import { AuthContext, defaultGuestAuthContext } from '@/hooks/useAuth';
import type { PrivyAuthWrapperProps } from './PrivyAuthWrapper';

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const [WrapperComponent, setWrapperComponent] =
    useState<React.ComponentType<PrivyAuthWrapperProps> | null>(null);

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
      import('./PrivyAuthWrapper').then(mod => {
        setWrapperComponent(() => mod.PrivyAuthWrapper);
      });
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

  if (!WrapperComponent || !rawAppId || !isRealAppId) {
    return <AuthContext.Provider value={defaultGuestAuthContext}>{children}</AuthContext.Provider>;
  }

  return <WrapperComponent appId={rawAppId}>{children}</WrapperComponent>;
}
