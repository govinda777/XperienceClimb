import { NextRequest, NextResponse } from 'next/server';
import { GitHubPaymentService } from '@/infrastructure/services/GitHubPaymentService';
import { GitHubSponsorshipWebhook } from '@/core/entities/GitHubPayment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('GitHub Sponsors webhook received:', body);

    // Validate webhook signature (in production)
    // const signature = request.headers.get('x-hub-signature-256');
    // if (!validateGitHubWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const gitHubPaymentService = new GitHubPaymentService();

    // Process GitHub Sponsors webhook
    if (body.action && body.sponsorship) {
      const webhook: GitHubSponsorshipWebhook = body;
      
      try {
        await gitHubPaymentService.processWebhook(webhook, {
          webhook_id: body.sponsorship?.id,
          received_at: new Date().toISOString(),
          headers: {
            'user-agent': request.headers.get('user-agent'),
            'x-github-delivery': request.headers.get('x-github-delivery'),
            'x-github-event': request.headers.get('x-github-event'),
          }
        });

        console.log(`GitHub Sponsors webhook processed successfully: ${webhook.action}`);

        // Here you would typically update the order status in your database
        // Example:
        // if (webhook.action === 'created') {
        //   await updateOrderStatus(orderId, 'paid');
        //   await sendPaymentConfirmationEmail(orderId);
        // }

        return NextResponse.json({ 
          success: true, 
          message: 'Webhook processed successfully' 
        });

      } catch (error) {
        console.error('Error processing GitHub Sponsors webhook:', error);
        return NextResponse.json({ 
          error: 'Failed to process webhook' 
        }, { status: 500 });
      }
    }

    // Handle other webhook types
    console.log(`Unhandled GitHub webhook type: ${body.action || 'unknown'}`);
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received but not processed' 
    });

  } catch (error) {
    console.error('Error parsing GitHub webhook:', error);
    return NextResponse.json({ 
      error: 'Invalid webhook payload' 
    }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint for GitHub webhook
  return NextResponse.json({
    status: 'GitHub Sponsors webhook endpoint is active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}

// Helper function to validate GitHub webhook signature (implement in production)
function validateGitHubWebhookSignature(payload: any, signature: string | null): boolean {
  if (!signature || !process.env.GITHUB_WEBHOOK_SECRET) {
    console.warn('GitHub webhook signature validation skipped - no signature or secret');
    return true; // Skip validation in development
  }

  // In production, implement proper HMAC-SHA256 signature validation
  // const crypto = require('crypto');
  // const expectedSignature = 'sha256=' + crypto
  //   .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
  //   .update(JSON.stringify(payload))
  //   .digest('hex');
  // 
  // return crypto.timingSafeEqual(
  //   Buffer.from(signature),
  //   Buffer.from(expectedSignature)
  // );

  return true;
}
