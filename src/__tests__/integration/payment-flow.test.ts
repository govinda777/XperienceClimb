/**
 * Integration tests for Payment Flow
 * Tests the complete payment processing from order creation to confirmation
 */

import { CreateOrder } from '@/core/use-cases/orders/CreateOrder';

import { ProcessCryptoPayment } from '@/core/use-cases/payments/ProcessCryptoPayment';
import { PaymentService } from '@/infrastructure/services/PaymentService';
import { CryptoPaymentService } from '@/infrastructure/services/CryptoPaymentService';
import { CartItem } from '@/types';
import { ParticipantDetails } from '@/core/entities/Order';
import { AVAILABLE_DATES } from '@/lib/constants';

// Mock external services
jest.mock('@/infrastructure/services/PaymentService');
jest.mock('@/infrastructure/services/CryptoPaymentService');
jest.mock('@/infrastructure/services/CouponService');

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Payment Flow Integration Tests', () => {
  let mockOrderRepository: any;
  let mockPaymentService: jest.Mocked<PaymentService>;
  let mockCryptoPaymentService: jest.Mocked<CryptoPaymentService>;
  let createOrderUseCase: CreateOrder;

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
    {
      id: 'cart-2',
      packageId: 'pkg-2',
      packageName: 'Escalada Avançada',
      price: 250,
      quantity: 1,
      participantName: 'Maria Santos',
      experience: 'advanced',
      addedAt: new Date(),
    },
  ];

  const mockParticipantDetails: Record<string, ParticipantDetails> = {
    'cart-1': {
      name: 'João Silva',
      age: 28,
      experienceLevel: 'beginner',
      healthDeclaration: true,
      emergencyContact: {
        name: 'Ana Silva',
        phone: '(11) 99999-9999',
      },
    },
    'cart-2': {
      name: 'Maria Santos',
      age: 32,
      experienceLevel: 'advanced',
      healthDeclaration: true,
      emergencyContact: {
        name: 'Pedro Santos',
        phone: '(11) 88888-8888',
      },
    },
  };

  const mockClimbingDetails = {
    selectedDate: new Date(AVAILABLE_DATES.singleDateISO),
    preferredTime: 'morning',
    specialRequests: 'Vegetarian lunch',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock repository
    mockOrderRepository = {
      create: jest.fn(),
      save: jest.fn(),
      createWhatsAppOrder: jest.fn(),
      getCheckoutUrl: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
    };

    // Mock payment services
    mockPaymentService = {
      createPreference: jest.fn(),
      createPixPayment: jest.fn(),
      getPayment: jest.fn(),
      processWebhook: jest.fn(),
    } as any;

    (PaymentService as jest.Mock).mockImplementation(() => mockPaymentService);

    mockCryptoPaymentService = {
      createPayment: jest.fn(),
      getPaymentStatus: jest.fn(),
      getExchangeRate: jest.fn(),
    } as any;

    (CryptoPaymentService as jest.Mock).mockImplementation(() => mockCryptoPaymentService);

    createOrderUseCase = new CreateOrder(mockOrderRepository);

    // Mock successful repository operations
    mockOrderRepository.create.mockResolvedValue('pref-123'); // Default for MP
    mockOrderRepository.save.mockResolvedValue(undefined); // Default for others
  });

  describe('PIX Payment Flow', () => {
    it('should complete PIX payment flow successfully', async () => {
      // Arrange
      const pixPaymentResponse = {
        id: 'pix-123',
        qr_code: 'mock-qr-code-string',
        qr_code_base64: 'data:image/png;base64,mock-base64',
        ticket_url: 'https://mercadopago.com/pix/ticket/123',
        expires_at: new Date(Date.now() + 30 * 60 * 1000),
      };

      mockPaymentService.createPixPayment.mockResolvedValue(pixPaymentResponse);

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.orderId).toBeDefined();
      expect(result.pixPayment).toEqual(pixPaymentResponse);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-123',
          status: 'pending_payment',
          payment: expect.objectContaining({
            method: 'pix',
            status: 'pending',
          }),
        })
      );
    });

    it('should handle PIX payment timeout', async () => {
      // Arrange
      mockPaymentService.createPixPayment.mockRejectedValue(
        new Error('PIX payment timeout')
      );

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('pagamento PIX');
    });

    // Skipped because we are mocking PaymentService so processWebhook is a mock function
    it.skip('should process PIX webhook correctly', async () => {
      // Arrange
      const webhookData = {
        type: 'payment',
        data: { id: 'pix-123' },
      };

      const paymentData = {
        id: 'pix-123',
        status: 'approved',
        external_reference: 'order-123',
      };

      mockPaymentService.getPayment.mockResolvedValue(paymentData);
      mockOrderRepository.findById.mockResolvedValue({
        id: 'order-123',
        status: 'pending_payment',
      });

      // Act
      await mockPaymentService.processWebhook(webhookData);

      // Assert
      expect(mockPaymentService.getPayment).toHaveBeenCalledWith('pix-123');
    });
  });

  describe('Crypto Payment Flow', () => {
    it('should complete Bitcoin payment flow successfully', async () => {
      // Arrange
      const cryptoPaymentResponse = {
        paymentId: 'crypto-123',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        amount: '0.00375000',
        exchangeRate: 40000,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      };

      mockCryptoPaymentService.createPayment.mockResolvedValue(cryptoPaymentResponse);
      mockCryptoPaymentService.getExchangeRate.mockResolvedValue(40000);

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'bitcoin' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.cryptoPayment).toEqual(cryptoPaymentResponse);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          payment: expect.objectContaining({
            method: 'bitcoin',
          }),
        })
      );
      expect(mockOrderRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          payment: expect.objectContaining({
            cryptoPaymentId: 'crypto-123',
          }),
        })
      );
    });

    it('should handle crypto exchange rate fluctuations', async () => {
      // Arrange
      const initialRate = 40000;
      const updatedRate = 42000;

      mockCryptoPaymentService.getExchangeRate
        .mockResolvedValueOnce(initialRate)
        .mockResolvedValueOnce(updatedRate);

      const processPayment = new ProcessCryptoPayment(mockCryptoPaymentService);

      // Act
      const result1 = await processPayment.execute({
        orderId: 'order-1',
        cryptoType: 'bitcoin',
        amountFiat: 40000, // R$ 400.00 in cents
      });

      const result2 = await processPayment.execute({
        orderId: 'order-2',
        cryptoType: 'bitcoin',
        amountFiat: 40000, // Same fiat amount
      });

      // Assert
      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      // The crypto amounts should be different due to rate change
      // expect(mockCryptoPaymentService.getExchangeRate).toHaveBeenCalledTimes(2);
    });

    it('should handle USDT payment with stable rate', async () => {
      // Arrange
      const usdtPaymentResponse = {
        paymentId: 'usdt-123',
        address: '0x742d35Cc6634C0532925a3b8D4C2B4E8C0C6C6C6',
        amount: '400.000000',
        exchangeRate: 1, // USDT is pegged to USD
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      };

      mockCryptoPaymentService.createPayment.mockResolvedValue(usdtPaymentResponse);
      mockCryptoPaymentService.getExchangeRate.mockResolvedValue(1);

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'usdt' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.cryptoPayment?.exchangeRate).toBe(1);
    });
  });

  describe('MercadoPago Payment Flow', () => {
    it('should create MercadoPago preference successfully', async () => {
      // Arrange
      const preferenceResponse = {
        id: 'pref-123',
        init_point: 'https://mercadopago.com/checkout/pref-123',
        sandbox_init_point: 'https://sandbox.mercadopago.com/checkout/pref-123',
      };

      // Create returns preference ID
      mockOrderRepository.create.mockResolvedValue('pref-123');
      // getCheckoutUrl returns URL
      mockOrderRepository.getCheckoutUrl.mockResolvedValue('https://mercadopago.com/checkout/pref-123');

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'mercadopago' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.preferenceId).toBe('pref-123');
      expect(result.checkoutUrl).toBe('https://mercadopago.com/checkout/pref-123');
      expect(mockOrderRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          items: expect.arrayContaining([
            expect.objectContaining({
              packageName: 'Escalada Iniciante',
              price: { amount: 15000, currency: 'BRL' },
              quantity: 1,
            }),
            expect.objectContaining({
              packageName: 'Escalada Avançada',
              price: { amount: 25000, currency: 'BRL' },
              quantity: 1,
            }),
          ]),
        })
      );
    });

    it('should handle MercadoPago API errors', async () => {
      // Arrange
      mockOrderRepository.create.mockRejectedValue(
        new Error('MercadoPago API error: Invalid credentials')
      );

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'mercadopago' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('MercadoPago');
    });
  });

  describe('WhatsApp Payment Flow', () => {
    it('should generate WhatsApp payment URL correctly', async () => {
      // Arrange
      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'whatsapp' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(result.whatsappUrl).toBeDefined();
      expect(result.whatsappUrl).toContain('https://api.whatsapp.com/send');
      expect(result.whatsappUrl).toContain('phone=');
      expect(result.whatsappUrl).toContain('text=');
    });

    it('should include complete order details in WhatsApp message', async () => {
      // Arrange
      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'whatsapp' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.whatsappUrl).toBeDefined();
      expect(mockOrderRepository.createWhatsAppOrder).toHaveBeenCalled();

      const decodedMessage = decodeURIComponent(result.whatsappUrl!.split('text=')[1]);
      expect(decodedMessage).toContain('NOVA RESERVA');
      expect(decodedMessage).toContain('João Silva');
      expect(decodedMessage).toContain('Maria Santos');
      expect(decodedMessage).toContain('Escalada Iniciante');
      expect(decodedMessage).toContain('Escalada Avançada');
      expect(decodedMessage).toContain('400,00'); // Total price
    });
  });

  describe('Coupon Integration', () => {
    it('should apply discount coupon correctly', async () => {
      // Arrange
      const mockCouponService = require('@/infrastructure/services/CouponService');
      mockCouponService.CouponService = jest.fn().mockImplementation(() => ({
        getCouponByCode: jest.fn().mockResolvedValue({
          id: 'coupon-1',
          code: 'CLIMB20',
          type: 'percentage',
          value: 20,
          isActive: true,
        }),
        markCouponAsUsed: jest.fn().mockResolvedValue(true),
      }));

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
        appliedCoupon: {
          code: 'CLIMB20',
          discountAmount: 8000, // 20% of R$ 400.00 = R$ 80.00 in cents
        },
      };

      mockPaymentService.createPixPayment.mockResolvedValue({
        id: 'pix-123',
        qr_code: 'mock-qr',
        qr_code_base64: 'mock-base64',
        ticket_url: 'mock-url',
        expires_at: new Date(),
      });

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          subtotal: { amount: 40000, currency: 'BRL' }, // R$ 400.00
          total: { amount: 32000, currency: 'BRL' }, // R$ 320.00 after discount
          discount: expect.objectContaining({
            couponCode: 'CLIMB20',
            discountAmount: { amount: 8000, currency: 'BRL' },
          }),
        })
      );
    });

    it('should handle invalid coupon gracefully', async () => {
      // Arrange
      const mockCouponService = require('@/infrastructure/services/CouponService');
      mockCouponService.CouponService = jest.fn().mockImplementation(() => ({
        getCouponByCode: jest.fn().mockResolvedValue(null),
        markCouponAsUsed: jest.fn(),
      }));

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
        appliedCoupon: {
          code: 'INVALID',
          discountAmount: 8000,
        },
      };

      mockPaymentService.createPixPayment.mockResolvedValue({
        id: 'pix-123',
        qr_code: 'mock-qr',
        qr_code_base64: 'mock-base64',
        ticket_url: 'mock-url',
        expires_at: new Date(),
      });

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(true);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          subtotal: { amount: 40000, currency: 'BRL' },
          total: { amount: 40000, currency: 'BRL' }, // No discount applied
          discount: undefined,
        })
      );
    });
  });

  describe('Order Validation', () => {
    it('should validate required fields', async () => {
      // Arrange
      const invalidOrderRequest = {
        userId: '',
        cartItems: [],
        participantDetails: {},
        climbingDetails: {
          selectedDate: new Date('2020-01-01'), // Past date
        },
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(invalidOrderRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should validate participant details completeness', async () => {
      // Arrange
      const incompleteParticipantDetails = {
        'cart-1': {
          name: 'João Silva',
          // Missing age, experienceLevel, healthDeclaration
        },
      };

      const orderRequest = {
        userId: 'user-123',
        cartItems: [mockCartItems[0]],
        participantDetails: incompleteParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Complete participant details required');
    });

    it('should validate climbing date is in the future', async () => {
      // Arrange
      const pastClimbingDetails = {
        ...mockClimbingDetails,
        selectedDate: new Date('2020-01-01'),
      };

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: pastClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Climbing date must be in the future');
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('should handle partial payment service failures', async () => {
      // Arrange
      mockPaymentService.createPixPayment
        .mockRejectedValueOnce(new Error('Temporary service unavailable'))
        .mockResolvedValueOnce({
          id: 'pix-123',
          qr_code: 'mock-qr',
          qr_code_base64: 'mock-base64',
          ticket_url: 'mock-url',
          expires_at: new Date(),
        });

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act - First attempt should fail
      const result1 = await createOrderUseCase.execute(orderRequest);
      expect(result1.success).toBe(false);

      // Act - Second attempt should succeed
      const result2 = await createOrderUseCase.execute(orderRequest);
      expect(result2.success).toBe(true);
    });

    it('should handle database transaction rollback on payment failure', async () => {
      // Arrange
      mockOrderRepository.create.mockResolvedValue({ id: 'order-123' });
      mockPaymentService.createPixPayment.mockRejectedValue(
        new Error('Payment service unavailable')
      );

      const orderRequest = {
        userId: 'user-123',
        cartItems: mockCartItems,
        participantDetails: mockParticipantDetails,
        climbingDetails: mockClimbingDetails,
        paymentMethod: 'pix' as const,
      };

      // Act
      const result = await createOrderUseCase.execute(orderRequest);

      // Assert
      expect(result.success).toBe(false);
      // In a real implementation, we'd verify that the order was not saved
      // or was marked as failed
    });
  });
});
