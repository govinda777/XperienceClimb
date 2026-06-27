import type { IBotHealthService, BotHealthStatus } from '@/core/services/IBotHealthService';
import { BotService } from './BotService';
import { randomUUID } from 'node:crypto';

const PING_MESSAGE =
  '{"nome":"ping","idade":30,"e-mail":"ping@example.com","whatsapp":"+5511999999999","experiencia":"intermediário","pacote":"Agarrão","msg":"Quero comprar o pacote Agarrão agora"}';

const CONFIRMATION_MESSAGE = 'sim';

export class BotHealthService implements IBotHealthService {
  private readonly botService: BotService;

  constructor(botService?: BotService) {
    this.botService = botService ?? new BotService();
  }

  private extractResponse(data: any): string | undefined {
    if (!data) return undefined;
    if (typeof data === 'string') return data;
    return data.response || data.message || data.output || JSON.stringify(data);
  }

  async ping(): Promise<BotHealthStatus> {
    const timestamp = new Date().toISOString();
    const sessionId = `PING_CHECK_${randomUUID()}`;
    const history: string[] = [];
    let totalLatencyMs = 0;

    // 1. Chamada: Envio do JSON do Lead
    const result1 = await this.botService.sendMessage({
      sessionId: sessionId,
      mensagem: PING_MESSAGE,
    });

    totalLatencyMs += result1.latencyMs;
    const safeUrl = this.botService.maskUrl(this.botService.getWebhookUrl());

    if (!result1.ok) {
      return {
        status: 'down',
        latencyMs: totalLatencyMs,
        timestamp,
        error: result1.error || `Webhook respondeu com HTTP ${result1.status} na 1ª chamada`,
        webhookUrl: safeUrl,
      };
    }

    const response1 = this.extractResponse(result1.data);
    if (response1) history.push(response1);

    // 2. Chamada: Confirmação "sim"
    const result2 = await this.botService.sendMessage({
      sessionId: sessionId,
      mensagem: CONFIRMATION_MESSAGE,
    });

    totalLatencyMs += result2.latencyMs;

    if (!result2.ok) {
      return {
        status: 'down',
        latencyMs: totalLatencyMs,
        timestamp,
        botResponse: response1,
        history,
        error: result2.error || `Webhook respondeu com HTTP ${result2.status} na 2ª chamada`,
        webhookUrl: safeUrl,
      };
    }

    const response2 = this.extractResponse(result2.data);
    if (response2) history.push(response2);

    return {
      status: 'up',
      latencyMs: totalLatencyMs,
      timestamp,
      botResponse: response2 || response1,
      history,
      webhookUrl: safeUrl,
    };
  }
}
