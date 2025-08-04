import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order, OrderItem, ParticipantDetails, ClimbingDetails } from '@/core/entities/Order';
import { generateId } from '@/lib/utils';
import { CartItem } from '@/types';
import { CONTACT_INFO } from '@/lib/constants';

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
  whatsappUrl?: string;
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
            currency: 'BRL',
          },
          quantity: cartItem.quantity,
          participantDetails: participantDetail,
        };
      });

      // Create order entity
      const order: Order = {
        id: generateId(),
        userId: request.userId,
        items: orderItems,
        status: 'pending_payment',
        payment: {
          method: 'whatsapp' as any, // Changed from mercadopago to whatsapp
          status: 'pending',
        },
        climbingDetails: request.climbingDetails,
        total: {
          amount: total,
          currency: 'BRL',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Use WhatsApp flow instead of Mercado Pago
      const orderId = await this.orderRepository.createWhatsAppOrder(order);

      // Format phone for WhatsApp URL
      const whatsappPhone = this.formatPhoneForWhatsApp(CONTACT_INFO.phone);
      const whatsappMessage = this.formatCompleteOrderMessage(order, orderId);

      return {
        success: true,
        orderId: order.id,
        preferenceId: orderId,
        whatsappUrl: `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
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

      if (!participantDetail.name || !participantDetail.age || !participantDetail.experienceLevel) {
        throw new Error(`Complete participant details required for ${cartItem.packageName}`);
      }

      if (!participantDetail.healthDeclaration) {
        throw new Error(`Health declaration required for ${cartItem.packageName}`);
      }
    }
  }

  private calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity * 100; // Convert to cents
    }, 0);
  }

  private formatPhoneForWhatsApp(phone: string): string {
    // Convert "(11) 99999-9999" to "5511999999999"
    const cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits

    // If it's a Brazilian number without country code, add 55
    if (cleanPhone.length === 11 && cleanPhone.startsWith('11')) {
      return '55' + cleanPhone;
    }

    // If it's already complete or different format, return as is
    return cleanPhone;
  }

  private formatCurrency(amountInCents: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amountInCents / 100);
  }

  private formatCompleteOrderMessage(order: Order, orderId: string): string {
    let message = `🧗‍♂️ *NOVA RESERVA* 🧗‍♂️\n\n`;

    // Order info
    message += `📋 *Dados do Pedido:*\n`;
    message += `• ID: #${orderId}\n`;
    message += `• Data: ${new Date().toLocaleString('pt-BR')}\n`;
    message += `• Total: ${this.formatCurrency(order.total.amount)}\n\n`;

    // Climbing details
    message += `📅 *Detalhes da Escalada:*\n`;
    message += `• Data: ${order.climbingDetails.selectedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}\n`;

    if (order.climbingDetails.specialRequests) {
      message += `• Solicitações especiais: ${order.climbingDetails.specialRequests}\n`;
    }
    message += '\n';

    // Participants
    message += `👥 *Participantes (${order.items.length}):*\n`;
    order.items.forEach((item: any, index: number) => {
      const participant = item.participantDetails;
      message += `\n${index + 1}. *${participant.name}*\n`;
      message += `   • Pacote: ${item.packageName}\n`;
      message += `   • Idade: ${participant.age} anos\n`;
      message += `   • Nível: ${this.translateExperience(participant.experienceLevel)}\n`;
      message += `   • Número do tênis: ${participant.tenis || 'Não informado'}\n`;
      message += `   • Declaração saúde: ${participant.healthDeclaration ? '✅ Sim' : '❌ Não'}\n`;
    });

    message += `\n💰 *Pagamento:* Aguardando confirmação via WhatsApp`;
    message += `\n\n🔔 *Próximo passo:* Confirme os dados e método de pagamento`;

    return message;
  }

  private translateExperience(level: string): string {
    const levelMap: Record<string, string> = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
    };
    return levelMap[level] || level;
  }
}
