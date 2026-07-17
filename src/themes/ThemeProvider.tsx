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

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  isLoading: boolean;
  refreshThemes: () => Promise<void>;
  cmsEnabled: boolean;
  activeDestinationId: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProviderContent({
  children,
  initialCmsEnabled = false,
  initialActiveSite = null
}: {
  children: React.ReactNode;
  initialCmsEnabled?: boolean;
  initialActiveSite?: any;
}) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(pedraBellaTheme);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([pedraBellaTheme, fazendaIpanemaTheme]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { tours, loading: toursLoading } = useTours();

  const loadDynamicThemes = useCallback(async () => {
    const tourService = new TourService(TourRepository.getInstance());
    try {
      const dynamicThemes: ThemeConfig[] = [];
      for (const tour of tours) {
        if (tour.themeId !== 'pedra-bela' && tour.themeId !== 'fazenda-ipanema') {
          const themeConfig = tourService.generateThemeFromTour(tour);
          dynamicThemes.push(themeConfig);
        }
      }
      setAvailableThemes([pedraBellaTheme, fazendaIpanemaTheme, ...dynamicThemes]);
    } catch (error) {
      console.error('Error loading dynamic themes:', error);
      setAvailableThemes([pedraBellaTheme, fazendaIpanemaTheme]);
    }
  }, [tours]);

  useEffect(() => {
    if (!toursLoading) {
      loadDynamicThemes();
    }
  }, [tours, toursLoading, loadDynamicThemes]);

  useEffect(() => {
    if (initialCmsEnabled && initialActiveSite?.activeDestination) {
      const dest = initialActiveSite.activeDestination;
      const mergedVisual = {
        ...pedraBellaTheme.visual,
        ...dest.visualConfig
      };

      const mappedConfig: ThemeConfig = {
        id: dest.id || 'pedra-bela',
        name: dest.name,
        location: {
          name: dest.locationDetails?.displayName || dest.name,
          address: dest.locationDetails?.address || '',
          city: dest.locationDetails?.city || '',
          state: dest.locationDetails?.state || 'São Paulo',
          distance: dest.locationDetails?.distance || '',
          coordinates: dest.locationDetails?.coordinates || { lat: 0, lng: 0 },
          mapsUrl: dest.locationDetails?.mapsUrl || '',
          directions: (dest.locationDetails?.directions || []).map((d: any, idx: number) => ({
            step: idx + 1,
            title: d.title || '',
            description: d.description || ''
          }))
        },
        content: {
          hero: {
            title: dest.content?.hero?.title || '',
            subtitle: dest.content?.hero?.subtitle || '',
            description: dest.content?.hero?.description || ''
          },
          about: {
            title: dest.content?.about?.title || '',
            description: dest.content?.about?.description || '',
            highlights: dest.content?.about?.highlights || [],
            infoBox: dest.content?.about?.infoBox || { title: '', content: '' },
            image: dest.content?.about?.image || ''
          }
        },
        gallery: {
          categories: (dest.gallery?.categories || []).reduce((acc: any, c: any) => {
            acc[c.key] = c.value;
            return acc;
          }, {}),
          images: (dest.gallery?.images || []).map((img: any) => ({
            src: img.src,
            alt: img.alt || '',
            title: img.title || '',
            category: img.category || ''
          }))
        },
        activities: [],
        logistics: {
          schedule: {
            openTime: '08:00',
            closeTime: '18:00',
            notes: dest.logistics?.meetingPoint || ''
          },
          meetingPoint: dest.logistics?.meetingPoint || '',
          importantNotes: dest.logistics?.importantNotes || [],
          tips: dest.logistics?.tips ? [dest.logistics.tips] : []
        },
        community: {
          localPartners: [],
          localInstructors: [],
          specificSafetyProcedures: []
        },
        seo: {
          title: dest.seo?.title || dest.name,
          description: dest.seo?.description || '',
          keywords: dest.seo?.keywords || [],
          ogImage: dest.seo?.ogImage || ''
        },
        beginner: {
          title: dest.beginnerSection?.title || '',
          description: dest.beginnerSection?.description || '',
          highlights: dest.beginnerSection?.highlights || [],
          finalMessage: dest.beginnerSection?.finalMessage || ''
        },
        timeline: dest.timeline || [],
        visual: mergedVisual
      };

      setCurrentTheme(mappedConfig);
      setActiveDestinationId(dest.id);
      setIsLoading(false);
    } else {
      if (!toursLoading) {
        const themeFromUrl = getThemeFromUrl(searchParams);
        let selectedTheme: ThemeConfig | null = null;
        if (themeFromUrl) {
          selectedTheme = availableThemes.find(theme => theme.id === themeFromUrl) || null;
        }
        if (!selectedTheme && tours.length > 0) {
          const firstActiveTour = tours[0];
          selectedTheme = availableThemes.find(t => t.id === firstActiveTour.themeId) || null;
        }
        if (!selectedTheme) {
          selectedTheme = pedraBellaTheme;
        }
        setCurrentTheme(selectedTheme);
        setActiveDestinationId(selectedTheme.id);
        setIsLoading(false);
      }
    }
  }, [searchParams, availableThemes, tours, toursLoading, initialCmsEnabled, initialActiveSite]);

  const setTheme = (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (!theme) return;
    setCurrentTheme(theme);
    localStorage.setItem('xperience-theme', themeId);
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
        cmsEnabled: initialCmsEnabled,
        activeDestinationId
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  initialCmsEnabled = false,
  initialActiveSite = null
}: {
  children: React.ReactNode;
  initialCmsEnabled?: boolean;
  initialActiveSite?: any;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProviderContent initialCmsEnabled={initialCmsEnabled} initialActiveSite={initialActiveSite}>
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
