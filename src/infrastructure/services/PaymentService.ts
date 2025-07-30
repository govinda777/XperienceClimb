import { IPaymentService, CreatePreferenceRequest, PaymentPreference } from '@/core/services/IPaymentService';

export class PaymentService implements IPaymentService {
  private accessToken: string;
  private publicKey: string;
  
  constructor() {
    this.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
    this.publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '';
    
    if (!this.accessToken && typeof window === 'undefined') {
      console.warn('MERCADOPAGO_ACCESS_TOKEN not configured');
    }
    if (!this.publicKey) {
      console.warn('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY not configured');
    }
  }

  async createPreference(request: CreatePreferenceRequest): Promise<PaymentPreference> {
    try {
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
      };

      // In a real implementation, you would call Mercado Pago API
      // For now, we'll simulate the response
      const response = await this.callMercadoPagoAPI('/checkout/preferences', preference);
      
      return {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      };
    } catch (error) {
      console.error('Error creating Mercado Pago preference:', error);
      throw new Error('Failed to create payment preference');
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
        
        // Update order status based on payment status
        // This would typically update your database
        console.log('Payment status updated:', payment);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
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

  private async getPayment(paymentId: string): Promise<any> {
    return await this.callMercadoPagoAPI(`/v1/payments/${paymentId}`, null, 'GET');
  }

  private async callMercadoPagoAPI(endpoint: string, data: any = null, method: 'GET' | 'POST' = 'POST'): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Mercado Pago access token not configured');
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