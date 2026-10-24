'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function CalendarSection() {
  const { currentTheme } = useTheme();

  // Consome calendarSection de pedra-bela.ts com fallback
  const cal = currentTheme?.calendarSection || pedraBellaTheme.calendarSection!;

  return (
    <section id="calendario" className="py-24 relative bg-sand-100/70 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho Editorial */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-terracotta-500 font-bold mb-2">
              <span>{cal.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
              {cal.title}{' '}
              <span className="font-serifIt italic font-light text-forest-700 normal-case">
                {cal.titleAccent}
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-600 max-w-sm leading-relaxed">{cal.subtitle}</p>
        </div>

        {/* 3 Cards do Calendário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cal.items.map((item, index) => {
            const isHighlight = item.ribbon || item.statusColor === 'terracotta';
            const isExternal = item.isExternal;

            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-6 sm:p-7 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all flex flex-col justify-between group relative overflow-hidden ${
                  isHighlight ? 'border-2 border-terracotta-500' : 'border border-sand-200'
                }`}
              >
                {/* Ribbon opcional */}
                {item.ribbon && (
                  <div className="absolute -right-12 top-6 bg-terracotta-500 text-white font-mono text-[9px] font-black uppercase tracking-widest py-1 px-12 rotate-45 shadow-sm">
                    {item.ribbon}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                        item.statusColor === 'forest'
                          ? 'bg-forest-700 text-white'
                          : item.statusColor === 'terracotta'
                            ? 'bg-terracotta-500 text-white'
                            : 'bg-sun-400 text-ink-900'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="font-mono text-[10px] text-ink-400 font-bold">
                      {item.durationType}
                    </span>
                  </div>

                  <div className="mb-5 pb-5 border-b border-sand-200">
                    <span className="font-display text-5xl font-black text-ink-900 leading-none">
                      {item.day}
                    </span>
                    <span
                      className={`font-mono text-sm uppercase font-bold ml-1 ${
                        item.statusColor === 'sun' ? 'text-sun-600' : 'text-terracotta-500'
                      }`}
                    >
                      {item.monthYear}
                    </span>
                    <div className="font-bold text-base text-ink-900 mt-2">{item.title}</div>
                    <div className="font-mono text-xs text-forest-700 font-semibold mt-1">
                      {item.distance}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 font-mono text-xs text-ink-600">
                    {item.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <span className="text-terracotta-500">✔</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-t border-sand-100 pt-3">
                    <span className="font-mono text-xs text-ink-500">Disponibilidade:</span>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full border ${
                        item.spotsColor === 'forest'
                          ? 'text-forest-700 bg-forest-50 border-forest-200/60'
                          : item.spotsColor === 'terracotta'
                            ? 'text-terracotta-600 bg-terracotta-50 border-terracotta-200/60'
                            : 'text-sun-700 bg-sun-50 border-sun-200/60'
                      }`}
                    >
                      {item.spots}
                    </span>
                  </div>

                  <a
                    href={item.ctaHref}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-all ${
                      isExternal
                        ? 'bg-sand-100 hover:bg-sand-200 border border-sand-300 text-ink-800'
                        : item.statusColor === 'terracotta'
                          ? 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
                          : 'bg-forest-700 hover:bg-forest-800 text-white'
                    }`}
                  >
                    <span>{item.ctaText}</span>
                    <span>{isExternal ? '↗' : '›'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
