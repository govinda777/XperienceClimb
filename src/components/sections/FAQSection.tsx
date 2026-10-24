'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function FAQSection() {
  const { currentTheme } = useTheme();

  // Consome faqSection de pedra-bela.ts com fallback
  const faq = currentTheme?.faqSection || pedraBellaTheme.faqSection!;

  return (
    <section id="faq" className="py-24 relative bg-sand-50 border-t border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-terracotta-500 font-bold mb-2">
            <span>{faq.badge}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900 mb-4">
            {faq.title}{' '}
            <span className="font-serifIt italic font-light text-forest-700 normal-case">
              {faq.titleAccent}
            </span>
          </h2>
          <p className="font-mono text-xs text-ink-600 leading-relaxed max-w-lg mx-auto">
            {faq.subtitle}
          </p>
        </div>

        {/* Acordeões com detalhes elegantes */}
        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <details
              key={index}
              className="group bg-white rounded-2xl border border-sand-200 p-6 shadow-soft cursor-pointer transition-all"
              open={item.isOpenByDefault}
            >
              <summary className="flex items-center justify-between font-bold text-base sm:text-lg text-ink-900 list-none select-none">
                <span>{item.question}</span>
                <span className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center text-forest-700 font-bold text-sm group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-sand-100 text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
