import { ICryptoPaymentService } from '../../services/ICryptoPaymentService';
import { CryptoPaymentRequest, CryptoPaymentResponse } from '../../entities/CryptoPayment';

export interface ProcessCryptoPaymentRequest {
  orderId: string;
  cryptoType: 'bitcoin' | 'usdt';
  amountFiat: number; // Amount in cents (BRL)
}

export interface ProcessCryptoPaymentResult {
  success: boolean;
  error?: string;
  cryptoPayment?: CryptoPaymentResponse;
}

export class ProcessCryptoPayment {
  constructor(private cryptoPaymentService: ICryptoPaymentService) {}

  async execute(request: ProcessCryptoPaymentRequest): Promise<ProcessCryptoPaymentResult> {
    try {
      // Validate input
      if (!request.orderId || !request.amountFiat || request.amountFiat <= 0) {
        return {
          success: false,
          error: 'Dados do pedido inválidos'
        };
      }

      if (!['bitcoin', 'usdt'].includes(request.cryptoType)) {
        return {
          success: false,
          error: 'Tipo de criptomoeda não suportado'
        };
      }

      // Create crypto payment
      const cryptoRequest: CryptoPaymentRequest = {
        orderId: request.orderId,
        cryptoType: request.cryptoType,
        amountFiat: request.amountFiat
      };

      const cryptoPayment = await this.cryptoPaymentService.createPayment(cryptoRequest);

      return {
        success: true,
        cryptoPayment
      };
    } catch (error) {
      console.error('Error processing crypto payment:', error);
      return {
        success: false,
        error: `Erro ao processar pagamento em ${request.cryptoType.toUpperCase()}. Tente novamente.`
      };
    }
  }
}
