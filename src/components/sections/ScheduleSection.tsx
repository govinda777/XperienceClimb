'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';

export function ScheduleSection() {
  const { currentTheme } = useTheme();
  const { logistics, location } = currentTheme;

  return (
    <section id="programacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Logistics & Meeting Point */}
          <div>
            <h2 className="text-4xl font-bold text-climb-600 mb-8">Programação e Logística</h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h4 className="text-xl font-bold text-climb-600 mb-2">Meeting Point</h4>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    {logistics.meetingPoint}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(location.mapsUrl, '_blank')}
                    className="text-orange-500 border-orange-500 hover:bg-orange-50"
                  >
                    🗺️ Ver no Google Maps
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <h4 className="text-xl font-bold text-climb-600 mb-2">Horários</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    <strong>Início:</strong> {logistics.schedule.openTime}
                    <br />
                    <strong>Término:</strong> {logistics.schedule.closeTime}
                  </p>
                  {logistics.schedule.notes && (
                    <p className="text-sm text-neutral-500 mt-2 italic">
                      * {logistics.schedule.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-climb-50 p-6 rounded-2xl border border-climb-100">
                <h4 className="font-bold text-climb-600 mb-4 flex items-center">
                  <span className="mr-2">🎒</span> O que considerar
                </h4>
                <ul className="space-y-2">
                  {logistics.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start text-neutral-700">
                      <span className="text-orange-400 mr-2">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid gap-6">
            <div className="bg-gradient-to-br from-climb-500 to-climb-700 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Experiência Corporativa</h3>
              <p className="text-climb-50 mb-8 leading-relaxed">
                Leve seu time para as alturas. Desenvolvemos programas sob medida para team building e liderança.
              </p>
              <Button
                size="lg"
                className="w-full bg-white text-climb-600 font-bold hover:bg-climb-50 transition-colors"
                onClick={() =>
                  openWhatsApp(
                    CONTACT_INFO.phone,
                    'Olá! Gostaria de solicitar uma proposta para evento corporativo de team building 🏢'
                  )
                }
              >
                🏢 Solicitar Proposta Corporativa
              </Button>
            </div>

            <div className="bg-neutral-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Dúvidas Técnicas?</h3>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Fale diretamente com quem entende. Nossos guias certificados estão prontos para tirar todas as suas dúvidas.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 font-bold transition-colors"
                onClick={() =>
                  openWhatsApp(
                    CONTACT_INFO.phone,
                    'Olá! Gostaria de falar com um guia certificado sobre a atividade de escalada 🏔️'
                  )
                }
              >
                💬 Falar com Guia Certificado
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
