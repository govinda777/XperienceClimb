import { NextRequest } from 'next/server';
import { PaymentService } from '@/infrastructure/services/PaymentService';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { WebhookHandler } from '@/lib/webhook-handler';

const paymentService = new PaymentService();
const orderRepository = new OrderRepository();

// Configure webhook handler
const pixWebhook = new WebhookHandler(
  {
    provider: 'pix',
    secret: process.env.PIX_WEBHOOK_SECRET || '',
    signatureConfig: {
      headerName: 'x-signature',
      algorithm: 'sha256'
    },
    requiredFields: ['type', 'data.id'],
    allowedFields: ['type', 'data', 'action', 'timestamp']
  },
  async (context) => {
    const { body } = context;

    // Process PIX webhook
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Get payment details
      const payment = await paymentService.getPayment(paymentId);
      
      if (!payment) {
        throw new Error(`Payment not found: ${paymentId}`);
      }

      // Update order status based on payment status
      switch (payment.status) {
        case 'approved':
          await orderRepository.updateStatus(payment.external_reference, 'confirmed');
          // Send confirmation notification
          // await sendPaymentConfirmation(payment);
          return { status: 'payment_confirmed' };

        case 'rejected':
          await orderRepository.updateStatus(payment.external_reference, 'cancelled');
          return { status: 'payment_rejected' };

        case 'pending':
          await orderRepository.updateStatus(payment.external_reference, 'pending_payment');
          return { status: 'payment_pending' };

        default:
          return { status: 'unknown_status', payment_status: payment.status };
      }
    }

    return { status: 'ignored', reason: 'unsupported_type' };
  }
);

export async function POST(request: NextRequest) {
  return pixWebhook.handleWebhook(request);
}

export async function GET() {
  return new Response('PIX Webhook Endpoint', { status: 200 });
}