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

-> Link loja mercado livre @climb.xperiencehub.com

- **💳 Cartão de Crédito** - Via Mercado Pago
- **📱 PIX** - Pagamento instantâneo brasileiro
- **₿ Bitcoin** - Pagamentos em criptomoeda
- **💎 USDT** - Stablecoin na rede Ethereum

- **📞 WhatsApp** - Fallback para finalização manual

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

## 🎨 Sistema de Destinos

Suporte para múltiplos destinos de escalada com sistema de imagens externas:

### Características dos Destinos

- **🎨 Temas Personalizáveis** - Cores, conteúdo e imagens específicas
- **🌐 Imagens Externas** - URLs de serviços como Unsplash, Picsum e outros
- **💾 Economia de Armazenamento** - Não precisa hospedar imagens localmente
- **🚀 Performance Otimizada** - CDNs especializadas em imagens
- **🔄 Flexibilidade** - Fácil troca de imagens sem reupload

### Destinos Disponíveis

- **🏔️ Fazenda Ipanema** - Escalada na Floresta Nacional de Ipanema
- **🏞️ Pedra Bela** - Aventura completa com tirolesa e cachoeiras
- **🌐 Exemplo Externo** - Demonstração do sistema de imagens externas

### Criar Novos Destinos

```bash
# Script interativo para criar temas
npm run create-theme

# Ou manualmente editando os arquivos de configuração
```

### Sistema de Imagens Externas

O projeto suporta URLs externas de serviços confiáveis:

- **Unsplash** - Fotos gratuitas de alta qualidade
- **Picsum** - Imagens placeholder aleatórias
- **Placeholder.com** - Placeholders simples
- **URLs Customizadas** - Qualquer CDN confiável

```typescript
// Exemplo de configuração
{
  src: 'https://images.unsplash.com/photo-123?w=800&h=600&fit=crop',
  alt: 'Escalada técnica',
  title: 'Escalada Técnica',
  category: 'climb',
  isExternal: true,
  externalDomain: 'images.unsplash.com'
}
```

📚 **Documentação Completa**: [docs/EXTERNAL_IMAGES.md](docs/EXTERNAL_IMAGES.md)

## 🔧 Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **Git**
- Conta na [Vercel](https://vercel.com) (recomendado)
- Conta no [Privy](https://dashboard.privy.io/) para autenticação
- Conta no [MercadoLivre](encaminhamento para a lojinha no mercado livre) para pagamentos

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
3. **Configure login methods:** Email
4. **Copie o App ID** e atualize `NEXT_PUBLIC_PRIVY_APP_ID`

### 💳 MercadoLivre (Lojinha)

Entendido! Quando o foco são **pacotes de escalada** (sejam diárias/passaportes para ginásio de boulder/via, cursos de iniciação ou saídas e viagens outdoor), a dinâmica de compra exige atenção redobrada a **datas, horários, local/destino e formato de entrega** (já que geralmente se trata de um serviço ou voucher, e não de um produto físico tradicional).

Abaixo está o passo a passo adaptado especificamente para a compra de pacotes de escalada:

---

#### Passo 1: Acessar a Loja / Anúncio do Pacote

- Acesse a loja do Mercado Livre/Mercado Shops através do link direto enviado pelo organizador/ginásio ou buscando o nome da loja na plataforma.
- Localize a seção correspondente ao tipo de experiência desejada (ex: _Diárias & Passaportes_, _Cursos & Aulas_, _Trips & Saídas Outdoor_).

---

#### Passo 2: Selecionar o Pacote Correto

Clique no produto desejado e verifique o que está incluso no pacote. Por exemplo:

- **Diária/Passaporte:** Inclui entrada + aluguel de sapatilha e magnésio?
- **Curso/Aulas:** Qual o nível (iniciante, intermediário, segurança/top-rope)?
- **Saída Outdoor:** Inclui guia, equipamentos de segurança (cadeirinha, capacete, cordas) e seguro de vida/acidentes?

---

#### Passo 3: Conferir e Selecionar Data, Horário e Destino (Variações)

Esta é a etapa mais importante. Antes de colocar no carrinho:

1. **Destino / Local:**

- Se for **em ginásio (indoor)**: confirme em qual unidade/endereço o pacote será utilizado.
- Se for **outdoor**: confira a descrição para ver qual é o **setor/rocha de destino** (ex: _Pedra da Bela Vista, Serra do Cipo, Falésia X_).

2. **Data da Atividade:**

- Escolha a data exata no menu de **Variações** do anúncio (ou verifique na descrição se o voucher tem validade flexível, ex: _válido por 30 dias a partir da compra_).

3. **Horário / Turma:**

- Para cursos e saídas guiadas, atente-se ao **horário de encontro ou início da turma** (ex: _Turma Sábado às 09h00_).

---

#### Passo 4: Atenção ao Formato de Entrega (Frete / Voucher)

Como pacotes de escalada são serviços/experiências:

- **Se for Voucher Digital / Serviço Presencial:** Selecione a opção **"Retirar no endereço do vendedor"** ou **"Combinar com o vendedor"**. Isso evita que o Mercado Livre cobre taxa de frete desnecessária.
- **Se o pacote incluir kit físico (ex: Camiseta + Passaporte impresso):** Confirme o seu CEP de destino para o envio do material.

---

#### Passo 5: Finalizar e Enviar Dados no Chat Pós-Compra

1. Clique em **"Comprar agora"** e conclua o pagamento.
2. Assim que a compra for aprovada, vá em **Minhas Compras > Enviar Mensagem ao Vendedor**.
3. Envie as informações necessárias para a atividade, como:

- **Nome completo e CPF** dos participantes (para seguro ou cadastro na recepção).
- **Tamanho do calçado/sapatilha** (caso o pacote inclua aluguel de equipamento).
- Confirmação da data e horário agendados.

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

---

🚀 **XperienceClimb - Escalando novos horizontes na tecnologia e na natureza!**
