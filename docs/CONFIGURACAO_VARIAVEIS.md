# Guia de Configuração das Variáveis de Ambiente

Este guia ensina o passo a passo de como gerar e configurar todas as variáveis de ambiente necessárias para o Chatbot (Gemini), Google Analytics, Meta (Facebook) Pixel e Rate Limiting (Vercel KV / Upstash Redis) no projeto.

---

## 1. O que são Variáveis de Ambiente?

Variáveis de ambiente são "senhas" e "configurações secretas" que o nosso site usa para se comunicar com outras ferramentas e APIs sem expor essas chaves no código público.

Para o projeto funcionar com segurança, configuramos as seguintes chaves:

1. `XPERIENCE_CLIMB_GEMINI_API_KEY` (Chave de API do Gemini)
2. `KV_REST_API_URL` (URL do Vercel KV ou Upstash Redis para Rate Limiting - opcional no desenvolvimento)
3. `KV_REST_API_TOKEN` (Token do Vercel KV ou Upstash Redis para Rate Limiting - opcional no desenvolvimento)
4. `NEXT_PUBLIC_GA_ID` (Google Analytics)
5. `NEXT_PUBLIC_META_PIXEL_ID` (Meta Pixel)

---

## 2. Onde encontrar cada chave?

### 🤖 `XPERIENCE_CLIMB_GEMINI_API_KEY` (Google Gemini)

Essa chave serve para que o bot envie mensagens ao modelo do Gemini.
**Como gerar:**

1. Acesse o [Google AI Studio](https://aistudio.google.com/).
2. Clique em **Get API Key** (Obter chave de API).
3. Crie uma nova chave e copie-a.

### 🛡️ `KV_REST_API_URL` e `KV_REST_API_TOKEN` (Vercel KV / Redis)

Essas chaves são usadas para manter o controle de rate limit de forma persistente e distribuída na nuvem, evitando abusos e ataques de negação de serviço (DDoS).
**Como configurar:**

1. No painel do seu projeto na **Vercel**, vá para a aba **Storage**.
2. Clique em **Create Database** e selecione **KV (Redis)**.
3. Após criar e vincular o banco ao seu projeto, a Vercel injetará automaticamente as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN` em produção.
4. Para desenvolvimento local, você pode copiar os valores da aba ".env.local" do banco de dados gerado na Vercel.

### 🌐 `NEXT_PUBLIC_GA_ID` (Google Analytics)

Essa chave serve para rastrear os acessos ao site.
**Como gerar:**

1. Acesse o [Google Analytics](https://analytics.google.com/).
2. Clique na **Engrenagem (Administrador)** no canto inferior esquerdo.
3. Vá em **Fluxos de dados (Data Streams)** e selecione o site.
4. Copie o **ID DA MÉTRICA** (ex: `G-XXXXXXXXXX`).

### 🔵 `NEXT_PUBLIC_META_PIXEL_ID` (Meta/Facebook Pixel)

Essa chave rastreia conversões de anúncios que vierem do Facebook e Instagram.
**Como obter:**

1. Acesse o [Gerenciador de Eventos da Meta](https://business.facebook.com/events_manager).
2. Procure pelo **ID do conjunto de dados** (ou ID do Pixel) nas configurações da fonte de dados (ex: `123456789012345`).

---

## 3. Como colocar essas variáveis no código?

### A) Testando no Computador (Local)

1. Crie ou edite o arquivo `.env.local` na raiz do projeto.
2. Configure as chaves com este formato:

```env
# Gemini
XPERIENCE_CLIMB_GEMINI_API_KEY=sua_chave_do_gemini_aqui

# Rate Limiting (Opcional localmente - se ausentes, o sistema usará fallback em memória)
KV_REST_API_URL=sua_url_do_kv_aqui
KV_REST_API_TOKEN=seu_token_do_kv_aqui

# Analytics & Meta
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

### B) Colocando no Ar (Na Vercel)

Para produção, preencha as variáveis de ambiente através do painel do seu projeto:

1. Acesse o painel da [Vercel](https://vercel.com/dashboard).
2. Vá em **Settings** > **Environment Variables**.
3. Adicione individualmente cada chave e valor.
4. Faça um novo **Redeploy** na aba **Deployments** para as configurações entrarem em vigor.
