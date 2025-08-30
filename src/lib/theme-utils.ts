import { ThemeConfig } from '@/themes/types';

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

/**
 * Gets the primary image for a theme (first image in gallery)
 */
export function getThemePrimaryImage(theme: ThemeConfig): string {
  return theme.gallery.images[0]?.src || '/images/placeholder.jpg';
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
