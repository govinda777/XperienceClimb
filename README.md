# 🧗‍♂️ XperienceClimb — Plataforma de Expedições e Escalada em Rocha

[![Next.js](https://img.shields.io/badge/Next.js-15.0.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Jest Tests](https://img.shields.io/badge/Tests-269%20passed-brightgreen?style=flat&logo=jest)](https://jestjs.io/)
[![Privy](https://img.shields.io/badge/Auth-Privy%20Web3%20%2B%20Social-blueviolet)](https://privy.io/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2B%20DDD-orange)](#-arquitetura)

O **XperienceClimb** é uma plataforma full-stack moderna de reservas e imersão para vivências de escalada esportiva e montanhismo em rocha natural. Com identidade visual inspirada na alta alfaiataria outdoor (**Arc'teryx / Boulder Aesthetic**), a plataforma oferece uma jornada de contratação fluida, segura e transparente para expedições na **Pedra do Santuário em Pedra Bela (SP)** e outros polos brasileiros de escalada.

---

## 🌟 Principais Recursos e Diferenciais

- **🎨 Design System Outdoor Editorial:** Tipografia técnica com tags em mono (`ALT 1.120M`, `GPS 22°42'S`), títulos display e ilustrações vetoriais personalizadas (`ClimbingDoodles`).
- **🛡️ Checkout com Identificação Prévia (`AuthPromptScreen`):** Garantia de que todos os dados coletados sejam atrelados com segurança ao perfil do participante, evitando cancelamentos ou perda de dados.
- **📱 Integração Direta com WhatsApp:** O fluxo de fechamento converte o pedido em uma mensagem estruturada e auditável para atendimento consultivo dos instrutores e emissão de apólice do **Seguro Aventura**.
- **📅 Gestão Dinâmica de Expedições:** Exibição da próxima data confirmada (**28 de Novembro de 2026**) com canal aberto para reserva de datas privativas sob medida.
- **🗺️ Arquitetura Multi-Destino:** Sistema flexível com `ThemeProvider` e rotação dinâmica por rotas (`/destinos/[slug]`).
- **🧪 Engenharia com Qualidade Máxima:** 24 suítes de testes automatizados com **269 testes aprovados** (Jest + Testing Library) e compilação de build Next.js com zero erros.

---

## 📦 Pacotes de Experiência

| Pacote                   | Modalidade       | Duração          | Preço           | O que inclui                                                                                                                                              |
| :----------------------- | :--------------- | :--------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **VIA · BATISMO**        | Pacote Agarrão   | 1 dia            | **R$ 277,00**   | Rocha natural, equipamentos UIAA, instrutores certificados, seguro aventura, almoço completo à vontade, café no mirante ao pôr do sol e mentoria de vida. |
| **CRUX · INTERMEDIÁRIO** | Pacote Crux      | 1 dia + Pernoite | Lista de Espera | Todas as vias do Agarrão + Hospedagem de charme na serra e descanso merecido.                                                                             |
| **CUME · AVANÇADO**      | Alma Vertical    | 2 dias inteiros  | Lista de Espera | Fim de semana intenso, 2 dias de escalada técnica, hospedagem com café colonial e ascensão a cumes panorâmicos.                                           |
| **VIP · ANUAL**          | Passaporte Anual | 12 meses         | 12 Vagas/Ano    | Acesso exclusivo ao calendário anual, treinamentos contínuos de técnica e segurança, além de Kit VIP de aventura.                                         |

---

## 🏗️ Arquitetura do Sistema

O projeto é estruturado conforme a **Clean Architecture** e o **Domain-Driven Design (DDD)**:

```
src/
├── app/                    # Presentation: Next.js App Router (Páginas, Rotas e APIs)
├── components/             # Componentes React (CartModal, CheckoutForm, Sections, UI)
├── core/                   # Domain Layer: Entidades puras, Interfaces e Casos de Uso
│   ├── entities/          # Order, User, Coupon, Tour
│   ├── repositories/      # Interfaces (IOrderRepository, IUserRepository)
│   └── use-cases/         # CreateOrder, ValidateCoupon
├── infrastructure/         # Infrastructure Layer: Repositórios e Serviços (WhatsAppService)
├── hooks/                  # Custom Hooks (useAuth)
├── store/                  # Estado Global Reativo (Zustand: useCartStore)
├── themes/                 # Motor de Temas Dinâmicos (pedra-bela.ts)
└── lib/                    # Constantes, utilitários monetários e helpers
```

Para uma análise detalhada da arquitetura, consulte o documento [`ARQ.md`](ARQ.md) e o compêndio de diagramas em [`docs/FLUXOS_E_DIAGRAMAS.md`](docs/FLUXOS_E_DIAGRAMAS.md).

---

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** >= 18.18.0
- **npm** (gerenciador oficial do projeto)

### 1. Clonar e Instalar

```bash
git clone https://github.com/govinda777/XperienceClimb.git
cd XperienceClimb
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz baseado no exemplo:

```bash
cp .env.example .env.local
```

Principais chaves necessárias:

```env
NEXT_PUBLIC_PRIVY_APP_ID=seu_app_id_privy
NEXT_PUBLIC_WHATSAPP_NUMBER=5511995413539
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

---

## 🧪 Testes Automatizados & Pipeline de CI Local

O projeto conta com uma esteira rigorosa de testes e proteção de branches que impede código quebrado de subir para produção ou falhar no deploy da Vercel.

### 1. Executar a Pipeline Completa Localmente (Espelho do GitHub Actions)

Executa a validação de ponta a ponta: checagem de tipos TypeScript, linter, testes unitários, compilação de produção do Next.js e testes E2E do Playwright:

```bash
npm run pipeline
```

### 2. Testes de Unidade (Jest)

Execução rápida (~4 segundos) focada nas regras de negócio, use cases de reservas, stores e componentes:

```bash
# Rodar todos os testes de unidade uma vez
npm run test:unit

# Rodar em modo observador (watch) durante o desenvolvimento
npm run test:watch

# Rodar com relatório de cobertura de código
npm run test:coverage
```

### 3. Testes End-to-End (Playwright)

Valida visualmente toda a jornada crítica do usuário: carrinho, formulário de 3 etapas com dados nominais dos participantes, termo de saúde e envio com payload formatado para a Web API do WhatsApp.

```bash
# Executar em modo headless no terminal (rápido e silencioso)
npm run test:e2e

# Abrir o painel gráfico interativo com Time Travel Debugging e gravação de passos
npm run test:e2e:ui

# Visualizar o relatório detalhado do último teste executado
npm run test:e2e:report
```

---

## 🛠️ Comandos Disponíveis

| Comando                  | Descrição                                                                               |
| :----------------------- | :-------------------------------------------------------------------------------------- |
| `npm run dev`            | Inicia o servidor local Next.js em modo de desenvolvimento (`http://localhost:3000`)    |
| `npm run build`          | Compila o build estático otimizado de produção (19 rotas)                               |
| `npm run start`          | Inicia a aplicação compilada em modo de produção                                        |
| `npm run type-check`     | Executa o compilador TypeScript (`tsc --noEmit`) sem emitir arquivos                    |
| `npm run lint`           | Executa a verificação e correção de estilo com ESLint e Prettier                        |
| `npm run test:unit`      | Executa rapidamente a suíte de testes de unidade com Jest (~4s)                         |
| `npm test`               | Executa a suíte completa de testes automatizados com Jest (269 testes)                  |
| `npm run test:watch`     | Executa os testes unitários no modo interativo contínuo                                 |
| `npm run test:e2e`       | Executa os testes ponta a ponta com Playwright em modo headless                         |
| `npm run test:e2e:ui`    | Abre o painel visual interativo do Playwright com depuração e Time Travel               |
| `npm run pipeline`       | Executa a esteira completa local (Tipos ➔ Lint ➔ Testes Unitários ➔ Build ➔ Playwright) |
| `npm run pipeline:quick` | Executa a validação rápida local (Checagem de Tipos + Testes de Unidade)                |

---

## 📚 Documentação Especializada

- **[CHANGELOG.md](CHANGELOG.md):** Histórico semântico de versões, novidades e correções.
- **[ARQ.md](ARQ.md):** Documentação arquitetural aprofundada, convenção monetária e padrões de código.
- **[docs/FLUXOS_E_DIAGRAMAS.md](docs/FLUXOS_E_DIAGRAMAS.md):** Diagramas Mermaid (Sequência de Checkout, Máquina de Estados e Temas).
- **[Package_Form.md](Package_Form.md):** Especificação completa das 3 etapas do formulário de reserva.
- **[docs/GLOSSARIO_TECNICO_SEGURANCA.md](docs/GLOSSARIO_TECNICO_SEGURANCA.md):** Glossário de escalada e equipamentos certificados.

---

## 🛡️ Licença e Direitos

Projeto desenvolvido com foco em excelência técnica e turismo de aventura consciente. Todos os direitos reservados à **XperienceClimb**.
