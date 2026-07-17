import { VisualTheme } from '@/themes/types';
import { Package } from '@/core/entities/Package';

export interface ActiveSiteContent {
  nextEventStartsAt: string;
  contactInfo: {
    phone: string;
    email: string;
    instagram: string;
  };
  footerSettings: {
    certificationsText: string;
    legalText: string;
  };
  activeDestination: DestinationContent | null;
}

export interface DestinationContent {
  id: string;
  name: string;
  isPublished: boolean;
  eventStatus: 'planned' | 'active' | 'archived';
  visualConfig: Partial<VisualTheme>;
  locationDetails: {
    displayName?: string;
    address?: string;
    city?: string;
    state?: string;
    distance?: string;
    coordinates?: { lat: number; lng: number };
    mapsUrl?: string;
    directions?: Array<{ title: string; description: string }>;
  };
  content?: {
    hero?: {
      title?: string;
      subtitle?: string;
      description?: string;
      backgroundImage?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };
    about?: {
      title?: string;
      description?: string;
      highlights?: Array<{ icon: string; title: string; description: string }>;
      infoBox?: { title: string; content: string };
      image?: string;
    };
  };
  beginnerSection?: {
    title?: string;
    description?: string;
    highlights?: Array<{ icon: string; title: string; description: string }>;
    finalMessage?: string;
  };
  safetySection?: {
    title?: string;
    description?: string;
    safetyItems?: Array<{ icon: string; title: string; description: string; details?: string[] }>;
    equipmentList?: Array<{ name: string; required: boolean; provided: boolean }>;
  };
  gallery?: {
    categories?: Array<{ key: string; value: string }>;
    images?: Array<{ src: string; alt?: string; title?: string; category?: string }>;
  };
  timeline?: Array<{ time: string; activity: string }>;
  logistics?: {
    meetingPoint?: string;
    importantNotes?: string[];
    tips?: string[];
    groupSize?: string;
    included?: string[];
    notIncluded?: string[];
    requirements?: string[];
  };
  activities?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    noIndex?: boolean;
  };
  instructors?: Array<{
    name: string;
    photo?: string;
    role?: string;
    certifications?: string[];
    specialties?: string[];
  }>;
  partners?: Array<{
    name: string;
    logo?: string;
    websiteUrl?: string;
  }>;
}

export interface HomePageContent {
  title?: string;
  sectionOrder: string[];
  calendarSection?: {
    title?: string;
    description?: string;
  };
  packagesSection?: {
    title?: string;
    description?: string;
    packageRefs?: string[];
  };
}

export interface IContentRepository {
  getActiveSite(): Promise<ActiveSiteContent | null>;
  getHomePage(): Promise<HomePageContent | null>;
  getDestinationBySlug(slug: string): Promise<DestinationContent | null>;
  listDestinations(): Promise<DestinationContent[]>;
  listPublishedPackages(): Promise<Package[]>;
}
