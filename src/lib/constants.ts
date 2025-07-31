import { PackageType } from '@/types';

export const PACKAGES: Record<string, PackageType> = {
  silver: {
    id: 'silver',
    name: 'Silver',
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
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    price: 50000,
    originalPrice: 60000,
    description: 'Pacote intermediário com café da manhã e aula técnica',
    features: [
      '✨ Tudo do pacote Silver',
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
  },
  premium: {
    id: 'premium',
    name: 'Premium',
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
  },
};

export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Início', icon: '🏔️' },
  { id: 'sobre', label: 'Sobre', icon: '🌿' },
  { id: 'pacotes', label: 'Pacotes', icon: '💎' },
  { id: 'galeria', label: 'Galeria', icon: '📸' },
  { id: 'seguranca', label: 'Segurança', icon: '🛡️' },
  { id: 'localizacao', label: 'Local', icon: '📍' },
  { id: 'depoimentos', label: 'Depoimentos', icon: '⭐' },
] as const;

export const CONTACT_INFO = {
  phone: '(15) 99999-9999',
  email: 'contact@xperienceclimb.com',
  instagram: '@xperienceclimb',
  address: 'Morro Araçoiaba - Floresta Nacional de Ipanema',
  distance: '120km de São Paulo',
} as const;

export const MERCADOPAGO_CONFIG = {
  public_key: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  webhook_secret: process.env.MERCADOPAGO_WEBHOOK_SECRET!,
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
  failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
  pending_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending`,
} as const;

export const PRIVY_CONFIG = {
  app_id: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  login_methods: ['email'] as const,
  theme: {
    accentColor: '#21808D',
    borderRadius: 'lg',
  },
} as const; 