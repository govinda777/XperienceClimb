'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';

export function LocationSection() {
  const openMaps = () => {
    const address = 'Floresta Nacional de Ipanema, Iperó, SP';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const openWaze = () => {
    const address = 'Floresta Nacional de Ipanema, Iperó, SP';
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`;
    window.open(wazeUrl, '_blank');
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
                <Button
                  variant="outline"
                  size="md"
                  onClick={openWaze}
                  className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  🚗 Abrir no Waze
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
                      Estacionamento gratuito disponível na entrada do parque
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-orange-400/20 border border-orange-400/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🚌</span>
                <h4 className="text-lg font-semibold">Transporte Público</h4>
              </div>
              <p className="text-climb-100 mb-4">
                Para quem não tem carro, oferecemos transfer saindo de São Paulo 
                nos finais de semana (consulte disponibilidade).
              </p>
              <Button variant="outline" size="sm" className="bg-transparent border-orange-400/50 text-orange-100 hover:bg-orange-400/10">
                📞 Consultar Transfer
              </Button>
            </div>
          </div>

          {/* Sectors Map */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mapa dos Setores</h3>
              <p className="text-climb-100 mb-6">
                O Morro Araçoiaba possui diferentes setores de escalada, 
                cada um com características únicas e níveis de dificuldade variados.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/setor-map.jpg"
                alt="Mapa dos setores de escalada do Morro Araçoiaba"
                width={600}
                height={400}
                className="object-cover w-full h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Setores Principais</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white">Iniciante</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-white">Intermediário</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-white">Avançado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white">Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="space-y-4">
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-yellow-100 mb-1">Importante</h4>
                    <p className="text-yellow-200 text-sm">
                      Horário de funcionamento: 8h às 17h. Entrada permitida até 15h.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-green-100 mb-1">Dica</h4>
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