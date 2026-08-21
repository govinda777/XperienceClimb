'use client';

import React, { createContext, useContext, useEffect, useState, Suspense, useCallback } from 'react';
import { ThemeConfig, VisualTheme } from './types';
import { useTours } from '@/hooks/useTours';

const defaultVisualTheme: VisualTheme = {
  primaryColor: '#e04a1d',
  primaryColorHover: '#c83b12',
  primaryColorActive: '#b0310d',
  accentColor: '#f37021',
  backgroundColor: '#0a0503',
  surfaceColor: '#170e0b',
  textColor: '#f1e6e3',
  textSecondaryColor: '#c5b0ab',
  borderColor: '#301d18',
  gradientFrom: '#521f10',
  gradientTo: '#e04a1d',
  heroOverlay: 'rgba(10, 5, 3, 0.7)',
  cardBackground: '#1d120e'
};

const defaultThemeConfig: ThemeConfig = {
  id: 'default',
  name: 'Xperience Climb',
  location: {
    name: '',
    address: '',
    city: '',
    state: '',
    distance: '',
    coordinates: { lat: 0, lng: 0 },
    mapsUrl: '',
    directions: []
  },
  content: {
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    about: {
      title: '',
      description: '',
      highlights: [],
      infoBox: { title: '', content: '' },
      image: ''
    }
  },
  gallery: {
    categories: {},
    images: []
  },
  activities: [],
  logistics: {
    schedule: { openTime: '08:00', closeTime: '18:00', notes: '' },
    meetingPoint: '',
    importantNotes: [],
    tips: []
  },
  community: {
    localPartners: [],
    localInstructors: [],
    specificSafetyProcedures: []
  },
  seo: {
    title: 'Xperience Climb',
    description: '',
    keywords: [],
    ogImage: ''
  },
  beginner: {
    title: '',
    description: '',
    highlights: [],
    finalMessage: ''
  },
  timeline: [],
  visual: defaultVisualTheme
};

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
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultThemeConfig);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([defaultThemeConfig]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDestinationId, setActiveDestinationId] = useState<string | null>(null);

  const { loading: toursLoading } = useTours();

  const mapDestinationToTheme = useCallback((dest: any): ThemeConfig => {
    const mergedVisual = {
      ...defaultVisualTheme,
      ...dest.visualConfig
    };

    return {
      id: dest.id || 'default',
      name: dest.name || '',
      location: {
        name: dest.locationDetails?.displayName || dest.name || '',
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
        title: dest.seo?.title || dest.name || '',
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
  }, []);

  const loadDynamicThemes = useCallback(async () => {
    // Rely completely on CMS/active site data
    if (initialActiveSite?.activeDestination) {
      const activeTheme = mapDestinationToTheme(initialActiveSite.activeDestination);
      setAvailableThemes([activeTheme]);
    } else {
      setAvailableThemes([defaultThemeConfig]);
    }
  }, [initialActiveSite, mapDestinationToTheme]);

  useEffect(() => {
    loadDynamicThemes();
  }, [loadDynamicThemes]);

  useEffect(() => {
    if (initialCmsEnabled && initialActiveSite?.activeDestination) {
      const activeTheme = mapDestinationToTheme(initialActiveSite.activeDestination);
      setCurrentTheme(activeTheme);
      setActiveDestinationId(activeTheme.id);
      setIsLoading(false);
    } else {
      setCurrentTheme(defaultThemeConfig);
      setActiveDestinationId(defaultThemeConfig.id);
      setIsLoading(false);
    }
  }, [initialCmsEnabled, initialActiveSite, mapDestinationToTheme]);

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
