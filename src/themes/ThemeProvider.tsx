'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeConfig } from './types';
import { fazendaIpanemaTheme, pedraBellaTheme } from './configs';
import { THEME_IDS, getThemeFromUrl, isValidThemeId } from '@/lib/theme-utils';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  [THEME_IDS.FAZENDA_IPANEMA]: fazendaIpanemaTheme,
  [THEME_IDS.PEDRA_BELA]: pedraBellaTheme,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(fazendaIpanemaTheme);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Check for theme in URL query parameters first
        const themeFromUrl = getThemeFromUrl(searchParams);
        
        let selectedTheme: ThemeConfig | null = null;
        
        // Simple theme loading logic using only static themes for now
        if (themeFromUrl && themes[themeFromUrl]) {
          selectedTheme = themes[themeFromUrl];
          localStorage.setItem('xperience-theme', themeFromUrl);
        } else {
          const savedTheme = localStorage.getItem('xperience-theme');
          if (savedTheme && isValidThemeId(savedTheme) && themes[savedTheme]) {
            selectedTheme = themes[savedTheme];
          } else {
            selectedTheme = fazendaIpanemaTheme;
            localStorage.removeItem('xperience-theme');
          }
        }
        
        if (selectedTheme) {
          setCurrentTheme(selectedTheme);
        } else {
          setCurrentTheme(fazendaIpanemaTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [searchParams]);

  const setTheme = (themeId: string) => {
    if (!isValidThemeId(themeId) || !themes[themeId]) {
      console.error('Invalid theme ID:', themeId);
      return;
    }

    const theme = themes[themeId];
    setCurrentTheme(theme);
    localStorage.setItem('xperience-theme', themeId);
    
    // Update URL with theme query parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('theme', themeId);
    router.push(currentUrl.pathname + currentUrl.search, { scroll: false });
    
    // Update document title and meta tags
    document.title = theme.seo.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', theme.seo.description);
    }
    
    // Update og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', theme.seo.title);
    }
    
    // Update og:description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', theme.seo.description);
    }
    
    // Update og:image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', theme.seo.ogImage);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: Object.values(themes),
        setTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
