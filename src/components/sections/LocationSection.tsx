'use client';

import React from 'react';
// import Image from 'next/image';
import { Button } from '@/components/ui';
import { useTheme } from '@/themes/ThemeProvider';

export function LocationSection() {
  const { currentTheme } = useTheme();

  const openMaps = () => {
    window.open(currentTheme.location.mapsUrl, '_blank');
  };

  return (
    <section id="localizacao" className="bg-climb-600 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Como Chegar</h2>
          <p className="mx-auto max-w-3xl text-xl text-climb-100">
            {currentTheme.location.name} está localizado em {currentTheme.location.address}, a
            apenas {currentTheme.location.distance}.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Map and Directions */}
          <div className="space-y-8">
            {/* Address Cards */}
            <div className="space-y-5">
              {/* Card 1: Ponto de Encontro Oficial (Padaria São João) */}
              {currentTheme.location.meetingPointMapsUrl && (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-400/50">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/20 text-xl">
                        ☕
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          Ponto 01 · Ponto de Encontro (08:30h)
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {currentTheme.location.meetingPointName || 'Padaria São João'}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mb-2 text-sm leading-relaxed text-climb-100">
                    <strong className="text-white">Endereço:</strong>{' '}
                    {currentTheme.location.meetingPointAddress ||
                      'Rua Bernardino de Lima Paes, 07 - Centro'}
                    <br />
                    {currentTheme.location.city}, {currentTheme.location.state}
                  </p>

                  {currentTheme.location.meetingPointNotes && (
                    <p className="mb-4 rounded-lg border border-white/5 bg-black/20 p-2.5 text-xs text-amber-200/90">
                      💡 {currentTheme.location.meetingPointNotes}
                    </p>
                  )}

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => window.open(currentTheme.location.meetingPointMapsUrl, '_blank')}
                    className="w-full justify-center border-amber-400/40 bg-amber-500/15 text-white transition-all duration-300 hover:bg-amber-500/25"
                  >
                    📍 Abrir Padaria São João no Google Maps
                  </Button>
                </div>
              )}

              {/* Card 2: Local da Vivência de Escalada (Xperience Climb) */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/30">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-500/20 text-xl">
                      🧗
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange-300">
                        {currentTheme.location.meetingPointMapsUrl
                          ? 'Ponto 02 · Local da Vivência (Setor de Escalada)'
                          : 'Local da Atividade'}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {currentTheme.location.name || 'Xperience Climb'}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="mb-2 text-sm leading-relaxed text-climb-100">
                  <strong className="text-white">Local da Aventura:</strong>{' '}
                  {currentTheme.location.address}
                  <br />
                  {currentTheme.location.city}, {currentTheme.location.state}
                </p>

                <p className="mb-4 rounded-lg border border-white/5 bg-black/20 p-2.5 text-xs text-climb-200">
                  🏔️ Setor Campo Escola com vias na rocha natural para iniciantes, tirolesa e
                  contemplação na montanha.
                </p>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={openMaps}
                  className="w-full justify-center bg-orange-500 text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600"
                >
                  🗺️ Abrir Xperience Climb no Google Maps
                </Button>
              </div>
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Como Chegar de Carro</h3>

              <div className="space-y-4">
                {currentTheme.location.directions.map((direction, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                        index === currentTheme.location.directions.length - 1
                          ? 'bg-green-500'
                          : 'bg-orange-400'
                      }`}
                    >
                      {index === currentTheme.location.directions.length - 1 ? '✓' : direction.step}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">{direction.title}</h4>
                      <p className="text-climb-100">{direction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sectors Map */}
          <div className="space-y-6">
            {/* Important Notes */}
            <div className="space-y-4">
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/20 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl text-yellow-400">⚠️</span>
                  <div>
                    <h4 className="mb-1 font-semibold text-yellow-100">Importante</h4>
                    <div className="text-sm text-yellow-200 space-y-1">
                      {currentTheme.logistics.importantNotes.map((note, index) => (
                        <p key={index}>{note}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl text-green-400">💡</span>
                  <div>
                    <h4 className="mb-1 font-semibold text-green-100">Dicas</h4>
                    <div className="text-sm text-green-200 space-y-1">
                      {currentTheme.logistics.tips.map((tip, index) => (
                        <p key={index}>{tip}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
