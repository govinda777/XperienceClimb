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
  { id: 'iniciante', label: 'Iniciantes', icon: '🧗', group: 'main' },
  { id: 'calendario', label: 'Calendário', icon: '📅', group: 'main' },
  { id: 'pacotes', label: 'Pacotes', icon: '💎', group: 'main' },

  // Services and features
  { id: 'programacao', label: 'Programação', icon: '⏰', group: 'services' },
  { id: 'timeline', label: 'O Dia', icon: '📅', group: 'services' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️', group: 'services' },

  // Content and community
  { id: 'galeria', label: 'Galeria', icon: '📸', group: 'content' },
  { id: 'comunidade', label: 'Comunidade', icon: '🤝', group: 'content' },

  // Location
  { id: 'localizacao', label: 'Local', icon: '📍', group: 'location' },
];

// Navigation groups for better organization
export const NAVIGATION_GROUPS = {
  main: { label: 'Principal', items: ['hero', 'sobre', 'iniciante', 'calendario', 'pacotes'] },
  services: { label: 'Serviços', items: ['programacao', 'timeline', 'seguranca'] },
  content: { label: 'Conteúdo', items: ['galeria', 'comunidade'] },
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
    disabled: true,
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
    disabled: true,
  },
  anual: {
    id: 'anual',
    name: 'Xperience Anual',
    price: 0,
    description: 'A jornada definitiva: uma saída a cada 2 meses para lugares surpreendentes.',
    features: [
      '🧗 6 Saídas exclusivas por ano',
      '🚐 Transporte ida e volta incluso',
      '🍽️ Almoço completo em cada destino',
      '🏔️ Roteiros variados e inéditos',
      '🛡️ Todo equipamento e instrução inclusos',
      '🤝 Comunidade exclusiva de aventureiros',
    ],
    bonus: ['🎁 Kit Xperience exclusivo'],
    shape: 'hexagon',
    color: 'climb-500',
    duration: '12 meses',
    maxParticipants: 12,
    isQuotation: true,
    popular: false,
    requiresExperience: false,
  },
};

// Base date from which all formats are derived - modify ONLY this one!
const BASE_TRIP_DATE = '2026-08-22'; // Format: YYYY-MM-DD

const [yearStr, monthStr, dayStr] = BASE_TRIP_DATE.split('-');
const year = parseInt(yearStr, 10);
const month = parseInt(monthStr, 10);
const day = parseInt(dayStr, 10);

export const MONTHS_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const monthIndex = month - 1;

// Dynamic available dates - derived from BASE_TRIP_DATE above
export const AVAILABLE_DATES = {
  // Data única disponível para escalada
  singleDate: `${dayStr}/${monthStr}/${yearStr}`,
  // Para compatibilidade com diferentes formatos
  singleDateISO: BASE_TRIP_DATE,
  singleDateDisplay: `${day} de ${MONTHS_PT[monthIndex]} de ${year}`,
} as const;

// Proximas datas para o calendário
export const NEXT_EVENTS = [
  {
    date: 'Agosto 2026',
    location: 'Pedra Bela',
    isSecret: true,
  },
  {
    date: 'Outubro 2026',
    location: 'Pedra Bela',
    isSecret: true,
  },
  {
    date: 'Dezembro 2026',
    location: 'A definir',
    isSecret: true,
  },
];
