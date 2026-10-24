'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function TimelineSection() {
  const { currentTheme } = useTheme();

  // Consome timelineSection de pedra-bela.ts com fallback
  const timeline = currentTheme?.timelineSection || pedraBellaTheme.timelineSection!;

  const getIconColor = (color?: 'forest' | 'terracotta' | 'sun') => {
    switch (color) {
      case 'forest':
        return 'bg-forest-700 text-white';
      case 'terracotta':
        return 'bg-terracotta-500 text-white';
      case 'sun':
        return 'bg-sun-500 text-ink-900';
      default:
        return 'bg-forest-700 text-white';
    }
  };

  const getTextColor = (color?: 'forest' | 'terracotta' | 'sun') => {
    switch (color) {
      case 'forest':
        return 'text-forest-700';
      case 'terracotta':
        return 'text-terracotta-500';
      case 'sun':
        return 'text-sun-600';
      default:
        return 'text-forest-700';
    }
  };

  return (
    <section id="timeline" className="py-24 relative bg-sand-50 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sand-300 bg-sand-200/60 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-ink-700 font-bold">
            <span>{timeline.badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900 mb-4">
            {timeline.title}{' '}
            <span className="font-serifIt italic font-light text-forest-700 normal-case">
              {timeline.titleAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
            {timeline.subtitle}
          </p>
        </div>

        {/* Timeline Vertical Centralizada */}
        <div className="relative max-w-4xl mx-auto">
          {/* Linha Vertical Conectora Tracejada */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-sand-300"></div>

          <div className="space-y-10">
            {timeline.events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Ponto Central */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl ${getIconColor(
                        event.color
                      )} flex items-center justify-center font-bold text-xl shadow-md border-2 border-white`}
                    >
                      {event.icon}
                    </div>
                  </div>

                  {/* Card de Conteúdo */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="bg-white p-7 rounded-3xl border border-sand-200 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all group">
                      <div
                        className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${getTextColor(
                          event.color
                        )} font-bold mb-2 ${isEven ? 'md:justify-end' : ''}`}
                      >
                        <span>⏱</span>
                        <span>{event.time}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-ink-900 tracking-tight">
                        {event.activity}
                      </h3>
                    </div>
                  </div>

                  {/* Spacer Desktop para balancear layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
