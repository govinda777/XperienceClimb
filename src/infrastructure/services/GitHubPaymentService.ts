import { IGitHubPaymentService } from '@/core/services/IGitHubPaymentService';
import { GitHubPayment, GitHubPaymentRequest, GitHubPaymentResponse, GitHubSponsorshipWebhook } from '@/core/entities/GitHubPayment';

export class GitHubPaymentService implements IGitHubPaymentService {
  // In-memory storage for demo purposes
  // In production, this would use a database
  private payments: Map<string, GitHubPayment> = new Map();

  // Mock exchange rate (in production, fetch from a real API like CurrencyAPI or ExchangeRate-API)
  private usdToBrlRate = 5.2; // 1 USD = R$ 5.20

  async createPayment(request: GitHubPaymentRequest): Promise<GitHubPaymentResponse> {
    try {
      const paymentId = `github_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get current exchange rate
      const exchangeRate = await this.getExchangeRate();
      
      // Convert BRL to USD (GitHub Sponsors works in USD)
      const amountBrlInReais = request.amount / 100; // Convert cents to reais
      const amountUSD = Math.ceil(amountBrlInReais / exchangeRate); // Round up to ensure we cover the full amount
      
      // Generate sponsorship URL
      const sponsorshipUrl = this.generateSponsorshipUrl(
        request.sponsorUsername, 
        amountUSD, 
        request.frequency || 'one-time'
      );

      const payment: GitHubPayment = {
        id: paymentId,
        orderId: request.orderId,
        sponsorUsername: request.sponsorUsername,
        amount: request.amount,
        amountUSD: amountUSD,
        sponsorshipUrl,
        status: 'pending',
        frequency: request.frequency || 'one-time',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store payment
      this.payments.set(paymentId, payment);

      return {
        paymentId,
        sponsorshipUrl,
        amountUSD,
        instructions: this.generateInstructions(amountUSD, request.sponsorUsername),
      };

    } catch (error) {
      console.error('Error creating GitHub payment:', error);
      throw new Error('Failed to create GitHub payment');
    }
  }

  async getPayment(paymentId: string): Promise<GitHubPayment | null> {
    return this.payments.get(paymentId) || null;
  }

  async processWebhook(webhook: GitHubSponsorshipWebhook, metadata?: Record<string, any>): Promise<void> {
    try {
      console.log('Processing GitHub Sponsors webhook:', webhook);

      // Find payment by sponsor username and amount
      const payment = Array.from(this.payments.values()).find(p => 
        p.sponsorUsername === webhook.sponsorship.sponsorable.login &&
        p.status === 'pending' &&
        // Match amount (considering USD conversion)
        Math.abs(p.amountUSD - (webhook.sponsorship.tier.is_one_time 
          ? webhook.sponsorship.tier.monthly_price_in_dollars 
          : webhook.sponsorship.tier.monthly_price_in_dollars)) <= 1 // Allow $1 difference due to rounding
      );

      if (!payment) {
        console.log('No matching payment found for webhook');
        return;
      }

      // Update payment status based on webhook action
      switch (webhook.action) {
        case 'created':
          await this.updatePaymentStatus(payment.id, 'completed', webhook);
          console.log(`GitHub payment completed: ${payment.id}`);
          break;
        case 'cancelled':
          await this.updatePaymentStatus(payment.id, 'cancelled', webhook);
          console.log(`GitHub payment cancelled: ${payment.id}`);
          break;
        default:
          console.log(`Unhandled GitHub webhook action: ${webhook.action}`);
      }

    } catch (error) {
      console.error('Error processing GitHub webhook:', error);
      throw error;
    }
  }

  async getExchangeRate(): Promise<number> {
    try {
      // In production, fetch from a real API
      // Example: https://api.exchangerate-api.com/v4/latest/USD
      // For now, return mock rate
      return this.usdToBrlRate;
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      // Fallback to default rate
      return this.usdToBrlRate;
    }
  }

  generateSponsorshipUrl(sponsorUsername: string, amountUSD: number, frequency: 'one-time' | 'monthly'): string {
    const baseUrl = `https://github.com/sponsors/${sponsorUsername}/sponsorships`;
    const params = new URLSearchParams({
      sponsor: sponsorUsername,
      preview: 'true',
      frequency: frequency,
      amount: amountUSD.toString()
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async getPendingPayments(): Promise<GitHubPayment[]> {
    return Array.from(this.payments.values()).filter(p => p.status === 'pending');
  }

  async updatePaymentStatus(
    paymentId: string, 
    status: 'completed' | 'cancelled' | 'failed', 
    webhookData?: any
  ): Promise<void> {
    const payment = this.payments.get(paymentId);
    if (!payment) {
      throw new Error(`Payment not found: ${paymentId}`);
    }

    payment.status = status;
    payment.updatedAt = new Date();
    if (webhookData) {
      payment.webhookData = webhookData;
    }

    this.payments.set(paymentId, payment);
  }

  private generateInstructions(amountUSD: number, sponsorUsername: string): string {
    return `
Para completar o pagamento via GitHub Sponsors:

1. Clique no link de patrocínio
2. Faça login na sua conta GitHub
3. Confirme o valor de $${amountUSD} USD
4. Complete o pagamento
5. Você receberá uma confirmação por email

O pagamento será processado pelo GitHub e você se tornará um sponsor de @${sponsorUsername}.
Após a confirmação, seu pedido será processado automaticamente.
    `.trim();
  }
}
