import { PaymentService } from '../PaymentService';
import { CreatePreferenceRequest, CreatePixPaymentRequest } from '@/core/services/IPaymentService';

// Mock fetch
global.fetch = jest.fn();

// Mock environment variables
const mockEnv = {
  MERCADOPAGO_ACCESS_TOKEN: 'test_access_token',
  NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY: 'test_public_key',
  NEXT_PUBLIC_APP_URL: 'https://test.com',
  NEXT_PUBLIC_SUCCESS_URL: 'https://test.com/success',
  NEXT_PUBLIC_FAILURE_URL: 'https://test.com/failure',
  NEXT_PUBLIC_PENDING_URL: 'https://test.com/pending',
};

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock environment variables
    originalEnv = process.env;
    process.env = { ...originalEnv, ...mockEnv };
    
    paymentService = new PaymentService();
    
    // Mock console methods to avoid noise in tests
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with environment variables', () => {
      expect(paymentService).toBeInstanceOf(PaymentService);
    });

    it('should warn when access token is missing', () => {
      // Delete the environment variable to simulate missing token
      delete process.env.MERCADOPAGO_ACCESS_TOKEN;
      
      new PaymentService();
      
      expect(console.warn).toHaveBeenCalledWith('MERCADOPAGO_ACCESS_TOKEN not configured');
    });

    it('should warn when public key is missing', () => {
      process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY = '';
      
      new PaymentService();
      
      expect(console.warn).toHaveBeenCalledWith('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY not configured');
    });

    it('should not warn about access token in browser environment', () => {
      // Mock window to simulate browser environment
      (global as any).window = {};
      process.env.MERCADOPAGO_ACCESS_TOKEN = '';
      
      new PaymentService();
      
      expect(console.warn).not.toHaveBeenCalledWith('MERCADOPAGO_ACCESS_TOKEN not configured');
      
      // Clean up
      delete (global as any).window;
    });
  });

  describe('createPreference', () => {
    const mockRequest: CreatePreferenceRequest = {
      orderId: 'order-123',
      items: [
        {
          id: 'pkg-1',
          title: 'Escalada Iniciante',
          quantity: 1,
          unit_price: 150,
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: 'João Silva',
        email: 'joao@example.com',
      },
      metadata: {
        package_type: 'climbing',
      },
    };

    const mockResponse = {
      id: 'pref-123',
      init_point: 'https://mercadopago.com/checkout/pref-123',
      sandbox_init_point: 'https://sandbox.mercadopago.com/checkout/pref-123',
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });
    });

    it('should create preference successfully', async () => {
      const result = await paymentService.createPreference(mockRequest);

      expect(result).toEqual({
        id: 'pref-123',
        init_point: 'https://mercadopago.com/checkout/pref-123',
        sandbox_init_point: 'https://sandbox.mercadopago.com/checkout/pref-123',
      });
    });

    it('should call MercadoPago API with correct parameters', async () => {
      await paymentService.createPreference(mockRequest);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadopago.com/checkout/preferences',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token',
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"external_reference":"order-123"'),
        })
      );
    });

    it('should include correct back URLs', async () => {
      await paymentService.createPreference(mockRequest);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.back_urls).toEqual({
        success: 'https://test.com/success',
        failure: 'https://test.com/failure',
        pending: 'https://test.com/pending',
      });
    });

    it('should include metadata and order ID', async () => {
      await paymentService.createPreference(mockRequest);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.metadata).toMatchObject({
        package_type: 'climbing',
        order_id: 'order-123',
      });
      expect(requestBody.external_reference).toBe('order-123');
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad Request'),
      });

      await expect(paymentService.createPreference(mockRequest)).rejects.toThrow(
        'Failed to create payment preference'
      );
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(paymentService.createPreference(mockRequest)).rejects.toThrow(
        'Failed to create payment preference'
      );
    });

    it('should include payment methods configuration when provided', async () => {
      const requestWithPaymentMethods = {
        ...mockRequest,
        paymentMethods: {
          excludedPaymentMethods: ['visa'],
          excludedPaymentTypes: ['credit_card'],
        },
      };

      await paymentService.createPreference(requestWithPaymentMethods);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.payment_methods).toEqual({
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      });
    });
  });

  describe('createPixPayment', () => {
    const mockPixRequest: CreatePixPaymentRequest = {
      orderId: 'order-123',
      amount: 15000, // 150.00 in cents
      description: 'Escalada Iniciante',
      payer: {
        name: 'João Silva',
        email: 'joao@example.com',
      },
    };

    const mockPixResponse = {
      id: 'pix-123',
      point_of_interaction: {
        transaction_data: {
          qr_code: 'qr_code_string',
          qr_code_base64: 'base64_qr_code',
          ticket_url: 'https://mercadopago.com/pix/ticket',
        },
      },
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPixResponse),
      });
    });

    it('should create PIX payment successfully', async () => {
      const result = await paymentService.createPixPayment(mockPixRequest);

      expect(result).toMatchObject({
        id: 'pix-123',
        qr_code: 'qr_code_string',
        qr_code_base64: 'base64_qr_code',
        ticket_url: 'https://mercadopago.com/pix/ticket',
      });
      expect(result.expires_at).toBeInstanceOf(Date);
    });

    it('should convert amount from cents to reais', async () => {
      await paymentService.createPixPayment(mockPixRequest);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.transaction_amount).toBe(150); // 15000 cents = 150 reais
    });

    it('should split payer name correctly', async () => {
      const requestWithFullName = {
        ...mockPixRequest,
        payer: {
          name: 'João Silva Santos',
          email: 'joao@example.com',
        },
      };

      await paymentService.createPixPayment(requestWithFullName);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.payer.first_name).toBe('João');
      expect(requestBody.payer.last_name).toBe('Silva Santos');
    });

    it('should handle single name', async () => {
      const requestWithSingleName = {
        ...mockPixRequest,
        payer: {
          name: 'João',
          email: 'joao@example.com',
        },
      };

      await paymentService.createPixPayment(requestWithSingleName);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.payer.first_name).toBe('João');
      expect(requestBody.payer.last_name).toBe('');
    });

    it('should handle missing QR code data gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 'pix-123' }),
      });

      const result = await paymentService.createPixPayment(mockPixRequest);

      expect(result).toMatchObject({
        id: 'pix-123',
        qr_code: '',
        qr_code_base64: '',
        ticket_url: '',
      });
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad Request'),
      });

      await expect(paymentService.createPixPayment(mockPixRequest)).rejects.toThrow(
        'Failed to create PIX payment'
      );
    });
  });

  describe('getPreference', () => {
    const mockPreference = {
      id: 'pref-123',
      items: [{ title: 'Test Item' }],
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPreference),
      });
    });

    it('should get preference successfully', async () => {
      const result = await paymentService.getPreference('pref-123');

      expect(result).toEqual(mockPreference);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadopago.com/checkout/preferences/pref-123',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('should handle API errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not Found'),
      });

      await expect(paymentService.getPreference('invalid-id')).rejects.toThrow();
    });
  });

  describe('getPayment', () => {
    const mockPayment = {
      id: 'pay-123',
      status: 'approved',
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPayment),
      });
    });

    it('should get payment successfully', async () => {
      const result = await paymentService.getPayment('pay-123');

      expect(result).toEqual(mockPayment);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadopago.com/v1/payments/pay-123',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('processWebhook', () => {
    const mockWebhookData = {
      type: 'payment',
      data: {
        id: 'pay-123',
      },
    };

    const mockPayment = {
      id: 'pay-123',
      status: 'approved',
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPayment),
      });
    });

    it('should process payment webhook successfully', async () => {
      await paymentService.processWebhook(mockWebhookData);

      expect(console.log).toHaveBeenCalledWith('Processing Mercado Pago webhook:', mockWebhookData);
      expect(console.log).toHaveBeenCalledWith('Payment status updated:', mockPayment);
    });

    it('should handle non-payment webhooks', async () => {
      const nonPaymentWebhook = {
        type: 'other',
        data: { id: 'other-123' },
      };

      await paymentService.processWebhook(nonPaymentWebhook);

      expect(console.log).toHaveBeenCalledWith('Processing Mercado Pago webhook:', nonPaymentWebhook);
      // Should not call getPayment for non-payment webhooks
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should handle webhook processing errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(paymentService.processWebhook(mockWebhookData)).rejects.toThrow('API Error');
    });
  });

  describe('getCheckoutUrl', () => {
    const mockPreference = {
      init_point: 'https://mercadopago.com/checkout/pref-123',
      sandbox_init_point: 'https://sandbox.mercadopago.com/checkout/pref-123',
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPreference),
      });
    });

    it('should return sandbox URL when available', async () => {
      const url = await paymentService.getCheckoutUrl('pref-123');

      expect(url).toBe('https://sandbox.mercadopago.com/checkout/pref-123');
    });

    it('should fallback to production URL when sandbox not available', async () => {
      const preferenceWithoutSandbox = {
        init_point: 'https://mercadopago.com/checkout/pref-123',
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(preferenceWithoutSandbox),
      });

      const url = await paymentService.getCheckoutUrl('pref-123');

      expect(url).toBe('https://mercadopago.com/checkout/pref-123');
    });

    it('should handle errors when getting checkout URL', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(paymentService.getCheckoutUrl('invalid-id')).rejects.toThrow();
    });
  });

  describe('API call error handling', () => {
    it('should throw error when access token is missing', async () => {
      // Create service without access token
      delete process.env.MERCADOPAGO_ACCESS_TOKEN;
      const serviceWithoutToken = new PaymentService();

      const request: CreatePreferenceRequest = {
        orderId: 'order-123',
        items: [],
        payer: { name: 'Test', email: 'test@example.com' },
      };

      await expect(serviceWithoutToken.createPreference(request)).rejects.toThrow(
        'Failed to create payment preference'
      );
    });

    it('should handle fetch network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const request: CreatePreferenceRequest = {
        orderId: 'order-123',
        items: [],
        payer: { name: 'Test', email: 'test@example.com' },
      };

      await expect(paymentService.createPreference(request)).rejects.toThrow(
        'Failed to create payment preference'
      );
    });

    it('should handle malformed API responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      const request: CreatePreferenceRequest = {
        orderId: 'order-123',
        items: [],
        payer: { name: 'Test', email: 'test@example.com' },
      };

      await expect(paymentService.createPreference(request)).rejects.toThrow(
        'Failed to create payment preference'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty items array', async () => {
      const request: CreatePreferenceRequest = {
        orderId: 'order-123',
        items: [],
        payer: { name: 'Test', email: 'test@example.com' },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 'pref-123', init_point: 'test-url' }),
      });

      const result = await paymentService.createPreference(request);

      expect(result.id).toBe('pref-123');
    });

    it('should handle special characters in payer name', async () => {
      const request: CreatePixPaymentRequest = {
        orderId: 'order-123',
        amount: 15000,
        description: 'Test',
        payer: {
          name: 'José da Silva & Cia.',
          email: 'jose@example.com',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 'pix-123' }),
      });

      await paymentService.createPixPayment(request);

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.payer.first_name).toBe('José');
      expect(requestBody.payer.last_name).toBe('da Silva & Cia.');
    });
  });
});
