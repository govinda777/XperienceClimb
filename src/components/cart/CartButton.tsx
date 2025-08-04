'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export function CartButton() {
  const { getTotalItems, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={toggleCart}
        size="lg"
        className="relative h-16 w-16 rounded-full bg-orange-400 p-0 text-white shadow-2xl hover:bg-orange-500"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </Button>
    </div>
  );
}
