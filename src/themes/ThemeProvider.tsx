'use client';

import React, { createContext, useContext, useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  id: 'pedra-bela',
  name: 'Pedra Bela Vista',
  location: {
    name: 'Parque Pedra Bela Vista',
    address: 'Estrada Municipal da Pedra Bela Vista, s/n',
    city: 'Socorro',
    state: 'São Paulo',
    distance: '135 km',
    coordinates: { lat: -22.5901, lng: -46.5123 },
    mapsUrl: 'https://maps.google.com/?q=-22.5901,-46.5123',
    directions: [
      { step: 1, title: 'Passo 1', description: 'Siga pela Rodovia Fernão Dias até Bragança Paulista.' },
      { step: 2, title: 'Passo 2', description: 'Pegue a Rodovia Capitão Bardoíno sentido Socorro.' },
      { step: 3, title: 'Passo 3', description: 'Em Socorro, siga as placas para o Parque Pedra Bela Vista.' }
    ]
  },
  content: {
    hero: {
      title: 'Pedra Bela Vista',
      subtitle: 'Aventura vertical e pôr do sol inesquecível em Socorro/SP.',
      description: 'Prepare-se para o maior rapel do estado de São Paulo, cercado pela natureza exuberante da Serra da Mantiqueira.'
    },
    about: {
      title: 'Sobre Pedra Bela Vista',
      description: 'O Parque Pedra Bela Vista é o maior portal de turismo de aventura de Socorro. Localizado no topo de uma montanha, oferece uma das vistas mais espetaculares da região.',
      highlights: [
        { icon: '⛰️', title: 'Altitude', description: '1.250 metros acima do nível do mar' },
        { icon: '🧗', title: 'Rapel', description: '98 metros de descida emocionante' },
        { icon: '🌅', title: 'Pôr do Sol', description: 'Eleito o mais bonito do interior paulista' }
      ],
      infoBox: {
        title: 'Curiosidade Regional',
        content: 'O local abriga uma flora riquíssima típica de Mata Atlântica de altitude, com diversas espécies de orquídeas e bromélias silvestres.'
      },
      image: '/images/destinations/pedra-bela-about.jpg'
    }
  },
  gallery: {
    categories: {
      climb: 'Escalada',
      landscape: 'Paisagem'
    },
    images: [
      { src: '/images/destinations/pedra-bela-1.jpg', alt: 'Rapel na Pedra Bela Vista', title: 'Rapel de 98m', category: 'climb' },
      { src: '/images/destinations/pedra-bela-2.jpg', alt: 'Pôr do sol maravilhoso', title: 'Pôr do Sol', category: 'landscape' }
    ]
  },
  activities: [],
  logistics: {
    schedule: {
      openTime: '08:00',
      closeTime: '18:00',
      notes: 'Restaurante do Parque Pedra Bela Vista'
    },
    meetingPoint: 'Restaurante do Parque Pedra Bela Vista',
    importantNotes: [
      'Chegue com 15 minutos de antecedência.',
      'Leve repelente e protetor solar.'
    ],
    tips: [
      'Vá de roupas leves e calçado fechado (tênis ou bota).',
      'Leve uma garrafa de água de pelo menos 1.5L.'
    ]
  },
  community: {
    localPartners: [],
    localInstructors: [],
    specificSafetyProcedures: []
  },
  seo: {
    title: 'Pedra Bela Vista',
    description: 'Aventura vertical e pôr do sol inesquecível em Socorro/SP.',
    keywords: ['escalada', 'rapel', 'socorro'],
    ogImage: '/images/destinations/pedra-bela-hero.jpg'
  },
  beginner: {
    title: 'Nunca Escalou?',
    description: 'Não se preocupe! Pedra Bela Vista é o local perfeito para o seu batismo na escalada.',
    highlights: [
      { icon: '🛡️', title: 'Segurança Absoluta', description: 'Equipamentos certificados e redundância.' }
    ],
    finalMessage: 'A sua única preocupação será apreciar a vista lá de cima!'
  },
  timeline: [
    { time: '08:00', activity: 'Encontro no Parque Pedra Bela Vista' },
    { time: '08:30', activity: 'Briefing de segurança' }
  ],
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

  const { tours, loading: toursLoading } = useTours();

  const mapDestinationToTheme = useCallback((dest: any): ThemeConfig => {
    const mergedVisual = {
      ...defaultVisualTheme,
      ...dest.visualConfig
    };

    return {
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
