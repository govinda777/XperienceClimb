# 🧗‍♂️ XperienceClimb - Escalada na Floresta Nacional de Ipanema

Uma plataforma moderna para experiências de escalada esportiva, desenvolvida com Next.js 14, Clean Architecture e integração completa de pagamentos.

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Arquitetura**: Clean Architecture
- **Autenticação**: Privy (Google, Apple, Email)
- **Pagamentos**: Mercado Pago
- **Estado**: Zustand
- **Deploy**: Vercel

## ⚡ Funcionalidades

- ✅ **Navegação Suave**: Scroll spy e animações fluidas
- ✅ **Pacotes de Escalada**: Silver, Gold e Premium
- ✅ **Carrinho de Compras**: Persistente com localStorage
- ✅ **Autenticação**: Login social e por email
- ✅ **Checkout Completo**: Multi-step com validações
- ✅ **Pagamentos**: Integração completa Mercado Pago
- ✅ **Responsive Design**: Mobile-first
- ✅ **Clean Architecture**: Escalável e testável

## 🛠️ Setup Local

### 1. Clone e Instale

```bash
git clone <repository-url>
cd XperienceClimb
npm install
```

### 2. Configure Variáveis de Ambiente

Crie um arquivo `.env.local`:

```bash
# Privy Authentication
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_mercadopago_public_key
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUCCESS_URL=http://localhost:3000/checkout/success
NEXT_PUBLIC_FAILURE_URL=http://localhost:3000/checkout/failure
NEXT_PUBLIC_PENDING_URL=http://localhost:3000/checkout/pending
```

### 3. Configure Privy

1. Acesse [dashboard.privy.io](https://dashboard.privy.io/)
2. Crie uma nova aplicação
3. Copie o App ID para `NEXT_PUBLIC_PRIVY_APP_ID`
4. Configure domínios permitidos:
   - `localhost:3000` (desenvolvimento)
   - Seu domínio de produção

### 4. Configure Mercado Pago

1. Acesse [developers.mercadopago.com](https://developers.mercadopago.com/)
2. Crie uma aplicação
3. Obtenha as credenciais:
   - Public Key → `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - Access Token → `MERCADOPAGO_ACCESS_TOKEN`

### 5. Execute o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🏗️ Arquitetura

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── checkout/          # Páginas de checkout
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── auth/             # Autenticação
│   ├── cart/             # Carrinho e checkout
│   ├── layout/           # Layout components
│   ├── sections/         # Seções da página
│   └── ui/               # Componentes base
├── core/                 # Clean Architecture
│   ├── entities/         # Entidades de domínio
│   ├── repositories/     # Interfaces de repositório
│   ├── services/         # Interfaces de serviço
│   └── use-cases/        # Casos de uso
├── infrastructure/       # Implementações
│   ├── repositories/     # Repositórios concretos
│   └── services/         # Serviços externos
├── hooks/               # Custom React hooks
├── lib/                 # Utilitários
├── store/               # Estado global (Zustand)
├── styles/              # Estilos globais
└── types/               # Tipos TypeScript
```

## 🚀 Deploy na Vercel

### 1. Conecte o Repositório

1. Faça push do código para GitHub/GitLab
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório

### 2. Configure Variáveis de Ambiente

No painel da Vercel, adicione:

```
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_mercadopago_public_key
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUCCESS_URL=https://your-domain.vercel.app/checkout/success
NEXT_PUBLIC_FAILURE_URL=https://your-domain.vercel.app/checkout/failure
NEXT_PUBLIC_PENDING_URL=https://your-domain.vercel.app/checkout/pending
```

### 3. Configure Domínios

- **Privy**: Adicione seu domínio nos domínios permitidos
- **Mercado Pago**: Configure a URL do webhook: `https://your-domain.vercel.app/api/mercadopago/webhook`

### 4. Deploy

O deploy acontece automaticamente. A Vercel detectará Next.js e configurará automaticamente.

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes E2E
npm run test:e2e

# Lint
npm run lint

# Type check
npm run type-check
```

## 📱 Fluxo de Compra

1. **Navegação**: Usuário navega pelos pacotes
2. **Seleção**: Adiciona pacotes ao carrinho
3. **Login**: Autentica via Privy (se necessário)
4. **Detalhes**: Preenche dados dos participantes
5. **Data**: Seleciona data da escalada
6. **Confirmação**: Revisa o pedido
7. **Pagamento**: Redirecionado para Mercado Pago
8. **Finalização**: Retorna para página de sucesso/falha

## 🔧 Personalização

### Cores e Tema

Edite `tailwind.config.js` para personalizar:

```javascript
theme: {
  extend: {
    colors: {
      climb: {
        50: '#f0fdfa',
        500: '#21808D',
        600: '#1e6b78',
        // ...
      }
    }
  }
}
```

### Pacotes de Escalada

Edite `src/lib/constants.ts`:

```typescript
export const PACKAGES = [
  {
    id: 'silver',
    name: 'Pacote Silver',
    price: 180,
    // ...
  }
]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit as mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- **Email**: contato@xperienceclimb.com
- **WhatsApp**: (15) 99999-9999
- **Website**: [xperienceclimb.com](https://xperienceclimb.com)

---

**Desenvolvido com ❤️ para a comunidade de escalada**