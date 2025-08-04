'use client';

import React from 'react';
// import Image from 'next/image';
import { Button } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';

export function LocationSection() {
  const openMaps = () => {
    const mapsUrl = `https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568,775m/data=!3m1!1e3!4m9!1m2!2m1!1sFloresta+Nacional+de+Ipanema,+Iper%C3%B3,+SP!3m5!1s0x94c5f172812051e1:0xc9ab288d76797fad!8m2!3d-23.4254791!4d-47.5979779!16s%2Fg%2F11gj_vn973!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section id="localizacao" className="bg-climb-600 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Como Chegar</h2>
          <p className="mx-auto max-w-3xl text-xl text-climb-100">
            O Morro Araçoiaba está localizado na Floresta Nacional de Ipanema, a apenas 120km de São
            Paulo.
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
                    {CONTACT_INFO.address}
                    <br />
                    Iperó, São Paulo
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
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Saída de São Paulo</h4>
                    <p className="text-climb-100">
                      Siga pela Rodovia Raposo Tavares (SP-270) sentido interior
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Saída Iperó</h4>
                    <p className="text-climb-100">
                      Pegue a saída 109 - Iperó/Boituva (aproximadamente 90km)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Entrada da Floresta</h4>
                    <p className="text-climb-100">
                      Siga as placas para "Floresta Nacional de Ipanema" (8km)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                    ✓
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Chegada</h4>
                    <p className="text-climb-100">
                      Estacionamento gratuito, proximo ao acesso ao setor de escalada
                    </p>
                  </div>
                </div>
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
                    <p className="text-sm text-yellow-200">
                      Horário de funcionamento do parque: 8h às 17h.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl text-green-400">💡</span>
                  <div>
                    <h4 className="mb-1 font-semibold text-green-100">Cronograma</h4>
                    <p className="text-sm text-green-200">
                      Chegue cedo para aproveitar melhor o dia e evitar multidões.
                    </p>
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
