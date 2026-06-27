import { NextResponse } from 'next/server';
import { BotService } from '@/infrastructure/services/BotService';

// Sistema simples de Rate Limiting em memória.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;

interface RateLimitData {
  count: number;
  startTime: number;
}
const rateLimitMap = new Map<string, RateLimitData>();

export async function POST(request: Request) {
  try {
    // Rate Limit Simplificado (Em Memória)
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();
    let rateData = rateLimitMap.get(ip);

    if (!rateData) {
      rateData = { count: 1, startTime: now };
      rateLimitMap.set(ip, rateData);
    } else {
      if (now - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
        // Passou o tempo, reseta
        rateData.count = 1;
        rateData.startTime = now;
      } else {
        rateData.count++;
        if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Limite de requisições excedido. Aguarde 1 minuto.' },
            { status: 429 }
          );
        }
      }
    }

    const { sessionId, mensagem } = await request.json();

    if (!sessionId || !mensagem) {
      return NextResponse.json({ error: 'Missing sessionId or mensagem' }, { status: 400 });
    }

    const botService = new BotService();
    const result = await botService.sendMessage({
      sessionId,
      mensagem,
    });

    if (!result.ok) {
      console.error('N8N error response:', result.responseText);
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
