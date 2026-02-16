import { StaticImageData } from 'next/image';

export interface DirectionStep {
  step: number;
  title: string;
  description: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean; // Indica se é uma URL externa
  externalDomain?: string; // Domínio da URL externa para validação
  isVideo?: boolean; // Indica se o item é um vídeo
}

export interface LocationInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  directions: DirectionStep[];
}

export interface ContentInfo {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    highlights: Highlight[];
    infoBox: {
      title: string;
      content: string;
    };
    image?: string | StaticImageData;
  };
}

export interface GalleryInfo {
  images: GalleryImage[];
  categories: Record<string, string>;
}

export interface ActivityInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  duration?: string;
  price?: number;
}

export interface LogisticsInfo {
  schedule: {
    openTime: string;
    closeTime: string;
    notes?: string;
  };
  meetingPoint: string;
  importantNotes: string[];
  tips: string[];
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface CommunityInfo {
  localPartners: string[]; // IDs of partners specific to this location
  localInstructors: string[]; // IDs of instructors available for this location
  specificSafetyProcedures: string[]; // IDs of location-specific safety procedures
  visitedLocationId?: string; // ID of the visited location if it exists in community data
}

export interface VisualTheme {
  primaryColor: string;
  primaryColorHover: string;
  primaryColorActive: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textSecondaryColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  heroOverlay: string;
  cardBackground: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  location: LocationInfo;
  content: ContentInfo;
  gallery: GalleryInfo;
  activities: ActivityInfo[];
  logistics: LogisticsInfo;
  community: CommunityInfo;
  seo: SEOInfo;
  visual: VisualTheme;
}
