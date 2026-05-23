'use client';
import React, { useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/useAuth';
import { CartModal } from '@/components/cart/CartModal';
import { useCartStore } from '@/store/useCartStore';

export default function TestE2ECheckoutPage() {
  const toggleCart = useCartStore(state => state.toggleCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      // Force clean the cart for testing to have a predictable state
      useCartStore.getState().clearCart();

      // Add a fake item
      useCartStore.getState().addItem({
        packageId: 'pkg-1',
        packageName: 'Escalada Tradicional',
        price: 250,
        quantity: 1,
        participantName: 'João E2E',
      });

      // Open the modal deterministically
      useCartStore.getState().openCart();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const mockAuth: AuthContextType = {
    ready: true,
    authenticated: true,
    user: {
      id: 'mock-e2e-user',
      email: 'e2e@example.com',
      name: 'User E2E',
      createdAt: new Date(),
      preferences: {
        experienceLevel: 'beginner',
        notifications: true,
        language: 'pt',
      },
    },
    login: () => {},
    logout: () => {},
    updateUserPreferences: async () => {},
    isLoading: false,
    isGuest: false,
    isLoggedIn: true,
    userEmail: 'e2e@example.com',
    userName: 'User E2E',
    userPreferences: { experienceLevel: 'beginner', notifications: true, language: 'pt' },
  };

  return (
    <AuthContext.Provider value={mockAuth}>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">E2E Mocked Checkout Environment</h1>
        <p className="text-gray-600 mb-8">Esta página só deve ser usada em testes automatizados.</p>
        <button onClick={toggleCart} className="px-4 py-2 bg-blue-600 text-white rounded">
          Toggle Modal
        </button>
        <CartModal />
      </div>
    </AuthContext.Provider>
  );
}
