import { BotHealthService } from '@/infrastructure/services/BotHealthService';

export async function GET(): Promise<Response> {
  const service = new BotHealthService();
  try {
    const result = await service.ping();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const errorResponse = {
      status: 'down',
      timestamp: new Date().toISOString(),
      error: errorMessage,
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
