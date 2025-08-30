import { IPaymentService, CreatePixPaymentRequest, PixPaymentResponse } from '../../services/IPaymentService';

export interface ProcessPixPaymentRequest {
  orderId: string;
  amount: number; // in cents
  customerName: string;
  customerEmail: string;
  description: string;
}

export interface ProcessPixPaymentResult {
  success: boolean;
  error?: string;
  pixPayment?: PixPaymentResponse;
}

export class ProcessPixPayment {
  constructor(private paymentService: IPaymentService) {}

  async execute(request: ProcessPixPaymentRequest): Promise<ProcessPixPaymentResult> {
    try {
      // Validate input
      if (!request.orderId || !request.amount || request.amount <= 0) {
        return {
          success: false,
          error: 'Dados do pedido inválidos'
        };
      }

      if (!request.customerName || !request.customerEmail) {
        return {
          success: false,
          error: 'Dados do cliente são obrigatórios'
        };
      }

      // Create PIX payment
      const pixRequest: CreatePixPaymentRequest = {
        orderId: request.orderId,
        amount: request.amount,
        payer: {
          name: request.customerName,
          email: request.customerEmail
        },
        description: request.description || 'Xperience Climb - Escalada'
      };

      const pixPayment = await this.paymentService.createPixPayment(pixRequest);

      return {
        success: true,
        pixPayment
      };
    } catch (error) {
      console.error('Error processing PIX payment:', error);
      return {
        success: false,
        error: 'Erro ao processar pagamento PIX. Tente novamente.'
      };
    }
  }
}
