import type { IBotHealthService, BotHealthStatus } from '@/core/services/IBotHealthService';
import { chatConfig } from '@/config/chat';

// Payload especial de health check enviado ao n8n.
// O workflow n8n deve identificar esse sessionId e criar um lead do tipo "health_check".
const HEALTH_CHECK_SESSION_ID = 'HEALTH_CHECK';
const HEALTH_CHECK_MESSAGE = 'ping';

export class BotHealthService implements IBotHealthService {
  private readonly timeoutMs: number;
  private readonly webhookUrl: string;
  private readonly apiKey: string | undefined;

  constructor() {
    this.timeoutMs = parseInt(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '10000', 10);
    this.webhookUrl = chatConfig.webhookUrl;
    this.apiKey = process.env.N8N_API_KEY;
  }

  /**
   * Envia um ping ao webhook n8n e retorna o status de saúde.
   * Nunca lança exceção — encapsula erros no BotHealthStatus retornado.
   */
  async checkHealth(): Promise<BotHealthStatus> {
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    // Mascara a URL nos logs para não expor credenciais embutidas
    const safeWebhookUrl = this.maskUrl(this.webhookUrl);

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
          body: JSON.stringify({
            sessionId: HEALTH_CHECK_SESSION_ID,
            mensagem: HEALTH_CHECK_MESSAGE,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        return {
          status: 'down',
          latencyMs,
          timestamp,
          error: `Webhook respondeu com HTTP ${response.status} ${response.statusText}`,
          webhookUrl: safeWebhookUrl,
        };
      }

      // Tenta extrair texto da resposta para confirmar que o bot processou
      let botResponse: string | undefined;
      try {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (typeof data === 'string') {
            botResponse = data;
          } else if (data?.response) {
            botResponse = data.response;
          } else if (data?.message) {
            botResponse = data.message;
          } else if (data?.output) {
            botResponse = data.output;
          } else {
            botResponse = JSON.stringify(data);
          }
        } else {
          botResponse = await response.text();
        }
      } catch {
        // Resposta sem corpo — ainda consideramos UP se HTTP 2xx
        botResponse = undefined;
      }

      return {
        status: 'up',
        latencyMs,
        timestamp,
        botResponse,
        webhookUrl: safeWebhookUrl,
      };
    } catch (error: unknown) {
      const latencyMs = Date.now() - startTime;

      const isTimeout =
        error instanceof Error && (error.name === 'AbortError' || error.message.includes('abort'));

      const errorMessage = isTimeout
        ? `Timeout após ${this.timeoutMs}ms sem resposta do bot`
        : error instanceof Error
          ? error.message
          : 'Erro desconhecido ao contatar o webhook';

      return {
        status: 'down',
        latencyMs,
        timestamp,
        error: errorMessage,
        webhookUrl: safeWebhookUrl,
      };
    }
  }

  /**
   * Remove query strings e fragmentos que possam conter tokens/credenciais da URL
   * para que ela possa aparecer com segurança em respostas de API e logs.
   */
  private maskUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    } catch {
      return url;
    }
  }
}
