'use client';

import React from 'react';
import { Calendar, Lock, MapPin } from 'lucide-react';
import { NEXT_EVENTS, CONTACT_INFO } from '@/lib/constants';
import { openWhatsApp } from '@/lib/utils';
import { Card } from '@/components/ui';

export function CalendarSection() {
  return (
    <section id="calendario" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            Próximas Fronteiras
          </h2>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            Nossos desafios acontecem no último mês de cada bimestre. Prepare-se para o
            desconhecido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {NEXT_EVENTS.map((event, index) => (
            <Card
              key={index}
              interactive={true}
              onClick={() =>
                openWhatsApp(
                  CONTACT_INFO.phone,
                  `Olá! Vi a data de ${event.date} no calendário e gostaria de saber mais sobre esse destino misterioso 🏔️✨`
                )
              }
              className="group relative h-64 flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-neutral-200 hover:border-climb-400 hover:bg-climb-50/30 transition-all duration-500"
            >
              {/* Secret Overlay Effect */}
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full text-neutral-400 group-hover:bg-climb-100 group-hover:text-climb-500 transition-colors duration-500">
                  <Lock className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-neutral-400 group-hover:text-climb-600 mb-2 transition-colors duration-500">
                  {event.date}
                </h3>

                <div className="flex items-center justify-center text-neutral-300 group-hover:text-climb-400 transition-colors duration-500 blur-[4px] group-hover:blur-none">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="font-medium">Destino Secreto</span>
                </div>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm font-bold text-climb-600 underline">
                    Descobrir Destino
                  </span>
                </div>
              </div>

              {/* Padlock corner icon */}
              <div className="absolute top-4 right-4 text-neutral-200 group-hover:text-climb-200 transition-colors duration-500">
                <Calendar className="w-5 h-5" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-full bg-neutral-100 mb-4">
            <div className="px-4 py-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
              Vagas Limitadas por Data
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
