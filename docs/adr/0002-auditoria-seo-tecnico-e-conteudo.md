# ADR 0002: Plano Prioritário de Melhoria de SEO Técnico e Conteúdo

- **Status:** Em implementação contínua
- **Data:** 19 de Setembro de 2026
- **Decisores:** Time de Produto, Engenharia Frontend e SEO/Growth
- **Contexto do Projeto:** Xperience Climb (`climb.xperiencehubs.com`)
- **Relacionado:** [ADR 0001](./0001-estrategia-seo-layout-metadata.md)

## 1. Contexto

Foi realizada uma auditoria gratuita do SEO atual, considerando metadados do Next.js, estrutura semântica, acessibilidade, sitemap, robots, Schema.org e performance.

A implementação atual já possui uma boa base técnica: metadata global e específica da home, canonical, Open Graph, sitemap, robots, um `<h1>` na página principal, imagens com `alt` e dados estruturados para negócio local, produtos, evento e FAQ.

Os principais riscos encontrados são de manutenção e escalabilidade, não de ausência completa de SEO. A página inicial concentra quase toda a relevância orgânica, enquanto dados temporais do sitemap, evento e ofertas podem ficar desatualizados.

## 2. Decisão

Adotar um plano de melhoria em etapas, priorizando primeiro a precisão dos sinais técnicos e dos dados estruturados, depois a expansão de conteúdo por intenção de busca.

### 2.1 Prioridade alta

1. Substituir `new Date()` em [`src/app/sitemap.ts`](../../src/app/sitemap.ts) por datas reais e estáveis de atualização de cada URL.
2. Adicionar `noindex, nofollow` às rotas privadas de checkout e ao ambiente de teste, especialmente:
   - `/checkout/success`
   - `/checkout/failure`
   - `/checkout/confirmation`
   - `/test-e2e/checkout`
3. Sincronizar o Schema.org em [`src/components/seo/StructuredData.tsx`](../../src/components/seo/StructuredData.tsx) com a disponibilidade real dos pacotes e das próximas saídas.
4. Remover do JSON-LD produtos desativados ou representar corretamente sua indisponibilidade sem promover ofertas que não podem ser compradas.
5. Garantir que eventos passados não continuem sendo publicados como eventos futuros.

### 2.2 Prioridade média

1. Tornar o `<h1>` da home mais explícito para a intenção principal, por exemplo: `Vivência de Escalada em Rocha em Pedra Bela – SP`.
2. Ajustar títulos de seções para combinar clareza editorial e termos de busca, como “Segurança na escalada em rocha” e “Como chegar à escalada em Pedra Bela”.
3. Criar páginas específicas e indexáveis para intenções relevantes:
   - `/escalada-em-pedra-bela`
   - `/batismo-de-escalada`
   - `/escalada-em-rocha-sp`
   - `/turismo-de-aventura-em-pedra-bela`
4. Definir metadata, FAQ, conteúdo original e links de conversão próprios para cada página.

### 2.3 Prioridade baixa

1. Substituir `alt` genéricos por descrições contextuais das imagens.
2. Validar o arquivo Open Graph em 1200×630 px, com boa legibilidade e tamanho otimizado.
3. Medir e melhorar Core Web Vitals, especialmente carregamento de vídeos, imagens abaixo da dobra e scripts de terceiros.
4. Adicionar, quando houver conteúdo correspondente, `Organization`, `WebSite`, `BreadcrumbList`, `Person` e avaliações verificáveis.

## 3. Racional

Essa ordem reduz primeiro os riscos de sinais contraditórios para rastreadores: URLs privadas indexáveis, sitemap informando alterações fictícias, ofertas indisponíveis e eventos expirados.

Depois, a criação de páginas por intenção amplia a cobertura orgânica sem depender de repetir palavras-chave na home. O foco deve permanecer em buscas locais e comerciais, como batismo de escalada, escalada para iniciantes e experiências em Pedra Bela.

## 4. Consequências

### Positivas

- Sinais de rastreamento mais confiáveis.
- Menor risco de exibir informações comerciais expiradas nos resultados de busca.
- Melhor alinhamento entre conteúdo, intenção de busca e conversão.
- Estrutura preparada para novos destinos e experiências.
- Melhor experiência de acessibilidade e compartilhamento social.

### Custos e riscos

- Exige manutenção contínua de datas, disponibilidade e conteúdo comercial.
- Novas páginas precisam ter conteúdo realmente distinto para evitar páginas fracas ou repetitivas.
- Alterações de título e H1 devem ser acompanhadas no Search Console para medir impacto em CTR e posicionamento.

## 5. Critérios de validação

Antes de considerar cada etapa concluída:

- executar `npm run type-check` e `npm run build`;
- confirmar que o sitemap contém apenas URLs públicas e datas reais;
- confirmar `noindex` nas páginas privadas;
- validar JSON-LD sem eventos expirados ou ofertas incorretas;
- verificar um único `<h1>` por página pública;
- testar imagens Open Graph e textos `alt`;
- acompanhar impressões, CTR, cliques e indexação no Google Search Console.

## 6. Plano de execução

- [x] Corrigir sitemap e metadata de páginas privadas.
- [x] Sincronizar evento e produtos no Schema.org.
- [ ] Revisar títulos de seções e `alt` restantes.
- [ ] Criar as primeiras páginas de intenção local/comercial.
- [ ] Auditar Core Web Vitals após as mudanças.
- [ ] Registrar resultados no Search Console e revisar mensalmente.

### Implementado em 19/09/2026

- O sitemap passou a usar `lastModified` estável, em vez de informar uma alteração diária fictícia.
- As rotas de checkout e teste passaram a herdar metadata com `noindex` e `nofollow`.
- O Schema.org passou a publicar somente pacotes habilitados e a omitir eventos cuja data já passou.
- O H1 da home passou a explicitar a intenção “vivência de escalada”.
- `npm run type-check` e `npm run build` foram executados com sucesso.
