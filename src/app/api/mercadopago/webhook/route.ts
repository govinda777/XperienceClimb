import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/infrastructure/services/PaymentService';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';

const paymentService = new PaymentService();
const orderRepository = new OrderRepository();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Mercado Pago webhook received:', body);

    // Validate webhook signature in production
    // const signature = request.headers.get('x-signature');
    // if (!validateSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    // Process webhook based on topic
    if (body.topic === 'payment' || body.type === 'payment') {
      await paymentService.processWebhook(body);
      
      // Update order status
      if (body.data?.id) {
        await orderRepository.updateFromWebhook(body.data);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing Mercado Pago webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Mercado Pago webhook endpoint' });
} 