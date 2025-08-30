import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthGuard } from '../AuthGuard';

// Mock Privy
const mockPrivyHook = {
  ready: true,
  authenticated: false,
  login: jest.fn(),
};

jest.mock('@privy-io/react-auth', () => ({
  usePrivy: () => mockPrivyHook,
}));

// Mock UI components
jest.mock('@/components/ui', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('AuthGuard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrivyHook.ready = true;
    mockPrivyHook.authenticated = false;
  });

  describe('loading state', () => {
    it('should show loading spinner when Privy is not ready', () => {
      mockPrivyHook.ready = false;

      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('when requireAuth is false', () => {
    it('should show children regardless of authentication status', () => {
      mockPrivyHook.authenticated = false;

      render(
        <AuthGuard requireAuth={false}>
          <div>Public Content</div>
        </AuthGuard>
      );

      expect(screen.getByText('Public Content')).toBeInTheDocument();
    });

    it('should show children when authenticated', () => {
      mockPrivyHook.authenticated = true;

      render(
        <AuthGuard requireAuth={false}>
          <div>Public Content</div>
        </AuthGuard>
      );

      expect(screen.getByText('Public Content')).toBeInTheDocument();
    });
  });

  describe('when requireAuth is true (default)', () => {
    describe('and user is not authenticated', () => {
      beforeEach(() => {
        mockPrivyHook.authenticated = false;
      });

      it('should show default login prompt', () => {
        render(
          <AuthGuard>
            <div>Protected Content</div>
          </AuthGuard>
        );

        expect(screen.getByText('Login Necessário')).toBeInTheDocument();
        expect(screen.getByText('Fazer Login')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });

      it('should show custom fallback when provided', () => {
        const customFallback = <div>Custom Login Required</div>;

        render(
          <AuthGuard fallback={customFallback}>
            <div>Protected Content</div>
          </AuthGuard>
        );

        expect(screen.getByText('Custom Login Required')).toBeInTheDocument();
        expect(screen.queryByText('Login Necessário')).not.toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      });

      it('should call login function when login button is clicked', () => {
        render(
          <AuthGuard>
            <div>Protected Content</div>
          </AuthGuard>
        );

        const loginButton = screen.getByText('Fazer Login');
        fireEvent.click(loginButton);

        expect(mockPrivyHook.login).toHaveBeenCalledTimes(1);
      });

      it('should display climbing emoji and proper styling', () => {
        render(
          <AuthGuard>
            <div>Protected Content</div>
          </AuthGuard>
        );

        expect(screen.getByText('🧗‍♂️')).toBeInTheDocument();
        expect(screen.getByText('Faça login para acessar essa funcionalidade e continuar sua jornada de escalada.')).toBeInTheDocument();
      });
    });

    describe('and user is authenticated', () => {
      beforeEach(() => {
        mockPrivyHook.authenticated = true;
      });

      it('should show protected content', () => {
        render(
          <AuthGuard>
            <div>Protected Content</div>
          </AuthGuard>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByText('Login Necessário')).not.toBeInTheDocument();
      });

      it('should show protected content even with fallback provided', () => {
        const customFallback = <div>Custom Login Required</div>;

        render(
          <AuthGuard fallback={customFallback}>
            <div>Protected Content</div>
          </AuthGuard>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByText('Custom Login Required')).not.toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      mockPrivyHook.authenticated = false;

      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Login Necessário');
    });

    it('should have accessible button', () => {
      mockPrivyHook.authenticated = false;

      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      const button = screen.getByRole('button', { name: 'Fazer Login' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle multiple children', () => {
      mockPrivyHook.authenticated = true;

      render(
        <AuthGuard>
          <div>First Child</div>
          <div>Second Child</div>
        </AuthGuard>
      );

      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
    });

    it('should handle complex fallback components', () => {
      mockPrivyHook.authenticated = false;

      const complexFallback = (
        <div>
          <h1>Custom Auth Required</h1>
          <button>Custom Login</button>
        </div>
      );

      render(
        <AuthGuard fallback={complexFallback}>
          <div>Protected Content</div>
        </AuthGuard>
      );

      expect(screen.getByText('Custom Auth Required')).toBeInTheDocument();
      expect(screen.getByText('Custom Login')).toBeInTheDocument();
    });
  });
});
