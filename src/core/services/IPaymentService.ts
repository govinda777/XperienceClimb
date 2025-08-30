import { Order } from '../entities/Order';
import { PaymentMethod } from '../entities/Coupon';

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
  paymentMethods?: PaymentMethod[];
}

export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

export interface CreatePixPaymentRequest {
  orderId: string;
  amount: number; // in cents
  payer: {
    name: string;
    email: string;
  };
  description: string;
}

export interface PixPaymentResponse {
  id: string;
  qr_code: string;
  qr_code_base64: string;
  ticket_url: string;
  expires_at: Date;
}

export interface IPaymentService {
  createPreference(request: CreatePreferenceRequest): Promise<PaymentPreference>;
  createPixPayment(request: CreatePixPaymentRequest): Promise<PixPaymentResponse>;
  getPreference(preferenceId: string): Promise<any>;
  getPayment(paymentId: string): Promise<any>;
  processWebhook(webhookData: any): Promise<void>;
  getCheckoutUrl(preferenceId: string): Promise<string>;
} 