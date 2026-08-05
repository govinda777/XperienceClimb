import { NextResponse } from 'next/server';
import { BotService } from '@/infrastructure/services/BotService';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Sistema de Rate Limiting persistente (Vercel KV / Upstash Redis)
let redisRatelimit: Ratelimit | null = null;
const isRedisConfigured = !!(
  process.env.KV_REST_API_URL &&
  process.env.KV_REST_API_URL.startsWith('https://') &&
  process.env.KV_REST_API_TOKEN &&
  !process.env.KV_REST_API_TOKEN.startsWith('seu_token')
);

if (isRedisConfigured) {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  redisRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    prefix: '@upstash/ratelimit/chat',
  });
}

// Sistema de fallback em memória para ambiente local/desenvolvimento
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;

interface RateLimitData {
  count: number;
  startTime: number;
}
const rateLimitMap = new Map<string, RateLimitData>();

async function checkRateLimit(ip: string): Promise<boolean> {
  if (redisRatelimit) {
    try {
      const { success } = await redisRatelimit.limit(ip);
      return success;
    } catch (err) {
      console.warn(
        'Falha ao consultar rate limit no Redis/KV. Revertendo para fallback em memória:',
        err
      );
    }
  }

  // Fallback em memória
  const now = Date.now();
  let rateData = rateLimitMap.get(ip);

  if (!rateData) {
    rateData = { count: 1, startTime: now };
    rateLimitMap.set(ip, rateData);
    return true;
  }

  if (now - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
    rateData.count = 1;
    rateData.startTime = now;
    return true;
  }

  rateData.count++;
  return rateData.count <= MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    const isAllowed = await checkRateLimit(ip);

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Limite de requisições excedido. Aguarde 1 minuto.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (_error) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { sessionId, mensagem } = body;

    if (!sessionId || !mensagem) {
      return NextResponse.json({ error: 'Missing sessionId or mensagem' }, { status: 400 });
    }

    const botService = new BotService();
    const result = await botService.sendMessage({
      sessionId,
      mensagem,
    });

    if (!result.ok) {
      console.error('Gemini error response:', result.responseText);
      return NextResponse.json(
        { error: 'Erro ao se comunicar com o agente de IA' },
        { status: result.status }
      );
    }

    let chatResponse = 'Mensagem recebida com sucesso.';
    if (result.data) {
      if (typeof result.data === 'string') chatResponse = result.data;
      else if (result.data.response) chatResponse = result.data.response;
      else if (result.data.message) chatResponse = result.data.message;
      else if (result.data.output) chatResponse = result.data.output;
      else chatResponse = JSON.stringify(result.data);
    }

    return NextResponse.json({ response: chatResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
