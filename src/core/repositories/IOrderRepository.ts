import { Order } from '../entities/Order';

export interface IOrderRepository {
  create(_order: Order): Promise<string>; // Creates Mercado Pago preference, returns preference ID
  createWhatsAppOrder(_order: Order): Promise<string>; // Returns order ID for WhatsApp
  save(_order: Order): Promise<void>; // Save order without MP preference
  findById(_preferenceId: string): Promise<Order | null>; // From MP metadata
  findByUserId(_userId: string): Promise<Order[]>; // From MP search
  update(_order: Order): Promise<void>; // Update order
  updateFromWebhook(_paymentData: any): Promise<void>; // Update from MP webhook
  updateStatus(_orderId: string, _status: Order['status']): Promise<void>;
  getCheckoutUrl(_preferenceId: string): Promise<string>; // Get checkout URL from preference
} 