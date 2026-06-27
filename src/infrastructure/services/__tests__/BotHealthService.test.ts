import { BotHealthService } from '../BotHealthService';
import { BotService } from '../BotService';

// Mock BotService
jest.mock('../BotService');
const MockBotService = BotService as jest.MockedClass<typeof BotService>;

describe('BotHealthService', () => {
  let service: BotHealthService;
  let mockBotService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBotService = {
      sendMessage: jest.fn(),
      maskUrl: jest.fn(url => url),
      getWebhookUrl: jest.fn(() => 'https://test.url'),
    };
    MockBotService.mockImplementation(() => mockBotService);
    service = new BotHealthService(mockBotService);
  });

  describe('checkHealth()', () => {
    it('retorna status "up" quando o BotService retorna sucesso', async () => {
      mockBotService.sendMessage.mockResolvedValue({
        ok: true,
        status: 200,
        data: { response: 'pong' },
        latencyMs: 100,
      });

      const result = await service.checkHealth();

      expect(result.status).toBe('up');
      expect(result.botResponse).toBe('pong');
      expect(result.latencyMs).toBe(100);
      expect(mockBotService.sendMessage).toHaveBeenCalledWith({
        sessionId: 'HEALTH_CHECK',
        mensagem: 'ping',
      });
    });

    it('retorna status "down" quando o BotService retorna erro', async () => {
      mockBotService.sendMessage.mockResolvedValue({
        ok: false,
        status: 500,
        error: 'Erro interno',
        latencyMs: 50,
      });

      const result = await service.checkHealth();

      expect(result.status).toBe('down');
      expect(result.error).toBe('Erro interno');
    });
  });

  describe('ping()', () => {
    it('envia payload de lead e retorna status "up"', async () => {
      mockBotService.sendMessage.mockResolvedValue({
        ok: true,
        status: 200,
        data: 'Recebido',
        latencyMs: 120,
      });

      const result = await service.ping();

      expect(result.status).toBe('up');
      expect(result.botResponse).toBe('Recebido');
      expect(mockBotService.sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'ping',
          pacote: 'Agarrão',
        })
      );
    });
  });
});
