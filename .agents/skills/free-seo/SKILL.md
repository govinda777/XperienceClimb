---
name: free-seo
description: >-
  Otimize o SEO técnico, on-page e semântico do XperienceClimb com custo zero (100% gratuito).
  Use esta skill para auditar e corrigir metadados Next.js, Schema.org JSON-LD, sitemap, robots,
  Core Web Vitals, acessibilidade, links internos e contexto compartilhado no OpenSEO sem gastar créditos.
---

# Free SEO Skill (Otimização com Custo Zero)

Esta skill guia o assistente na identificação, correção e aprimoramento contínuo do SEO da **XperienceClimb** (`climb.xperiencehubs.com`) sem consumir créditos de API ou ferramentas externas pagas. Todas as ações utilizam as capacidades nativas do Next.js (App Router), boas práticas de rastreamento do Google e os recursos gratuitos do OpenSEO.

---

## 1. Princípios de SEO Gratuito para a XperienceClimb

1. **Código é o Ativo Mais Valioso:** Antes de pagar por dados de mercado, garanta que o código HTML, a renderização do Next.js e os metadados estejam 100% otimizados para os indexadores.
2. **Relevância Local e de Nicho:** O público de vivência/batismo de escalada busca por termos específicos em São Paulo e cidades próximas (ex: Pedra Bela, Atibaia, Bragança Paulista, Campinas). Essa contextualização deve estar presente nos textos, URLs e metadados.
3. **Dados Estruturados Ricos (Schema.org):** O Google prioriza e destaca sites que implementam schemas precisos (`LocalBusiness`, `SportsActivityLocation`, `TouristAttraction`, `Event`, `FAQPage`, `Product`).

---

## 2. Checklist Técnico On-Page (Next.js App Router)

Sempre que criar ou refatorar páginas, siga este checklist:

### A. Metadados e Tags de Cabeçalho (`src/app/layout.tsx` ou `page.tsx`)

- [ ] **Title Tag:** Deve conter a palavra-chave principal + diferencial + marca (ex: `Vivência de Escalada em Rocha | Xperience Climb`). Máximo de 60 caracteres.
- [ ] **Meta Description:** Deve ser persuasiva, com call to action claro e palavras-chave secundárias. Tamanho ideal: 140 a 160 caracteres.
- [ ] **Canonical URL:** Sempre definir `alternates.canonical` apontando para a URL canônica com HTTPS (`https://climb.xperiencehubs.com`).
- [ ] **OpenGraph e Twitter Card:** Imagens 1200x630px (`site-og.jpg`), com título, descrição e `type: 'website'` ou `'article'`.
- [ ] **Viewport & Theme Color:** Configurados corretamente para mobile sem bloquear zoom do usuário.

### B. Hierarquia Semântica e Acessibilidade

- [ ] **Apenas 1 tag `<h1>` por página**, contendo a principal intenção de busca (ex: _"Vivência de Escalada em Rocha Natural"_).
- [ ] **Subtítulos `<h2>` e `<h3>` ordenados logicamente** (ex: Sobre a Experiência, Pacotes de Batismo, O que está incluso, Perguntas Frequentes).
- [ ] **Todas as tags `<img>` / `<Image>`** devem possuir atributo `alt` descritivo com contexto da escalada (ex: `alt="Instrutor auxiliando participante no batismo de escalada na Pedra Bela"`).
- [ ] **Textos de links descritivos:** Nunca use apenas _"Clique aqui"_; prefira _"Ver pacotes de batismo"_ ou _"Conheça o ponto de encontro"_.

### C. Rastreabilidade (Sitemap & Robots)

- [ ] **`src/app/sitemap.ts`:** Todas as páginas públicas válidas devem constar no sitemap dinâmico com sua respectiva data de atualização (`lastModified`) e prioridade.
- [ ] **`src/app/robots.ts`:** Permitir livre acesso para motores de busca em páginas públicas e bloquear rotas internas (`/api/`, `/checkout/`, páginas de teste).

### D. Schema Markup JSON-LD (`src/components/seo/StructuredData.tsx`)

- [ ] Manter o grafo Schema.org unificado e válido:
  - `SportsActivityLocation` e `LocalBusiness` com geolocalização e horário de funcionamento.
  - `Event` atualizado com a data da próxima saída confirmada.
  - `Product` e `Offer` com os valores dos pacotes básicos e avançados.
  - `FAQPage` sincronizado com os dados do componente de perguntas frequentes.

---

## 3. Recursos 100% Gratuitos via OpenSEO

Use o OpenSEO sem gastar nenhum crédito:

1. **Contexto Central do Projeto (`get_project_context` / `update_project_context`):**
   - Atualize a descrição, público-alvo, personas e proposta única de valor (UVP) da XperienceClimb diretamente no projeto OpenSEO.
2. **Google Search Console (`get_search_console_performance` / `inspect_urls`):**
   - Se a conta do Google estiver vinculada em `app.openseo.so/settings`, monitore impressões reais, termos que já geram cliques e o status de indexação das URLs de forma ilimitada.
3. **Relatórios HTML (`save_report` / `list_reports`):**
   - Registre relatórios executivos em HTML para documentar os avanços de SEO no painel do OpenSEO.

---

## 4. Fluxo de Trabalho Passo a Passo

1. **Diagnóstico:** Inspecione o código-fonte (`layout.tsx`, `page.tsx`, `StructuredData.tsx`, `sitemap.ts`, `robots.ts`).
2. **Identificação de Gaps:** Anote campos vazios, títulos fracos, falta de tags alt ou schemas desatualizados.
3. **Aplicação das Correções:** Edite os arquivos aplicando Next.js Metadata API e Schema.org com precisão.
4. **Validação:** Verifique a integridade do código e a ausência de erros de build (`pnpm build` ou `npm run lint`).
5. **Registro:** Atualize o contexto do projeto ou documentação com as melhorias implementadas.
