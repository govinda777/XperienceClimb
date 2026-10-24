import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from '../CartButton';
import { createCartStoreState } from '@/__tests__/test-utils';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

const mockCartStore = createCartStoreState();

jest.mock('@/store/useCartStore', () => ({
  useCartStore: () => mockCartStore,
}));

describe('CartButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCartStore.getTotalItems.mockReturnValue(0);
  });

  describe('rendering behavior', () => {
    it('should render floating button with default theme CTA', () => {
      render(<CartButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText(pedraBellaTheme.floatingCta!.tag)).toBeInTheDocument();
      expect(screen.getByText(pedraBellaTheme.floatingCta!.title)).toBeInTheDocument();
    });

    it('should show item count badge when cart has items', () => {
      mockCartStore.getTotalItems.mockReturnValue(3);

      render(<CartButton />);

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Carrinho (3)')).toBeInTheDocument();
      expect(screen.getByText('Ver Reserva ↗')).toBeInTheDocument();
    });

    it('should handle large item counts', () => {
      mockCartStore.getTotalItems.mockReturnValue(99);

      render(<CartButton />);

      expect(screen.getByText('99')).toBeInTheDocument();
      expect(screen.getByText('Carrinho (99)')).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('should call toggleCart when clicked with items in cart', () => {
      mockCartStore.getTotalItems.mockReturnValue(2);

      render(<CartButton />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockCartStore.toggleCart).toHaveBeenCalledTimes(1);
    });

    it('should not call toggleCart when cart is empty', () => {
      mockCartStore.getTotalItems.mockReturnValue(0);

      render(<CartButton />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockCartStore.toggleCart).not.toHaveBeenCalled();
    });
  });

  describe('hydration and mounting', () => {
    it('should render after mount', () => {
      const { container } = render(<CartButton />);
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle negative item counts gracefully', () => {
      mockCartStore.getTotalItems.mockReturnValue(-1);

      render(<CartButton />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByText('-1')).not.toBeInTheDocument();
    });

    it('should handle undefined getTotalItems return gracefully', () => {
      mockCartStore.getTotalItems.mockReturnValue(undefined as any);

      render(<CartButton />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(pedraBellaTheme.floatingCta!.title)).toBeInTheDocument();
    });
  });
});
