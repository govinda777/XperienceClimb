export interface BotRequest {
  sessionId?: string;
  mensagem?: string;
  [key: string]: any;
}

export interface BotResponse {
  ok: boolean;
  status: number;
  data?: any;
  error?: string;
  latencyMs: number;
  responseText?: string;
}

export interface IBotService {
  sendMessage(payload: BotRequest): Promise<BotResponse>;
  maskUrl(url: string): string;
  getWebhookUrl(): string;
}
