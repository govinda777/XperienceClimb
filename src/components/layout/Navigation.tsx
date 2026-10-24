'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const { currentTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Carrega configurações de marca do tema com fallback
  const brand = currentTheme?.brand || pedraBellaTheme.brand!;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo XPERIENCE climb com ícone Terracota */}
        <Link href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-terracotta-500 flex items-center justify-center font-black text-white text-lg shadow-sm group-hover:scale-105 transition-transform">
            {brand.icon}
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-wider text-ink-900 uppercase leading-none">
              {brand.name}{' '}
              <span className="text-terracotta-500 font-serifIt italic font-light lowercase text-xl">
                {brand.accent}
              </span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-forest-700 font-semibold">
              {brand.tagline}
            </span>
          </div>
        </Link>

        {/* Menu de Navegação Desktop */}
        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-7 lg:gap-8 font-mono text-xs uppercase tracking-wider text-ink-700 font-medium"
        >
          {brand.navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-terracotta-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botão Pill Verde Floresta: Agendar Ida & Toggle Mobile */}
        <div className="flex items-center gap-3">
          <a
            href={brand.cta.href}
            className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            {brand.cta.label}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-ink-700 hover:bg-sand-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sand-50/98 border-b border-sand-200 px-6 py-6 transition-all shadow-lg">
          <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-ink-800 font-medium">
            {brand.navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-terracotta-500 border-b border-sand-200/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={brand.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-full bg-forest-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              {brand.cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
