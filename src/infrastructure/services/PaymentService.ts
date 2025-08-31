import { IPaymentService, CreatePreferenceRequest, PaymentPreference, CreatePixPaymentRequest, PixPaymentResponse } from '@/core/services/IPaymentService';
import { PaymentMonitor } from '@/lib/payment-monitor';

export class PaymentService implements IPaymentService {
  private accessToken: string;
  private publicKey: string;
  
  private monitor: PaymentMonitor;

  constructor() {
    this.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
    this.publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '';
    this.monitor = PaymentMonitor.getInstance();
    
    if (!this.accessToken && typeof window === 'undefined') {
      console.warn('MERCADOPAGO_ACCESS_TOKEN not configured');
    }
    if (!this.publicKey) {
      console.warn('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY not configured');
    }
  }

  async createPreference(request: CreatePreferenceRequest): Promise<PaymentPreference> {
    try {
      // Track payment attempt
      this.monitor.trackPaymentAttempt(
        request.orderId,
        'mercadopago',
        request.items.reduce((total, item) => total + (item.unit_price * item.quantity), 0) * 100, // Convert to cents
        'BRL',
        { items: request.items }
      );
      const preference = {
        items: request.items,
        payer: {
          name: request.payer.name,
          email: request.payer.email,
        },
        back_urls: {
          success: process.env.NEXT_PUBLIC_SUCCESS_URL || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          failure: process.env.NEXT_PUBLIC_FAILURE_URL || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
          pending: process.env.NEXT_PUBLIC_PENDING_URL || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
        },
        auto_return: 'approved' as const,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
        metadata: {
          ...request.metadata,
          order_id: request.orderId,
          created_at: new Date().toISOString(),
        },
        statement_descriptor: 'XPERIENCE CLIMB',
        external_reference: request.orderId,
        // Configure payment methods if specified
        payment_methods: request.paymentMethods ? {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 1
        } : undefined,
      };

      const response = await this.callMercadoPagoAPI('/checkout/preferences', preference);
      
      return {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      };
    } catch (error) {
      console.error('Error creating Mercado Pago preference:', error);
      this.monitor.trackPaymentError(request.orderId, 'mercadopago', error as Error);
      throw new Error('Failed to create payment preference');
    }
  }

  async createPixPayment(request: CreatePixPaymentRequest): Promise<PixPaymentResponse> {
    try {
      // Track payment attempt
      this.monitor.trackPaymentAttempt(
        request.orderId,
        'pix',
        request.amount,
        'BRL',
        { description: request.description }
      );
      const pixPayment = {
        transaction_amount: request.amount / 100, // Convert cents to reais
        description: request.description,
        payment_method_id: 'pix',
        payer: {
          email: request.payer.email,
          first_name: request.payer.name.split(' ')[0],
          last_name: request.payer.name.split(' ').slice(1).join(' ') || '',
        },
        external_reference: request.orderId,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/pix/webhook`,
        metadata: {
          order_id: request.orderId,
          created_at: new Date().toISOString(),
        },
      };

      const response = await this.callMercadoPagoAPI('/v1/payments', pixPayment);
      
      // PIX payments return QR code information
      return {
        id: response.id,
        qr_code: response.point_of_interaction?.transaction_data?.qr_code || '',
        qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64 || '',
        ticket_url: response.point_of_interaction?.transaction_data?.ticket_url || '',
        expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      };
    } catch (error) {
      console.error('Error creating PIX payment:', error);
      this.monitor.trackPaymentError(request.orderId, 'pix', error as Error);
      throw new Error('Failed to create PIX payment');
    }
  }

  async getPreference(preferenceId: string): Promise<any> {
    try {
      return await this.callMercadoPagoAPI(`/checkout/preferences/${preferenceId}`, null, 'GET');
    } catch (error) {
      console.error('Error getting Mercado Pago preference:', error);
      throw error;
    }
  }



  async processWebhook(webhookData: any): Promise<void> {
    try {
      console.log('Processing Mercado Pago webhook:', webhookData);
      
      // Validate webhook signature here in production
      
      if (webhookData.type === 'payment') {
        const paymentId = webhookData.data.id;
        const payment = await this.getPayment(paymentId);
        
        // Track payment event
        this.monitor.trackPaymentEvent({
          type: 'webhook_received',
          orderId: payment.external_reference,
          paymentId: payment.id,
          amount: payment.transaction_amount * 100, // Convert to cents
          currency: payment.currency_id,
          status: payment.status,
          provider: 'mercadopago',
          metadata: {
            payment_type: payment.payment_type_id,
            payment_method: payment.payment_method_id,
            status_detail: payment.status_detail,
            payer: payment.payer,
            webhook_type: webhookData.type,
            webhook_action: webhookData.action
          }
        });

        // Update order status based on payment status
        // This would typically update your database
        console.log('Payment status updated:', payment);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      if (webhookData.data?.id) {
        this.monitor.trackPaymentError(
          webhookData.data.id,
          'mercadopago',
          error as Error,
          { webhook_type: webhookData.type }
        );
      }
      throw error;
    }
  }

  async getCheckoutUrl(preferenceId: string): Promise<string> {
    try {
      const preference = await this.getPreference(preferenceId);
      
      // Use sandbox URL for development
      return preference.sandbox_init_point || preference.init_point;
    } catch (error) {
      console.error('Error getting checkout URL:', error);
      throw error;
    }
  }

  async getPayment(paymentId: string): Promise<any> {
    return await this.callMercadoPagoAPI(`/v1/payments/${paymentId}`, null, 'GET');
  }

  private async callMercadoPagoAPI(endpoint: string, data: any = null, method: 'GET' | 'POST' = 'POST'): Promise<any> {
    if (!this.accessToken) {
      throw new Error('MercadoPago access token not configured');
    }

    try {
      const url = `https://api.mercadopago.com${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      if (data && method === 'POST') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Mercado Pago API error: ${response.status} - ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Mercado Pago API call failed:', error);
      throw error;
    }
  }

} 