'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function CommunitySection() {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'instructors' | 'locations'>('instructors');

  // Consome communitySection de pedra-bela.ts com fallback
  const comm = currentTheme?.communitySection || pedraBellaTheme.communitySection!;

  return (
    <section id="comunidade" className="py-24 relative bg-sand-50/70 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-ink-900 mb-4">
            {comm.title} <span className="text-terracotta-500">{comm.titleAccent}</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-600 leading-relaxed">{comm.description}</p>
        </div>

        {/* Estatísticas Oficiais */}
        <div className="grid grid-cols-2 gap-6 mb-12 max-w-md mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-soft border border-sand-200">
            <div className="text-4xl font-display font-black text-forest-700 mb-1">
              {comm.stats.instructorsCount}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-ink-500 font-semibold">
              Instrutores
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-soft border border-sand-200">
            <div className="text-4xl font-display font-black text-forest-700 mb-1">
              {comm.stats.locationsCount}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-ink-500 font-semibold">
              Locais
            </div>
          </div>
        </div>

        {/* Navegação por Abas em Pílula */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('instructors')}
            className={`flex items-center space-x-3 px-7 py-3.5 rounded-full transition-all duration-300 shadow-md font-medium cursor-pointer ${
              activeTab === 'instructors'
                ? 'bg-terracotta-500 text-white shadow-md'
                : 'bg-white text-ink-700 hover:bg-sand-100 border border-sand-200 shadow-sm'
            }`}
          >
            <span className="text-2xl">🧑‍🏫</span>
            <div className="text-left">
              <div className="font-bold text-sm">Instrutores</div>
              <div
                className={`text-[11px] hidden sm:block ${
                  activeTab === 'instructors' ? 'opacity-90' : 'text-ink-500'
                }`}
              >
                Profissionais certificados e experientes
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('locations')}
            className={`flex items-center space-x-3 px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm font-medium cursor-pointer ${
              activeTab === 'locations'
                ? 'bg-terracotta-500 text-white shadow-md'
                : 'bg-white text-ink-700 hover:bg-sand-100 border border-sand-200 shadow-sm'
            }`}
          >
            <span className="text-2xl">📍</span>
            <div className="text-left">
              <div className="font-bold text-sm">Locais</div>
              <div
                className={`text-[11px] hidden sm:block ${
                  activeTab === 'locations' ? 'opacity-90' : 'text-ink-500'
                }`}
              >
                Destinos já visitados pela nossa comunidade
              </div>
            </div>
          </button>
        </div>

        {/* Card Container Branco Principal */}
        <div className="bg-white rounded-3xl shadow-soft border border-sand-200 p-7 sm:p-10">
          {/* Aba 1: INSTRUTORES */}
          {activeTab === 'instructors' && (
            <div>
              <h3 className="text-2xl font-bold text-ink-900 mb-2 flex items-center gap-2">
                <span>🧑‍🏫</span>
                <span>Instrutores Certificados</span>
              </h3>
              <p className="text-sm text-ink-600 mb-8 max-w-3xl leading-relaxed">
                Nossa equipe de instrutores é formada por profissionais experientes e certificados,
                comprometidos com sua segurança e aprendizado.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {comm.instructors.map((inst, index) => (
                  <div
                    key={index}
                    className="bg-sand-50/70 rounded-2xl p-6 sm:p-7 border border-sand-200/80 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <Image
                          src={inst.photo}
                          alt={inst.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-ink-900 text-lg mb-1">{inst.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500 mb-2 font-mono">
                          <span className="text-amber-500 font-bold">{inst.rating}</span>
                          <span>{inst.location}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500 font-mono">
                          <span>{inst.experience}</span>
                          <span>{inst.clients}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-ink-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {inst.bio}
                    </p>

                    <div className="space-y-4 pt-3 border-t border-sand-200/80">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-400 font-semibold mb-2">
                          Especialidades:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {inst.specialties.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 bg-forest-50 text-forest-800 border border-forest-200/60 text-xs rounded-md font-mono font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-400 font-semibold mb-2">
                          Certificações:
                        </div>
                        <div className="space-y-1.5 text-xs text-ink-700">
                          {inst.certifications.map((cert, cIdx) => (
                            <div key={cIdx}>{cert}</div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-sand-200">
                        <div className="text-xs font-mono text-ink-600 font-semibold">
                          Faixa de preço:{' '}
                          <span className="text-ink-900 font-bold">{inst.priceRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={inst.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Contato via WhatsApp com ${inst.name}`}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-200/60 transition-colors"
                          >
                            <span className="text-base">💬</span>
                          </a>
                          <a
                            href={inst.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Perfil do Instagram de ${inst.name}`}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200/60 transition-colors"
                          >
                            <span className="text-base">📱</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aba 2: LOCAIS */}
          {activeTab === 'locations' && (
            <div>
              <h3 className="text-2xl font-bold text-ink-900 mb-2 flex items-center gap-2">
                <span>📍</span>
                <span>Locais Visitados</span>
              </h3>
              <p className="text-sm text-ink-600 mb-8 max-w-3xl leading-relaxed">
                Explore os destinos incríveis que já fizeram parte das nossas aventuras. Cada local
                foi cuidadosamente selecionado e testado pela nossa equipe.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {comm.locations.map((loc, index) => (
                  <div
                    key={index}
                    className="bg-sand-50/70 rounded-2xl overflow-hidden border border-sand-200/80 hover:shadow-soft transition-all"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={loc.image}
                        alt={loc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-ink-900 text-lg mb-0.5">{loc.name}</h4>
                          <span className="text-xs text-ink-500 font-mono">{loc.location}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-md">
                          {loc.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-ink-600 leading-relaxed mb-4">{loc.description}</p>
                      <div className="text-xs font-mono text-forest-700 font-semibold">
                        {loc.highlights}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
