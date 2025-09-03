import { ITourRepository } from '../../core/repositories/ITourRepository';
import { Tour } from '../../core/entities/Tour';

/**
 * In-memory implementation of Tour Repository
 * In a real application, this would connect to a database
 */
export class TourRepository implements ITourRepository {
  private tours: Map<string, Tour> = new Map();
  private static instance: TourRepository;

  constructor() {
    // Initialize with some default tours if needed
    this.initializeDefaultTours();
  }

  static getInstance(): TourRepository {
    if (!TourRepository.instance) {
      TourRepository.instance = new TourRepository();
    }
    return TourRepository.instance;
  }

  async create(tour: Tour): Promise<Tour> {
    if (this.tours.has(tour.id)) {
      throw new Error(`Tour with ID ${tour.id} already exists`);
    }

    this.tours.set(tour.id, { ...tour });
    return { ...tour };
  }

  async update(tour: Tour): Promise<Tour> {
    if (!this.tours.has(tour.id)) {
      throw new Error(`Tour with ID ${tour.id} not found`);
    }

    this.tours.set(tour.id, { ...tour });
    return { ...tour };
  }

  async findById(id: string): Promise<Tour | null> {
    const tour = this.tours.get(id);
    return tour ? { ...tour } : null;
  }

  async findAll(): Promise<Tour[]> {
    return Array.from(this.tours.values()).map(tour => ({ ...tour }));
  }

  async findByActive(isActive: boolean): Promise<Tour[]> {
    return Array.from(this.tours.values())
      .filter(tour => tour.isActive === isActive)
      .map(tour => ({ ...tour }));
  }

  async findByName(name: string): Promise<Tour[]> {
    return Array.from(this.tours.values())
      .filter(tour => tour.name.toLowerCase() === name.toLowerCase())
      .map(tour => ({ ...tour }));
  }

  async findByThemeId(themeId: string): Promise<Tour[]> {
    return Array.from(this.tours.values())
      .filter(tour => tour.themeId === themeId)
      .map(tour => ({ ...tour }));
  }

  async delete(id: string): Promise<boolean> {
    return this.tours.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.tours.has(id);
  }

  /**
   * Initialize with default tours based on existing themes
   */
  private initializeDefaultTours(): void {
    // Fazenda Ipanema Tour
    const fazendaIpanemaTour: Tour = {
      id: 'fazenda-ipanema-climbing',
      name: 'Fazenda Ipanema Climbing Experience',
      themeId: 'fazenda-ipanema',
      location: {
        name: 'Morro Araçoiaba',
        address: 'Floresta Nacional de Ipanema',
        city: 'Iperó',
        state: 'São Paulo',
        country: 'Brazil',
        coordinates: { lat: -23.4255562, lng: -47.5980568 },
        distance: '120km de São Paulo',
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
            description: 'Estacionamento gratuito, próximo ao acesso ao setor de escalada'
          }
        ]
      },
      description: 'Escalada no coração da Mata Atlântica com formações rochosas de quartzito com mais de 600 milhões de anos.',
      activities: [
        {
          id: 'rock-climbing',
          name: 'Escalada em Rocha',
          description: 'Escalada técnica em formações de quartzito com mais de 600 milhões de anos',
          icon: '🧗',
          difficulty: 'medium',
          included: true,
          requirements: ['Idade mínima: 12 anos', 'Condições físicas básicas']
        }
      ],
      logistics: {
        schedule: {
          openTime: '8h',
          closeTime: '17h',
          notes: 'Horário de funcionamento do parque'
        },
        meetingPoint: 'Centro de Visitantes da FLONA',
        duration: '1 dia',
        groupSize: {
          min: 2,
          max: 8
        },
        requirements: [
          {
            type: 'age',
            description: 'Idade mínima de 12 anos',
            mandatory: true
          },
          {
            type: 'physical',
            description: 'Condições físicas básicas para caminhada',
            mandatory: true
          }
        ],
        included: [
          'Equipamentos de segurança',
          'Instrutor experiente',
          'Lanche de trilha'
        ],
        notIncluded: [
          'Transporte até o local',
          'Refeições principais',
          'Hospedagem'
        ],
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
      pricing: {
        basePrice: 19900, // R$ 199.00 in cents
        currency: 'BRL',
        cancellationPolicy: 'Cancelamento gratuito até 24h antes da atividade'
      },
      availability: {
        available: true,
        spotsLeft: 6,
        weatherDependent: true,
        restrictions: ['Atividade sujeita a condições climáticas']
      },
      gallery: {
        images: [
          {
            id: 'climb-1',
            src: '/images/themes/fazenda-ipanema/climb.jpg',
            alt: 'Escalador nas rochas do Morro Araçoiaba',
            title: 'Escalada Técnica',
            category: 'climb',
            isPrimary: true,
            order: 1
          },
          {
            id: 'climb-2',
            src: '/images/themes/fazenda-ipanema/climb-2.jpg',
            alt: 'Vista panorâmica durante a escalada',
            title: 'Vista Panorâmica',
            category: 'climb',
            order: 2
          },
          {
            id: 'nature-1',
            src: '/images/themes/fazenda-ipanema/flona.jpg',
            alt: 'Floresta Nacional de Ipanema',
            title: 'Mata Atlântica Preservada',
            category: 'nature',
            order: 3
          }
        ],
        categories: {
          all: 'Todas',
          climb: 'Escalada',
          nature: 'Natureza',
          equipment: 'Equipamentos'
        }
      },
      seo: {
        title: 'XperienceClimb - Escalada na Fazenda Ipanema',
        description: 'Viva a experiência definitiva de escalada no Morro Araçoiaba, localizado na Floresta Nacional de Ipanema. Escalada segura com instrutores certificados.',
        keywords: ['escalada', 'fazenda ipanema', 'morro araçoiaba', 'flona', 'mata atlântica', 'escalada em rocha'],
        ogImage: '/images/themes/fazenda-ipanema/og-image.jpg'
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isActive: true
    };

    // Pedra Bela Tour
    const pedraBelaTour: Tour = {
      id: 'pedra-bela-adventure',
      name: 'Pedra Bela Adventure Experience',
      themeId: 'pedra-bela',
      location: {
        name: 'Pedra Bela',
        address: 'Estrada da Pedra Bela',
        city: 'Pedra Bela',
        state: 'São Paulo',
        country: 'Brazil',
        coordinates: { lat: -22.7892, lng: -46.4658 },
        distance: '150km de São Paulo',
        mapsUrl: 'https://maps.app.goo.gl/D4o8NKMu85udZs6e8',
        directions: [
          {
            step: 1,
            title: 'Saída de São Paulo',
            description: 'Siga pela Rodovia Fernão Dias (BR-381) sentido Belo Horizonte'
          },
          {
            step: 2,
            title: 'Acesso Pedra Bela',
            description: 'Pegue a saída para Pedra Bela'
          },
          {
            step: 3,
            title: 'Importante',
            description: 'já próximo a Pedra do Santuário se o maps mandar sair da rodovia `SPA 109/008` e entrar a esquerda sentido `ES`. Manter a direita para continuar na `SPA 109` e NÃO seguir via `Estrada dos Limas`'
          },
          {
            step: 4,
            title: 'Importante',
            description: 'Uma vez que subirem uma serrinha e cruzarem pelo portal da pedra do santuário, já estão no centro de aventuras, vcs vão seguir mais uns metros e no final da rua virar a direita onde em seguida terminará o `asfalto`. Assim q virarem a direita e avistarem uma estrada de terra o estacionamento e local de encontro estará a esquerda de vcs'
          },
          {
            step: 5,
            title: 'Ponto de encontro',
            description: 'https://maps.app.goo.gl/D4o8NKMu85udZs6e8'
          },
          {
            step: 6,
            title: 'Estacionamento',
            description: 'Fica bem na base da Pedra a esquerda'
          }
        ]
      },
      description: 'Aventura completa com tirolesa, escalada e atividades radicais na maior tirolesa da América Latina.',
      activities: [
        {
          id: 'zipline',
          name: 'Tirolesa',
          description: 'A maior tirolesa da América Latina com vista panorâmica',
          icon: '🪂',
          difficulty: 'easy',
          duration: '30 minutos',
          included: true
        },
        {
          id: 'rock-climbing-pb',
          name: 'Escalada em Rocha',
          description: 'Escalada em paredões naturais com diferentes níveis de dificuldade',
          icon: '🧗',
          difficulty: 'medium',
          included: true
        }
      ],
      logistics: {
        schedule: {
          openTime: '9h',
          closeTime: '17h'
        },
        meetingPoint: 'Centro de Aventuras Pedra Bela',
        duration: '1 dia',
        groupSize: {
          min: 4,
          max: 12
        },
        requirements: [
          {
            type: 'age',
            description: 'Idade mínima de 14 anos',
            mandatory: true
          },
          {
            type: 'physical',
            description: 'Boa condição física',
            mandatory: true
          }
        ],
        included: [
          'Todos os equipamentos de segurança',
          'Instrutores certificados',
          'Seguro de acidentes',
          'Lanche'
        ],
        notIncluded: [
          'Transporte',
          'Hospedagem',
          'Refeições principais'
        ],
        importantNotes: [
          'Atividade sujeita a condições climáticas',
          'Peso máximo: 120kg',
          'Uso obrigatório de equipamentos de segurança'
        ],
        tips: [
          'Use roupas confortáveis',
          'Traga tênis fechado',
          'Hidrate-se bem',
          'Chegue 30 minutos antes'
        ]
      },
      pricing: {
        basePrice: 29900, // R$ 299.00 in cents
        currency: 'BRL',
        cancellationPolicy: 'Cancelamento gratuito até 48h antes da atividade'
      },
      availability: {
        available: true,
        spotsLeft: 8,
        weatherDependent: true,
        restrictions: ['Atividade sujeita a condições climáticas', 'Peso máximo: 120kg']
      },
      gallery: {
        images: [],
        categories: {
          all: 'Todas',
          adventure: 'Aventura',
          nature: 'Natureza'
        }
      },
      seo: {
        title: 'XperienceClimb - Aventura na Pedra Bela',
        description: 'Viva a maior tirolesa da América Latina e outras aventuras radicais na Pedra Bela. Experiência completa de turismo de aventura.',
        keywords: ['tirolesa', 'pedra bela', 'aventura', 'escalada', 'turismo radical'],
        ogImage: '/images/themes/pedra-bela/og-image.jpg'
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isActive: true
    };

    this.tours.set(fazendaIpanemaTour.id, fazendaIpanemaTour);
    this.tours.set(pedraBelaTour.id, pedraBelaTour);
  }

  /**
   * Get tours data for export/backup
   */
  exportData(): Tour[] {
    return Array.from(this.tours.values());
  }

  /**
   * Import tours data from backup
   */
  importData(tours: Tour[]): void {
    this.tours.clear();
    tours.forEach(tour => {
      this.tours.set(tour.id, tour);
    });
  }

  /**
   * Clear all tours (for testing)
   */
  clear(): void {
    this.tours.clear();
  }
}
