'use client';

import React from 'react';

interface IncludedServicesSectionProps {
  cmsData?: {
    title?: string;
    description?: string;
    services?: Array<{
      title: string;
      description?: string;
      iconKey?: string;
      condition?: string;
    }>;
  };
}

const defaultIncludedServices = [
  {
    icon: '🥪',
    title: 'Lanche de Trilha',
    description: 'Lanche completo e nutritivo preparado especialmente para suas aventuras na natureza',
    details: 'Sanduíches naturais, frutas e snacks energéticos'
  },
  {
    icon: '☕',
    title: 'Café da Manhã',
    description: 'Café fresco e quentinho para começar o dia com energia',
    details: 'Café coado, chás e acompanhamentos'
  },
  {
    icon: '💧',
    title: 'Água Mineral',
    description: 'Hidratação garantida durante toda a sua aventura',
    details: 'Água mineral em garrafas reutilizáveis'
  }
];

export function IncludedServicesSection({ cmsData }: IncludedServicesSectionProps) {
  const title = cmsData?.title ?? "Tudo Incluso nas Nossas Aventuras";
  const description = cmsData?.description ?? "Todas as nossas experiências de escalada incluem alimentação completa e hidratação para garantir que você tenha energia suficiente para aproveitar ao máximo sua aventura.";

  const servicesToRender = cmsData?.services
    ? cmsData.services.map(s => ({
        icon: s.iconKey ?? '🧗',
        title: s.title,
        description: s.description ?? '',
        details: s.condition ?? 'Incluso na experiência'
      }))
    : defaultIncludedServices;

  return (
    <section id="servicos-inclusos" className="bg-gradient-to-br from-orange-50 to-climb-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-700">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesToRender.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-climb-100/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Service Icon */}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-climb-500 text-3xl text-white shadow-lg">
                {service.icon}
              </div>

              {/* Service Content */}
              <div className="relative">
                <h3 className="mb-3 text-xl font-bold text-climb-600">
                  {service.title}
                </h3>
                <p className="mb-4 text-neutral-700">
                  {service.description}
                </p>
                <div className="rounded-lg bg-orange-50 p-4">
                  <p className="text-sm font-medium text-orange-700">
                    {service.details}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-orange-200 opacity-20"></div>
            </div>
          ))}
        </div>

        {/* Additional Info Box */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-climb-600">
                🎯 Nossa Promessa
              </h3>
              <p className="text-lg text-neutral-700">
                Queremos que você se concentre apenas em aproveitar a experiência de escalada. 
                Por isso, cuidamos de todos os detalhes da alimentação e hidratação, garantindo 
                que você tenha tudo o que precisa para uma aventura segura e energizante.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✓
                </div>
                <span className="text-neutral-700">Alimentação balanceada e nutritiva</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✓
                </div>
                <span className="text-neutral-700">Hidratação adequada durante toda a atividade</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✓
                </div>
                <span className="text-neutral-700">Produtos de qualidade e frescos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
