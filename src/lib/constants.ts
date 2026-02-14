import { PackageType } from '@/types';

// Contact information
export const CONTACT_INFO = {
  address: 'Pedra Bela Vista, São Paulo - SP',
  distance: '119km de São Paulo',
  phone: '(11) 99541-3539',
  email: 'marcosishino@gmail.com',
  instagram: '@xperiencehubs',
};

// Navigation items for the site menu - grouped for better organization
export const NAVIGATION_ITEMS = [
  // Main sections
  { id: 'hero', label: 'Início', icon: '🏔️', group: 'main' },
  { id: 'sobre', label: 'Sobre', icon: '🌿', group: 'main' },
  { id: 'pacotes', label: 'Pacotes', icon: '💎', group: 'main' },
  
  // Services and features
  { id: 'servicos-inclusos', label: 'Incluso', icon: '🍎', group: 'services' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️', group: 'services' },
  { id: 'seguro', label: 'Seguro', icon: '📋', group: 'services' },
  
  // Content and community
  { id: 'galeria', label: 'Galeria', icon: '📸', group: 'content' },
  { id: 'comunidade', label: 'Comunidade', icon: '🤝', group: 'content' },
  { id: 'depoimentos', label: 'Depoimentos', icon: '⭐', group: 'content' },
  
  // Location
  { id: 'localizacao', label: 'Local', icon: '📍', group: 'location' },
];

// Navigation groups for better organization
export const NAVIGATION_GROUPS = {
  main: { label: 'Principal', items: ['hero', 'sobre', 'pacotes'] },
  services: { label: 'Serviços', items: ['servicos-inclusos', 'seguranca', 'seguro'] },
  content: { label: 'Conteúdo', items: ['galeria', 'comunidade', 'depoimentos'] },
  location: { label: 'Localização', items: ['localizacao'] },
};

// Dynamic packages - IDs and properties can be changed freely
export const PACKAGES: Record<string, PackageType> = {
  basico: {
    id: 'basico',
    name: 'Pacote AGARRÃO',
    price: 27700, // in cents
    originalPrice: 33000,
    description: 'Curta uma vivência de escalada na natureza.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamento de segurança',
      '👨‍🏫 Instrutor experiente',
      '📋 Seguro Aventura',
      '🍽️ Saboroso Almoço (restaurante à vontade)',
      '🌅 Pôr do Sol Mirante com café',
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'hexagon',
    color: 'climb-300',
    duration: '1 dia',
    maxParticipants: 8,
    popular: true,
    requiresExperience: false,
    minAge: 12,
    cancellationPolicy: '',
  },
  intermediario: {
    id: 'intermediario',
    name: 'Pacote CRUX',
    price: 44700, // in cents
    originalPrice: 51000,
    description: 'Aproveite seu dia de escalada e um descanso merecido.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamento de segurança',
      '👨‍🏫 Instrutor experiente',
      '📋 Seguro Aventura',
      '🛏️ Hospedagem',
      '🍽️ Saboroso Almoço (restaurante à vontade)',
      '🌅 Pôr do Sol Mirante com café',
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'triangle',
    color: 'orange-400',
    duration: '1 dia',
    maxParticipants: 6,
    popular: false,
    requiresExperience: false,
    minAge: 14,
    cancellationPolicy: '',
  },
  avancado: {
    id: 'avancado',
    name: 'Pacote ALMA VERTICAL',
    price: 66700, // in cents
    originalPrice: 75000,
    description: 'Seu fim de semana intenso de escalada e aventura.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamento de segurança',
      '👨‍🏫 Instrutor experiente',
      '📋 Seguro Aventura',
      '🛏️ Hospedagem + Café da manhã completo',
      '🍽️ Saboroso Almoço (restaurante à vontade)',
      '🌅 Pôr do Sol Mirante com café',
      '🧗 Mais um super dia extra de escalada',
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'circle',
    color: 'purple-500',
    duration: '2 dias',
    maxParticipants: 4,
    requiresExperience: true,
    minAge: 16,
    cancellationPolicy: '',
  },
};

// Dynamic available dates - can be easily modified
export const AVAILABLE_DATES = {
  // Data única disponível para escalada
  singleDate: '14/03/2026',
  // Para compatibilidade com diferentes formatos
  singleDateISO: '2026-03-14',
  singleDateDisplay: '14 de Março de 2026',
} as const;
