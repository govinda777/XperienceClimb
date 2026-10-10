'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';
import {
  MapPin,
  Clock,
  Backpack,
  Building2,
  HelpCircle,
  Navigation,
  ArrowRight,
} from 'lucide-react';

export function ScheduleSection() {
  const { currentTheme } = useTheme();
  const { logistics, location } = currentTheme;

  return (
    <section id="programacao" className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Logistics & Meeting Point */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/60 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-stone-700">
              <span>CRONOGRAMA & REQUISITOS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-stone-900 mb-8 md:text-5xl">
              Programação e Logística
            </h2>

            <div className="space-y-6">
              {/* Meeting Point Card */}
              <div className="flex items-start gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                <div className="flex-shrink-0 w-11 h-11 bg-orange-50 border border-orange-200/60 rounded-xl flex items-center justify-center text-orange-600">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    Ponto de Encontro
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5 mb-2">Meeting Point</h3>
                  <p className="text-stone-600 leading-relaxed text-sm mb-4">
                    {logistics.meetingPoint}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(location.meetingPointMapsUrl || location.mapsUrl, '_blank')
                    }
                    className="gap-2 border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400"
                  >
                    <Navigation className="h-3.5 w-3.5 text-orange-600" strokeWidth={1.5} />
                    <span>Ver no Google Maps</span>
                  </Button>
                </div>
              </div>

              {/* Horários Card */}
              <div className="flex items-start gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                <div className="flex-shrink-0 w-11 h-11 bg-emerald-50 border border-emerald-200/60 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Janela Operacional
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5 mb-2">Horários</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">
                    <strong>Início:</strong> {logistics.schedule.openTime}
                    <br />
                    <strong>Término:</strong> {logistics.schedule.closeTime}
                  </p>
                  {logistics.schedule.notes && (
                    <p className="text-xs text-stone-500 mt-2 font-mono">
                      * {logistics.schedule.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Checklist / O que considerar */}
              <div className="bg-stone-100/80 p-6 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 mb-4 flex items-center text-base gap-2">
                  <Backpack className="h-4 w-4 text-orange-600" strokeWidth={1.5} />
                  <span>O que considerar para a atividade</span>
                </h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  {logistics.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid gap-6">
            <div className="bg-stone-900 p-8 rounded-3xl text-white shadow-xl border border-stone-800">
              <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-climb-300">
                <Building2 className="h-4 w-4" strokeWidth={1.5} />
                <span>EXPEDIÇÕES CORPORATIVAS</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Team Building na Rocha</h3>
              <p className="text-neutral-300 mb-8 leading-relaxed text-sm">
                Leve seu time para as alturas com metodologia de superação e confiança mútua.
                Programas desenhados sob medida para empresas.
              </p>
              <Button
                size="lg"
                className="w-full gap-2 bg-white text-stone-950 font-bold hover:bg-stone-100 transition-colors"
                onClick={() =>
                  openWhatsApp(
                    CONTACT_INFO.phone,
                    'Olá! Gostaria de solicitar uma proposta para evento corporativo de team building 🏢'
                  )
                }
              >
                <span>Solicitar Proposta Corporativa</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>

            <div className="bg-white p-8 rounded-3xl text-stone-900 shadow-sm border border-stone-200">
              <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-orange-600 font-semibold">
                <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
                <span>CANAL TÉCNICO DIRETO</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Dúvidas com um Guia?</h3>
              <p className="text-stone-600 mb-8 leading-relaxed text-sm">
                Converse diretamente com instrutores certificados sobre grau de esforço físico,
                calçados adequados e protocolos de segurança.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 border-stone-300 text-stone-900 hover:bg-stone-50 font-bold transition-colors"
                onClick={() =>
                  openWhatsApp(
                    CONTACT_INFO.phone,
                    'Olá! Gostaria de falar com um guia certificado sobre a atividade de escalada 🏔️'
                  )
                }
              >
                <span>Falar com Guia Certificado</span>
                <ArrowRight className="h-4 w-4 text-stone-500" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
