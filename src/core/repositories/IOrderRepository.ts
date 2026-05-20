import { Order } from '../entities/Order';

export interface IOrderRepository {
  createWhatsAppOrder(order: Order): Promise<string>; // Returns order ID for WhatsApp
  save(order: Order): Promise<void>; // Save order
  findById(orderId: string): Promise<Order | null>; // Find order by ID
  findByUserId(userId: string): Promise<Order[]>; // Find orders by user ID
  update(order: Order): Promise<void>; // Update order
  updateStatus(orderId: string, status: Order['status']): Promise<void>;
}
