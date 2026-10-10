'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  ClipboardCheck,
  HeartPulse,
  HardHat,
  Shield,
  Activity,
  Lock,
  Footprints,
  Sun,
  Droplets,
  Shirt,
  Sparkles,
  Check,
} from 'lucide-react';

interface SafetyItem {
  iconType: 'shield' | 'award' | 'protocol' | 'insurance';
  title: string;
  description: string;
  details: string[];
}

const safetyItems: SafetyItem[] = [
  {
    iconType: 'shield',
    title: 'Equipamentos Certificados',
    description: 'Todos os equipamentos seguem normas internacionais UIAA e CE',
    details: [
      'Cordas dinâmicas homologadas',
      'Capacetes de escalada certificados',
      'Baudriers e cadeirinhas testadas',
      'Mosquetões de segurança com trava',
      'Freios assistidos de última geração',
    ],
  },
  {
    iconType: 'award',
    title: 'Instrutores Qualificados',
    description: 'Equipe com certificação e vasta experiência de montanha',
    details: [
      'Certificação em Primeiros Socorros para Áreas Remotas',
      'Treinamento em Auto-resgate na Rocha',
      'Anos de vivência e condução técnica',
      'Reciclagem e treinamento contínuo',
    ],
  },
  {
    iconType: 'protocol',
    title: 'Protocolos Rigorosos',
    description: 'Procedimentos padronizados para mitigar riscos',
    details: [
      'Double-check obrigatório de nós e baudriers',
      'Briefing técnico antes de tocar a rocha',
      'Monitoramento meteorológico em tempo real',
      'Plano de emergência e evacuação mapeado',
    ],
  },
  {
    iconType: 'insurance',
    title: 'Seguro Aventura',
    description: 'Cobertura integral individual para todos os participantes',
    details: [
      'Cobertura ativa durante toda a vivência',
      'Válida em território nacional',
      'Despesas médico-hospitalares e odontológicas',
    ],
  },
];

const renderSafetyIcon = (type: SafetyItem['iconType']) => {
  switch (type) {
    case 'shield':
      return <ShieldCheck className="h-6 w-6 text-climb-600" strokeWidth={1.5} />;
    case 'award':
      return <Award className="h-6 w-6 text-orange-600" strokeWidth={1.5} />;
    case 'protocol':
      return <ClipboardCheck className="h-6 w-6 text-climb-700" strokeWidth={1.5} />;
    case 'insurance':
      return <HeartPulse className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />;
  }
};

interface Equipment {
  name: string;
  required: boolean;
  provided: boolean;
  iconName: string;
}

const equipmentList: Equipment[] = [
  { name: 'Capacete homologado', required: true, provided: true, iconName: 'helmet' },
  { name: 'Cadeirinha / Baudrier', required: true, provided: true, iconName: 'harness' },
  { name: 'Corda dinâmica certificada', required: true, provided: true, iconName: 'rope' },
  { name: 'Mosquetões e Freios', required: true, provided: true, iconName: 'carabiner' },
  { name: 'Sapatilha de escalada', required: true, provided: true, iconName: 'shoes' },
  { name: 'Roupa esportiva confortável', required: true, provided: false, iconName: 'clothes' },
  { name: 'Protetor solar e repelente', required: false, provided: false, iconName: 'sun' },
  { name: 'Água (mínimo 1,5L por pessoa)', required: false, provided: false, iconName: 'water' },
  { name: 'Boné ou chapéu', required: false, provided: false, iconName: 'cap' },
  { name: 'Lanches leves e barras', required: false, provided: false, iconName: 'snack' },
];

const renderEquipmentIcon = (iconName: string) => {
  switch (iconName) {
    case 'helmet':
      return <HardHat className="h-4 w-4" strokeWidth={1.5} />;
    case 'harness':
      return <Shield className="h-4 w-4" strokeWidth={1.5} />;
    case 'rope':
      return <Activity className="h-4 w-4" strokeWidth={1.5} />;
    case 'carabiner':
      return <Lock className="h-4 w-4" strokeWidth={1.5} />;
    case 'shoes':
      return <Footprints className="h-4 w-4" strokeWidth={1.5} />;
    case 'clothes':
      return <Shirt className="h-4 w-4" strokeWidth={1.5} />;
    case 'sun':
      return <Sun className="h-4 w-4" strokeWidth={1.5} />;
    case 'water':
      return <Droplets className="h-4 w-4" strokeWidth={1.5} />;
    default:
      return <Sparkles className="h-4 w-4" strokeWidth={1.5} />;
  }
};

export function SafetySection() {
  const mandatoryEquipment = equipmentList.filter(item => item.required);
  const optionalEquipment = equipmentList.filter(item => !item.required);

  return (
    <section id="seguranca" className="bg-stone-50 py-24 text-stone-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/60 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-stone-700">
            <ShieldCheck className="h-3.5 w-3.5 text-stone-600" strokeWidth={1.5} />
            <span>NORMAS & SEGURANÇA</span>
          </div>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
            Segurança em Primeiro Lugar
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            A escalada em rocha é uma prática estruturada sobre redundância de ancoragens,
            equipamentos homologados e conduta técnica rigorosa.
          </p>
        </div>

        {/* Safety Pillars (4 Cards) */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {safetyItems.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 shadow-inner">
                  {renderSafetyIcon(item.iconType)}
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-stone-900">
                  {item.title}
                </h3>
                <p className="mb-5 text-xs text-stone-500 leading-relaxed">{item.description}</p>
              </div>

              <ul className="space-y-2 border-t border-stone-100 pt-4">
                {item.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-2 text-xs text-stone-700 leading-snug"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2}
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Equipment Checklist (Mandatory vs Recommended) */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Equipamentos da Vivência */}
          <div className="rounded-3xl border border-stone-200/80 bg-white p-7 md:p-8 shadow-sm">
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-700">
                CHECKLIST OBRIGATÓRIO
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
                Equipamentos para a Vivência
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Todo o material de segurança é homologado e fornecido pela equipe técnica.
              </p>
            </div>

            <div className="space-y-3">
              {mandatoryEquipment.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-colors ${
                    item.provided
                      ? 'border-emerald-200/70 bg-emerald-50/40'
                      : 'border-orange-200/70 bg-orange-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                        item.provided
                          ? 'border-emerald-200 bg-white text-emerald-700'
                          : 'border-orange-200 bg-white text-orange-700'
                      }`}
                    >
                      {renderEquipmentIcon(item.iconName)}
                    </div>
                    <span className="text-sm font-semibold text-stone-900">{item.name}</span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                      item.provided
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-orange-600 text-white shadow-sm'
                    }`}
                  >
                    {item.provided ? 'Fornecido' : 'Trazer'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Itens Pessoais Recomendados */}
          <div className="rounded-3xl border border-stone-200/80 bg-white p-7 md:p-8 shadow-sm">
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500">
                CONFORTO & PREVENÇÃO
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
                Itens Recomendados
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Itens recomendados para o seu maior conforto durante a permanência no setor.
              </p>
            </div>

            <div className="space-y-3">
              {optionalEquipment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-50/50 p-4 transition-colors hover:bg-stone-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600">
                      {renderEquipmentIcon(item.iconName)}
                    </div>
                    <span className="text-sm font-medium text-stone-800">{item.name}</span>
                  </div>

                  <span className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    Opcional
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
