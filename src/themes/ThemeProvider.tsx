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
  // Initialize with the first available static theme, will be updated when tours load
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(pedraBellaTheme);
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
          // We will include the static one if it matches an active tour
          if (!staticThemes[tour.themeId as keyof typeof staticThemes]) {
            const themeConfig = tourService.generateThemeFromTour(tour);
            dynamicThemes.push(themeConfig);
          }
        } catch (error) {
          console.error(`Error generating theme for tour ${tour.id}:`, error);
        }
      }

      // Filter static themes based on active tours
      const activeStaticThemes = Object.values(staticThemes).filter(theme =>
        activeThemeIds.has(theme.id)
      );

      // Combine filtered static and dynamic themes
      const allThemes = [...activeStaticThemes, ...dynamicThemes];
      setAvailableThemes(allThemes);
      
      console.log('ThemeProvider: Loaded themes:', allThemes.map(t => t.id));

      // If we have available themes, ensure the current theme is one of them
      if (allThemes.length > 0) {
        // If current theme is not in available themes, switch to the first available
        if (!allThemes.find(t => t.id === currentTheme.id)) {
           setCurrentTheme(allThemes[0]);
           localStorage.setItem('xperience-theme', allThemes[0].id);
        }
      }

    } catch (error) {
      console.error('Error loading dynamic themes:', error);
      // Fallback to static themes only if error, but try to respect active flag if possible?
      // If error, we might default to all static themes or just keep current state
      // For safety, let's keep what we have or fallback to static
      setAvailableThemes(Object.values(staticThemes));
    }
  }, [tours, currentTheme.id]);

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

        // If no theme selected or selected theme is not available, default to the first one
        if (!selectedTheme) {
          selectedTheme = availableThemes[0] || pedraBellaTheme;
          localStorage.removeItem('xperience-theme');
        }

        if (selectedTheme) {
          setCurrentTheme(selectedTheme);
        } else {
          setCurrentTheme(pedraBellaTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!toursLoading) {
      loadTheme();
    }
  }, [searchParams, availableThemes, toursLoading]);

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
