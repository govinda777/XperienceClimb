import { CreateOrder } from '../CreateOrder';
import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order } from '@/core/entities/Order';

const mockOrderRepository: jest.Mocked<IOrderRepository> = {
  save: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  findById: jest.fn(),
  findByUserId: jest.fn(),
  createWhatsAppOrder: jest.fn().mockResolvedValue(true),
};

describe('CreateOrder UseCase', () => {
  let createOrder: CreateOrder;

  beforeEach(() => {
    jest.clearAllMocks();
    createOrder = new CreateOrder(mockOrderRepository);
  });

  it('should successfully create an order and map commerceProductId from CMS CartItem', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const request = {
      userId: 'user-123',
      cartItems: [
        {
          id: 'cart-item-1',
          packageId: 'agarrao',
          packageName: 'Agarrão',
          price: 150,
          quantity: 1,
          participantName: 'Alice',
          addedAt: new Date(),
          commerceProductId: 'cms-prod-id-999',
        },
      ],
      participantDetails: {
        'cart-item-1': {
          name: 'Alice Cooper',
          age: 25,
          experienceLevel: 'beginner' as const,
          healthDeclaration: true,
        },
      },
      climbingDetails: {
        selectedDate: futureDate,
      },
    };

    const result = await createOrder.execute(request);

    expect(result.success).toBe(true);
    expect(result.orderId).toBeDefined();
    expect(result.whatsappUrl).toContain('cms-prod-id-999');

    // Check repository save/createWhatsAppOrder call
    expect(mockOrderRepository.createWhatsAppOrder).toHaveBeenCalled();
    const savedOrder: Order = mockOrderRepository.createWhatsAppOrder.mock.calls[0][0];
    expect(savedOrder.items[0].commerceProductId).toBe('cms-prod-id-999');
  });

  it('should fallback to packageId as commerceProductId if not specified in CartItem', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const request = {
      userId: 'user-123',
      cartItems: [
        {
          id: 'cart-item-1',
          packageId: 'agarrao',
          packageName: 'Agarrão',
          price: 150,
          quantity: 1,
          participantName: 'Alice',
          addedAt: new Date(),
        },
      ],
      participantDetails: {
        'cart-item-1': {
          name: 'Alice Cooper',
          age: 25,
          experienceLevel: 'beginner' as const,
          healthDeclaration: true,
        },
      },
      climbingDetails: {
        selectedDate: futureDate,
      },
    };

    const result = await createOrder.execute(request);

    expect(result.success).toBe(true);
    const savedOrder: Order = mockOrderRepository.createWhatsAppOrder.mock.calls[0][0];
    expect(savedOrder.items[0].commerceProductId).toBe('agarrao');
  });
});
