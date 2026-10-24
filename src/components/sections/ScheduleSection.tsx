'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function ScheduleSection() {
  const { currentTheme } = useTheme();

  // Consome scheduleSection de pedra-bela.ts com fallback
  const sched = currentTheme?.scheduleSection || pedraBellaTheme.scheduleSection!;

  return (
    <section id="programacao" className="py-24 relative bg-sand-100/80 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* COLUNA DA ESQUERDA: JANELA OPERACIONAL & CHECKLIST */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
              <span>{sched.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900 mb-6">
              {sched.title}{' '}
              <span className="font-serifIt italic font-light text-terracotta-500 normal-case">
                {sched.titleAccent}
              </span>
            </h2>

            <div className="space-y-6">
              {/* Card Horários */}
              <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center text-xl flex-shrink-0">
                  {sched.hoursCard.icon}
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-forest-700">
                    {sched.hoursCard.tag}
                  </span>
                  <h3 className="text-xl font-bold text-ink-900 mt-0.5 mb-1">
                    {sched.hoursCard.time}
                  </h3>
                  <p className="text-xs text-ink-600 leading-relaxed">
                    {sched.hoursCard.description}
                  </p>
                </div>
              </div>

              {/* Card Checklist O que Levar */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-soft">
                <h3 className="font-bold text-lg text-ink-900 mb-4 flex items-center gap-2">
                  <span>{sched.checklistCard.icon}</span>
                  <span>{sched.checklistCard.title}</span>
                </h3>
                <ul className="space-y-3 font-mono text-xs text-ink-700">
                  {sched.checklistCard.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-terracotta-500 font-bold">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA: OS DOIS ACTION CARDS (CORPORATIVO E CANAL TÉCNICO) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Team Building Corporativo */}
            <div className="bg-forest-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl border border-forest-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 text-[10px] font-mono font-bold uppercase tracking-wider text-sun-300 mb-3">
                {sched.corporateCard.badge}
              </div>
              <h3 className="text-2xl font-bold mb-2">{sched.corporateCard.title}</h3>
              <p className="text-xs text-sand-200 leading-relaxed mb-6">
                {sched.corporateCard.description}
              </p>
              <a
                href={sched.corporateCard.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-white text-forest-900 hover:bg-sand-100 font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{sched.corporateCard.ctaText}</span>
                <span>↗</span>
              </a>
            </div>

            {/* Card 2: Dúvidas Técnicas com Guia */}
            <div className="bg-white text-ink-900 p-7 sm:p-8 rounded-3xl shadow-soft border border-sand-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-100 text-[10px] font-mono font-bold uppercase tracking-wider text-terracotta-600 mb-3">
                {sched.guideSupportCard.badge}
              </div>
              <h3 className="text-2xl font-bold mb-2">{sched.guideSupportCard.title}</h3>
              <p className="text-xs text-ink-600 leading-relaxed mb-6">
                {sched.guideSupportCard.description}
              </p>
              <a
                href={sched.guideSupportCard.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{sched.guideSupportCard.ctaText}</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
