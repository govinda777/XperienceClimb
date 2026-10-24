'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import { fazendaIpanemaTheme } from '@/themes/configs/fazenda-ipanema';
import { Menu, X, MapPin, ChevronDown, Check } from 'lucide-react';

const DESTINATION_METADATA: Record<
  string,
  {
    label: string;
    subtitle: string;
    techTag: string;
  }
> = {
  'pedra-bela': {
    label: 'Pedra Bela',
    subtitle: 'Pedra do Santuário · Mantiqueira',
    techTag: 'ALT 1.120M · 119 KM DE SP',
  },
  'fazenda-ipanema': {
    label: 'Fazenda Ipanema',
    subtitle: 'Morro Araçoiaba · FLONA Iperó',
    techTag: 'ALT 950M · 120 KM DE SP',
  },
};

export function Navigation() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Carrega configurações de marca do tema com fallback
  const brand = currentTheme?.brand || pedraBellaTheme.brand!;

  // Garante que Pedra Bela e Fazenda Ipanema estejam sempre presentes na lista de destinos
  const destinations =
    availableThemes && availableThemes.length >= 2
      ? availableThemes
      : [pedraBellaTheme, fazendaIpanemaTheme];

  const activeDestinationMeta = DESTINATION_METADATA[currentTheme?.id] || {
    label: currentTheme?.name || 'Pedra Bela',
    subtitle: currentTheme?.location?.name || 'SP',
    techTag: currentTheme?.location?.distance || 'SP',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDestinationsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDestinationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectDestination = (themeId: string) => {
    setTheme(themeId);
    setDestinationsOpen(false);
    setMobileMenuOpen(false);

    if (pathname?.startsWith('/destinos/')) {
      router.push(`/destinos/${themeId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo XPERIENCE climb oficial */}
        <Link
          href="#hero"
          className="flex items-center gap-3 group"
          aria-label="Xperience Climb - Início"
        >
          <Image
            src={brand.icon.startsWith('/') ? brand.icon : '/assets/logo.svg'}
            alt="Logo Xperience Climb"
            width={48}
            height={48}
            className="w-12 h-12 shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform duration-300 ease-out"
          />
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
          className="hidden md:flex items-center gap-6 lg:gap-7 font-mono text-xs uppercase tracking-wider text-ink-700 font-medium"
        >
          {/* Seletor de Destinos no Menu Desktop */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDestinationsOpen(prev => !prev)}
              aria-expanded={destinationsOpen}
              aria-haspopup="listbox"
              aria-label={`Selecionar destino. Destino atual: ${activeDestinationMeta.label}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-sand-100/90 hover:bg-sand-200/80 border border-sand-300 text-ink-900 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-out cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" strokeWidth={1.5} />
              <span className="text-ink-500 font-medium">Destinos:</span>
              <span className="text-forest-800">{activeDestinationMeta.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-ink-500 transition-transform duration-300 ease-out ${
                  destinationsOpen ? 'rotate-180 text-terracotta-500' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>

            {destinationsOpen && (
              <div
                role="listbox"
                aria-label="Lista de destinos"
                className="absolute left-0 mt-2.5 w-80 rounded-2xl bg-white/98 backdrop-blur-xl border border-sand-200 shadow-xl p-2 z-50 transition-all duration-300 ease-out"
              >
                <div className="px-3 py-2 border-b border-sand-100 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400 font-bold">
                    CAP · 00 / ESCOLHA O DESTINO
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-forest-700 font-bold">
                    {destinations.length} PICOS SP
                  </span>
                </div>

                <div className="mt-1 space-y-1">
                  {destinations.map(dest => {
                    const isSelected = dest.id === currentTheme?.id;
                    const meta = DESTINATION_METADATA[dest.id] || {
                      label: dest.name,
                      subtitle: dest.location?.name || '',
                      techTag: dest.location?.distance || '',
                    };

                    return (
                      <button
                        key={dest.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectDestination(dest.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 ease-out flex items-start justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-forest-50/90 border border-forest-200/80 text-ink-900'
                            : 'hover:bg-sand-100/80 border border-transparent text-ink-700 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-sm text-ink-900 normal-case">
                              {meta.label}
                            </span>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full bg-forest-700 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                                Ativo
                              </span>
                            )}
                          </div>
                          <span className="font-sans text-xs text-ink-600 normal-case mt-0.5">
                            {meta.subtitle}
                          </span>
                          <span className="font-mono text-[10px] text-terracotta-600 font-semibold uppercase tracking-widest mt-1">
                            {meta.techTag}
                          </span>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-forest-700 text-white'
                              : 'bg-sand-100 text-transparent group-hover:text-ink-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sand-50/98 border-b border-sand-200 px-6 py-6 transition-all shadow-lg">
          <nav
            aria-label="Navegação Mobile"
            className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-ink-800 font-medium"
          >
            {/* Lista de Destinos no Mobile */}
            <div className="pb-3 border-b border-sand-200">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-400 font-bold mb-2.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta-500" strokeWidth={1.5} />
                <span>Destinos de Escalada</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {destinations.map(dest => {
                  const isSelected = dest.id === currentTheme?.id;
                  const meta = DESTINATION_METADATA[dest.id] || {
                    label: dest.name,
                    subtitle: dest.location?.name || '',
                    techTag: dest.location?.distance || '',
                  };

                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => handleSelectDestination(dest.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 ease-out flex items-center justify-between ${
                        isSelected
                          ? 'bg-forest-50 border-forest-300 text-ink-900 shadow-xs'
                          : 'bg-white border-sand-200 text-ink-700 hover:border-sand-300'
                      }`}
                    >
                      <div>
                        <div className="font-sans font-bold text-sm text-ink-900 normal-case flex items-center gap-2">
                          <span>{meta.label}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-forest-700 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                              Ativo
                            </span>
                          )}
                        </div>
                        <div className="font-sans text-[11px] text-ink-500 normal-case mt-0.5">
                          {meta.subtitle}
                        </div>
                      </div>
                      <Check
                        className={`w-4 h-4 ${isSelected ? 'text-forest-700' : 'text-transparent'}`}
                        strokeWidth={2}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

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
