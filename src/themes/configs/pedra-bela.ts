import { ThemeConfig } from '../types';

export const pedraBellaTheme: ThemeConfig = {
  id: 'pedra-bela',
  name: 'Pedra Bela',
  location: {
    name: 'Pedra Bela',
    address: 'Pedra Bela',
    city: 'Pedra Bela',
    state: 'São Paulo',
    distance: '119km de São Paulo',
    coordinates: { lat: -22.7894, lng: -46.4567 }, // Coordenadas aproximadas
    mapsUrl: 'https://www.google.com/maps/place/Pedra+Bela+-+SP',
    directions: [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Fernão Dias (BR 381) até Bragança Paulista'
      },
      {
        step: 2,
        title: 'Rodovia Capitão Bardoino',
        description: 'Continue pela Rodovia Capitão Bardoino (BR 146)'
      },
      {
        step: 3,
        title: 'Chegada',
        description: 'Siga pela Rodovia José Bueno de Miranda até Pedra Bela'
      }
    ]
  },
  content: {
    hero: {
      title: 'XPERIENCE CLIMB',
      subtitle: 'Aventura Completa em Pedra Bela',
      description: 'Escalada, tirolesa e natureza exuberante'
    },
    about: {
      title: 'Aventura Completa na Natureza de Pedra Bela',
      description: 'Pedra Bela oferece uma experiência única combinando escalada, tirolesa e contato com a natureza exuberante das montanhas paulistas. Um destino perfeito para quem busca aventura e tranquilidade.',
      highlights: [
        {
          icon: '🚁',
          title: 'Tirolesa Gigante',
          description: 'A maior tirolesa da América Latina com quase 2km de extensão, proporcionando uma experiência única de voo sobre a natureza.'
        },
        {
          icon: '🏔️',
          title: 'Montanhas Espetaculares',
          description: 'Pedra do Santuário e Pedra Maria Antônia oferecem vistas panorâmicas deslumbrantes e desafios únicos de escalada.'
        },
        {
          icon: '💧',
          title: 'Cachoeiras Refrescantes',
          description: 'Cachoeiras Boca da Mata e Antônio Souza proporcionam momentos de relaxamento e conexão com a natureza.'
        }
      ],
      infoBox: {
        title: 'Sobre Pedra Bela',
        content: 'Pedra Bela é uma pequena cidade do interior de São Paulo conhecida por sua natureza exuberante e atividades de aventura. Com montanhas imponentes, cachoeiras cristalinas e a famosa tirolesa de 2km, é um destino perfeito para quem busca experiências únicas na natureza. A cidade também abriga um templo budista e oferece diversas trilhas ecológicas.'
      }
    }
  },
  gallery: {
    images: [
      {
        src: '/images/themes/pedra-bela/tirolesa-1.jpg',
        alt: 'Tirolesa de 2km em Pedra Bela',
        title: 'Tirolesa Gigante',
        category: 'adventure'
      },
      {
        src: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
        alt: 'Vista da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'climb'
      },
      {
        src: '/images/themes/pedra-bela/pedra-santuario-2.jpg',
        alt: 'Igreja no cume da Pedra do Santuário',
        title: 'Igreja do Santuário',
        category: 'climb'
      },
      {
        src: '/images/themes/pedra-bela/pedra-maria-antonia.jpg',
        alt: 'Vista da Pedra Maria Antônia',
        title: 'Pedra Maria Antônia',
        category: 'climb'
      },
      {
        src: '/images/themes/pedra-bela/cachoeira-boca-mata.jpg',
        alt: 'Cachoeira Boca da Mata',
        title: 'Cachoeira Boca da Mata',
        category: 'waterfalls'
      },
      {
        src: '/images/themes/pedra-bela/cachoeira-antonio-souza.jpg',
        alt: 'Cachoeira Antônio Souza',
        title: 'Cachoeira Antônio Souza',
        category: 'waterfalls'
      },
      {
        src: '/images/themes/pedra-bela/corredeiras-tuncuns.jpg',
        alt: 'Corredeiras dos Tuncuns',
        title: 'Corredeiras dos Tuncuns',
        category: 'waterfalls'
      },
      {
        src: '/images/themes/pedra-bela/templo-budista.jpg',
        alt: 'Templo Budista em Pedra Bela',
        title: 'Templo Budista',
        category: 'nature'
      },
      {
        src: '/images/themes/pedra-bela/quadriciclo.jpg',
        alt: 'Passeio de quadriciclo',
        title: 'Passeio de Quadriciclo',
        category: 'adventure'
      },
      {
        src: '/images/themes/pedra-bela/escalada-1.jpg',
        alt: 'Escalada nas pedras de Pedra Bela',
        title: 'Escalada Técnica',
        category: 'climb'
      },
      {
        src: '/images/themes/pedra-bela/paisagem-1.jpg',
        alt: 'Vista panorâmica das montanhas',
        title: 'Vista Panorâmica',
        category: 'nature'
      },
      {
        src: '/images/themes/pedra-bela/paisagem-2.jpg',
        alt: 'Pôr do sol em Pedra Bela',
        title: 'Pôr do Sol',
        category: 'nature'
      }
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      adventure: 'Aventura',
      nature: 'Natureza',
      waterfalls: 'Cachoeiras'
    }
  },
  activities: [
    {
      id: 'zipline',
      name: 'Tirolesa',
      description: 'Tirolesa de 2km - a maior da América Latina',
      icon: '🚁',
      difficulty: 'easy',
      duration: '1min 40s',
      price: 4000 // R$ 40,00
    },
    {
      id: 'rock-climbing',
      name: 'Escalada',
      description: 'Escalada na Pedra do Santuário e Pedra Maria Antônia',
      icon: '🧗',
      difficulty: 'medium'
    },
    {
      id: 'waterfalls',
      name: 'Cachoeiras',
      description: 'Banho nas cachoeiras Boca da Mata e Antônio Souza',
      icon: '💧',
      difficulty: 'easy'
    },
    {
      id: 'atv',
      name: 'Quadriciclo',
      description: 'Passeios ecológicos de quadriciclo',
      icon: '🏍️',
      difficulty: 'easy',
      price: 9000 // R$ 90,00 - R$ 160,00
    }
  ],
  logistics: {
    schedule: {
      openTime: '9h',
      closeTime: '17h',
      notes: 'Funcionamento nos finais de semana e feriados'
    },
    meetingPoint: 'Portal da Cidade - Pedra Bela',
    importantNotes: [
      'Tirolesa funciona apenas nos finais de semana e feriados',
      'Entrada gratuita nas cachoeiras',
      'Consultar agenda do Templo Budista',
      'Atividades sujeitas às condições climáticas'
    ],
    tips: [
      'Traga roupas de banho para as cachoeiras',
      'Use protetor solar',
      'Calçados adequados para trilha',
      'Leve água e lanche extra',
      'Respeite a natureza local'
    ]
  },
  community: {
    localPartners: ['equipamentos-verticais'],
    localInstructors: ['ana-silva', 'marcos-ishino'],
    specificSafetyProcedures: ['pre-climb-check', 'emergency-descent'],
    visitedLocationId: 'pedra-bela'
  },
  seo: {
    title: 'XperienceClimb - Aventura Completa em Pedra Bela',
    description: 'Viva uma experiência única com escalada, tirolesa de 2km e cachoeiras em Pedra Bela. Aventura completa na natureza paulista.',
    keywords: ['pedra bela', 'tirolesa', 'escalada', 'cachoeiras', 'aventura', 'pedra do santuário', 'pedra maria antônia'],
    ogImage: '/images/themes/pedra-bela/og-image.jpg'
  }
};
