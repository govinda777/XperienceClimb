'use client';

import React from 'react';
import { Button } from '@/components/ui';

interface SafetyItem {
  icon: string;
  title: string;
  description: string;
  details: string[];
}

const safetyItems: SafetyItem[] = [
  {
    icon: '🛡️',
    title: 'Equipamentos Certificados',
    description: 'Todos os equipamentos seguem normas internacionais de segurança',
    details: [
      'Cordas dinâmicas CE/UIAA',
      'Capacetes homologados',
      'Cadeirinhas certificadas',
      'Mosquetões de segurança',
      'Freios automáticos'
    ]
  },
  {
    icon: '👨‍🏫',
    title: 'Instrutores Qualificados',
    description: 'Equipe com certificação nacional e internacional',
    details: [
      'Curso de Primeiros Socorros',
      'Treinamento em Resgate',
      'Experiência comprovada',
      'Atualização constante'
    ]
  },
  {
    icon: '📋',
    title: 'Protocolos Rigorosos',
    description: 'Procedimentos padronizados para máxima segurança',
    details: [
      'Check duplo de equipamentos',
      'Briefing obrigatório',
      'Avaliação das condições climáticas',
      'Plano de emergência ativo'
    ]
  },
  {
    icon: '🏥',
    title: 'Seguro Aventura',
    description: 'Você, protegido em suas aventuras',
    details: [
      'Cobertura em Caso de Acidentes',
      'Válida em todo o território nacional.',
      'Reembolso com despesas médico, hospitalares e odontológicas',
    ]
  }
];

const equipmentList = [
  { name: 'Capacete', required: true, provided: true },
  { name: 'Cadeirinha', required: true, provided: true },
  { name: 'Corda dinâmica', required: true, provided: true },
  { name: 'Mosquetões', required: true, provided: true },
  { name: 'Freio', required: true, provided: true },
  { name: 'Sapatilha de escalada', required: true, provided: false },
  { name: 'Roupa confortável', required: true, provided: false },
  { name: 'Protetor solar', required: true, provided: false },
  { name: 'Água (1,5L mínimo)', required: true, provided: false }
];

export function SafetySection() {
  return (
    <section id="seguranca" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            Segurança em Primeiro Lugar
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Nossa prioridade máxima é garantir que você tenha uma experiência 
            segura e inesquecível. Conheça nossos protocolos e equipamentos.
          </p>
        </div>

        {/* Safety Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {safetyItems.map((item, index) => (
            <div
              key={index}
              className="group bg-neutral-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:bg-climb-50"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-climb-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-700 text-sm">
                  {item.description}
                </p>
              </div>

              <ul className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-neutral-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Equipment Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-bold text-climb-600 mb-8">
              Lista de Equipamentos
            </h3>
            
            <div className="space-y-4">
              {equipmentList.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    item.provided 
                      ? 'border-green-200 bg-green-50' 
                      : item.required 
                        ? 'border-orange-200 bg-orange-50'
                        : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg ${
                      item.provided ? 'text-green-500' : 
                      item.required ? 'text-orange-500' : 'text-neutral-500'
                    }`}>
                      {item.provided ? '✅' : item.required ? '📋' : '💡'}
                    </span>
                    <span className="font-medium text-neutral-800">
                      {item.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.provided && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        Fornecido
                      </span>
                    )}
                    {item.required && !item.provided && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                        Obrigatório
                      </span>
                    )}
                    {!item.required && (
                      <span className="text-xs bg-neutral-400 text-white px-2 py-1 rounded-full">
                        Opcional
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Certifications */}
          {/* <div>
            <h3 className="text-3xl font-bold text-climb-600 mb-8">
              Certificações e Seguros
            </h3>

            <div className="space-y-6">
              <div className="bg-climb-500 text-white p-6 rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Autorização ICMBio</h4>
                    <p className="text-climb-100 text-sm">Operação turística autorizada</p>
                  </div>
                </div>
                <p className="text-climb-100">
                  Empresa credenciada pelo Instituto Chico Mendes para operação 
                  turística na Floresta Nacional de Ipanema.
                </p>
              </div>

              <div className="bg-orange-400 text-white p-6 rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">ABETA</h4>
                    <p className="text-orange-100 text-sm">Associação Brasileira de Ecoturismo</p>
                  </div>
                </div>
                <p className="text-orange-100">
                  Certificação em turismo de aventura e práticas sustentáveis 
                  de operação em ambientes naturais.
                </p>
              </div>

              <div className="bg-green-500 text-white p-6 rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Seguro de Acidentes</h4>
                    <p className="text-green-100 text-sm">Cobertura total incluída</p>
                  </div>
                </div>
                <p className="text-green-100">
                  Todos os participantes são automaticamente cobertos por 
                  seguro de acidentes pessoais durante a atividade.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="border-climb-500 text-climb-600">
                📄 Ver Certificados Completos
              </Button>
            </div>
          </div> */}
        </div>

      </div>
    </section>
  );
}