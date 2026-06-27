/**
 * Interface para o serviço de health check do bot de IA (n8n).
 * Usada pelo endpoint GET /api/health/bot monitorado pelo UptimeRobot.
 */

export interface BotHealthStatus {
  /** Estado geral do bot */
  status: 'up' | 'down';
  /** Latência da chamada ao webhook em milissegundos */
  latencyMs: number;
  /** Timestamp ISO 8601 da verificação */
  timestamp: string;
  /** Resposta textual recebida do bot (quando disponível) */
  botResponse?: string;
  /** Descrição do erro (quando status === 'down') */
  error?: string;
  /** URL do webhook verificado (sem a API key) */
  webhookUrl: string;
}

export interface IBotHealthService {
  /**
   * Envia um "ping" ao webhook n8n e retorna o status de saúde.
   * Nunca lança exceção — encapsula o erro no BotHealthStatus.
   */
  checkHealth(): Promise<BotHealthStatus>;
}
