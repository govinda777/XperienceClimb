'use client';

import React from 'react';
import Image from 'next/image';
// import { Button } from '@/components/ui';

export function AboutSection() {
  return (
    <section id="sobre" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
                Escalada no Coração da
                <span className="text-orange-400"> Mata Atlântica</span>
              </h2>
              <p className="text-xl leading-relaxed text-neutral-700">
                O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema (FLONA), oferece uma
                das experiências de escalada mais autênticas e seguras do interior de São Paulo.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-climb-500 text-xl text-white">
                  🏔️
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-climb-600">
                    Rochas Naturais Únicas
                  </h3>
                  <p className="text-neutral-700">
                    Formações rochosas de quartzito com mais de 600 milhões de anos, oferecendo vias
                    para todos os níveis de experiência.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-xl text-white">
                  🌿
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-climb-600">
                    Conservação e Natureza
                  </h3>
                  <p className="text-neutral-700">
                    Localizado em uma unidade de conservação federal, garantindo a preservação do
                    ambiente e biodiversidade local.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-xl text-white">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-climb-600">
                    Instrutores Certificados
                  </h3>
                  <p className="text-neutral-700">
                    Equipe de profissionais com certificação nacional e internacional, garantindo
                    segurança e aprendizado de qualidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <div className="mb-3 flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h4 className="text-lg font-semibold text-climb-600">
                  Sobre a Floresta Nacional de Ipanema (Flona)
                </h4>
              </div>
              <p className="text-neutral-700">
                A Floresta Nacional de Ipanema, antes conhecida como "Fazenda Ipanema" é uma unidade
                de Conservação da natureza, administrada pelo Instituto Chico Mendes de Conservação
                da Biodiversidade (ICMBio), localizada a 120 km da cidade de São Paulo e abrangendo
                parte dos municípios de Iperó, Araçoiaba da Serra e Capela do Alto. A missão da
                Flona de Ipanema é proteger, conservar e restaurar os remanescentes de vegetação
                nativa do domínio de Mata Atlântica, especialmente o Morro Araçoiaba, e seus
                ambientes associados, seus atributos naturais, históricos e culturais, promover o
                manejo florestal, o uso público e ser referência em integração socioambiental,
                pesquisa e disseminação de conhecimentos.
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
                className="h-[400px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">📍 Floresta Nacional de Ipanema</p>
                <p className="text-xs opacity-90">Iperó, São Paulo</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-climb-600">50+</div>
                  <div className="text-sm text-neutral-600">Vias Diferentes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">600M</div>
                  <div className="text-sm text-neutral-600">Anos de História</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 rounded-2xl bg-orange-400 p-4 text-center text-white shadow-lg">
              <div className="text-xl font-bold">120km</div>
              <div className="text-xs">de São Paulo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
