# 🧗‍♂️ XperienceClimb - Plataforma de Experiências de Escalada

Uma plataforma completa de reservas para experiências de escalada no Morro Araçoiaba (Floresta Nacional de Ipanema), desenvolvida com Next.js 15, TypeScript, Privy e múltiplos métodos de pagamento.

## 🌟 Características Principais

- **🏗️ Arquitetura Moderna**: Next.js 15 com App Router, TypeScript e Clean Architecture
- **🔐 Autenticação Segura**: Integração com Privy para Web3 e autenticação social
- **💳 Múltiplos Pagamentos**: Mercado Pago, PIX, Bitcoin, USDT e GitHub Sponsors
- **🎫 Sistema de Cupons**: Descontos personalizáveis com regras de negócio
- **🎨 Sistema de Temas**: Suporte para múltiplos destinos de escalada
- **🧪 Testes Abrangentes**: 80+ testes incluindo BDD e integração
- **📱 Responsivo**: Interface otimizada para todos os dispositivos

## 📋 Índice

- [🚀 Início Rápido](#-início-rápido)
- [🏗️ Arquitetura](#️-arquitetura)
- [💳 Sistema de Pagamentos](#-sistema-de-pagamentos)
- [🎫 Sistema de Cupons](#-sistema-de-cupons)
- [🧪 Testes](#-testes)
- [🔧 Pré-requisitos](#-pré-requisitos)
- [🚀 Deploy (Vercel)](#-deploy-vercel)
- [⚙️ Configuração Completa](#️-configuração-completa)
- [🔐 Configuração das APIs](#-configuração-das-apis)
- [❌ Resolução de Problemas](#-resolução-de-problemas)
- [📚 Comandos Úteis](#-comandos-úteis)

## 🚀 Início Rápido

```bash
# Clone o repositório
git clone https://github.com/govinda777/XperienceClimb.git
cd XperienceClimb

# Instale as dependências
npm install

# Configure as variáveis de ambiente (veja ENV_VARIABLES.txt)
cp .env.example .env.local

# Execute em modo desenvolvimento
npm run dev
```

Acesse http://localhost:3000 para ver a aplicação rodando.

## 🏗️ Arquitetura

O projeto utiliza **Clean Architecture** com **Domain-Driven Design (DDD)**:

```
src/
├── app/                    # Next.js App Router (Presentation)
├── components/             # Componentes React
├── core/                   # Domain Layer
│   ├── entities/          # Entidades de domínio
│   ├── repositories/      # Interfaces de repositórios
│   ├── services/          # Interfaces de serviços
│   └── use-cases/         # Casos de uso
├── infrastructure/        # Infrastructure Layer
│   ├── repositories/      # Implementações de repositórios
│   └── services/          # Implementações de serviços
├── hooks/                 # Custom React hooks
├── store/                 # Estado global (Zustand)
└── themes/                # Sistema de temas
```

**Principais Tecnologias:**
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Zustand** - Gerenciamento de estado
- **Privy** - Autenticação Web3 e social
- **Jest + React Testing Library** - Testes

## 💳 Sistema de Pagamentos

Suporte completo a múltiplos métodos de pagamento:

### Métodos Disponíveis
- **💳 Cartão de Crédito** - Via Mercado Pago
- **📱 PIX** - Pagamento instantâneo brasileiro
- **₿ Bitcoin** - Pagamentos em criptomoeda
- **💎 USDT** - Stablecoin na rede Ethereum
- **🐙 GitHub Sponsors** - Patrocínio via GitHub
- **📞 WhatsApp** - Fallback para finalização manual

### Características
- **Processamento Seguro** - Integração com APIs confiáveis
- **Webhooks** - Confirmação automática de pagamentos
- **Conversão de Moeda** - Suporte a BRL, USD e criptomoedas
- **Fallback Inteligente** - WhatsApp como backup

## 🎫 Sistema de Cupons

Sistema avançado de descontos com regras de negócio:

### Tipos de Desconto
- **Percentual** - Ex: 10% de desconto
- **Valor Fixo** - Ex: R$ 50 de desconto
- **Método Específico** - Descontos por forma de pagamento

### Cupons de Teste
| Código | Tipo | Valor | Restrições |
|--------|------|-------|------------|
| `WELCOME10` | Percentual | 10% | Mín. R$ 50, Todos os métodos |
| `CLIMB50` | Fixo | R$ 50 | Mín. R$ 100, Cartão/PIX |
| `CRYPTO15` | Percentual | 15% | Mín. R$ 30, Apenas crypto |

### Regras de Negócio
- **Validação em Tempo Real** - Verificação instantânea
- **Limites de Uso** - Controle de quantidade e usuário
- **Compatibilidade** - Restrições por método de pagamento
- **Expiração** - Datas de validade configuráveis

## 🧪 Testes

Suite completa de testes com alta cobertura:

### Tipos de Teste
- **Unit Tests** - Componentes e funções isoladas
- **Integration Tests** - Fluxos completos de API
- **BDD Tests** - Cenários de comportamento do usuário

### Executar Testes
```bash
# Todos os testes
npm test

# Com cobertura
npm run test:coverage

# Testes BDD
npm run test:bdd

# Testes de pré-commit
npm run test:pre-commit
```

### Cobertura Atual
- **80+ testes** implementados
- **5 suites** de teste
- **Cobertura > 90%** nas funcionalidades críticas

## 🔧 Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **Git**
- Conta na [Vercel](https://vercel.com) (recomendado)
- Conta no [Privy](https://dashboard.privy.io/) para autenticação
- Conta no [MercadoPago](https://developers.mercadopago.com/) para pagamentos

## 🚀 Deploy (Vercel)

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
- ✅ Corrija também `user.google?.pictureUrl` → `user.google?.picture`
- ✅ Arquivos `LoginButton.tsx` e `useAuth.ts` já corrigidos

### Erro: "Module has already exported a member named 'Money'"
- ✅ Remova exportação duplicada de `Money` do arquivo `Order.ts`
- ✅ Importe `Money` de `Package.ts` no `Order.ts`
- ✅ Mantenha `Money` apenas em um arquivo para evitar conflitos

### Erro: "This expression is not callable" (PackageRepository)
- ✅ `PACKAGES` é um `Record<string, PackageType>`, não array
- ✅ Use `PACKAGES[id]` ao invés de `PACKAGES.find()`
- ✅ Use `Object.values(PACKAGES)` ao invés de `PACKAGES.map()`

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

## 🎯 **Status do Deploy**

✅ **APLICAÇÃO ONLINE!**

**URL de Produção:** https://xperience-climb-1fk4unbis-govinda777s-projects.vercel.app

**Próximos passos:**
1. Configure as variáveis de ambiente com valores reais
2. Configurar Privy App ID
3. Configurar credenciais do MercadoPago
4. Testar funcionalidades completas

---

## 🎯 Status do Projeto

### ✅ Funcionalidades Implementadas
- **Sistema de Autenticação** - Privy com Web3 e social login
- **Carrinho de Compras** - Gerenciamento completo com Zustand
- **Múltiplos Pagamentos** - 5 métodos diferentes implementados
- **Sistema de Cupons** - Descontos com regras de negócio
- **Checkout Multi-step** - Processo guiado de finalização
- **Testes Abrangentes** - 80+ testes com alta cobertura
- **Arquitetura Limpa** - Clean Architecture + DDD
- **Sistema de Temas** - Preparado para múltiplos destinos

### 🔄 Em Desenvolvimento
- **Campo WhatsApp** - Adicionar campo obrigatório no formulário
- **Melhorias de Interface** - Ajustes no menu, footer e galeria
- **Seção Cronograma** - Cronograma detalhado da experiência
- **Seção Parceiros** - Parceiros e colaboradores

### 📈 Métricas do Projeto
- **Arquivos de Código**: 100+ arquivos TypeScript/React
- **Linhas de Código**: 10,000+ linhas
- **Componentes**: 30+ componentes reutilizáveis
- **Testes**: 80+ testes automatizados
- **Cobertura**: >90% nas funcionalidades críticas

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- **Email**: contato@xperiencehubs.com
- **WhatsApp**: +55 11 99999-9999
- **GitHub Issues**: Para bugs e melhorias

---

🚀 **XperienceClimb - Escalando novos horizontes na tecnologia e na natureza!**