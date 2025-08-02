/**
 * Cart Components Integration Tests
 *
 * This file provides integration tests for the entire cart flow,
 * testing how the different components work together.
 */

import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '@/store/useCartStore';

describe('Cart Integration Tests', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCartStore.setState({
      items: [],
      isOpen: false,
    });
  });

  describe('complete cart workflow', () => {
    it('should handle a complete add-to-cart and checkout flow', () => {
      const { result } = renderHook(() => useCartStore());

      // Step 1: Add items to cart
      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
          experience: 'beginner',
        });
      });

      act(() => {
        result.current.addItem({
          packageId: 'pkg-2',
          packageName: 'Escalada Avançada',
          price: 250,
          quantity: 1,
          participantName: 'Maria Santos',
          experience: 'advanced',
        });
      });

      // Verify cart state
      expect(result.current.items).toHaveLength(2);
      expect(result.current.getTotalPrice()).toBe(400);
      expect(result.current.getTotalItems()).toBe(2);

      // Step 2: Open cart modal
      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);

      // Step 3: Update quantities
      const firstItemId = result.current.items[0].id;

      act(() => {
        result.current.updateQuantity(firstItemId, 2);
      });

      expect(result.current.getTotalPrice()).toBe(550); // 150*2 + 250*1
      expect(result.current.getTotalItems()).toBe(3);

      // Step 4: Remove an item
      const secondItemId = result.current.items[1].id;

      act(() => {
        result.current.removeItem(secondItemId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.getTotalPrice()).toBe(300); // 150*2
      expect(result.current.getTotalItems()).toBe(2);

      // Step 5: Clear cart (simulate successful checkout)
      act(() => {
        result.current.clearCart();
        result.current.closeCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.isOpen).toBe(false);
      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(0);
    });

    it('should handle multiple participants for same package', () => {
      const { result } = renderHook(() => useCartStore());

      // Add same package for different participants
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
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'Maria Santos',
        });
      });

      // Should create separate cart items
      expect(result.current.items).toHaveLength(2);
      expect(result.current.getItemCount('pkg-1')).toBe(2);
      expect(result.current.getTotalPrice()).toBe(300);

      // Adding same participant again should update quantity
      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 1,
          participantName: 'João Silva',
        });
      });

      // Should still have 2 items, but first one with quantity 2
      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.getTotalPrice()).toBe(450);
    });
  });

  describe('cart persistence simulation', () => {
    it('should maintain cart state across store reinitializations', () => {
      const { result: result1 } = renderHook(() => useCartStore());

      // Add items
      act(() => {
        result1.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 2,
          participantName: 'João Silva',
        });
      });

      const items = result1.current.items;
      const totalPrice = result1.current.getTotalPrice();

      // Simulate a new hook instance (like page refresh)
      const { result: result2 } = renderHook(() => useCartStore());

      // Should maintain the same state
      expect(result2.current.items).toEqual(items);
      expect(result2.current.getTotalPrice()).toBe(totalPrice);
    });
  });

  describe('edge cases', () => {
    it('should handle zero and negative quantities correctly', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 3,
          participantName: 'João Silva',
        });
      });

      const itemId = result.current.items[0].id;

      // Update to zero should remove item
      act(() => {
        result.current.updateQuantity(itemId, 0);
      });

      expect(result.current.items).toHaveLength(0);

      // Add item back
      act(() => {
        result.current.addItem({
          packageId: 'pkg-1',
          packageName: 'Escalada Iniciante',
          price: 150,
          quantity: 2,
          participantName: 'João Silva',
        });
      });

      const newItemId = result.current.items[0].id;

      // Update to negative should remove item
      act(() => {
        result.current.updateQuantity(newItemId, -5);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should handle removing non-existent items gracefully', () => {
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

      const originalItems = result.current.items;

      // Try to remove non-existent item
      act(() => {
        result.current.removeItem('non-existent-id');
      });

      // Should not affect existing items
      expect(result.current.items).toEqual(originalItems);
    });

    it('should handle updating non-existent items gracefully', () => {
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

      const originalItems = result.current.items;

      // Try to update non-existent item
      act(() => {
        result.current.updateQuantity('non-existent-id', 5);
      });

      // Should not affect existing items
      expect(result.current.items).toEqual(originalItems);
    });
  });
});
