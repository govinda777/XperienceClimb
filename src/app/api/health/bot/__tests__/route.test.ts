import { GET } from '../route';
import { BotHealthService } from '@/infrastructure/services/BotHealthService';
import type { BotHealthStatus } from '@/core/services/IBotHealthService';

// Mock do serviço para testar o route handler de forma isolada
jest.mock('@/infrastructure/services/BotHealthService');

const MockBotHealthService = BotHealthService as jest.MockedClass<typeof BotHealthService>;

function buildRequest(url: string, headers: Record<string, string> = {}): Request {
  return new Request(url, { headers });
}

const BASE_URL = 'http://localhost:3000/api/health/bot';

const upStatus: BotHealthStatus = {
  status: 'up',
  latencyMs: 250,
  timestamp: '2026-06-26T23:00:00.000Z',
  botResponse: 'pong',
  webhookUrl: 'https://test-n8n.example.com/webhook/test',
};

const downStatus: BotHealthStatus = {
  status: 'down',
  latencyMs: 10001,
  timestamp: '2026-06-26T23:00:00.000Z',
  error: 'Timeout após 10000ms sem resposta do bot',
  webhookUrl: 'https://test-n8n.example.com/webhook/test',
};

describe('GET /api/health/bot', () => {
  let mockCheckHealth: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.HEALTH_CHECK_SECRET;
    delete process.env.N8N_WEBHOOK_URL;
    delete process.env.N8N_API_KEY;

    mockCheckHealth = jest.fn();
    MockBotHealthService.mockImplementation(
      () =>
        ({
          checkHealth: mockCheckHealth,
        }) as unknown as BotHealthService
    );
  });

  describe('sem autenticação configurada (HEALTH_CHECK_SECRET não definida)', () => {
    it('retorna HTTP 200 e body com status "up" quando o bot está disponível', async () => {
      process.env.N8N_API_KEY = 'test-key';
      mockCheckHealth.mockResolvedValueOnce(upStatus);

      const response = await GET(buildRequest(BASE_URL));
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.status).toBe('up');
      expect(body.latencyMs).toBe(250);
      expect(body.botResponse).toBe('pong');
    });

    it('retorna HTTP 503 e body com status "down" quando o bot está indisponível', async () => {
      process.env.N8N_API_KEY = 'test-key';
      mockCheckHealth.mockResolvedValueOnce(downStatus);

      const response = await GET(buildRequest(BASE_URL));
      const body = await response.json();

      expect(response.status).toBe(503);
      expect(body.status).toBe('down');
      expect(body.error).toContain('Timeout');
    });
  });

  describe('com autenticação configurada (HEALTH_CHECK_SECRET definida)', () => {
    beforeEach(() => {
      process.env.HEALTH_CHECK_SECRET = 'meu-token-secreto';
      process.env.N8N_API_KEY = 'test-key';
    });

    it('retorna HTTP 401 quando nenhum token é fornecido', async () => {
      const response = await GET(buildRequest(BASE_URL));
      expect(response.status).toBe(401);
    });

    it('retorna HTTP 401 quando um token incorreto é fornecido via query param', async () => {
      const response = await GET(buildRequest(`${BASE_URL}?token=token-errado`));
      expect(response.status).toBe(401);
    });

    it('retorna HTTP 401 quando um token incorreto é fornecido via header', async () => {
      const response = await GET(buildRequest(BASE_URL, { 'x-health-token': 'token-errado' }));
      expect(response.status).toBe(401);
    });

    it('retorna HTTP 200 quando o token correto é fornecido via query param', async () => {
      mockCheckHealth.mockResolvedValueOnce(upStatus);

      const response = await GET(buildRequest(`${BASE_URL}?token=meu-token-secreto`));
      expect(response.status).toBe(200);
    });

    it('retorna HTTP 200 quando o token correto é fornecido via header X-Health-Token', async () => {
      mockCheckHealth.mockResolvedValueOnce(upStatus);

      const response = await GET(buildRequest(BASE_URL, { 'x-health-token': 'meu-token-secreto' }));
      expect(response.status).toBe(200);
    });

    it('o header tem prioridade sobre o query param', async () => {
      mockCheckHealth.mockResolvedValueOnce(upStatus);

      // Header correto + query param errado → deve passar
      const response = await GET(
        buildRequest(`${BASE_URL}?token=token-errado`, {
          'x-health-token': 'meu-token-secreto',
        })
      );
      expect(response.status).toBe(200);
    });
  });

  describe('erro de configuração do servidor', () => {
    it('retorna HTTP 500 quando N8N_WEBHOOK_URL e N8N_API_KEY não estão configurados', async () => {
      // Sem HEALTH_CHECK_SECRET e sem as env vars n8n
      const response = await GET(buildRequest(BASE_URL));
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.status).toBe('error');
    });
  });

  describe('estrutura da resposta', () => {
    it('o body de resposta contém todos os campos esperados quando UP', async () => {
      process.env.N8N_API_KEY = 'test-key';
      mockCheckHealth.mockResolvedValueOnce(upStatus);

      const response = await GET(buildRequest(BASE_URL));
      const body = await response.json();

      expect(body).toMatchObject({
        status: expect.stringMatching(/^(up|down)$/),
        latencyMs: expect.any(Number),
        timestamp: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
        webhookUrl: expect.any(String),
      });
    });
  });
});
