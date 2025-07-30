import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order } from '@/core/entities/Order';
import { PaymentService } from '../services/PaymentService';
import { generateId } from '@/lib/utils';

export class OrderRepository implements IOrderRepository {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async create(order: Order): Promise<string> {
    try {
      // Convert order to Mercado Pago preference format
      const preferenceRequest = {
        orderId: order.id,
        items: order.items.map(item => ({
          id: item.packageId,
          title: item.packageName,
          unit_price: item.price.amount / 100, // Convert from cents
          quantity: item.quantity,
        })),
        payer: {
          name: order.items[0]?.participantDetails?.name || 'Cliente',
          email: 'cliente@xperienceclimb.com', // This should come from authenticated user
        },
        metadata: {
          order_id: order.id,
          user_id: order.userId,
          climbing_date: order.climbingDetails.selectedDate.toISOString(),
          total_amount: order.total.amount,
          participants: JSON.stringify(order.items.map(item => item.participantDetails)),
          special_requests: order.climbingDetails.specialRequests || '',
        },
      };

      const preference = await this.paymentService.createPreference(preferenceRequest);
      
      // Store order locally for quick access (in production, use a database)
      this.storeOrderLocally(order, preference.id);
      
      return preference.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async findById(preferenceId: string): Promise<Order | null> {
    try {
      // First try to get from local storage
      const localOrder = this.getOrderFromLocalStorage(preferenceId);
      if (localOrder) {
        return localOrder;
      }

      // If not found locally, try to reconstruct from Mercado Pago
      const preference = await this.paymentService.getPreference(preferenceId);
      if (preference && preference.metadata) {
        return this.reconstructOrderFromMetadata(preference.metadata);
      }

      return null;
    } catch (error) {
      console.error('Error finding order by ID:', error);
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Order[]> {
    try {
      // In production, this would query your database
      // For now, we'll check localStorage for orders
      const allOrders = this.getAllOrdersFromLocalStorage();
      return allOrders.filter(order => order.userId === userId);
    } catch (error) {
      console.error('Error finding orders by user ID:', error);
      return [];
    }
  }

  async updateFromWebhook(paymentData: any): Promise<void> {
    try {
      const preferenceId = paymentData.external_reference;
      if (!preferenceId) {
        throw new Error('No external reference found in payment data');
      }

      const order = await this.findById(preferenceId);
      if (!order) {
        throw new Error(`Order not found for preference ID: ${preferenceId}`);
      }

      // Update payment info based on webhook data
      order.payment.status = this.mapPaymentStatus(paymentData.status);
      order.payment.transactionId = paymentData.id;
      order.payment.processedAt = new Date(paymentData.date_approved || new Date());
      order.updatedAt = new Date();

      // Update order status based on payment status
      if (order.payment.status === 'completed') {
        order.status = 'confirmed';
      } else if (order.payment.status === 'failed') {
        order.status = 'cancelled';
      }

      // Store updated order
      this.storeOrderLocally(order, preferenceId);

      console.log(`Order ${order.id} updated from webhook:`, order);
    } catch (error) {
      console.error('Error updating order from webhook:', error);
      throw error;
    }
  }

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      // Find order by ID across all preferences
      const allOrders = this.getAllOrdersFromLocalStorage();
      const orderIndex = allOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        throw new Error(`Order not found: ${orderId}`);
      }

      allOrders[orderIndex].status = status;
      allOrders[orderIndex].updatedAt = new Date();

      // Update in localStorage
      localStorage.setItem('xc_orders', JSON.stringify(allOrders));
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  private storeOrderLocally(order: Order, preferenceId: string): void {
    try {
      const orderData = {
        ...order,
        preferenceId,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        climbingDetails: {
          ...order.climbingDetails,
          selectedDate: order.climbingDetails.selectedDate.toISOString(),
        },
      };

      // Store individual order
      localStorage.setItem(`xc_order_${preferenceId}`, JSON.stringify(orderData));

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

  private getOrderFromLocalStorage(preferenceId: string): Order | null {
    try {
      const stored = localStorage.getItem(`xc_order_${preferenceId}`);
      if (!stored) return null;

      const orderData = JSON.parse(stored);
      
      // Convert string dates back to Date objects
      return {
        ...orderData,
        createdAt: new Date(orderData.createdAt),
        updatedAt: new Date(orderData.updatedAt),
        climbingDetails: {
          ...orderData.climbingDetails,
          selectedDate: new Date(orderData.climbingDetails.selectedDate),
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
          selectedDate: new Date(orderData.climbingDetails.selectedDate),
        },
      }));
    } catch (error) {
      console.error('Error getting all orders from localStorage:', error);
      return [];
    }
  }

  private reconstructOrderFromMetadata(metadata: any): Order {
    return {
      id: metadata.order_id,
      userId: metadata.user_id,
      items: JSON.parse(metadata.participants || '[]'),
      status: 'pending_payment',
      payment: {
        method: 'mercadopago',
        status: 'pending',
      },
      climbingDetails: {
        selectedDate: new Date(metadata.climbing_date),
        specialRequests: metadata.special_requests,
      },
      total: {
        amount: metadata.total_amount,
        currency: 'BRL',
      },
      createdAt: new Date(metadata.created_at),
      updatedAt: new Date(),
    };
  }

  private mapPaymentStatus(mpStatus: string): Order['payment']['status'] {
    const statusMap: Record<string, Order['payment']['status']> = {
      'approved': 'completed',
      'pending': 'pending',
      'in_process': 'processing',
      'rejected': 'failed',
      'cancelled': 'failed',
      'refunded': 'refunded',
    };

    return statusMap[mpStatus] || 'failed';
  }
} 