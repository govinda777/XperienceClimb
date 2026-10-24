# 🗺️ Diagramas de Arquitetura e Fluxos Técnicos — XperienceClimb

Este documento consolida a modelagem visual, fluxos de dados e diagramas arquiteturais do sistema **XperienceClimb**, facilitando a compreensão para engenheiros, designers e stakeholders.

---

## 1. Arquitetura em Camadas (Clean Architecture + DDD)

A aplicação segue a separação estrita de responsabilidades inspirada nos princípios da **Clean Architecture**, onde o domínio central independe de bibliotecas externas, frameworks e provedores de banco de dados ou interfaces.

```mermaid
flowchart TD
    subgraph Presentation["1. Presentation Layer (UI & Next.js 15)"]
        Pages["App Router (app/page.tsx, destinos/[slug])"]
        Sections["Seções Visuais (Hero, Packages, Gallery, About)"]
        CartComp["Componentes do Carrinho (CartModal, CheckoutForm, AuthPromptScreen)"]
        ThemeEngine["Sistema de Temas (ThemeProvider, configs/pedra-bela)"]
    end

    subgraph State["2. Application State & Context"]
        ZustandCart["Zustand Store (useCartStore)"]
        AuthHook["Hook useAuth & Privy Context"]
    end

    subgraph Domain["3. Domain Layer (Core Entities & Use Cases)"]
        Entities["Entidades: Order, OrderItem, ParticipantDetails, User"]
        UseCases["Casos de Uso: CreateOrder, ValidateCoupon"]
        RepoInterfaces["Interfaces de Repositório: IOrderRepository, ICouponRepository"]
    end

    subgraph Infra["4. Infrastructure Layer"]
        OrderRepo["OrderRepository"]
        CouponServ["CouponService"]
        WhatsAppServ["WhatsAppService"]
        PrivyProvider["Privy SDK Integration"]
    end

    Pages --> Sections
    Sections --> CartComp
    Sections --> ZustandCart
    CartComp --> ZustandCart
    CartComp --> AuthHook
    ThemeEngine --> Sections

    CartComp --> UseCases
    UseCases --> Entities
    UseCases --> RepoInterfaces
    OrderRepo -.->|Implementa| RepoInterfaces
    OrderRepo --> WhatsAppServ
    AuthHook --> PrivyProvider
```

---

## 2. Diagrama de Sequência: Autenticação Prévia Obrigatória ao Checkout

Este fluxo ilustra o comportamento introduzido para assegurar que apenas usuários devidamente identificados preencham os 3 passos do formulário de reserva, eliminando bloqueios tardios.

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuário (Cliente)
    participant Pkg as PackagesSection
    participant Store as useCartStore
    participant Modal as CartModal
    participant Auth as Privy / useAuth
    participant Form as CheckoutForm

    User->>Pkg: Clica em "Adicionar ao Carrinho" (ex: Pacote Agarrão)
    Pkg->>Store: addItem({ packageId, name, price: 277 })
    Pkg->>Auth: Verifica estado de login (isLoggedIn)

    alt Usuário NÃO está autenticado (Guest)
        Pkg->>Store: openCheckout() [isOpen: true, isCheckoutOpen: true]
        Pkg->>Auth: login() [Dispara modal seguro do Privy]
        Store-->>Modal: Re-renderiza com isAuthRequired = true
        Modal-->>User: Exibe AuthPromptScreen ("Identifique-se para Continuar")

        opt Usuário fecha o modal do Privy sem logar
            User->>Modal: Visualiza benefícios e clica "Entrar ou Criar Conta"
            Modal->>Auth: login()
        end

        User->>Auth: Autentica com sucesso (E-mail / Social)
        Auth-->>Store: isLoggedIn = true
        Store-->>Modal: isViewingCheckout = true (Transição Automática!)
        Modal-->>Form: Renderiza CheckoutForm
    else Usuário JÁ está autenticado
        Pkg->>Store: openCheckout()
        Store-->>Modal: isViewingCheckout = true
        Modal-->>Form: Renderiza CheckoutForm diretamente
    end

    User->>Form: Preenche Passo 1 (Participantes com WhatsApp)
    User->>Form: Confirma Passo 2 (Data: 28/11/2026)
    User->>Form: Revisa Passo 3 e clica "Enviar para WhatsApp"
    Form->>User: Redireciona para WhatsApp com pedido estruturado!
```

---

## 3. Diagrama de Fluxo de Reserva & Geração de Pedido

Mapeamento da jornada de dados desde a escolha de itens até o envio da mensagem criptografada ao atendente da expedição.

```mermaid
flowchart TD
    Start(["Início: Usuário Navega na Landing Page"]) --> SelectPkg["Seleciona Pacote de Escalada"]
    SelectPkg --> AddCart["addItem() no useCartStore\nPreço em Reais: R$ 277,00"]

    AddCart --> CheckAuth{"Usuário está logado?"}

    CheckAuth -- "Não" --> ShowAuthPrompt["Exibe AuthPromptScreen no CartModal\n+ Dispara login() do Privy"]
    ShowAuthPrompt --> LoginAction["Usuário realiza login seguro"]
    LoginAction --> OpenForm

    CheckAuth -- "Sim" --> OpenForm["Abre CheckoutForm"]

    OpenForm --> Step1["Etapa 1: Dados dos Participantes\n(Nome, Idade, Nível, WhatsApp, Declaração de Saúde)"]
    Step1 --> Validate1{"Dados válidos?"}
    Validate1 -- "Não" --> Step1
    Validate1 -- "Sim" --> Step2["Etapa 2: Confirmação de Data\n(Data Oficial: 28 de Novembro de 2026)"]

    Step2 --> Step3["Etapa 3: Resumo do Pedido & Preview do WhatsApp\n(Preço: R$ 277,00 por participante)"]

    Step3 --> SubmitOrder["Clique em 'Enviar para WhatsApp e Finalizar'"]
    SubmitOrder --> CreateOrderUseCase["CreateOrder.execute()\n(Converte Reais para centavos internamente: 27700)"]

    CreateOrderUseCase --> SaveOrder["OrderRepository.createWhatsAppOrder()"]
    SaveOrder --> GenURL["WhatsAppService.formatMessageAndGetUrl()"]
    GenURL --> OpenWhatsApp["Abre WhatsApp com a mensagem formatada"]
    OpenWhatsApp --> Done(["Fim: Atendimento personalizado e link de pagamento"])
```

---

## 4. Máquina de Estados do Carrinho (`useCartStore`)

O estado global do carrinho é gerenciado pelo **Zustand** com persistência em `localStorage`.

```mermaid
stateDiagram-v2
    [*] --> ClosedEmpty: Inicialização

    ClosedEmpty --> OpenEmpty: openCart() / toggleCart()
    OpenEmpty --> ClosedEmpty: closeCart()

    ClosedEmpty --> OpenWithItems: addItem() [Guest]
    OpenEmpty --> OpenWithItems: addItem()

    state OpenWithItems {
        [*] --> CartListView: Visualizando Itens
        CartListView --> CartListView: updateQuantity() / removeItem()
        CartListView --> Empty: clearCart()
    }

    OpenWithItems --> AuthPromptState: openCheckout() [!isLoggedIn]

    state AuthPromptState {
        [*] --> WaitingLogin: Exibindo AuthPromptScreen
        WaitingLogin --> CartListView: onBack() [Voltar ao Carrinho]
        WaitingLogin --> CheckoutActive: login() concluído com sucesso [isLoggedIn = true]
    }

    OpenWithItems --> CheckoutActive: openCheckout() [isLoggedIn]

    state CheckoutActive {
        [*] --> Step1_Participants
        Step1_Participants --> Step2_ClimbingDate: handleNext() [Válido]
        Step2_ClimbingDate --> Step1_Participants: handlePrevious()
        Step2_ClimbingDate --> Step3_Review: handleNext() [Válido]
        Step3_Review --> Step2_ClimbingDate: handlePrevious()
        Step3_Review --> Submitting: handleSubmit()
    }

    CheckoutActive --> CartListView: onBack() [Retornar à lista]
    Submitting --> OrderCompleted: Sucesso CreateOrder + WhatsApp
    OrderCompleted --> ClosedEmpty: clearCart() + closeCart()
```

---

## 5. Arquitetura do Sistema de Temas e Multi-Destinos

O XperienceClimb foi concebido para ser agnóstico quanto ao destino de aventura, permitindo alternar marcas, paletas de cores e catálogos dinamicamente.

```mermaid
classDiagram
    class ThemeProvider {
        +currentTheme: ThemeConfig
        +setTheme(themeId: string)
        +isDynamic: boolean
    }

    class ThemeConfig {
        +id: string
        +name: string
        +colors: ThemeColors
        +hero: HeroConfig
        +packagesSection: PackagesSectionConfig
        +location: LocationConfig
        +faq: FAQItem[]
    }

    class PackagesSectionConfig {
        +badge: string
        +title: string
        +titleAccent: string
        +nextConfirmedDate: ConfirmedDateConfig
        +items: PackageItem[]
        +annualCard: AnnualCardConfig
    }

    class PackageItem {
        +id: string
        +name: string
        +prefix: string
        +price: number
        +priceFormatted: string
        +duration: string
        +level: string
        +features: string[]
        +bonus: string[]
        +disabled: boolean
    }

    ThemeProvider --> ThemeConfig
    ThemeConfig --> PackagesSectionConfig
    PackagesSectionConfig --> PackageItem

    note for ThemeConfig "Pedra Bela é o tema padrão ativo (pedraBellaTheme)"
```

---

## 6. Convenção de Preços e Moeda no Sistema

| Camada / Componente                                                               | Formato                | Exemplo                              | Responsabilidade                                                 |
| :-------------------------------------------------------------------------------- | :--------------------- | :----------------------------------- | :--------------------------------------------------------------- |
| **Theme Configs** ([`pedra-bela.ts`](../src/themes/configs/pedra-bela.ts))        | `number` (Reais)       | `277`                                | Preço nominal de venda cadastrado                                |
| **Zustand Store** ([`useCartStore.ts`](../src/store/useCartStore.ts))             | `number` (Reais)       | `277`                                | Armazenamento do item no carrinho                                |
| **Formatação UI** ([`src/lib/utils.ts`](../src/lib/utils.ts))                     | `string` (BRL)         | `R$ 277,00`                          | Exibição internacionalizada `Intl.NumberFormat`                  |
| **Caso de Uso** ([`CreateOrder.ts`](../src/core/use-cases/orders/CreateOrder.ts)) | `number` (Centavos)    | `27700`                              | Cálculo matemático preciso sem arredondamento de ponto flutuante |
| **Entidade de Pedido** ([`Order.ts`](../src/core/entities/Order.ts))              | `{ amount, currency }` | `{ amount: 27700, currency: 'BRL' }` | Persistência e regras de domínio financeiro                      |
