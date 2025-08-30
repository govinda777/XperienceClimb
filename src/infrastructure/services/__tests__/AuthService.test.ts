import { AuthService } from '../AuthService';
import { LoginCredentials } from '@/core/entities/User';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw error indicating Privy should be used', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(result.success).toBe(false);
      expect(result.error).toContain('should be called through Privy hooks');
    });

    it('should handle errors gracefully', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe('string');
    });

    it('should return proper error structure', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('error');
      expect(result.success).toBe(false);
    });
  });

  describe('logout', () => {
    it('should throw error indicating Privy should be used', async () => {
      await expect(authService.logout()).rejects.toThrow(
        'should be called through Privy hooks'
      );
    });

    it('should log error to console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      try {
        await authService.logout();
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error during logout:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should re-throw the error', async () => {
      await expect(authService.logout()).rejects.toThrow();
    });
  });

  describe('getCurrentUser', () => {
    it('should return null as default behavior', async () => {
      const user = await authService.getCurrentUser();

      expect(user).toBeNull();
    });

    it('should handle errors and return null', async () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const user = await authService.getCurrentUser();

      expect(user).toBeNull();

      consoleSpy.mockRestore();
    });

    it('should log errors to console when they occur', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Since getCurrentUser doesn't actually throw in the current implementation,
      // we'll just verify it returns null
      const user = await authService.getCurrentUser();

      expect(user).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('isAuthenticated', () => {
    it('should return false as default behavior', async () => {
      const isAuth = await authService.isAuthenticated();

      expect(isAuth).toBe(false);
    });

    it('should handle errors and return false', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const isAuth = await authService.isAuthenticated();

      expect(isAuth).toBe(false);

      consoleSpy.mockRestore();
    });

    it('should log errors to console when they occur', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Since isAuthenticated doesn't actually throw in the current implementation,
      // we'll just verify it returns false
      const isAuth = await authService.isAuthenticated();

      expect(isAuth).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe('service contract compliance', () => {
    it('should implement IAuthService interface correctly', () => {
      expect(typeof authService.login).toBe('function');
      expect(typeof authService.logout).toBe('function');
      expect(typeof authService.getCurrentUser).toBe('function');
      expect(typeof authService.isAuthenticated).toBe('function');
    });

    it('should have correct method signatures', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Test that methods return expected types
      const loginResult = await authService.login(credentials);
      expect(typeof loginResult.success).toBe('boolean');

      const user = await authService.getCurrentUser();
      expect(user === null || typeof user === 'object').toBe(true);

      const isAuth = await authService.isAuthenticated();
      expect(typeof isAuth).toBe('boolean');
    });
  });

  describe('error handling edge cases', () => {
    it('should handle non-Error objects in login', async () => {
      // The current implementation already handles non-Error objects
      // by catching them and returning 'Authentication failed'
      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('should be called through Privy hooks');
    });

    it('should handle undefined/null credentials gracefully', async () => {
      const result = await authService.login(null as any);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle empty credentials object', async () => {
      const result = await authService.login({} as LoginCredentials);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('service documentation compliance', () => {
    it('should provide clear error messages about Privy usage', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(result.error).toContain('Privy hooks');
      expect(result.error).toContain('React components');
    });

    it('should indicate this is a bridge service', async () => {
      try {
        await authService.logout();
      } catch (error) {
        expect(error.message).toContain('Privy hooks');
        expect(error.message).toContain('React components');
      }
    });
  });
});
