'use client';

import { useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

interface ThemeStyleProviderProps {
  children: React.ReactNode;
}

export function ThemeStyleProvider({ children }: ThemeStyleProviderProps) {
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (!currentTheme?.visual) return;

    const root = document.documentElement;
    const visual = currentTheme.visual;

    // Apply theme-specific CSS variables
    root.style.setProperty('--theme-primary', visual.primaryColor);
    root.style.setProperty('--theme-primary-hover', visual.primaryColorHover);
    root.style.setProperty('--theme-primary-active', visual.primaryColorActive);
    root.style.setProperty('--theme-accent', visual.accentColor);
    root.style.setProperty('--theme-background', visual.backgroundColor);
    root.style.setProperty('--theme-surface', visual.surfaceColor);
    root.style.setProperty('--theme-text', visual.textColor);
    root.style.setProperty('--theme-text-secondary', visual.textSecondaryColor);
    root.style.setProperty('--theme-border', visual.borderColor);
    root.style.setProperty('--theme-gradient-from', visual.gradientFrom);
    root.style.setProperty('--theme-gradient-to', visual.gradientTo);
    root.style.setProperty('--theme-hero-overlay', visual.heroOverlay);
    root.style.setProperty('--theme-card-background', visual.cardBackground);

    // Update body background
    document.body.style.backgroundColor = visual.backgroundColor;

    // Add theme class to html element for CSS targeting
    const html = document.documentElement;
    html.className = html.className.replace(/theme-\w+/g, '').trim();
    html.classList.add(`theme-${currentTheme.id}`, 'scroll-smooth');

  }, [currentTheme]);

  return <>{children}</>;
}
