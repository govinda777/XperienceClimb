// Integration test for WhatsApp only payment flow
import { CreateOrder } from '@/core/use-cases/orders/CreateOrder';
import { CartItem } from '@/types';
import { ParticipantDetails } from '@/core/entities/Order';
import { AVAILABLE_DATES } from '@/lib/constants';

// Mock repository used by CreateOrder
const mockOrderRepository = {
  createWhatsAppOrder: jest.fn().mockResolvedValue(undefined),
} as any;

const createOrderUseCase = new CreateOrder(mockOrderRepository);

const mockCartItems: CartItem[] = [
  {
    id: 'cart-1',
    packageId: 'pkg-1',
    packageName: 'Escalada Iniciante',
    price: 150,
    quantity: 1,
    participantName: 'João Silva',
    experience: 'beginner',
    addedAt: new Date(),
  },
];

const mockParticipantDetails: Record<string, ParticipantDetails> = {
  'cart-1': {
    name: 'João Silva',
    age: 28,
    experienceLevel: 'beginner',
    healthDeclaration: true,
    emergencyContact: { name: 'Ana Silva', phone: '(11) 99999-9999' },
  },
};

const mockClimbingDetails = {
  selectedDate: new Date(AVAILABLE_DATES.singleDateISO),
  specialRequests: '',
};

describe('WhatsApp Payment Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create order and return WhatsApp URL', async () => {
    const orderRequest = {
      userId: 'user-123',
      cartItems: mockCartItems,
      participantDetails: mockParticipantDetails,
      climbingDetails: mockClimbingDetails,
    } as any;

    const result = await createOrderUseCase.execute(orderRequest);

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toBeDefined();
    expect(mockOrderRepository.createWhatsAppOrder).toHaveBeenCalled();
  });
});
