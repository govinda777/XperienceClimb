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
      title: 'XPERIENCE CLIMB',
      subtitle: 'Viva a Experiência Definitiva de Escalada',
      description: 'Escalada no coração da Mata Atlântica'
    },
    about: {
      title: 'Escalada no Coração da Mata Atlântica',
      description: 'O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema (FLONA), oferece uma das experiências de escalada mais autênticas e seguras do interior de São Paulo.',
      highlights: [
        {
          icon: '🏔️',
          title: 'Rochas Naturais Únicas',
          description: 'Formações rochosas de quartzito com mais de 600 milhões de anos, oferecendo vias para todos os níveis de experiência.'
        },
        {
          icon: '🌿',
          title: 'Conservação e Natureza',
          description: 'Localizado em uma unidade de conservação federal, garantindo a preservação do ambiente e biodiversidade local.'
        },
        {
          icon: '👨‍🏫',
          title: 'Instrutores Certificados',
          description: 'Equipe de profissionais com certificação nacional e internacional, garantindo segurança e aprendizado de qualidade.'
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
        src: '/images/themes/fazenda-ipanema/climb.jpg',
        alt: 'Escalador nas rochas do Morro Araçoiaba',
        title: 'Escalada Técnica',
        category: 'climb'
      },
      {
        src: '/images/themes/fazenda-ipanema/climb-2.jpg',
        alt: 'Vista panorâmica durante a escalada',
        title: 'Vista Panorâmica',
        category: 'climb'
      },
      {
        src: '/images/themes/fazenda-ipanema/flona.jpg',
        alt: 'Floresta Nacional de Ipanema',
        title: 'Mata Atlântica Preservada',
        category: 'nature'
      },
      {
        src: '/images/themes/fazenda-ipanema/flona-2.jpg',
        alt: 'Trilhas da Floresta Nacional',
        title: 'Trilhas Ecológicas',
        category: 'nature'
      },
      {
        src: '/images/themes/fazenda-ipanema/setor-map.jpg',
        alt: 'Mapa dos setores de escalada',
        title: 'Setores de Escalada',
        category: 'equipment'
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
  }
};
