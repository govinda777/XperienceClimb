'use client';

import React from 'react';
import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { privyConfig } from '@/lib/privy';
import { PrivyConnectedAuthProvider } from './PrivyConnectedAuthProvider';

interface PrivyAuthWrapperProps {
  appId: string;
  children: React.ReactNode;
}

export function PrivyAuthWrapper({ appId, children }: PrivyAuthWrapperProps) {
  return (
    <BasePrivyProvider appId={appId} config={privyConfig}>
      <PrivyConnectedAuthProvider>{children}</PrivyConnectedAuthProvider>
    </BasePrivyProvider>
  );
}

export default PrivyAuthWrapper;
