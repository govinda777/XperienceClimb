import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order, OrderItem, ParticipantDetails, ClimbingDetails } from '@/core/entities/Order';
import { generateId } from '@/lib/utils';
import { CartItem } from '@/types';

export interface CreateOrderRequest {
  userId: string;
  cartItems: CartItem[];
  participantDetails: Record<string, ParticipantDetails>; // Keyed by cart item ID
  climbingDetails: ClimbingDetails;
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  preferenceId?: string;
  checkoutUrl?: string;
  error?: string;
}

export class CreateOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResult> {
    try {
      // Validate request
      this.validateRequest(request);

      // Calculate total
      const total = this.calculateTotal(request.cartItems);

      // Create order items from cart items
      const orderItems: OrderItem[] = request.cartItems.map(cartItem => {
        const participantDetail = request.participantDetails[cartItem.id];
        if (!participantDetail) {
          throw new Error(`Participant details missing for cart item ${cartItem.id}`);
        }

        return {
          packageId: cartItem.packageId,
          packageName: cartItem.packageName,
          price: {
            amount: cartItem.price * 100, // Convert to cents
            currency: 'BRL'
          },
          quantity: cartItem.quantity,
          participantDetails: participantDetail
        };
      });

      // Create order entity
      const order: Order = {
        id: generateId(),
        userId: request.userId,
        items: orderItems,
        status: 'pending_payment',
        payment: {
          method: 'mercadopago',
          status: 'pending'
        },
        climbingDetails: request.climbingDetails,
        total: {
          amount: total,
          currency: 'BRL'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Create payment preference
      const preferenceId = await this.orderRepository.create(order);

      // Get checkout URL from the payment service
      const checkoutUrl = await this.orderRepository.getCheckoutUrl(preferenceId);

      return {
        success: true,
        orderId: order.id,
        preferenceId,
        checkoutUrl
      };

    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order'
      };
    }
  }

  private validateRequest(request: CreateOrderRequest): void {
    if (!request.userId) {
      throw new Error('User ID is required');
    }

    if (!request.cartItems || request.cartItems.length === 0) {
      throw new Error('Cart items are required');
    }

    if (!request.climbingDetails.selectedDate) {
      throw new Error('Climbing date is required');
    }

    // Validate climbing date is in the future
    if (request.climbingDetails.selectedDate <= new Date()) {
      throw new Error('Climbing date must be in the future');
    }

    // Validate each cart item has participant details
    for (const cartItem of request.cartItems) {
      const participantDetail = request.participantDetails[cartItem.id];
      if (!participantDetail) {
        throw new Error(`Participant details missing for ${cartItem.packageName}`);
      }

      if (!participantDetail.name || !participantDetail.emergencyContact.name || !participantDetail.emergencyContact.phone) {
        throw new Error(`Complete participant details required for ${cartItem.packageName}`);
      }

      if (!participantDetail.healthDeclaration) {
        throw new Error(`Health declaration required for ${cartItem.packageName}`);
      }
    }
  }

  private calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity * 100); // Convert to cents
    }, 0);
  }
} 