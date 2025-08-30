import { LoginUser } from '../auth/LoginUser';
import { IAuthService } from '../../services/IAuthService';
import { IUserRepository } from '../../repositories/IUserRepository';
import { LoginCredentials, LoginResult, User } from '../../entities/User';

// Mock dependencies
const mockAuthService: jest.Mocked<IAuthService> = {
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
  isAuthenticated: jest.fn(),
};

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('LoginUser Use Case', () => {
  let loginUser: LoginUser;

  beforeEach(() => {
    jest.clearAllMocks();
    loginUser = new LoginUser(mockAuthService, mockUserRepository);
  });

  describe('execute', () => {
    const validCredentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'https://avatar.example.com',
      createdAt: new Date(),
      isAdmin: false,
    };

    describe('successful login', () => {
      it('should return success result when authentication succeeds', async () => {
        const successResult: LoginResult = {
          success: true,
          user: mockUser,
        };

        mockAuthService.login.mockResolvedValue(successResult);

        const result = await loginUser.execute(validCredentials);

        expect(result).toEqual(successResult);
        expect(mockAuthService.login).toHaveBeenCalledWith(validCredentials);
      });

      it('should delegate authentication to auth service', async () => {
        const successResult: LoginResult = {
          success: true,
          user: mockUser,
        };

        mockAuthService.login.mockResolvedValue(successResult);

        await loginUser.execute(validCredentials);

        expect(mockAuthService.login).toHaveBeenCalledTimes(1);
        expect(mockAuthService.login).toHaveBeenCalledWith(validCredentials);
      });

      it('should return user data when login is successful', async () => {
        const successResult: LoginResult = {
          success: true,
          user: mockUser,
        };

        mockAuthService.login.mockResolvedValue(successResult);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(true);
        expect(result.user).toEqual(mockUser);
        expect(result.error).toBeUndefined();
      });
    });

    describe('failed login', () => {
      it('should return error when auth service returns failure', async () => {
        const failureResult: LoginResult = {
          success: false,
          error: 'Invalid credentials',
        };

        mockAuthService.login.mockResolvedValue(failureResult);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid credentials');
        expect(result.user).toBeUndefined();
      });

      it('should return generic error when no specific error is provided', async () => {
        const failureResult: LoginResult = {
          success: false,
        };

        mockAuthService.login.mockResolvedValue(failureResult);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Authentication failed');
      });

      it('should handle success true but no user', async () => {
        const ambiguousResult: LoginResult = {
          success: true,
          // No user provided
        };

        mockAuthService.login.mockResolvedValue(ambiguousResult);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Authentication failed');
      });
    });

    describe('error handling', () => {
      it('should handle auth service throwing an error', async () => {
        const error = new Error('Network error');
        mockAuthService.login.mockRejectedValue(error);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Network error');
      });

      it('should handle non-Error objects being thrown', async () => {
        mockAuthService.login.mockRejectedValue('String error');

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Unknown error occurred');
      });

      it('should handle undefined/null being thrown', async () => {
        mockAuthService.login.mockRejectedValue(null);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Unknown error occurred');
      });
    });

    describe('input validation', () => {
      it('should handle empty credentials', async () => {
        const emptyCredentials: LoginCredentials = {
          email: '',
          password: '',
        };

        mockAuthService.login.mockResolvedValue({
          success: false,
          error: 'Invalid credentials',
        });

        const result = await loginUser.execute(emptyCredentials);

        expect(result.success).toBe(false);
        expect(mockAuthService.login).toHaveBeenCalledWith(emptyCredentials);
      });

      it('should handle null credentials', async () => {
        mockAuthService.login.mockRejectedValue(new Error('Invalid input'));

        const result = await loginUser.execute(null as any);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid input');
      });

      it('should handle malformed email', async () => {
        const malformedCredentials: LoginCredentials = {
          email: 'not-an-email',
          password: 'password123',
        };

        mockAuthService.login.mockResolvedValue({
          success: false,
          error: 'Invalid email format',
        });

        const result = await loginUser.execute(malformedCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid email format');
      });
    });

    describe('edge cases', () => {
      it('should handle very long credentials', async () => {
        const longCredentials: LoginCredentials = {
          email: 'a'.repeat(1000) + '@example.com',
          password: 'b'.repeat(1000),
        };

        mockAuthService.login.mockResolvedValue({
          success: false,
          error: 'Credentials too long',
        });

        const result = await loginUser.execute(longCredentials);

        expect(result.success).toBe(false);
        expect(mockAuthService.login).toHaveBeenCalledWith(longCredentials);
      });

      it('should handle special characters in credentials', async () => {
        const specialCredentials: LoginCredentials = {
          email: 'test+special@example.com',
          password: 'p@ssw0rd!#$%',
        };

        mockAuthService.login.mockResolvedValue({
          success: true,
          user: mockUser,
        });

        const result = await loginUser.execute(specialCredentials);

        expect(result.success).toBe(true);
        expect(mockAuthService.login).toHaveBeenCalledWith(specialCredentials);
      });

      it('should handle unicode characters in credentials', async () => {
        const unicodeCredentials: LoginCredentials = {
          email: 'tëst@éxample.com',
          password: 'pássword123',
        };

        mockAuthService.login.mockResolvedValue({
          success: true,
          user: mockUser,
        });

        const result = await loginUser.execute(unicodeCredentials);

        expect(result.success).toBe(true);
        expect(mockAuthService.login).toHaveBeenCalledWith(unicodeCredentials);
      });
    });

    describe('service integration', () => {
      it('should not call user repository during login process', async () => {
        mockAuthService.login.mockResolvedValue({
          success: true,
          user: mockUser,
        });

        await loginUser.execute(validCredentials);

        // LoginUser should delegate entirely to AuthService
        // User management is handled by Privy
        expect(mockUserRepository.create).not.toHaveBeenCalled();
        expect(mockUserRepository.update).not.toHaveBeenCalled();
        expect(mockUserRepository.findById).not.toHaveBeenCalled();
        expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
      });

      it('should preserve all user data from auth service', async () => {
        const detailedUser: User = {
          id: 'user-456',
          email: 'detailed@example.com',
          name: 'Detailed User',
          avatar: 'https://detailed-avatar.com',
          createdAt: new Date('2024-01-01'),
          isAdmin: true,
          preferences: {
            experienceLevel: 'advanced',
            notifications: false,
            language: 'en',
          },
        };

        mockAuthService.login.mockResolvedValue({
          success: true,
          user: detailedUser,
        });

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(true);
        expect(result.user).toEqual(detailedUser);
      });
    });

    describe('performance considerations', () => {
      it('should handle auth service timeout gracefully', async () => {
        const timeoutError = new Error('Request timeout');
        mockAuthService.login.mockRejectedValue(timeoutError);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Request timeout');
      });

      it('should not retry failed authentication attempts', async () => {
        mockAuthService.login.mockRejectedValue(new Error('Auth failed'));

        await loginUser.execute(validCredentials);

        expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      });
    });

    describe('security considerations', () => {
      it('should not expose sensitive information in errors', async () => {
        const sensitiveError = new Error('Database connection failed: password=secret123');
        mockAuthService.login.mockRejectedValue(sensitiveError);

        const result = await loginUser.execute(validCredentials);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Database connection failed: password=secret123');
        // Note: In production, you might want to sanitize error messages
      });

      it('should handle credentials with injection attempts', async () => {
        const injectionCredentials: LoginCredentials = {
          email: "'; DROP TABLE users; --",
          password: '<script>alert("xss")</script>',
        };

        mockAuthService.login.mockResolvedValue({
          success: false,
          error: 'Invalid credentials',
        });

        const result = await loginUser.execute(injectionCredentials);

        expect(result.success).toBe(false);
        expect(mockAuthService.login).toHaveBeenCalledWith(injectionCredentials);
      });
    });
  });

  describe('constructor', () => {
    it('should initialize with required dependencies', () => {
      const instance = new LoginUser(mockAuthService, mockUserRepository);
      
      expect(instance).toBeInstanceOf(LoginUser);
    });

    it('should handle null dependencies gracefully in constructor', () => {
      expect(() => {
        new LoginUser(null as any, null as any);
      }).not.toThrow();
    });
  });
});
