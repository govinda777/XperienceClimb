import type { IBotHealthService, BotHealthStatus } from '@/core/services/IBotHealthService';
import { BotService } from './BotService';

const PING_SESSION_ID = 'PING_CHECK';
const PING_MESSAGE = 'ping';

export class BotHealthService implements IBotHealthService {
  private readonly botService: BotService;

  constructor(botService?: BotService) {
    this.botService = botService ?? new BotService();
  }

  async ping(): Promise<BotHealthStatus> {
    const timestamp = new Date().toISOString();
    const result = await this.botService.sendMessage({
      sessionId: PING_SESSION_ID,
      mensagem: PING_MESSAGE,
    });
    const safeUrl = this.botService.maskUrl(this.botService.getWebhookUrl());

    if (!result.ok) {
      return {
        status: 'down',
        latencyMs: result.latencyMs,
        timestamp,
        error: result.error || `Webhook respondeu com HTTP ${result.status}`,
        webhookUrl: safeUrl,
      };
    }

    let botResponse: string | undefined;
    if (result.data) {
      if (typeof result.data === 'string') {
        botResponse = result.data;
      } else {
        const data = result.data;
        botResponse = data.response || data.message || data.output || JSON.stringify(data);
      }
    }

    return {
      status: 'up',
      latencyMs: result.latencyMs,
      timestamp,
      botResponse,
      webhookUrl: safeUrl,
    };
  }
}
