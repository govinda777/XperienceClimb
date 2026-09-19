'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from 'react';
import { useSearchParams } from 'next/navigation';
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
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>(
    Object.values(staticThemes)
  );
  const [isLoading, setIsLoading] = useState(true);
  const { tours, loading: toursLoading } = useTours();

  const loadDynamicThemes = useCallback(async () => {
    const tourService = new TourService(TourRepository.getInstance());

    try {
      const dynamicThemes: ThemeConfig[] = [];

      for (const tour of tours) {
        try {
          if (!staticThemes[tour.themeId as keyof typeof staticThemes]) {
            const themeConfig = tourService.generateThemeFromTour(tour);
            dynamicThemes.push(themeConfig);
          }
        } catch (error) {
          console.error(`Error generating theme for tour ${tour.id}:`, error);
        }
      }

      const allThemes = [...Object.values(staticThemes), ...dynamicThemes];
      setAvailableThemes(allThemes);
    } catch (error) {
      console.error('Error loading dynamic themes:', error);
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
        let selectedTheme: ThemeConfig | null = null;

        // Check localStorage on client if previously stored
        if (typeof window !== 'undefined') {
          const storedThemeId = localStorage.getItem('xperience-theme');
          if (storedThemeId) {
            selectedTheme = availableThemes.find(t => t.id === storedThemeId) || null;
          }
        }

        // Priority 2: Use the first ACTIVE tour found
        if (!selectedTheme && tours.length > 0) {
          const firstActiveTour = tours[0];
          selectedTheme = availableThemes.find(t => t.id === firstActiveTour.themeId) || null;
        }

        // Priority 3: Fallback to Pedra Bela (default static)
        if (!selectedTheme) {
          selectedTheme = pedraBellaTheme;
        }

        setCurrentTheme(selectedTheme);
      } catch (error) {
        console.error('Error loading theme:', error);
        setCurrentTheme(pedraBellaTheme);
      } finally {
        setIsLoading(false);
      }
    };

    if (!toursLoading) {
      loadTheme();
    }
  }, [availableThemes, tours, toursLoading]);

  const setTheme = useCallback(
    (themeId: string) => {
      const theme = availableThemes.find(t => t.id === themeId);
      if (!theme) {
        console.error('Invalid theme ID:', themeId);
        return;
      }

      setCurrentTheme(theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('xperience-theme', themeId);
      }

      // Update document title if applicable
      if (typeof document !== 'undefined') {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', theme.seo.title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
          ogDescription.setAttribute('content', theme.seo.description);
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute('content', theme.seo.ogImage);
        }
      }
    },
    [availableThemes]
  );

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

// Subcomponente isolado com Suspense para sincronização de tema via URL query (?theme=...)
// sem forçar bailout de renderização do servidor (SSR) para a página inteira
function ThemeUrlSync() {
  const searchParams = useSearchParams();
  const { setTheme, availableThemes } = useTheme();

  useEffect(() => {
    const themeFromUrl = getThemeFromUrl(searchParams);
    if (themeFromUrl && availableThemes.some(t => t.id === themeFromUrl)) {
      setTheme(themeFromUrl);
    }
  }, [searchParams, setTheme, availableThemes]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderContent>
      <Suspense fallback={null}>
        <ThemeUrlSync />
      </Suspense>
      {children}
    </ThemeProviderContent>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
