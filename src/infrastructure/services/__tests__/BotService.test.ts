import { BotService } from '../BotService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('@/config/chat', () => ({
  chatConfig: {
    webhookUrl: 'https://test-n8n.example.com/webhook/test',
  },
}));

describe('BotService', () => {
  let service: BotService;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.HEALTH_CHECK_TIMEOUT_MS;
    delete process.env.N8N_API_KEY;
    service = new BotService();
  });

  it('deve enviar uma mensagem com sucesso e retornar BotResponse', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify({ response: 'Olá' }),
    } as unknown as Response);

    const result = await service.sendMessage({ mensagem: 'Oi' });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).toEqual({ response: 'Olá' });
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://test-n8n.example.com/webhook/test',
      expect.any(Object)
    );
  });

  it('deve lidar com erros de resposta (ex: 500)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: { get: () => 'text/plain' },
      text: async () => 'Erro no servidor',
    } as unknown as Response);

    const result = await service.sendMessage({ mensagem: 'Oi' });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(500);
    expect(result.responseText).toBe('Erro no servidor');
  });

  it('deve lidar com timeout', async () => {
    process.env.HEALTH_CHECK_TIMEOUT_MS = '50';
    service = new BotService();

    const abortError = new DOMException('The user aborted a request.', 'AbortError');
    mockFetch.mockRejectedValueOnce(abortError);

    const result = await service.sendMessage({ mensagem: 'Oi' });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(408);
    expect(result.error).toContain('aborted');
  });

  it('deve incluir API Key se configurada', async () => {
    process.env.N8N_API_KEY = 'test-key';
    service = new BotService();

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      text: async () => '{}',
    } as unknown as Response);

    await service.sendMessage({ mensagem: 'Oi' });

    const options = mockFetch.mock.calls[0][1];
    expect(options.headers['X-API-KEY']).toBe('test-key');
  });
});
