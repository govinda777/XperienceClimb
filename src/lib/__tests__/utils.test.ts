import { cn, formatPrice, generateId, openWhatsApp } from '../utils';

// Mock window.open for WhatsApp tests
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
});

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500');
      expect(result).toBe('px-4 py-2 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
      expect(result).toBe('base-class conditional-class');
    });

    it('should merge Tailwind classes correctly', () => {
      const result = cn('px-4 px-6', 'py-2');
      expect(result).toBe('px-6 py-2');
    });
  });

  describe('formatPrice', () => {
    it('should format price in Brazilian Real', () => {
      expect(formatPrice(150)).toContain('150,00');
      expect(formatPrice(150)).toContain('R$');
      expect(formatPrice(1250.5)).toContain('1.250,50');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toContain('0,00');
      expect(formatPrice(0)).toContain('R$');
    });

    it('should handle decimal prices', () => {
      expect(formatPrice(99.99)).toContain('99,99');
      expect(formatPrice(99.99)).toContain('R$');
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });

    it('should generate IDs with reasonable length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe('openWhatsApp', () => {
    it('should open WhatsApp with correct URL for Brazilian number', () => {
      openWhatsApp('11999999999');

      expect(mockWindowOpen).toHaveBeenCalledWith('https://wa.me/5511999999999', '_blank');
    });

    it('should handle number with country code', () => {
      openWhatsApp('5511999999999');

      expect(mockWindowOpen).toHaveBeenCalledWith('https://wa.me/5511999999999', '_blank');
    });

    it('should include message when provided', () => {
      const message = 'Olá! Gostaria de mais informações sobre escalada.';
      openWhatsApp('11999999999', message);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    });

    it('should handle formatted phone numbers', () => {
      openWhatsApp('(11) 99999-9999');

      expect(mockWindowOpen).toHaveBeenCalledWith('https://wa.me/5511999999999', '_blank');
    });

    it('should handle phone with spaces and special characters', () => {
      openWhatsApp('+55 11 9 9999-9999');

      expect(mockWindowOpen).toHaveBeenCalledWith('https://wa.me/5511999999999', '_blank');
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined inputs gracefully', () => {
      expect(() => formatPrice(NaN)).not.toThrow();
    });
  });
});
