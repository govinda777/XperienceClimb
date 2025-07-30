# 🚀 Guia de Deploy - XperienceClimb na Vercel

## ✅ Pré-requisitos Confirmados
- ✅ Configuração NPM: https://registry.npmjs.org
- ✅ Código no GitHub: https://github.com/govinda777/XperienceClimb.git
- ✅ Next.js 14 configurado
- ✅ vercel.json criado

## 📋 Passo a Passo

### 1️⃣ Acesse a Vercel
🔗 **URL:** https://vercel.com

### 2️⃣ Faça Login
- Clique em **"Login"**
- Selecione **"Continue with GitHub"**
- Autorize a Vercel

### 3️⃣ Criar Novo Projeto
- Clique em **"Add New Project"**
- Na seção "Import Git Repository"
- Procure por **"XperienceClimb"** ou **"govinda777/XperienceClimb"**
- Clique em **"Import"**

### 4️⃣ Configurar Projeto

**Framework Preset:** Next.js (detectado automaticamente)
**Root Directory:** `./` (padrão)
**Build Command:** `npm run build` (padrão)
**Output Directory:** `.next` (padrão)

### 5️⃣ Variáveis de Ambiente
Clique em **"Environment Variables"** e adicione:

```
NEXT_PUBLIC_PRIVY_APP_ID = temp_value
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY = temp_value
MERCADOPAGO_ACCESS_TOKEN = temp_value
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
NEXT_PUBLIC_SUCCESS_URL = https://your-app.vercel.app/checkout/success
NEXT_PUBLIC_FAILURE_URL = https://your-app.vercel.app/checkout/failure
NEXT_PUBLIC_PENDING_URL = https://your-app.vercel.app/checkout/pending
```

### 6️⃣ Deploy
- Clique em **"Deploy"**
- Aguarde 2-3 minutos
- ✅ **Sucesso!** Sua aplicação estará online

## 🔄 Após o Deploy

1. **Anote a URL** gerada pela Vercel (ex: https://xperience-climb-xyz.vercel.app)
2. **Atualize as URLs** nas variáveis de ambiente com a URL real
3. **Configure as credenciais reais:**
   - Privy App ID
   - Mercado Pago Public Key
   - Mercado Pago Access Token

## 🆘 Problemas Comuns

**❌ Build Failed:**
- Verifique se todas as variáveis de ambiente estão definidas
- Confirme se o repositório está atualizado

**❌ Runtime Error:**
- Adicione valores reais nas variáveis de ambiente
- Configure Privy e Mercado Pago corretamente

## 📞 Suporte
Em caso de problemas, a documentação completa está no README.md