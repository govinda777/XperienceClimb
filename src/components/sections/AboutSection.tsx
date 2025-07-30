'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
                Escalada no Coração da
                <span className="text-orange-400"> Mata Atlântica</span>
              </h2>
              <p className="text-xl text-neutral-700 leading-relaxed">
                O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema, 
                oferece uma das experiências de escalada mais autênticas e seguras 
                do interior de São Paulo.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-climb-500 rounded-full flex items-center justify-center text-white text-xl">
                  🏔️
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-climb-600 mb-2">
                    Rochas Naturais Únicas
                  </h3>
                  <p className="text-neutral-700">
                    Formações rochosas de quartzito com mais de 600 milhões de anos, 
                    oferecendo vias para todos os níveis de experiência.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white text-xl">
                  🌿
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-climb-600 mb-2">
                    Conservação e Natureza
                  </h3>
                  <p className="text-neutral-700">
                    Localizado em uma unidade de conservação federal, garantindo 
                    a preservação do ambiente e biodiversidade local.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-climb-600 mb-2">
                    Instrutores Certificados
                  </h3>
                  <p className="text-neutral-700">
                    Equipe de profissionais com certificação nacional e internacional, 
                    garantindo segurança e aprendizado de qualidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📋</span>
                <h4 className="text-lg font-semibold text-climb-600">
                  Certificação ICMBio
                </h4>
              </div>
              <p className="text-neutral-700">
                Somos uma empresa autorizada pelo ICMBio para operação turística 
                na Floresta Nacional de Ipanema, seguindo rigorosos protocolos 
                de segurança e sustentabilidade.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/flona.jpg"
                alt="Vista da Floresta Nacional de Ipanema"
                width={600}
                height={400}
                className="object-cover w-full h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">📍 Floresta Nacional de Ipanema</p>
                <p className="text-xs opacity-90">Iperó, São Paulo</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-climb-600">15+</div>
                  <div className="text-sm text-neutral-600">Vias Diferentes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">600M</div>
                  <div className="text-sm text-neutral-600">Anos de História</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-orange-400 rounded-2xl shadow-lg p-4 text-white text-center">
              <div className="text-xl font-bold">120km</div>
              <div className="text-xs">de São Paulo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}