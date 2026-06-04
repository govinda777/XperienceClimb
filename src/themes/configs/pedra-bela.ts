import { BaseTheme } from './base-theme';
import pedraBelaMain from '@/assets/images/themes/pedra-bela/pedra-bela-main.jpg';
import pedraBela1 from '@/assets/images/themes/pedra-bela/pedra-bela-1.jpg';
import pedraBela2 from '@/assets/images/themes/pedra-bela/pedra-bela-2.jpg';
import pedraBela3 from '@/assets/images/themes/pedra-bela/pedra-bela-3.jpg';
import pedraBela5 from '@/assets/images/themes/pedra-bela/pedra-bela-5.jpg';
import pedraBela6 from '@/assets/images/themes/pedra-bela/pedra-bela-6.jpg';

export class PedraBellaTheme extends BaseTheme {
  // ... (rest of the file until the image to replace)

  // I cannot use replace_file_content for non-contiguous changes (import + array usage).
  // I must use multi_replace_file_content.

  id = 'pedra-bela';
  name = 'Pedra Bela';

  location = this.createLocationInfo(
    'Pedra Bela',
    'Pedra Bela',
    'Pedra Bela',
    'São Paulo',
    '119km de São Paulo',
    { lat: -22.78544, lng: -46.45512 }, // Coordenadas aproximadas
    'https://www.google.com/maps/dir/?api=1&destination=-22.78544,-46.45512&travelmode=driving',
    [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Fernão Dias (BR 381) até Bragança Paulista',
      },
      {
        step: 2,
        title: 'Rodovia Capitão Bardoino',
        description: 'Continue pela Rodovia Capitão Bardoino (BR 146)',
      },
      {
        step: 3,
        title: 'Chegada',
        description: 'Siga pela Rodovia José Bueno de Miranda até Pedra Bela',
      },
    ]
  );

  content = this.createContentInfo(
    {
      title: 'XPERIENCE CLIMB',
      subtitle: 'Parque de Aventuras em `Pedra Bela`',
      description: 'Tirolesa gigante, escalada, cachoeiras e muito mais!',
    },
    {
      title: 'Aventura Completa na Natureza de Pedra Bela',
      description:
        'Pedra Bela oferece uma experiência única combinando escalada, tirolesa e contato com a natureza exuberante das montanhas paulistas. Um destino perfeito para quem busca aventura e tranquilidade.',
      highlights: [
        {
          icon: '🚁',
          title: 'Tirolesa Record Mundial',
          description:
            'A maior tirolesa da América Latina com 1.950m de extensão e velocidade de até 80km/h - uma experiência inesquecível de voo!',
        },
        {
          icon: '🏍️',
          title: 'Múltiplas Aventuras',
          description:
            'Quadriciclo, escalada, cachoeiras e trilhas - um verdadeiro parque de aventuras com atividades para toda família.',
        },
        {
          icon: '🏔️',
          title: 'Montanhas Místicas',
          description:
            'Pedra do Santuário com sua igreja no topo e Pedra Maria Antônia oferecem experiências espirituais e vistas de 360°.',
        },
      ],
      infoBox: {
        title: 'Sobre Pedra Bela',
        content:
          'Pedra Bela é uma pequena cidade do interior de São Paulo conhecida por sua natureza exuberante e atividades de aventura. Com montanhas imponentes, cachoeiras cristalinas e a famosa tirolesa de 2km, é um destino perfeito para quem busca experiências únicas na natureza. A cidade também abriga um templo budista e oferece diversas trilhas ecológicas.',
      },
      image: pedraBelaMain,
    }
  );

  gallery = {
    images: this.processGalleryImages([
      {
        src: pedraBela1,
        alt: 'Pedra Bela',
        title: 'Pedra Bela',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: pedraBela2,
        alt: 'Pedra Bela',
        title: 'Pedra Bela',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: pedraBela3,
        alt: 'Pedra Bela',
        title: 'Pedra Bela',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: pedraBela5,
        alt: 'Pedra Bela',
        title: 'Pedra Bela',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: 'https://static.wixstatic.com/media/c08e80_87a6d58aa4be4e6191d3361aa7998f8a~mv2.jpg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c08e80_87a6d58aa4be4e6191d3361aa7998f8a~mv2.jpg',
        alt: 'Tirolesa de 2km em Pedra Bela',
        title: 'Tirolesa Gigante',
        category: 'adventure',
        isExternal: true,
      },
      {
        src: pedraBela6,
        alt: 'Pedra Bela',
        title: 'Pedra Bela',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: 'https://visitesocorrosp.com.br/content/images/2024/09/VS_POSTBLOG1_FEED1-3.png',
        alt: 'Vista da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'climb',
        isExternal: true,
      },
      {
        src: 'https://onofftransportes.com.br/wp-content/uploads/2017/10/1-maior-santuario-pedra-bela.jpg',
        alt: 'Igreja no cume da Pedra do Santuário',
        title: 'Igreja do Santuário',
        category: 'climb',
        isExternal: true,
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela--restaurante-muvuca-caipira.mp4',
        alt: 'Restaurante Muvuca Caipira',
        title: 'Muvuca Caipira',
        category: 'adventure',
        isVideo: true,
      },
    ]),
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      adventure: 'Aventura',
      nature: 'Natureza',
      waterfalls: 'Cachoeiras',
    },
  };

  activities = [
    {
      id: 'zipline',
      name: 'Tirolesa',
      description: 'Tirolesa de 2km - a maior da América Latina',
      icon: '🚁',
      difficulty: 'easy' as const,
      duration: '1min 40s',
      price: 4000, // R$ 40,00
    },
    {
      id: 'rock-climbing',
      name: 'Escalada',
      description: 'Escalada na Pedra do Santuário e Pedra Maria Antônia',
      icon: '🧗',
      difficulty: 'medium' as const,
    },
    {
      id: 'waterfalls',
      name: 'Cachoeiras',
      description: 'Banho nas cachoeiras Boca da Mata e Antônio Souza',
      icon: '💧',
      difficulty: 'easy' as const,
    },
    {
      id: 'atv',
      name: 'Quadriciclo',
      description: 'Passeios ecológicos de quadriciclo',
      icon: '🏍️',
      difficulty: 'easy' as const,
      price: 9000, // R$ 90,00 - R$ 160,00
    },
  ];

  logistics = this.createLogisticsInfo(
    {
      openTime: '9h',
      closeTime: '17h',
      notes: 'Funcionamento nos finais de semana e feriados',
    },
    'Portal da Cidade - Pedra Bela',
    [
      'Tirolesa funciona apenas nos finais de semana e feriados',
      'Entrada gratuita nas cachoeiras',
      'Consultar agenda do Templo Budista',
      'Atividades sujeitas às condições climáticas',
    ],
    [
      'Traga roupas de banho para as cachoeiras',
      'Use protetor solar',
      'Calçados adequados para trilha',
      'Leve água e lanche extra',
      'Respeite a natureza local',
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
    [
      'pedra bela',
      'tirolesa',
      'escalada',
      'cachoeiras',
      'aventura',
      'pedra do santuário',
      'pedra maria antônia',
    ],
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
