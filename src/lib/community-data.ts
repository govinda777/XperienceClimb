import { 
  Partner, 
  CertifiedInstructor, 
  SafetyProcedure, 
  VisitedLocation,
  CommunityData 
} from '@/core/entities/Community';

// 🤝 PARCEIROS DO XPERIENCE CLIMB
export const PARTNERS: Partner[] = [
  {
    id: 'flona-ipanema',
    name: 'Floresta Nacional de Ipanema',
    description: 'Unidade de conservação federal que abriga o Morro Araçoiaba, nosso principal local de escalada.',
    logo: '/images/logo-flona-ipanema-climp.jpg',
    website: 'https://www.icmbio.gov.br/flonadeipanema',
    category: 'other',
    location: {
      city: 'Iperó',
      state: 'São Paulo'
    },
    contact: {
      email: 'flona.ipanema@icmbio.gov.br',
      phone: '(15) 3266-1229'
    },
    services: [
      'Autorização para escalada',
      'Conservação ambiental',
      'Educação ambiental',
      'Trilhas ecológicas'
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'equipamentos-verticais',
    name: 'Equipamentos Verticais',
    description: 'Fornecedor especializado em equipamentos de escalada e segurança vertical.',
    logo: '/images/partners/equipamentos-verticais.png',
    website: 'https://equipamentosverticais.com.br',
    category: 'equipment',
    location: {
      city: 'São Paulo',
      state: 'São Paulo'
    },
    contact: {
      email: 'contato@equipamentosverticais.com.br',
      phone: '(11) 3456-7890',
      instagram: '@equipamentosverticais'
    },
    services: [
      'Cordas dinâmicas e estáticas',
      'Cadeirinhas e capacetes',
      'Freios e mosquetões',
      'Equipamentos de proteção'
    ],
    isActive: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'pousada-aventura',
    name: 'Pousada Aventura Ipanema',
    description: 'Hospedagem especializada para escaladores e aventureiros na região de Ipanema.',
    logo: '/images/partners/pousada-aventura.png',
    category: 'accommodation',
    location: {
      city: 'Iperó',
      state: 'São Paulo'
    },
    contact: {
      email: 'reservas@pousadaaventura.com.br',
      phone: '(15) 99876-5432',
      instagram: '@pousadaaventuraipanema'
    },
    services: [
      'Quartos para grupos',
      'Café da manhã reforçado',
      'Área para equipamentos',
      'Transfer para locais de escalada'
    ],
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-12-01')
  }
];

// 👨‍🏫 INSTRUTORES CERTIFICADOS
export const CERTIFIED_INSTRUCTORS: CertifiedInstructor[] = [
  {
    id: 'celso-ossamu',
    name: 'Celso Ossamu',
    photo: 'https://www.instagram.com/celsoossamu/',
    bio: 'Instrutor principal da XperienceClimb com mais de 15 anos de experiência em escalada. Especialista em escalada esportiva e tradicional, com foco em segurança e desenvolvimento técnico.',
    certifications: [
      {
        id: 'cbme-instructor',
        name: 'Instrutor de Escalada',
        organization: 'CBME - Confederação Brasileira de Montanhismo e Escalada',
        level: 'instructor',
        issueDate: new Date('2020-06-15'),
        expiryDate: new Date('2025-06-15'),
        certificateNumber: 'CBME-2020-001',
        isValid: true
      },
      {
        id: 'wilderness-first-aid',
        name: 'Wilderness First Aid',
        organization: 'NOLS Wilderness Medicine',
        level: 'advanced',
        issueDate: new Date('2023-03-10'),
        expiryDate: new Date('2025-03-10'),
        certificateNumber: 'WFA-2023-456',
        isValid: true
      }
    ],
    specialties: ['sport_climbing', 'traditional_climbing', 'rescue', 'kids_climbing'],
    experience: {
      yearsActive: 15,
      totalClients: 500,
      routesCompleted: 200
    },
    location: {
      city: 'São Paulo',
      state: 'São Paulo',
      operatingRadius: 150
    },
    contact: {
      email: 'ossamucelso@gmail.com',
      phone: '19 99725-9691',
      instagram: '@celsoossamu',
      whatsapp: '5519997259691'
    },
    availability: {
      isActive: true,
      schedule: {
        monday: { isAvailable: false, periods: [] },
        tuesday: { isAvailable: false, periods: [] },
        wednesday: { isAvailable: false, periods: [] },
        thursday: { isAvailable: false, periods: [] },
        friday: { isAvailable: false, periods: [] },
        saturday: { isAvailable: true, periods: [{ start: '06:00', end: '18:00' }] },
        sunday: { isAvailable: true, periods: [{ start: '06:00', end: '18:00' }] }
      },
      priceRange: {
        min: 15000, // R$ 150,00
        max: 35000  // R$ 350,00
      }
    },
    rating: {
      average: 4.9,
      totalReviews: 47
    },
    languages: ['Português', 'English'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'academia-boulder-sorocaba',
    name: 'Boulder - Cross Training e Academia de Escalada Sorocaba',
    photo: 'https://share.google/kmt3AbSELJAXM573k',
    bio: 'Instrutora especializada em escalada feminina e escalada adaptada. Pioneira em várias vias na região de Pedra Bela.',
    certifications: [
      {
        id: 'cbme-instructor-2',
        name: 'Instrutor de Escalada',
        organization: 'CBME - Confederação Brasileira de Montanhismo e Escalada',
        level: 'instructor',
        issueDate: new Date('2021-08-20'),
        expiryDate: new Date('2026-08-20'),
        certificateNumber: 'CBME-2021-045',
        isValid: true
      }
    ],
    specialties: ['sport_climbing', 'bouldering', 'adaptive_climbing', 'kids_climbing'],
    experience: {
      yearsActive: 8,
      totalClients: 280,
      routesCompleted: 150
    },
    location: {
      city: 'Sorocaba',
      state: 'São Paulo',
      operatingRadius: 100
    },
    contact: {
      email: 'contato@academiaboulder.com.br',
      phone: '19 98106-2640',
      instagram: '@academiabouldersorocaba',
      whatsapp: '5519981062640'
    },
    availability: {
      isActive: true,
      schedule: {
        monday: { isAvailable: false, periods: [] },
        tuesday: { isAvailable: false, periods: [] },
        wednesday: { isAvailable: false, periods: [] },
        thursday: { isAvailable: false, periods: [] },
        friday: { isAvailable: false, periods: [] },
        saturday: { isAvailable: true, periods: [{ start: '07:00', end: '17:00' }] },
        sunday: { isAvailable: true, periods: [{ start: '07:00', end: '17:00' }] }
      },
      priceRange: {
        min: 12000, // R$ 120,00
        max: 30000  // R$ 300,00
      }
    },
    rating: {
      average: 4.8,
      totalReviews: 32
    },
    languages: ['Português'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-01')
  }
];

// 🛡️ PROCEDIMENTOS DE SEGURANÇA
export const SAFETY_PROCEDURES: SafetyProcedure[] = [
  {
    id: 'pre-climb-check',
    title: 'Verificação Pré-Escalada',
    category: 'pre_climb',
    priority: 'critical',
    description: 'Procedimento obrigatório de verificação de equipamentos e condições antes de iniciar qualquer escalada.',
    steps: [
      {
        order: 1,
        title: 'Verificação de Equipamentos Pessoais',
        description: 'Inspecionar cadeirinha, capacete, sapatilhas e equipamentos pessoais',
        timeRequired: 5,
        isOptional: false,
        visualAid: '/images/safety/equipment-check.jpg'
      },
      {
        order: 2,
        title: 'Inspeção da Corda',
        description: 'Verificar toda a extensão da corda em busca de cortes, desgastes ou danos',
        timeRequired: 3,
        isOptional: false,
        visualAid: '/images/safety/rope-inspection.jpg'
      },
      {
        order: 3,
        title: 'Teste de Comunicação',
        description: 'Estabelecer e testar sinais de comunicação entre escalador e segurador',
        timeRequired: 2,
        isOptional: false
      },
      {
        order: 4,
        title: 'Verificação das Condições Climáticas',
        description: 'Avaliar condições meteorológicas e decidir sobre a continuidade da atividade',
        timeRequired: 2,
        isOptional: false
      }
    ],
    equipment: [
      {
        name: 'Cadeirinha',
        isRequired: true,
        quantity: 1,
        specifications: 'Certificada pela UIAA/CE',
        checkpoints: ['Fivelas funcionando', 'Costuras íntegras', 'Sem desgaste excessivo']
      },
      {
        name: 'Capacete',
        isRequired: true,
        quantity: 1,
        specifications: 'Certificado pela UIAA/CE',
        checkpoints: ['Casco sem trincas', 'Jugular ajustada', 'Sistema de ventilação livre']
      },
      {
        name: 'Corda Dinâmica',
        isRequired: true,
        quantity: 1,
        specifications: 'Mínimo 9.5mm, máximo 5 anos de uso',
        checkpoints: ['Sem cortes ou desgastes', 'Alma visível', 'Pontas marcadas']
      }
    ],
    warnings: [
      'Nunca escale sem capacete',
      'Sempre faça dupla verificação dos nós',
      'Em caso de dúvida sobre equipamento, não utilize'
    ],
    emergencyContacts: [
      {
        name: 'SAMU',
        role: 'Emergência Médica',
        phone: '192',
        isAvailable24h: true
      },
      {
        name: 'Bombeiros',
        role: 'Resgate',
        phone: '193',
        isAvailable24h: true
      },
      {
        name: 'Marcos Ishino',
        role: 'Instrutor Principal',
        phone: '(11) 99541-3539',
        isAvailable24h: true,
        location: 'São Paulo'
      }
    ],
    lastUpdated: new Date('2024-11-15'),
    version: '2.1',
    isActive: true
  },
  {
    id: 'emergency-descent',
    title: 'Procedimento de Descida de Emergência',
    category: 'emergency',
    priority: 'critical',
    description: 'Protocolo para descida rápida e segura em situações de emergência durante a escalada.',
    steps: [
      {
        order: 1,
        title: 'Avaliação da Situação',
        description: 'Identificar o tipo de emergência e avaliar opções de descida',
        timeRequired: 1,
        isOptional: false
      },
      {
        order: 2,
        title: 'Comunicação de Emergência',
        description: 'Alertar equipe de apoio e serviços de emergência se necessário',
        timeRequired: 2,
        isOptional: false
      },
      {
        order: 3,
        title: 'Preparação para Descida',
        description: 'Configurar sistema de rapel ou descida assistida',
        timeRequired: 5,
        isOptional: false,
        visualAid: '/images/safety/emergency-rappel.jpg'
      },
      {
        order: 4,
        title: 'Execução da Descida',
        description: 'Realizar descida controlada mantendo comunicação constante',
        timeRequired: 10,
        isOptional: false
      }
    ],
    equipment: [
      {
        name: 'Freio de Descida',
        isRequired: true,
        quantity: 1,
        specifications: 'ATC, GriGri ou similar certificado',
        checkpoints: ['Funcionamento suave', 'Sem desgaste excessivo']
      },
      {
        name: 'Mosquetões HMS',
        isRequired: true,
        quantity: 2,
        specifications: 'Certificados, com trava',
        checkpoints: ['Trava funcionando', 'Gate abrindo suavemente']
      }
    ],
    warnings: [
      'Apenas para situações de real emergência',
      'Sempre manter controle da velocidade de descida',
      'Nunca descer sem comunicação com equipe de apoio'
    ],
    emergencyContacts: [
      {
        name: 'SAMU',
        role: 'Emergência Médica',
        phone: '192',
        isAvailable24h: true
      },
      {
        name: 'Bombeiros',
        role: 'Resgate',
        phone: '193',
        isAvailable24h: true
      }
    ],
    lastUpdated: new Date('2024-10-20'),
    version: '1.3',
    isActive: true
  }
];

// 📍 LOCAIS JÁ VISITADOS
export const VISITED_LOCATIONS: VisitedLocation[] = [
  {
    id: 'fazenda-ipanema',
    name: 'Fazenda Ipanema - Morro Araçoiaba',
    state: 'São Paulo',
    city: 'Iperó',
    region: 'southeast',
    coordinates: {
      lat: -23.4356,
      lng: -47.6919
    },
    description: 'Principal local de escalada da XperienceClimb, localizado na Floresta Nacional de Ipanema. Oferece vias de escalada esportiva em rocha granítica com diferentes níveis de dificuldade.',
    images: [
      {
        url: '/images/themes/fazenda-ipanema/climb.jpg',
        caption: 'Vista geral do Morro Araçoiaba',
        category: 'landscape',
        photographer: 'Marcos Ishino',
        takenAt: new Date('2024-08-15')
      },
      {
        url: '/images/themes/fazenda-ipanema/climb-2.jpg',
        caption: 'Escalador em ação na face principal',
        category: 'route',
        photographer: 'Ana Silva',
        takenAt: new Date('2024-09-10')
      },
      {
        url: '/images/themes/fazenda-ipanema/setor-map.jpg',
        caption: 'Mapa dos setores de escalada',
        category: 'route',
        takenAt: new Date('2024-07-01')
      }
    ],
    routes: [
      {
        name: 'Via do Iniciante',
        grade: 'III',
        type: 'sport',
        length: 15,
        pitches: 1,
        description: 'Excelente via para iniciantes, com proteções bem distribuídas',
        isRecommended: true
      },
      {
        name: 'Crux da Manhã',
        grade: 'V+',
        type: 'sport',
        length: 25,
        pitches: 1,
        description: 'Via técnica com movimentos interessantes no meio da parede',
        firstAscent: {
          climber: 'Marcos Ishino',
          date: new Date('2019-05-20')
        },
        isRecommended: true
      },
      {
        name: 'Alma Vertical',
        grade: 'VII',
        type: 'sport',
        length: 30,
        pitches: 1,
        description: 'Via desafiadora para escaladores experientes',
        isRecommended: false
      }
    ],
    facilities: [
      {
        name: 'Estacionamento',
        type: 'parking',
        isAvailable: true,
        description: 'Estacionamento gratuito próximo à trilha de acesso'
      },
      {
        name: 'Banheiros',
        type: 'restroom',
        isAvailable: true,
        description: 'Banheiros no centro de visitantes'
      },
      {
        name: 'Água Potável',
        type: 'water',
        isAvailable: true,
        description: 'Bebedouros no centro de visitantes'
      }
    ],
    access: {
      difficulty: 'easy',
      duration: 20,
      distance: 800,
      description: 'Trilha bem marcada através da mata atlântica até a base do morro',
      requirements: [
        'Autorização do ICMBio',
        'Calçado adequado para trilha',
        'Protetor solar'
      ],
      restrictions: [
        'Horário de funcionamento: 8h às 17h',
        'Máximo 20 pessoas por grupo',
        'Proibido acampar'
      ],
      parkingInfo: 'Estacionamento gratuito no centro de visitantes',
      publicTransport: 'Ônibus até Iperó + táxi/Uber até a Flona'
    },
    bestSeason: ['autumn', 'winter', 'spring'],
    difficulty: {
      min: 'III',
      max: 'VIII+'
    },
    popularity: 5,
    lastVisited: new Date('2024-11-30'),
    visitCount: 156,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: 'pedra-bela',
    name: 'Pedra Bela',
    state: 'São Paulo',
    city: 'Pedra Bela',
    region: 'southeast',
    coordinates: {
      lat: -22.7894,
      lng: -46.4567
    },
    description: 'Destino de escalada em formações rochosas únicas, com paisagens deslumbrantes e vias desafiadoras para todos os níveis.',
    images: [
      {
        url: '/images/themes/pedra-bela/escalada-1.jpg',
        caption: 'Escalada na formação principal',
        category: 'route',
        photographer: 'Ana Silva',
        takenAt: new Date('2024-10-15')
      },
      {
        url: '/images/themes/pedra-bela/paisagem-1.jpg',
        caption: 'Vista panorâmica da região',
        category: 'landscape',
        takenAt: new Date('2024-10-15')
      },
      {
        url: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
        caption: 'Pedra do Santuário',
        category: 'landscape',
        takenAt: new Date('2024-10-16')
      }
    ],
    routes: [
      {
        name: 'Via da Pedra do Santuário',
        grade: 'IV',
        type: 'traditional',
        length: 40,
        pitches: 2,
        description: 'Via clássica com proteção natural, ideal para aprender escalada tradicional',
        isRecommended: true
      },
      {
        name: 'Crux da Maria Antônia',
        grade: 'VI+',
        type: 'sport',
        length: 35,
        pitches: 1,
        description: 'Via técnica na Pedra Maria Antônia',
        isRecommended: true
      }
    ],
    facilities: [
      {
        name: 'Camping',
        type: 'camping',
        isAvailable: true,
        description: 'Área de camping com infraestrutura básica',
        cost: 2000 // R$ 20,00
      },
      {
        name: 'Restaurante Local',
        type: 'restaurant',
        isAvailable: true,
        description: 'Restaurante com comida caseira'
      }
    ],
    access: {
      difficulty: 'moderate',
      duration: 45,
      distance: 2000,
      description: 'Trilha com trechos íngremes através de mata nativa',
      requirements: [
        'Bota de trilha',
        'Bastante água',
        'Lanterna/headlamp'
      ],
      restrictions: [
        'Acesso apenas durante o dia',
        'Respeitar propriedades privadas'
      ],
      parkingInfo: 'Estacionamento na entrada da trilha'
    },
    bestSeason: ['autumn', 'winter'],
    difficulty: {
      min: 'IV',
      max: 'VIII'
    },
    popularity: 4,
    lastVisited: new Date('2024-10-16'),
    visitCount: 23,
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-11-01')
  }
];

// 📊 DADOS AGREGADOS DA COMUNIDADE
export const COMMUNITY_DATA: CommunityData = {
  partners: PARTNERS,
  instructors: CERTIFIED_INSTRUCTORS,
  safetyProcedures: SAFETY_PROCEDURES,
  visitedLocations: VISITED_LOCATIONS,
  statistics: {
    totalPartners: PARTNERS.length,
    totalInstructors: CERTIFIED_INSTRUCTORS.length,
    totalProcedures: SAFETY_PROCEDURES.length,
    totalLocations: VISITED_LOCATIONS.length,
    locationsByState: VISITED_LOCATIONS.reduce((acc, location) => {
      acc[location.state] = (acc[location.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    instructorsByState: CERTIFIED_INSTRUCTORS.reduce((acc, instructor) => {
      acc[instructor.location.state] = (acc[instructor.location.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    partnersByCategory: PARTNERS.reduce((acc, partner) => {
      acc[partner.category] = (acc[partner.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    lastUpdated: new Date()
  }
};
