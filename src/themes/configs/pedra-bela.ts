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
      title: 'XPERIENCE ADVENTURE',
      subtitle: 'Parque de Aventuras em Pedra Bela',
      description: 'Tirolesa gigante, escalada, cachoeiras e muito mais!'
    },
    about: {
      title: 'Aventura Completa na Natureza de Pedra Bela',
      description: 'Pedra Bela oferece uma experiência única combinando escalada, tirolesa e contato com a natureza exuberante das montanhas paulistas. Um destino perfeito para quem busca aventura e tranquilidade.',
      highlights: [
        {
          icon: '🚁',
          title: 'Tirolesa Record Mundial',
          description: 'A maior tirolesa da América Latina com 1.950m de extensão e velocidade de até 80km/h - uma experiência inesquecível de voo!'
        },
        {
          icon: '🏍️',
          title: 'Múltiplas Aventuras',
          description: 'Quadriciclo, escalada, cachoeiras e trilhas - um verdadeiro parque de aventuras com atividades para toda família.'
        },
        {
          icon: '🏔️',
          title: 'Montanhas Místicas',
          description: 'Pedra do Santuário com sua igreja no topo e Pedra Maria Antônia oferecem experiências espirituais e vistas de 360°.'
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
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        alt: 'Tirolesa de 2km em Pedra Bela',
        title: 'Tirolesa Gigante',
        category: 'adventure',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Vista da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop',
        alt: 'Igreja no cume da Pedra do Santuário',
        title: 'Igreja do Santuário',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Vista da Pedra Maria Antônia',
        title: 'Pedra Maria Antônia',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        alt: 'Cachoeira Boca da Mata',
        title: 'Cachoeira Boca da Mata',
        category: 'waterfalls',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Cachoeira Antônio Souza',
        title: 'Cachoeira Antônio Souza',
        category: 'waterfalls',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        alt: 'Corredeiras dos Tuncuns',
        title: 'Corredeiras dos Tuncuns',
        category: 'waterfalls',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        alt: 'Templo Budista em Pedra Bela',
        title: 'Templo Budista',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        alt: 'Passeio de quadriciclo',
        title: 'Passeio de Quadriciclo',
        category: 'adventure',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalada nas pedras de Pedra Bela',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop',
        alt: 'Vista panorâmica das montanhas',
        title: 'Vista Panorâmica',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Pôr do sol em Pedra Bela',
        title: 'Pôr do Sol',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
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
  },
  visual: {
    primaryColor: '#d84315', // Deep orange-red for adventure
    primaryColorHover: '#bf360c',
    primaryColorActive: '#a52714',
    accentColor: '#ff7043', // Bright orange accent
    backgroundColor: '#fff8f5', // Warm light background
    surfaceColor: '#ffffff',
    textColor: '#3e2723', // Dark brown text
    textSecondaryColor: '#6d4c41',
    borderColor: '#ffccbc',
    gradientFrom: '#d84315',
    gradientTo: '#ff5722',
    heroOverlay: 'rgba(216, 67, 21, 0.7)', // Orange overlay
    cardBackground: '#ffffff'
  }
};
