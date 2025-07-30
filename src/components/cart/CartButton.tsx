'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export function CartButton() {
  const { items, getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={toggleCart}
        size="lg"
        className="relative bg-orange-400 hover:bg-orange-500 text-white shadow-2xl rounded-full w-16 h-16 p-0"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </Button>
    </div>
  );
}