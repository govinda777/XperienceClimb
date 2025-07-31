import { PackageType } from '@/types';

// Contact information
export const CONTACT_INFO = {
  address: 'Floresta Nacional de Ipanema',
  distance: '120km de São Paulo',
  phone: '(11) 99999-9999',
  email: 'contato@xperienceclimb.com',
  instagram: '@xperienceclimb'
};

// Navigation items for the site menu
export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Início', icon: '🏔️' },
  { id: 'sobre', label: 'Sobre', icon: '🌿' },
  { id: 'pacotes', label: 'Pacotes', icon: '💎' },
  { id: 'galeria', label: 'Galeria', icon: '📸' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️' },
  { id: 'localizacao', label: 'Local', icon: '📍' },
  { id: 'depoimentos', label: 'Depoimentos', icon: '⭐' },
];

// Dynamic packages - IDs and properties can be changed freely
export const PACKAGES: Record<string, PackageType> = {
  basico: {
    id: 'basico',
    name: 'Básico',
    price: 30000, // in cents
    originalPrice: 35000,
    description: 'Experiência básica com escalada e equipamentos',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamentos de segurança',
      '👨‍🏫 Instrutor experiente',
      '📋 Certificado de participação',
    ],
    shape: 'hexagon',
    color: 'climb-300',
    duration: '1 dia',
    maxParticipants: 8,
    requiresExperience: false,
    minAge: 12,
    cancellationPolicy: 'Cancelamento gratuito até 24h antes da atividade'
  },
  intermediario: {
    id: 'intermediario',
    name: 'Intermediário',
    price: 50000,
    originalPrice: 60000,
    description: 'Pacote intermediário com café da manhã e aula técnica',
    features: [
      '✨ Tudo do pacote Básico',
      '☕ Café da manhã incluso',
      '🎓 Aula de técnicas avançadas',
      '📈 Planejamento de treinos',
      '🏆 Kit exclusivo',
    ],
    shape: 'triangle',
    color: 'orange-400',
    duration: '1 dia',
    maxParticipants: 6,
    popular: true,
    requiresExperience: false,
    minAge: 14,
    cancellationPolicy: 'Cancelamento gratuito até 48h antes da atividade'
  },
  avancado: {
    id: 'avancado',
    name: 'Avançado',
    price: 80000,
    originalPrice: 95000,
    description: 'Experiência completa com hospedagem e acompanhamento personalizado',
    features: [
      '🌟 Tudo dos pacotes anteriores',
      '🏨 Hospedagem inclusa',
      '👨‍🏫 Instrutor pessoal',
      '📸 Sessão de fotos profissional',
      '🎁 Kit premium exclusivo',
      '🚗 Transporte incluso',
    ],
    shape: 'circle',
    color: 'purple-500',
    duration: '2 dias',
    maxParticipants: 4,
    requiresExperience: true, // This package requires experience
    minAge: 16,
    cancellationPolicy: 'Cancelamento com 50% de reembolso até 72h antes'
  },
};

// Dynamic available dates - can be easily modified
export const AVAILABLE_DATES = {
  // Data única disponível para escalada
  singleDate: '16/08/2025',
  // Para compatibilidade com diferentes formatos
  singleDateISO: '2025-08-16',
  singleDateDisplay: '16 de Agosto de 2025',
} as const;