# 🧗‍♂️ XperienceClimb - Tutorial de Deploy

Uma plataforma de reservas para experiências de escalada no Morro Araçoiaba, desenvolvida com Next.js 14, Privy e MercadoPago.

## 📋 Índice

- [🔧 Pré-requisitos](#-pré-requisitos)
- [🚀 Deploy Rápido (Vercel)](#-deploy-rápido-vercel)
- [⚙️ Configuração Completa](#️-configuração-completa)
- [🔐 Configuração das APIs](#-configuração-das-apis)
- [🛠️ Deploy Alternativo](#️-deploy-alternativo)
- [❌ Resolução de Problemas](#-resolução-de-problemas)
- [📚 Comandos Úteis](#-comandos-úteis)

## 🔧 Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **Git**
- Conta na [Vercel](https://vercel.com) (recomendado)
- Conta no [Privy](https://dashboard.privy.io/) para autenticação
- Conta no [MercadoPago](https://developers.mercadopago.com/) para pagamentos

## 🚀 Deploy Rápido (Vercel)

### Método 1: Deploy via Git (Recomendado)

1. **Faça push do código para GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para deploy"
   git push origin main
   ```

2. **Conecte com Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório GitHub
   - Configure as variáveis de ambiente (veja seção abaixo)
   - Clique em "Deploy"

### Método 2: Deploy via CLI

1. **Instale Vercel CLI:**
   ```bash
   # Execute o script fornecido (Mac/Linux)
   chmod +x INSTALL_VERCEL.sh
   ./INSTALL_VERCEL.sh
   
   # Ou instale manualmente
   npm install -g vercel
   ```

2. **Faça login e deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

## ⚙️ Configuração Completa

### 1. Variáveis de Ambiente

O arquivo `ENV_VARIABLES.txt` contém todas as variáveis necessárias. Configure-as na **Vercel Dashboard > Settings > Environment Variables**:

#### 🔑 Variáveis Obrigatórias
```env
# Privy (Autenticação)
NEXT_PUBLIC_PRIVY_APP_ID=seu_privy_app_id

# MercadoPago (Pagamentos)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_public_key
MERCADOPAGO_ACCESS_TOKEN=seu_access_token

# URLs da Aplicação (atualize após primeiro deploy)
NEXT_PUBLIC_APP_URL=https://sua-app.vercel.app
NEXT_PUBLIC_SUCCESS_URL=https://sua-app.vercel.app/checkout/success
NEXT_PUBLIC_FAILURE_URL=https://sua-app.vercel.app/checkout/failure
NEXT_PUBLIC_PENDING_URL=https://sua-app.vercel.app/checkout/pending
```

#### ⚡ Deploy com Valores Temporários

Para fazer o primeiro deploy rapidamente, use valores temporários:

```env
NEXT_PUBLIC_PRIVY_APP_ID=temp_value
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=temp_value
MERCADOPAGO_ACCESS_TOKEN=temp_value
NEXT_PUBLIC_APP_URL=https://xperienceclimb.vercel.app
NEXT_PUBLIC_SUCCESS_URL=https://xperienceclimb.vercel.app/checkout/success
NEXT_PUBLIC_FAILURE_URL=https://xperienceclimb.vercel.app/checkout/failure
NEXT_PUBLIC_PENDING_URL=https://xperienceclimb.vercel.app/checkout/pending
```

> ⚠️ **Importante:** Substitua pelos valores reais após configurar as APIs.

### 2. Configuração do Domínio

Após o primeiro deploy:

1. **Anote a URL gerada:** `https://sua-app.vercel.app`
2. **Atualize as variáveis de ambiente** com a URL real
3. **Configure domínio customizado** (opcional):
   - Vercel Dashboard > Domains
   - Adicione seu domínio personalizado

## 🔐 Configuração das APIs

### 🎭 Privy (Autenticação)

1. **Acesse:** [dashboard.privy.io](https://dashboard.privy.io/)
2. **Crie uma aplicação:**
   - Nome: XperienceClimb
   - Callback URLs: `https://sua-app.vercel.app`
3. **Configure login methods:** Email, Google, Apple
4. **Copie o App ID** e atualize `NEXT_PUBLIC_PRIVY_APP_ID`

### 💳 MercadoPago (Pagamentos)

1. **Acesse:** [developers.mercadopago.com](https://developers.mercadopago.com/)
2. **Crie uma aplicação:**
   - Nome: XperienceClimb
   - Tipo: Checkout Pro
3. **Configure webhooks:**
   - URL: `https://sua-app.vercel.app/api/mercadopago/webhook`
   - Eventos: `payment`, `merchant_order`
4. **Copie as credenciais:**
   - Public Key → `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - Access Token → `MERCADOPAGO_ACCESS_TOKEN`

### 🔄 Atualizar Configurações

Após configurar as APIs:

1. **Atualize as variáveis na Vercel**
2. **Force um novo deploy:**
   ```bash
   vercel --prod --force
   ```

## 🛠️ Deploy Alternativo

### Netlify

1. **Instale Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build e deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

3. **Configure variáveis:** Netlify Dashboard > Environment Variables

### Docker

1. **Crie Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build e run:**
   ```bash
   docker build -t xperience-climb .
   docker run -p 3000:3000 xperience-climb
   ```

## ❌ Resolução de Problemas

### Erro: "Privy App ID not found"
- ✅ Verifique se `NEXT_PUBLIC_PRIVY_APP_ID` está configurado
- ✅ Confirme que o App ID está correto no Privy Dashboard

### Erro: "MercadoPago public key invalid"
- ✅ Use a **Public Key**, não o Access Token
- ✅ Verifique se está usando credenciais de produção

### Erro: "Function Runtimes must have a valid version"
- ✅ Arquivo `vercel.json` simplificado para Next.js 14
- ✅ Next.js App Router gerencia functions automaticamente
- ✅ Remova configurações desnecessárias de `functions` e `buildCommand`

### Erro de CORS no webhook
- ✅ Configure o webhook URL exatamente como: `https://sua-app.vercel.app/api/mercadopago/webhook`
- ✅ Headers CORS já estão configurados no `vercel.json`

### Erro TypeScript: "Property 'name' does not exist on type 'Apple'"
- ✅ Privy Apple login não fornece propriedade `name`
- ✅ Use apenas `user.google?.name` e `user.email?.address`
- ✅ Arquivo `LoginButton.tsx` já corrigido

### Build falha por lint
```bash
# Corrigir problemas de lint
npm run lint:fix

# Build ignorando avisos
npm run build -- --no-lint
```

### Problemas de imagens
- ✅ Imagens devem estar em `public/images/`
- ✅ Referencie como `/images/nome.jpg`
- ✅ Adicione domínios externos no `next.config.js`

## 📚 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar lint
npm run type-check   # Verificar TypeScript
```

### Deploy
```bash
vercel               # Deploy preview
vercel --prod        # Deploy produção
vercel --force       # Force redeploy
vercel domains       # Gerenciar domínios
vercel env           # Gerenciar variáveis
```

### Debugging
```bash
vercel logs          # Ver logs da aplicação
vercel inspect       # Inspecionar deploy
npm run analyze      # Analisar bundle size
```

## 🎯 Checklist Final

Antes de considerar o deploy completo:

- [ ] ✅ Aplicação buildo sem erros
- [ ] ✅ Todas as variáveis de ambiente configuradas
- [ ] ✅ Privy App ID e callback URLs corretos
- [ ] ✅ MercadoPago credenciais e webhooks configurados
- [ ] ✅ URLs de checkout atualizadas
- [ ] ✅ Testes de pagamento funcionando
- [ ] ✅ Autenticação funcionando
- [ ] ✅ Imagens carregando corretamente
- [ ] ✅ Domínio personalizado configurado (se aplicável)

## 🆘 Suporte

Se encontrar problemas:

1. **Verifique os logs:** `vercel logs`
2. **Teste localmente:** `npm run build && npm start`
3. **Consulte a documentação:**
   - [Next.js](https://nextjs.org/docs)
   - [Vercel](https://vercel.com/docs)
   - [Privy](https://docs.privy.io/)
   - [MercadoPago](https://www.mercadopago.com.br/developers/pt/docs)

---

🚀 **Deploy realizado com sucesso!** Sua aplicação XperienceClimb está pronta para escalar novos horizontes!