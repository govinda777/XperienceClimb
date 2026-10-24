'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function BeginnerSection() {
  const { currentTheme } = useTheme();

  // Consome beginnerSection de pedra-bela.ts com fallback
  const beginner = currentTheme?.beginnerSection || pedraBellaTheme.beginnerSection!;

  return (
    <section
      id="batismo"
      className="py-20 relative bg-sun-500 text-white overflow-hidden shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CARD POLAROID ROTACIONADO COM A ILUSTRAÇÃO DOS AMIGOS */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white p-7 rounded-3xl shadow-2xl border-4 border-white text-ink-900 max-w-sm w-full transform -rotate-2">
              {/* Ilustração SVG Oficial badge-iniciantes.svg */}
              <div className="flex justify-center mb-4 bg-sand-50 rounded-2xl p-2 border border-sand-200">
                <img
                  src={beginner.polaroid.illustrationSvg}
                  alt={beginner.polaroid.alt}
                  className="w-full h-48 object-contain"
                />
              </div>

              <div className="text-center">
                <span className="font-mono text-[11px] font-black uppercase text-terracotta-500 tracking-wider">
                  {beginner.polaroid.badge}
                </span>
                <h3 className="text-2xl font-black text-ink-900 mt-0.5">
                  {beginner.polaroid.title}
                </h3>
                <p className="text-xs text-ink-600 mt-2 leading-relaxed">
                  {beginner.polaroid.description}
                </p>
                <div className="mt-4 pt-3 border-t border-sand-100 font-mono text-[11px] text-forest-700 font-bold">
                  {beginner.polaroid.footerNote}
                </div>
              </div>
            </div>
          </div>

          {/* TEXTO DO BLOCO MOSTARDA SOLAR */}
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-900 font-bold mb-4">
              {beginner.badge}
            </div>

            <h2 className="font-display text-5xl sm:text-7xl lg:text-[80px] font-black uppercase tracking-tight text-white leading-[0.92] mb-6">
              {beginner.title} <br />
              <span className="font-serifIt italic font-light text-sand-50 normal-case">
                {beginner.titleAccent}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed max-w-xl mb-8">
              {beginner.description}
            </p>

            {/* Dois cards brancos na base */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beginner.benefitCards.map((card, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white text-ink-900 shadow-md">
                  <span
                    className={`font-mono text-[10px] font-black uppercase ${
                      card.tagColor === 'terracotta' ? 'text-terracotta-500' : 'text-forest-700'
                    } block mb-1`}
                  >
                    {card.tag}
                  </span>
                  <h4 className="font-bold text-ink-900 text-sm">{card.title}</h4>
                  <p className="text-xs text-ink-600 mt-1 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
