# 🔍 Auditoria de SEO Técnico, On-Page e Semântico (`/free-seo`)

- **Projeto:** Xperience Climb (`https://climb.xperiencehubs.com`)
- **Data da Avaliação:** 24 de Outubro de 2026
- **Escopo:** Auditoria 100% local do código-fonte Next.js (App Router), Metadados, Rastreabilidade, Hierarquia Semântica, Dados Estruturados (`Schema.org`) e Ativos de Mídia.
- **Score Global Atual:** **74 / 100**

---

## 📊 Resumo Executivo

A base estrutural em Next.js App Router já possui `metadataBase`, [`robots.ts`](file:///Users/govinda/projetos/XperienceClimb/src/app/robots.ts), [`sitemap.ts`](file:///Users/govinda/projetos/XperienceClimb/src/app/sitemap.ts), tag de verificação do Google Search Console e um grafo `Schema.org` abrangente. Entretanto, a inspeção do código-fonte revelou **6 problemas críticos e de alto impacto** que hoje prejudicam diretamente a indexação, a geração de Rich Snippets na SERP e a pré-visualização social (OpenGraph / WhatsApp / Instagram).

---

## 🚨 Problemas Críticos e de Alto Impacto

### 1. Imagens OpenGraph, Twitter Card e Schema gerando erro `404` (Severidade: Crítica)

Os arquivos de imagem referenciados nos metadados e no JSON-LD **não existem** na pasta `public/images/`:

- **`/images/site-og.jpg`** — referenciado em:
  - [`src/app/layout.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/layout.tsx#L76-L88)
  - [`src/app/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/page.tsx#L34-L46)
  - [`src/components/seo/StructuredData.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/StructuredData.tsx#L42-L119)
- **`/images/themes/pedra-bela/og-image.jpg`** — referenciado em:
  - [`src/themes/configs/pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L991)
- **`/images/themes/fazenda-ipanema/og-image.jpg`** — referenciado em:
  - [`src/themes/configs/fazenda-ipanema.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/fazenda-ipanema.ts#L195)

**Impacto no SEO & Conversão:**

- Links compartilhados no WhatsApp, Instagram, LinkedIn e X ficam sem imagem de capa (thumbnail quebrada).
- O Validador de Resultados Ricos do Google acusa URL de imagem inválida (`404 Not Found`) nas entidades `LocalBusiness`, `Product` e `Event`.

---

### 2. ✅ [RESOLVIDO] Duplicação e Estouro de `<title>` nas Subpáginas via `title.template` (Severidade: Alta)

Em [`src/app/layout.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/layout.tsx#L47-L50), o template global está definido como `template: '%s | Xperience Climb'`. Os sufixos redundantes e o `location.name` de Pedra Bela foram corrigidos para que o `title.template` componha todos os títulos dentro do limite ideal de ≤ 60 caracteres:

- **Em [`/destinos/pedra-bela`](file:///Users/govinda/projetos/XperienceClimb/src/app/destinos/[slug]/page.tsx#L27-L31):**
  `theme.location.name` em [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L813) atualizado para `'Pedra Bela - SP'`:
  > ✅ `Vivência de Escalada em Pedra Bela - SP | Xperience Climb` _(57 caracteres)_
- **Em [`/destinos/fazenda-ipanema`](file:///Users/govinda/projetos/XperienceClimb/src/app/destinos/[slug]/page.tsx#L27-L31):**
  > ✅ `Vivência de Escalada em Morro Araçoiaba | Xperience Climb` _(57 caracteres)_
- **Em [`/guia-escalada-iniciantes-sp`](file:///Users/govinda/projetos/XperienceClimb/src/app/guia-escalada-iniciantes-sp/page.tsx#L15):**
  > ✅ `Guia de Escalada para Iniciantes em SP | Xperience Climb` _(56 caracteres)_
- **Em [`/checkout`](file:///Users/govinda/projetos/XperienceClimb/src/app/checkout/layout.tsx#L4) e [`/test-e2e`](file:///Users/govinda/projetos/XperienceClimb/src/app/test-e2e/layout.tsx#L4):**
  > ✅ `Checkout | Xperience Climb` _(26 caracteres)_ e `Ambiente de teste | Xperience Climb` _(35 caracteres)_

---

### 3. Páginas Órfãs — Ausência de Links Internos na Home (Severidade: Alta)

As 3 páginas estratégicas de conteúdo listadas em [`src/app/sitemap.ts`](file:///Users/govinda/projetos/XperienceClimb/src/app/sitemap.ts#L13-L30) **não possuem nenhum link interno (`<a href>` / `<Link href>`)** apontando para elas a partir da Home ([`src/app/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/page.tsx)), [`Navigation.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/layout/Navigation.tsx) ou [`Footer.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/Footer.tsx):

- `/guia-escalada-iniciantes-sp` está **100% órfã** na arquitetura de navegação do site.
- `/destinos/pedra-bela` e `/destinos/fazenda-ipanema` só recebem links a partir de `/guia-escalada-iniciantes-sp` (que por sua vez é órfã), não sendo linkadas nos cards de destinos da [`CommunitySection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/CommunitySection.tsx) nem no rodapé.

**Impacto no SEO:**

- Páginas sem PageRank interno e sem descoberta por rastreamento de links sofrem atraso de indexação e baixa autoridade temática no Google.

---

### 4. Conflito de `FAQPage` Duplicado e Inconsistências no `StructuredData.tsx` (Severidade: Alta)

O componente [`<StructuredData />`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/StructuredData.tsx#L5) está inserido dentro do `<head>` global em [`src/app/layout.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/layout.tsx#L115-L117):

1. **Conflito grave de `FAQPage` duplicado em `/guia-escalada-iniciantes-sp`:**
   - A página recebe o `FAQPage` global do `RootLayout` (7 perguntas de Pedra Bela) **e** injeta um segundo `FAQPage` local em [`src/app/guia-escalada-iniciantes-sp/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/guia-escalada-iniciantes-sp/page.tsx#L76-L105) (3 perguntas do Guia).
   - As diretrizes do Google determinam que deve existir **apenas um `FAQPage` por página**; múltiplos blocos `FAQPage` invalidam a elegibilidade para Rich Results.
2. **Dados estruturados em páginas sem relação com o conteúdo:**
   - `/politica-de-privacidade`, `/termos-de-uso` e `/checkout/*` herdam schemas de `Product`, `Event` e `FAQPage` cujo conteúdo não está visível nessas rotas.
3. **Âncoras inexistentes em `SiteNavigationElement`:**
   - Em [`StructuredData.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/StructuredData.tsx#L174-L180), os itens apontam para `/#sobre` e `/#iniciantes`, mas os IDs reais das seções em [`AboutSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/AboutSection.tsx#L26) e [`BeginnerSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/BeginnerSection.tsx#L15) são `#lugar` e `#batismo`.
4. **Divergências de dados entre Schema e Conteúdo Visível:**
   - **Horário:** [`StructuredData.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/seo/StructuredData.tsx#L63-L64) informa `08:45` às `17:00`, enquanto [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L410) informa `08:30h` às `18:00h`.
   - **Idade mínima:** [`guia-escalada-iniciantes-sp/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/guia-escalada-iniciantes-sp/page.tsx#L324) informa **8 anos**, enquanto [`constants.ts`](file:///Users/govinda/projetos/XperienceClimb/src/lib/constants.ts#L65) e [`termos-de-uso/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/termos-de-uso/page.tsx#L103) informam **12 anos**.

---

### 5. Conteúdo Duplicado (Cannibalization) nas Rotas `/destinos/[slug]` (Severidade: Alta)

Em [`src/app/destinos/[slug]/page.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/destinos/[slug]/page.tsx#L65-L70):

- **`/destinos/pedra-bela`** renderiza exatamente o mesmo componente `<Home />` da raiz (`/`), mas define `canonical: 'https://climb.xperiencehubs.com/destinos/pedra-bela'`, criando duas URLs canônicas distintas com 100% do mesmo conteúdo HTML.
- **`/destinos/fazenda-ipanema`** também renderiza no HTML todo o conteúdo de **Pedra Bela**, pois as seções consomem `currentTheme?.heroSection || pedraBellaTheme.heroSection!` e [`fazenda-ipanema.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/fazenda-ipanema.ts) não possui `heroSection`, `destinationSection`, `beginnerSection`, etc. Para o Googlebot, a página da Fazenda Ipanema apresenta textos e fotos de Pedra Bela.

---

### 6. Acessibilidade, Tags `alt`, Textos e Peso de Imagens (Severidade: Média)

- **SVGs decorativos com `alt` redundante:**
  - Em [`HeroSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/HeroSection.tsx#L66-L75), as duas folhas botânicas decorativas usam `alt="Folhas botânicas decorativas"` em vez de `alt=""` e `aria-hidden="true"`.
- **Atributos `alt` curtos nos cards de destino:**
  - Em [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L102-L113), os atributos `alt` são apenas `"Pedra do Santuário"` e `"Almoço no Mirante"`, podendo ser enriquecidos com contexto local e de atividade.
- **Typo visível na seção de iniciantes:**
  - Em [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L147), o título do card diz `"Cento Equipamento Seguro"` em vez de `"100% Equipamento Seguro"`.
- **Arquivos de imagem pesados e dependências externas na Galeria:**
  - Em `public/images/themes/pedra-bela/`: `pedra-bela-3.jpg` (**8,9 MB**), `pedra-bela-2.jpg` (**7,9 MB**) e `paisagem-1.jpg` (**4,4 MB**).
  - Duas fotos em [`pedra-bela.ts`](file:///Users/govinda/projetos/XperienceClimb/src/themes/configs/pedra-bela.ts#L571-L587) dependem de URLs externas de terceiros (`visitesocorrosp.com.br` e `onofftransportes.com.br`), sujeitas a link rot ou lentidão de DNS/TLS.

---

## ✅ Checklist Técnico On-Page (`/free-seo`)

| Item Avaliado                         | Status | Diagnóstico                                                                                                                  |
| :------------------------------------ | :----: | :--------------------------------------------------------------------------------------------------------------------------- |
| **Title Tag (Home)**                  |   ✅   | 56 caracteres (`Vivência de Escalada em Pedra Bela - SP \| Xperience Climb`)                                                 |
| **Meta Description (Home)**           |   ✅   | 159 caracteres com CTA e diferenciais técnicos (UIAA/CE, seguro, almoço)                                                     |
| **Title Tag (Subpáginas)**            |   ✅   | Todos os títulos utilizam `title.template` sem duplicação e ≤ 60 caracteres                                                  |
| **Canonical URLs**                    |   ⚠️   | Configuradas com HTTPS, mas `/destinos/pedra-bela` duplica a Home                                                            |
| **OpenGraph & Twitter Card**          |   ❌   | Imagens `site-og.jpg` e `og-image.jpg` retornam `404`                                                                        |
| **Viewport & Theme Color**            |   ✅   | Configurados em [`layout.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/app/layout.tsx#L106-L110) sem bloquear zoom |
| **Hierarquia `<h1>`–`<h3>`**          |   ✅   | Apenas 1 `<h1>` por página e subtítulos `<h2>`/`<h3>` bem estruturados                                                       |
| **Atributos `alt` em Imagens**        |   ⚠️   | Maioria descritiva; ajustar SVGs decorativos no Hero e cards em `AboutSection`                                               |
| **Links Internos**                    |   ❌   | `/guia-escalada-iniciantes-sp` e `/destinos/*` sem links na Home/Footer                                                      |
| **Sitemap (`sitemap.ts`)**            |   ✅   | 6 URLs públicas válidas com `lastModified` e `priority`                                                                      |
| **Robots (`robots.ts`)**              |   ✅   | Permite `/` e bloqueia `/api/`, `/test-e2e/`, `/checkout/`                                                                   |
| **Schema.org (`StructuredData.tsx`)** |   ⚠️   | Duplo `FAQPage` no Guia, âncoras `#sobre`/`#iniciantes` quebradas e horários divergentes                                     |

---

## 🛠️ Plano de Ação Recomendado (Custo Zero)

1. **Corrigir Imagens OpenGraph (`P1`):**
   - Criar/apontar `/images/site-og.jpg` (1200x630px) e as imagens OG dos temas para arquivos reais otimizados em `public/images/`.
2. ~~**Corrigir `title` e `location.name` nas Subpáginas (`P1`):**~~ ✅ **Concluído**
   - Removido o sufixo `| Xperience Climb` redundante das subpáginas (deixando o `title.template` do `layout.tsx` trabalhar), encurtado o título do Guia para 56 caracteres e corrigido `location.name` em `pedra-bela.ts` para `'Pedra Bela - SP'`.
3. **Desacoplar e Sincronizar `StructuredData.tsx` (`P1`):**
   - Renderizar `FAQPage`, `Product` e `Event` da Home apenas na Home (evitando duplicidade de `FAQPage` em `/guia-escalada-iniciantes-sp`), corrigir as âncoras `#lugar` e `#batismo`, e alinhar horário (`08:30`–`18:00`) e idade mínima (`12 anos`).
4. **Eliminar Páginas Órfãs com Links Internos (`P1`):**
   - Adicionar links para `/guia-escalada-iniciantes-sp`, `/destinos/pedra-bela` e `/destinos/fazenda-ipanema` no [`Footer.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/Footer.tsx), [`BeginnerSection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/BeginnerSection.tsx) e [`CommunitySection.tsx`](file:///Users/govinda/projetos/XperienceClimb/src/components/sections/CommunitySection.tsx).
5. **Resolver Duplicação de Conteúdo em `/destinos/[slug]` (`P2`):**
   - Definir a canonical de `/destinos/pedra-bela` para `https://climb.xperiencehubs.com` (ou diferenciar seu conteúdo) e garantir que `/destinos/fazenda-ipanema` renderize os dados próprios da FLONA Ipanema no SSR.
6. **Refinar Acessibilidade e Ativos (`P2`):**
   - Definir `alt=""` e `aria-hidden="true"` nas folhas decorativas do Hero, enriquecer os `alt` dos cards de `AboutSection` e corrigir o typo `"100% Equipamento Seguro"`.
