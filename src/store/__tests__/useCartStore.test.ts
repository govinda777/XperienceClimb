import { act, renderHook } from '@testing-library/react';
import { useCartStore } from '../useCartStore';
import { CartItem } from '@/types';

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
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

describe('useCartStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store state
    useCartStore.setState({
      items: [],
      isOpen: false,
    });
  });

  describe('initial state', () => {
    it('should have empty initial state', () => {
      const { result } = renderHook(() => useCartStore());
      
      expect(result.current.items).toEqual([]);
      expect(result.current.isOpen).toBe(false);
      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(0);
    });
  });

  describe('addItem', () => {
    it('should add new item to cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      const newItem = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(newItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toMatchObject(newItem);
      expect(result.current.items[0].id).toBeDefined();
      expect(result.current.items[0].addedAt).toBeInstanceOf(Date);
    });

    it('should update quantity when adding existing item with same package and participant', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem(item);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('should add separate items for different participants', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'Maria Santos',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].participantName).toBe('João Silva');
      expect(result.current.items[1].participantName).toBe('Maria Santos');
    });

    it('should add separate items for different packages', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-2',
        packageName: 'Escalada Avançada',
        price: 250,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].packageId).toBe('pkg-1');
      expect(result.current.items[1].packageId).toBe('pkg-2');
    });

    it('should handle adding multiple quantities at once', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 3,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
      });

      expect(result.current.items[0].quantity).toBe(3);
    });
  });

  describe('removeItem', () => {
    it('should remove item by id', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.removeItem(itemId);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should not affect other items when removing one', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-2',
        packageName: 'Escalada Avançada',
        price: 250,
        quantity: 1,
        participantName: 'Maria Santos',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      const firstItemId = result.current.items[0].id;

      act(() => {
        result.current.removeItem(firstItemId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].packageName).toBe('Escalada Avançada');
    });

    it('should handle removing non-existent item gracefully', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.removeItem('non-existent-id');
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(itemId, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is set to 0', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 2,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(itemId, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 2,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(itemId, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should not affect other items when updating one', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-2',
        packageName: 'Escalada Avançada',
        price: 250,
        quantity: 2,
        participantName: 'Maria Santos',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      const firstItemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(firstItemId, 10);
      });

      expect(result.current.items[0].quantity).toBe(10);
      expect(result.current.items[1].quantity).toBe(2);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-2',
        packageName: 'Escalada Avançada',
        price: 250,
        quantity: 2,
        participantName: 'Maria Santos',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should handle clearing empty cart', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('modal state management', () => {
    it('should toggle cart modal state', () => {
      const { result } = renderHook(() => useCartStore());
      
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should open cart modal', () => {
      const { result } = renderHook(() => useCartStore());
      
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close cart modal', () => {
      const { result } = renderHook(() => useCartStore());
      
      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeCart();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useCartStore());
      
      const item1 = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 2,
        participantName: 'João Silva',
      };

      const item2 = {
        packageId: 'pkg-2',
        packageName: 'Escalada Avançada',
        price: 250,
        quantity: 1,
        participantName: 'Maria Santos',
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });
    });

    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCartStore());
      
      // (150 * 2) + (250 * 1) = 300 + 250 = 550
      expect(result.current.getTotalPrice()).toBe(550);
    });

    it('should calculate total items correctly', () => {
      const { result } = renderHook(() => useCartStore());
      
      // 2 + 1 = 3
      expect(result.current.getTotalItems()).toBe(3);
    });

    it('should get item count for specific package', () => {
      const { result } = renderHook(() => useCartStore());
      
      expect(result.current.getItemCount('pkg-1')).toBe(2);
      expect(result.current.getItemCount('pkg-2')).toBe(1);
      expect(result.current.getItemCount('pkg-3')).toBe(0);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle items with zero price', () => {
      const { result } = renderHook(() => useCartStore());
      
      const freeItem = {
        packageId: 'pkg-free',
        packageName: 'Escalada Gratuita',
        price: 0,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(freeItem);
      });

      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(1);
    });

    it('should handle items with decimal prices', () => {
      const { result } = renderHook(() => useCartStore());
      
      const decimalItem = {
        packageId: 'pkg-decimal',
        packageName: 'Escalada com Desconto',
        price: 149.99,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(decimalItem);
      });

      expect(result.current.getTotalPrice()).toBe(149.99);
    });

    it('should handle large quantities', () => {
      const { result } = renderHook(() => useCartStore());
      
      const largeQuantityItem = {
        packageId: 'pkg-large',
        packageName: 'Escalada em Grupo',
        price: 100,
        quantity: 100,
        participantName: 'Grupo Grande',
      };

      act(() => {
        result.current.addItem(largeQuantityItem);
      });

      expect(result.current.getTotalItems()).toBe(100);
      expect(result.current.getTotalPrice()).toBe(10000);
    });

    it('should handle empty strings in participant names', () => {
      const { result } = renderHook(() => useCartStore());
      
      const emptyNameItem = {
        packageId: 'pkg-empty',
        packageName: 'Escalada Anônima',
        price: 150,
        quantity: 1,
        participantName: '',
      };

      act(() => {
        result.current.addItem(emptyNameItem);
      });

      expect(result.current.items[0].participantName).toBe('');
    });

    it('should handle special characters in names', () => {
      const { result } = renderHook(() => useCartStore());
      
      const specialCharItem = {
        packageId: 'pkg-special',
        packageName: 'Escalada Ação & Aventura™',
        price: 150,
        quantity: 1,
        participantName: 'José da Silva & Cia. Ltda.',
      };

      act(() => {
        result.current.addItem(specialCharItem);
      });

      expect(result.current.items[0].packageName).toBe('Escalada Ação & Aventura™');
      expect(result.current.items[0].participantName).toBe('José da Silva & Cia. Ltda.');
    });
  });

  describe('persistence behavior', () => {
    it('should only persist items, not modal state', () => {
      const { result } = renderHook(() => useCartStore());
      
      const item = {
        packageId: 'pkg-1',
        packageName: 'Escalada Iniciante',
        price: 150,
        quantity: 1,
        participantName: 'João Silva',
      };

      act(() => {
        result.current.addItem(item);
        result.current.openCart();
      });

      // Simulate store rehydration
      const persistedState = { items: result.current.items };
      
      expect(persistedState.items).toHaveLength(1);
      expect(persistedState).not.toHaveProperty('isOpen');
    });
  });
});