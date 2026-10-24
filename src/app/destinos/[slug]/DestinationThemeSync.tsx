'use client';

import { useEffect } from 'react';
import { useTheme } from '@/themes/ThemeProvider';

export function DestinationThemeSync({ slug }: { slug: string }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (slug) {
      setTheme(slug);
    }
  }, [slug, setTheme]);

  return null;
}
