# Arquitetura do XperienceClimb

## Visão Geral

O **XperienceClimb** é uma aplicação web full-stack desenvolvida em **Next.js 15** que oferece experiências de escalada na Floresta Nacional de Ipanema. A aplicação utiliza uma arquitetura em camadas baseada em **Clean Architecture** e **Domain-Driven Design (DDD)**.

### Tecnologias Principais

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Estado**: Zustand
- **Autenticação**: Privy
- **Pagamentos**: Mercado Pago
- **Comunicação**: WhatsApp API
- **Testes**: Jest + React Testing Library
- **Deployment**: Vercel

---

## Estrutura de Diretórios

```
XperienceClimb/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── checkout/          # Páginas de checkout
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── auth/              # Autenticação
│   │   ├── cart/              # Carrinho de compras
│   │   ├── layout/            # Layout components
│   │   ├── providers/         # Context providers
│   │   ├── sections/          # Seções da página
│   │   └── ui/                # Componentes de UI
│   ├── core/                  # Domain Layer (Clean Architecture)
│   │   ├── entities/          # Entidades de domínio
│   │   ├── repositories/      # Interfaces de repositórios
│   │   ├── services/          # Interfaces de serviços
│   │   └── use-cases/         # Casos de uso
│   ├── hooks/                 # Custom hooks
│   ├── infrastructure/        # Infrastructure Layer
│   │   ├── repositories/      # Implementações de repositórios
│   │   └── services/          # Implementações de serviços
│   ├── lib/                   # Utilities e configurações
│   ├── store/                 # Estado global (Zustand)
│   ├── styles/                # Estilos globais
│   └── types/                 # Definições de tipos
├── public/                    # Assets estáticos
├── __tests__/                 # Testes de unidade e integração
└── jest.config.js             # Configuração Jest
```

---

## Arquitetura em Camadas

### 1. **Presentation Layer** (Interface do Usuário)

#### **App Router (src/app/)**

- **layout.tsx**: Layout raiz com providers e metadados
- **page.tsx**: Página inicial com todas as seções
- **api/**: Endpoints da API (packages, webhooks)
- **checkout/**: Páginas de sucesso/erro do pagamento

#### **Components (src/components/)**

##### **Auth Components**

- `AuthGuard`: Proteção de rotas autenticadas
- `LoginButton`: Botão de login/logout

##### **Cart Components**

- `CartButton`: Botão flutuante do carrinho
- `CartModal`: Modal com itens do carrinho
- `CheckoutForm`: Formulário de finalização (multi-step)

##### **Layout Components**

- `Navigation`: Barra de navegação principal

##### **Section Components**

- `HeroSection`: Seção principal com CTA
- `PackagesSection`: Pacotes disponíveis (dados da API)
- `GallerySection`: Galeria de imagens
- `SafetySection`: Informações de segurança
- `LocationSection`: Localização e mapa
- `TestimonialsSection`: Depoimentos
- `Footer`: Rodapé

##### **UI Components**

- `Button`: Componente de botão reutilizável
- `Card`: Componente de card reutilizável

##### **Providers**

- `PrivyProvider`: Provider de autenticação

### 2. **Application Layer** (Casos de Uso)

#### **Use Cases (src/core/use-cases/)**

##### **Auth**

- `LoginUser`: Autenticação de usuário
- `GetUserProfile`: Obter perfil do usuário

##### **Packages**

- `GetAllPackages`: Buscar todos os pacotes
- `GetPackageAvailability`: Verificar disponibilidade

##### **Orders**

- `CreateOrder`: Criar pedido com integração WhatsApp/Mercado Pago

##### **Cart**

- Gerenciado pelo Zustand store sem casos de uso específicos

### 3. **Domain Layer** (Regras de Negócio)

#### **Entities (src/core/entities/)**

##### **User**

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  isAdmin?: boolean;
}
```

##### **Package**

```typescript
interface Package {
  id: string;
  name: string;
  price: Money;
  description: string;
  features: string[];
  availability: PackageAvailability;
  rules: BookingRules;
}
```

##### **Order**

```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentId?: string;
  mercadoPagoId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### **Repository Interfaces (src/core/repositories/)**

- `IUserRepository`: Interface para operações de usuário
- `IPackageRepository`: Interface para operações de pacotes
- `IOrderRepository`: Interface para operações de pedidos

#### **Service Interfaces (src/core/services/)**

- `IAuthService`: Interface para autenticação
- `IPaymentService`: Interface para pagamentos

### 4. **Infrastructure Layer** (Implementações)

#### **Repositories (src/infrastructure/repositories/)**

- `UserRepository`: Implementação com Privy
- `PackageRepository`: Implementação com dados estáticos
- `OrderRepository`: Implementação com webhook/API

#### **Services (src/infrastructure/services/)**

- `AuthService`: Implementação com Privy
- `PaymentService`: Implementação com Mercado Pago
- `WhatsAppService`: Integração WhatsApp para finalização

---

## Estado da Aplicação

### **Zustand Store (src/store/)**

#### **CartStore (useCartStore)**

```typescript
interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (packageId: string) => number;
}
```

**Características:**

- **Persistência**: Local Storage via Zustand persist
- **Hydration Safe**: Controle de renderização SSR/Client
- **Thread Safe**: Operações atômicas para atualizações

---

## Fluxo de Dados

### **1. Visualização de Pacotes**

```
API Route (/api/packages)
  → Constants (PACKAGES)
  → PackagesSection
  → UI Rendering
```

### **2. Adicionar ao Carrinho**

```
PackagesSection (Add Button)
  → useCartStore.addItem()
  → CartButton (Update Badge)
  → Local Storage Persistence
```

### **3. Checkout Flow**

```
CartModal
  → CheckoutForm (Multi-step)
  → CreateOrder Use Case
  → PaymentService (Mercado Pago)
  → WhatsAppService (Backup)
  → Success/Failure Pages
```

### **4. Webhook Processing**

```
Mercado Pago Webhook
  → /api/mercadopago/webhook
  → PaymentService.processWebhook()
  → Order Status Update
```

---

## Integrações Externas

### **1. Privy (Autenticação)**

- **Configuração**: `src/lib/privy.ts`
- **Provider**: `src/components/providers/PrivyProvider.tsx`
- **Uso**: Wallet connection e autenticação social

### **2. Mercado Pago (Pagamentos)**

- **Service**: `src/infrastructure/services/PaymentService.ts`
- **Webhook**: `src/app/api/mercadopago/webhook/route.ts`
- **Features**: Preferências, checkout, webhooks

### **3. WhatsApp API**

- **Service**: `src/infrastructure/services/WhatsAppService.ts`
- **Uso**: Finalização de pedidos como backup
- **Integration**: Deep links para WhatsApp Business

---

## Configuração e Constantes

### **Constants (src/lib/constants.ts)**

- **PACKAGES**: Definição dinâmica de pacotes
- **AVAILABLE_DATES**: Datas disponíveis para escalada
- **CONTACT_INFO**: Informações de contato
- **NAVIGATION_ITEMS**: Itens do menu

### **Utils (src/lib/utils.ts)**

- **formatPrice**: Formatação de preços em Real
- **openWhatsApp**: Geração de links WhatsApp
- **Tailwind utilities**: className merging

---

## Padrões Arquiteturais

### **1. Clean Architecture**

- **Separation of Concerns**: Camadas bem definidas
- **Dependency Inversion**: Interfaces abstraem implementações
- **Independent of Frameworks**: Domain independente de Next.js

### **2. Domain-Driven Design**

- **Entities**: Modelagem rica do domínio
- **Use Cases**: Orquestração de regras de negócio
- **Repositories**: Abstração de persistência

### **3. Component Composition**

- **Compound Components**: Componentes que trabalham juntos
- **Render Props**: Flexibilidade de renderização
- **Custom Hooks**: Lógica reutilizável

### **4. State Management**

- **Local State**: useState para componentes
- **Global State**: Zustand para carrinho
- **Server State**: Next.js App Router para dados

---

## Performance e Otimizações

### **1. Next.js Optimizations**

- **App Router**: Server Components por padrão
- **Image Optimization**: next/image para imagens
- **Font Optimization**: next/font para fontes
- **Bundle Splitting**: Automático por rota

### **2. Client-Side Optimizations**

- **Lazy Loading**: Componentes sob demanda
- **Memoization**: React.memo para componentes pesados
- **Zustand**: Estado mínimo e otimizado

### **3. SEO Optimizations**

- **Metadata API**: Metadados dinâmicos
- **Sitemap**: Geração automática
- **Open Graph**: Imagens e metadados sociais

---

## Testes

### **Estrutura de Testes**

```
src/
├── __tests__/
│   └── test-utils.tsx         # Utilities de teste
├── store/__tests__/
│   └── useCartStore.test.ts   # Testes do store
└── components/cart/__tests__/
    ├── CartButton.test.tsx    # Testes do botão
    ├── CartModal.test.tsx     # Testes do modal
    ├── CheckoutForm.test.tsx  # Testes do checkout
    └── index.test.ts          # Testes de integração
```

### **Estratégias de Teste**

- **Unit Tests**: Componentes isolados
- **Integration Tests**: Fluxos completos
- **Mocking**: Serviços externos e hooks
- **Coverage**: Cobertura mínima de 80%

### **Jest Configuration**

- **next/jest**: Configuração automática Next.js
- **jsdom**: Ambiente de teste para DOM
- **setupFiles**: Mocks globais e utilities

---

## Deployment e DevOps

### **Vercel Configuration**

- **Framework**: Next.js (detecção automática)
- **Environment Variables**: Configuração via dashboard
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

### **Environment Variables**

```bash
# Authentication
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=

# Payments
MERCADOPAGO_ACCESS_TOKEN=
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=

# App URLs
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUCCESS_URL=
NEXT_PUBLIC_FAILURE_URL=
```

### **Build Process**

1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint validation
3. **Testing**: Jest test execution
4. **Build**: Next.js production build
5. **Deploy**: Vercel deployment

---

## Considerações de Segurança

### **1. Authentication**

- **Privy**: Carteiras e autenticação social segura
- **Session Management**: Tokens seguros
- **Route Protection**: AuthGuard para rotas privadas

### **2. Payment Security**

- **Mercado Pago**: PCI compliance
- **Webhook Validation**: Verificação de assinatura
- **Environment Variables**: Chaves sensíveis protegidas

### **3. Client-Side Security**

- **Input Validation**: Validação de formulários
- **XSS Prevention**: Sanitização de inputs
- **CSRF Protection**: Tokens CSRF implícitos

---

## Futuras Melhorias

### **1. Features Planejadas**

- **Sistema de Reviews**: Avaliações de experiências
- **Calendário Dinâmico**: Datas flexíveis
- **Notificações**: Push notifications
- **Dashboard Admin**: Gestão de pedidos

### **2. Optimizações Técnicas**

- **Database Integration**: Persistência real
- **Caching**: Redis para performance
- **CDN**: Assets otimizados
- **Monitoring**: Observabilidade completa

### **3. Escalabilidade**

- **Microservices**: Separação de domínios
- **Event Sourcing**: Auditoria de eventos
- **CQRS**: Separação Command/Query
- **Container Deployment**: Docker + Kubernetes

---

## Conclusão

A arquitetura do XperienceClimb foi projetada para ser **modular**, **testável** e **escalável**. Utilizando princípios de Clean Architecture e DDD, o código é organizadamente estruturado em camadas bem definidas, facilitando manutenção e evolução.

As tecnologias escolhidas (Next.js, TypeScript, Zustand) oferecem uma base sólida para desenvolvimento ágil, enquanto as integrações com Privy e Mercado Pago garantem funcionalidades robustas de autenticação e pagamento.

O sistema de testes abrangente e a configuração de CI/CD com Vercel asseguram qualidade e deployments confiáveis, preparando a aplicação para crescimento e novas funcionalidades.
