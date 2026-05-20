import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order } from '@/core/entities/Order';
import { WhatsAppService } from '../services/WhatsAppService';

export class OrderRepository implements IOrderRepository {
  private whatsAppService: WhatsAppService;

  constructor() {
    this.whatsAppService = new WhatsAppService();
  }

  async createWhatsAppOrder(order: Order): Promise<string> {
    try {
      // Store order locally with WhatsApp method
      const orderId = order.id;
      this.storeOrderLocally(order);

      // Send WhatsApp message with order details
      await this.whatsAppService.sendOrderConfirmation({
        order,
        paymentData: {
          id: 'whatsapp_' + orderId,
          status: 'pending_whatsapp',
          date_approved: new Date().toISOString(),
        },
      });

      console.log(`WhatsApp order created: ${orderId}`);
      return orderId;
    } catch (error) {
      console.error('Error creating WhatsApp order:', error);
      throw new Error('Failed to create WhatsApp order');
    }
  }

  async save(order: Order): Promise<void> {
    try {
      this.storeOrderLocally(order);
    } catch (error) {
      console.error('Error saving order:', error);
      throw new Error('Failed to save order');
    }
  }

  async findById(orderId: string): Promise<Order | null> {
    try {
      return this.getOrderFromLocalStorage(orderId);
    } catch (error) {
      console.error('Error finding order by ID:', error);
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Order[]> {
    try {
      const allOrders = this.getAllOrdersFromLocalStorage();
      return allOrders.filter(order => order.userId === userId);
    } catch (error) {
      console.error('Error finding orders by user ID:', error);
      return [];
    }
  }

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      const allOrders = this.getAllOrdersFromLocalStorage();
      const orderIndex = allOrders.findIndex(order => order.id === orderId);

      if (orderIndex === -1) {
        throw new Error(`Order not found: ${orderId}`);
      }

      allOrders[orderIndex].status = status;
      allOrders[orderIndex].updatedAt = new Date();

      // Update in localStorage
      localStorage.setItem('xc_orders', JSON.stringify(allOrders));

      // Also update individual order storage
      this.storeOrderLocally(allOrders[orderIndex]);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async update(order: Order): Promise<void> {
    try {
      const allOrders = this.getAllOrdersFromLocalStorage();
      const orderIndex = allOrders.findIndex(o => o.id === order.id);

      if (orderIndex === -1) {
        throw new Error(`Order not found: ${order.id}`);
      }

      // Update order
      allOrders[orderIndex] = {
        ...allOrders[orderIndex],
        ...order,
        updatedAt: new Date(),
      };

      // Update in localStorage
      localStorage.setItem('xc_orders', JSON.stringify(allOrders));

      // Also update individual order storage
      this.storeOrderLocally(allOrders[orderIndex]);

      console.log(`Order ${order.id} updated successfully`);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  private storeOrderLocally(order: Order): void {
    try {
      const orderData = {
        ...order,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        climbingDetails: {
          ...order.climbingDetails,
          selectedDate: order.climbingDetails.selectedDate.toISOString(),
        },
      };

      // Store individual order
      localStorage.setItem(`xc_order_${order.id}`, JSON.stringify(orderData));

      // Update orders list
      const allOrders = this.getAllOrdersFromLocalStorage();
      const existingIndex = allOrders.findIndex(o => o.id === order.id);

      if (existingIndex >= 0) {
        allOrders[existingIndex] = order;
      } else {
        allOrders.push(order);
      }

      localStorage.setItem('xc_orders', JSON.stringify(allOrders));
    } catch (error) {
      console.error('Error storing order locally:', error);
    }
  }

  private getOrderFromLocalStorage(orderId: string): Order | null {
    try {
      const stored = localStorage.getItem(`xc_order_${orderId}`);
      if (!stored) return null;

      const orderData = JSON.parse(stored);

      // Convert string dates back to Date objects
      return {
        ...orderData,
        createdAt: new Date(orderData.createdAt),
        updatedAt: new Date(orderData.updatedAt),
        climbingDetails: {
          ...orderData.climbingDetails,
          selectedDate: new Date(
            orderData.climbingDetails.selectedDate +
              (orderData.climbingDetails.selectedDate.includes('T') ? '' : 'T12:00:00')
          ),
        },
      };
    } catch (error) {
      console.error('Error getting order from localStorage:', error);
      return null;
    }
  }

  private getAllOrdersFromLocalStorage(): Order[] {
    try {
      const stored = localStorage.getItem('xc_orders');
      if (!stored) return [];

      const ordersData = JSON.parse(stored);
      return ordersData.map((orderData: any) => ({
        ...orderData,
        createdAt: new Date(orderData.createdAt),
        updatedAt: new Date(orderData.updatedAt),
        climbingDetails: {
          ...orderData.climbingDetails,
          selectedDate: new Date(
            orderData.climbingDetails.selectedDate +
              (orderData.climbingDetails.selectedDate.includes('T') ? '' : 'T12:00:00')
          ),
        },
      }));
    } catch (error) {
      console.error('Error getting all orders from localStorage:', error);
      return [];
    }
  }
}
