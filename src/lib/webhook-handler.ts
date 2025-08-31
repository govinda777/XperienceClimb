import { NextRequest, NextResponse } from 'next/server';
import {
  validateWebhookSignature,
  logWebhookEvent,
  retryWebhookProcessing,
  validateWebhookPayload,
  sanitizeWebhookPayload,
  generateWebhookResponse
} from './webhook-utils';

interface WebhookConfig {
  provider: string;
  secret: string;
  signatureConfig?: {
    algorithm?: string;
    headerName?: string;
    encoding?: 'base64' | 'base64url' | 'hex' | 'binary';
  };
  requiredFields: string[];
  allowedFields: string[];
}

interface WebhookContext {
  request: NextRequest;
  rawBody: string;
  body: any;
  headers: Record<string, string | null>;
}

type WebhookProcessor = (context: WebhookContext) => Promise<any>;

export class WebhookHandler {
  private config: WebhookConfig;
  private processor: WebhookProcessor;

  constructor(config: WebhookConfig, processor: WebhookProcessor) {
    this.config = config;
    this.processor = processor;
  }

  async handleWebhook(request: NextRequest): Promise<NextResponse> {
    try {
      // Get raw body for signature validation
      const rawBody = await request.text();
      const body = JSON.parse(rawBody);

      // Collect relevant headers
      const headers: Record<string, string | null> = {};
      request.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      // Create webhook context
      const context: WebhookContext = {
        request,
        rawBody,
        body,
        headers
      };

      // Validate signature
      if (this.config.secret) {
        const signature = headers[this.config.signatureConfig?.headerName || 'x-signature'];
        const isValid = validateWebhookSignature(rawBody, signature, {
          secret: this.config.secret,
          ...this.config.signatureConfig
        });

        if (!isValid) {
          logWebhookEvent(this.config.provider, 'signature_invalid', {
            headers: headers,
            error: 'Invalid signature'
          });

          return NextResponse.json(
            generateWebhookResponse(false, 'Invalid signature'),
            { status: 401 }
          );
        }
      }

      // Validate payload structure
      const validation = validateWebhookPayload(body, this.config.requiredFields);
      if (!validation.isValid) {
        logWebhookEvent(this.config.provider, 'payload_invalid', {
          body,
          error: validation.error
        });

        return NextResponse.json(
          generateWebhookResponse(false, validation.error),
          { status: 400 }
        );
      }

      // Sanitize payload
      const sanitizedBody = sanitizeWebhookPayload(body, this.config.allowedFields);

      // Process webhook with retries
      const result = await retryWebhookProcessing(async () => {
        const processorResult = await this.processor({
          ...context,
          body: sanitizedBody
        });

        logWebhookEvent(this.config.provider, 'processed', {
          body: sanitizedBody,
          result: processorResult
        });

        return processorResult;
      });

      return NextResponse.json(
        generateWebhookResponse(true, 'Webhook processed successfully', result)
      );

    } catch (error) {
      console.error(`Error processing ${this.config.provider} webhook:`, error);

      logWebhookEvent(this.config.provider, 'error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return NextResponse.json(
        generateWebhookResponse(false, 'Webhook processing failed'),
        { status: 500 }
      );
    }
  }
}
