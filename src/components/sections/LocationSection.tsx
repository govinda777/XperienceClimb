'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';

export function LocationSection() {
  const openMaps = () => {
    const mapsUrl = `https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568,775m/data=!3m1!1e3!4m9!1m2!2m1!1sFloresta+Nacional+de+Ipanema,+Iper%C3%B3,+SP!3m5!1s0x94c5f172812051e1:0xc9ab288d76797fad!8m2!3d-23.4254791!4d-47.5979779!16s%2Fg%2F11gj_vn973!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section id="localizacao" className="py-20 bg-climb-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Como Chegar
          </h2>
          <p className="text-xl text-climb-100 max-w-3xl mx-auto">
            O Morro Araçoiaba está localizado na Floresta Nacional de Ipanema, 
            a apenas 120km de São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map and Directions */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Endereço</h3>
                  <p className="text-climb-100 text-lg leading-relaxed">
                    {CONTACT_INFO.address}
                    <br />
                    Iperó, São Paulo
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={openMaps}
                  className="flex-1"
                >
                  🗺️ Abrir no Google Maps
                </Button>
              </div>
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Como Chegar de Carro</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Saída de São Paulo</h4>
                    <p className="text-climb-100">
                      Siga pela Rodovia Raposo Tavares (SP-270) sentido interior
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Saída Iperó</h4>
                    <p className="text-climb-100">
                      Pegue a saída 109 - Iperó/Boituva (aproximadamente 90km)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Entrada da Floresta</h4>
                    <p className="text-climb-100">
                      Siga as placas para "Floresta Nacional de Ipanema" (8km)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Chegada</h4>
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
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-yellow-100 mb-1">Importante</h4>
                    <p className="text-yellow-200 text-sm">
                      Horário de funcionamento do parque: 8h às 17h.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-green-100 mb-1">Cronograma</h4>
                    <p className="text-green-200 text-sm">
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