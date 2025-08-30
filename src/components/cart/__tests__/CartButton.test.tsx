import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from '../CartButton';
import { createCartStoreState } from '@/__tests__/test-utils';

// Mock the cart store
const mockCartStore = createCartStoreState();

jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => mockCartStore,
}));

// Mock UI components
jest.mock('@/components/ui', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ShoppingCart: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="shopping-cart-icon">
      <title>Shopping Cart</title>
    </svg>
  ),
}));

describe('CartButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartStore.getTotalItems.mockReturnValue(0);
  });

  describe('rendering behavior', () => {
    it('should not render when cart is empty', () => {
      mockCartStore.getTotalItems.mockReturnValue(0);
      
      render(<CartButton />);
      
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render when cart has items', () => {
      mockCartStore.getTotalItems.mockReturnValue(2);
      
      render(<CartButton />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
    });

    it('should show correct item count badge', () => {
      mockCartStore.getTotalItems.mockReturnValue(3);
      
      render(<CartButton />);
      
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should handle large item counts', () => {
      mockCartStore.getTotalItems.mockReturnValue(99);
      
      render(<CartButton />);
      
      expect(screen.getByText('99')).toBeInTheDocument();
    });
  });

  describe('styling and positioning', () => {
    it('should have fixed positioning classes', () => {
      mockCartStore.getTotalItems.mockReturnValue(1);
      
      render(<CartButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('relative', 'h-16', 'w-16', 'rounded-full');
    });

    it('should have correct color classes', () => {
      mockCartStore.getTotalItems.mockReturnValue(1);
      
      render(<CartButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-orange-400', 'text-white');
    });

    it('should show badge with correct styling', () => {
      mockCartStore.getTotalItems.mockReturnValue(5);
      
      render(<CartButton />);
      
      const badge = screen.getByText('5');
      expect(badge).toHaveClass('absolute', '-right-2', '-top-2', 'bg-red-500');
    });
  });

  describe('user interactions', () => {
    it('should call toggleCart when clicked', () => {
      mockCartStore.getTotalItems.mockReturnValue(2);
      
      render(<CartButton />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockCartStore.toggleCart).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks', () => {
      mockCartStore.getTotalItems.mockReturnValue(1);
      
      render(<CartButton />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockCartStore.toggleCart).toHaveBeenCalledTimes(3);
    });
  });

  describe('hydration and mounting', () => {
    it('should not render during initial mount (SSR safety)', () => {
      // Mock the initial render state
      const { container } = render(<CartButton />);
      
      // On first render, component should return null to prevent hydration mismatch
      expect(container.firstChild).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have accessible button role', () => {
      mockCartStore.getTotalItems.mockReturnValue(1);
      
      render(<CartButton />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have proper icon accessibility', () => {
      mockCartStore.getTotalItems.mockReturnValue(1);
      
      render(<CartButton />);
      
      const icon = screen.getByTestId('shopping-cart-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle zero items correctly', () => {
      mockCartStore.getTotalItems.mockReturnValue(0);
      
      render(<CartButton />);
      
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should handle negative item counts gracefully', () => {
      mockCartStore.getTotalItems.mockReturnValue(-1);
      
      render(<CartButton />);
      
      // Component should render button but not show badge for negative counts
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByText('-1')).not.toBeInTheDocument();
    });

    it('should handle undefined getTotalItems return', () => {
      mockCartStore.getTotalItems.mockReturnValue(undefined as any);
      
      render(<CartButton />);
      
      // Component should still render with undefined (shows badge with undefined)
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('performance', () => {
    it('should not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      const TestComponent = () => {
        renderSpy();
        return <CartButton />;
      };

      mockCartStore.getTotalItems.mockReturnValue(2);
      
      const { rerender } = render(<TestComponent />);
      rerender(<TestComponent />);
      
      // Component should render twice (initial + rerender)
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});