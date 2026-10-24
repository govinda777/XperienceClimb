# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [0.2.0] - 2026-10-24

### 🏔️ Destaques da Versão

Esta versão consolida o novo **Design System Editorial / Outdoor (estilo Arc'teryx e Boulder Aesthetic)**, o fluxo unificado de reserva de expedições com **autenticação prévia obrigatória**, a correção definitiva do cálculo de preços no checkout e a centralização em **Pedra Bela** com suporte a rotas multi-destino.

---

### ✨ Adicionado (Added)

- **Tela de Identificação Segura (`AuthPromptScreen`):**
  - Implementada barreira de autenticação elegante dentro do modal do carrinho ([`CartModal.tsx`](src/components/cart/CartModal.tsx)), que impede usuários anônimos de avançar para os dados do checkout sem antes efetuar login.
  - Apresenta justificativa clara da identificação: emissão nominal da apólice individual do **Seguro Aventura** e garantia da vaga.
  - Exibe resumo em tempo real do carrinho e botões com micro-interações (`Entrar ou Criar Conta ›` e `← Ver Itens do Carrinho`).
- **Banner de Próxima Saída Confirmada & Solicitação WhatsApp:**
  - Componente integrado ao topo da seção de pacotes ([`PackagesSection.tsx`](src/components/sections/PackagesSection.tsx)), destacando a expedição oficial para **28 de Novembro de 2026**.
  - Botão de ação rápida para solicitar datas customizadas diretamente via WhatsApp da equipe.
- **Passaporte Anual de Escalada (VIP):**
  - Card horizontal completo com os benefícios exclusivos do programa anual (12 vagas/ano, equipamentos, treinamentos e Kit VIP).
- **Componente Vetorial `ClimbingDoodles`:**
  - Biblioteca de ilustrações vetoriais e linhas topográficas para enriquecimento visual editorial das seções de aventura.
- **Redesenho Anatômico de `badge-iniciantes.svg`:**
  - Novo SVG desenhado do zero contendo 3 amigos escaladores articulados, com 2 braços anatômicos, dedos e equipamentos (corda dinâmica, arnês e capacete).
- **Roteamento Dinâmico Multi-Destinos:**
  - Rota [`/destinos/[slug]`](src/app/destinos/[slug]/page.tsx) com sincronização automática do tema e metadados SEO via `DestinationThemeSync`.
- **Páginas Institucionais e SEO:**
  - Nova página de guia de iniciantes ([`src/app/guia-escalada-iniciantes-sp/page.tsx`](src/app/guia-escalada-iniciantes-sp/page.tsx)) e tratamento amigável de erro 404 ([`src/app/not-found.tsx`](src/app/not-found.tsx)).

---

### 🐛 Corrigido (Fixed)

- **Multiplicação Indevida de Preço no Checkout:**
  - **Causa Raiz:** O componente `PackagesSection.tsx` enviava `price: pkg.price * 100` (`27700`) para o método `addItem` do carrinho. Como a função `formatPrice` e o use case `CreateOrder` já realizavam a formatação e conversão para centavos, o valor era exibido como `R$ 27.700,00` (e `R$ 83.100,00` para 3 participantes).
  - **Correção:** Unificada a convenção monetária para que o carrinho armazene o valor em Reais (`pkg.price = 277`). O resumo do pedido, modal e WhatsApp agora exibem rigorosamente **`R$ 277,00`**.
- **Bloqueio Invasivo por `alert()` Nativo do Navegador:**
  - Eliminado o `alert('Usuário não autenticado')` que bloqueava o formulário de checkout no passo final. O fluxo agora aciona a tela de identificação prévia ou abre diretamente o modal do Privy.
- **Avisos de Build do Webpack (Critical Dependency):**
  - Configurado filtro de `ignoreWarnings` no [`next.config.js`](next.config.js) para a dependência transitiva `ox/virtualMasterPool.js`.
- **Erro de Build na Vercel (Google Font `Big Shoulders`):**
  - **Causa Raiz:** O arquivo `src/app/layout.tsx` importava a fonte de display como `Big_Shoulders`. Em ambientes de build limpos (como o runner da Vercel sem cache), o Webpack falhava acusando que a fonte era desconhecida no catálogo oficial do Google Fonts.
  - **Correção:** Atualizado o import para `Big_Shoulders_Display` (correspondente ao `@next/font/google` e `tailwind.config.js`) e sincronizado o `package-lock.json`.
- **Proteção de Rota de Teste em Produção:**
  - Inserida verificação de `process.env.NODE_ENV === 'production'` com `notFound()` na rota `src/app/test-e2e/checkout/page.tsx`, garantindo que o ambiente de teste seja inacessível em produção.

---

### 🔄 Modificado (Changed)

- **Blindagem de Hooks Git (Husky):**
  - **Pre-Commit (`.husky/pre-commit`):** Executa `lint-staged`, checagem estrita de tipos (`tsc --noEmit`) e testes unitários (`npm run test:unit`).
  - **Pre-Push (`.husky/pre-push`):** Executa obrigatoriamente `npm run build` (garantindo que builds quebrados jamais cheguem à Vercel) seguido de `npm run test:e2e -- --reporter=line` (Playwright E2E do checkout em 3 etapas).
- **Esteira de CI/CD do GitHub Actions (`.github/workflows/ci.yml`):**
  - Criada pipeline contínua na nuvem para branches `main`, `feature/*` e Pull Requests rodando toda a suíte de testes e validação de build.
- **Novos Scripts de Qualidade no `package.json`:**
  - Adicionados `npm run pipeline`, `npm run pipeline:quick`, `npm run test:unit`, `npm run test:e2e:ui` e `npm run test:e2e:report`.
- **Menu Superior Fixo (`fixed top-0`):**
  - Barra de navegação agora permanece fixa durante o scroll da página, com fundo semitransparente em blur (`backdrop-blur-md`), compensação no topo do elemento principal (`pt-20`) e offset suave para âncoras (`scroll-padding-top: 5rem`).
- **Limpeza do Card Agarrão:**
  - Removido o bloco repetitivo de data interna no card de Batismo, centralizando a informação na barra de status superior.
- **Higienização de Dependências:**
  - Removido pacote não utilizado `@farcaster/mini-app-solana` que gerava avisos de peer dependencies.
  - Bloqueados artefatos temporários do pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.pnpm-store/`) no `.gitignore` em favor do padrão estável com `npm` e `package-lock.json`.
- **Cobertura de Testes:**
  - 24 suítes de testes automatizados executando e passando integralmente com **269 testes aprovados** e testes E2E do Playwright aprovados.

---

## [0.1.0] - 2026-07-16

### Adicionado

- Versão inicial da plataforma XperienceClimb com Next.js 15 App Router.
- Integração básica de carrinho com Zustand e persistência local.
- Integração de autenticação social e Web3 via Privy.
- Suporte inicial a pagamentos e notificações via WhatsApp.
- Arquitetura Clean Architecture com Domain-Driven Design (DDD).
