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
            {currentTheme.location.name} está localizado em {currentTheme.location.address}, a apenas {currentTheme.location.distance}.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Map and Directions */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold">Endereço</h3>
                  <p className="text-lg leading-relaxed text-climb-100">
                    {currentTheme.location.address}
                    <br />
                    {currentTheme.location.city}, {currentTheme.location.state}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="secondary" size="md" onClick={openMaps} className="flex-1">
                  🗺️ Abrir no Google Maps
                </Button>
              </div>
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Como Chegar de Carro</h3>

              <div className="space-y-4">
                {currentTheme.location.directions.map((direction, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                      index === currentTheme.location.directions.length - 1 ? 'bg-green-500' : 'bg-orange-400'
                    }`}>
                      {index === currentTheme.location.directions.length - 1 ? '✓' : direction.step}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">{direction.title}</h4>
                      <p className="text-climb-100">
                        {direction.description}
                      </p>
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
