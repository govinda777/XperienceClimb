import { BaseTheme } from './base-theme';
import type {
  BrandConfig,
  HeroConfig,
  DestinationSectionConfig,
  BeginnerSectionConfig,
  CalendarSectionConfig,
  PackagesSectionConfig,
  ScheduleSectionConfig,
  SafetySectionConfig,
  TimelineSectionConfig,
  GallerySectionConfig,
  CommunitySectionConfig,
  LocationSectionConfig,
  FAQSectionConfig,
  FooterConfig,
  FloatingCtaConfig,
} from '../types';

export class PedraBellaTheme extends BaseTheme {
  id = 'pedra-bela';
  name = 'Pedra Bela';

  // =========================================================================
  // 1. MARCA, HEADER & NAVBAR
  // =========================================================================
  brand: BrandConfig = {
    name: 'XPERIENCE',
    accent: 'climb',
    tagline: 'Pedra Bela · SP',
    icon: '/assets/logo.svg',
    navLinks: [
      { label: 'O Lugar', href: '#lugar' },
      { label: 'Batismo', href: '#batismo' },
      { label: 'Próximas Saídas', href: '#calendario' },
      { label: 'Pacotes', href: '#pacotes' },
      { label: 'Galeria', href: '#galeria' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: {
      label: 'Agendar Ida ↗',
      href: '#pacotes',
    },
  };

  // =========================================================================
  // 2. HERO SECTION
  // =========================================================================
  heroSection: HeroConfig = {
    badge: 'VIVÊNCIA · 01 | ESCALADA EM ROCHA',
    title: {
      line1: 'VIVÊNCIA DE',
      line2: 'ESCALADA EM',
      line3Highlight: 'ROCHA',
      line4Prefix: 'em conexão com a',
      line4Italic: 'natureza.',
    },
    description:
      'Viva a experiência autêntica de subir a rocha natural de Pedra Bela. Guias credenciados, equipamentos UIAA/CE, seguro de aventura e almoço caipira completo no mirante.',
    primaryCta: {
      label: 'AGENDAR ADVENTURA ›',
      href: '#pacotes',
    },
    secondaryCta: {
      label: 'Como Funciona',
      href: '#batismo',
    },
    photo: {
      src: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
      alt: 'Vivência de Escalada na Rocha em Pedra Bela - SP',
      topMetaBadge: "GPS: 22°42'S 46°26'W · ALT 1.120M",
      bottomMetaBadge: 'PEDRA DO SANTUÁRIO · 119 KM DE SP',
      sideBadges: ['Setor Escola', 'Granito Natural'],
      authorQuote: {
        author: 'Vivência de Batismo',
        quote: '"Minha primeira vez na rocha natural!"',
        icon: '🧗',
      },
      botanicalLeavesSvg: '/assets/icons/botanical-leaves.svg',
    },
  };

  // =========================================================================
  // 3. MONTANHAS DE PEDRA BELA (#lugar)
  // =========================================================================
  destinationSection: DestinationSectionConfig = {
    badge: 'CAP · 01 · O LUGAR',
    title: 'ESCALADA EM',
    titleAccent: 'Pedra Bela',
    subtitle:
      'Paredões monumentais da Serra da Mantiqueira com setor escola perfeito para iniciantes.',
    cards: [
      {
        id: 'pedra-do-santuario',
        badgeNumber: '01',
        badgeColor: 'forest',
        title: 'Pedra do Santuário',
        description:
          'Monólito monumental com vias de escalada em granito bem protegidas e vista panorâmica de 360° no topo.',
        tag: '📍 Campo Escola de Escalada',
        image: '/images/themes/pedra-bela/escalada-1.png',
        alt: 'Pedra do Santuário',
      },
      {
        id: 'almoco-no-mirante',
        badgeNumber: '03',
        badgeColor: 'sun',
        title: 'Almoço no Mirante',
        description:
          'Almoço caipira completo à vontade no fogão a lenha após a rocha, finalizado com café no mirante ao pôr do sol.',
        tag: '☕ Fogão a lenha & Mirante',
        image: '/images/themes/pedra-bela/restaurante.jpg',
        alt: 'Almoço no Mirante',
      },
    ],
  };

  // =========================================================================
  // 4. NUNCA ESCALOU? BATISMO (#batismo)
  // =========================================================================
  beginnerSection: BeginnerSectionConfig = {
    badge: 'CAP · 02 · BATISMO INICIANTE',
    title: 'NUNCA ESCALOU?',
    titleAccent: 'ótimo, você é quem buscamos.',
    description:
      'Você não precisa de força muscular nem de equipamento próprio. O batismo foi feito para você vivenciar a rocha pela primeira vez com acolhimento, instrução paciente e segurança total.',
    polaroid: {
      badge: 'SETOR · ESCOLA',
      illustrationSvg: '/assets/icons/badge-iniciantes.svg',
      alt: 'Iniciantes na Rocha',
      title: 'Zero Experiência? Perfeito!',
      description:
        'Você sobe no seu próprio ritmo com a corda sempre tensionada. Se quiser subir 3 metros ou chegar ao topo, a decisão é sua!',
      footerNote: '⭐ Vagas exclusivas e limitadas por saída',
    },
    benefitCards: [
      {
        tag: 'BENEFÍCIO',
        tagColor: 'terracotta',
        title: 'Instrutor ao Seu Lado',
        description:
          'Cada pisada e movimento é guiado com técnica e incentivo para você superar seus limites.',
      },
      {
        tag: 'SEGURANÇA',
        tagColor: 'forest',
        title: 'Cento Equipamento Seguro',
        description:
          'Equipamentos homologados internacionais UIAA/CE colocados e ajustados pelo guia.',
      },
    ],
  };

  // =========================================================================
  // 5. CALENDÁRIO & PRÓXIMAS SAÍDAS (#calendario)
  // =========================================================================
  calendarSection: CalendarSectionConfig = {
    badge: 'AGENDA · EXPEDIÇÕES · BIMESTRAL',
    title: 'PRÓXIMAS SAÍDAS',
    titleAccent: 'confirmadas',
    subtitle:
      'Turmas limitadas a no máximo 8 pessoas por saída para garantir segurança máxima e ritmo personalizado na rocha.',
    items: [
      {
        day: '28',
        monthYear: 'NOV / 2026',
        status: 'Vagas Abertas',
        statusColor: 'forest',
        durationType: '1 Dia · Sábado',
        title: 'Pedra Bela · Pedra do Santuário',
        location: 'Pedra Bela · Pedra do Santuário',
        distance: '📍 119 km de São Paulo',
        features: [
          'Setor Escola (vias fáceis de granito)',
          'Equipamentos UIAA/CE inclusos',
          'Almoço Caipira no Mirante',
        ],
        spots: '6 vagas disponíveis',
        spotsColor: 'forest',
        ctaText: 'Selecionar Esta Data',
        ctaHref: '#pacotes',
      },
      {
        day: '19',
        monthYear: 'DEZ / 2026',
        status: 'Confirmado',
        statusColor: 'terracotta',
        ribbon: 'Fim de Ano',
        durationType: '1 Dia · Sábado',
        title: 'Pedra Bela · Especial de Natal',
        location: 'Pedra Bela · Especial de Natal',
        distance: '📍 119 km de São Paulo',
        features: [
          'Batismo e Vias Avançadas',
          'Opção de Mega Tirolesa 1.950m',
          'Brinde Especial de Encerramento',
        ],
        spots: '4 vagas restantes!',
        spotsColor: 'terracotta',
        ctaText: 'Selecionar Esta Data',
        ctaHref: '#pacotes',
      },
      {
        day: '23',
        monthYear: 'JAN / 2027',
        status: 'Pré-Reserva',
        statusColor: 'sun',
        durationType: 'Temporada 2027',
        title: 'Pedra Bela · Temporada Verão',
        location: 'Pedra Bela · Temporada Verão',
        distance: '📍 119 km de São Paulo',
        features: [
          'Horário matutino com rocha na sombra',
          'Banho nas cachoeiras no pós-escalada',
          'Almoço Caipira no Mirante',
        ],
        spots: '8 vagas abertas',
        spotsColor: 'sun',
        ctaText: 'Lista de Espera WhatsApp',
        ctaHref:
          'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%2023%20de%20Janeiro%20em%20Pedra%20Bela',
        isExternal: true,
      },
    ],
  };

  // =========================================================================
  // 6. PACOTES (#pacotes)
  // =========================================================================
  packagesSection: PackagesSectionConfig = {
    badge: 'CAP · 03 · PACOTES & VIAS',
    title: 'ESCOLHA SUA',
    titleAccent: 'via de aventura',
    nextConfirmedDate: {
      prefix: 'Próxima Saída Confirmada:',
      date: '28 de Novembro de 2026',
      otherDateCta: {
        label: 'Solicitar Outra Data',
        href: 'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20outra%20data%20para%20a%20viv%C3%AAncia%20em%20Pedra%20Bela.',
      },
    },
    items: [
      {
        id: 'agarrao',
        badge: 'VIA · BATISMO',
        badgeColor: 'forest',
        statusBadge: 'MAIS PROCURADO',
        headerColor: 'forest',
        prefix: 'PACOTE',
        name: 'AGARRÃO',
        duration: '1 dia',
        level: 'Campo Escola',
        levelColor: 'text-forest-700',
        description: 'Curta uma vivência de escalada na natureza.',
        originalPrice: 330,
        originalPriceFormatted: 'R$ 330,00',
        price: 277,
        priceFormatted: 'R$ 277,00',
        priceUnit: '/ pessoa',
        installment: 'Parcelamento em até 3x sem juros',
        features: [
          'Escalada em rocha natural',
          'Equipamento de segurança',
          'Instrutor experiente',
          'Seguro Aventura',
          'Saboroso Almoço (restaurante à vontade)',
          'Pôr do Sol Mirante com café',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida'],
        disabled: false,
        ctaText: 'Adicionar ao Carrinho',
        ctaHref: '#checkout',
        buttonStyle: 'terracotta',
      },
      {
        id: 'crux',
        badge: 'CRUX · INTERMEDIÁRIO',
        badgeColor: 'terracotta',
        statusBadge: 'INDISPONÍVEL',
        headerColor: 'terracotta',
        prefix: 'PACOTE',
        name: 'CRUX',
        duration: '1 dia',
        level: 'Intermediário',
        levelColor: 'text-terracotta-500',
        description: 'Aproveite seu dia de escalada e um descanso merecido.',
        originalPrice: 510,
        originalPriceFormatted: 'R$ 510,00',
        price: 447,
        priceFormatted: 'R$ 447,00',
        priceUnit: '/ pessoa',
        installment: 'Opção com pernoite em pousada acolhedora',
        features: [
          'Escalada em rocha natural',
          'Equipamento de segurança',
          'Instrutor experiente',
          'Seguro Aventura',
          'Hospedagem',
          'Saboroso Almoço (restaurante à vontade)',
          'Pôr do Sol Mirante com café',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida'],
        statusText: 'Indisponível',
        statusSubtext: 'Temporariamente sem vagas',
        disabled: true,
        ctaText: 'Entrar na Lista de Espera',
        ctaHref:
          'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%20o%20Pacote%20CRUX%20em%20Pedra%20Bela.',
        buttonStyle: 'disabled',
      },
      {
        id: 'alma-vertical',
        badge: 'CUME · AVANÇADO',
        badgeColor: 'forest-dark',
        statusBadge: 'INDISPONÍVEL',
        headerColor: 'forest-dark',
        prefix: 'PACOTE',
        name: 'ALMA VERTICAL',
        duration: '2 dias',
        level: 'Avançado / 2 Dias',
        levelColor: 'text-forest-700',
        description: 'Seu fim de semana intenso de escalada e aventura.',
        originalPrice: 750,
        originalPriceFormatted: 'R$ 750,00',
        price: 667,
        priceFormatted: 'R$ 667,00',
        priceUnit: '/ pessoa',
        installment: 'Fim de semana completo de imersão na rocha',
        features: [
          'Escalada em rocha natural',
          'Equipamento de segurança',
          'Instrutor experiente',
          'Seguro Aventura',
          'Hospedagem + Café da manhã completo',
          'Saboroso Almoço (restaurante à vontade)',
          'Pôr do Sol Mirante com café',
          'Mais um super dia extra de escalada',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida'],
        statusText: 'Indisponível',
        statusSubtext: 'Temporariamente sem vagas',
        disabled: true,
        ctaText: 'Entrar na Lista de Espera',
        ctaHref:
          'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%20o%20Pacote%20ALMA%20VERTICAL%20em%20Pedra%20Bela.',
        buttonStyle: 'disabled',
      },
    ],
    annualCard: {
      badge: '👑 PROGRAMA ANUAL DE AVENTURA',
      title: 'XPERIENCE ANUAL',
      description:
        'A jornada definitiva: uma saída a cada 2 meses para lugares surpreendentes com transporte executivo de SP e suporte VIP.',
      duration: '12 Meses · 6 Saídas Exclusivas',
      features: [
        '6 Saídas exclusivas por ano',
        'Transporte ida e volta incluso (a partir de São Paulo capital)',
        'Almoço completo em cada destino',
        'Roteiros variados e inéditos',
        'Todo equipamento e instrução inclusos',
        'Comunidade exclusiva de aventureiros',
      ],
      bonusTitle: 'BÔNUS EXCLUSIVOS:',
      bonus: ['Kit Xperience exclusivo (Mochila técnica, camiseta e cantil)'],
      ctaText: 'Entrar na Lista VIP WhatsApp',
      ctaHref:
        'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20VIP%20do%20Programa%20Xperience%20Anual.',
    },
  };

  // =========================================================================
  // 8. PROGRAMAÇÃO & O QUE LEVAR (#programacao)
  // =========================================================================
  scheduleSection: ScheduleSectionConfig = {
    badge: 'CAP · 04 · LOGÍSTICA & OPERAÇÃO',
    title: 'PROGRAMAÇÃO &',
    titleAccent: 'o que levar',
    hoursCard: {
      icon: '⏰',
      tag: 'JANELA OPERACIONAL',
      time: '08:30h às 18:00h',
      description:
        'Início com recepção e café na Padaria São João (08:30h). Término previsto no Mirante com o pôr do sol (18:00h).',
    },
    checklistCard: {
      icon: '🎒',
      title: 'O que levar na mochila',
      items: [
        'Roupas confortáveis (calça flexível de ginástica ou bermuda e camiseta leve)',
        'Tênis fechado esportivo com solado aderente (não usar chinelos ou sandálias)',
        'Garrafa de água (mínimo 1,5L por pessoa para hidratação)',
        'Protetor solar, repelente e óculos escuros',
        'Agasalho corta-vento ou moletom leve para o fim de tarde no mirante',
      ],
    },
    corporateCard: {
      badge: '🏢 EXPEDIÇÕES CORPORATIVAS',
      title: 'Team Building na Rocha',
      description:
        'Leve sua liderança e time para vivenciar confiança, comunicação e superação mútua no ambiente natural da rocha.',
      ctaText: 'Solicitar Proposta Corporativa',
      ctaHref:
        'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20uma%20proposta%20de%20Team%20Building%20corporativo',
    },
    guideSupportCard: {
      badge: '💬 CANAL DIRETO',
      title: 'Dúvidas com um Guia?',
      description:
        'Fale diretamente com os instrutores sobre nível de esforço, calçados adequados ou qualquer receio antes de reservar.',
      ctaText: 'Falar com Guia Certificado',
      ctaHref:
        'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20técnica%20com%20um%20guia%20sobre%20a%20escalada',
    },
  };

  // =========================================================================
  // 9. SEGURANÇA & INTEGRIDADE (#seguranca)
  // =========================================================================
  safetySection: SafetySectionConfig = {
    badge: 'CAP · 05 · SEGURANÇA & PROTOCOLO',
    title: 'SUA INTEGRIDADE É',
    titleAccent: 'inegociável',
    equipmentIcons: [
      { src: '/assets/icons/icon-camping-chair.svg', alt: 'Cadeira Camping' },
      { src: '/assets/icons/icon-corda.svg', alt: 'Corda Nó 8' },
      { src: '/assets/icons/icon-mosquetao.svg', alt: 'Mosquetão UIAA' },
      { src: '/assets/icons/selo-uiaa.svg', alt: 'Selo UIAA CE' },
      { src: '/assets/icons/icon-capacete.svg', alt: 'Capacete UIAA' },
    ],
    protocols: [
      {
        icon: '🛡️',
        title: 'Escudo e profissionais',
        description:
          'Instrutores certificados com anos de experiência em montanha acompanhando cada centímetro da subida com ancoragem em redundância.',
      },
      {
        icon: '📋',
        title: 'Profissionalismo',
        description:
          'Seguro Aventura individual emitido antes de cada saída e equipamentos inspecionados rigorosamente sob padrão UIAA e CE.',
      },
    ],
  };

  // =========================================================================
  // 10. ITINERÁRIO DE CAMPO (#timeline)
  // =========================================================================
  timelineSection: TimelineSectionConfig = {
    badge: 'ITINERÁRIO DE CAMPO',
    title: 'COMO SERÁ O SEU DIA',
    titleAccent: 'na rocha',
    subtitle:
      'Uma jornada meticulosamente planejada do primeiro contato com a rocha até a celebração do pôr do sol.',
    events: [
      {
        time: '09:00 - 15:30',
        activity: 'Escalada na rocha',
        icon: '🧗',
        color: 'forest',
      },
      {
        time: '16:00 - 17:00',
        activity: 'Saboroso almoço',
        icon: '🍽️',
        color: 'terracotta',
      },
      {
        time: '18:00',
        activity: 'Curtindo o Pôr do Sol',
        icon: '🌅',
        color: 'sun',
      },
    ],
  };

  // =========================================================================
  // 11. GALERIA DE MOMENTOS REAIS (#galeria)
  // =========================================================================
  gallerySection: GallerySectionConfig = {
    badge: 'REGISTROS · EXPERIÊNCIAS · AUTÊNTICAS',
    title: 'GALERIA DE',
    titleAccent: 'momentos reais',
    subtitle:
      'Sem atores nem poses forçadas. Fotos e gravações autênticas das nossas saídas na rocha de Pedra Bela.',
    categories: [
      { id: 'all', label: 'Todas' },
      { id: 'escalada', label: 'Escalada' },
      { id: 'paisagem', label: 'Cume & Paisagem' },
      { id: 'videos', label: 'Vídeos' },
    ],
    images: [
      {
        src: '/images/themes/pedra-bela/pedra-bela-1.jpg',
        alt: 'Instrutor orientando participante no batismo de escalada em rocha em Pedra Bela SP',
        tag: 'Instrução',
        tagColor: 'forest',
        title: 'Batismo de Escalada em Rocha',
        category: 'escalada',
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela-2.jpg',
        alt: 'Aventureiros equipados com capacetes e baudriers homologados na base das vias',
        tag: 'Equipamentos',
        tagColor: 'terracotta',
        title: 'Preparação Técnica e Equipamentos',
        category: 'escalada',
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela-3.jpg',
        alt: 'Vista aberta e panorâmica da cordilheira da Mantiqueira a partir de Pedra Bela',
        tag: 'Mantiqueira',
        tagColor: 'forest',
        title: 'Mar de Montanhas da Mantiqueira',
        category: 'escalada',
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela-5.jpg',
        alt: 'Escalador superando via escola na rocha natural com acompanhamento e segurança total',
        tag: 'Superação',
        tagColor: 'forest',
        title: 'Conquista da Primeira Via',
        category: 'paisagem',
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela-6.jpg',
        alt: 'Aventureiros comemorando a conquista do topo durante o entardecer no mirante',
        tag: 'Pôr do Sol',
        tagColor: 'sun',
        title: 'Celebração no Cume',
        category: 'paisagem',
      },
      {
        src: '/images/themes/pedra-bela/pedra-bela-main.jpg',
        alt: 'Foto ampla monumental da Pedra do Santuário destacando-se no relevo',
        tag: 'Monólito',
        tagColor: 'forest',
        title: 'O Gigante Monólito de Pedra Bela',
        category: 'paisagem',
      },
      {
        src: 'https://visitesocorrosp.com.br/content/images/2024/09/VS_POSTBLOG1_FEED1-3.png',
        alt: 'Ângulo panorâmico dos vales e montanhas ao redor da rocha',
        tag: 'Mirante 360°',
        tagColor: 'terracotta',
        title: 'Mirante Panorâmico da Região',
        category: 'paisagem',
        isExternal: true,
      },
      {
        src: 'https://onofftransportes.com.br/wp-content/uploads/2017/10/1-maior-santuario-pedra-bela.jpg',
        alt: 'Igreja no cume da Pedra do Santuário em Pedra Bela SP',
        tag: 'Cume Histórico',
        tagColor: 'sun',
        title: 'Capela Histórica no Cume',
        category: 'paisagem',
        isExternal: true,
      },
    ],
    videos: [
      {
        src: '/images/themes/pedra-bela/pedra-bela--restaurante-muvuca-caipira.mp4',
        tag: 'VÍDEO REAL · GASTRONOMIA',
        tagColor: 'terracotta',
        title: 'Almoço no Restaurante Muvuca Caipira',
        icon: '🍲',
        category: 'videos',
      },
      {
        src: '/images/themes/pedra-bela/XperienceClimb-03.mp4',
        tag: 'VÍDEO REAL · ESCALADA',
        tagColor: 'forest',
        title: 'A Emoção do Batismo na Rocha',
        icon: '🧗',
        category: 'videos',
      },
    ],
  };

  // =========================================================================
  // 12. NOSSA COMUNIDADE (#comunidade)
  // =========================================================================
  communitySection: CommunitySectionConfig = {
    title: 'NOSSA',
    titleAccent: 'COMUNIDADE',
    description:
      'Conheça os instrutores e locais que fazem parte da família XperienceClimb. Juntos, construímos experiências seguras e inesquecíveis.',
    stats: {
      instructorsCount: 1,
      locationsCount: 10,
    },
    instructors: [
      {
        name: 'Celso Ossamu',
        photo: '/images/themes/pedra-bela/escalada-1.png',
        rating: '⭐ 4.9/5',
        location: '📍 São Paulo, São Paulo',
        experience: '⛰️ 15 anos',
        clients: '👥 500 clientes',
        bio: 'Instrutor principal da XperienceClimb com mais de 15 anos de experiência em escalada. Especialista em escalada esportiva e tradicional, com foco em segurança e desenvolvimento técnico.',
        specialties: ['Escalada Esportiva', 'Escalada Tradicional', 'Resgate', 'Escalada Infantil'],
        certifications: [
          '• Instrutor de Escalada - CBME - Confederação Brasileira de Montanhismo e Escalada',
          '• Wilderness First Aid - NOLS Wilderness Medicine',
        ],
        priceRange: 'R$ 150 - R$ 350',
        whatsapp:
          'https://wa.me/5519997259691?text=Olá%20Celso!%20Vim%20pelo%20site%20da%20XperienceClimb',
        instagram: 'https://instagram.com/celsoossamu',
      },
    ],
    locations: [
      {
        name: 'Pedra do Santuário',
        location: '📍 Pedra Bela, São Paulo',
        difficulty: 'Fácil / Escola',
        description:
          'Monólito monumental de granito com vias de aderência perfeitas para quem está começando na escalada em rocha natural.',
        highlights: '✓ Setor Escola · 1.100m altitude · Mega Tirolesa',
        image: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
      },
      {
        name: 'Fazenda Ipanema - Morro Araçoiaba',
        location: '📍 Iperó, São Paulo',
        difficulty: 'Moderado',
        description:
          'Localizado na Floresta Nacional de Ipanema, Unidade de Conservação Federal com vias esportivas em rocha granítica e trilhas históricas.',
        highlights: '✓ Conservação Federal · Vias esportivas · Trilha histórica',
        image: '/images/themes/pedra-bela/paisagem-1.jpg',
      },
    ],
  };

  // =========================================================================
  // 13. COMO CHEGAR (#localizacao)
  // =========================================================================
  locationSection: LocationSectionConfig = {
    badge: 'ACESSO · ROTA · COORDENADAS GPS',
    title: 'COMO CHEGAR',
    titleAccent: 'a Pedra Bela',
    subtitle:
      'Localizada a apenas 119 km da capital paulista (aprox. 1h45 pela Rodovia Fernão Dias). Asfalto até o pé da rocha.',
    points: [
      {
        badge: 'Ponto 01 · Recepção (08:30h)',
        badgeColor: 'terracotta',
        subtitle: 'Centro da Cidade',
        title: 'Padaria São João',
        address: 'Rua Bernardino de Lima Paes, 07 - Centro, Pedra Bela - SP',
        notes: [
          {
            icon: '☕',
            text: 'Ponto oficial para tomar café da manhã juntos e tirar dúvidas com os guias.',
          },
          {
            icon: '🚗',
            text: 'Estacionamento público fácil ao redor da praça central da matriz.',
          },
        ],
        mapsUrl: 'https://maps.app.goo.gl/gpa6CQXj9JNVKGLe9',
        buttonText: 'Abrir Ponto 01 no Google Maps',
        buttonColor: 'forest',
      },
      {
        badge: 'Ponto 02 · Aventura (09:30h)',
        badgeColor: 'forest',
        subtitle: 'Campo Escola',
        title: 'Pedra do Santuário',
        address: 'Alto da Pedra do Santuário, Pedra Bela - SP',
        notes: [
          {
            icon: '📍',
            text: 'Coordenadas GPS: -22.7849482, -46.4549474',
          },
          {
            icon: '🅿️',
            text: 'Estacionamento gratuito aos pés da pedra, ao lado da base das vias de escalada.',
          },
        ],
        mapsUrl: 'https://maps.app.goo.gl/suSVQHwMHzgYfNsN8',
        buttonText: 'Abrir Campo Escola no Google Maps',
        buttonColor: 'terracotta',
      },
    ],
  };

  // =========================================================================
  // 14. PERGUNTAS FREQUENTES (#faq)
  // =========================================================================
  faqSection: FAQSectionConfig = {
    badge: 'FAQ · TIRE SUAS DÚVIDAS',
    title: 'PERGUNTAS',
    titleAccent: 'frequentes',
    subtitle: 'Tudo o que você precisa saber para subir na rocha com tranquilidade absoluta.',
    items: [
      {
        question: 'Preciso ter experiência prévia para participar?',
        answer:
          'Não! Mais de 85% das pessoas que sobem com a gente nunca calçaram uma sapatilha de escalada antes. As vias do Setor Escola da Pedra do Santuário foram escolhidas exatamente por oferecerem agarras generosas e inclinação amigável para o batismo.',
        isOpenByDefault: true,
      },
      {
        question: 'Tenho muito medo de altura. Eu consigo subir?',
        answer:
          'Com certeza. O medo de altura é um reflexo natural do ser humano. Na escalada top-rope, a corda fica ancorada no topo e presa à sua cadeirinha, sendo mantida permanentemente esticada pelo instrutor. Se você soltar as mãos, não cai: fica sentado confortavelmente no arnês. Você sobe até onde se sentir confortável.',
      },
      {
        question: 'O que está incluso no pacote de 1 dia?',
        answer:
          'Está incluso: instrução contínua com guias certificados, todos os equipamentos de segurança homologados UIAA/CE (capacete, baudrier, cordas, mosquetões), Seguro Aventura individual com cobertura médica e o almoço caipira completo no fogão a lenha no restaurante no mirante.',
      },
      {
        question: 'O que devo vestir e levar na mochila?',
        answer:
          'Vista roupas confortáveis e flexíveis (calça de ginástica/legging ou bermuda tactel, camiseta leve) e tênis esportivo com bom solado. Leve na mochila: garrafa de água (1,5L), protetor solar, repelente, óculos escuros, um agasalho leve para o fim do dia e documento original com foto.',
      },
      {
        question: 'E se chover no dia da atividade?',
        answer:
          'Nossa prioridade número um é a sua segurança. Caso haja previsão de chuva forte ou vento que comprometa a aderência no granito, a atividade é remarcada com até 24h de antecedência para uma nova data de sua escolha, sem qualquer taxa adicional.',
      },
    ],
  };

  // =========================================================================
  // 15. FOOTER COMPLETO (#footer)
  // =========================================================================
  footerSection: FooterConfig = {
    brand: {
      name: 'XPERIENCE',
      accent: 'climb',
      tagline: 'Pedra Bela · SP',
      description: 'Vivências transformadoras de escalada em rocha natural, ecoturismo e aventura.',
      seal: '🛡️ Homologado UIAA & CE',
      logo: '/assets/logo.svg',
    },
    navLinks: [
      { label: '01 · Natureza de Pedra Bela', href: '#lugar' },
      { label: '02 · Batismo de Escalada', href: '#batismo' },
      { label: '03 · Calendário de Saídas', href: '#calendario' },
      { label: '04 · Pacotes & Investimento', href: '#pacotes' },
      { label: '05 · Logística & Checklist', href: '#programacao' },
      { label: '06 · Itinerário do Dia', href: '#timeline' },
    ],
    experienceLinks: [
      { label: '07 · Galeria de Fotos e Vídeos', href: '#galeria' },
      { label: '08 · Protocolos de Segurança', href: '#seguranca' },
      { label: '09 · Guias & Instrutores', href: '#comunidade' },
      { label: '10 · Como Chegar', href: '#localizacao' },
      { label: '11 · Dúvidas Frequentes', href: '#faq' },
    ],
    contact: {
      whatsapp: 'https://wa.me/5511995413539',
      whatsappFormatted: '(11) 99541-3539',
      instagram: 'https://instagram.com/xperiencehubs',
      instagramHandle: '@xperiencehubs',
      email: 'marcosishino@gmail.com',
      ctaText: 'Agendar Minha Ida ↗',
      ctaHref: '#pacotes',
    },
    legal: {
      copyright:
        '© 2026 Xperience Climb. Todos os direitos reservados. CNPJ ativo. Feito para inspirar a vida ao ar livre.',
      privacyHref: '/politica-de-privacidade',
      termsHref: '/termos-de-uso',
      backToTopHref: '#hero',
    },
  };

  // =========================================================================
  // 16. BOTÃO FLUTUANTE DE RESERVA RÁPIDA (CartButton)
  // =========================================================================
  floatingCta: FloatingCtaConfig = {
    icon: '🧗',
    tag: 'Reserva Rápida',
    title: 'Agendar Vaga ↗',
    href: '#pacotes',
  };

  // =========================================================================
  // CAMPOS DE COMPATIBILIDADE RETROATIVA
  // =========================================================================
  location = this.createLocationInfo(
    'Xperience Climb',
    'Pedra do Santuário (Campo Escola)',
    'Pedra Bela',
    'São Paulo',
    '119km de São Paulo',
    { lat: -22.7849482, lng: -46.4549474 },
    'https://maps.app.goo.gl/suSVQHwMHzgYfNsN8',
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
    ],
    {
      name: 'Padaria São João',
      address: 'Rua Bernardino de Lima Paes, 07 - Centro',
      mapsUrl: 'https://maps.app.goo.gl/gpa6CQXj9JNVKGLe9',
      notes: 'Ponto de encontro às 08:30h para café da manhã, recepção e briefing inicial.',
    }
  );

  content = this.createContentInfo(
    {
      title: 'XPERIENCE CLIMB',
      subtitle: 'Viva a aventura de escalada em Pedra Bela',
      description: 'Tirolesa gigante, escalada, cachoeiras e muito mais!',
    },
    {
      title: 'Bem-vindo a Pedra Bela!',
      description:
        'Pedra Bela oferece uma experiência única combinando escalada, tirolesa e contato com a natureza exuberante das montanhas paulistas.',
      highlights: [
        {
          icon: '🚁',
          title: 'Tirolesa Recorde Mundial',
          description:
            'A maior tirolesa da América Latina com 1.950m de extensão e velocidade de até 80km/h.',
        },
        {
          icon: '🏔️',
          title: 'Montanhas Místicas',
          description: 'Pedra do Santuário com vista de 360° no cume.',
        },
      ],
      infoBox: {
        title: 'Sobre Pedra Bela',
        content:
          'Pedra Bela é uma pequena cidade do interior de São Paulo conhecida por sua natureza exuberante e atividades de aventura.',
      },
      image: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
    }
  );

  gallery = {
    images: this.processGalleryImages([
      {
        src: '/images/themes/pedra-bela/escalada-1.png',
        alt: 'Instrutor técnico orientando aluno no batismo de escalada em rocha na Pedra do Santuário em Pedra Bela SP',
        title: 'Batismo de Escalada em Rocha',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
        alt: 'Monólito da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: '/images/themes/pedra-bela/tirolesa-1.jpg',
        alt: 'Tirolesa de quase 2km em Pedra Bela',
        title: 'Mega Tirolesa',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: '/images/themes/pedra-bela/restaurante.jpg',
        alt: 'Almoço caipira no mirante',
        title: 'Almoço Caipira',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: '/images/themes/pedra-bela/paisagem-1.jpg',
        alt: 'Serra da Mantiqueira',
        title: 'Paisagem da Mantiqueira',
        category: 'adventure',
        isExternal: false,
      },
      {
        src: '/images/themes/pedra-bela/paisagem-2.jpg',
        alt: 'Pôr do sol no mirante',
        title: 'Pôr do Sol no Mirante',
        category: 'adventure',
        isExternal: false,
      },
    ]),
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      adventure: 'Aventura',
      nature: 'Natureza',
    },
    videos: this.gallerySection.videos,
  };

  activities = [
    {
      id: 'rock-climbing',
      name: 'Escalada',
      description: 'Escalada na Pedra do Santuário',
      icon: '🧗',
      difficulty: 'medium' as const,
    },
  ];

  logistics = this.createLogisticsInfo(
    {
      openTime: '08:30h',
      closeTime: '18:00h',
      notes: '',
    },
    'Padaria São João de Pedra Bela. Rua Bernardino de Lima Paes, n.º 07 - Centro, Pedra Bela - SP, 12990-000',
    ['Meeting Point às 08:30h na Padaria São João', 'Atividades sujeitas às condições climáticas'],
    ['Use protetor solar', 'Calçados adequados para trilha', 'Leve água e lanche extra']
  );

  beginner = this.createBeginnerInfo(
    'Nunca Escalou?',
    'Atividade desenhada para quem tem curiosidade, mas zero experiência anterior.',
    [
      {
        icon: '🧗',
        title: 'Campo Escola',
        description: 'Vias de nível fácil ideais para o primeiro contato.',
      },
    ],
    ''
  );

  timeline = [
    this.createTimelineEvent('09:00 - 15:30', 'Escalada na rocha'),
    this.createTimelineEvent('16:00 - 17:00', 'Saboroso almoço'),
    this.createTimelineEvent('18:00', 'Curtindo o Pôr do Sol'),
  ];

  community = this.createCommunityInfo(
    ['equipamentos-verticais'],
    ['celso-ossamu', 'marcos-ishino'],
    ['pre-climb-check', 'emergency-descent'],
    'pedra-bela'
  );

  seo = this.createSEOInfo(
    'Xperience Climb | Batismo e Escalada em Rocha em Pedra Bela - SP',
    'Viva o batismo de escalada em rocha natural em Pedra Bela - SP. Instrutores certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso.',
    [
      'escalada em pedra bela',
      'batismo de escalada sp',
      'escalada em rocha sp',
      'tirolesa pedra bela',
      'pedra do santuário',
      'turismo de aventura sp',
      'ecoturismo pedra bela',
      'campo escola de escalada',
    ],
    '/images/themes/pedra-bela/og-image.jpg'
  );

  visual = this.createVisualTheme(
    '#1B4332',
    '#153628',
    '#0E241B',
    '#C85A32',
    '#FAF8F5',
    '#FFFFFF',
    '#1A202C',
    '#4A5568',
    '#E8E3D7',
    '#1B4332',
    '#2D6A4F',
    'rgba(27, 67, 50, 0.7)',
    '#FFFFFF'
  );

  override getThemeConfig() {
    const base = super.getThemeConfig();
    return {
      ...base,
      brand: this.brand,
      heroSection: this.heroSection,
      destinationSection: this.destinationSection,
      beginnerSection: this.beginnerSection,
      calendarSection: this.calendarSection,
      packagesSection: this.packagesSection,
      scheduleSection: this.scheduleSection,
      safetySection: this.safetySection,
      timelineSection: this.timelineSection,
      gallerySection: this.gallerySection,
      communitySection: this.communitySection,
      locationSection: this.locationSection,
      faqSection: this.faqSection,
      footerSection: this.footerSection,
      floatingCta: this.floatingCta,
    };
  }
}

export const pedraBellaTheme = new PedraBellaTheme().getThemeConfig();
