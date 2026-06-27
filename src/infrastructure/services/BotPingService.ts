import type { IBotPingService, BotPingStatus } from '@/core/services/IBotPingService';
import { chatConfig } from '@/config/chat';

/**
 * Fixed payload that simulates a complete lead.
 */
const LEAD_PAYLOAD = {
  nome: 'ping',
  idade: 30,
  whatsapp: '+5511999999999',
  experiencia: 'intermediário',
  pacote: 'Agarrão',
  msg: 'Quero comprar o pacote Agarrão agora',
};

export class BotPingService implements IBotPingService {
  private readonly timeoutMs: number;
  private readonly webhookUrl: string;
  private readonly apiKey: string | undefined;

  constructor() {
    this.timeoutMs = parseInt(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '10000', 10);
    this.webhookUrl = chatConfig.webhookUrl;
    this.apiKey = process.env.N8N_API_KEY;
    console.log('[BotPingService] Initialized', {
      timeoutMs: this.timeoutMs,
      webhookUrl: this.maskUrl(this.webhookUrl),
    });
  }

  async ping(): Promise<BotPingStatus> {
    const timestamp = new Date().toISOString();
    const start = Date.now();
    const safeUrl = this.maskUrl(this.webhookUrl);
    console.log('[BotPingService] Sending ping payload', {
      payload: LEAD_PAYLOAD,
      url: safeUrl,
    });
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
      let response: Response;
      try {
        response = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey ? { 'X-API-KEY': this.apiKey } : {}),
          },
          body: JSON.stringify(LEAD_PAYLOAD),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const latencyMs = Date.now() - start;
      const responseText = await response.text();
      console.log('[BotPingService] Received response', {
        status: response.status,
        ok: response.ok,
        latencyMs,
        body: responseText,
      });

      if (!response.ok) {
        return {
          status: 'down',
          latencyMs,
          timestamp,
          error: `Webhook responded ${response.status}`,
          webhookUrl: safeUrl,
        };
      }

      // Try to extract response text (for audit)
      let botResponse: string | undefined;
      try {
        const ct = response.headers.get('content-type') ?? '';
        if (ct.includes('application/json')) {
          const data = JSON.parse(responseText);
          botResponse = typeof data === 'string' ? data : JSON.stringify(data);
        } else {
          botResponse = responseText;
        }
      } catch {
        botResponse = undefined;
      }

      return {
        status: 'up',
        latencyMs,
        timestamp,
        botResponse,
        webhookUrl: safeUrl,
      };
    } catch (err: unknown) {
      const latencyMs = Date.now() - start;
      const isTimeout =
        err instanceof Error && (err.name === 'AbortError' || err.message.includes('abort'));
      const errorMessage = isTimeout
        ? `Timeout after ${this.timeoutMs}ms`
        : err instanceof Error
          ? err.message
          : 'Unknown error';
      console.error('[BotPingService] Error during ping', { errorMessage, err });
      return {
        status: 'down',
        latencyMs,
        timestamp,
        error: errorMessage,
        webhookUrl: safeUrl,
      };
    }
  }

  /**
   * Remove query strings and fragments that may contain tokens/credentials from the URL.
   */
  private maskUrl(url: string): string {
    try {
      const p = new URL(url);
      return `${p.protocol}//${p.host}${p.pathname}`;
    } catch {
      return url;
    }
  }
}
