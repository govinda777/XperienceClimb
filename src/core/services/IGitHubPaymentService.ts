import { GitHubPayment, GitHubPaymentRequest, GitHubPaymentResponse, GitHubSponsorshipWebhook } from '@/core/entities/GitHubPayment';

export interface IGitHubPaymentService {
  /**
   * Create a GitHub Sponsors payment link
   */
  createPayment(request: GitHubPaymentRequest): Promise<GitHubPaymentResponse>;

  /**
   * Get payment details by ID
   */
  getPayment(paymentId: string): Promise<GitHubPayment | null>;

  /**
   * Process GitHub Sponsors webhook
   */
  processWebhook(webhook: GitHubSponsorshipWebhook, metadata?: Record<string, any>): Promise<void>;

  /**
   * Get current USD exchange rate for BRL
   */
  getExchangeRate(): Promise<number>;

  /**
   * Generate sponsorship URL with specific amount
   */
  generateSponsorshipUrl(sponsorUsername: string, amountUSD: number, frequency: 'one-time' | 'monthly'): string;

  /**
   * Get all pending payments
   */
  getPendingPayments(): Promise<GitHubPayment[]>;

  /**
   * Update payment status
   */
  updatePaymentStatus(paymentId: string, status: 'completed' | 'cancelled' | 'failed', webhookData?: any): Promise<void>;
}
