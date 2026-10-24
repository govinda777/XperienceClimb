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

export class FazendaIpanemaTheme extends BaseTheme {
  id = 'fazenda-ipanema';
  name = 'Fazenda Ipanema';

  // =========================================================================
  // 1. MARCA, HEADER & NAVBAR
  // =========================================================================
  brand: BrandConfig = {
    name: 'XPERIENCE',
    accent: 'climb',
    tagline: 'Fazenda Ipanema · SP',
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
    badge: 'VIVÊNCIA · 02 | ESCALADA NA FLONA IPANEMA',
    title: {
      line1: 'VIVÊNCIA DE',
      line2: 'ESCALADA NA',
      line3Highlight: 'FAZENDA IPANEMA',
      line4Prefix: 'no coração da',
      line4Italic: 'Mata Atlântica.',
    },
    description:
      'Viva a experiência autêntica de escalar as rochas milenares de quartzito do Morro Araçoiaba, na Floresta Nacional de Ipanema (Iperó · SP). Guias credenciados, equipamentos UIAA/CE, seguro aventura e imersão histórica e ecológica.',
    primaryCta: {
      label: 'AGENDAR AVENTURA ›',
      href: '#pacotes',
    },
    secondaryCta: {
      label: 'Como Funciona',
      href: '#batismo',
    },
    photo: {
      src: '/images/themes/fazenda-ipanema/hero.jpg',
      alt: 'Vivência de Escalada na Rocha na Fazenda Ipanema (FLONA) - Iperó SP',
      topMetaBadge: "GPS: 23°25'S 47°35'W · ALT 950M",
      bottomMetaBadge: 'MORRO ARAÇOIABA · 120 KM DE SP',
      sideBadges: ['FLONA ICMBio', 'Quartzito Milenar'],
      authorQuote: {
        author: 'Vivência na FLONA',
        quote: '"Escalar cercado pela Mata Atlântica preservada!"',
        icon: '🌳',
      },
      botanicalLeavesSvg: '/assets/icons/botanical-leaves.svg',
    },
  };

  // =========================================================================
  // 3. O LUGAR - FAZENDA IPANEMA (#lugar)
  // =========================================================================
  destinationSection: DestinationSectionConfig = {
    badge: 'CAP · 01 · O LUGAR',
    title: 'ESCALADA NA',
    titleAccent: 'Fazenda Ipanema',
    subtitle:
      'Formações rochosas de 600 milhões de anos no Morro Araçoiaba, protegidas pela Floresta Nacional de Ipanema (ICMBio).',
    cards: [
      {
        id: 'morro-aracoiaba',
        badgeNumber: '01',
        badgeColor: 'forest',
        title: 'Morro Araçoiaba',
        description:
          'Paredões de quartzito e arenito milenar com setores sombreados, agarras anatômicas e vias escola perfeitas para iniciantes e esportistas.',
        tag: '📍 Setor de Escalada na FLONA',
        image: '/images/themes/fazenda-ipanema/escalada-1.jpg',
        alt: 'Escalador nas rochas do Morro Araçoiaba na Fazenda Ipanema',
      },
      {
        id: 'floresta-nacional-ipanema',
        badgeNumber: '02',
        badgeColor: 'terracotta',
        title: 'Unidade de Conservação Federal',
        description:
          'Aproximação por trilha ecológica sombreada no coração da Mata Atlântica preservada pelo ICMBio, com biodiversidade e mirantes naturais.',
        tag: '🌳 Floresta Nacional de Ipanema',
        image: '/images/themes/fazenda-ipanema/paisagem-1.jpg',
        alt: 'Mata Atlântica preservada na Floresta Nacional de Ipanema',
      },
      {
        id: 'patrimonio-historico-ipanema',
        badgeNumber: '03',
        badgeColor: 'sun',
        title: 'História & Geologia Milenar',
        description:
          'Além da escalada, conheça a histórica Real Fábrica de Ferro São João de Ipanema do século XIX e as trilhas históricas da Fazenda.',
        tag: '🏛️ Patrimônio Histórico & Natural',
        image: '/images/themes/fazenda-ipanema/paisagem-2.jpg',
        alt: 'Paisagem e patrimônio histórico da Fazenda Ipanema',
      },
    ],
  };

  // =========================================================================
  // 4. NUNCA ESCALOU? BATISMO (#batismo)
  // =========================================================================
  beginnerSection: BeginnerSectionConfig = {
    badge: 'CAP · 02 · BATISMO NA FLONA',
    title: 'PRIMEIRA VEZ NA FLONA?',
    titleAccent: 'a Fazenda Ipanema é perfeita para começar.',
    description:
      'A Floresta Nacional de Ipanema oferece o ambiente mais acolhedor do interior paulista para sua estreia na rocha: base plana na sombra das árvores, acesso controlado e vias escola seguras.',
    polaroid: {
      badge: 'SETOR · ESCOLA FLONA',
      illustrationSvg: '/assets/icons/badge-iniciantes.svg',
      alt: 'Iniciantes na Fazenda Ipanema',
      title: 'Ambiente Controlado & Seguro',
      description:
        'Você escala no seu ritmo com sistema top-rope e acompanhamento individualizado dos nossos instrutores credenciados.',
      footerNote: '⭐ Grupos reduzidos com autorização ICMBio',
    },
    benefitCards: [
      {
        tag: 'SOMBRA & CONFORTO',
        tagColor: 'forest',
        title: 'Base Sombreada na Mata',
        description:
          'Setores protegidos pela copa da Mata Atlântica, proporcionando conforto térmico durante toda a prática.',
      },
      {
        tag: 'SEGURANÇA UIAA/CE',
        tagColor: 'terracotta',
        title: 'Vias Escola Bem Protegidas',
        description:
          'Rotas de 15 a 25 metros com proteções fixas e equipamentos homologados internacionais UIAA/CE.',
      },
    ],
  };

  // =========================================================================
  // 5. CALENDÁRIO & PRÓXIMAS SAÍDAS (#calendario)
  // =========================================================================
  calendarSection: CalendarSectionConfig = {
    badge: 'AGENDA · EXPEDIÇÕES · FLONA IPANEMA',
    title: 'PRÓXIMAS SAÍDAS',
    titleAccent: 'Fazenda Ipanema',
    subtitle:
      'Turmas reduzidas de até 8 participantes por saída, respeitando as normas de conservação ambiental do ICMBio.',
    items: [
      {
        day: '05',
        monthYear: 'DEZ / 2026',
        status: 'Vagas Abertas',
        statusColor: 'forest',
        durationType: '1 Dia · Sábado',
        title: 'Fazenda Ipanema · Morro Araçoiaba',
        location: 'Fazenda Ipanema · Iperó - SP',
        distance: '📍 120 km de São Paulo',
        features: [
          'Setor Escola em rocha de quartzito',
          'Equipamentos UIAA/CE inclusos',
          'Trilha Ecológica na Mata Atlântica',
        ],
        spots: '6 vagas disponíveis',
        spotsColor: 'forest',
        ctaText: 'Selecionar Esta Data',
        ctaHref: '#pacotes',
      },
      {
        day: '16',
        monthYear: 'JAN / 2027',
        status: 'Confirmado',
        statusColor: 'terracotta',
        ribbon: 'Verão na Mata',
        durationType: '1 Dia · Sábado',
        title: 'Fazenda Ipanema · Especial FLONA',
        location: 'Fazenda Ipanema · Iperó - SP',
        distance: '📍 120 km de São Paulo',
        features: [
          'Setores sombreados na floresta',
          'Batismo e vias esportivas',
          'Visita opcional à Real Fábrica de Ferro',
        ],
        spots: '4 vagas restantes!',
        spotsColor: 'terracotta',
        ctaText: 'Selecionar Esta Data',
        ctaHref: '#pacotes',
      },
      {
        day: '13',
        monthYear: 'FEV / 2027',
        status: 'Pré-Reserva',
        statusColor: 'sun',
        durationType: 'Temporada 2027',
        title: 'Fazenda Ipanema · Imersão Rocha & História',
        location: 'Fazenda Ipanema · Iperó - SP',
        distance: '📍 120 km de São Paulo',
        features: [
          'Escalada técnica e batismo guiado',
          'Educação ambiental e geologia',
          'Seguro Aventura individual incluso',
        ],
        spots: '8 vagas abertas',
        spotsColor: 'sun',
        ctaText: 'Lista de Espera WhatsApp',
        ctaHref:
          'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%20a%20saída%20na%20Fazenda%20Ipanema',
        isExternal: true,
      },
    ],
  };

  // =========================================================================
  // 6. PACOTES (#pacotes)
  // =========================================================================
  packagesSection: PackagesSectionConfig = {
    badge: 'CAP · 03 · PACOTES & VIAS — FAZENDA IPANEMA',
    title: 'ESCOLHA SUA',
    titleAccent: 'via na Flona',
    nextConfirmedDate: {
      prefix: 'Próxima Saída Fazenda Ipanema:',
      date: '05 de Dezembro de 2026',
      otherDateCta: {
        label: 'Solicitar Outra Data',
        href: 'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20outra%20data%20para%20a%20viv%C3%AAncia%20na%20Fazenda%20Ipanema.',
      },
    },
    items: [
      {
        id: 'agarrao',
        badge: 'VIA · BATISMO FLONA',
        badgeColor: 'forest',
        statusBadge: 'MAIS PROCURADO',
        headerColor: 'forest',
        prefix: 'PACOTE',
        name: 'AGARRÃO',
        duration: '1 dia',
        level: 'Campo Escola FLONA',
        levelColor: 'text-forest-700',
        description: 'Vivência completa de escalada em rocha no Morro Araçoiaba (Fazenda Ipanema).',
        originalPrice: 330,
        originalPriceFormatted: 'R$ 330,00',
        price: 277,
        priceFormatted: 'R$ 277,00',
        priceUnit: '/ pessoa',
        installment: 'Parcelamento em até 3x sem juros',
        features: [
          'Escalada em rocha natural no Morro Araçoiaba',
          'Equipamento de segurança homologado UIAA/CE',
          'Instrutor certificado CBME',
          'Seguro Aventura individual',
          'Trilha ecológica guiada na Mata Atlântica',
          'Lanche de trilha e hidratação de apoio',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida & Educação Ambiental na FLONA'],
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
        description:
          'Escalada técnica nas vias clássicas da Fazenda Ipanema com descanso em pousada parceira.',
        originalPrice: 510,
        originalPriceFormatted: 'R$ 510,00',
        price: 447,
        priceFormatted: 'R$ 447,00',
        priceUnit: '/ pessoa',
        installment: 'Opção com pernoite em pousada na região de Iperó',
        features: [
          'Escalada em rocha natural (vias de IV a VI grau)',
          'Equipamento de segurança homologado UIAA/CE',
          'Instrutor experiente',
          'Seguro Aventura',
          'Hospedagem em pousada parceira',
          'Trilha histórica da Real Fábrica de Ferro',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida'],
        statusText: 'Indisponível',
        statusSubtext: 'Temporariamente sem vagas',
        disabled: true,
        ctaText: 'Entrar na Lista de Espera',
        ctaHref:
          'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%20o%20Pacote%20CRUX%20na%20Fazenda%20Ipanema.',
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
        description:
          'Fim de semana completo de imersão vertical e ecoturismo na Floresta Nacional de Ipanema.',
        originalPrice: 750,
        originalPriceFormatted: 'R$ 750,00',
        price: 667,
        priceFormatted: 'R$ 667,00',
        priceUnit: '/ pessoa',
        installment: 'Fim de semana completo de imersão na FLONA',
        features: [
          '2 dias de escalada no Morro Araçoiaba',
          'Equipamento completo UIAA/CE',
          'Instrutor certificado',
          'Seguro Aventura',
          'Hospedagem + Café da manhã reforçado',
          'Roteiro histórico completo na Fazenda Ipanema',
        ],
        bonusTitle: 'BÔNUS EXCLUSIVOS:',
        bonus: ['Coach de vida'],
        statusText: 'Indisponível',
        statusSubtext: 'Temporariamente sem vagas',
        disabled: true,
        ctaText: 'Entrar na Lista de Espera',
        ctaHref:
          'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20para%20o%20Pacote%20ALMA%20VERTICAL%20na%20Fazenda%20Ipanema.',
        buttonStyle: 'disabled',
      },
    ],
    corporateCard: {
      badge: '🏢 EXPEDIÇÕES CORPORATIVAS & TEAM BUILDING NA FLONA',
      title: 'XPERIENCE CORPORATIVO',
      description:
        'Leve sua equipe para a Floresta Nacional de Ipanema: dinâmicas de liderança, confiança mútua, sustentabilidade e superação em meio à Mata Atlântica preservada.',
      duration: '1 ou 2 Dias · Formato Sob Medida',
      features: [
        'Dinâmicas práticas de Team Building, liderança e ESG na natureza',
        'Transporte executivo ida e volta (a partir de São Paulo capital)',
        'Alimentação completa e estrutura de apoio no parque',
        'Acessível para todos os perfis (sem necessidade de experiência prévia)',
        'Guias certificados, autorização ICMBio, equipamentos UIAA/CE e Seguro Aventura',
        'Formato flexível: Day-use (1 dia) ou Imersão (2 dias)',
      ],
      bonusTitle: 'BÔNUS EXCLUSIVOS:',
      bonus: ['Facilitador de Team Building & Coach Executivo + Registro fotográfico da equipe'],
      rightTag: 'Grupos & Empresas',
      rightHighlight: 'SOB CONSULTA',
      ctaText: 'Solicitar Orçamento WhatsApp',
      ctaHref:
        'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20o%20Pacote%20Xperience%20Corporativo%20na%20Fazenda%20Ipanema.',
    },
    annualCard: {
      badge: '👑 PROGRAMA ANUAL DE AVENTURA',
      title: 'XPERIENCE ANUAL',
      description:
        'A jornada definitiva: uma saída a cada 2 meses incluindo Fazenda Ipanema, Pedra Bela e picos clássicos com transporte executivo de SP e suporte VIP.',
      duration: '12 Meses · 6 Saídas Exclusivas',
      features: [
        '6 Saídas exclusivas por ano (incluindo Fazenda Ipanema e Pedra Bela)',
        'Transporte ida e volta incluso (a partir de São Paulo capital)',
        'Almoço completo em cada destino',
        'Roteiros variados e inéditos',
        'Todo equipamento e instrução inclusos',
        'Comunidade exclusiva de aventureiros',
      ],
      bonusTitle: 'BÔNUS EXCLUSIVOS:',
      bonus: ['Kit Xperience exclusivo (Mochila técnica, camiseta e cantil)'],
      rightTag: 'Passaporte Exclusivo',
      rightHighlight: '12 VAGAS / ANO',
      ctaText: 'Entrar na Lista VIP WhatsApp',
      ctaHref:
        'https://wa.me/5511995413539?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20VIP%20do%20Programa%20Xperience%20Anual.',
    },
  };

  // =========================================================================
  // 8. PROGRAMAÇÃO & O QUE LEVAR (#programacao)
  // =========================================================================
  scheduleSection: ScheduleSectionConfig = {
    badge: 'CAP · 04 · LOGÍSTICA & OPERAÇÃO FLONA',
    title: 'PROGRAMAÇÃO &',
    titleAccent: 'o que levar',
    hoursCard: {
      icon: '⏰',
      tag: 'JANELA OPERACIONAL DO PARQUE (ICMBio)',
      time: '08:00h às 17:00h',
      description:
        'Encontro às 08:00h no Centro de Visitantes da Floresta Nacional de Ipanema para credenciamento e briefing. Encerramento às 17:00h conforme horário oficial da Unidade de Conservação.',
    },
    checklistCard: {
      icon: '🎒',
      title: 'O que levar na mochila para a FLONA',
      items: [
        'Roupas leves e confortáveis para trilha e escalada (calça comprida leve ou legging recomendada na mata)',
        'Tênis fechado de trilha ou esportivo com solado aderente (obrigatório para aproximação)',
        'Garrafa de água (mínimo 2L por pessoa) e lanches leves extras',
        'Protetor solar, repelente de insetos (indispensável na floresta) e boné/óculos escuros',
        'Documento oficial com foto para acesso à Unidade de Conservação Federal',
      ],
    },
    corporateCard: {
      badge: '🏢 EXPEDIÇÕES CORPORATIVAS',
      title: 'Team Building na Fazenda Ipanema',
      description:
        'Conecte sua equipe com valores de sustentabilidade, cooperação e superação em uma Unidade de Conservação Federal.',
      ctaText: 'Solicitar Proposta Corporativa',
      ctaHref:
        'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20uma%20proposta%20de%20Team%20Building%20corporativo%20na%20Fazenda%20Ipanema',
    },
    guideSupportCard: {
      badge: '💬 CANAL DIRETO',
      title: 'Dúvidas sobre a Fazenda Ipanema?',
      description:
        'Fale diretamente com nossos guias sobre a trilha de aproximação, regras da FLONA ou equipamentos antes de reservar.',
      ctaText: 'Falar com Guia Certificado',
      ctaHref:
        'https://wa.me/5511995413539?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20a%20escalada%20na%20Fazenda%20Ipanema',
    },
  };

  // =========================================================================
  // 9. SEGURANÇA & INTEGRIDADE (#seguranca)
  // =========================================================================
  safetySection: SafetySectionConfig = {
    badge: 'CAP · 05 · SEGURANÇA & CONSERVAÇÃO',
    title: 'SUA INTEGRIDADE É',
    titleAccent: 'inegociável',
    equipmentIcons: [
      { src: '/assets/icons/icon-camping-chair.svg', alt: 'Cadeira de Escalada' },
      { src: '/assets/icons/icon-corda.svg', alt: 'Corda Dinâmica UIAA' },
      { src: '/assets/icons/icon-mosquetao.svg', alt: 'Mosquetão UIAA' },
      { src: '/assets/icons/selo-uiaa.svg', alt: 'Selo UIAA CE' },
      { src: '/assets/icons/icon-capacete.svg', alt: 'Capacete UIAA' },
    ],
    protocols: [
      {
        icon: '🛡️',
        title: 'Protocolo ICMBio & Redundância Total',
        description:
          'Operação autorizada seguindo todas as diretrizes da Floresta Nacional de Ipanema, com ancoragens duplas redundantes e instrutores certificados CBME / Wilderness First Aid.',
      },
      {
        icon: '📋',
        title: 'Equipamentos Homologados & Seguro Aventura',
        description:
          'Seguro Aventura individual incluso para todos os participantes e equipamentos rigorosamente inspecionados sob certificação internacional UIAA e CE.',
      },
    ],
  };

  // =========================================================================
  // 10. ITINERÁRIO DE CAMPO (#timeline)
  // =========================================================================
  timelineSection: TimelineSectionConfig = {
    badge: 'ITINERÁRIO DE CAMPO · FLONA IPANEMA',
    title: 'COMO SERÁ O SEU DIA',
    titleAccent: 'na Fazenda Ipanema',
    subtitle:
      'Um roteiro planejado para unir escalada segura no Morro Araçoiaba, contato com a Mata Atlântica e história.',
    events: [
      {
        time: '08:00 - 08:45',
        activity: 'Encontro no Centro de Visitantes & Trilha de Aproximação',
        icon: '🌳',
        color: 'forest',
      },
      {
        time: '09:00 - 14:00',
        activity: 'Escalada e Instrução no Morro Araçoiaba',
        icon: '🧗',
        color: 'terracotta',
      },
      {
        time: '14:30 - 16:30',
        activity: 'Trilha Histórica da Fazenda Ipanema (Opcional)',
        icon: '🏛️',
        color: 'sun',
      },
    ],
  };

  // =========================================================================
  // 11. GALERIA DE MOMENTOS REAIS (#galeria)
  // =========================================================================
  gallerySection: GallerySectionConfig = {
    badge: 'REGISTROS · FLONA IPANEMA · MORRO ARAÇOIABA',
    title: 'GALERIA DE',
    titleAccent: 'momentos na Flona',
    subtitle:
      'Registros das formações de quartzito do Morro Araçoiaba, setores de escalada e natureza preservada da Fazenda Ipanema.',
    categories: [
      { id: 'all', label: 'Todas' },
      { id: 'escalada', label: 'Escalada' },
      { id: 'paisagem', label: 'FLONA & Paisagem' },
    ],
    images: [
      {
        src: '/images/themes/fazenda-ipanema/escalada-1.jpg',
        alt: 'Escalador nas rochas de quartzito do Morro Araçoiaba na Fazenda Ipanema',
        tag: 'Morro Araçoiaba',
        tagColor: 'forest',
        title: 'Escalada em Quartzito Milenar',
        category: 'escalada',
      },
      {
        src: '/images/themes/fazenda-ipanema/escalada-2.jpg',
        alt: 'Escalador em ação na face principal da Fazenda Ipanema com vista panorâmica',
        tag: 'Via Esportiva',
        tagColor: 'terracotta',
        title: 'Superação nas Vias da FLONA',
        category: 'escalada',
      },
      {
        src: '/images/themes/fazenda-ipanema/paisagem-1.jpg',
        alt: 'Floresta Nacional de Ipanema preservada em Iperó SP',
        tag: 'Mata Atlântica',
        tagColor: 'forest',
        title: 'Unidade de Conservação Federal',
        category: 'paisagem',
      },
      {
        src: '/images/themes/fazenda-ipanema/paisagem-2.jpg',
        alt: 'Trilhas e formações geológicas da Floresta Nacional de Ipanema',
        tag: 'Natureza & História',
        tagColor: 'sun',
        title: 'Biodiversidade e Sítio Histórico',
        category: 'paisagem',
      },
      {
        src: '/images/themes/fazenda-ipanema/mapa-1.jpg',
        alt: 'Mapa e setores de escalada do Morro Araçoiaba na Fazenda Ipanema',
        tag: 'Croqui & Setores',
        tagColor: 'terracotta',
        title: 'Setores de Escalada do Morro Araçoiaba',
        category: 'escalada',
      },
      {
        src: '/images/themes/fazenda-ipanema/og-image.jpg',
        alt: 'Paredão rochoso na Floresta Nacional de Ipanema',
        tag: 'FLONA Ipanema',
        tagColor: 'forest',
        title: 'Paredões da Fazenda Ipanema',
        category: 'paisagem',
      },
    ],
    videos: [],
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
          'https://wa.me/5519997259691?text=Olá%20Celso!%20Vim%20pelo%20site%20da%20XperienceClimb%20(Fazenda%20Ipanema)',
        instagram: 'https://instagram.com/celsoossamu',
      },
    ],
    locations: [
      {
        name: 'Fazenda Ipanema - Morro Araçoiaba',
        location: '📍 Iperó, São Paulo',
        difficulty: 'Fácil a Moderado',
        description:
          'Localizado na Floresta Nacional de Ipanema, Unidade de Conservação Federal com vias esportivas em quartzito milenar e trilhas históricas.',
        highlights: '✓ Conservação Federal ICMBio · Vias escola e esportivas · Trilha histórica',
        image: '/images/themes/fazenda-ipanema/hero.jpg',
      },
      {
        name: 'Pedra do Santuário',
        location: '📍 Pedra Bela, São Paulo',
        difficulty: 'Fácil / Escola',
        description:
          'Monólito monumental de granito com vias de aderência perfeitas para quem está começando na escalada em rocha natural.',
        highlights: '✓ Setor Escola · 1.100m altitude · Mega Tirolesa',
        image: '/images/themes/pedra-bela/hero.jpg',
      },
    ],
  };

  // =========================================================================
  // 13. COMO CHEGAR (#localizacao)
  // =========================================================================
  locationSection: LocationSectionConfig = {
    badge: 'ACESSO · ROTA · COORDENADAS GPS',
    title: 'COMO CHEGAR',
    titleAccent: 'à Fazenda Ipanema',
    subtitle:
      'Localizada em Iperó - SP, a 120 km da capital paulista (acesso rápido pela Rodovia Castelo Branco ou Raposo Tavares).',
    points: [
      {
        badge: 'Ponto 01 · Recepção (08:00h)',
        badgeColor: 'forest',
        subtitle: 'Portaria & Credenciamento ICMBio',
        title: 'Centro de Visitantes da FLONA',
        address: 'Floresta Nacional de Ipanema - Estrada Vicinal Iperó/Capela do Alto, Iperó - SP',
        notes: [
          {
            icon: '🌳',
            text: 'Ponto oficial de encontro às 08:00h para recepção do grupo, briefing de segurança e orientações ambientais.',
          },
          {
            icon: '🅿️',
            text: 'Estacionamento gratuito e seguro dentro da Floresta Nacional de Ipanema, com banheiros e bebedouros.',
          },
        ],
        mapsUrl:
          'https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568,775m/data=!3m1!1e3!4m9!1m2!2m1!1sFloresta+Nacional+de+Ipanema,+Iper%C3%B3,+SP!3m5!1s0x94c5f172812051e1:0xc9ab288d76797fad!8m2!3d-23.4254791!4d-47.5979779!16s%2Fg%2F11gj_vn973!5m1!1e1',
        buttonText: 'Abrir Centro de Visitantes no Maps',
        buttonColor: 'forest',
      },
      {
        badge: 'Ponto 02 · Aventura (08:45h)',
        badgeColor: 'terracotta',
        subtitle: 'Setor de Escalada',
        title: 'Morro Araçoiaba',
        address: 'Trilha de Acesso ao Setor de Escalada - FLONA Ipanema, Iperó - SP',
        notes: [
          {
            icon: '📍',
            text: 'Coordenadas GPS: -23.4255562, -47.5980568 · Caminhada leve de ~20 min pela Mata Atlântica.',
          },
          {
            icon: '🧗',
            text: 'Base sombreada aos pés dos paredões de quartzito, equipada pela equipe Xperience Climb.',
          },
        ],
        mapsUrl:
          'https://www.google.com/maps/dir/?api=1&destination=-23.4255562,-47.5980568&travelmode=driving',
        buttonText: 'Traçar Rota no Google Maps',
        buttonColor: 'terracotta',
      },
    ],
  };

  // =========================================================================
  // 14. PERGUNTAS FREQUENTES (#faq)
  // =========================================================================
  faqSection: FAQSectionConfig = {
    badge: 'FAQ · DÚVIDAS SOBRE A FAZENDA IPANEMA',
    title: 'PERGUNTAS',
    titleAccent: 'frequentes',
    subtitle:
      'Tudo o que você precisa saber para viver sua experiência de escalada na Floresta Nacional de Ipanema.',
    items: [
      {
        question: 'Preciso ter experiência prévia para escalar na Fazenda Ipanema?',
        answer:
          'Não! O setor escola do Morro Araçoiaba possui vias de III e IV grau com agarras generosas no quartzito, ideais para quem nunca escalou na vida. Nossos instrutores ensinam todos os movimentos e cuidam de 100% da segurança com corda de cima (top-rope).',
        isOpenByDefault: true,
      },
      {
        question: 'Como é a trilha de acesso até a rocha na FLONA?',
        answer:
          'A caminhada a partir do estacionamento do Centro de Visitantes dura cerca de 20 minutos (aprox. 800 metros) por trilha bem demarcada e sombreada dentro da Mata Atlântica, acessível para qualquer pessoa com condição física básica.',
      },
      {
        question: 'Tenho medo de altura. A Fazenda Ipanema é indicada para mim?',
        answer:
          'Sim! A base das vias é plana, ampla e protegida pelas árvores da floresta, trazendo uma sensação de acolhimento única. Na modalidade top-rope a corda permanece sempre esticada pelo instrutor: você escolhe até onde quer subir e pode descer quando desejar.',
      },
      {
        question: 'O que está incluso na saída da Fazenda Ipanema?',
        answer:
          'Inclui instrução completa com guias certificados CBME, todos os equipamentos individuais e coletivos homologados UIAA/CE (capacete, cadeirinha, cordas, mosquetões), Seguro Aventura individual, acompanhamento na trilha ecológica e lanche de trilha.',
      },
      {
        question: 'Quais são as regras da Unidade de Conservação (ICMBio)?',
        answer:
          'Por ser uma Floresta Nacional protegida pelo ICMBio, o parque funciona das 8h às 17h, é obrigatório o uso de calçado fechado, não é permitido levar animais domésticos e todo resíduo produzido é trazido de volta com o grupo.',
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
      tagline: 'Fazenda Ipanema · SP',
      description:
        'Vivências transformadoras de escalada sustentável na Floresta Nacional de Ipanema e interior de SP.',
      seal: '🛡️ Homologado UIAA & CE · ICMBio',
      logo: '/assets/logo.svg',
    },
    navLinks: [
      { label: '01 · Floresta Nacional de Ipanema', href: '#lugar' },
      { label: '02 · Batismo na FLONA', href: '#batismo' },
      { label: '03 · Calendário Fazenda Ipanema', href: '#calendario' },
      { label: '04 · Pacotes & Investimento', href: '#pacotes' },
      { label: '05 · Logística & Checklist FLONA', href: '#programacao' },
      { label: '06 · Itinerário do Dia', href: '#timeline' },
    ],
    experienceLinks: [
      { label: '07 · Galeria Morro Araçoiaba', href: '#galeria' },
      { label: '08 · Protocolos de Segurança', href: '#seguranca' },
      { label: '09 · Guias & Instrutores', href: '#comunidade' },
      { label: '10 · Como Chegar a Iperó', href: '#localizacao' },
      { label: '11 · Dúvidas Frequentes', href: '#faq' },
      { label: '12 · Guia do Iniciante em SP', href: '/guia-escalada-iniciantes-sp' },
      { label: '13 · Destino: Pedra Bela', href: '/destinos/pedra-bela' },
    ],
    contact: {
      whatsapp: 'https://wa.me/5511995413539',
      whatsappFormatted: '(11) 99541-3539',
      instagram: 'https://instagram.com/xperiencehubs',
      instagramHandle: '@xperiencehubs',
      email: 'marcosishino@gmail.com',
      ctaText: 'Agendar Fazenda Ipanema ↗',
      ctaHref: '#pacotes',
    },
    legal: {
      copyright: '© 2026 Xperience Climb. Feito para inspirar a vida ao ar livre.',
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
    tag: 'Fazenda Ipanema',
    title: 'Agendar Vaga ↗',
    href: '#pacotes',
  };

  // =========================================================================
  // CAMPOS DE COMPATIBILIDADE RETROATIVA
  // =========================================================================
  location = this.createLocationInfo(
    'Morro Araçoiaba',
    'Floresta Nacional de Ipanema',
    'Iperó',
    'São Paulo',
    '120km de São Paulo',
    { lat: -23.4255562, lng: -47.5980568 },
    'https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568,775m/data=!3m1!1e3!4m9!1m2!2m1!1sFloresta+Nacional+de+Ipanema,+Iper%C3%B3,+SP!3m5!1s0x94c5f172812051e1:0xc9ab288d76797fad!8m2!3d-23.4254791!4d-47.5979779!16s%2Fg%2F11gj_vn973!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D',
    [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Raposo Tavares (SP-270) sentido interior',
      },
      {
        step: 2,
        title: 'Saída Iperó',
        description: 'Pegue a saída 109 - Iperó/Boituva (aproximadamente 90km)',
      },
      {
        step: 3,
        title: 'Entrada da Floresta',
        description: 'Siga as placas para "Floresta Nacional de Ipanema" (8km)',
      },
      {
        step: 4,
        title: 'Chegada',
        description: 'Estacionamento gratuito, próximo ao acesso ao setor de escalada',
      },
    ]
  );

  content = this.createContentInfo(
    {
      title: 'XPERIENCE CLIMB FLONA',
      subtitle: 'Escalada Sustentável na Mata Atlântica',
      description: 'Conservação, educação e aventura em harmonia',
    },
    {
      title: 'Escalada no Coração da Mata Atlântica',
      description:
        'O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema (FLONA), oferece uma das experiências de escalada mais autênticas e seguras do interior de São Paulo.',
      highlights: [
        {
          icon: '🌳',
          title: 'Unidade de Conservação Federal',
          description:
            'Escalada responsável em área protegida pelo ICMBio, contribuindo para a conservação da Mata Atlântica e educação ambiental.',
        },
        {
          icon: '🔬',
          title: 'Geologia Milenar',
          description:
            'Formações rochosas de quartzito com mais de 600 milhões de anos, um verdadeiro laboratório natural de geologia.',
        },
        {
          icon: '🦋',
          title: 'Biodiversidade Preservada',
          description:
            'Experiência única de escalada em meio à fauna e flora nativas, com possibilidade de avistamento de espécies endêmicas.',
        },
      ],
      infoBox: {
        title: 'Sobre a Floresta Nacional de Ipanema (Flona)',
        content:
          'A Floresta Nacional de Ipanema, antes conhecida como "Fazenda Ipanema", é uma unidade de conservação da natureza, administrada pelo Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio), localizada a 120 km da cidade de São Paulo e abrangendo parte dos municípios de Iperó, Araçoiaba da Serra e Capela do Alto. A missão da Flona de Ipanema é proteger, conservar e restaurar os remanescentes de vegetação nativa do domínio de Mata Atlântica, especialmente o Morro Araçoiaba, e seus ambientes associados, seus atributos naturais, históricos e culturais, promover o manejo florestal, o uso público e ser referência em integração socioambiental, pesquisa e disseminação de conhecimentos.',
      },
    }
  );

  gallery = {
    images: this.processGalleryImages([
      {
        src: '/images/themes/fazenda-ipanema/escalada-1.jpg',
        alt: 'Escalador nas rochas do Morro Araçoiaba',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: false,
      },
      {
        src: '/images/themes/fazenda-ipanema/escalada-2.jpg',
        alt: 'Vista panorâmica durante a escalada',
        title: 'Vista Panorâmica',
        category: 'climb',
        isExternal: false,
      },
      {
        src: '/images/themes/fazenda-ipanema/paisagem-1.jpg',
        alt: 'Floresta Nacional de Ipanema',
        title: 'Mata Atlântica Preservada',
        category: 'nature',
        isExternal: false,
      },
      {
        src: '/images/themes/fazenda-ipanema/paisagem-2.jpg',
        alt: 'Trilhas da Floresta Nacional',
        title: 'Trilhas Ecológicas',
        category: 'nature',
        isExternal: false,
      },
      {
        src: '/images/themes/fazenda-ipanema/mapa-1.jpg',
        alt: 'Mapa dos setores de escalada',
        title: 'Setores de Escalada',
        category: 'equipment',
        isExternal: false,
      },
    ]),
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos',
    },
  };

  activities = [
    {
      id: 'rock-climbing',
      name: 'Escalada em Rocha',
      description: 'Escalada técnica em formações de quartzito com mais de 600 milhões de anos',
      icon: '🧗',
      difficulty: 'medium' as const,
    },
  ];

  logistics = this.createLogisticsInfo(
    {
      openTime: '8h',
      closeTime: '17h',
      notes: 'Horário de funcionamento do parque',
    },
    'Centro de Visitantes da FLONA',
    [
      'Horário de funcionamento do parque: 8h às 17h',
      'Estacionamento gratuito disponível',
      'Enviaremos o cronograma detalhado, no final da compra, para você conferir',
    ],
    [
      'Chegue com antecedência',
      'Traga protetor solar',
      'Use roupas adequadas para escalada',
      'Leve água e lanche extra',
    ]
  );

  beginner = this.createBeginnerInfo(
    'Primeira vez na FLONA?',
    'A Floresta Nacional de Ipanema é o lugar perfeito para começar sua jornada na escalada em rocha natural.',
    [
      {
        icon: '🌳',
        title: 'Ambiente Seguro',
        description: 'Setores com sombra e acesso controlado em uma unidade de conservação.',
      },
      {
        icon: '🧗',
        title: 'Vias Escola',
        description: 'Vias de escalada preparadas especialmente para instrução e iniciantes.',
      },
    ],
    'A natureza espera por você!'
  );

  timeline = [
    this.createTimelineEvent('08:00', 'Encontro no Centro de Visitantes'),
    this.createTimelineEvent('09:00 - 13:00', 'Escalada e Instrução'),
    this.createTimelineEvent('14:00', 'Trilha Histórica (Opcional)'),
  ];

  community = this.createCommunityInfo(
    ['flona-ipanema', 'equipamentos-verticais', 'pousada-aventura'],
    ['marcos-ishino'],
    ['pre-climb-check', 'emergency-descent'],
    'fazenda-ipanema'
  );

  seo = this.createSEOInfo(
    'XperienceClimb - Escalada na Fazenda Ipanema',
    'Viva a experiência definitiva de escalada no Morro Araçoiaba, localizado na Floresta Nacional de Ipanema. Escalada segura com instrutores certificados.',
    [
      'escalada',
      'fazenda ipanema',
      'morro araçoiaba',
      'flona',
      'mata atlântica',
      'escalada em rocha',
    ],
    '/images/themes/fazenda-ipanema/og-image.jpg'
  );

  visual = this.createVisualTheme(
    '#2d5a3d', // Deep forest green
    '#245032',
    '#1e4429',
    '#7cb342', // Fresh green accent
    '#f8fdf9', // Very light green background
    '#ffffff',
    '#1b3b1f', // Dark forest green text
    '#4a6b4d',
    '#c8e6c9',
    '#2d5a3d',
    '#4caf50',
    'rgba(45, 90, 61, 0.7)', // Forest green overlay
    '#ffffff'
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

// Export an instance of the theme for backward compatibility
export const fazendaIpanemaTheme = new FazendaIpanemaTheme().getThemeConfig();
