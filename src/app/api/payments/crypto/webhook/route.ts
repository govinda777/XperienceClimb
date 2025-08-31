import { NextRequest } from 'next/server';
import { CryptoPaymentService } from '@/infrastructure/services/CryptoPaymentService';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { WebhookHandler } from '@/lib/webhook-handler';
import { BlockchainTransaction } from '@/core/entities/CryptoPayment';

const cryptoPaymentService = new CryptoPaymentService();
const orderRepository = new OrderRepository();

// Configure webhook handler
const cryptoWebhook = new WebhookHandler(
  {
    provider: 'crypto',
    secret: process.env.CRYPTO_WEBHOOK_SECRET || '',
    signatureConfig: {
      headerName: 'x-signature',
      algorithm: 'sha256'
    },
    requiredFields: [
      'paymentId',
      'transaction.hash',
      'transaction.from',
      'transaction.to',
      'transaction.amount'
    ],
    allowedFields: ['paymentId', 'transaction', 'network', 'metadata']
  },
  async (context) => {
    const { body } = context;
    const { paymentId, transaction } = body;

    // Get payment details
    const payment = await cryptoPaymentService.getPayment(paymentId);
    
    if (!payment) {
      throw new Error(`Payment not found: ${paymentId}`);
    }

    // Create blockchain transaction object
    const blockchainTx: BlockchainTransaction = {
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      confirmations: transaction.confirmations || 0,
      timestamp: new Date(transaction.timestamp),
      blockNumber: transaction.blockNumber
    };

    // Update payment status
    await cryptoPaymentService.updatePaymentStatus(paymentId, blockchainTx);

    // Check if payment is now confirmed
    const updatedPayment = await cryptoPaymentService.getPayment(paymentId);
    
    if (updatedPayment?.status === 'confirmed') {
      // Update order status
      await orderRepository.updateStatus(updatedPayment.orderId, 'confirmed');
      
      // Send confirmation notification
      // await sendPaymentConfirmation(updatedPayment);

      return {
        status: 'payment_confirmed',
        confirmations: blockchainTx.confirmations,
        transaction: blockchainTx.hash
      };
    }

    return {
      status: 'payment_pending',
      confirmations: blockchainTx.confirmations,
      required_confirmations: payment.requiredConfirmations
    };
  }
);

export async function POST(request: NextRequest) {
  return cryptoWebhook.handleWebhook(request);
}

export async function GET() {
  return new Response('Crypto Payment Webhook Endpoint', { status: 200 });
}