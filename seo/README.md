# 📊 Módulo de Relatórios de Performance SEO (OpenSEO)

Este diretório contém o pipeline autônomo para geração de **Relatórios Executivos de Performance SEO e Inteligência de Mercado** em formato PDF para a **Xperience Climb**.

O relatório segue padrão editorial de alta qualidade (estilo _outdoor technical_ inspirado em Arc'teryx e Black Diamond), com gráficos vetoriais de alta resolução, tabelas zebradas, badges semânticos de status, glossário técnico e certificação digital — tudo em **Português Brasileiro (PT-BR)** e dimensionado com precisão para exatamente **4 páginas A4** sem quebras órfãs.

---

## 📁 Estrutura de Arquivos

```text
seo/
├── README.md                  # Este guia operacional e documentação
├── generate_seo_report.py     # Script Python compilador do PDF (ReportLab + Matplotlib)
├── seo_report_data.json       # Base de dados estruturada das métricas de SEO
└── seo_performance_report.pdf # Relatório executivo compilado pronto para apresentação
```

---

## 🛠️ Pré-requisitos & Instalação

O gerador roda em qualquer ambiente com **Python 3.9+**.

Instale as dependências necessárias via `pip`:

```bash
pip install reportlab matplotlib
```

_(Opcional) Para inspeção automatizada da quantidade de páginas e texto do PDF:_

```bash
pip install pymupdf
```

---

## 🚀 Como Gerar o Relatório

### 1. Execução Padrão (da raiz do projeto)

```bash
python3 seo/generate_seo_report.py
```

### 2. Execução dentro da pasta `seo/`

```bash
cd seo
python3 generate_seo_report.py
```

### 3. Execução com parâmetros customizados (CLI)

Você pode apontar para outro arquivo de entrada JSON ou alterar o nome/local do PDF gerado:

```bash
python3 seo/generate_seo_report.py \
  --input seo/seo_report_data.json \
  --output seo/seo_performance_report.pdf
```

| Argumento  | Alias | Descrição                                      | Padrão                           |
| :--------- | :---- | :--------------------------------------------- | :------------------------------- |
| `--input`  | `-i`  | Caminho do arquivo JSON com as métricas de SEO | `seo/seo_report_data.json`       |
| `--output` | `-o`  | Caminho de destino do PDF compilado            | `seo/seo_performance_report.pdf` |

O processo de compilação leva aproximadamente **2 a 3 segundos** e imprime logs detalhados do progresso no terminal.

---

## 📝 Como Atualizar os Dados do Relatório

O arquivo [`seo_report_data.json`](file:///Users/govinda/projetos/XperienceClimb/seo/seo_report_data.json) centraliza todo o conteúdo do relatório. Para atualizar o documento com novas métricas ou dados de um novo mês/ciclo, basta editar os blocos correspondentes no JSON:

| Bloco JSON              | Descrição                                                                                           | Exibição no Relatório                                   |
| :---------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| `metadata`              | Domínio, período analisado, data de emissão e resumo executivo em parágrafo.                        | Capa e cabeçalho executivo (Pág. 1)                     |
| `kpis`                  | 4 cartões de KPIs principais: Cliques, Impressões, CTR Médio e Saúde Técnica (com deltas e status). | Topo da Pág. 1                                          |
| `traffic_trend`         | Histórico mensal com `clicks` e `impressions`.                                                      | Gráfico dual-axis de evolução do tráfego (Pág. 1)       |
| `top_queries`           | Lista das consultas do Google Search Console com cliques, impressões, CTR e posição média.          | Tabela de performance de consultas (Pág. 2)             |
| `rank_tracking`         | Palavras-chave monitoradas, posições anteriores, atuais, URLs de destino e dificuldade (KD%).       | Tabela de monitoramento de ranking (Pág. 2)             |
| `competitor_analysis`   | Comparativo de visibilidade orgânica contra concorrentes diretos (_Share of Voice_).                | Gráfico de barras horizontais comparativo (Pág. 3)      |
| `keyword_opportunities` | Brechas de palavras-chave (_Keyword Gap_) com volume de busca, concorrente líder e rota sugerida.   | Tabela de oportunidades de expansão (Pág. 3)            |
| `backlinks`             | Visão geral de links externos, domínios de referência únicos e autoridade de domínio.               | Resumo de perfil de autoridade (Pág. 3)                 |
| `technical_health`      | Resumo de erros críticos corrigidos, avisos monitorados e recomendações técnicas de SEO.            | Diagnóstico de integridade técnica (Pág. 4)             |
| `ai_visibility`         | Métricas de visibilidade em motores de busca com IA (GEO/AEO - ChatGPT, Perplexity, Gemini).        | Cartões de presença em inteligência generativa (Pág. 4) |
| `action_plan`           | Plano de ação tático dividido em 3 prioridades (P1 Imediata, P2 Médio Prazo, P3 Expansão).          | Tabela de próximos passos estratégicos (Pág. 4)         |
| `api_costs`             | Transparência de consumo e custos das APIs do OpenSEO / DataForSEO.                                 | Rodapé técnico de governança (Pág. 4)                   |

---

## 🔄 Fluxo de Integração com o Google Search Console (GSC)

1. **Aguardar a Janela de Indexação do Google:**
   - Após a verificação do Search Console no domínio `climb.xperiencehubs.com`, o Google leva entre **24 e 48 horas** para consolidar os dados de impressões, cliques e consultas.
2. **Atualização dos Dados:**
   - Assim que o painel do Search Console começar a registrar os números reais, atualize o bloco `top_queries`, `traffic_trend` e `kpis` no arquivo `seo_report_data.json`.
3. **Recompilação Instantânea:**
   - Execute `python3 seo/generate_seo_report.py` para gerar o PDF atualizado para o cliente.
   - **Custo Zero:** A compilação local não consome créditos de API.

---

## 🎨 Especificações Técnicas do PDF

- **Motor de Renderização:** ReportLab Platypus Flowables (`SimpleDocTemplate`).
- **Gráficos:** Matplotlib com backend `Agg` (renderização _headless_ e injeção vetorial/raster de 200 DPI em memória).
- **Numeração de Páginas:** Canvas dinâmico de 2 etapas (`NumberedCanvas`) que gera `"Página X de 4"`.
- **Cores Principais:**
  - Primária / Ardósia Escura: `#1e293b`
  - Destaque / Azul Elétrico: `#2563eb`
  - Sucesso / Esmeralda: `#16a34a`
  - Alerta / Âmbar Magma: `#d97706`
  - Fundo Zebrado / Cartões: `#f8fafc` / `#f1f5f9`
- **Conformidade:** Padrão A4 vertical (`210mm x 297mm`), tipografia Helvetica com entrelinhas balanceadas.
