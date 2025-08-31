import { NextRequest, NextResponse } from 'next/server';
import { PaymentMonitor } from '@/lib/payment-monitor';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') as 'hour' | 'day' | 'week' || 'day';
    const includeEvents = searchParams.get('include_events') === 'true';
    const orderId = searchParams.get('order_id');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const monitor = PaymentMonitor.getInstance();
    const metrics = monitor.getPaymentMetrics(timeframe);

    const response: any = {
      metrics: {
        ...metrics,
        currency: 'BRL',
        timeframe,
        generated_at: new Date().toISOString()
      }
    };

    if (orderId) {
      response.events = monitor.getEventsByOrderId(orderId);
    } else if (includeEvents) {
      response.events = monitor.getRecentEvents(limit);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching payment metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment metrics' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return new Response('Method not allowed', { status: 405 });
}
