import { getThemeFromUrl, isValidThemeId, THEME_IDS } from '@/lib/theme-utils';

describe('Theme Query Parameters', () => {
  describe('isValidThemeId', () => {
    it('should return true for valid theme IDs', () => {
      expect(isValidThemeId('fazenda-ipanema')).toBe(true);
      expect(isValidThemeId('pedra-bela')).toBe(true);
    });

    it('should return false for invalid theme IDs', () => {
      expect(isValidThemeId('invalid-theme')).toBe(false);
      expect(isValidThemeId('')).toBe(false);
      expect(isValidThemeId('random')).toBe(false);
    });
  });

  describe('getThemeFromUrl', () => {
    it('should extract valid theme from URLSearchParams', () => {
      const searchParams = new URLSearchParams('?theme=pedra-bela');
      expect(getThemeFromUrl(searchParams)).toBe('pedra-bela');
    });

    it('should extract valid theme from URLSearchParams with multiple params', () => {
      const searchParams = new URLSearchParams('?theme=fazenda-ipanema&other=value');
      expect(getThemeFromUrl(searchParams)).toBe('fazenda-ipanema');
    });

    it('should return null for invalid theme', () => {
      const searchParams = new URLSearchParams('?theme=invalid-theme');
      expect(getThemeFromUrl(searchParams)).toBe(null);
    });

    it('should return null when no theme parameter', () => {
      const searchParams = new URLSearchParams('?other=value');
      expect(getThemeFromUrl(searchParams)).toBe(null);
    });

    it('should return null for empty search params', () => {
      const searchParams = new URLSearchParams('');
      expect(getThemeFromUrl(searchParams)).toBe(null);
    });
  });

  describe('THEME_IDS constants', () => {
    it('should have correct theme IDs', () => {
      expect(THEME_IDS.FAZENDA_IPANEMA).toBe('fazenda-ipanema');
      expect(THEME_IDS.PEDRA_BELA).toBe('pedra-bela');
    });

    it('should have only the expected theme IDs', () => {
      const themeIds = Object.values(THEME_IDS);
      expect(themeIds).toHaveLength(2);
      expect(themeIds).toContain('fazenda-ipanema');
      expect(themeIds).toContain('pedra-bela');
    });
  });
});

