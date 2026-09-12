import { POST } from '../route';
import { BotService } from '@/infrastructure/services/BotService';

jest.mock('@/infrastructure/services/BotService');

describe('POST /api/chat', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('deve retornar 400 quando o corpo da requisição estiver vazio (sem causar erro 500 no log)', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'x-forwarded-for': 'test-ip-empty-body' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Corpo da requisição inválido ou vazio');
    // Garante que o console.error não foi chamado com SyntaxError / 500
    expect(consoleErrorSpy).not.toHaveBeenCalledWith('Chat API error:', expect.anything());
  });

  it('deve retornar 400 quando o corpo contiver JSON inválido', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'x-forwarded-for': 'test-ip-invalid-json' },
      body: 'invalid-json-string{',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Corpo da requisição inválido ou vazio');
    expect(consoleErrorSpy).not.toHaveBeenCalledWith('Chat API error:', expect.anything());
  });

  it('deve retornar 400 quando sessionId ou mensagem estiverem ausentes', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'x-forwarded-for': 'test-ip-missing-fields',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ sessionId: 'session-123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Os campos sessionId e mensagem são obrigatórios e devem ser válidos');
  });

  it('deve retornar 400 quando a mensagem contiver apenas espaços em branco', async () => {
    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'x-forwarded-for': 'test-ip-whitespace-msg',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ sessionId: 'session-123', mensagem: '    ' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Os campos sessionId e mensagem são obrigatórios e devem ser válidos');
  });

  it('deve processar mensagem com sucesso e retornar 200', async () => {
    (BotService.prototype.sendMessage as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: { response: 'Olá! Como posso ajudar você?' },
    });

    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'x-forwarded-for': 'test-ip-valid',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: 'session-456',
        mensagem: 'Olá, gostaria de informações sobre escalada',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toBe('Olá! Como posso ajudar você?');
  });

  it('deve repassar status de erro quando o BotService falhar', async () => {
    (BotService.prototype.sendMessage as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 502,
      responseText: 'Bad Gateway',
    });

    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'x-forwarded-for': 'test-ip-bot-fail',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: 'session-789',
        mensagem: 'Teste de falha no bot',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.error).toBe('Erro ao se comunicar com o agente de IA');
  });

  it('deve retornar 429 quando exceder o limite de requisições por IP', async () => {
    (BotService.prototype.sendMessage as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      data: { response: 'OK' },
    });

    const ip = 'test-ip-rate-limit';
    const makeReq = () =>
      POST(
        new Request('http://localhost/api/chat', {
          method: 'POST',
          headers: {
            'x-forwarded-for': ip,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: 'session-rate',
            mensagem: 'Mensagem de teste',
          }),
        })
      );

    // MAX_REQUESTS_PER_WINDOW é 5
    for (let i = 0; i < 5; i++) {
      const res = await makeReq();
      expect(res.status).toBe(200);
    }

    // 6ª requisição deve ser bloqueada com 429
    const blockedRes = await makeReq();
    expect(blockedRes.status).toBe(429);
    const data = await blockedRes.json();
    expect(data.error).toContain('Limite de requisições excedido');
  });
});
