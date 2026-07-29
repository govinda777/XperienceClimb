import { BotService } from '../BotService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('@/config/chat', () => ({
  chatConfig: {
    geminiApiKey: 'test-gemini-key',
  },
}));

describe('BotService', () => {
  let service: BotService;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.HEALTH_CHECK_TIMEOUT_MS;
    service = new BotService();
  });

  it('deve enviar uma mensagem com sucesso e retornar BotResponse com a resposta do Gemini', async () => {
    const mockGeminiResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: 'Olá! Sou o assistente da Xperience Climb.',
              },
            ],
          },
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockGeminiResponse),
    } as unknown as Response);

    const result = await service.sendMessage({ mensagem: 'Oi' });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).toEqual({ response: 'Olá! Sou o assistente da Xperience Climb.' });
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Oi' }] }],
        }),
      })
    );
  });

  it('deve lidar com erros de resposta da API do Gemini (ex: 400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'API Key inválida',
    } as unknown as Response);

    const result = await service.sendMessage({ mensagem: 'Oi' });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
    expect(result.responseText).toBe('API Key inválida');
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

  it('deve retornar erro se a API Key do Gemini não estiver configurada', async () => {
    jest.resetModules();
    jest.doMock('@/config/chat', () => ({
      chatConfig: {
        geminiApiKey: undefined,
      },
    }));
    const { BotService: LocalBotService } = require('../BotService');
    const localService = new LocalBotService();

    const result = await localService.sendMessage({ mensagem: 'Oi' });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error).toContain('not configured');
  });
});
