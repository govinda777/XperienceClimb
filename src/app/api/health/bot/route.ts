import { NextResponse } from 'next/server';
import { BotHealthService } from '@/infrastructure/services/BotHealthService';

/**
 * GET /api/health/bot
 *
 * Endpoint de disponibilidade do bot n8n, projetado para ser monitorado
 * pelo UptimeRobot (ou qualquer ferramenta de uptime monitoring).
 *
 * Autenticação (opcional):
 *   Configure HEALTH_CHECK_SECRET no ambiente. Se definida, a requisição
 *   deve incluir o header  X-Health-Token: <secret>
 *   ou o query param      ?token=<secret>
 *
 * Respostas:
 *   HTTP 200  → Bot disponível  (status: "up")
 *   HTTP 401  → Token inválido  (quando HEALTH_CHECK_SECRET está configurado)
 *   HTTP 503  → Bot indisponível (status: "down")
 *   HTTP 500  → Erro de configuração do servidor
 */
export async function GET(request: Request) {
  // ── 1. Validação de token (opcional) ────────────────────────────────────
  const expectedSecret = process.env.HEALTH_CHECK_SECRET;
  if (expectedSecret) {
    const url = new URL(request.url);
    const queryToken = url.searchParams.get('token');
    const headerToken = request.headers.get('x-health-token');
    const providedToken = headerToken ?? queryToken;

    if (!providedToken || providedToken !== expectedSecret) {
      return NextResponse.json(
        {
          status: 'unauthorized',
          message: 'Token de health check ausente ou inválido.',
        },
        { status: 401 }
      );
    }
  }

  // ── 2. Verificação do webhook ────────────────────────────────────────────
  if (!process.env.N8N_WEBHOOK_URL && !process.env.N8N_API_KEY) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Variáveis de ambiente N8N_WEBHOOK_URL e N8N_API_KEY não configuradas.',
      },
      { status: 500 }
    );
  }

  const service = new BotHealthService();
  const healthStatus = await service.checkHealth();

  const httpStatus = healthStatus.status === 'up' ? 200 : 503;

  return NextResponse.json(healthStatus, { status: httpStatus });
}
