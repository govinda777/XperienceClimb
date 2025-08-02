import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartModal } from '../CartModal';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { createMockCartItem, MOCK_CART_ITEMS, resetAuthMocks } from '@/__tests__/test-utils';

// Mock dependencies
jest.mock('@/store/useCartStore');
jest.mock('@/hooks/useAuth');
jest.mock('@/lib/utils', () => ({
  formatPrice: (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`,
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  X: ({ className, ...props }: any) => (
    <svg data-testid="close-icon" className={className} {...props} />
  ),
  ShoppingCart: ({ className, ...props }: any) => (
    <svg data-testid="shopping-cart-icon" className={className} {...props} />
  ),
  Plus: ({ className, ...props }: any) => (
    <svg data-testid="plus-icon" className={className} {...props} />
  ),
  Minus: ({ className, ...props }: any) => (
    <svg data-testid="minus-icon" className={className} {...props} />
  ),
  CreditCard: ({ className, ...props }: any) => (
    <svg data-testid="credit-card-icon" className={className} {...props} />
  ),
}));

// Mock CheckoutForm component
jest.mock('../CheckoutForm', () => ({
  CheckoutForm: ({ onBack, onSuccess }: any) => (
    <div data-testid="checkout-form">
      <button onClick={onBack} data-testid="checkout-back">
        Voltar
      </button>
      <button onClick={onSuccess} data-testid="checkout-success">
        Finalizar
      </button>
    </div>
  ),
}));

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('CartModal', () => {
  const mockCloseCart = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockUpdateQuantity = jest.fn();
  const mockClearCart = jest.fn();
  const mockGetTotalPrice = jest.fn();
  const mockGetTotalItems = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    resetAuthMocks();

    // Default auth mock
    mockUseAuth.mockReturnValue({
      user: null,
      isLoggedIn: false,
      login: mockLogin,
      logout: jest.fn(),
    });

    // Default cart store mock
    mockUseCartStore.mockReturnValue({
      items: [],
      isOpen: false,
      addItem: jest.fn(),
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      toggleCart: jest.fn(),
      openCart: jest.fn(),
      closeCart: mockCloseCart,
      getTotalPrice: mockGetTotalPrice,
      getTotalItems: mockGetTotalItems,
      getItemCount: jest.fn(() => 0),
    });
  });

  describe('when modal is closed', () => {
    it('should not render when isOpen is false', () => {
      mockUseCartStore.mockReturnValue({
        items: [],
        isOpen: false,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 0),
      });

      const { container } = render(<CartModal />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when modal is open and cart is empty', () => {
    beforeEach(() => {
      mockGetTotalItems.mockReturnValue(0);
      mockGetTotalPrice.mockReturnValue(0);
      mockUseCartStore.mockReturnValue({
        items: [],
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 0),
      });
    });

    it('should render modal with empty cart message', () => {
      render(<CartModal />);

      expect(screen.getByText('Carrinho vazio')).toBeInTheDocument();
      expect(
        screen.getByText('Adicione experiências de escalada ao seu carrinho para continuar.')
      ).toBeInTheDocument();
    });

    it('should display shopping cart icon in empty state', () => {
      render(<CartModal />);

      expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
    });

    it('should close modal when X button is clicked', () => {
      render(<CartModal />);

      const closeButton = screen.getByTestId('close-icon').closest('button');
      fireEvent.click(closeButton!);

      expect(mockCloseCart).toHaveBeenCalledTimes(1);
    });

    it('should close modal when backdrop is clicked', () => {
      render(<CartModal />);

      const backdrop = document.querySelector('.bg-black\\/50');
      fireEvent.click(backdrop!);

      expect(mockCloseCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('when modal is open and cart has items', () => {
    beforeEach(() => {
      mockGetTotalItems.mockReturnValue(3);
      mockGetTotalPrice.mockReturnValue(650);
      mockUseCartStore.mockReturnValue({
        items: MOCK_CART_ITEMS,
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 3),
      });
    });

    it('should render modal header with cart title and item count', () => {
      render(<CartModal />);

      expect(screen.getByText('Meu Carrinho')).toBeInTheDocument();
      expect(screen.getByText('(3 itens)')).toBeInTheDocument();
    });

    it('should display all cart items', () => {
      render(<CartModal />);

      expect(screen.getByText('Escalada Iniciante')).toBeInTheDocument();
      expect(screen.getByText('Escalada Avançada')).toBeInTheDocument();
      expect(screen.getByText('Participante: João Silva')).toBeInTheDocument();
      expect(screen.getByText('Participante: Maria Santos')).toBeInTheDocument();
    });

    it('should display formatted prices', () => {
      render(<CartModal />);

      expect(screen.getByText('R$ 150,00')).toBeInTheDocument();
      expect(screen.getByText('R$ 250,00')).toBeInTheDocument();
    });

    it('should display total price', () => {
      render(<CartModal />);

      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('R$ 650,00')).toBeInTheDocument();
    });

    it('should display quantity controls for each item', () => {
      render(<CartModal />);

      const minusButtons = screen.getAllByTestId('minus-icon');
      const plusButtons = screen.getAllByTestId('plus-icon');

      expect(minusButtons).toHaveLength(2);
      expect(plusButtons).toHaveLength(2);
    });

    it('should show remove buttons for each item', () => {
      render(<CartModal />);

      const removeButtons = screen.getAllByText('Remover');
      expect(removeButtons).toHaveLength(2);
    });

    it('should show clear cart button', () => {
      render(<CartModal />);

      expect(screen.getByText('Limpar carrinho')).toBeInTheDocument();
    });
  });

  describe('cart item interactions', () => {
    beforeEach(() => {
      mockGetTotalItems.mockReturnValue(1);
      mockGetTotalPrice.mockReturnValue(150);
      mockUseCartStore.mockReturnValue({
        items: [createMockCartItem()],
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 1),
      });
    });

    it('should call removeItem when remove button is clicked', () => {
      render(<CartModal />);

      const removeButton = screen.getByText('Remover');
      fireEvent.click(removeButton);

      expect(mockRemoveItem).toHaveBeenCalledWith('cart-item-1');
    });

    it('should call updateQuantity when plus button is clicked', () => {
      render(<CartModal />);

      const plusButton = screen.getByTestId('plus-icon').closest('button');
      fireEvent.click(plusButton!);

      expect(mockUpdateQuantity).toHaveBeenCalledWith('cart-item-1', 2);
    });

    it('should call updateQuantity when minus button is clicked', () => {
      render(<CartModal />);

      const minusButton = screen.getByTestId('minus-icon').closest('button');
      fireEvent.click(minusButton!);

      expect(mockUpdateQuantity).toHaveBeenCalledWith('cart-item-1', 0);
    });

    it('should disable minus button when quantity is 1', () => {
      render(<CartModal />);

      const minusButton = screen.getByTestId('minus-icon').closest('button');
      expect(minusButton).toBeDisabled();
    });

    it('should call clearCart when clear cart button is clicked', () => {
      render(<CartModal />);

      const clearButton = screen.getByText('Limpar carrinho');
      fireEvent.click(clearButton);

      expect(mockClearCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkout interactions when user is not logged in', () => {
    beforeEach(() => {
      mockGetTotalItems.mockReturnValue(1);
      mockGetTotalPrice.mockReturnValue(150);
      mockUseCartStore.mockReturnValue({
        items: [createMockCartItem()],
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 1),
      });

      mockUseAuth.mockReturnValue({
        user: null,
        isLoggedIn: false,
        login: mockLogin,
        logout: jest.fn(),
      });
    });

    it('should display "Entrar e Comprar" button when user is not logged in', () => {
      render(<CartModal />);

      expect(screen.getByText('Entrar e Comprar')).toBeInTheDocument();
    });

    it('should call login when checkout button is clicked and user is not logged in', () => {
      render(<CartModal />);

      const checkoutButton = screen.getByText('Entrar e Comprar');
      fireEvent.click(checkoutButton);

      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkout interactions when user is logged in', () => {
    beforeEach(() => {
      mockGetTotalItems.mockReturnValue(1);
      mockGetTotalPrice.mockReturnValue(150);
      mockUseCartStore.mockReturnValue({
        items: [createMockCartItem()],
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 1),
      });

      mockUseAuth.mockReturnValue({
        user: { id: 'user-1', email: 'test@example.com', createdAt: new Date() },
        isLoggedIn: true,
        login: mockLogin,
        logout: jest.fn(),
      });
    });

    it('should display "Finalizar Compra" button when user is logged in', () => {
      render(<CartModal />);

      expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    });

    it('should show checkout form when checkout button is clicked and user is logged in', () => {
      render(<CartModal />);

      const checkoutButton = screen.getByText('Finalizar Compra');
      fireEvent.click(checkoutButton);

      expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
      expect(screen.getByText('Finalizar Compra')).toBeInTheDocument(); // Header changes
    });

    it('should go back to cart when back button is clicked in checkout form', () => {
      render(<CartModal />);

      // Go to checkout
      const checkoutButton = screen.getByText('Finalizar Compra');
      fireEvent.click(checkoutButton);

      // Click back
      const backButton = screen.getByTestId('checkout-back');
      fireEvent.click(backButton);

      expect(screen.getByText('Meu Carrinho')).toBeInTheDocument();
      expect(screen.queryByTestId('checkout-form')).not.toBeInTheDocument();
    });

    it('should close modal and clear cart when checkout is successful', () => {
      render(<CartModal />);

      // Go to checkout
      const checkoutButton = screen.getByText('Finalizar Compra');
      fireEvent.click(checkoutButton);

      // Complete checkout
      const successButton = screen.getByTestId('checkout-success');
      fireEvent.click(successButton);

      expect(mockClearCart).toHaveBeenCalledTimes(1);
      expect(mockCloseCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('hydration handling', () => {
    it('should not render during SSR (before mount)', () => {
      // Mock useEffect to not run (simulating SSR)
      const mockUseEffect = jest.spyOn(React, 'useEffect');
      mockUseEffect.mockImplementation(() => {});

      mockUseCartStore.mockReturnValue({
        items: [createMockCartItem()],
        isOpen: true,
        addItem: jest.fn(),
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        toggleCart: jest.fn(),
        openCart: jest.fn(),
        closeCart: mockCloseCart,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: mockGetTotalItems,
        getItemCount: jest.fn(() => 1),
      });

      const { container } = render(<CartModal />);
      expect(container.firstChild).toBeNull();

      mockUseEffect.mockRestore();
    });
  });
});
