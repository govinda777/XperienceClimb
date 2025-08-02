import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CartItem, User } from '@/types';

// Mock implementations for auth context
interface MockAuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: jest.Mock;
  logout: jest.Mock;
}

const mockAuthContext: MockAuthContextValue = {
  user: null,
  isLoggedIn: false,
  login: jest.fn(),
  logout: jest.fn(),
};

// Mock useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockAuthContext,
}));

// Test wrapper component
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test data factories
export const createMockCartItem = (overrides?: Partial<CartItem>): CartItem => ({
  id: 'cart-item-1',
  packageId: 'pkg-1',
  packageName: 'Escalada Iniciante',
  price: 150,
  quantity: 1,
  participantName: 'João Silva',
  experience: 'beginner',
  addedAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: 'user-1',
  email: 'joao@example.com',
  name: 'João Silva',
  avatar: 'https://avatar.example.com',
  createdAt: new Date('2024-01-01T10:00:00Z'),
  isAdmin: false,
  ...overrides,
});

// Auth test helpers
export const mockAuthLoggedIn = (user?: Partial<User>) => {
  mockAuthContext.user = createMockUser(user);
  mockAuthContext.isLoggedIn = true;
};

export const mockAuthLoggedOut = () => {
  mockAuthContext.user = null;
  mockAuthContext.isLoggedIn = false;
};

// Reset mocks
export const resetAuthMocks = () => {
  mockAuthContext.login.mockClear();
  mockAuthContext.logout.mockClear();
  mockAuthLoggedOut();
};

// Cart store test helpers
export const createCartStoreState = (items: CartItem[] = [], isOpen = false) => ({
  items,
  isOpen,
  addItem: jest.fn(),
  removeItem: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  toggleCart: jest.fn(),
  openCart: jest.fn(),
  closeCart: jest.fn(),
  getTotalPrice: jest.fn(() =>
    items.reduce((total, item) => total + item.price * item.quantity, 0)
  ),
  getTotalItems: jest.fn(() => items.reduce((total, item) => total + item.quantity, 0)),
  getItemCount: jest.fn((packageId: string) =>
    items
      .filter(item => item.packageId === packageId)
      .reduce((total, item) => total + item.quantity, 0)
  ),
});

// DOM test helpers
export const getCartButton = () => {
  const buttons = document.querySelectorAll('button');
  return Array.from(buttons).find(
    button =>
      button.querySelector('[data-testid="shopping-cart-icon"]') ||
      button.textContent?.includes('Carrinho')
  );
};

export const getCartModal = () => {
  return (
    document.querySelector('[data-testid="cart-modal"]') ||
    document.querySelector('[role="dialog"]')
  );
};

// Constants for testing
export const MOCK_CART_ITEMS: CartItem[] = [
  createMockCartItem({
    id: 'item-1',
    packageId: 'pkg-1',
    packageName: 'Escalada Iniciante',
    price: 150,
    quantity: 1,
    participantName: 'João Silva',
  }),
  createMockCartItem({
    id: 'item-2',
    packageId: 'pkg-2',
    packageName: 'Escalada Avançada',
    price: 250,
    quantity: 2,
    participantName: 'Maria Santos',
  }),
];

export const MOCK_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Escalada Iniciante',
    price: 150,
    description: 'Perfeito para iniciantes',
    features: ['Instrução básica', 'Equipamentos inclusos'],
    bonus: ['Lanche', 'Fotos'],
    shape: 'circle' as const,
    color: 'bg-green-500',
    duration: '4 horas',
    maxParticipants: 8,
  },
  {
    id: 'pkg-2',
    name: 'Escalada Avançada',
    price: 250,
    description: 'Para escaladores experientes',
    features: ['Rotas desafiadoras', 'Equipamentos profissionais'],
    bonus: ['Almoço', 'Certificado'],
    shape: 'hexagon' as const,
    color: 'bg-orange-500',
    duration: '6 horas',
    maxParticipants: 6,
    requiresExperience: true,
  },
];
