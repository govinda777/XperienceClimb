import { NextRequest } from 'next/server';
import { GitHubPaymentService } from '@/infrastructure/services/GitHubPaymentService';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { WebhookHandler } from '@/lib/webhook-handler';
import { GitHubSponsorshipWebhook } from '@/core/entities/GitHubPayment';

const gitHubPaymentService = new GitHubPaymentService();
const orderRepository = new OrderRepository();

// Configure webhook handler
const githubWebhook = new WebhookHandler(
  {
    provider: 'github',
    secret: process.env.GITHUB_WEBHOOK_SECRET || '',
    signatureConfig: {
      headerName: 'x-hub-signature-256',
      algorithm: 'sha256',
      encoding: 'hex'
    },
    requiredFields: ['action', 'sponsorship.id', 'sponsorship.sponsor.login'],
    allowedFields: [
      'action',
      'sponsorship',
      'sender',
      'repository',
      'organization',
      'installation'
    ]
  },
  async (context) => {
    const { body, headers } = context;

    // Process GitHub Sponsors webhook
    if (body.action && body.sponsorship) {
      const webhook: GitHubSponsorshipWebhook = body;
      
      // Process webhook with metadata
      await gitHubPaymentService.processWebhook(webhook, {
        webhook_id: body.sponsorship?.id,
        received_at: new Date().toISOString(),
        headers: {
          'user-agent': headers['user-agent'],
          'x-github-delivery': headers['x-github-delivery'],
          'x-github-event': headers['x-github-event']
        }
      });

      // Update order status based on sponsorship action
      switch (webhook.action) {
        case 'created':
          // New sponsorship created
          await orderRepository.updateStatus(webhook.sponsorship.node_id, 'confirmed');
          return { status: 'sponsorship_created' };

        case 'cancelled':
          // Sponsorship cancelled
          await orderRepository.updateStatus(webhook.sponsorship.node_id, 'cancelled');
          return { status: 'sponsorship_cancelled' };

        case 'tier_changed':
          // Sponsorship tier changed
          await orderRepository.updateStatus(webhook.sponsorship.node_id, 'pending_payment');
          return { status: 'sponsorship_tier_changed' };

        case 'pending_cancellation':
          // Sponsorship pending cancellation
          await orderRepository.updateStatus(webhook.sponsorship.node_id, 'cancelled');
          return { status: 'sponsorship_pending_cancellation' };

        default:
          return { status: 'ignored', action: webhook.action };
      }
    }

    return { status: 'ignored', reason: 'unsupported_event' };
  }
);

export async function POST(request: NextRequest) {
  return githubWebhook.handleWebhook(request);
}

export async function GET() {
  return new Response('GitHub Sponsors Webhook Endpoint', { status: 200 });
}