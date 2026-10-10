'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Mountain, Utensils, Sun, Compass, Clock } from 'lucide-react';

const getTimelineIcon = (activity: string, index: number) => {
  const act = activity.toLowerCase();
  if (act.includes('almoço') || act.includes('refeição')) {
    return <Utensils className="h-5 w-5 text-amber-400" strokeWidth={1.5} />;
  }
  if (act.includes('pôr do sol') || act.includes('mirante') || act.includes('sol')) {
    return <Sun className="h-5 w-5 text-orange-400" strokeWidth={1.5} />;
  }
  if (act.includes('escalada') || act.includes('rocha')) {
    return <Mountain className="h-5 w-5 text-climb-300" strokeWidth={1.5} />;
  }
  if (act.includes('encontro') || act.includes('café') || index === 0) {
    return <Compass className="h-5 w-5 text-emerald-400" strokeWidth={1.5} />;
  }
  return <Clock className="h-5 w-5 text-orange-300" strokeWidth={1.5} />;
};

export function TimelineSection() {
  const { currentTheme } = useTheme();
  const { timeline } = currentTheme;

  return (
    <section
      id="timeline"
      className="relative bg-[#09151A] py-24 text-white overflow-hidden grain-light"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-climb-200">
            <span>ITINERÁRIO DE CAMPO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Como Será o Seu Dia
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Uma jornada meticulosamente planejada do primeiro contato com a rocha até a celebração
            do pôr do sol.
          </p>
        </div>

        {/* Vertical Expedition Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical dashed line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-white/20"></div>

          <div className="space-y-10">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node / Anchor Point */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#0E1E24] shadow-xl backdrop-blur-md">
                      {getTimelineIcon(event.activity, index)}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-10">
                    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:-translate-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-orange-400 font-semibold mb-2">
                        <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span>{event.time}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {event.activity}
                      </h3>
                    </div>
                  </div>

                  {/* Spacer for desktop symmetry */}
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
