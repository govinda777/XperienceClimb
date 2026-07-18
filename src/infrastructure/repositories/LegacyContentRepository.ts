import { Package } from '@/core/entities/Package';
import {
  ActiveSiteContent,
  DestinationContent,
  HomePageContent,
  IContentRepository,
  TestimonialContent,
  ServiceContent,
  SafetyProcedureContent,
  VisitedLocationContent
} from '@/core/repositories/IContentRepository';

const mockActiveDestination: DestinationContent = {
  id: 'pedra-bela',
  name: 'Pedra Bela Vista',
  isPublished: true,
  eventStatus: 'active',
  visualConfig: {
    primaryColor: '#e04a1d',
    primaryColorHover: '#c83b12',
    primaryColorActive: '#b0310d',
    accentColor: '#f37021',
    backgroundColor: '#0a0503',
    surfaceColor: '#170e0b',
    textColor: '#f1e6e3',
    textSecondaryColor: '#c5b0ab',
    borderColor: '#301d18',
    gradientFrom: '#521f10',
    gradientTo: '#e04a1d',
    heroOverlay: 'rgba(10, 5, 3, 0.7)',
    cardBackground: '#1d120e'
  },
  locationDetails: {
    displayName: 'Parque Pedra Bela Vista',
    address: 'Estrada Municipal da Pedra Bela Vista, s/n',
    city: 'Socorro',
    state: 'São Paulo',
    distance: '135 km',
    coordinates: { lat: -22.5901, lng: -46.5123 },
    mapsUrl: 'https://maps.google.com/?q=-22.5901,-46.5123',
    directions: [
      { title: 'Passo 1', description: 'Siga pela Rodovia Fernão Dias até Bragança Paulista.' },
      { title: 'Passo 2', description: 'Pegue a Rodovia Capitão Bardoíno sentido Socorro.' },
      { title: 'Passo 3', description: 'Em Socorro, siga as placas para o Parque Pedra Bela Vista.' }
    ]
  },
  content: {
    hero: {
      title: 'Pedra Bela Vista',
      subtitle: 'Aventura vertical e pôr do sol inesquecível em Socorro/SP.',
      description: 'Prepare-se para o maior rapel do estado de São Paulo, cercado pela natureza exuberante da Serra da Mantiqueira.',
      backgroundImage: '/images/destinations/pedra-bela-hero.jpg',
      ctaLabel: 'Ver Pacotes',
      ctaHref: '#packages'
    },
    about: {
      title: 'Sobre Pedra Bela Vista',
      description: 'O Parque Pedra Bela Vista é o maior portal de turismo de aventura de Socorro. Localizado no topo de uma montanha, oferece uma das vistas mais espetaculares da região, além de uma estrutura completa com restaurante, banheiros e guias credenciados.',
      highlights: [
        { icon: '⛰️', title: 'Altitude', description: '1.250 metros acima do nível do mar' },
        { icon: '🧗', title: 'Rapel', description: '98 metros de descida emocionante' },
        { icon: '🌅', title: 'Pôr do Sol', description: 'Eleito o mais bonito do interior paulista' }
      ],
      infoBox: {
        title: 'Curiosidade Regional',
        content: 'O local abriga uma flora riquíssima típica de Mata Atlântica de altitude, com diversas espécies de orquídeas e bromélias silvestres.'
      },
      image: '/images/destinations/pedra-bela-about.jpg'
    }
  },
  beginnerSection: {
    title: 'Nunca Escalou?',
    description: 'Não se preocupe! Pedra Bela Vista é o local perfeito para o seu batismo na escalada em rocha natural. Nossos guias estão preparados para te dar todo o suporte.',
    highlights: [
      { icon: '🛡️', title: 'Segurança Absoluta', description: 'Equipamentos certificados e redundância em todos os sistemas.' },
      { icon: '🎓', title: 'Instrução Prévia', description: 'Treinamento teórico e prático em solo antes de subir na rocha.' },
      { icon: '🤝', title: 'Apoio Psicológico', description: 'Te ajudamos a superar o medo de altura no seu próprio tempo.' }
    ],
    finalMessage: 'A sua única preocupação será apreciar a vista lá de cima!'
  },
  safetySection: {
    title: 'Segurança em Primeiro Lugar',
    description: 'A escalada em rocha é uma atividade de risco controlado. Na Xperience Climb, mitigamos todos os risks possíveis seguindo padrões internacionais.',
    safetyItems: [
      { icon: '🪖', title: 'Uso de Capacete', description: 'Obrigatório durante todo o tempo na base das vias e durante a escalada.', details: ['Verificar ajuste', 'Manter jugular travada'] },
      { icon: '🔗', title: 'Redundância', description: 'Utilizamos sempre duas ancoragens independentes para garantir segurança total.', details: ['Ancoragens químicas', 'Equalização perfeita'] }
    ],
    equipmentList: [
      { name: 'Cadeirinha (Arnes)', required: true, provided: true },
      { name: 'Capacete de Escalada', required: true, provided: true },
      { name: 'Sapatilha de Escalada', required: true, provided: false },
      { name: 'Freio e Mosquetões', required: true, provided: true }
    ]
  },
  gallery: {
    categories: [
      { key: 'climb', value: 'Escalada' },
      { key: 'landscape', value: 'Paisagem' }
    ],
    images: [
      { src: '/images/destinations/pedra-bela-1.jpg', alt: 'Rapel na Pedra Bela Vista', title: 'Rapel de 98m', category: 'climb' },
      { src: '/images/destinations/pedra-bela-2.jpg', alt: 'Pôr do sol maravilhoso', title: 'Pôr do Sol no Ponto de Encontro', category: 'landscape' }
    ]
  },
  timeline: [
    { time: '08:00', activity: 'Encontro no Parque Pedra Bela Vista' },
    { time: '08:30', activity: 'Briefing de segurança e entrega de equipamentos' },
    { time: '09:00', activity: 'Início das escaladas e rapel' },
    { time: '13:00', activity: 'Intervalo para almoço no restaurante do parque' },
    { time: '14:30', activity: 'Retorno às vias e oficinas de técnicas verticais' },
    { time: '17:30', activity: 'Encerramento e pôr do sol clássico' }
  ],
  logistics: {
    meetingPoint: 'Restaurante do Parque Pedra Bela Vista',
    importantNotes: [
      'Chegue com 15 minutos de antecedência.',
      'Leve repelente e protetor solar.'
    ],
    tips: [
      'Vá de roupas leves e calçado fechado (tênis ou bota).',
      'Leve uma garrafa de água de pelo menos 1.5L.'
    ],
    groupSize: 'Máximo de 12 participantes por edição',
    included: [
      'Condutores e instrutores de montanha certificados',
      'Todos os equipamentos de segurança coletivos e individuais (exceto sapatilha)',
      'Seguro aventura contra acidentes pessoais'
    ],
    notIncluded: [
      'Alimentação e bebidas no restaurante',
      'Transporte até o parque'
    ],
    requirements: [
      'Idade mínima de 12 anos',
      'Não ter fobia extrema de altura'
    ]
  },
  activities: ['Escalada Esportiva', 'Rapel de 98m', 'Trilha Autoguiada'],
  instructors: [
    { name: 'Felipe Montenegro', role: 'Guia Chefe', certifications: ['AGUIPAM', 'WFR'], specialties: ['Resgate vertical', 'Abertura de vias'] }
  ],
  partners: [
    { name: 'Aventura Socorro', websiteUrl: 'https://aventurasocorro.com.br' }
  ]
};

const mockIpanemaDestination: DestinationContent = {
  id: 'fazenda-ipanema',
  name: 'Fazenda Ipanema / FLONA',
  isPublished: true,
  eventStatus: 'planned',
  visualConfig: {
    primaryColor: '#15803d',
    primaryColorHover: '#166534',
    primaryColorActive: '#14532d',
    accentColor: '#22c55e',
    backgroundColor: '#020617',
    surfaceColor: '#0f172a',
    textColor: '#f8fafc',
    textSecondaryColor: '#94a3b8',
    borderColor: '#1e293b',
    gradientFrom: '#14532d',
    gradientTo: '#15803d',
    heroOverlay: 'rgba(2, 6, 23, 0.75)',
    cardBackground: '#0f172a'
  },
  locationDetails: {
    displayName: 'Floresta Nacional de Ipanema (FLONA)',
    address: 'Rodovia Sorocaba-Iperó, km 12.5',
    city: 'Iperó',
    state: 'São Paulo',
    distance: '120 km',
    coordinates: { lat: -23.4287, lng: -47.5912 },
    mapsUrl: 'https://maps.google.com/?q=-23.4287,-47.5912',
    directions: [
      { title: 'Passo 1', description: 'Siga pela Rodovia Castelo Branco até a saída para Sorocaba/Iperó.' },
      { title: 'Passo 2', description: 'Pegue o acesso a Iperó e siga as placas oficiais da FLONA.' }
    ]
  },
  content: {
    hero: {
      title: 'Fazenda Ipanema',
      subtitle: 'História, ecologia e escalada tradicional no berço da siderurgia nacional.',
      description: 'Explore as falésias de calcário encrustadas na Floresta Nacional de Ipanema.',
      backgroundImage: '/images/destinations/ipanema-hero.jpg',
      ctaLabel: 'Ver Detalhes',
      ctaHref: '#about'
    },
    about: {
      title: 'Sobre Fazenda Ipanema',
      description: 'A Floresta Nacional de Ipanema é uma unidade de conservação federal riquíssima em história. O local abriga ruínas da antiga Real Fábrica de Ferro, além de paredões rochosos ideais para a prática de escalada tradicional e esportiva.',
      highlights: [
        { icon: '🌿', title: 'Conservação', description: 'Área federal protegida pelo ICMBio' },
        { icon: '🧱', title: 'História', description: 'Ruínas históricas imperiais do século XIX' },
        { icon: '🧗', title: 'Vias', description: 'Escalada em calcário técnico e técnico-atlético' }
      ]
    }
  },
  timeline: [
    { time: '08:30', activity: 'Apresentação na portaria principal da FLONA' },
    { time: '09:00', activity: 'Caminhada leve até o setor de escalada' },
    { time: '16:30', activity: 'Retorno para visita guiada nas ruínas históricas' }
  ]
};

const mockSiteSettings: ActiveSiteContent = {
  nextEventStartsAt: '2026-08-15T08:00:00Z',
  contactInfo: {
    phone: '+5511999999999',
    email: 'contato@xperienceclimb.com.br',
    instagram: '@xperienceclimb'
  },
  footerSettings: {
    certificationsText: 'Xperience Climb Certified MT-12',
    legalText: '© 2026 Xperience Climb. Todos os direitos reservados.'
  },
  activeDestination: mockActiveDestination
};

const mockHomePage: HomePageContent = {
  title: 'Xperience Climb - Escalada em Rocha Natural',
  sectionOrder: [
    'hero',
    'about',
    'beginner',
    'calendar',
    'packages',
    'includedServices',
    'timeline',
    'gallery',
    'safety',
    'community',
    'location',
    'testimonials'
  ],
  calendarSection: {
    title: 'Próximas Fronteiras',
    description: 'Nossos desafios acontecem no último mês de cada bimestre. Prepare-se para o desconhecido.'
  },
  packagesSection: {
    title: 'Nossos Pacotes de Escalada',
    description: 'Escolha a experiência perfeita para o seu nível. Todos os pacotes incluem equipamentos de segurança e instrução profissional.',
    packageRefs: ['agarrao', 'crux', 'alma-vertical', 'xperience-anual']
  },
  includedServicesSection: {
    title: 'Tudo Incluso nas Nossas Aventuras',
    description: 'Cuidamos de toda a alimentação e hidratação para você.'
  },
  safetySection: {
    title: 'Segurança em Primeiro Lugar',
    description: 'Nossa prioridade máxima é garantir que você tenha uma experiência segura e inesquecível. Conheça nossos produtos e equipamentos.'
  },
  communitySection: {
    title: 'Nossa Comunidade',
    description: 'Os melhores guias, protocolos e locais em um só lugar.'
  },
  testimonialsSection: {
    title: 'O Que Nossos Aventureiros Dizem',
    description: 'Centenas de escaladores já viveram essa experiência com a Xperience Climb.'
  }
};

const mockPackages: Package[] = [
  {
    id: 'agarrao',
    name: 'Agarrão',
    price: { amount: 15000, currency: 'BRL' },
    description: 'Para quem quer experimentar a escalada pela primeira vez com total segurança.',
    features: ['1 via de escalada guiada', 'Todos os equipamentos incluídos', 'Seguro aventura', 'Foto digital do topo'],
    availability: { available: true, spotsLeft: 5, restrictions: [] },
    rules: { minAge: 12, maxParticipants: 8, requiresExperience: false, cancellationPolicy: 'Cancelamento gratuito até 48h antes.' },
    isActive: true
  },
  {
    id: 'crux',
    name: 'Crux',
    price: { amount: 28000, currency: 'BRL' },
    description: 'Para quem quer evoluir na técnica e fazer múltiplas subidas.',
    features: ['Até 4 vias de escalada guiadas', 'Instrução de técnicas de segurança', 'Todos os equipamentos incluídos', 'Seguro aventura', 'Vídeo do crux gravado por guias'],
    availability: { available: true, spotsLeft: 3, restrictions: [] },
    rules: { minAge: 12, maxParticipants: 8, requiresExperience: false, cancellationPolicy: 'Cancelamento gratuito até 48h antes.' },
    isActive: true
  },
  {
    id: 'alma-vertical',
    name: 'Alma Vertical',
    price: { amount: 45000, currency: 'BRL' },
    description: 'A experiência vertical definitiva de um dia completo com fotos e almoço inclusos.',
    features: ['Vias ilimitadas durante o dia', 'Almoço rústico no parque incluso', 'Kit exclusivo Xperience Climb', 'Todas as fotos e vídeos em alta resolução', 'Seguro aventura premium'],
    availability: { available: true, spotsLeft: 2, restrictions: [] },
    rules: { minAge: 14, maxParticipants: 6, requiresExperience: false, cancellationPolicy: 'Cancelamento gratuito até 48h antes.' },
    isActive: true
  },
  {
    id: 'xperience-anual',
    name: 'Xperience Anual',
    price: { amount: 150000, currency: 'BRL' },
    description: 'Assinatura anual premium com acesso garantido a todas as saídas bimestrais do ano.',
    features: ['6 saídas bimestrais garantidas', 'Destinos diferentes ao longo do ano', 'Brinde exclusivo de boas-vindas', 'Desconto de 20% para acompanhantes', 'Acompanhamento de evolução técnica'],
    availability: { available: true, spotsLeft: 4, restrictions: [] },
    rules: { minAge: 16, maxParticipants: 10, requiresExperience: false, cancellationPolicy: 'Contrato anual.' },
    isActive: true
  }
];

export class LegacyContentRepository implements IContentRepository {
  async getActiveSite(): Promise<ActiveSiteContent | null> {
    return mockSiteSettings;
  }

  async getHomePage(): Promise<HomePageContent | null> {
    return mockHomePage;
  }

  async getDestinationBySlug(slug: string): Promise<DestinationContent | null> {
    if (slug === 'pedra-bela') return mockActiveDestination;
    if (slug === 'fazenda-ipanema') return mockIpanemaDestination;
    return null;
  }

  async listDestinations(): Promise<DestinationContent[]> {
    return [mockActiveDestination, mockIpanemaDestination];
  }

  async listPublishedPackages(): Promise<Package[]> {
    return mockPackages;
  }

  async listTestimonials(): Promise<TestimonialContent[]> {
    return [];
  }

  async listIncludedServices(): Promise<ServiceContent[]> {
    return [];
  }

  async listSafetyProcedures(): Promise<SafetyProcedureContent[]> {
    return [];
  }

  async listVisitedLocations(): Promise<VisitedLocationContent[]> {
    return [];
  }
}
