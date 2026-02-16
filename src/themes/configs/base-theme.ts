import { ThemeConfig, LocationInfo, ContentInfo, GalleryInfo, ActivityInfo, LogisticsInfo, CommunityInfo, SEOInfo, VisualTheme } from '../types';
import { processThemeImages } from '@/lib/image-utils';

export abstract class BaseTheme implements ThemeConfig {
  abstract id: string;
  abstract name: string;
  abstract location: LocationInfo;
  abstract content: ContentInfo;
  abstract gallery: GalleryInfo;
  abstract activities: ActivityInfo[];
  abstract logistics: LogisticsInfo;
  abstract community: CommunityInfo;
  abstract seo: SEOInfo;
  abstract visual: VisualTheme;

  // Common validation and processing methods
  protected processGalleryImages(images: any[]) {
    return processThemeImages(images);
  }

  // Common utility methods
  protected createLocationInfo(
    name: string,
    address: string,
    city: string,
    state: string,
    distance: string,
    coordinates: { lat: number; lng: number },
    mapsUrl: string,
    directions: any[]
  ): LocationInfo {
    return {
      name,
      address,
      city,
      state,
      distance,
      coordinates,
      mapsUrl,
      directions
    };
  }

  protected createContentInfo(
    hero: { title: string; subtitle: string; description: string },
    about: { title: string; description: string; highlights: any[]; infoBox: { title: string; content: string }; image?: any }
  ): ContentInfo {
    return {
      hero,
      about
    };
  }

  protected createLogisticsInfo(
    schedule: { openTime: string; closeTime: string; notes?: string },
    meetingPoint: string,
    importantNotes: string[],
    tips: string[]
  ): LogisticsInfo {
    return {
      schedule,
      meetingPoint,
      importantNotes,
      tips
    };
  }

  protected createCommunityInfo(
    localPartners: string[],
    localInstructors: string[],
    specificSafetyProcedures: string[],
    visitedLocationId?: string
  ): CommunityInfo {
    return {
      localPartners,
      localInstructors,
      specificSafetyProcedures,
      visitedLocationId
    };
  }

  protected createSEOInfo(
    title: string,
    description: string,
    keywords: string[],
    ogImage: string
  ): SEOInfo {
    return {
      title,
      description,
      keywords,
      ogImage
    };
  }

  protected createVisualTheme(
    primaryColor: string,
    primaryColorHover: string,
    primaryColorActive: string,
    accentColor: string,
    backgroundColor: string,
    surfaceColor: string,
    textColor: string,
    textSecondaryColor: string,
    borderColor: string,
    gradientFrom: string,
    gradientTo: string,
    heroOverlay: string,
    cardBackground: string
  ): VisualTheme {
    return {
      primaryColor,
      primaryColorHover,
      primaryColorActive,
      accentColor,
      backgroundColor,
      surfaceColor,
      textColor,
      textSecondaryColor,
      borderColor,
      gradientFrom,
      gradientTo,
      heroOverlay,
      cardBackground
    };
  }

  // Method to get the complete theme configuration
  getThemeConfig(): ThemeConfig {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      content: this.content,
      gallery: this.gallery,
      activities: this.activities,
      logistics: this.logistics,
      community: this.community,
      seo: this.seo,
      visual: this.visual
    };
  }
}
