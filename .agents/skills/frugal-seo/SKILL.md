---
name: frugal-seo
description: >-
  Audite e resolva issues de SEO da XperienceClimb priorizando métodos gratuitos e de baixo custo.
  Orquestre as credenciais do .env.local (OpenSEO / DataForSEO) com máxima economia de créditos,
  siga um processo metódico de 5 fases e classifique as issues por impacto no tráfego orgânico.
---

# Frugal SEO Skill (Auditoria & Resolução de Baixo Custo)

Esta skill foi desenvolvida para executar auditorias profundas de SEO, diagnosticar problemas técnicos e descobrir oportunidades de palavras-chave para a **XperienceClimb**, operando sob o princípio de **Frugalidade Extrema**: usar ferramentas e dados gratuitos sempre que possível, e utilizar dados pagos (OpenSEO / DataForSEO) de forma cirúrgica e de baixo custo.

---

## 1. Configuração e Credenciais

A skill consome as seguintes variáveis definidas no `.env.local`:

- `OPENSEO_API_KEY`: Chave de autenticação no OpenSEO MCP (`oseo_...`).
- `OPENSEO_PROJECT_ID`: ID do projeto XperienceClimb (`0e5c4f70-39ed-4b1f-a90f-f46de87b4281`).
- `OPENSEO_BASE_URL`: Endpoint oficial `https://app.openseo.so/mcp`.
- `DATAFORSEO_API_KEY` / `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD`: (Opcionais) Credenciais diretas do DataForSEO caso sejam necessárias chamadas customizadas fora do OpenSEO.

---

## 2. Política de Frugalidade e Uso de Créditos

Antes de disparar qualquer requisição para APIs externas:

1. **Gratuito em Primeiro Lugar:**
   - Auditorias de código local, validação de tags HTML, conferência de schemas e sitemaps **são sempre gratuitas**.
   - Consultas de contexto e relatórios no OpenSEO **não consomem créditos**.
   - Métricas do Google Search Console **usam cota própria do Google (zero créditos)**.
2. **Evitar Consultas Repetidas:**
   - Sempre consulte primeiro as palavras salvas (`list_saved_keywords`) antes de rodar `research_keywords` ou `get_keyword_metrics`.
   - Se os dados de um domínio ou termo já foram coletados recentemente, use o histórico armazenado em vez de recomprar os dados.
3. **Batching e Precisão:**
   - Nunca pesquise termos genéricos de alto volume que não convertem (ex: _"o que é esporte"_).
   - Agrupe termos de alta intenção comercial em um único lote (ex: `['batismo escalada pedra bela', 'escalada em rocha sp', 'curso iniciante escalada']`).
4. **Verificação de Saldo:**
   - Sempre confira os créditos restantes antes de planejar consultas em lote. Se uma operação exigir mais de 100 créditos, solicite confirmação prévia do usuário.

---

## 3. O Processo Metódico em 5 Fases

Sempre execute a auditoria seguindo rigorosamente esta sequência:

### Fase 1: Diagnóstico Local Zero-Cost (Código-Fonte)

Inspecione os arquivos do projeto para identificar falhas técnicas imediatas:

- **`src/app/layout.tsx`:** Título padrão, template, meta descrição, OpenGraph e Twitter tags.
- **`src/app/sitemap.ts` e `robots.ts`:** Rotas indexáveis, bloqueios indevidos e URLs canônicas.
- **`src/components/seo/StructuredData.tsx`:** Validade dos dados estruturados e datas de eventos.
- **Imagens e Assets:** Verifique a presença de atributos `alt`, `loading="lazy"` e formatos modernos (WebP/AVIF).

### Fase 2: Diagnóstico no Search Console & OpenSEO (Sem Créditos)

- Execute a leitura de contexto do projeto (`get_project_context`).
- Se integrado ao GSC, avalie:
  - Quais páginas estão recebendo impressões, mas têm CTR baixo (necessitam de melhoria no Title/Description).
  - Se existem erros de rastreamento ou URLs não indexadas.

### Fase 3: Pesquisa Frugal de Mercado (Sob Demanda)

Se houver necessidade de validar volumes de busca ou analisar concorrentes locais:

1. Verifique o saldo disponível de créditos.
2. Defina até 5 termos cirúrgicos focados em conversão de batismo de escalada.
3. Obtenha as métricas essenciais e salve os termos aprovados no projeto (`save_keywords`).

### Fase 4: Matriz de Classificação de Issues de SEO

Compile todas as falhas encontradas e organize-as pela matriz de severidade:

| Nível               | Tipo         | Impacto                  | Exemplos                                                                                                           |
| :------------------ | :----------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **P0 - Bloqueador** | Crítico      | Impede indexação         | `robots.txt` bloqueando rotas vitais, tag `noindex` acidental, erros 404/500 em páginas do sitemap.                |
| **P1 - Alto**       | Imediato     | Prejudica rankeamento    | Título ausente ou duplicado, H1 ausente, descrição genérica, Schema.org quebrado, LCP > 4s.                        |
| **P2 - Médio**      | Oportunidade | Melhora CTR e relevância | Falta de palavras de cauda longa nos H2, imagens sem alt, ausência de FAQs estruturadas, links internos quebrados. |
| **P3 - Melhoria**   | Contínuo     | Expansão de autoridade   | Novos artigos para blog, refinamento de textos persuasivos, expansão de páginas para cidades vizinhas.             |

### Fase 5: Execução das Correções & Registro

1. Corrija diretamente as issues **P0** e **P1** nos arquivos do projeto.
2. Valide o build (`pnpm build` ou `npm run lint`).
3. Gere um relatório executivo em HTML e salve-o no OpenSEO (`save_report`) para histórico e acompanhamento.
