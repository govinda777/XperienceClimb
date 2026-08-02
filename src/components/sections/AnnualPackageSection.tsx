'use client';

import React from 'react';
import { Crown, CheckCircle2, Truck, Utensils, CalendarDays, Map } from 'lucide-react';
import { PACKAGES, CONTACT_INFO } from '@/lib/constants';
import { openWhatsApp } from '@/lib/utils';
import { Button } from '@/components/ui';

interface AnnualPackageSectionProps {
  cmsData?: {
    name?: string;
    description?: string;
    features?: string[];
  };
}

export function AnnualPackageSection({ cmsData }: AnnualPackageSectionProps) {
  const annualPkg = PACKAGES.anual;

  const name = cmsData?.name || annualPkg?.name || "Xperience Anual";
  const description = cmsData?.description || annualPkg?.description || "Assinatura anual premium com acesso garantido a todas as saídas bimestrais do ano.";
  const features = cmsData?.features || annualPkg?.features || [];

  if (!annualPkg && !cmsData) return null;

  return (
    <section id="anual" className="py-24 bg-neutral-900 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-climb-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-climb-500/20 border border-climb-500/30 text-climb-400 mb-6">
                <Crown className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Experiência Premium</span>
              </div>

              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {name}
              </h2>

              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-climb-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Transporte Incluso</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-climb-400">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Almoço Premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-climb-400">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Bimestral</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-climb-400">
                    <Map className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Vários Destinos</span>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-climb-500 hover:bg-climb-600 text-white font-bold px-10 py-7 text-lg rounded-2xl shadow-xl shadow-climb-500/20 transition-all hover:scale-105"
                onClick={() => openWhatsApp(
                  CONTACT_INFO.phone,
                  'Olá! Tenho interesse no Pacote Anual e gostaria de receber uma cotação para as saídas bimestrais 🧗💎'
                )}
              >
                💎 Solicitar Cotação Personalizada
              </Button>
            </div>

            {/* Features Side */}
            <div className="bg-neutral-800/50 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2 text-climb-400" />
                O que está incluso
              </h3>

              <ul className="space-y-5">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <div className="mt-1 w-5 h-5 rounded-full bg-climb-500/10 flex items-center justify-center text-climb-500 group-hover:bg-climb-500 group-hover:text-white transition-colors">
                      <span className="text-[10px]">✓</span>
                    </div>
                    <span className="text-neutral-300 group-hover:text-white transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-10 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Investimento</p>
                    <p className="text-3xl font-bold text-white">Sob Consulta</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Duração</p>
                    <p className="text-xl font-bold text-neutral-300">12 Meses</p>
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
