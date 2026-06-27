import { NextResponse } from 'next/server';
import { BotPingService } from '@/infrastructure/services/BotPingService';

/**
 * GET /api/health/ping
 *
 * Calls the bot webhook with a fixed lead‑like payload (nome, idade, whatsapp,
 * experiencia, pacote "Agarrão" e mensagem) and returns its health status.
 *
 * Optional authentication via query param or header `X-Health-Token` using the
 * environment variable `HEALTH_CHECK_SECRET` – the same mechanism used by the
 * generic health endpoint.
 */
export async function GET(request: Request) {
  // ---- Authentication (optional) ----
  const secret = process.env.HEALTH_CHECK_SECRET;
  if (secret) {
    const url = new URL(request.url);
    const queryToken = url.searchParams.get('token');
    const headerToken = request.headers.get('x-health-token');
    const provided = headerToken ?? queryToken;
    if (!provided || provided !== secret) {
      return NextResponse.json(
        { status: 'unauthorized', message: 'Token de health check ausente ou inválido.' },
        { status: 401 }
      );
    }
  }

  const service = new BotPingService();
  const result = await service.ping();
  const httpStatus = result.status === 'up' ? 200 : 503;
  return NextResponse.json(result, { status: httpStatus });
}
