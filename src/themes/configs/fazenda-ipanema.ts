import { ThemeConfig } from '../types';

export const fazendaIpanemaTheme: ThemeConfig = {
  id: 'fazenda-ipanema',
  name: 'Fazenda Ipanema',
  location: {
    name: 'Morro Araçoiaba',
    address: 'Floresta Nacional de Ipanema',
    city: 'Iperó',
    state: 'São Paulo',
    distance: '120km de São Paulo',
    coordinates: { lat: -23.4255562, lng: -47.5980568 },
    mapsUrl: 'https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568,775m/data=!3m1!1e3!4m9!1m2!2m1!1sFloresta+Nacional+de+Ipanema,+Iper%C3%B3,+SP!3m5!1s0x94c5f172812051e1:0xc9ab288d76797fad!8m2!3d-23.4254791!4d-47.5979779!16s%2Fg%2F11gj_vn973!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D',
    directions: [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Raposo Tavares (SP-270) sentido interior'
      },
      {
        step: 2,
        title: 'Saída Iperó',
        description: 'Pegue a saída 109 - Iperó/Boituva (aproximadamente 90km)'
      },
      {
        step: 3,
        title: 'Entrada da Floresta',
        description: 'Siga as placas para "Floresta Nacional de Ipanema" (8km)'
      },
      {
        step: 4,
        title: 'Chegada',
        description: 'Estacionamento gratuito, proximo ao acesso ao setor de escalada'
      }
    ]
  },
  content: {
    hero: {
      title: 'XPERIENCE CLIMB FLONA',
      subtitle: 'Escalada Sustentável na Mata Atlântica',
      description: 'Conservação, educação e aventura em harmonia'
    },
    about: {
      title: 'Escalada no Coração da Mata Atlântica',
      description: 'O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema (FLONA), oferece uma das experiências de escalada mais autênticas e seguras do interior de São Paulo.',
      highlights: [
        {
          icon: '🌳',
          title: 'Unidade de Conservação Federal',
          description: 'Escalada responsável em área protegida pelo ICMBio, contribuindo para a conservação da Mata Atlântica e educação ambiental.'
        },
        {
          icon: '🔬',
          title: 'Geologia Milenar',
          description: 'Formações rochosas de quartzito com mais de 600 milhões de anos, um verdadeiro laboratório natural de geologia.'
        },
        {
          icon: '🦋',
          title: 'Biodiversidade Preservada',
          description: 'Experiência única de escalada em meio à fauna e flora nativas, com possibilidade de avistamento de espécies endêmicas.'
        }
      ],
      infoBox: {
        title: 'Sobre a Floresta Nacional de Ipanema (Flona)',
        content: 'A Floresta Nacional de Ipanema, antes conhecida como "Fazenda Ipanema" é uma unidade de Conservação da natureza, administrada pelo Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio), localizada a 120 km da cidade de São Paulo e abrangendo parte dos municípios de Iperó, Araçoiaba da Serra e Capela do Alto. A missão da Flona de Ipanema é proteger, conservar e restaurar os remanescentes de vegetação nativa do domínio de Mata Atlântica, especialmente o Morro Araçoiaba, e seus ambientes associados, seus atributos naturais, históricos e culturais, promover o manejo florestal, o uso público e ser referência em integração socioambiental, pesquisa e disseminação de conhecimentos.'
      }
    }
  },
  gallery: {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalador nas rochas do Morro Araçoiaba',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop',
        alt: 'Vista panorâmica durante a escalada',
        title: 'Vista Panorâmica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        alt: 'Floresta Nacional de Ipanema',
        title: 'Mata Atlântica Preservada',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Trilhas da Floresta Nacional',
        title: 'Trilhas Ecológicas',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'Mapa dos setores de escalada',
        title: 'Setores de Escalada',
        category: 'equipment',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      }
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos'
    }
  },
  activities: [
    {
      id: 'rock-climbing',
      name: 'Escalada em Rocha',
      description: 'Escalada técnica em formações de quartzito com mais de 600 milhões de anos',
      icon: '🧗',
      difficulty: 'medium'
    }
  ],
  logistics: {
    schedule: {
      openTime: '8h',
      closeTime: '17h',
      notes: 'Horário de funcionamento do parque'
    },
    meetingPoint: 'Centro de Visitantes da FLONA',
    importantNotes: [
      'Horário de funcionamento do parque: 8h às 17h',
      'Estacionamento gratuito disponível',
      'Enviaremos o cronograma detalhado, no final da compra, para você conferir'
    ],
    tips: [
      'Chegue com antecedência',
      'Traga protetor solar',
      'Use roupas adequadas para escalada',
      'Leve água e lanche extra'
    ]
  },
  community: {
    localPartners: ['flona-ipanema', 'equipamentos-verticais', 'pousada-aventura'],
    localInstructors: ['marcos-ishino'],
    specificSafetyProcedures: ['pre-climb-check', 'emergency-descent'],
    visitedLocationId: 'fazenda-ipanema'
  },
  seo: {
    title: 'XperienceClimb - Escalada na Fazenda Ipanema',
    description: 'Viva a experiência definitiva de escalada no Morro Araçoiaba, localizado na Floresta Nacional de Ipanema. Escalada segura com instrutores certificados.',
    keywords: ['escalada', 'fazenda ipanema', 'morro araçoiaba', 'flona', 'mata atlântica', 'escalada em rocha'],
    ogImage: '/images/themes/fazenda-ipanema/og-image.jpg'
  },
  visual: {
    primaryColor: '#2d5a3d', // Deep forest green
    primaryColorHover: '#245032',
    primaryColorActive: '#1e4429',
    accentColor: '#7cb342', // Fresh green accent
    backgroundColor: '#f8fdf9', // Very light green background
    surfaceColor: '#ffffff',
    textColor: '#1b3b1f', // Dark forest green text
    textSecondaryColor: '#4a6b4d',
    borderColor: '#c8e6c9',
    gradientFrom: '#2d5a3d',
    gradientTo: '#4caf50',
    heroOverlay: 'rgba(45, 90, 61, 0.7)', // Forest green overlay
    cardBackground: '#ffffff'
  }
};
