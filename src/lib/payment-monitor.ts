import { Order } from '@/core/entities/Order';

export interface PaymentEvent {
  type: string;
  orderId: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  status: string;
  provider: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface PaymentMetrics {
  totalAmount: number;
  successCount: number;
  failureCount: number;
  pendingCount: number;
  averageProcessingTime: number;
}

export class PaymentMonitor {
  private static instance: PaymentMonitor;
  private events: PaymentEvent[] = [];
  private metricsCache: Map<string, PaymentMetrics> = new Map();
  private readonly METRICS_TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): PaymentMonitor {
    if (!PaymentMonitor.instance) {
      PaymentMonitor.instance = new PaymentMonitor();
    }
    return PaymentMonitor.instance;
  }

  trackPaymentEvent(event: Omit<PaymentEvent, 'timestamp'>) {
    const paymentEvent: PaymentEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.push(paymentEvent);
    this.invalidateMetricsCache();
    this.logEvent(paymentEvent);
  }

  trackOrderUpdate(order: Order, previousStatus?: string) {
    this.trackPaymentEvent({
      type: 'order_update',
      orderId: order.id,
      paymentId: order.payment.transactionId,
      amount: order.total.amount,
      currency: order.total.currency,
      status: order.status,
      provider: order.payment.method,
      metadata: {
        previousStatus,
        updatedAt: order.updatedAt,
        paymentMethod: order.payment.method
      }
    });
  }

  trackPaymentAttempt(
    orderId: string,
    provider: string,
    amount: number,
    currency: string,
    metadata?: Record<string, any>
  ) {
    this.trackPaymentEvent({
      type: 'payment_attempt',
      orderId,
      amount,
      currency,
      status: 'initiated',
      provider,
      metadata
    });
  }

  trackPaymentError(
    orderId: string,
    provider: string,
    error: Error,
    metadata?: Record<string, any>
  ) {
    this.trackPaymentEvent({
      type: 'payment_error',
      orderId,
      status: 'error',
      provider,
      metadata: {
        ...metadata,
        error: {
          message: error.message,
          stack: error.stack
        }
      }
    });
  }

  getPaymentMetrics(timeframe: 'hour' | 'day' | 'week' = 'day'): PaymentMetrics {
    const cacheKey = `metrics_${timeframe}`;
    const cached = this.metricsCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const now = new Date();
    const timeframes = {
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000
    };

    const cutoff = new Date(now.getTime() - timeframes[timeframe]);
    const relevantEvents = this.events.filter(event => event.timestamp >= cutoff);

    const metrics: PaymentMetrics = {
      totalAmount: 0,
      successCount: 0,
      failureCount: 0,
      pendingCount: 0,
      averageProcessingTime: 0
    };

    const processingTimes = new Map<string, { start?: Date; end?: Date }>();

    for (const event of relevantEvents) {
      if (event.amount) {
        metrics.totalAmount += event.amount;
      }

      if (event.type === 'payment_attempt') {
        processingTimes.set(event.orderId, { start: event.timestamp });
        metrics.pendingCount++;
      } else if (event.type === 'order_update') {
        const timing = processingTimes.get(event.orderId) || {};
        
        if (event.status === 'confirmed') {
          metrics.successCount++;
          metrics.pendingCount = Math.max(0, metrics.pendingCount - 1);
          timing.end = event.timestamp;
        } else if (event.status === 'cancelled' || event.status === 'failed') {
          metrics.failureCount++;
          metrics.pendingCount = Math.max(0, metrics.pendingCount - 1);
          timing.end = event.timestamp;
        }

        processingTimes.set(event.orderId, timing);
      }
    }

    // Calculate average processing time
    let totalTime = 0;
    let completedPayments = 0;

    processingTimes.forEach(timing => {
      if (timing.start && timing.end) {
        totalTime += timing.end.getTime() - timing.start.getTime();
        completedPayments++;
      }
    });

    metrics.averageProcessingTime = completedPayments > 0
      ? totalTime / completedPayments
      : 0;

    // Cache the metrics
    this.metricsCache.set(cacheKey, metrics);
    setTimeout(() => {
      this.metricsCache.delete(cacheKey);
    }, this.METRICS_TTL);

    return metrics;
  }

  getRecentEvents(limit: number = 100): PaymentEvent[] {
    return [...this.events]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  getEventsByOrderId(orderId: string): PaymentEvent[] {
    return this.events
      .filter(event => event.orderId === orderId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  private invalidateMetricsCache() {
    this.metricsCache.clear();
  }

  private logEvent(event: PaymentEvent) {
    // In production, send to a proper logging service
    console.log('Payment Event:', {
      ...event,
      timestamp: event.timestamp.toISOString()
    });

    // Example: Send to monitoring service
    // await sendToMonitoringService(event);
  }
}
