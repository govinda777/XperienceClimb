'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function HeroSection() {
  const { currentTheme } = useTheme();

  // Consome heroSection de pedra-bela.ts com fallback
  const hero = currentTheme?.heroSection || pedraBellaTheme.heroSection!;

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-sand-50/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* COLUNA DA ESQUERDA: TEXTO EDITORIAL & BOTÕES */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-terracotta-500 font-bold mb-4">
              <span>{hero.badge}</span>
            </div>

            {/* Título Editorial com Tríade Tipográfica */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-black uppercase tracking-tight text-ink-900 leading-[0.92] mb-6">
              <span className="block">{hero.title.line1}</span>
              <span className="block">{hero.title.line2}</span>
              <span className="block text-terracotta-500">{hero.title.line3Highlight}</span>
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-normal normal-case text-ink-800 mt-2">
                {hero.title.line4Prefix}{' '}
                <span className="font-serifIt italic text-forest-700 font-light">
                  {hero.title.line4Italic}
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-600 max-w-lg leading-relaxed mb-8">
              {hero.description}
            </p>

            {/* Dois Botões Oficiais: Terracota e Pill Branco */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={hero.primaryCta.href}
                className="px-8 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{hero.primaryCta.label}</span>
              </a>

              <a
                href={hero.secondaryCta.href}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-sand-100 border border-sand-300 text-ink-800 font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
              >
                <span className="text-forest-700 text-sm">▶</span>
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          {/* COLUNA DA DIREITA: CARD FOTOGRÁFICO COM RAMOS BOTÂNICOS E METADADOS */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Ramo Botânico saindo sutilmente da borda da foto */}
            <Image
              src={hero.photo.botanicalLeavesSvg}
              alt=""
              width={96}
              height={96}
              aria-hidden="true"
              className="absolute -top-10 -right-4 w-24 h-24 pointer-events-none select-none z-20"
            />
            <Image
              src={hero.photo.botanicalLeavesSvg}
              alt=""
              width={112}
              height={112}
              aria-hidden="true"
              className="absolute -bottom-8 -left-8 w-28 h-28 pointer-events-none select-none z-20 transform rotate-180"
            />

            {/* Moldura da Foto Vertical */}
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sand-100 h-[530px]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-center filter contrast-[1.05]"
              />

              {/* Tag de Metadados Técnicos no topo esquerdo da foto */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-sand-200 text-left z-10">
                <div className="font-mono text-[9px] text-ink-400 font-bold">
                  {hero.photo.topMetaBadge}
                </div>
                <div className="font-mono text-[10px] text-ink-800 font-bold">
                  {hero.photo.bottomMetaBadge}
                </div>
              </div>

              {/* Tags laterais direitas */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
                {hero.photo.sideBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-ink-800 shadow-sm"
                  >
                    {badge}
                  </div>
                ))}
              </div>

              {/* Cardzinho com Avatar no rodapé da foto */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-sand-200 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center font-bold text-terracotta-600 text-sm">
                  {hero.photo.authorQuote.icon}
                </div>
                <div>
                  <span className="font-bold text-xs text-ink-900 block leading-tight">
                    {hero.photo.authorQuote.author}
                  </span>
                  <span className="font-mono text-[10px] text-forest-700 block mt-0.5">
                    {hero.photo.authorQuote.quote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
