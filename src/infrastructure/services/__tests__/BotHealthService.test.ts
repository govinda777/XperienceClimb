import { BotHealthService } from '../BotHealthService';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock chatConfig
jest.mock('@/config/chat', () => ({
  chatConfig: {
    webhookUrl: 'https://test-n8n.example.com/webhook/test',
  },
}));

describe('BotHealthService', () => {
  let service: BotHealthService;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset env vars before each test
    delete process.env.HEALTH_CHECK_TIMEOUT_MS;
    delete process.env.N8N_API_KEY;
    service = new BotHealthService();
  });

  describe('checkHealth()', () => {
    it('retorna status "up" quando o bot responde com HTTP 200 e JSON', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ response: 'pong' }),
      } as unknown as Response);

      const result = await service.checkHealth();

      expect(result.status).toBe('up');
      expect(result.botResponse).toBe('pong');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(result.webhookUrl).toBe('https://test-n8n.example.com/webhook/test');
      expect(result.error).toBeUndefined();
    });

    it('retorna status "up" quando o bot responde com texto puro', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'text/plain' },
        text: async () => 'pong',
      } as unknown as Response);

      const result = await service.checkHealth();

      expect(result.status).toBe('up');
      expect(result.botResponse).toBe('pong');
    });

    it('retorna status "up" quando o bot responde com campo "output"', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ output: 'Olá! Como posso ajudar?' }),
      } as unknown as Response);

      const result = await service.checkHealth();

      expect(result.status).toBe('up');
      expect(result.botResponse).toBe('Olá! Como posso ajudar?');
    });

    it('retorna status "down" quando o webhook responde com HTTP 500', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: { get: () => null },
      } as unknown as Response);

      const result = await service.checkHealth();

      expect(result.status).toBe('down');
      expect(result.error).toContain('HTTP 500');
      expect(result.botResponse).toBeUndefined();
    });

    it('retorna status "down" quando o webhook responde com HTTP 503', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        headers: { get: () => null },
      } as unknown as Response);

      const result = await service.checkHealth();

      expect(result.status).toBe('down');
      expect(result.error).toContain('HTTP 503');
    });

    it('retorna status "down" com mensagem de timeout quando AbortError é lançado', async () => {
      process.env.HEALTH_CHECK_TIMEOUT_MS = '100';
      service = new BotHealthService(); // Reinicia com novo timeout

      const abortError = new DOMException('The user aborted a request.', 'AbortError');
      mockFetch.mockRejectedValueOnce(abortError);

      const result = await service.checkHealth();

      expect(result.status).toBe('down');
      expect(result.error).toContain('Timeout');
      expect(result.error).toContain('100ms');
    });

    it('retorna status "down" quando fetch lança erro de rede', async () => {
      mockFetch.mockRejectedValueOnce(new Error('fetch failed: ECONNREFUSED'));

      const result = await service.checkHealth();

      expect(result.status).toBe('down');
      expect(result.error).toContain('fetch failed');
    });

    it('inclui o header X-API-KEY quando N8N_API_KEY está configurada', async () => {
      process.env.N8N_API_KEY = 'minha-chave-secreta';
      service = new BotHealthService();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ response: 'pong' }),
      } as unknown as Response);

      await service.checkHealth();

      const fetchCall = mockFetch.mock.calls[0];
      const options = fetchCall[1] as RequestInit;
      expect((options.headers as Record<string, string>)['X-API-KEY']).toBe('minha-chave-secreta');
    });

    it('envia o sessionId e mensagem corretos para o webhook', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ response: 'pong' }),
      } as unknown as Response);

      await service.checkHealth();

      const fetchCall = mockFetch.mock.calls[0];
      const body = JSON.parse(fetchCall[1].body as string);
      expect(body.sessionId).toBe('HEALTH_CHECK');
      expect(body.mensagem).toBe('ping');
    });

    it('não lança exceção em nenhum cenário de erro', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Erro catastrófico'));

      await expect(service.checkHealth()).resolves.not.toThrow();
    });

    it('retorna latencyMs como número não-negativo', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ({ response: 'pong' }),
      } as unknown as Response);

      const result = await service.checkHealth();
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
      expect(typeof result.latencyMs).toBe('number');
    });
  });
});
