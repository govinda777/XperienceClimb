import 'server-only';

import type { IBotService, BotRequest, BotResponse } from '@/core/services/IBotService';
import { chatConfig } from '@/config/chat';

export class BotService implements IBotService {
  private readonly timeoutMs: number;
  private readonly apiKey: string | undefined;

  constructor() {
    this.timeoutMs = parseInt(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '10000', 10);
    this.apiKey = chatConfig.geminiApiKey;
  }

  async sendMessage(payload: BotRequest): Promise<BotResponse> {
    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    if (!this.apiKey) {
      clearTimeout(timeoutId);
      return {
        ok: false,
        status: 400,
        error: 'Gemini API key is not configured.',
        latencyMs: Date.now() - startTime,
      };
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: payload.mensagem,
                },
              ],
            },
          ],
        }),
        signal: controller.signal,
      });

      const latencyMs = Date.now() - startTime;
      const responseText = await response.text();

      let data: any;
      if (response.ok) {
        try {
          const parsed = JSON.parse(responseText);
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          data = { response: text };
        } catch {
          data = { response: responseText };
        }
      } else {
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
    return 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash';
  }

  maskUrl(url: string): string {
    return url.split('?')[0];
  }
}
