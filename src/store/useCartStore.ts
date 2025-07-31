import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (packageId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.packageId === newItem.packageId && 
                   item.participantName === newItem.participantName
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const id = `${newItem.packageId}-${Date.now()}`;
          set({
            items: [...items, { 
              ...newItem, 
              id, 
              addedAt: new Date() 
            }]
          });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      getItemCount: (packageId) => {
        return get().items
          .filter((item) => item.packageId === packageId)
          .reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'xperience-climb-cart',
      version: 1,
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
    }
  )
); 