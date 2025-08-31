import { BaseTheme } from './base-theme';

export class PedraBellaTheme extends BaseTheme {
  id = 'pedra-bela';
  name = 'Pedra Bela';

  location = this.createLocationInfo(
    'Pedra Bela',
    'Pedra Bela',
    'Pedra Bela',
    'São Paulo',
    '119km de São Paulo',
    { lat: -22.7894, lng: -46.4567 }, // Coordenadas aproximadas
    'https://www.google.com/maps/place/Pedra+Bela+-+SP',
    [
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
  );

  content = this.createContentInfo(
    {
      title: 'XPERIENCE ADVENTURE',
      subtitle: 'Parque de Aventuras em `Pedra Bela`',
      description: 'Tirolesa gigante, escalada, cachoeiras e muito mais!'
    },
    {
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
  );

  gallery = {
    images: this.processGalleryImages([
      {
        src: 'https://static.wixstatic.com/media/c08e80_87a6d58aa4be4e6191d3361aa7998f8a~mv2.jpg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c08e80_87a6d58aa4be4e6191d3361aa7998f8a~mv2.jpg',
        alt: 'Tirolesa de 2km em Pedra Bela',
        title: 'Tirolesa Gigante',
        category: 'adventure',
        isExternal: true
      },
      {
        src: 'https://visitesocorrosp.com.br/content/images/2024/09/VS_POSTBLOG1_FEED1-3.png',
        alt: 'Vista da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'climb',
        isExternal: true
      },
      {
        src: 'https://onofftransportes.com.br/wp-content/uploads/2017/10/1-maior-santuario-pedra-bela.jpg',
        alt: 'Igreja no cume da Pedra do Santuário',
        title: 'Igreja do Santuário',
        category: 'climb',
        isExternal: true
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Vista da Pedra Maria Antônia',
        title: 'Pedra Maria Antônia',
        category: 'climb',
        isExternal: true
      },
      {
        src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        alt: 'Cachoeira Boca da Mata',
        title: 'Cachoeira Boca da Mata',
        category: 'waterfalls',
        isExternal: true
      },
      {
        src: 'https://i.ytimg.com/vi/nzdNPIdUIhk/maxresdefault.jpg',
        alt: 'Cachoeira Antônio Souza',
        title: 'Cachoeira Antônio Souza',
        category: 'waterfalls',
        isExternal: true
      },
      {
        src: 'https://pedrabela.tur.br/wp-content/uploads/2018/05/IMG_1578.jpg',
        alt: 'Corredeiras dos Tuncuns',
        title: 'Corredeiras dos Tuncuns',
        category: 'waterfalls',
        isExternal: true
      },
      {
        src: 'https://media.istockphoto.com/id/937164520/pt/foto/beautiful-rock-buddha-image-in-ruined-buddhist-temple.jpg?s=1024x1024&w=is&k=20&c=6EltbyHjFuFePax0q_arZb4oQLWaXarpqPyKa8vc9Hw=',
        alt: 'Templo Budista em Pedra Bela',
        title: 'Templo Budista',
        category: 'nature',
        isExternal: true
      },
      {
        src: 'https://imagedelivery.net/EafvxYlk8cSUsWEWsetEdQ/d0e1e896-350a-488d-bc12-66cd2db6d500/w=1000',
        alt: 'Passeio de quadriciclo',
        title: 'Passeio de Quadriciclo',
        category: 'adventure',
        isExternal: true
      },
      {
        src: 'https://www.escaladas.com.br/img/dinamica/montanha/1183/principal/1183-160521-1.png',
        alt: 'Escalada nas pedras de Pedra Bela',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true
      },
      {
        src: 'https://visitesocorrosp.com.br/content/images/2024/04/Facebook-Pedra-Bela-Vista.jpg',
        alt: 'Vista panorâmica das montanhas',
        title: 'Vista Panorâmica',
        category: 'nature',
        isExternal: true
      },
      {
        src: 'https://www.guapposocorro.com.br/wp-content/uploads/2019/01/pedra-bela-vista-socorro-sp-1024x576_destaq.jpg',
        alt: 'Pôr do sol em Pedra Bela',
        title: 'Pôr do Sol',
        category: 'nature',
        isExternal: true
      }
    ]),
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      adventure: 'Aventura',
      nature: 'Natureza',
      waterfalls: 'Cachoeiras'
    }
  };

  activities = [
    {
      id: 'zipline',
      name: 'Tirolesa',
      description: 'Tirolesa de 2km - a maior da América Latina',
      icon: '🚁',
      difficulty: 'easy' as const,
      duration: '1min 40s',
      price: 4000 // R$ 40,00
    },
    {
      id: 'rock-climbing',
      name: 'Escalada',
      description: 'Escalada na Pedra do Santuário e Pedra Maria Antônia',
      icon: '🧗',
      difficulty: 'medium' as const
    },
    {
      id: 'waterfalls',
      name: 'Cachoeiras',
      description: 'Banho nas cachoeiras Boca da Mata e Antônio Souza',
      icon: '💧',
      difficulty: 'easy' as const
    },
    {
      id: 'atv',
      name: 'Quadriciclo',
      description: 'Passeios ecológicos de quadriciclo',
      icon: '🏍️',
      difficulty: 'easy' as const,
      price: 9000 // R$ 90,00 - R$ 160,00
    }
  ];

  logistics = this.createLogisticsInfo(
    {
      openTime: '9h',
      closeTime: '17h',
      notes: 'Funcionamento nos finais de semana e feriados'
    },
    'Portal da Cidade - Pedra Bela',
    [
      'Tirolesa funciona apenas nos finais de semana e feriados',
      'Entrada gratuita nas cachoeiras',
      'Consultar agenda do Templo Budista',
      'Atividades sujeitas às condições climáticas'
    ],
    [
      'Traga roupas de banho para as cachoeiras',
      'Use protetor solar',
      'Calçados adequados para trilha',
      'Leve água e lanche extra',
      'Respeite a natureza local'
    ]
  );

  community = this.createCommunityInfo(
    ['equipamentos-verticais'],
    ['ana-silva', 'marcos-ishino'],
    ['pre-climb-check', 'emergency-descent'],
    'pedra-bela'
  );

  seo = this.createSEOInfo(
    'XperienceClimb - Aventura Completa em Pedra Bela',
    'Viva uma experiência única com escalada, tirolesa de 2km e cachoeiras em Pedra Bela. Aventura completa na natureza paulista.',
    ['pedra bela', 'tirolesa', 'escalada', 'cachoeiras', 'aventura', 'pedra do santuário', 'pedra maria antônia'],
    '/images/themes/pedra-bela/og-image.jpg'
  );

  visual = this.createVisualTheme(
    '#d84315', // Deep orange-red for adventure
    '#bf360c',
    '#a52714',
    '#ff7043', // Bright orange accent
    '#fff8f5', // Warm light background
    '#ffffff',
    '#3e2723', // Dark brown text
    '#6d4c41',
    '#ffccbc',
    '#d84315',
    '#ff5722',
    'rgba(216, 67, 21, 0.7)', // Orange overlay
    '#ffffff'
  );
}

// Export an instance of the theme for backward compatibility
export const pedraBellaTheme = new PedraBellaTheme().getThemeConfig();
