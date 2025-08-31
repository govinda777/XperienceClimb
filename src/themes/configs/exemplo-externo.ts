import { ThemeConfig } from '../types';

export const exemploExternoTheme: ThemeConfig = {
  id: 'exemplo-externo',
  name: 'Exemplo com Imagens Externas',
  location: {
    name: 'Exemplo de Localização',
    address: 'Rua das Aventuras, 123',
    city: 'Cidade Exemplo',
    state: 'Estado Exemplo',
    distance: '100km de São Paulo',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    mapsUrl: 'https://www.google.com/maps',
    directions: [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela rodovia principal'
      },
      {
        step: 2,
        title: 'Chegada',
        description: 'Localização do exemplo'
      }
    ]
  },
  content: {
    hero: {
      title: 'XPERIENCE EXEMPLO',
      subtitle: 'Demonstração do Sistema de Imagens Externas',
      description: 'Este tema usa apenas URLs externas para demonstrar o sistema'
    },
    about: {
      title: 'Sistema de Imagens Externas',
      description: 'Este tema demonstra como usar URLs externas de serviços como Unsplash, Picsum e outros para as imagens da galeria, economizando armazenamento e melhorando a performance.',
      highlights: [
        {
          icon: '🌐',
          title: 'URLs Externas',
          description: 'Todas as imagens são carregadas de serviços externos confiáveis como Unsplash, Picsum e Placeholder.com.'
        },
        {
          icon: '💾',
          title: 'Economia de Armazenamento',
          description: 'Não é necessário hospedar imagens localmente, reduzindo custos de armazenamento e simplificando o deploy.'
        },
        {
          icon: '🚀',
          title: 'Performance Otimizada',
          description: 'CDNs especializadas em imagens garantem carregamento rápido e otimização automática de tamanhos.'
        }
      ],
      infoBox: {
        title: 'Sobre o Sistema de Imagens Externas',
        content: 'O sistema de imagens externas permite usar URLs de serviços confiáveis em vez de armazenar imagens localmente. Isso oferece vantagens como economia de armazenamento, melhor performance e flexibilidade para trocar imagens sem reupload. O sistema inclui validação de domínios, normalização de URLs e tratamento de erros.'
      }
    }
  },
  gallery: {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalada técnica em rocha demonstrando o sistema',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://picsum.photos/800/600?random=1',
        alt: 'Paisagem natural gerada pelo Picsum',
        title: 'Paisagem Natural',
        category: 'nature',
        isExternal: true,
        externalDomain: 'picsum.photos'
      },
      {
        src: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=Equipamentos',
        alt: 'Placeholder para equipamentos de escalada',
        title: 'Equipamentos',
        category: 'equipment',
        isExternal: true,
        externalDomain: 'via.placeholder.com'
      },
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop',
        alt: 'Vista panorâmica de montanhas',
        title: 'Vista Panorâmica',
        category: 'nature',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://picsum.photos/800/600?random=2',
        alt: 'Imagem aleatória do Picsum',
        title: 'Imagem Aleatória',
        category: 'climb',
        isExternal: true,
        externalDomain: 'picsum.photos'
      },
      {
        src: 'https://via.placeholder.com/800x600/FF6B6B/FFFFFF?text=Aventura',
        alt: 'Placeholder colorido para aventura',
        title: 'Aventura',
        category: 'adventure',
        isExternal: true,
        externalDomain: 'via.placeholder.com'
      }
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos',
      adventure: 'Aventura'
    }
  },
  activities: [
    {
      id: 'rock-climbing',
      name: 'Escalada em Rocha',
      description: 'Escalada técnica demonstrando o sistema de imagens externas',
      icon: '🧗',
      difficulty: 'medium'
    },
    {
      id: 'hiking',
      name: 'Trilha',
      description: 'Trilhas pela natureza com imagens externas',
      icon: '🥾',
      difficulty: 'easy'
    }
  ],
  logistics: {
    schedule: {
      openTime: '8h',
      closeTime: '17h',
      notes: 'Horário de funcionamento do exemplo'
    },
    meetingPoint: 'Ponto de Encontro Exemplo',
    importantNotes: [
      'Este é um tema de demonstração',
      'Todas as imagens são externas',
      'Sistema funciona com diferentes serviços'
    ],
    tips: [
      'Teste o sistema com diferentes URLs',
      'Verifique a performance das imagens',
      'Monitore o carregamento das imagens externas'
    ]
  },
  community: {
    localPartners: ['exemplo-parceiro'],
    localInstructors: ['exemplo-instrutor'],
    specificSafetyProcedures: ['exemplo-procedimento'],
    visitedLocationId: 'exemplo-localizacao'
  },
  seo: {
    title: 'XperienceClimb - Exemplo com Imagens Externas',
    description: 'Demonstração do sistema de imagens externas do XperienceClimb, mostrando como usar URLs de serviços confiáveis para otimizar performance e reduzir custos.',
    keywords: ['exemplo', 'imagens externas', 'unsplash', 'picsum', 'placeholder', 'performance', 'otimização'],
    ogImage: 'https://via.placeholder.com/1200x630/2d5a3d/FFFFFF?text=XperienceClimb+Exemplo'
  },
  visual: {
    primaryColor: '#2d5a3d',
    primaryColorHover: '#245032',
    primaryColorActive: '#1e4429',
    accentColor: '#7cb342',
    backgroundColor: '#f8fdf9',
    surfaceColor: '#ffffff',
    textColor: '#1b3b1f',
    textSecondaryColor: '#4a6b4d',
    borderColor: '#c8e6c9',
    gradientFrom: '#2d5a3d',
    gradientTo: '#4caf50',
    heroOverlay: 'rgba(45, 90, 61, 0.7)',
    cardBackground: '#ffffff'
  }
};
