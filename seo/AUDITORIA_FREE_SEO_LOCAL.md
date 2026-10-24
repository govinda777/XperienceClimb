# 🔍 Auditoria de SEO Técnico, On-Page e Semântico (`/free-seo`) — Pós-Implementação

- **Projeto:** Xperience Climb (`https://climb.xperiencehubs.com`)
- **Data da Reavaliação:** 24 de Outubro de 2026
- **Escopo:** Reavaliação 100% local do código-fonte Next.js (App Router), Metadados, Rastreabilidade, Destino Padrão (`/`), Hierarquia Semântica, Dados Estruturados (`Schema.org`), Ativos de Mídia e Suíte Automatizada de Testes de SEO (Jest + Playwright).
- **Score Global Atual:** **99 / 100** _(evolução de **+25 pontos** em relação ao score inicial de 74/100)_

---

## 📊 Resumo Executivo (Antes vs. Depois)

Todos os **6 problemas críticos e de alto impacto** identificados na primeira rodada de diagnóstico foram solucionados no código-fonte e blindados por testes automatizados de regressão em **Jest** ([`seo-contracts.test.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/__tests__/seo-contracts.test.tsx)) e **Playwright** ([`seo-graph.spec.ts`](file:///Users/govinda/projetos/XperienceClimb/tests/e2e/seo-graph.spec.ts)).

| Indicador / Dimensão Auditada                  | Antes (Score 74/100)                                                            | Depois (Score 99/100)                                                                                              | Status |
| :--------------------------------------------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :----: |
| **Imagens OpenGraph & Twitter Card**           | `site-og.jpg` e `og-image.jpg` inexistentes (`404`)                             | 3 imagens `1200x630px` físicas otimizadas (`< 300 KB`) em `public/images/`                                         |   ✅   |
| **Tags `<title>` nas Subpáginas**              | Duplicação/triplicação de `\| Xperience Climb` e 94 chars no Guia               | Títulos únicos entre **40 e 62 chars** sem repetição de N-gramas                                                   |   ✅   |
| **Destino Padrão em `/` e `/destinos`**        | Sem rota `/destinos` e fallback vulnerável a 404                                | `http://localhost:3000/` e `/destinos` carregam **Pedra Bela** com `HTTP 200`                                      |   ✅   |
| **Páginas Órfãs (Crawl Graph)**                | `/guia-escalada-iniciantes-sp` e `/destinos/*` sem links na Home                | Links contextuais em `BeginnerSection`, `CommunitySection`, `Navigation` e `Footer` (`Click Depth = 1`)            |   ✅   |
| **Schema.org JSON-LD (`StructuredData.tsx`)**  | Conflito de duplo `FAQPage` no Guia e âncoras `#sobre`/`#iniciantes` quebradas  | Grafo modular (`mode="global"` vs `mode="home"`), máximo `1 FAQPage` por URL e âncoras `#lugar`/`#batismo` válidas |   ✅   |
| **SSR Wave 1 & Similaridade entre Destinos**   | `/destinos/fazenda-ipanema` renderizava Pedra Bela no SSR (`100%` similaridade) | SSR real via `initialThemeId` com conteúdo 100% próprio da FLONA Ipanema (`< 55%` similaridade Jaccard)            |   ✅   |
| **Peso das Fotos da Galeria & Links Externos** | Fotos de 4,4 MB a 8,9 MB + 2 URLs externas de terceiros                         | 100% imagens locais padronizadas e comprimidas (`31 KB` a `722 KB`, redução de `> 25 MB`)                          |   ✅   |

---

## 🔬 Avaliação Detalhada por Pilar (`/free-seo`)

### A. Metadados e Tags de Cabeçalho (`layout.tsx`, `page.tsx`, `generateMetadata`)

| Rota                           | `<title>` Final Renderizado                                       | Caracteres | Canonical URL                                                 | Status |
| :----------------------------- | :---------------------------------------------------------------- | :--------: | :------------------------------------------------------------ | :----: |
| `/`                            | `Vivência de Escalada em Pedra Bela - SP \| Xperience Climb`      |  57 chars  | `https://climb.xperiencehubs.com`                             |   ✅   |
| `/destinos/pedra-bela`         | `Vivência de Escalada em Pedra Bela - SP \| Xperience Climb`      |  57 chars  | `https://climb.xperiencehubs.com` _(consolidada)_             |   ✅   |
| `/destinos/fazenda-ipanema`    | `Vivência de Escalada em Fazenda Ipanema - SP \| Xperience Climb` |  62 chars  | `https://climb.xperiencehubs.com/destinos/fazenda-ipanema`    |   ✅   |
| `/guia-escalada-iniciantes-sp` | `Guia de Escalada para Iniciantes em SP \| Xperience Climb`       |  56 chars  | `https://climb.xperiencehubs.com/guia-escalada-iniciantes-sp` |   ✅   |
| `/politica-de-privacidade`     | `Política de Privacidade \| Xperience Climb`                      |  41 chars  | `https://climb.xperiencehubs.com/politica-de-privacidade`     |   ✅   |
| `/termos-de-uso`               | `Termos de Uso e Condições \| Xperience Climb`                    |  43 chars  | `https://climb.xperiencehubs.com/termos-de-uso`               |   ✅   |

- **Meta Descriptions:** Todas as páginas possuem descrições persuasivas e únicas entre **138 e 159 caracteres**.
- **OpenGraph & Twitter Cards:** Todas as imagens (`1200x630px`) existem fisicamente e foram validadas por teste automatizado (`fs.existsSync`).

---

### B. Hierarquia Semântica, Acessibilidade e Ativos Visuais

- **Unicidade de `<h1>`:** Todas as páginas públicas possuem exatamente **1 única tag `<h1>`** contendo a intenção primária da rota:
  - `/` e `/destinos/pedra-bela`: _"VIVÊNCIA DE ESCALADA EM ROCHA em conexão com a natureza."_
  - `/destinos/fazenda-ipanema`: _"VIVÊNCIA DE ESCALADA NA FAZENDA IPANEMA no coração da Mata Atlântica."_
  - `/guia-escalada-iniciantes-sp`: _"Guia Definitivo de Escalada em Rocha para Iniciantes em SP"_
- **Atributos `alt` e Acessibilidade:**
  - Elementos puramente decorativos (`botanical-leaves.svg` em [`HeroSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/HeroSection.tsx#L66-L75)) estão marcados com `alt=""` e `aria-hidden="true"`.
  - Todas as fotos de conteúdo e galeria possuem `alt` descritivo com mais de 10 caracteres contextualizando a atividade e a cidade.
  - Corrigido o texto do card em [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L147) para `"100% Equipamento Seguro"`.

---

### C. Rastreabilidade, Destino Padrão e Arquitetura de Links Internos

- **Destino Padrão (`Pedra Bela`):**
  - A raiz `/` ([`src/app/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/page.tsx)) e a rota `/destinos` ([`src/app/destinos/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/destinos/page.tsx)) carregam/redirecionam automaticamente para o destino padrão **Pedra Bela**.
  - Qualquer slug desconhecido em `/destinos/[slug]` redireciona de forma segura para `/destinos/pedra-bela`.
- **Fim das Páginas Órfãs (`Click Depth = 1`):**
  - A Home (`/`) possui links diretos e rastreáveis para `/guia-escalada-iniciantes-sp` (em [`BeginnerSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/BeginnerSection.tsx#L87) e [`Footer.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/Footer.tsx)), `/destinos/pedra-bela` e `/destinos/fazenda-ipanema` (em [`CommunitySection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/CommunitySection.tsx#L112-L122), [`Navigation.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/layout/Navigation.tsx) e [`Footer.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/Footer.tsx)).
- **Sitemap & Robots:**
  - [`src/app/sitemap.ts`](file:///Users/govinda/projetos/XperienceClimb/src/app/sitemap.ts) atualizado com `lastModified: 2026-10-24`.
  - [`src/app/robots.ts`](file:///Users/govinda/projetos/XperienceClimb/src/app/robots.ts) bloqueia `/api/`, `/checkout/` e `/test-e2e/` com paridade total verificada por teste.

---

### D. Dados Estruturados (`Schema.org` JSON-LD)

- **Modularização sem Colisão ([`StructuredData.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/StructuredData.tsx)):**
  - `mode="global"` no [`layout.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/layout.tsx#L116): injeta `Organization`, `LocalBusiness` (`SportsActivityLocation` / `TouristAttraction`) e `SiteNavigationElement`.
  - `mode="home"` no [`page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/page.tsx#L54): injeta `Product`, `Event` e `FAQPage` apenas nas páginas que exibem esses elementos.
  - `/guia-escalada-iniciantes-sp` possui exatamente **1 único `FAQPage`** e **1 `Article`**, cumprindo 100% das diretrizes de Rich Results do Google.
- **Paridade de Dados Visíveis ↔ Schema:**
  - Horário operacional unificado em **`08:30` às `18:00`**.
  - Idade mínima recomendada unificada em **12 anos** em todas as páginas.
  - Todas as âncoras de `SiteNavigationElement` (`#lugar`, `#batismo`, `#pacotes`, `#seguranca`, `#localizacao`, `#faq`) correspondem aos IDs reais das seções.

---

## 🧪 Suíte Automatizada de Proteção Contínua de SEO

1. **Testes Unitários de Contrato SEO ([`src/components/seo/__tests__/seo-contracts.test.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/__tests__/seo-contracts.test.tsx)):**
   - Roda em `< 1s` no `npm run test:unit` (24 suítes / 271 testes passando).
   - Valida existência física das imagens em `public/`, limites de caracteres de `<title>` e `description`, ausência de repetição de N-gramas (`| Xperience Climb`), paridade `sitemap.ts` ↔ `robots.ts` e resolução das âncoras do JSON-LD.
2. **Testes E2E de Grafo SEO e SSR Wave 1 ([`tests/e2e/seo-graph.spec.ts`](file:///Users/govinda/projetos/XperienceClimb/tests/e2e/seo-graph.spec.ts)):**
   - Valida no navegador com JavaScript desabilitado (`javaScriptEnabled: false`) que `/` e `/destinos/fazenda-ipanema` entregam conteúdos distintos direto do servidor (`Similaridade Jaccard < 0.55`), possuem apenas 1 `<h1>`, no máximo 1 `FAQPage` por rota e zero páginas órfãs.
