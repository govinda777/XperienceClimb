'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { COMMUNITY_DATA } from '@/lib/community-data';
import { 
  Partner, 
  CertifiedInstructor, 
  SafetyProcedure, 
  VisitedLocation 
} from '@/core/entities/Community';

type CommunityTab = 'partners' | 'instructors' | 'safety' | 'locations';

interface CommunityTabConfig {
  id: CommunityTab;
  label: string;
  icon: string;
  description: string;
}

const COMMUNITY_TABS: CommunityTabConfig[] = [
  {
    id: 'partners',
    label: 'Parceiros',
    icon: '🤝',
    description: 'Empresas e organizações que apoiam a XperienceClimb'
  },
  {
    id: 'instructors',
    label: 'Instrutores',
    icon: '👨‍🏫',
    description: 'Profissionais certificados e experientes'
  },
  {
    id: 'safety',
    label: 'Segurança',
    icon: '🛡️',
    description: 'Procedimentos e protocolos de segurança'
  },
  {
    id: 'locations',
    label: 'Locais',
    icon: '📍',
    description: 'Destinos já visitados pela nossa comunidade'
  }
];

export function CommunitySection() {
  const [activeTab, setActiveTab] = useState<CommunityTab>('partners');

  return (
    <section id="comunidade" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossa <span className="text-climb-600">Comunidade</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os parceiros, instrutores, procedimentos de segurança e locais que fazem parte 
            da família XperienceClimb. Juntos, construímos experiências seguras e inesquecíveis.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-climb-600 mb-2">
              {COMMUNITY_DATA.statistics.totalPartners}
            </div>
            <div className="text-gray-600">Parceiros</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-climb-600 mb-2">
              {COMMUNITY_DATA.statistics.totalInstructors}
            </div>
            <div className="text-gray-600">Instrutores</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-climb-600 mb-2">
              {COMMUNITY_DATA.statistics.totalProcedures}
            </div>
            <div className="text-gray-600">Procedimentos</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-climb-600 mb-2">
              {COMMUNITY_DATA.statistics.totalLocations}
            </div>
            <div className="text-gray-600">Locais</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {COMMUNITY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-3 px-6 py-4 rounded-full transition-all duration-300",
                "hover:scale-105 active:scale-95",
                activeTab === tab.id
                  ? "bg-climb-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-climb-50 shadow-sm"
              )}
            >
              <span className="text-2xl">{tab.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-75 hidden sm:block">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'partners' && <PartnersContent />}
          {activeTab === 'instructors' && <InstructorsContent />}
          {activeTab === 'safety' && <SafetyContent />}
          {activeTab === 'locations' && <LocationsContent />}
        </div>
      </div>
    </section>
  );
}

// Partners Content Component
function PartnersContent() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        🤝 Nossos Parceiros
      </h3>
      <p className="text-gray-600 mb-8">
        Trabalhamos com empresas e organizações comprometidas com a qualidade e segurança na escalada.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMUNITY_DATA.partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const categoryLabels = {
    equipment: 'Equipamentos',
    accommodation: 'Hospedagem',
    transport: 'Transporte',
    food: 'Alimentação',
    insurance: 'Seguros',
    training: 'Treinamento',
    retail: 'Varejo',
    media: 'Mídia',
    other: 'Outros'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-16 h-16 rounded-lg object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-partner.jpg';
          }}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
          <span className="inline-block px-2 py-1 bg-climb-100 text-climb-700 text-xs rounded-full">
            {categoryLabels[partner.category]}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-500">
          <span className="mr-2">📍</span>
          {partner.location.city}, {partner.location.state}
        </div>
        
        {partner.contact.phone && (
          <div className="flex items-center text-gray-500">
            <span className="mr-2">📞</span>
            {partner.contact.phone}
          </div>
        )}
        
        {partner.contact.instagram && (
          <div className="flex items-center text-gray-500">
            <span className="mr-2">📱</span>
            {partner.contact.instagram}
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Serviços:</div>
        <div className="flex flex-wrap gap-1">
          {partner.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
            >
              {service}
            </span>
          ))}
          {partner.services.length > 3 && (
            <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
              +{partner.services.length - 3} mais
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Instructors Content Component
function InstructorsContent() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        👨‍🏫 Instrutores Certificados
      </h3>
      <p className="text-gray-600 mb-8">
        Nossa equipe de instrutores é formada por profissionais experientes e certificados, 
        comprometidos com sua segurança e aprendizado.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {COMMUNITY_DATA.instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: CertifiedInstructor }) {
  const specialtyLabels = {
    sport_climbing: 'Escalada Esportiva',
    traditional_climbing: 'Escalada Tradicional',
    bouldering: 'Boulder',
    multi_pitch: 'Via Longa',
    rescue: 'Resgate',
    kids_climbing: 'Escalada Infantil',
    adaptive_climbing: 'Escalada Adaptada',
    competition: 'Competição',
    via_ferrata: 'Via Ferrata'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={instructor.photo}
          alt={instructor.name}
          className="w-20 h-20 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-instructor.jpg';
          }}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{instructor.name}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <span>⭐ {instructor.rating.average}/5</span>
            <span>📍 {instructor.location.city}, {instructor.location.state}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>🏔️ {instructor.experience.yearsActive} anos</span>
            <span>👥 {instructor.experience.totalClients} clientes</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{instructor.bio}</p>
      
      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Especialidades:</div>
          <div className="flex flex-wrap gap-1">
            {instructor.specialties.map((specialty) => (
              <span
                key={specialty}
                className="inline-block px-2 py-1 bg-climb-100 text-climb-700 text-xs rounded"
              >
                {specialtyLabels[specialty]}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Certificações:</div>
          <div className="space-y-1">
            {instructor.certifications.slice(0, 2).map((cert) => (
              <div key={cert.id} className="text-xs text-gray-600">
                • {cert.name} - {cert.organization}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Faixa de preço: R$ {(instructor.availability.priceRange.min / 100).toFixed(0)} - 
            R$ {(instructor.availability.priceRange.max / 100).toFixed(0)}
          </div>
          <div className="flex space-x-2">
            {instructor.contact.whatsapp && (
              <button className="text-green-600 hover:text-green-700">
                <span className="text-lg">💬</span>
              </button>
            )}
            {instructor.contact.instagram && (
              <button className="text-pink-600 hover:text-pink-700">
                <span className="text-lg">📱</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Safety Content Component
function SafetyContent() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        🛡️ Procedimentos de Segurança
      </h3>
      <p className="text-gray-600 mb-8">
        A segurança é nossa prioridade máxima. Seguimos protocolos rigorosos e atualizados 
        para garantir experiências seguras para todos os participantes.
      </p>
      
      <div className="space-y-6">
        {COMMUNITY_DATA.safetyProcedures.map((procedure) => (
          <SafetyProcedureCard key={procedure.id} procedure={procedure} />
        ))}
      </div>
    </div>
  );
}

function SafetyProcedureCard({ procedure }: { procedure: SafetyProcedure }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const priorityLabels = {
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Médio',
    low: 'Baixo'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-lg mb-2">{procedure.title}</h4>
          <div className="flex items-center space-x-3 mb-2">
            <span className={cn(
              "px-2 py-1 text-xs rounded-full",
              priorityColors[procedure.priority]
            )}>
              {priorityLabels[procedure.priority]}
            </span>
            <span className="text-xs text-gray-500">
              Versão {procedure.version} • Atualizado em {procedure.lastUpdated.toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-climb-600 hover:text-climb-700 ml-4"
        >
          <span className={cn(
            "transform transition-transform text-xl",
            isExpanded ? "rotate-180" : ""
          )}>
            ▼
          </span>
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{procedure.description}</p>
      
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Passos do Procedimento:</h5>
            <div className="space-y-2">
              {procedure.steps.map((step) => (
                <div key={step.order} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-climb-500 text-white text-xs rounded-full flex items-center justify-center">
                    {step.order}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-600">{step.description}</div>
                    {step.timeRequired && (
                      <div className="text-xs text-gray-500 mt-1">
                        ⏱️ {step.timeRequired} minutos
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {procedure.warnings.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">⚠️ Avisos Importantes:</h5>
              <ul className="space-y-1">
                {procedure.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-red-600">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h5 className="font-medium text-gray-900 mb-2">📞 Contatos de Emergência:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {procedure.emergencyContacts.map((contact, index) => (
                <div key={index} className="text-sm bg-white p-2 rounded">
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-gray-600">{contact.role}</div>
                  <div className="text-climb-600">{contact.phone}</div>
                  {contact.isAvailable24h && (
                    <div className="text-xs text-green-600">24h disponível</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Locations Content Component
function LocationsContent() {
  const locationsByState = COMMUNITY_DATA.visitedLocations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, VisitedLocation[]>);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        📍 Locais Visitados
      </h3>
      <p className="text-gray-600 mb-8">
        Explore os destinos incríveis que já fizeram parte das nossas aventuras. 
        Cada local foi cuidadosamente selecionado e testado pela nossa equipe.
      </p>
      
      {Object.entries(locationsByState).map(([state, locations]) => (
        <div key={state} className="mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            {state} ({locations.length} {locations.length === 1 ? 'local' : 'locais'})
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationCard({ location }: { location: VisitedLocation }) {
  const difficultyLabels = {
    easy: 'Fácil',
    moderate: 'Moderado',
    difficult: 'Difícil',
    extreme: 'Extremo'
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    difficult: 'bg-orange-100 text-orange-800',
    extreme: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden">
      {location.images.length > 0 && (
        <img
          src={location.images[0].url}
          alt={location.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-location.jpg';
          }}
        />
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h5 className="font-semibold text-gray-900 text-lg mb-1">{location.name}</h5>
            <div className="text-sm text-gray-500">
              📍 {location.city}, {location.state}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  "text-lg",
                  i < location.popularity ? "text-yellow-400" : "text-gray-300"
                )}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{location.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Acesso:</span>
            <span className={cn(
              "px-2 py-1 text-xs rounded-full",
              difficultyColors[location.access.difficulty]
            )}>
              {difficultyLabels[location.access.difficulty]}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Dificuldade das vias:</span>
            <span className="text-gray-700">
              {location.difficulty.min} - {location.difficulty.max}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Última visita:</span>
            <span className="text-gray-700">
              {location.lastVisited.toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Visitas realizadas:</span>
            <span className="text-climb-600 font-medium">
              {location.visitCount}
            </span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Principais vias:</div>
          <div className="space-y-1">
            {location.routes.slice(0, 3).map((route, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{route.name}</span>
                <span className="text-climb-600 font-mono text-xs">{route.grade}</span>
              </div>
            ))}
            {location.routes.length > 3 && (
              <div className="text-xs text-gray-500">
                +{location.routes.length - 3} vias adicionais
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
