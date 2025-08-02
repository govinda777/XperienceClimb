import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '../useCartStore';

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}));

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCartStore.setState({
      items: [],
      isOpen: false,
    });

    // Mock timers for consistent ID generation
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initial state', () => {
    it('should have empty items array initially', () => {
      const { result } = renderHook(() => useCartStore());
      expect(result.current.items).toEqual([]);
    });

    it('should have cart closed initially', () => {
      const { result } = renderHook(() => useCartStore());
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('addItem', () => {
    const mockItem = {
      packageId: 'pkg-1',
      packageName: 'Escalada Iniciante',
      price: 150,
      quantity: 1,
      participantName: 'João Silva',
      experience: 'beginner',
    };

    it('should add new item to cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toMatchObject({
        ...mockItem,
        id: expect.any(String),
        addedAt: expect.any(Date),
      });
    });

    it('should update quantity if item with same packageId and participantName exists', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockItem);
      });

      act(() => {
        result.current.addItem({ ...mockItem, quantity: 2 });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should add separate items for different participants', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockItem);
      });

      act(() => {
        result.current.addItem({
          ...mockItem,
          participantName: 'Maria Santos',
        });
      });

      expect(result.current.items).toHaveLength(2);
    });

    it('should generate unique id for each item', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockItem);
      });

      // Add a small delay to ensure different timestamp
      jest.advanceTimersByTime(1);

      act(() => {
        result.current.addItem({
          ...mockItem,
          participantName: 'Maria Santos',
        });
      });

      const ids = result.current.items.map(item => item.id);
      expect(new Set(ids).size).toBe(2); // All IDs should be unique
      expect(result.current.items[0].id).not.toBe(result.current.items[1].id);
    });
  });

  describe('removeItem', () => {
    it('should remove item by id', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.removeItem(itemId);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should not affect other items when removing one', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      act(() => {
        result.current.addItem({
          packageId: 'pkg-2',
          packageName: 'Escalada Avançada',
          price: 250,
          quantity: 1,
          participantName: 'Maria Santos',
        });
      });

      const firstItemId = result.current.items[0].id;

      act(() => {
        result.current.removeItem(firstItemId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].packageName).toBe('Escalada Avançada');
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(itemId, 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should remove item when quantity is 0 or negative', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(itemId, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      act(() => {
        result.current.addItem({
          packageId: 'pkg-2',
          packageName: 'Escalada Avançada',
          price: 250,
          quantity: 1,
          participantName: 'Maria Santos',
        });
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('cart modal controls', () => {
    it('should toggle cart open state', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleCart();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should open cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close cart', () => {
      const { result } = renderHook(() => useCartStore());

      // First open the cart
      act(() => {
        result.current.openCart();
      });

      act(() => {
        result.current.closeCart();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 2,
          participantName: 'João Silva',
        });
      });

      act(() => {
        result.current.addItem({
          packageId: 'pkg-2',
          packageName: 'Escalada Avançada',
          price: 250,
          quantity: 1,
          participantName: 'Maria Santos',
        });
      });
    });

    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCartStore());

      const totalPrice = result.current.getTotalPrice();
      expect(totalPrice).toBe(550); // (150 * 2) + (250 * 1)
    });

    it('should calculate total items correctly', () => {
      const { result } = renderHook(() => useCartStore());

      const totalItems = result.current.getTotalItems();
      expect(totalItems).toBe(3); // 2 + 1
    });

    it('should get item count for specific package', () => {
      const { result } = renderHook(() => useCartStore());

      const pkg1Count = result.current.getItemCount('pkg-1');
      const pkg2Count = result.current.getItemCount('pkg-2');
      const pkg3Count = result.current.getItemCount('pkg-3');

      expect(pkg1Count).toBe(2);
      expect(pkg2Count).toBe(1);
      expect(pkg3Count).toBe(0);
    });

    it('should return 0 for empty cart calculations', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getItemCount('any-package')).toBe(0);
    });
  });
});
