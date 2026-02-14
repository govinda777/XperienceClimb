'use client';

import React, { createContext, useContext, useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeConfig } from './types';
import { getThemeFromUrl } from '@/lib/theme-utils';
import { fazendaIpanemaTheme } from './configs/fazenda-ipanema';
import { pedraBellaTheme } from './configs/pedra-bela';
import { useTours } from '@/hooks/useTours';
import { TourService } from '@/infrastructure/services/TourService';
import { TourRepository } from '@/infrastructure/repositories/TourRepository';

const THEME_IDS = {
  FAZENDA_IPANEMA: 'fazenda-ipanema',
  PEDRA_BELA: 'pedra-bela',
} as const;

const staticThemes = {
  [THEME_IDS.FAZENDA_IPANEMA]: fazendaIpanemaTheme,
  [THEME_IDS.PEDRA_BELA]: pedraBellaTheme,
};

const isValidThemeId = (themeId: string): themeId is keyof typeof staticThemes => {
  return themeId in staticThemes;
};

console.log('ThemeProvider: Available static themes:', Object.keys(staticThemes));

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  isLoading: boolean;
  refreshThemes: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProviderContent({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(fazendaIpanemaTheme);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>(Object.values(staticThemes));
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tours, loading: toursLoading } = useTours();

  const loadDynamicThemes = useCallback(async () => {
    // Initialize tour service
    const tourService = new TourService(TourRepository.getInstance());

    try {
      const dynamicThemes: ThemeConfig[] = [];
      
      for (const tour of tours) {
        try {
          const themeConfig = tourService.generateThemeFromTour(tour);
          dynamicThemes.push(themeConfig);
        } catch (error) {
          console.error(`Error generating theme for tour ${tour.id}:`, error);
        }
      }

      // Combine static and dynamic themes
      const allThemes = [...Object.values(staticThemes), ...dynamicThemes];
      setAvailableThemes(allThemes);
      
      console.log('ThemeProvider: Loaded themes:', allThemes.map(t => t.id));
    } catch (error) {
      console.error('Error loading dynamic themes:', error);
      // Fallback to static themes only
      setAvailableThemes(Object.values(staticThemes));
    }
  }, [tours]);

  useEffect(() => {
    if (!toursLoading) {
      loadDynamicThemes();
    }
  }, [tours, toursLoading, loadDynamicThemes]);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Check for theme in URL query parameters first
        const themeFromUrl = getThemeFromUrl(searchParams);
        
        let selectedTheme: ThemeConfig | null = null;
        
        // Try to find theme in available themes
        if (themeFromUrl) {
          selectedTheme = availableThemes.find(theme => theme.id === themeFromUrl) || null;
          if (selectedTheme) {
            localStorage.setItem('xperience-theme', themeFromUrl);
          }
        }
        
        if (!selectedTheme) {
          const savedTheme = localStorage.getItem('xperience-theme');
          if (savedTheme) {
            selectedTheme = availableThemes.find(theme => theme.id === savedTheme) || null;
          }
        }
        
        if (!selectedTheme) {
          selectedTheme = availableThemes[0] || fazendaIpanemaTheme;
          localStorage.removeItem('xperience-theme');
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

    if (availableThemes.length > 0) {
      loadTheme();
    }
  }, [searchParams, availableThemes]);

  // eslint-disable-next-line no-unused-vars
  const setTheme = (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (!theme) {
      console.error('Invalid theme ID:', themeId);
      return;
    }

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

  const refreshThemes = async () => {
    await loadDynamicThemes();
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes,
        setTheme,
        isLoading: isLoading || toursLoading,
        refreshThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProviderContent>
        {children}
      </ThemeProviderContent>
    </Suspense>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
