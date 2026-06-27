import type { IBotHealthService, BotHealthStatus } from '@/core/services/IBotHealthService';
import { BotService } from './BotService';

const HEALTH_CHECK_SESSION_ID = 'HEALTH_CHECK';
const HEALTH_CHECK_MESSAGE = 'ping';

const LEAD_PAYLOAD = {
  nome: 'ping',
  idade: 30,
  whatsapp: '+5511999999999',
  experiencia: 'intermediário',
  pacote: 'Agarrão',
  msg: 'Quero comprar o pacote Agarrão agora',
};

export class BotHealthService implements IBotHealthService {
  private readonly botService: BotService;

  constructor(botService?: BotService) {
    this.botService = botService ?? new BotService();
  }

  async checkHealth(): Promise<BotHealthStatus> {
    return this.performCall({
      sessionId: HEALTH_CHECK_SESSION_ID,
      mensagem: HEALTH_CHECK_MESSAGE,
    });
  }

  async ping(): Promise<BotHealthStatus> {
    return this.performCall(LEAD_PAYLOAD);
  }

  private async performCall(payload: any): Promise<BotHealthStatus> {
    const timestamp = new Date().toISOString();
    const result = await this.botService.sendMessage(payload);
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
