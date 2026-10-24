'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function CartButton() {
  const { getTotalItems, toggleCart } = useCartStore();
  const { currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const rawTotal = getTotalItems ? getTotalItems() : 0;
  const totalItems = typeof rawTotal === 'number' && rawTotal > 0 ? rawTotal : 0;
  const floating = currentTheme?.floatingCta || pedraBellaTheme.floatingCta!;

  const handleClick = (e: React.MouseEvent) => {
    if (totalItems > 0) {
      e.preventDefault();
      toggleCart();
    }
  };

  return (
    <aside aria-label="Acesso Rápido ao Carrinho" className="fixed bottom-6 right-6 z-50">
      <a
        href={floating.href}
        onClick={handleClick}
        role="button"
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-white font-mono text-xs font-bold shadow-2xl border-2 border-forest-600 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
      >
        <span className="relative w-7 h-7 rounded-full bg-terracotta-500 text-white flex items-center justify-center text-sm shadow-sm group-hover:rotate-12 transition-transform">
          {floating.icon}
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-ink-900 text-[10px] font-black flex items-center justify-center shadow">
              {totalItems}
            </span>
          )}
        </span>
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-wider text-sand-300 leading-none">
            {totalItems > 0 ? `Carrinho (${totalItems})` : floating.tag}
          </span>
          <span className="text-xs text-white font-bold leading-tight mt-0.5">
            {totalItems > 0 ? 'Ver Reserva ↗' : floating.title}
          </span>
        </div>
      </a>
    </aside>
  );
}
