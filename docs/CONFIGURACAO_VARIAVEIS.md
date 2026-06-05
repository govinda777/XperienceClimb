# Guia de Configuração das Variáveis de Ambiente

Este guia ensina o passo a passo, de forma simples e didática, de como gerar e configurar todas as variáveis de ambiente necessárias para o Chatbot, Google Analytics e Meta (Facebook) Pixel funcionarem no projeto.

---

## 1. O que são Variáveis de Ambiente?

Variáveis de ambiente são "senhas" e "configurações secretas" que o nosso site usa para se comunicar com outras ferramentas (como Google, Facebook e n8n) sem deixar essas chaves expostas no código público.

Para o projeto funcionar, precisamos configurar quatro chaves principais:

1. `N8N_WEBHOOK_URL`
2. `N8N_API_KEY`
3. `NEXT_PUBLIC_GA_ID`
4. `NEXT_PUBLIC_META_PIXEL_ID`

---

## 2. Onde encontrar cada chave?

### 🌐 `NEXT_PUBLIC_GA_ID` (Google Analytics)

Essa chave serve para rastrear os acessos ao site.
**Como gerar:**

1. Acesse o [Google Analytics](https://analytics.google.com/).
2. No canto inferior esquerdo, clique na **Engrenagem (Administrador)**.
3. Clique em **Fluxos de dados (Data Streams)** e selecione o seu site (Web).
4. Na tela que abrir, procure pelo **ID DA MÉTRICA** (Measurement ID).
5. O código deve ser parecido com isso: `G-XXXXXXXXXX`. Copie esse valor.

### 🔵 `NEXT_PUBLIC_META_PIXEL_ID` (Facebook Pixel)

Essa chave rastreia conversões de anúncios que vierem do Facebook e Instagram.
**Como gerar:**

1. Acesse o [Gerenciador de Eventos da Meta (Facebook)](https://business.facebook.com/events_manager).
2. Na barra lateral esquerda, clique em **Fontes de dados**.
3. Selecione o Pixel que você criou para o site (ou crie um novo clicando em "Conectar dados").
4. Na aba de "Configurações", procure pelo **ID do conjunto de dados** (ou ID do Pixel).
5. É um número com cerca de 15 dígitos (ex: `123456789012345`). Copie esse valor.

### 🤖 `N8N_WEBHOOK_URL` e `N8N_API_KEY` (Chatbot)

Essas chaves conectam o site com o seu Agente de Inteligência Artificial no n8n.
**Como configurar:**

1. Abra o seu painel do **n8n** (onde o seu fluxo do robô está hospedado).
2. Vá até o seu **Workflow** chamado `academia-site-live` (ou o nome do workflow do seu agente).
3. Clique no nó inicial chamado **Webhook**.
4. Lá dentro, você verá a "Webhook URL". Copie a URL de **Production** (Produção).
   - _Exemplo: `https://iajuridicavma-n8n.5gysyo.easypanel.host/webhook/academia-site-live`_
5. Para a **API KEY**: Se você configurou autenticação na aba "Authentication" do nó do Webhook (como Header Auth -> `X-API-KEY`), crie uma senha segura (pode ser qualquer texto forte e aleatório).
   - _Exemplo:_ `SDASD-asd-ASASCA-casc-CASCAS`

---

## 3. Como colocar essas variáveis no código?

Temos dois lugares onde você deve configurar essas variáveis: No seu **computador** (para testar) e na **Vercel** (para o site no ar).

### A) Testando no Computador (Local)

1. Na raiz do projeto (na mesma pasta onde está o arquivo `package.json`), procure pelo arquivo chamado `.env.local` (Se não existir, crie um novo arquivo com esse nome).
2. Cole as variáveis dentro dele usando esse formato:

```env
N8N_WEBHOOK_URL=cole_a_url_do_n8n_aqui
N8N_API_KEY=cole_a_sua_senha_segura_aqui
NEXT_PUBLIC_GA_ID=cole_seu_G-XXXX_aqui
NEXT_PUBLIC_META_PIXEL_ID=cole_seu_numero_do_pixel_aqui
```

### B) Colocando no Ar (Na Vercel)

Seu site está hospedado na Vercel. O `.env.local` do seu computador não vai para lá por questões de segurança. Portanto, você deve preenchê-las pelo painel:

1. Acesse o seu painel da [Vercel](https://vercel.com/dashboard).
2. Clique no seu projeto (`XperienceClimb`).
3. Vá na aba **Settings** (Configurações) no menu superior.
4. Na barra lateral esquerda, clique em **Environment Variables**.
5. Agora você vai adicionar uma por uma:
   - No campo **Key**, digite o nome da variável (ex: `NEXT_PUBLIC_GA_ID`).
   - No campo **Value**, cole o valor que você encontrou no passo anterior.
   - Deixe todos os "Environments" (Production, Preview, Development) marcados.
   - Clique no botão **Save**.
6. Repita esse processo de Adicionar (Add) para as quatro variáveis listadas.
7. Para que as variáveis entrem em vigor, você precisará ir na aba **Deployments**, clicar nos 3 pontinhos do último deploy e selecionar **Redeploy**.

Pronto! Seu site agora está conectado de forma segura com o Google, Meta e n8n.
