# Configurando o UptimeRobot para Monitorar a Disponibilidade do Bot

Este guia explica como configurar o monitoramento gratuito do bot n8n usando o [UptimeRobot](https://uptimerobot.com/).

---

## Pré-requisitos

1. Conta criada em [uptimerobot.com](https://uptimerobot.com/) (plano gratuito suficiente)
2. Aplicação deployada na Vercel com as variáveis de ambiente configuradas
3. Ter definido o `HEALTH_CHECK_SECRET` no painel de variáveis da Vercel

---

## Variáveis de Ambiente Necessárias (Vercel)

Configure no painel da Vercel em **Settings → Environment Variables**:

| Variável                  | Obrigatória    | Descrição                                      |
| ------------------------- | -------------- | ---------------------------------------------- |
| `N8N_WEBHOOK_URL`         | ✅ Sim         | URL do webhook n8n do bot                      |
| `N8N_API_KEY`             | ✅ Sim         | Chave de autenticação do n8n                   |
| `HEALTH_CHECK_SECRET`     | ⚠️ Recomendado | Token para proteger o endpoint de health check |
| `HEALTH_CHECK_TIMEOUT_MS` | ❌ Opcional    | Timeout em ms (padrão: `10000`)                |

> **Como gerar um token seguro:**
>
> ```bash
> # No terminal (Linux/Mac/WSL):
> openssl rand -hex 32
> # Exemplo de saída: a3f9c2b1e4d7...
> ```

---

## Configurando o Monitor no UptimeRobot

### Passo 1 — Criar um novo monitor

1. Acesse o [dashboard do UptimeRobot](https://dashboard.uptimerobot.com/)
2. Clique em **"+ Add New Monitor"**

### Passo 2 — Configurar o monitor

Preencha os campos conforme abaixo:

| Campo                   | Valor                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| **Monitor Type**        | `HTTP(s)`                                                                   |
| **Friendly Name**       | `XperienceClimb Bot (n8n)`                                                  |
| **URL**                 | `https://seu-dominio.vercel.app/api/health/bot?token=<HEALTH_CHECK_SECRET>` |
| **Monitoring Interval** | `5 minutes` (menor disponível no plano gratuito)                            |
| **Monitor Timeout**     | `30 seconds`                                                                |

> Substitua `seu-dominio.vercel.app` pelo domínio real da aplicação.
> Substitua `<HEALTH_CHECK_SECRET>` pelo valor configurado na Vercel.

### Passo 3 — Configurar Keyword Monitoring (Validação Extra)

Para garantir que o endpoint retorna uma resposta válida além de só verificar o status HTTP:

1. Expanda a seção **"Advanced Settings"**
2. Ative **"Keyword Monitoring"**
3. Configure:
   - **Keyword**: `"status":"up"`
   - **Keyword Type**: `Exists` (alerta se a keyword NÃO existir)

### Passo 4 — Configurar Alertas

1. Na seção **"Alert Contacts"**, clique em **"Create Alert Contact"**
2. Adicione seu e-mail e/ou integração desejada:
   - 📧 E-mail
   - 📱 Telegram
   - 💬 Slack
   - 🔔 Discord (via webhook)
3. Salve o contato e associe ao monitor

### Passo 5 — Salvar e verificar

1. Clique em **"Create Monitor"**
2. Aguarde o primeiro check (até 5 minutos)
3. O status deve aparecer como 🟢 **Up**

---

## Interpretando as Respostas do Endpoint

### Bot Disponível (`HTTP 200`)

```json
{
  "status": "up",
  "latencyMs": 342,
  "timestamp": "2026-06-26T23:47:00.000Z",
  "botResponse": "Olá! Como posso te ajudar hoje?",
  "webhookUrl": "https://iajuridicavma-n8n.5gysyo.easypanel.host/webhook/academia-site-live"
}
```

### Bot Indisponível — Timeout (`HTTP 503`)

```json
{
  "status": "down",
  "latencyMs": 10001,
  "timestamp": "2026-06-26T23:47:00.000Z",
  "error": "Timeout após 10000ms sem resposta do bot",
  "webhookUrl": "https://iajuridicavma-n8n.5gysyo.easypanel.host/webhook/academia-site-live"
}
```

### Bot Indisponível — Erro HTTP (`HTTP 503`)

```json
{
  "status": "down",
  "latencyMs": 215,
  "timestamp": "2026-06-26T23:47:00.000Z",
  "error": "Webhook respondeu com HTTP 503 Service Unavailable",
  "webhookUrl": "https://iajuridicavma-n8n.5gysyo.easypanel.host/webhook/academia-site-live"
}
```

### Token Inválido (`HTTP 401`)

```json
{
  "status": "unauthorized",
  "message": "Token de health check ausente ou inválido."
}
```

---

## Trilha de Auditoria no n8n

O endpoint envia ao n8n o seguinte payload de ping:

```json
{
  "sessionId": "HEALTH_CHECK",
  "mensagem": "ping"
}
```

Para criar uma trilha auditável completa, configure no workflow n8n:

1. **Adicione um nó de filtro** antes do processamento principal:

   ```
   IF sessionId === "HEALTH_CHECK"
     → Cria registro de "health_check lead" com timestamp
     → Responde com "pong"
   ELSE
     → Fluxo normal de atendimento
   ```

2. **Campos sugeridos para o lead de ping:**
   ```json
   {
     "type": "health_check",
     "source": "uptimerobot",
     "timestamp": "{{ $now.toISO() }}",
     "sessionId": "HEALTH_CHECK"
   }
   ```

Isso cria um **histórico auditável** de todos os momentos em que o bot estava disponível.

---

## Limites do Plano Gratuito do UptimeRobot

| Feature             | Plano Gratuito |
| ------------------- | -------------- |
| Monitors            | 50             |
| Check Interval      | 5 minutos      |
| Alert Contacts      | 1 e-mail       |
| Histórico de uptime | 7 dias         |
| Status Page         | Sim (público)  |

Para histórico mais longo ou intervalos menores, considere o plano **Pro** ($7/mês).

---

## Testando Localmente

```bash
# 1. Inicie o servidor de desenvolvimento
npm run dev

# 2. Teste sem token (endpoint público)
curl http://localhost:3000/api/health/bot

# 3. Teste com token via query param
curl "http://localhost:3000/api/health/bot?token=troque-por-um-token-aleatorio-seguro"

# 4. Teste com token via header
curl -H "X-Health-Token: troque-por-um-token-aleatorio-seguro" \
     http://localhost:3000/api/health/bot
```
