import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButton } from '../LoginButton';

// Mock Privy hooks
const mockPrivyHook = {
  ready: true,
  authenticated: false,
  user: null,
};

const mockLogin = jest.fn();
const mockLogout = jest.fn();

jest.mock('@privy-io/react-auth', () => ({
  usePrivy: () => mockPrivyHook,
  useLogin: () => ({ login: mockLogin }),
  useLogout: () => ({ logout: mockLogout }),
}));

// Mock UI components and icons
jest.mock('@/components/ui', () => ({
  Button: ({ children, onClick, variant, size, disabled, leftIcon, ...props }: any) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {leftIcon && <span data-testid="left-icon">{leftIcon}</span>}
      {children}
    </button>
  ),
}));

jest.mock('lucide-react', () => ({
  User: ({ className }: any) => <span data-testid="user-icon" className={className}>👤</span>,
  LogOut: ({ className }: any) => <span data-testid="logout-icon" className={className}>🚪</span>,
}));

describe('LoginButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrivyHook.ready = true;
    mockPrivyHook.authenticated = false;
    mockPrivyHook.user = null;
  });

  describe('loading state', () => {
    it('should show loading button when Privy is not ready', () => {
      mockPrivyHook.ready = false;

      render(<LoginButton />);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Loading...');
      expect(button).toBeDisabled();
    });

    it('should apply correct variant and size during loading', () => {
      mockPrivyHook.ready = false;

      render(<LoginButton variant="secondary" size="lg" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'secondary');
      expect(button).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      mockPrivyHook.authenticated = false;
      mockPrivyHook.user = null;
    });

    it('should show login button with default props', () => {
      render(<LoginButton />);

      const button = screen.getByRole('button', { name: /entrar/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-variant', 'primary');
      expect(button).toHaveAttribute('data-size', 'md');
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('should show login button with custom props', () => {
      render(<LoginButton variant="outline" size="xl" />);

      const button = screen.getByRole('button', { name: /entrar/i });
      expect(button).toHaveAttribute('data-variant', 'outline');
      expect(button).toHaveAttribute('data-size', 'xl');
    });

    it('should call login function when clicked', () => {
      render(<LoginButton />);

      const button = screen.getByRole('button', { name: /entrar/i });
      fireEvent.click(button);

      expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    it('should display user icon', () => {
      render(<LoginButton />);

      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
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

    it('should show user greeting and logout button', () => {
      render(<LoginButton />);

      expect(screen.getByText('Olá, test@example.com')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument();
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    });

    it('should call logout function when logout button is clicked', () => {
      render(<LoginButton />);

      const logoutButton = screen.getByRole('button', { name: /sair/i });
      fireEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('should handle user without email gracefully', () => {
      mockPrivyHook.user = {
        id: 'test-user-id',
        // No email property
      };

      render(<LoginButton />);

      expect(screen.getByText('Olá, Usuário')).toBeInTheDocument();
    });

    it('should handle user with empty email gracefully', () => {
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: {
          address: '',
        },
      };

      render(<LoginButton />);

      expect(screen.getByText('Olá, Usuário')).toBeInTheDocument();
    });

    it('should apply ghost variant to logout button', () => {
      render(<LoginButton />);

      const logoutButton = screen.getByRole('button', { name: /sair/i });
      expect(logoutButton).toHaveAttribute('data-variant', 'ghost');
    });

    it('should preserve size prop for logout button', () => {
      render(<LoginButton size="lg" />);

      const logoutButton = screen.getByRole('button', { name: /sair/i });
      expect(logoutButton).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('responsive behavior', () => {
    beforeEach(() => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: {
          address: 'test@example.com',
        },
      };
    });

    it('should hide user greeting on small screens', () => {
      render(<LoginButton />);

      const greeting = screen.getByText('Olá, test@example.com');
      expect(greeting).toHaveClass('hidden', 'sm:block');
    });
  });

  describe('accessibility', () => {
    it('should have accessible login button', () => {
      render(<LoginButton />);

      const button = screen.getByRole('button', { name: /entrar/i });
      expect(button).toBeInTheDocument();
    });

    it('should have accessible logout button when authenticated', () => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: { address: 'test@example.com' },
      };

      render(<LoginButton />);

      const button = screen.getByRole('button', { name: /sair/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid state changes', () => {
      const { rerender } = render(<LoginButton />);

      // Start not authenticated
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();

      // Change to authenticated
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = {
        id: 'test-user-id',
        email: { address: 'test@example.com' },
      };

      rerender(<LoginButton />);

      expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument();
      expect(screen.getByText('Olá, test@example.com')).toBeInTheDocument();
    });

    it('should handle null user object when authenticated is true', () => {
      mockPrivyHook.authenticated = true;
      mockPrivyHook.user = null;

      render(<LoginButton />);

      // Should fall back to login button
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });
  });
});
