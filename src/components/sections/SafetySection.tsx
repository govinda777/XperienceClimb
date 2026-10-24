'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function SafetySection() {
  const { currentTheme } = useTheme();

  // Consome safetySection de pedra-bela.ts com fallback
  const safety = currentTheme?.safetySection || pedraBellaTheme.safetySection!;

  return (
    <section id="seguranca" className="py-24 relative bg-sand-100/70 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
            <span>{safety.badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
            {safety.title}{' '}
            <span className="font-serifIt italic font-light text-terracotta-500 normal-case">
              {safety.titleAccent}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LADO ESQUERDO: ILUSTRAÇÕES DE CAMPING E EQUIPAMENTOS */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-center gap-6 p-8 bg-white rounded-3xl border border-sand-200 shadow-soft">
            {safety.equipmentIcons.map((icon, idx) => (
              <img key={idx} src={icon.src} alt={icon.alt} className="w-20 h-24 object-contain" />
            ))}
          </div>

          {/* LADO DIREITO: CARD VERDE ESCURO COM OS PROTOCOLOS */}
          <div className="lg:col-span-6 bg-forest-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl">
            <div className="space-y-6">
              {safety.protocols.map((protocol, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 ${
                    idx > 0 ? 'pt-6 border-t border-forest-800' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {protocol.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{protocol.title}</h4>
                    <p className="text-xs text-sand-200 leading-relaxed mt-1">
                      {protocol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
