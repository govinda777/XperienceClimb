export type BotPingStatus = {
  status: 'up' | 'down';
  latencyMs: number;
  timestamp: string;
  botResponse?: string;
  webhookUrl: string;
  error?: string;
};

export interface IBotPingService {
  /**
   * Sends a fixed lead‑like payload to the bot webhook and returns its health status.
   */
  ping(): Promise<BotPingStatus>;
}
