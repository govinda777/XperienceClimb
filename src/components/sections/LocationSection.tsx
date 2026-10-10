'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useTheme } from '@/themes/ThemeProvider';
import {
  Coffee,
  Mountain,
  Navigation,
  MapPin,
  Car,
  AlertCircle,
  Lightbulb,
  Check,
} from 'lucide-react';

export function LocationSection() {
  const { currentTheme } = useTheme();

  const openMaps = () => {
    window.open(currentTheme.location.mapsUrl, '_blank');
  };

  return (
    <section
      id="localizacao"
      className="relative bg-[#081115] py-24 text-white overflow-hidden grain-light"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-climb-200">
            <span>LOGÍSTICA & PONTOS DE ENCONTRO</span>
          </div>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">Como Chegar</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            {currentTheme.location.name} está localizado em {currentTheme.location.address}, a
            apenas{' '}
            <span className="font-semibold text-white">{currentTheme.location.distance}</span>.
          </p>
        </div>

        {/* 2 Integrated Location Cards (Equal Visual Weight) */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Meeting Point */}
          {currentTheme.location.meetingPointMapsUrl && (
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-400 shadow-sm">
                      <Coffee className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-300">
                        Ponto 01 · Recepção (08:30h)
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight text-white">
                        {currentTheme.location.meetingPointName || 'Padaria São João'}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mb-4 space-y-1.5 text-sm text-neutral-300">
                  <p>
                    <span className="font-semibold text-white">Endereço: </span>
                    {currentTheme.location.meetingPointAddress ||
                      'Rua Bernardino de Lima Paes, 07 - Centro'}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {currentTheme.location.city}, {currentTheme.location.state}
                  </p>
                </div>

                {currentTheme.location.meetingPointNotes && (
                  <p className="mb-6 rounded-2xl border border-white/10 bg-black/25 p-3.5 text-xs text-amber-200/90 leading-relaxed">
                    {currentTheme.location.meetingPointNotes}
                  </p>
                )}
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => window.open(currentTheme.location.meetingPointMapsUrl, '_blank')}
                className="w-full justify-center gap-2 border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 hover:text-white"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.5} />
                <span>Abrir Ponto de Encontro no Google Maps</span>
              </Button>
            </div>
          )}

          {/* Card 2: Rock Sector */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-400/10 text-orange-400 shadow-sm">
                    <Mountain className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-orange-400">
                      Ponto 02 · Campo Escola
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {currentTheme.location.name || 'Xperience Climb'}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-1.5 text-sm text-neutral-300">
                <p>
                  <span className="font-semibold text-white">Base das Vias: </span>
                  {currentTheme.location.address}
                </p>
                <p className="text-xs text-neutral-400">
                  {currentTheme.location.city}, {currentTheme.location.state}
                </p>
              </div>

              <p className="mb-6 rounded-2xl border border-white/10 bg-black/25 p-3.5 text-xs text-neutral-300 leading-relaxed">
                Setor escola com vias protegidas na rocha natural para iniciantes, tirolesa e
                mirante panorâmico na montanha.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={openMaps}
              className="w-full justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/20"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              <span>Abrir Rota da Pedra no Google Maps</span>
            </Button>
          </div>
        </div>

        {/* Lower Grid: Directions + Guidelines */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Driving Route Steps */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-climb-300">
                <Car className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">Como Chegar de Carro</h3>
            </div>

            <div className="space-y-6">
              {currentTheme.location.directions.map((direction, index) => {
                const isLast = index === currentTheme.location.directions.length - 1;

                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                          isLast
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                            : 'bg-white/10 text-white border border-white/15'
                        }`}
                      >
                        {isLast ? (
                          <Check className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          `0${direction.step}`
                        )}
                      </div>
                      {!isLast && (
                        <div className="h-10 w-px border-l border-dashed border-white/20 mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{direction.title}</h4>
                      <p className="mt-0.5 text-xs text-neutral-300 leading-relaxed">
                        {direction.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expedition Guidelines (Substitui os cards amarelos de aviso) */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-md space-y-6">
            {/* Recomendações Importantes */}
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  Diretrizes de Expedição
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                {currentTheme.logistics.importantNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80"></span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="mb-4 flex items-center gap-2.5">
                <Lightbulb className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Dicas de Campo
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                {currentTheme.logistics.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
