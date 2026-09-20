# ADR 0003: Rotas Estáticas Multi-Destinos e Expansão do Sitemap XML com Mudança Mínima de Código

- **Status:** Proposto / Pronto para Implementação
- **Data:** 20 de Setembro de 2026
- **Decisores:** Time de Produto, Engenharia Frontend e SEO/Growth
- **Contexto do Projeto:** Xperience Climb (`climb.xperiencehubs.com`)
- **Relacionado:** [ADR 0001](./0001-estrategia-seo-layout-metadata.md), [ADR 0002](./0002-auditoria-seo-tecnico-e-conteudo.md)

---

## 1. Contexto & Problema

O projeto **Xperience Climb** opera vivências e batismos de escalada em mais de uma localidade no interior de São Paulo:

1. **Pedra Bela - SP:** Campo escola clássico, Pedra do Santuário, tirolesa e escalada em rocha para iniciantes.
2. **Fazenda Ipanema (FLONA) - Iperó / Sorocaba - SP:** Floresta Nacional de Ipanema, escalada na Mata Atlântica e patrimônio geológico.

### O Gap Atual:

- O ecossistema de temas (`src/themes/configs/`) já possui todas as informações ricas de conteúdo, fotos, rotas e geolocalização modeladas em classes TypeScript (`PedraBellaTheme` e `FazendaIpanemaTheme`).
- No entanto, a alternância de destinos no frontend dependia exclusivamente de query params no cliente (ex: `?theme=fazenda-ipanema`).
- **Impacto em SEO:** Mecanismos de busca (Googlebot) tratam parâmetros de query no cliente com baixa prioridade e não criam páginas de destino canônicas separadas na SERP.
- O arquivo [`src/app/sitemap.ts`](../../src/app/sitemap.ts) lista apenas a home (`/`) e páginas institucionais (`/politica-de-privacidade`, `/termos-de-uso`), perdendo todo o volume de busca de cauda longa com intenção geográfica (ex: _"escalada fazenda ipanema"_, _"batismo de escalada pedra bela"_, _"turismo de aventura iperó sorocaba"_).

---

## 2. Princípio Norteador: Mudança Mínima de Código

> **Diretriz Mandatória:** Implementar a solução com a menor quantidade possível de linhas de código, reaproveitando 100% da biblioteca de seções visuais e classes de temas já existentes, sem duplicar JSX ou criar layouts redundantes.

---

## 3. Opções Avaliadas

| Critério                               | Opção A: Duplicação de Páginas Manuais (`/pedra-bela` e `/fazenda-ipanema`) | Opção B (Escolhida): Rota Dinâmica SSG (`/destinos/[slug]`) com `generateStaticParams` | Opção C: Rewrite/Middleware Dinâmico via Edge         |
| :------------------------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **Linhas de Código**                   | Alta (~250 LOC duplicadas em múltiplos arquivos)                            | **Mínima (~45 LOC em um único arquivo)**                                               | Média (~80 LOC com complexidade de edge routing)      |
| **Reaproveitamento de Componentes**    | Baixo (duplica chamadas das seções)                                         | **Máximo (reutiliza os componentes da Home injetando o tema)**                         | Médio (risco de hidratação e conflitos no App Router) |
| **Escalabilidade para novos destinos** | Baixa (exige nova pasta e arquivo para cada pico)                           | **Automática (basta cadastrar no config de temas)**                                    | Média                                                 |
| **Impacto em SEO e Indexação**         | Bom                                                                         | **Excelente (SSG nativo, HTML estático pré-renderizado no build)**                     | Risco de canonical incorreto                          |

---

## 4. Decisão de Arquitetura

Adotar a **Opção B**: Criar uma rota estática orientada a segmentos no App Router do Next.js:

```text
src/app/destinos/[slug]/page.tsx
```

Esta rota executará com **mudança mínima de código** por meio de 3 etapas simples:

### 4.1. Geração Estática no Build (`generateStaticParams`)

Usa as chaves já declaradas em `src/lib/theme-utils.ts` (`pedra-bela` e `fazenda-ipanema`) para gerar os HTMLs no momento do `next build`:

```typescript
export function generateStaticParams() {
  return [{ slug: 'pedra-bela' }, { slug: 'fazenda-ipanema' }];
}
```

### 4.2. Injeção Dinâmica de Metadados Canônicos (`generateMetadata`)

Cada destino herda automaticamente os dados já descritos na classe do tema:

- **Title:** `Vivência de Escalada em [Nome do Destino] | Xperience Climb`
- **Description:** Conteúdo editorial exclusivo do destino.
- **Canonical:** `https://climb.xperiencehubs.com/destinos/[slug]`
- **OpenGraph:** Imagens do destino específico.

### 4.3. Renderização Reutilizável com Inicialização de Tema

O componente da página consome a mesma composição limpa da home (`Navigation`, `HeroSection`, `AboutSection`, `PackagesSection`, `LocationSection`, etc.), passando o tema ativo correspondente ao `slug`.

### 4.4. Atualização do Sitemap XML ([`src/app/sitemap.ts`](../../src/app/sitemap.ts))

Inclusão direta das rotas canônicas no array com prioridade `0.9` e frequência `weekly`:

```typescript
{
  url: `${baseUrl}/destinos/pedra-bela`,
  lastModified: new Date('2026-09-20T00:00:00-03:00'),
  changeFrequency: 'weekly',
  priority: 0.9,
},
{
  url: `${baseUrl}/destinos/fazenda-ipanema`,
  lastModified: new Date('2026-09-20T00:00:00-03:00'),
  changeFrequency: 'weekly',
  priority: 0.9,
}
```

---

## 5. Racional & Benefícios

1. **Esforço de Código Quase Zero:**
   - Apenas 1 novo arquivo de rota (`src/app/destinos/[slug]/page.tsx`) com ~45 linhas de código.
   - Apenas ~10 linhas adicionadas em [`src/app/sitemap.ts`](../../src/app/sitemap.ts).
   - **Zero modificações** nos componentes visuais (`HeroSection.tsx`, `PackagesSection.tsx`, etc.).
2. **SEO de Cauda Longa Imediato:**
   - O Googlebot passa a indexar duas URLs estáticas ricas dedicadas a termos de busca geográfica regional.
   - Links canônicos preservados sem risco de conteúdo duplicado.
3. **Compatibilidade Total:**
   - Mantém o suporte legado para `?theme=slug` sem quebrar nenhum link compartilhado anteriormente no WhatsApp ou Instagram.

---

## 6. Critérios de Aceite e Validação

- [ ] `npm run type-check` e `npm run lint` executam sem nenhum warning ou erro.
- [ ] `npm run build` compila com sucesso gerando as páginas estáticas:
  - `○ /destinos/pedra-bela`
  - `○ /destinos/fazenda-ipanema`
- [ ] O arquivo `sitemap.xml` servido em produção lista ambas as URLs `/destinos/*`.
- [ ] A ferramenta `inspect_urls` do OpenSEO confirma status `PASS` para as novas rotas.
- [ ] Testes de regressão E2E Playwright passam com 100% de sucesso.
