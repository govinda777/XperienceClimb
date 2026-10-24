'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function LocationSection() {
  const { currentTheme } = useTheme();

  // Consome locationSection de pedra-bela.ts com fallback
  const loc = currentTheme?.locationSection || pedraBellaTheme.locationSection!;

  return (
    <section id="localizacao" className="py-24 relative bg-sand-100/70 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
              <span>{loc.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
              {loc.title}{' '}
              <span className="font-serifIt italic font-light text-terracotta-500 normal-case">
                {loc.titleAccent}
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-600 max-w-sm leading-relaxed">{loc.subtitle}</p>
        </div>

        {/* 2 Cards de Localização Detalhados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {loc.points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-7 sm:p-8 rounded-3xl border border-sand-200 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                      point.badgeColor === 'terracotta'
                        ? 'bg-terracotta-100 text-terracotta-600'
                        : 'bg-forest-100 text-forest-700'
                    }`}
                  >
                    {point.badge}
                  </span>
                  <span className="font-mono text-[10px] text-ink-400 font-bold">
                    {point.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink-900 mb-2">{point.title}</h3>
                <p className="text-xs text-ink-600 mb-4 leading-relaxed">
                  <strong className="text-ink-800">Endereço:</strong> {point.address}
                </p>

                <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs text-ink-600 space-y-2 mb-6">
                  {point.notes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-2">
                      <span className="font-bold">{note.icon}</span>
                      <span>{note.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-all ${
                  point.buttonColor === 'forest'
                    ? 'bg-forest-700 hover:bg-forest-800 text-white'
                    : 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
                }`}
              >
                <span>{point.buttonText}</span>
                <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
