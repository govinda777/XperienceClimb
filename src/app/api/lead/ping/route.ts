import { NextResponse } from 'next/server';
import { BotHealthService } from '@/infrastructure/services/BotHealthService';

/**
 * GET /api/lead/ping
 *
 * Endpoint único para verificação de saúde do bot de lead.
 */
export async function GET() {
  const service = new BotHealthService();
  try {
    const result = await service.ping();
    const httpStatus = result.status === 'up' ? 200 : 503;
    return NextResponse.json(result, { status: httpStatus });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'down',
        timestamp: new Date().toISOString(),
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
