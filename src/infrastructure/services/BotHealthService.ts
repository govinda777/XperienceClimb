import type { IBotHealthService, BotHealthStatus } from '@/core/services/IBotHealthService';
import { BotService } from './BotService';
import { randomUUID } from 'node:crypto'; // Importação para gerar ID único

const PING_MESSAGE =
  '{"nome":"ping","idade":30,"e-mail":"ping@example.com","whatsapp":"+5511999999999","experiencia":"intermediário","pacote":"Agarrão","msg":"Quero comprar o pacote Agarrão agora"}';

export class BotHealthService implements IBotHealthService {
  private readonly botService: BotService;

  constructor(botService?: BotService) {
    this.botService = botService ?? new BotService();
  }

  async ping(): Promise<BotHealthStatus> {
    const timestamp = new Date().toISOString();

    // Gera um novo ID de sessão a cada execução do método ping()
    const sessionId = `PING_CHECK_${randomUUID()}`;

    const result = await this.botService.sendMessage({
      sessionId: sessionId,
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
