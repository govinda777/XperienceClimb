import type { IBotService, BotRequest, BotResponse } from '@/core/services/IBotService';
import { chatConfig } from '@/config/chat';

export class BotService implements IBotService {
  private readonly timeoutMs: number;
  private readonly webhookUrl: string;
  private readonly apiKey: string | undefined;

  constructor() {
    this.timeoutMs = parseInt(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '10000', 10);
    this.webhookUrl = chatConfig.webhookUrl;
    this.apiKey = process.env.N8N_API_KEY;
  }

  async sendMessage(payload: BotRequest): Promise<BotResponse> {
    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'X-API-KEY': this.apiKey } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const latencyMs = Date.now() - startTime;
      const responseText = await response.text();

      let data: any;
      try {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          data = JSON.parse(responseText);
        } else {
          data = responseText;
        }
      } catch {
        data = responseText;
      }

      return {
        ok: response.ok,
        status: response.status,
        data,
        responseText,
        latencyMs,
      };
    } catch (error: unknown) {
      const latencyMs = Date.now() - startTime;
      const isTimeout =
        error instanceof Error && (error.name === 'AbortError' || error.message.includes('abort'));

      return {
        ok: false,
        status: isTimeout ? 408 : 500,
        error: error instanceof Error ? error.message : 'Unknown error',
        latencyMs,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  getWebhookUrl(): string {
    return this.webhookUrl;
  }

  maskUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    } catch {
      return url;
    }
  }
}
