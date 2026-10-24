'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function AboutSection() {
  const { currentTheme } = useTheme();

  // Consome destinationSection de pedra-bela.ts com fallback
  const dest = currentTheme?.destinationSection || pedraBellaTheme.destinationSection!;

  const getBadgeClass = (color: 'forest' | 'terracotta' | 'sun') => {
    switch (color) {
      case 'forest':
        return 'bg-forest-700 text-white';
      case 'terracotta':
        return 'bg-terracotta-500 text-white';
      case 'sun':
        return 'bg-sun-400 text-ink-900';
    }
  };

  return (
    <section id="lugar" className="py-24 relative bg-sand-100/60 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho Editorial */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
              <span>{dest.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
              {dest.title}{' '}
              <span className="font-serifIt italic font-light text-terracotta-500 normal-case">
                {dest.titleAccent}
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-600 max-w-sm leading-relaxed">{dest.subtitle}</p>
        </div>

        {/* 3 Cards do Design System (Badges Verde, Terracota e Amarelo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dest.cards.map(card => (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-5 shadow-soft border border-sand-200 hover:shadow-hover hover:-translate-y-1 transition-all group"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge Numerada */}
                <div
                  className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl ${getBadgeClass(
                    card.badgeColor
                  )} font-mono font-black text-sm flex items-center justify-center shadow-md z-10`}
                >
                  {card.badgeNumber}
                </div>
              </div>

              <h3 className="font-bold text-xl text-ink-900 mb-2">{card.title}</h3>
              <p className="text-xs text-ink-600 leading-relaxed mb-4">{card.description}</p>
              <div className="font-mono text-[10px] text-ink-400 border-t border-sand-100 pt-3">
                {card.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
