import { Order } from '../entities/Order';

export interface CreatePreferenceRequest {
  orderId: string;
  items: Array<{
    title: string;
    unit_price: number;
    quantity: number;
    id: string;
  }>;
  payer: {
    name: string;
    email: string;
  };
  metadata: Record<string, any>;
}

export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface IPaymentService {
  createPreference(request: CreatePreferenceRequest): Promise<PaymentPreference>;
  getPreference(preferenceId: string): Promise<any>;
  processWebhook(webhookData: any): Promise<void>;
  getCheckoutUrl(preferenceId: string): Promise<string>;
} 