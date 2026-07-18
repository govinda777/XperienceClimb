'use client';

import React from 'react';

interface SafetyItem {
  icon: string;
  title: string;
  description: string;
  details: string[];
}

interface SafetySectionProps {
  cmsData?: {
    title?: string;
    description?: string;
    safetyItems?: Array<{
      icon: string;
      title: string;
      description: string;
      details?: string[];
    }>;
    equipmentList?: Array<{
      name: string;
      required: boolean;
      provided: boolean;
    }>;
  };
}

const defaultSafetyItems: SafetyItem[] = [
  {
    icon: '🛡️',
    title: 'Equipamentos Certificados',
    description: 'Todos os equipamentos seguem normas internacionais de segurança',
    details: [
      'Cordas dinâmicas CE/UIAA',
      'Capacetes homologados',
      'Cadeirinhas certificadas',
      'Mosquetões de segurança',
      'Freios automáticos',
    ],
  },
  {
    icon: '👨',
    title: 'Instrutores Qualificados',
    description: 'Equipe com certificação nacional e internacional',
    details: [
      'Curso de Primeiros Socorros',
      'Treinamento em Resgate',
      'Experiência comprovada',
      'Atualização constante',
    ],
  },
  {
    icon: '📋',
    title: 'Protocolos Rigorosos',
    description: 'Procedimentos padronizados para máxima segurança',
    details: [
      'Check duplo de equipamentos',
      'Briefing obrigatório',
      'Avaliação das condições climáticas',
      'Plano de emergência ativo',
    ],
  },
  {
    icon: '🏥',
    title: 'Seguro Aventura',
    description: 'Você, protegido em suas aventuras',
    details: [
      'Cobertura em Caso de Acidentes',
      'Válida em todo o território nacional.',
      'Reembolso com despesas médico, hospitalares e odontológicas',
    ],
  },
];

const defaultEquipmentList = [
  { name: 'Capacete', required: true, provided: true },
  { name: 'Cadeirinha', required: true, provided: true },
  { name: 'Corda dinâmica', required: true, provided: true },
  { name: 'Mosquetões', required: true, provided: true },
  { name: 'Freio', required: true, provided: true },
  { name: 'Sapatilha de escalada', required: true, provided: true },
  { name: 'Roupa esportiva', required: false, provided: false },
  { name: 'Protetor solar', required: false, provided: false },
  { name: 'Água (1,5L mínimo)', required: false, provided: false },
  { name: 'Chapéu e boné', required: false, provided: false },
  { name: 'Sleck beliscos', required: false, provided: false },
];

export function SafetySection({ cmsData }: SafetySectionProps) {
  const title = cmsData?.title || "Segurança em Primeiro Lugar";
  const description = cmsData?.description || "Nossa prioridade máxima é garantir que você tenha uma experiência segura e inesquecível. Conheça nossos produtos e equipamentos.";

  const itemsToRender: SafetyItem[] = cmsData?.safetyItems
    ? cmsData.safetyItems.map(item => ({
        icon: item.icon || '🛡️',
        title: item.title,
        description: item.description,
        details: item.details || []
      }))
    : defaultSafetyItems;

  const equipmentToRender = cmsData?.equipmentList || defaultEquipmentList;

  return (
    <section id="seguranca" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-700">
            {description}
          </p>
        </div>

        {/* Safety Features */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {itemsToRender.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-neutral-50 p-6 transition-all duration-300 hover:bg-climb-50 hover:shadow-lg"
            >
              <div className="mb-4 text-center">
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-climb-600">{item.title}</h3>
                <p className="text-sm text-neutral-700">{item.description}</p>
              </div>

              <ul className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                    <span className="mt-1 text-green-500">✓</span>
                    <span className="text-neutral-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Equipment Checklist */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Equipamentos Obrigatórios */}
          <div>
            <h3 className="mb-8 text-3xl font-bold text-climb-600">
              equipamentos para a sua aventura
            </h3>
            <p className="mb-6 text-neutral-600">
              Itens que você deve trazer para participar da atividade
            </p>

            <div className="space-y-4">
              {equipmentToRender
                .filter(item => item.required)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg border-2 p-4 ${
                      item.provided
                        ? 'border-green-200 bg-green-50'
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-lg ${
                          item.provided ? 'text-green-500' : 'text-orange-500'
                        }`}
                      >
                        {item.provided ? '✅' : '📋'}
                      </span>
                      <span className="font-medium text-neutral-800">{item.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.provided && (
                        <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                          Fornecido
                        </span>
                      )}
                      {!item.provided && (
                        <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                          Você traz
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Equipamentos Opcionais */}
          <div>
            <h3 className="mb-8 text-3xl font-bold text-climb-600">itens recomendados</h3>
            <p className="mb-6 text-neutral-600">Itens recomendados para maior conforto</p>

            <div className="space-y-4">
              {equipmentToRender
                .filter(item => !item.required)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border-2 border-neutral-200 bg-neutral-50 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg text-neutral-500">💡</span>
                      <span className="font-medium text-neutral-800">{item.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-neutral-400 px-2 py-1 text-xs text-white">
                        Opcional
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
