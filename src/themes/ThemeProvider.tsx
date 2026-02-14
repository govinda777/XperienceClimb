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
  // Initialize with pedraBellaTheme as default fallback
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(pedraBellaTheme);
  // Keep all themes available for URL loading
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
      const activeThemeIds = new Set(tours.map(t => t.themeId));
      
      for (const tour of tours) {
        try {
          // If we have a static theme for this tour, skip generating one
          // We will include the static one later
          if (!staticThemes[tour.themeId as keyof typeof staticThemes]) {
            const themeConfig = tourService.generateThemeFromTour(tour);
            dynamicThemes.push(themeConfig);
          }
        } catch (error) {
          console.error(`Error generating theme for tour ${tour.id}:`, error);
        }
      }

      // Keep ALL static themes + dynamic themes in availableThemes
      // This allows URL parameters to load any theme, even if not "active" in the repo
      const allThemes = [...Object.values(staticThemes), ...dynamicThemes];
      setAvailableThemes(allThemes);
      
      console.log('ThemeProvider: Loaded themes:', allThemes.map(t => t.id));

      // Determine the default active theme based on the first tour in the fetched list
      // tours list comes from useTours which filters by active=true
      if (tours.length > 0) {
        const firstActiveTour = tours[0];
        const activeTheme = allThemes.find(t => t.id === firstActiveTour.themeId);

        // If we found a theme corresponding to the first active tour, set it as current
        // BUT only if no URL parameter is overriding it (handled in the next effect)
        // Actually, we can just let the next effect handle the selection logic
        // This effect is mainly for populating availableThemes
      }

    } catch (error) {
      console.error('Error loading dynamic themes:', error);
      // Fallback to static themes
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
        // Priority 1: Check for theme in URL query parameters
        const themeFromUrl = getThemeFromUrl(searchParams);
        let selectedTheme: ThemeConfig | null = null;

        if (themeFromUrl) {
          // Try to find theme in available themes (which now includes inactive ones if they are static)
          selectedTheme = availableThemes.find(theme => theme.id === themeFromUrl) || null;
          if (selectedTheme) {
            console.log('ThemeProvider: Using theme from URL:', selectedTheme.id);
            localStorage.setItem('xperience-theme', themeFromUrl);
          }
        }

        // Priority 2: Use the first ACTIVE tour found
        // tours comes from useTours hook which returns only active tours
        if (!selectedTheme && tours.length > 0) {
          const firstActiveTour = tours[0];
          selectedTheme = availableThemes.find(t => t.id === firstActiveTour.themeId) || null;
          if (selectedTheme) {
             console.log('ThemeProvider: Using first active tour theme:', selectedTheme.id);
          }
        }

        // Priority 3: Fallback to Pedra Bela (default static)
        if (!selectedTheme) {
           console.log('ThemeProvider: Fallback to default theme');
           selectedTheme = pedraBellaTheme;
           localStorage.removeItem('xperience-theme');
        }

        setCurrentTheme(selectedTheme);

      } catch (error) {
        console.error('Error loading theme:', error);
        setCurrentTheme(pedraBellaTheme);
      } finally {
        setIsLoading(false);
      }
    };

    // Run this effect when params change, or when availableThemes/tours are loaded
    if (!toursLoading) {
      loadTheme();
    }
  }, [searchParams, availableThemes, tours, toursLoading]);

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
