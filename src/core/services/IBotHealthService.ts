/**
 * Interface para o serviço de saúde do bot de IA.
 */

export interface BotHealthStatus {
  status: 'up' | 'down';
  latencyMs: number;
  timestamp: string;
  botResponse?: string;
  error?: string;
  webhookUrl: string;
}

export interface IBotHealthService {
  /**
   * Envia um ping para testar a conectividade e saúde do bot.
   */
  ping(): Promise<BotHealthStatus>;
}
