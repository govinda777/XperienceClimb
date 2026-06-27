/**
 * Interface para o serviço de health check do bot de IA (n8n).
 * Usada pelos endpoints de monitoramento.
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
   * Envia um "ping" simples ao webhook n8n e retorna o status de saúde.
   * Nunca lança exceção — encapsula o erro no BotHealthStatus.
   */
  checkHealth(): Promise<BotHealthStatus>;

  /**
   * Envia um payload completo simulando um lead para testar o processamento.
   */
  ping(): Promise<BotHealthStatus>;
}
