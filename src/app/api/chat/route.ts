import { NextResponse } from 'next/server';
import { chatConfig } from '@/config/chat';

// Sistema simples de Rate Limiting em memória.
// Nota: Na Vercel, a memória é isolada por instância (serverless function).
// Isso não protege contra ataques distribuídos avançados, mas é perfeito e
// ultra-leve para evitar que usuários comuns façam spam no botão.
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

    const apiKey = process.env.N8N_API_KEY;
    if (!apiKey) {
      console.error('N8N_API_KEY is not defined');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(chatConfig.webhookUrl, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        mensagem,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('N8N error response:', text);
      return NextResponse.json(
        { error: 'Erro ao se comunicar com o agente de IA' },
        { status: response.status }
      );
    }

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { response: text };
    }

    let chatResponse = 'Mensagem recebida com sucesso.';
    if (data) {
      if (typeof data === 'string') chatResponse = data;
      else if (data.response) chatResponse = data.response;
      else if (data.message) chatResponse = data.message;
      else if (data.output) chatResponse = data.output;
      else chatResponse = JSON.stringify(data);
    }

    return NextResponse.json({ response: chatResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
