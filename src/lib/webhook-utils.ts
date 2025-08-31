import crypto from 'crypto';

interface WebhookValidationConfig {
  secret: string;
  algorithm?: string;
  headerName?: string;
  encoding?: BufferEncoding;
}

export function validateWebhookSignature(
  payload: string | Buffer,
  signature: string | null,
  config: WebhookValidationConfig
): boolean {
  if (!signature) return false;

  const {
    secret,
    algorithm = 'sha256',
    headerName = 'x-signature',
    encoding = 'hex'
  } = config;

  try {
    // Remove prefix if present (e.g., "sha256=" for GitHub)
    const actualSignature = signature.includes('=')
      ? signature.split('=')[1]
      : signature;

    // Calculate expected signature
    const hmac = crypto.createHmac(algorithm, secret);
    const expectedSignature = hmac
      .update(payload instanceof Buffer ? payload : Buffer.from(payload))
      .digest(encoding);

    // Use constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(actualSignature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error validating webhook signature:', error);
    return false;
  }
}

export function logWebhookEvent(
  provider: string,
  eventType: string,
  payload: any,
  metadata?: Record<string, any>
) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    provider,
    eventType,
    payload,
    metadata
  };

  // In production, use a proper logging service
  console.log('Webhook Event:', JSON.stringify(logEntry, null, 2));
}

export async function retryWebhookProcessing<T>(
  processor: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await processor();
    } catch (error) {
      lastError = error as Error;
      attempt++;

      if (attempt === maxRetries) break;

      // Exponential backoff with jitter
      const delay = initialDelay * Math.pow(2, attempt - 1) * (0.5 + Math.random());
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error(
    `Failed after ${maxRetries} attempts. Last error: ${lastError?.message}`
  );
}

export function validateWebhookPayload(
  payload: any,
  requiredFields: string[]
): { isValid: boolean; error?: string } {
  try {
    for (const field of requiredFields) {
      const value = field.split('.').reduce((obj, key) => obj?.[key], payload);
      if (value === undefined || value === null) {
        return {
          isValid: false,
          error: `Missing required field: ${field}`
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid payload structure'
    };
  }
}

export function sanitizeWebhookPayload<T>(
  payload: any,
  allowedFields: (keyof T)[]
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      sanitized[field] = payload[field];
    }
  }

  return sanitized;
}

export function generateWebhookResponse(
  success: boolean,
  message?: string,
  data?: any,
  statusCode: number = success ? 200 : 400
) {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
    statusCode
  };
}
