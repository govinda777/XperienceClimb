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

  describe('ping()', () => {
    it('executa duas chamadas sequenciais com o mesmo sessionId e retorna status "up"', async () => {
      mockBotService.sendMessage
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: 'Resposta 1',
          latencyMs: 100,
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: 'Resposta 2',
          latencyMs: 150,
        });

      const result = await service.ping();

      expect(result.status).toBe('up');
      expect(result.latencyMs).toBe(250);
      expect(result.history).toEqual(['Resposta 1', 'Resposta 2']);
      expect(result.botResponse).toBe('Resposta 2');

      expect(mockBotService.sendMessage).toHaveBeenCalledTimes(2);

      const firstCallArgs = mockBotService.sendMessage.mock.calls[0][0];
      const secondCallArgs = mockBotService.sendMessage.mock.calls[1][0];

      expect(firstCallArgs.sessionId).toBe(secondCallArgs.sessionId);
      expect(firstCallArgs.mensagem).toContain('ping');
      expect(secondCallArgs.mensagem).toBe('sim');
    });

    it('retorna status "down" se a primeira chamada falhar', async () => {
      mockBotService.sendMessage.mockResolvedValueOnce({
        ok: false,
        status: 500,
        error: 'Erro na 1ª',
        latencyMs: 50,
      });

      const result = await service.ping();

      expect(result.status).toBe('down');
      expect(result.error).toContain('Erro na 1ª');
      expect(mockBotService.sendMessage).toHaveBeenCalledTimes(1);
    });

    it('retorna status "down" se a segunda chamada falhar', async () => {
      mockBotService.sendMessage
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: 'Resposta 1',
          latencyMs: 100,
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          error: 'Erro na 2ª',
          latencyMs: 50,
        });

      const result = await service.ping();

      expect(result.status).toBe('down');
      expect(result.error).toContain('Erro na 2ª');
      expect(result.history).toEqual(['Resposta 1']);
      expect(mockBotService.sendMessage).toHaveBeenCalledTimes(2);
    });
  });
});
