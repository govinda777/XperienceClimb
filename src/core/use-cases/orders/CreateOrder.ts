import { IOrderRepository } from '@/core/repositories/IOrderRepository';
import { Order, OrderItem, ParticipantDetails, ClimbingDetails, DiscountInfo } from '@/core/entities/Order';
import { PaymentMethod } from '@/core/entities/Coupon';
import { generateId } from '@/lib/utils';
import { CartItem } from '@/types';
import { CONTACT_INFO } from '@/lib/constants';
import { PaymentService } from '@/infrastructure/services/PaymentService';
import { CryptoPaymentService } from '@/infrastructure/services/CryptoPaymentService';
import { CouponService } from '@/infrastructure/services/CouponService';
import { ProcessPixPayment } from '../payments/ProcessPixPayment';
import { ProcessCryptoPayment } from '../payments/ProcessCryptoPayment';
import { ProcessGitHubPayment } from '../payments/ProcessGitHubPayment';
import { GitHubPaymentService } from '@/infrastructure/services/GitHubPaymentService';

export interface CreateOrderRequest {
  userId: string;
  cartItems: CartItem[];
  participantDetails: Record<string, ParticipantDetails>; // Keyed by cart item ID
  climbingDetails: ClimbingDetails;
  paymentMethod: PaymentMethod;
  appliedCoupon?: {
    code: string;
    discountAmount: number;
  };
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  preferenceId?: string;
  checkoutUrl?: string;
  whatsappUrl?: string;
  pixPayment?: any;
  cryptoPayment?: any;
  githubPayment?: any;
  error?: string;
}

export class CreateOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResult> {
    try {
      // Validate request
      this.validateRequest(request);

      // Calculate subtotal
      const subtotal = this.calculateTotal(request.cartItems);
      
      // Apply coupon discount if provided
      let discountInfo: DiscountInfo | undefined;
      let finalTotal = subtotal;
      
      if (request.appliedCoupon) {
        const couponService = new CouponService();
        const coupon = await couponService.getCouponByCode(request.appliedCoupon.code);
        
        if (coupon) {
          discountInfo = {
            couponCode: coupon.code,
            couponId: coupon.id,
            discountType: coupon.type,
            discountValue: coupon.value,
            discountAmount: {
              amount: request.appliedCoupon.discountAmount,
              currency: 'BRL'
            }
          };
          finalTotal = subtotal - request.appliedCoupon.discountAmount;
          
          // Mark coupon as used
          await couponService.markCouponAsUsed(coupon.id, request.userId);
        }
      }

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
          method: request.paymentMethod,
          status: 'pending',
        },
        climbingDetails: request.climbingDetails,
        subtotal: {
          amount: subtotal,
          currency: 'BRL',
        },
        discount: discountInfo,
        total: {
          amount: finalTotal,
          currency: 'BRL',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save order to repository
      await this.orderRepository.create(order);

      // Process payment based on selected method
      return await this.processPayment(order, request);

    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
      };
    }
  }

  private async processPayment(order: Order, request: CreateOrderRequest): Promise<CreateOrderResult> {
    const baseResult = {
      success: true,
      orderId: order.id,
    };

    switch (request.paymentMethod) {
      case 'whatsapp':
        return this.processWhatsAppPayment(order, baseResult);
      
      case 'mercadopago':
        return this.processMercadoPagoPayment(order, baseResult);
      
      case 'pix':
        return this.processPixPayment(order, baseResult);
      
      case 'bitcoin':
      case 'usdt':
        return this.processCryptoPayment(order, baseResult, request.paymentMethod);
      
      case 'github':
        return this.processGitHubPayment(order, baseResult);
      
      default:
        throw new Error(`Unsupported payment method: ${request.paymentMethod}`);
    }
  }

  private async processWhatsAppPayment(order: Order, baseResult: any): Promise<CreateOrderResult> {
    const whatsappPhone = this.formatPhoneForWhatsApp(CONTACT_INFO.phone);
    const whatsappMessage = this.formatCompleteOrderMessage(order);

    return {
      ...baseResult,
      whatsappUrl: `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`,
    };
  }

  private async processMercadoPagoPayment(order: Order, baseResult: any): Promise<CreateOrderResult> {
    const paymentService = new PaymentService();
    
    const preference = await paymentService.createPreference({
      orderId: order.id,
      items: order.items.map(item => ({
        title: item.packageName,
        unit_price: item.price.amount / 100,
        quantity: item.quantity,
        id: item.packageId
      })),
      payer: {
        name: order.items[0].participantDetails.name,
        email: 'customer@example.com' // In production, get from user profile
      },
      metadata: {
        order_id: order.id,
        user_id: order.userId
      }
    });

    return {
      ...baseResult,
      preferenceId: preference.id,
      checkoutUrl: preference.init_point
    };
  }

  private async processPixPayment(order: Order, baseResult: any): Promise<CreateOrderResult> {
    const paymentService = new PaymentService();
    const processPixPayment = new ProcessPixPayment(paymentService);
    
    const result = await processPixPayment.execute({
      orderId: order.id,
      amount: order.total.amount,
      customerName: order.items[0].participantDetails.name,
      customerEmail: 'customer@example.com', // In production, get from user profile
      description: `Xperience Climb - ${order.items.map(i => i.packageName).join(', ')}`
    });

    if (result.success && result.pixPayment) {
      return {
        ...baseResult,
        pixPayment: result.pixPayment
      };
    } else {
      throw new Error(result.error || 'Failed to create PIX payment');
    }
  }

  private async processCryptoPayment(order: Order, baseResult: any, cryptoType: 'bitcoin' | 'usdt'): Promise<CreateOrderResult> {
    const cryptoPaymentService = new CryptoPaymentService();
    const processCryptoPayment = new ProcessCryptoPayment(cryptoPaymentService);
    
    const result = await processCryptoPayment.execute({
      orderId: order.id,
      cryptoType,
      amountFiat: order.total.amount
    });

    if (result.success && result.cryptoPayment) {
      // Update order with crypto payment ID
      order.payment.cryptoPaymentId = result.cryptoPayment.paymentId;
      await this.orderRepository.update(order);

      return {
        ...baseResult,
        cryptoPayment: result.cryptoPayment
      };
    } else {
      throw new Error(result.error || 'Failed to create crypto payment');
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

  private formatCompleteOrderMessage(order: Order): string {
    let message = `🧗‍♂️ *NOVA RESERVA* 🧗‍♂️\n\n`;

    // Order info
    message += `📋 *Dados do Pedido:*\n`;
    message += `• ID: #${order.id}\n`;
    message += `• Data: ${new Date().toLocaleString('pt-BR')}\n`;
    
    // Pricing info
    message += `• Subtotal: ${this.formatCurrency(order.subtotal.amount)}\n`;
    if (order.discount) {
      message += `• Desconto (${order.discount.couponCode}): -${this.formatCurrency(order.discount.discountAmount.amount)}\n`;
    }
    message += `• Total: ${this.formatCurrency(order.total.amount)}\n`;
    message += `• Método de pagamento: ${this.getPaymentMethodName(order.payment.method)}\n\n`;

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
      message += `   • Declaração saúde: ${participant.healthDeclaration ? '✅ Sim' : '❌ Não'}\n`;
    });

    message += `\n💰 *Pagamento:* ${this.getPaymentStatusMessage(order.payment.method)}`;
    message += `\n\n🔔 *Próximo passo:* Confirme os dados e finalize o pagamento`;

    return message;
  }

  private getPaymentMethodName(method: PaymentMethod): string {
    const methodNames = {
      mercadopago: 'Cartão de Crédito',
      pix: 'PIX',
      bitcoin: 'Bitcoin',
      usdt: 'USDT',
      whatsapp: 'WhatsApp',
      github: 'GitHub Sponsors'
    };
    return methodNames[method] || method;
  }

  private getPaymentStatusMessage(method: PaymentMethod): string {
    switch (method) {
      case 'whatsapp':
        return 'Aguardando confirmação via WhatsApp';
      case 'pix':
        return 'Aguardando pagamento PIX';
      case 'bitcoin':
        return 'Aguardando pagamento Bitcoin';
      case 'usdt':
        return 'Aguardando pagamento USDT';
      case 'mercadopago':
        return 'Processando pagamento';
      case 'github':
        return 'Aguardando patrocínio GitHub';
      default:
        return 'Aguardando pagamento';
    }
  }

  private async processGitHubPayment(order: Order, baseResult: any): Promise<CreateOrderResult> {
    try {
      const gitHubPaymentService = new GitHubPaymentService();
      const processGitHubPayment = new ProcessGitHubPayment(gitHubPaymentService);

      // Use a default sponsor username (in production, this should be configurable)
      const sponsorUsername = process.env.GITHUB_SPONSOR_USERNAME || 'govinda777';

      const result = await processGitHubPayment.execute({
        orderId: order.id,
        amount: order.total,
        sponsorUsername,
        frequency: 'one-time',
        metadata: {
          orderNumber: order.orderNumber,
          customerName: order.participantDetails[Object.keys(order.participantDetails)[0]]?.name,
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      });

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to create GitHub payment'
        };
      }

      return {
        ...baseResult,
        githubPayment: result.githubPayment
      };

    } catch (error) {
      console.error('Error processing GitHub payment:', error);
      return {
        success: false,
        error: 'Failed to process GitHub payment'
      };
    }
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
