import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * Theme utility functions for URL management and theme operations
 */

export const THEME_IDS = {
  FAZENDA_IPANEMA: 'fazenda-ipanema',
  PEDRA_BELA: 'pedra-bela',
} as const;

export type ThemeId = (typeof THEME_IDS)[keyof typeof THEME_IDS];

/**
 * Get theme ID from URL search params
 * @param searchParams - URLSearchParams or ReadonlyURLSearchParams object
 * @returns Theme ID or null if not found
 */
export function getThemeFromUrl(
  searchParams: URLSearchParams | ReadonlyURLSearchParams
): ThemeId | null {
  const theme = searchParams.get('theme');
  return theme && Object.values(THEME_IDS).includes(theme as ThemeId) ? (theme as ThemeId) : null;
}

/**
 * Check if a theme ID is valid
 * @param themeId - Theme ID to validate
 * @returns True if valid, false otherwise
 */
export function isValidThemeId(themeId: string): themeId is ThemeId {
  return Object.values(THEME_IDS).includes(themeId as ThemeId);
}
