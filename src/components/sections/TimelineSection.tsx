'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import {
  ClimbingRockDrawing,
  DeliciousLunchDrawing,
  SunsetCelebrationDrawing,
  ClimbingNodeIcon,
  LunchNodeIcon,
  SunsetNodeIcon,
} from '@/components/ui/TimelineDrawings';

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

  const getEventDetails = (activity: string, index: number) => {
    const act = activity.toLowerCase();
    if (act.includes('escalada')) {
      return {
        tag: 'CAP · 01 / VIVÊNCIA ROCHOSA',
        altitude: 'ALT 1.120m',
        description:
          'Instrução técnica de segurança, equipagem individual com materiais homologados UIAA e progressão guiada nas vias de aderência e fendas do monólito.',
        drawing: (
          <ClimbingRockDrawing className="w-full h-auto drop-shadow-sm rounded-2xl group-hover:scale-102 transition-transform duration-500 ease-out" />
        ),
        nodeIcon: <ClimbingNodeIcon className="w-6 h-6 text-white" />,
      };
    }
    if (act.includes('almoço') || act.includes('almoco')) {
      return {
        tag: 'CAP · 02 / RECARGA & CONVÍVIO',
        altitude: 'ALT 980m',
        description:
          'Momento de celebração e pausa gastronômica em restaurante rústico da vila, com autêntica comida no fogão a lenha e opções vegetarianas.',
        drawing: (
          <DeliciousLunchDrawing className="w-full h-auto drop-shadow-sm rounded-2xl group-hover:scale-102 transition-transform duration-500 ease-out" />
        ),
        nodeIcon: <LunchNodeIcon className="w-6 h-6 text-white" />,
      };
    }
    if (act.includes('sol')) {
      return {
        tag: 'CAP · 03 / CUME & CELEBRAÇÃO',
        altitude: 'ALT 1.100m',
        description:
          'Contemplação panorâmica da cordilheira da Mantiqueira direto do platô rochoso, fechando o dia de superação com o espetáculo do pôr do sol dourado.',
        drawing: (
          <SunsetCelebrationDrawing className="w-full h-auto drop-shadow-sm rounded-2xl group-hover:scale-102 transition-transform duration-500 ease-out" />
        ),
        nodeIcon: <SunsetNodeIcon className="w-6 h-6 text-ink-900" />,
      };
    }
    return {
      tag: `ETAPA · 0${index + 1}`,
      altitude: 'PEDRA BELA',
      description: '',
      drawing: null,
      nodeIcon: null,
    };
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
        <div className="relative max-w-5xl mx-auto">
          {/* Linha Vertical Conectora Tracejada */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-sand-300"></div>

          <div className="space-y-12 md:space-y-16">
            {timeline.events.map((event, index) => {
              const isEven = index % 2 === 0;
              const details = getEventDetails(event.activity, index);

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Ponto Central com Ícone Vetorial */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl ${getIconColor(
                        event.color
                      )} flex items-center justify-center shadow-md border-2 border-white transition-transform duration-300 hover:scale-110`}
                      title={event.activity}
                    >
                      {details.nodeIcon || event.icon}
                    </div>
                  </div>

                  {/* Card de Conteúdo Editorial com Desenho SVG */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sand-200 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 ease-out group">
                      {/* Desenho SVG Autoral com Moldura Suave */}
                      {details.drawing && (
                        <div className="mb-5 overflow-hidden rounded-2xl border border-sand-200/60 bg-sand-50/60 p-2 shadow-inner">
                          {details.drawing}
                        </div>
                      )}

                      {/* Header Técnico: Tag Mono e Altitude */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-100">
                          {details.tag}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs font-semibold text-ink-500">
                          {details.altitude}
                        </span>
                      </div>

                      {/* Horário com Badge */}
                      <div
                        className={`flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider ${getTextColor(
                          event.color
                        )} font-bold mb-2`}
                      >
                        <span>⏱</span>
                        <span>{event.time}</span>
                      </div>

                      {/* Título da Atividade */}
                      <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mb-2">
                        {event.activity}
                      </h3>

                      {/* Descrição Editorial */}
                      {details.description && (
                        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                          {details.description}
                        </p>
                      )}
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
