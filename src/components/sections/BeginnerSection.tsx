'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';

export function BeginnerSection() {
  const { currentTheme } = useTheme();
  const { beginner } = currentTheme;

  return (
    <section id="iniciante" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            {beginner.title}
          </h2>
          <p className="text-xl text-neutral-700 leading-relaxed">
            {beginner.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {beginner.highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-16 h-16 bg-climb-50 rounded-full flex items-center justify-center text-3xl mb-6">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-climb-600 mb-4">{highlight.title}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block mb-8 px-6 py-3 bg-climb-600 text-white rounded-full font-bold text-lg animate-pulse-soft">
            {beginner.finalMessage}
          </div>
          <br />
          <Button
            size="xl"
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() =>
              openWhatsApp(
                CONTACT_INFO.phone,
                'Olá! Nunca escalei e gostaria de reservar meu batismo de escalada 🧗‍♂️'
              )
            }
          >
            🧗‍♂️ Reservar Batismo de Escalada
          </Button>
        </div>
      </div>
    </section>
  );
}
