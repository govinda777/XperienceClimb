'use client';

import { useEffect } from 'react';

export function ConsoleFilter() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const errorMsg = args.join(' ');

        // Silence browser-extension injected errors/warnings and aborted dev fetches
        if (
          errorMsg.includes('delayedExecution') ||
          errorMsg.includes('data-protonpass-form') ||
          errorMsg.includes('TrustedHTML') ||
          errorMsg.includes('TrustedScript') ||
          errorMsg.includes('lit-html') ||
          errorMsg.includes('AbortError') ||
          errorMsg.includes('signal is aborted')
        ) {
          return;
        }

        originalError.apply(console, args);
      };
    }
  }, []);

  return null;
}
