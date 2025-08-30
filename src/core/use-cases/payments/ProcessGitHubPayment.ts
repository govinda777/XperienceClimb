import { IGitHubPaymentService } from '@/core/services/IGitHubPaymentService';
import { GitHubPaymentRequest, GitHubPaymentResponse } from '@/core/entities/GitHubPayment';

export interface ProcessGitHubPaymentRequest {
  orderId: string;
  amount: number; // in cents (BRL)
  sponsorUsername: string;
  frequency?: 'one-time' | 'monthly';
  metadata?: Record<string, any>;
}

export interface ProcessGitHubPaymentResult {
  success: boolean;
  error?: string;
  githubPayment?: GitHubPaymentResponse;
}

export class ProcessGitHubPayment {
  constructor(private gitHubPaymentService: IGitHubPaymentService) {}

  async execute(request: ProcessGitHubPaymentRequest): Promise<ProcessGitHubPaymentResult> {
    try {
      // Validate request
      if (!request.orderId || !request.amount || !request.sponsorUsername) {
        return {
          success: false,
          error: 'Missing required fields: orderId, amount, or sponsorUsername'
        };
      }

      if (request.amount <= 0) {
        return {
          success: false,
          error: 'Amount must be greater than zero'
        };
      }

      // Create GitHub payment request
      const paymentRequest: GitHubPaymentRequest = {
        orderId: request.orderId,
        amount: request.amount,
        sponsorUsername: request.sponsorUsername,
        frequency: request.frequency || 'one-time',
        metadata: request.metadata
      };

      // Process payment through GitHub service
      const githubPayment = await this.gitHubPaymentService.createPayment(paymentRequest);

      return {
        success: true,
        githubPayment
      };

    } catch (error) {
      console.error('Error processing GitHub payment:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process GitHub payment'
      };
    }
  }
}
