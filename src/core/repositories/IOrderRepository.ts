import { Order } from '../entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<string>; // Creates Mercado Pago preference, returns preference ID
  findById(preferenceId: string): Promise<Order | null>; // From MP metadata
  findByUserId(userId: string): Promise<Order[]>; // From MP search
  updateFromWebhook(paymentData: any): Promise<void>; // Update from MP webhook
  updateStatus(orderId: string, status: Order['status']): Promise<void>;
  getCheckoutUrl(preferenceId: string): Promise<string>; // Get checkout URL from preference
} 