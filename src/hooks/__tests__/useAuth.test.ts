import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock Privy
const mockPrivyHook = {
  ready: true,
  authenticated: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
};

jest.mock('@privy-io/react-auth', () => ({
  usePrivy: () => mockPrivyHook,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrivyHook.ready = true;
    mockPrivyHook.authenticated = false;
    mockPrivyHook.user = null;
  });

  describe('when user is not authenticated', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.ready).toBe(true);
      expect(result.current.authenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isGuest).toBe(true);
      expect(result.current.isLoggedIn).toBe(false);
    });

    it('should provide login and logout functions', () => {
      const { result } = renderHook(() => useAuth());

      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.logout).toBe('function');
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: {
          address: 'test@example.com',
        },
      };
    });

    it('should return authenticated user state', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.authenticated).toBe(true);
      expect(result.current.user).toBeDefined();
      expect(result.current.user?.email).toBe('test@example.com');
      expect(result.current.user?.name).toBe('test');
      expect(result.current.isLoggedIn).toBe(true);
      expect(result.current.isGuest).toBe(false);
    });

    it('should load user preferences from localStorage', () => {
      const mockPreferences = {
        experienceLevel: 'advanced',
        notifications: false,
        language: 'en',
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockPreferences));

      const { result } = renderHook(() => useAuth());

      expect(localStorageMock.getItem).toHaveBeenCalledWith('userPrefs_test-user-id');
      expect(result.current.user?.preferences).toEqual(mockPreferences);
    });

    it('should use default preferences when none exist in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useAuth());

      expect(result.current.user?.preferences).toEqual({
        experienceLevel: 'beginner',
        notifications: true,
        language: 'pt',
      });
    });

    it('should provide user info shortcuts', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.userEmail).toBe('test@example.com');
      expect(result.current.userName).toBe('test');
      expect(result.current.userPreferences).toBeDefined();
    });
  });

  describe('updateUserPreferences', () => {
    beforeEach(() => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: {
          address: 'test@example.com',
        },
      };
    });

    it('should update user preferences and save to localStorage', async () => {
      const { result } = renderHook(() => useAuth());

      const newPreferences = {
        experienceLevel: 'advanced' as const,
      };

      await act(async () => {
        await result.current.updateUserPreferences(newPreferences);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'userPrefs_test-user-id',
        JSON.stringify({
          experienceLevel: 'advanced',
          notifications: true,
          language: 'pt',
        })
      );
    });

    it('should throw error when user is not authenticated', async () => {
      mockPrivyHook.authenticated = false;
      mockPrivyHook.user = null;

      const { result } = renderHook(() => useAuth());

      await expect(
        result.current.updateUserPreferences({ experienceLevel: 'advanced' })
      ).rejects.toThrow('User not authenticated');
    });
  });

  describe('loading states', () => {
    it('should show loading when Privy is not ready', () => {
      mockPrivyHook.ready = false;

      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.ready).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle user without email', () => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        // No email property
      };

      const { result } = renderHook(() => useAuth());

      expect(result.current.user?.email).toBe('');
      expect(result.current.user?.name).toBe('Usuário');
    });

    it('should handle localStorage errors gracefully', () => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: {
          address: 'test@example.com',
        },
      };

      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const { result } = renderHook(() => useAuth());

      // Should use default preferences when localStorage fails
      expect(result.current.user?.preferences).toEqual({
        experienceLevel: 'beginner',
        notifications: true,
        language: 'pt',
      });
    });
  });
});
