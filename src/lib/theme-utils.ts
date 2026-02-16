import { ThemeConfig } from '@/themes/types';
import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * Utility functions for theme management
 */

/**
 * Validates if a theme configuration is complete
 */
export function validateThemeConfig(theme: ThemeConfig): boolean {
  const requiredFields = [
    'id',
    'name',
    'location',
    'content',
    'gallery',
    'activities',
    'logistics',
    'seo'
  ];

  return requiredFields.every(field => {
    const value = theme[field as keyof ThemeConfig];
    return value !== undefined && value !== null;
  });
}

import { normalizeImageUrl } from './image-utils';

/**
 * Gets the primary image for a theme (first image in gallery)
 */
export function getThemePrimaryImage(theme: ThemeConfig): string {
  const firstImage = theme.gallery.images[0]?.src;
  if (!firstImage) return '/images/placeholder.jpg';

  const normalized = normalizeImageUrl(firstImage);
  return typeof normalized === 'string' ? normalized : normalized.src;
}

/**
 * Gets images by category from theme
 */
export function getImagesByCategory(theme: ThemeConfig, category: string) {
  if (category === 'all') {
    return theme.gallery.images;
  }
  return theme.gallery.images.filter(img => img.category === category);
}

/**
 * Formats theme location for display
 */
export function formatThemeLocation(theme: ThemeConfig): string {
  return `${theme.location.name} - ${theme.location.city}, ${theme.location.state}`;
}

/**
 * Gets theme-specific SEO meta tags
 */
export function getThemeMetaTags(theme: ThemeConfig) {
  return {
    title: theme.seo.title,
    description: theme.seo.description,
    keywords: theme.seo.keywords.join(', '),
    ogImage: theme.seo.ogImage,
    ogTitle: theme.seo.title,
    ogDescription: theme.seo.description,
  };
}

/**
 * Theme utility functions for URL management and theme operations
 */

export const THEME_IDS = {
  FAZENDA_IPANEMA: 'fazenda-ipanema',
  PEDRA_BELA: 'pedra-bela',
} as const;

export type ThemeId = typeof THEME_IDS[keyof typeof THEME_IDS];

/**
 * Generate a URL with theme query parameter
 * @param pathname - The pathname to add the theme to
 * @param themeId - The theme ID to set
 * @returns URL with theme query parameter
 */
export function generateThemeUrl(pathname: string, themeId: ThemeId): string {
  const url = new URL(pathname, window.location.origin);
  url.searchParams.set('theme', themeId);
  return url.pathname + url.search;
}

/**
 * Get theme ID from URL search params
 * @param searchParams - URLSearchParams or ReadonlyURLSearchParams object
 * @returns Theme ID or null if not found
 */
export function getThemeFromUrl(searchParams: URLSearchParams | ReadonlyURLSearchParams): ThemeId | null {
  const theme = searchParams.get('theme');
  return theme && Object.values(THEME_IDS).includes(theme as ThemeId)
    ? theme as ThemeId
    : null;
}

/**
 * Check if a theme ID is valid
 * @param themeId - Theme ID to validate
 * @returns True if valid, false otherwise
 */
export function isValidThemeId(themeId: string): themeId is ThemeId {
  return Object.values(THEME_IDS).includes(themeId as ThemeId);
}

/**
 * Get theme display name
 * @param themeId - Theme ID
 * @returns Display name for the theme
 */
export function getThemeDisplayName(themeId: ThemeId): string {
  const names = {
    [THEME_IDS.FAZENDA_IPANEMA]: 'Fazenda Ipanema',
    [THEME_IDS.PEDRA_BELA]: 'Pedra Bela',
  };
  return names[themeId] || themeId;
}

/**
 * Get theme location info
 * @param themeId - Theme ID
 * @returns Location information
 */
export function getThemeLocation(themeId: ThemeId) {
  const locations = {
    [THEME_IDS.FAZENDA_IPANEMA]: {
      city: 'Iperó',
      state: 'São Paulo',
      distance: '120km de São Paulo',
    },
    [THEME_IDS.PEDRA_BELA]: {
      city: 'Pedra Bela',
      state: 'São Paulo',
      distance: '119km de São Paulo',
    },
  };
  return locations[themeId];
}
