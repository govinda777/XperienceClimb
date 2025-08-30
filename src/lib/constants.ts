import { PackageType } from '@/types';

// Contact information
export const CONTACT_INFO = {
  address: 'Floresta Nacional de Ipanema',
  distance: '120km de São Paulo',
  phone: '(11) 99541-3539',
  email: 'marcosishino@gmail.com',
  instagram: '@xperiencehubs',
};

// Navigation items for the site menu
export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Início', icon: '🏔️' },
  { id: 'sobre', label: 'Sobre', icon: '🌿' },
  { id: 'pacotes', label: 'Pacotes', icon: '💎' },
  { id: 'galeria', label: 'Galeria', icon: '📸' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️' },
  { id: 'comunidade', label: 'Comunidade', icon: '🤝' },
  { id: 'localizacao', label: 'Local', icon: '📍' },
  { id: 'depoimentos', label: 'Depoimentos', icon: '⭐' },
];

// Dynamic packages - IDs and properties can be changed freely
export const PACKAGES: Record<string, PackageType> = {
  basico: {
    id: 'basico',
    name: 'Pacote AGARRÃO',
    price: 19900, // in cents
    originalPrice: 25000,
    description: 'Curta uma vivência de escalada na natureza.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamentos de segurança',
      '👨‍🏫 Instrutor experiente',
      '🍎 Lanche de trilha',
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'hexagon',
    color: 'climb-300',
    duration: '1 dia',
    maxParticipants: 8,
    popular: true, // Now the only available package, should be popular
    requiresExperience: false,
    minAge: 12,
    cancellationPolicy: '',
  },
  intermediario: {
    id: 'intermediario',
    name: 'Pacote CRUX',
    price: 29900,
    originalPrice: 37000,
    description: 'Aproveite seu dia de escalada e um descanso merecido.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamentos de segurança',
      '👨‍🏫 Instrutor experiente',
      '🍎 Lanche de trilha',
      '🛏️ Hospedagem em AirBnB',
      '☕ Café da manhã do escalador', // Nutricionista boulder
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'triangle',
    color: 'orange-400',
    duration: '1 dia',
    maxParticipants: 6,
    popular: false, // Disabled packages shouldn't be popular
    requiresExperience: false,
    minAge: 14,
    cancellationPolicy: '',
    disabled: true,
  },
  avancado: {
    id: 'avancado',
    name: 'Pacote ALMA VERTICAL',
    price: 43500,
    originalPrice: 55000,
    description: 'Seu fim de semana intenso de escalada e aventura.',
    features: [
      '🧗 Escalada em rocha natural',
      '🛡️ Equipamentos de segurança',
      '👨‍🏫 Instrutor experiente',
      '🍎 Lanche de trilha',
      '🛏️ Hospedagem em AirBnB',
      '☕ Café da manhã do escalador', // Nutricionista boulder
      '🧗 Mais um super dia extra de escalada',
    ],
    bonus: ['💡 Coach de vida'],
    shape: 'circle',
    color: 'purple-500',
    duration: '2 dias',
    maxParticipants: 4,
    requiresExperience: true, // This package requires experience
    minAge: 16,
    cancellationPolicy: '',
    disabled: true,
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
