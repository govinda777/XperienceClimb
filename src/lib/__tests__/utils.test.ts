import {
  cn,
  formatPrice,
  formatDate,
  generateId,
  debounce,
  throttle,
  isValidEmail,
  isValidPhone,
  formatPhone,
  openWhatsApp,
} from '../utils';

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
      expect(formatPrice(150)).toBe('R$ 150,00');
      expect(formatPrice(1250.50)).toBe('R$ 1.250,50');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('R$ 0,00');
    });

    it('should handle decimal prices', () => {
      expect(formatPrice(99.99)).toBe('R$ 99,99');
    });
  });

  describe('formatDate', () => {
    it('should format date in Brazilian format', () => {
      const date = new Date('2024-12-25');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should handle different dates consistently', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-12-31');
      
      expect(formatDate(date1)).toBeTruthy();
      expect(formatDate(date2)).toBeTruthy();
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

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      debouncedFn('second');
      
      jest.advanceTimersByTime(100);
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('second');
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should limit function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      throttledFn('second');
      throttledFn('third');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');
    });

    it('should allow calls after throttle period', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      jest.advanceTimersByTime(100);
      throttledFn('second');

      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
      expect(mockFn).toHaveBeenNthCalledWith(2, 'second');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct Brazilian phone formats', () => {
      expect(isValidPhone('(11) 99999-9999')).toBe(true);
      expect(isValidPhone('(21) 8888-8888')).toBe(true);
    });

    it('should reject invalid phone formats', () => {
      expect(isValidPhone('11999999999')).toBe(false);
      expect(isValidPhone('(11) 999999999')).toBe(false);
      expect(isValidPhone('11 99999-9999')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('formatPhone', () => {
    it('should format 11-digit phone numbers', () => {
      expect(formatPhone('11999999999')).toBe('(11) 99999-9999');
      expect(formatPhone('21987654321')).toBe('(21) 98765-4321');
    });

    it('should format 10-digit phone numbers', () => {
      expect(formatPhone('1188888888')).toBe('(11) 8888-8888');
      expect(formatPhone('2177777777')).toBe('(21) 7777-7777');
    });

    it('should handle phone numbers with existing formatting', () => {
      expect(formatPhone('(11) 99999-9999')).toBe('(11) 99999-9999');
    });

    it('should return original string for invalid lengths', () => {
      expect(formatPhone('123')).toBe('123');
      expect(formatPhone('123456789012')).toBe('123456789012');
    });

    it('should handle mixed characters', () => {
      expect(formatPhone('11 9 9999-9999')).toBe('(11) 99999-9999');
      expect(formatPhone('+55 11 99999-9999')).toBe('(11) 99999-9999');
    });
  });

  describe('openWhatsApp', () => {
    it('should open WhatsApp with correct URL for Brazilian number', () => {
      openWhatsApp('11999999999');
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/5511999999999',
        '_blank'
      );
    });

    it('should handle number with country code', () => {
      openWhatsApp('5511999999999');
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/5511999999999',
        '_blank'
      );
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
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/5511999999999',
        '_blank'
      );
    });

    it('should handle phone with spaces and special characters', () => {
      openWhatsApp('+55 11 9 9999-9999');
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/5511999999999',
        '_blank'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings gracefully', () => {
      expect(formatPhone('')).toBe('');
      expect(isValidEmail('')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });

    it('should handle null/undefined inputs gracefully', () => {
      expect(() => formatPrice(NaN)).not.toThrow();
      expect(() => formatDate(new Date('invalid'))).not.toThrow();
    });
  });
});
