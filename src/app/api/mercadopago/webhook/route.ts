import { NextRequest } from 'next/server';
import { PaymentService } from '@/infrastructure/services/PaymentService';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { WebhookHandler } from '@/lib/webhook-handler';

const paymentService = new PaymentService();
const orderRepository = new OrderRepository();

// Configure webhook handler
const mercadoPagoWebhook = new WebhookHandler(
  {
    provider: 'mercadopago',
    secret: process.env.MERCADOPAGO_WEBHOOK_SECRET || '',
    signatureConfig: {
      headerName: 'x-signature',
      algorithm: 'sha256'
    },
    requiredFields: ['topic', 'data.id'],
    allowedFields: ['topic', 'type', 'data', 'action', 'api_version']
  },
  async (context) => {
    const { body } = context;

    // Process webhook based on topic
    if (body.topic === 'payment' || body.type === 'payment') {
      // Process payment webhook
      await paymentService.processWebhook(body);
      
      // Update order status
      if (body.data?.id) {
        await orderRepository.updateFromWebhook(body.data);
      }

      return { status: 'payment_processed' };
    }

    // Handle other webhook types
    return { status: 'ignored', reason: 'unsupported_topic' };
  }
);

export async function POST(request: NextRequest) {
  return mercadoPagoWebhook.handleWebhook(request);
}

export async function GET() {
  return new Response('MercadoPago Webhook Endpoint', { status: 200 });
}