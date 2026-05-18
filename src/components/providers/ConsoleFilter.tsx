'use client';

import { useEffect } from 'react';

export function ConsoleFilter() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const errorMsg = args.join(' ');

        // Silence browser-extension injected errors/warnings to prevent Next.js dev overlay crashes
        if (
          errorMsg.includes('delayedExecution') ||
          errorMsg.includes('data-protonpass-form') ||
          errorMsg.includes('TrustedHTML') ||
          errorMsg.includes('TrustedScript') ||
          errorMsg.includes('lit-html')
        ) {
          return;
        }

        originalError.apply(console, args);
      };
    }
  }, []);

  return null;
}
