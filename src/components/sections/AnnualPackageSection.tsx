'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function AnnualPackageSection() {
  const { currentTheme } = useTheme();

  // Consome annualPackageSection de pedra-bela.ts com fallback
  const annual = currentTheme?.annualPackageSection || pedraBellaTheme.annualPackageSection!;

  return (
    <section
      id="anual"
      className="py-24 relative bg-forest-900 text-white overflow-hidden shadow-2xl border-t border-forest-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna de Texto e Benefícios */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800 border border-forest-700 font-mono text-[11px] font-bold uppercase tracking-wider text-sun-300 mb-6">
              <span>{annual.badge}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6">
              {annual.title} <br />
              <span className="font-serifIt italic font-light text-sun-400 normal-case text-3xl sm:text-5xl">
                {annual.titleAccent}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-sand-200 leading-relaxed max-w-xl mb-8">
              {annual.description}
            </p>

            {/* 4 Benefícios em Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {annual.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700/60 flex items-center gap-3"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <span className="font-bold text-white text-sm block">{benefit.title}</span>
                    <span className="text-sand-300 text-xs">{benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna do Card de Investimento */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white text-ink-900 p-8 rounded-3xl shadow-2xl border-4 border-sand-200 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-mono text-[10px] font-bold uppercase tracking-wider">
                  {annual.card.badge}
                </span>
                <span className="font-mono text-xs text-ink-500 font-bold">
                  {annual.card.spots}
                </span>
              </div>

              <h3 className="font-display text-3xl font-black uppercase text-ink-900 mb-2">
                {annual.card.title}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed mb-6">{annual.card.description}</p>

              <div className="mb-6 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                <span className="font-mono text-[10px] text-ink-400 block uppercase font-bold">
                  Condição Especial
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-3xl font-black text-ink-900">
                    {annual.card.priceLabel}
                  </span>
                  <span className="font-mono text-xs text-terracotta-500 font-semibold">
                    {annual.card.priceNotes}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-forest-700 block mt-1">
                  {annual.card.discountNote}
                </span>
              </div>

              <a
                href={annual.card.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
              >
                <span>{annual.card.ctaText}</span>
                <span>›</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
