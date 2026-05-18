/**
 * Test Data Factories
 * Provides factory functions to create test data objects with realistic defaults
 */

import { User, LoginCredentials } from '@/core/entities/User';
import { Package } from '@/core/entities/Package';
import { Tour, CreateTourRequest } from '@/core/entities/Tour';
import { Order, OrderItem, ParticipantDetails, ClimbingDetails } from '@/core/entities/Order';
import { CartItem } from '@/types';
import { Coupon } from '@/core/entities/Coupon';
import { AVAILABLE_DATES } from '@/lib/constants';

// Counter for generating unique IDs
let idCounter = 1;

// Base test date for consistent testing
export const TEST_BASE_DATE_ISO = '2026-01-01T10:00:00Z';

/**
 * Generates a unique ID for testing
 */
export const generateTestId = (prefix = 'test') => `${prefix}-${idCounter++}`;

/**
 * User Factory
 */
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: generateTestId('user'),
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://avatar.example.com/test.jpg',
  createdAt: new Date(TEST_BASE_DATE_ISO),
  isAdmin: false,
  preferences: {
    experienceLevel: 'beginner',
    notifications: true,
    language: 'pt',
  },
  ...overrides,
});

/**
 * Admin User Factory
 */
export const createMockAdminUser = (overrides?: Partial<User>): User =>
  createMockUser({
    isAdmin: true,
    name: 'Admin User',
    email: 'admin@example.com',
    preferences: {
      experienceLevel: 'advanced',
      notifications: true,
      language: 'pt',
    },
    ...overrides,
  });

/**
 * Login Credentials Factory
 */
export const createMockCredentials = (overrides?: Partial<LoginCredentials>): LoginCredentials => ({
  email: 'test@example.com',
  password: 'password123',
  ...overrides,
});

/**
 * Package Factory
 */
export const createMockPackage = (overrides?: Partial<Package>): Package => ({
  id: generateTestId('pkg'),
  name: 'Escalada Iniciante',
  price: 150,
  originalPrice: 200,
  description: 'Perfeito para iniciantes na escalada',
  features: [
    'Instrução básica de segurança',
    'Equipamentos de proteção inclusos',
    'Acompanhamento de instrutor certificado',
  ],
  bonus: ['Lanche energético', 'Fotos da experiência'],
  shape: 'circle',
  color: 'bg-green-500',
  duration: '4 horas',
  maxParticipants: 8,
  popular: false,
  disabled: false,
  category: 'beginner',
  difficulty: 'easy',
  includes: ['Capacete', 'Cadeirinha', 'Corda'],
  requirements: ['Idade mínima: 12 anos', 'Boa condição física'],
  createdAt: new Date(TEST_BASE_DATE_ISO),
  updatedAt: new Date(TEST_BASE_DATE_ISO),
  isActive: true,
  ...overrides,
});

/**
 * Advanced Package Factory
 */
export const createMockAdvancedPackage = (overrides?: Partial<Package>): Package =>
  createMockPackage({
    name: 'Escalada Avançada',
    price: 250,
    originalPrice: 300,
    description: 'Para escaladores experientes',
    features: ['Rotas desafiadoras', 'Equipamentos profissionais', 'Técnicas avançadas'],
    bonus: ['Almoço gourmet', 'Certificado de participação'],
    shape: 'hexagon',
    color: 'bg-orange-500',
    duration: '6 horas',
    maxParticipants: 6,
    popular: true,
    category: 'advanced',
    difficulty: 'hard',
    includes: ['Equipamentos profissionais', 'Guia especializado'],
    requirements: ['Experiência prévia obrigatória', 'Certificado médico'],
    ...overrides,
  });

/**
 * Disabled Package Factory
 */
export const createMockDisabledPackage = (overrides?: Partial<Package>): Package =>
  createMockPackage({
    name: 'Escalada Premium',
    price: 350,
    description: 'Experiência exclusiva (temporariamente indisponível)',
    disabled: true,
    isActive: false,
    ...overrides,
  });

/**
 * Cart Item Factory
 */
export const createMockCartItem = (overrides?: Partial<CartItem>): CartItem => ({
  id: generateTestId('cart'),
  packageId: 'pkg-1',
  packageName: 'Escalada Iniciante',
  price: 150,
  quantity: 1,
  participantName: 'João Silva',
  experience: 'beginner',
  addedAt: new Date(TEST_BASE_DATE_ISO),
  ...overrides,
});

/**
 * Multiple Cart Items Factory
 */
export const createMockCartItems = (count: number = 2): CartItem[] => {
  const packages = [
    { id: 'pkg-1', name: 'Escalada Iniciante', price: 150 },
    { id: 'pkg-2', name: 'Escalada Avançada', price: 250 },
    { id: 'pkg-3', name: 'Escalada Premium', price: 350 },
  ];

  return Array.from({ length: count }, (_, index) => {
    const pkg = packages[index % packages.length];
    return createMockCartItem({
      id: generateTestId('cart'),
      packageId: pkg.id,
      packageName: pkg.name,
      price: pkg.price,
      participantName: `Participant ${index + 1}`,
    });
  });
};

/**
 * Participant Details Factory
 */
export const createMockParticipantDetails = (
  overrides?: Partial<ParticipantDetails>
): ParticipantDetails => ({
  name: 'João Silva',
  age: 28,
  experienceLevel: 'beginner',
  healthDeclaration: true,
  emergencyContact: {
    name: 'Ana Silva',
    phone: '(11) 99999-9999',
    relationship: 'spouse',
  },
  medicalConditions: [],
  dietaryRestrictions: [],
  ...overrides,
});

/**
 * Climbing Details Factory
 */
export const createMockClimbingDetails = (
  overrides?: Partial<ClimbingDetails>
): ClimbingDetails => ({
  selectedDate: new Date(`${AVAILABLE_DATES.singleDateISO}T08:00:00Z`),
  preferredTime: 'morning',
  specialRequests: '',
  groupSize: 1,
  ...overrides,
});

/**
 * Order Item Factory
 */
export const createMockOrderItem = (overrides?: Partial<OrderItem>): OrderItem => ({
  packageId: 'pkg-1',
  packageName: 'Escalada Iniciante',
  price: {
    amount: 15000, // R$ 150.00 in cents
    currency: 'BRL',
  },
  quantity: 1,
  participantDetails: createMockParticipantDetails(),
  ...overrides,
});

/**
 * Order Factory
 */
export const createMockOrder = (overrides?: Partial<Order>): Order => ({
  id: generateTestId('order'),
  userId: 'user-123',
  items: [createMockOrderItem()],
  status: 'pending_payment',
  payment: {
    method: 'pix',
    status: 'pending',
  },
  climbingDetails: createMockClimbingDetails(),
  subtotal: {
    amount: 15000,
    currency: 'BRL',
  },
  total: {
    amount: 15000,
    currency: 'BRL',
  },
  createdAt: new Date(TEST_BASE_DATE_ISO),
  updatedAt: new Date(TEST_BASE_DATE_ISO),
  ...overrides,
});

/**
 * Confirmed Order Factory
 */
export const createMockConfirmedOrder = (overrides?: Partial<Order>): Order =>
  createMockOrder({
    status: 'confirmed',
    payment: {
      method: 'pix',
      status: 'approved',
      transactionId: 'txn-123',
      paidAt: new Date('2026-01-01T10:30:00Z'),
    },
    ...overrides,
  });

/**
 * Coupon Factory
 */
export const createMockCoupon = (overrides?: Partial<Coupon>): Coupon => ({
  id: generateTestId('coupon'),
  code: 'CLIMB20',
  type: 'percentage',
  value: 20,
  description: '20% de desconto em qualquer pacote',
  isActive: true,
  usageLimit: 100,
  usedCount: 0,
  validFrom: new Date('2026-01-01T00:00:00Z'),
  validUntil: new Date('2026-12-31T23:59:59Z'),
  applicablePackages: [],
  minimumAmount: {
    amount: 10000, // R$ 100.00
    currency: 'BRL',
  },
  createdAt: new Date(TEST_BASE_DATE_ISO),
  updatedAt: new Date(TEST_BASE_DATE_ISO),
  ...overrides,
});

/**
 * Expired Coupon Factory
 */
export const createMockExpiredCoupon = (overrides?: Partial<Coupon>): Coupon =>
  createMockCoupon({
    code: 'EXPIRED20',
    validUntil: new Date('2023-12-31T23:59:59Z'),
    isActive: false,
    ...overrides,
  });

/**
 * Tour Factory
 */
export const createMockTour = (overrides?: Partial<Tour>): Tour =>
  ({
    id: generateTestId('tour'),
    name: 'Pedra Grande Adventure',
    themeId: 'pedra-grande',
    description: 'Amazing climbing experience in Atibaia',
    location: {
      name: 'Pedra Grande',
      address: 'Estrada da Pedra Grande, Atibaia, SP',
      city: 'Atibaia',
      state: 'SP',
      coordinates: {
        lat: -23.1234,
        lng: -46.5678,
      },
      distance: '60km de São Paulo',
      mapsUrl: 'https://maps.google.com/pedra-grande',
      directions: [
        {
          step: 1,
          instruction: 'Pegue a Rodovia Fernão Dias (BR-381) sentido Belo Horizonte',
          distance: '45km',
          duration: '40 minutos',
        },
        {
          step: 2,
          instruction: 'Saia na saída 61 - Atibaia',
          distance: '5km',
          duration: '5 minutos',
        },
      ],
    },
    activities: [
      {
        id: 'rock-climbing-1',
        name: 'Rock Climbing',
        description: 'Climb the main rock face with professional guidance',
        icon: '🧗‍♂️',
        difficulty: 'intermediate',
        duration: '4 hours',
        price: 150,
      },
    ],
    logistics: {
      schedule: {
        departure: '08:00',
        arrival: '18:00',
        duration: '10 hours',
      },
      meetingPoint: 'Estação da Luz - São Paulo',
      groupSize: {
        min: 4,
        max: 12,
      },
      importantNotes: [
        'Trazer água e lanche',
        'Usar calçado apropriado',
        'Protetor solar obrigatório',
      ],
      tips: ['Verificar condições climáticas', 'Chegar 15 minutos antes do horário'],
    },
    pricing: {
      basePrice: 150,
      currency: 'BRL',
      discounts: [
        {
          type: 'group',
          description: 'Desconto para grupos acima de 8 pessoas',
          value: 10,
          minQuantity: 8,
        },
      ],
    },
    availability: {
      available: true,
      weatherDependent: true,
      restrictions: ['Idade mínima: 12 anos'],
    },
    gallery: {
      images: [
        {
          id: 'img-main-view-1',
          src: '/images/pedra-grande/main-view.jpg',
          alt: 'Vista principal da Pedra Grande',
          title: 'Vista Principal',
          category: 'landscape',
          order: 1,
        },
      ],
      videos: [],
      categories: {
        landscape: 'Paisagens',
        action: 'Ação',
        equipment: 'Equipamentos',
      },
    },
    seo: {
      title: 'Escalada na Pedra Grande - Atibaia | XperienceClimb',
      description:
        'Viva uma experiência única de escalada na Pedra Grande em Atibaia. Guias especializados, equipamentos inclusos e paisagens incríveis.',
      keywords: ['escalada', 'pedra grande', 'atibaia', 'aventura', 'turismo'],
      ogImage: '/images/pedra-grande/og-image.jpg',
    },
    createdAt: new Date(TEST_BASE_DATE_ISO),
    updatedAt: new Date(TEST_BASE_DATE_ISO),
    isActive: true,
    ...overrides,
  }) as any;

/**
 * Create Tour Request Factory
 */
export const createMockTourRequest = (overrides?: Partial<CreateTourRequest>): CreateTourRequest =>
  ({
    name: 'New Adventure Tour',
    themeId: 'new-adventure',
    description: 'An exciting new climbing experience',
    location: {
      name: 'Adventure Rock',
      address: 'Adventure Street, Adventure City',
      city: 'Adventure City',
      state: 'AC',
      coordinates: {
        lat: -23.5505,
        lng: -46.6333,
      },
    },
    activities: [
      {
        name: 'Basic Climbing',
        description: 'Learn the basics of rock climbing',
        icon: '🧗‍♂️',
        difficulty: 'beginner',
        duration: '3 hours',
        price: 120,
      },
    ],
    logistics: {
      schedule: {
        departure: '09:00',
        arrival: '17:00',
        duration: '8 hours',
      },
      meetingPoint: 'Central Station',
    },
    pricing: {
      basePrice: 120,
      currency: 'BRL',
    },
    seo: {
      title: 'New Adventure Tour',
      description: 'Experience the new adventure tour',
    },
    ...overrides,
  }) as any;

/**
 * Payment Data Factories
 */
export const createMockPixPayment = (overrides?: any) => ({
  id: generateTestId('pix'),
  qr_code: 'mock-qr-code-string',
  qr_code_base64: 'data:image/png;base64,mock-base64-string',
  ticket_url: 'https://mercadopago.com/pix/ticket/mock-id',
  expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
  ...overrides,
});

export const createMockCryptoPayment = (overrides?: any) => ({
  paymentId: generateTestId('crypto'),
  address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  amount: '0.00375000',
  exchangeRate: 40000,
  expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
  ...overrides,
});

export const createMockMercadoPagoPreference = (overrides?: any) => ({
  id: generateTestId('pref'),
  init_point: 'https://mercadopago.com/checkout/mock-preference',
  sandbox_init_point: 'https://sandbox.mercadopago.com/checkout/mock-preference',
  ...overrides,
});

/**
 * API Response Factories
 */
export const createMockApiSuccessResponse = <T>(data: T) => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
});

export const createMockApiErrorResponse = (error: string, code?: string) => ({
  success: false,
  error,
  code,
  timestamp: new Date().toISOString(),
});

/**
 * Test Scenario Builders
 */
export const createBookingScenario = () => {
  const user = createMockUser();
  const packages = [createMockPackage(), createMockAdvancedPackage()];
  const cartItems = createMockCartItems(2);
  const participantDetails = {
    [cartItems[0].id]: createMockParticipantDetails({ name: cartItems[0].participantName }),
    [cartItems[1].id]: createMockParticipantDetails({
      name: cartItems[1].participantName,
      experienceLevel: 'advanced',
    }),
  };
  const climbingDetails = createMockClimbingDetails();

  return {
    user,
    packages,
    cartItems,
    participantDetails,
    climbingDetails,
  };
};

export const createPaymentScenario = (paymentMethod: 'pix' | 'crypto' | 'mercadopago' = 'pix') => {
  const bookingScenario = createBookingScenario();
  const order = createMockOrder({
    userId: bookingScenario.user.id,
    items: bookingScenario.cartItems.map(item =>
      createMockOrderItem({
        packageId: item.packageId,
        packageName: item.packageName,
        price: { amount: item.price * 100, currency: 'BRL' },
        quantity: item.quantity,
      })
    ),
    payment: { method: paymentMethod, status: 'pending' },
  });

  return {
    ...bookingScenario,
    order,
    paymentMethod,
  };
};

/**
 * Reset ID counter (useful for tests that need predictable IDs)
 */
export const resetTestIdCounter = () => {
  idCounter = 1;
};
