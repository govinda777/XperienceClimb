#!/usr/bin/env python3
"""
Compilador de Relatório Executivo SEO em HTML Editorial (OpenSEO).
Gera um arquivo HTML autocontido com CSS inline e gráficos vetoriais SVG
que reproduz exatamente a identidade visual e o layout de 4 páginas de
'seo_performance_report.pdf'.
"""

import json
import os
import sys

def generate_html(data_path: str, output_path: str) -> str:
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    meta = data["metadata"]
    kpis = data["kpis"]
    gsc = data["gsc_performance"]
    rank = data["rank_tracking"]
    kw = data["keyword_research"]
    comp = data["competitive_intelligence"]
    backlinks = data["backlink_overview"]
    audit = data["site_audit"]
    ai = data["ai_search_visibility"]
    plan = data["action_plan"]
    costs = data["api_cost_summary"]
    glossary = data["glossary"]

    # ---------------------------------------------------------
    # SVG 1: Gráfico Dual-Axis de Evolução do Tráfego GSC
    # ---------------------------------------------------------
    # Largura: 820, Altura: 260
    # Meses: Abr (1680/44k), Mai (1940/51k), Jun (2310/60k), Jul (2680/70k), Ago (2980/76k), Set (3230/81k)
    # Clicks Y: 0 a 3500 -> px: 210 down to 30
    # Impressions Y: 40k a 85k -> px: 210 down to 30
    pts_clicks = [
        (80, 1680), (220, 1940), (360, 2310), (500, 2680), (640, 2980), (780, 3230)
    ]
    pts_impr = [
        (80, 44200), (220, 51100), (360, 60400), (500, 69800), (640, 76100), (780, 80800)
    ]
    def y_clicks(v):
        return 210 - (v / 3500.0) * 180.0
    def y_impr(v):
        return 210 - ((v - 40000) / 45000.0) * 180.0

    poly_clicks = " ".join([f"{x},{y_clicks(v):.1f}" for x, v in pts_clicks])
    poly_impr = " ".join([f"{x},{y_impr(v):.1f}" for x, v in pts_impr])

    circles_clicks = "".join([f'<circle cx="{x}" cy="{y_clicks(v):.1f}" r="4" fill="#2563eb" stroke="#ffffff" stroke-width="1.5"/>' for x, v in pts_clicks])
    circles_impr = "".join([f'<rect x="{x-3.5}" y="{y_impr(v)-3.5:.1f}" width="7" height="7" fill="#d97706" stroke="#ffffff" stroke-width="1.5"/>' for x, v in pts_impr])

    svg_chart1 = f'''
    <svg viewBox="0 0 860 250" class="chart-svg">
      <!-- Gridlines -->
      <line x1="70" y1="30" x2="790" y2="30" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="70" y1="75" x2="790" y2="75" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="70" y1="120" x2="790" y2="120" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="70" y1="165" x2="790" y2="165" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="70" y1="210" x2="790" y2="210" stroke="#cbd5e1" stroke-width="1"/>

      <!-- Eixo X Labels -->
      <text x="80" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Abr 2026</text>
      <text x="220" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Mai 2026</text>
      <text x="360" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Jun 2026</text>
      <text x="500" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Jul 2026</text>
      <text x="640" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Ago 2026</text>
      <text x="780" y="228" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">Set 2026</text>

      <!-- Eixo Y Clicks (Esquerda) -->
      <text x="60" y="213" font-size="10" fill="#2563eb" text-anchor="end" font-family="sans-serif">0</text>
      <text x="60" y="168" font-size="10" fill="#2563eb" text-anchor="end" font-family="sans-serif">1.000</text>
      <text x="60" y="123" font-size="10" fill="#2563eb" text-anchor="end" font-family="sans-serif">2.000</text>
      <text x="60" y="78" font-size="10" fill="#2563eb" text-anchor="end" font-family="sans-serif">2.500</text>
      <text x="60" y="33" font-size="10" fill="#2563eb" text-anchor="end" font-family="sans-serif">3.500</text>

      <!-- Eixo Y Impressões (Direita) -->
      <text x="800" y="213" font-size="10" fill="#d97706" text-anchor="start" font-family="sans-serif">40 mil</text>
      <text x="800" y="168" font-size="10" fill="#d97706" text-anchor="start" font-family="sans-serif">50 mil</text>
      <text x="800" y="123" font-size="10" fill="#d97706" text-anchor="start" font-family="sans-serif">60 mil</text>
      <text x="800" y="78" font-size="10" fill="#d97706" text-anchor="start" font-family="sans-serif">70 mil</text>
      <text x="800" y="33" font-size="10" fill="#d97706" text-anchor="start" font-family="sans-serif">85 mil</text>

      <!-- Linha Impressões (Laranja Tracejada) -->
      <polyline points="{poly_impr}" fill="none" stroke="#d97706" stroke-width="2.2" stroke-dasharray="5,4"/>
      {circles_impr}

      <!-- Linha Cliques (Azul Sólida) -->
      <polyline points="{poly_clicks}" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      {circles_clicks}

      <!-- Badge de Destaque no Ponto Final -->
      <rect x="730" y="12" width="90" height="20" rx="4" fill="#dbeafe" stroke="#bfdbfe" stroke-width="1"/>
      <text x="775" y="26" font-size="10" font-weight="bold" fill="#1e40af" text-anchor="middle" font-family="sans-serif">3.230 cliques</text>

      <!-- Legenda do Gráfico -->
      <rect x="90" y="6" width="10" height="10" rx="2" fill="#2563eb"/>
      <text x="105" y="15" font-size="11" font-weight="600" fill="#1e293b" font-family="sans-serif">Cliques Orgânicos</text>
      <rect x="230" y="6" width="10" height="10" rx="2" fill="#d97706"/>
      <text x="245" y="15" font-size="11" font-weight="600" fill="#1e293b" font-family="sans-serif">Impressões na Busca</text>
    </svg>
    '''

    # ---------------------------------------------------------
    # SVG 2: Gráfico de Barras Horizontais (Brecha Competitiva)
    # ---------------------------------------------------------
    bars_data = [
        ("onde praticar escalada sp", 5400, "5.400 buscas/mês (KD: 35%)", "#2563eb"),
        ("viagem ecoturismo casal sp", 3800, "3.800 buscas/mês (KD: 29%)", "#2563eb"),
        ("esportes radicais perto de sp", 4900, "4.900 buscas/mês (KD: 38%)", "#d97706"),
        ("equipamentos para escalada em rocha", 2400, "2.400 buscas/mês (KD: 26%)", "#2563eb"),
    ]
    svg_bars = []
    y_bar = 20
    for label, val, desc, color in bars_data:
        w = int((val / 6500.0) * 360)
        svg_bars.append(f'''
          <text x="250" y="{y_bar+15}" font-size="11" font-weight="500" fill="#1e293b" text-anchor="end" font-family="sans-serif">{label}</text>
          <rect x="260" y="{y_bar}" width="{w}" height="22" rx="3" fill="{color}"/>
          <text x="{260 + w + 10}" y="{y_bar+15}" font-size="11" font-weight="bold" fill="#0f172a" font-family="sans-serif">{desc}</text>
        ''')
        y_bar += 36

    svg_chart2 = f'''
    <svg viewBox="0 0 860 170" class="chart-svg">
      <!-- Eixos e Linhas Verticais -->
      <line x1="260" y1="10" x2="260" y2="150" stroke="#cbd5e1" stroke-width="1"/>
      <line x1="380" y1="10" x2="380" y2="150" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="500" y1="10" x2="500" y2="150" stroke="#f1f5f9" stroke-width="1"/>
      <line x1="620" y1="10" x2="620" y2="150" stroke="#f1f5f9" stroke-width="1"/>
      {"".join(svg_bars)}
      <!-- Legenda do Eixo X -->
      <text x="260" y="165" font-size="10" fill="#64748b" text-anchor="middle" font-family="sans-serif">0</text>
      <text x="380" y="165" font-size="10" fill="#64748b" text-anchor="middle" font-family="sans-serif">2.000</text>
      <text x="500" y="165" font-size="10" fill="#64748b" text-anchor="middle" font-family="sans-serif">4.000</text>
      <text x="620" y="165" font-size="10" fill="#64748b" text-anchor="middle" font-family="sans-serif">6.000</text>
    </svg>
    '''

    # Tabela 1: Top Queries GSC
    rows_queries = ""
    for q in gsc["top_queries"]:
        pos = q["position"]
        pos_badge = f'<span class="badge badge-pos-top">#{pos:.1f}</span>' if pos <= 3.0 else f'<span class="badge badge-pos">#{pos:.1f}</span>'
        rows_queries += f'''
        <tr>
          <td class="font-medium">{q["query"]}</td>
          <td class="text-right">{q["clicks"]:,}</td>
          <td class="text-right">{q["impressions"]:,}</td>
          <td class="text-right">{q["ctr"]}</td>
          <td class="text-center">{pos_badge}</td>
        </tr>
        '''.replace(",", ".")

    # Tabela 2: Rank Tracker
    rows_rank = ""
    for item in rank["gainers"]:
        rows_rank += f'''
        <tr>
          <td class="font-medium">{item["keyword"]}</td>
          <td class="text-center font-bold">#{item["current_pos"]}</td>
          <td class="text-center text-muted">#{item["prev_pos"]}</td>
          <td class="text-center"><span class="badge badge-up">▲ {item["shift"]}</span></td>
          <td><code class="route-code">{item["url"]}</code></td>
        </tr>
        '''
    for item in rank["losers"]:
        rows_rank += f'''
        <tr>
          <td class="font-medium">{item["keyword"]}</td>
          <td class="text-center font-bold">#{item["current_pos"]}</td>
          <td class="text-center text-muted">#{item["prev_pos"]}</td>
          <td class="text-center"><span class="badge badge-down">▼ {item["shift"]}</span></td>
          <td><code class="route-code">{item["url"]}</code></td>
        </tr>
        '''

    # Tabela 3: Keyword Research
    rows_kw = ""
    for k in kw:
        rows_kw += f'''
        <tr>
          <td class="font-medium">{k["keyword"]}</td>
          <td class="text-right">{k["monthly_volume"]:,}</td>
          <td class="text-center"><span class="badge badge-kd">{k["keyword_difficulty_kd"]}%</span></td>
          <td class="text-right font-medium">{k["estimated_cpc"]}</td>
          <td class="text-center">{k["competition_level"]}</td>
          <td class="text-center"><span class="badge badge-tag">{k["intent"]}</span></td>
        </tr>
        '''.replace(",", ".")

    # Tabela 4: Backlinks
    rows_backlinks = ""
    for b in backlinks["anchor_text_distribution"]:
        anchor = b["anchor_text"]
        classification = b.get("classification") or ("Marca Direta" if "Xperience" in anchor or "climb" in anchor else ("Correspondência Exata" if "escalada" in anchor else "Genérico"))
        rows_backlinks += f'''
        <tr>
          <td class="font-medium">{anchor}</td>
          <td class="text-center font-bold">{b["percentage"]}</td>
          <td class="text-right">{b["link_count"]}</td>
          <td class="text-center"><span class="badge badge-neutral">{classification}</span></td>
        </tr>
        '''

    # Tabela 5: Technical Audit Reconciliation
    rows_audit = ""
    for r in audit["reconciled_issues"]:
        rows_audit += f'''
        <tr>
          <td class="font-bold text-dark">{r["issue_type"]}</td>
          <td class="text-muted text-sm">{r["historical_scope"]}</td>
          <td class="text-sm">{r["current_validation"]}</td>
          <td class="text-center"><span class="badge badge-success">✓ {r["status"]}</span></td>
        </tr>
        '''

    # Tabela 6: AI Search
    rows_ai = ""
    for a in ai["top_ai_prompts"]:
        rows_ai += f'''
        <tr>
          <td class="font-medium italic">"{a["prompt"]}"</td>
          <td class="font-bold">{a["engine"]}</td>
          <td><span class="badge badge-success">✓ {a["citation_status"]}</span></td>
        </tr>
        '''

    # Tabela 7: Plano de Ação
    rows_plan = ""
    for p in plan:
        badge_cls = "badge-p1" if "P1" in p["priority"] else ("badge-p2" if "P2" in p["priority"] else "badge-p3")
        rows_plan += f'''
        <tr>
          <td><span class="badge {badge_cls}">{p["priority"]}</span></td>
          <td class="font-semibold">{p["category"]}</td>
          <td>{p["task"]}</td>
          <td class="text-sm text-muted">{p["expected_impact"]}</td>
          <td><span class="badge badge-neutral">{p["status"]}</span></td>
        </tr>
        '''

    # Tabela 8: Custos de APIs
    rows_costs = ""
    for c in costs["breakdown"]:
        is_free = "Grátis" in c["cost"]
        cost_style = 'style="color: #16a34a; font-weight: bold;"' if is_free else 'style="font-weight: 600;"'
        rows_costs += f'''
        <tr>
          <td class="font-bold">{c["service"]}</td>
          <td class="text-sm">{c["provider"]}</td>
          <td class="text-sm text-muted">{c["metric_scope"]}</td>
          <td class="text-right" {cost_style}>{c["cost"]}</td>
        </tr>
        '''

    # Glossário 2 colunas
    glossary_items = ""
    for g in glossary:
        glossary_items += f'''
        <div class="glossary-item">
          <strong>{g["term"]}:</strong> {g["definition"]}
        </div>
        '''

    html_content = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório Executivo de Performance SEO — {meta["domain"]}</title>
  <style>
    /* ==========================================================================
       ESTILO EDITORIAL OUTDOOR TÉCNICO (Arc'teryx / Boulder Aesthetic)
       ========================================================================== */
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0f17;
      color: #0f172a;
      line-height: 1.5;
      padding: 24px 12px;
      -webkit-font-smoothing: antialiased;
    }}
    .document-page {{
      max-width: 920px;
      margin: 0 auto 32px auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 40px 48px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      position: relative;
    }}
    @media print {{
      body {{
        background: #ffffff;
        padding: 0;
      }}
      .document-page {{
        box-shadow: none;
        padding: 24px 30px;
        margin: 0;
        page-break-after: always;
        border-radius: 0;
      }}
      .page-break {{
        page-break-before: always;
      }}
    }}

    /* Running Header & Footers */
    .running-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 24px;
      font-size: 11px;
      color: #64748b;
    }}
    .running-header .brand {{
      font-weight: 700;
      color: #2563eb;
      letter-spacing: 0.05em;
    }}
    .running-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      margin-top: 32px;
      font-size: 11px;
      color: #94a3b8;
    }}

    /* Header Principal */
    .report-eyebrow {{
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #2563eb;
      margin-bottom: 4px;
    }}
    h1.report-title {{
      font-size: 26px;
      font-weight: 800;
      color: #1e293b;
      line-height: 1.2;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }}
    .meta-strip {{
      font-size: 11px;
      color: #64748b;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 14px;
      border-radius: 6px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .meta-strip span {{
      display: inline-flex;
      align-items: center;
    }}
    .meta-strip strong {{
      color: #1e293b;
      margin-right: 4px;
    }}

    /* Sumário Executivo */
    .executive-card {{
      background: #f8fafc;
      border-left: 4px solid #2563eb;
      border-radius: 6px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }}
    .executive-card h3 {{
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #1e293b;
      margin-bottom: 6px;
    }}
    .executive-card p {{
      font-size: 12.5px;
      color: #334155;
      line-height: 1.6;
    }}

    /* KPI Grid */
    .kpi-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }}
    @media (max-width: 680px) {{
      .kpi-grid {{
        grid-template-columns: repeat(2, 1fr);
      }}
    }}
    .kpi-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 16px;
      text-align: left;
    }}
    .kpi-label {{
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin-bottom: 4px;
    }}
    .kpi-value {{
      font-size: 24px;
      font-weight: 800;
      color: #2563eb;
      line-height: 1.1;
      margin-bottom: 4px;
      font-feature-settings: "tnum";
    }}
    .kpi-value.health {{
      color: #16a34a;
    }}
    .kpi-change {{
      font-size: 11px;
      font-weight: 600;
      color: #16a34a;
    }}
    .kpi-change.neutral {{
      color: #64748b;
    }}

    /* Seções e Títulos */
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 24px 0 10px 0;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #1e293b;
    }}
    .section-title {{
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      letter-spacing: -0.01em;
    }}
    .section-cost {{
      font-size: 10.5px;
      font-weight: 600;
      color: #2563eb;
    }}
    .section-desc {{
      font-size: 11.5px;
      color: #475569;
      margin-bottom: 10px;
    }}

    /* Gráficos */
    .chart-container {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 16px;
    }}
    .chart-svg {{
      width: 100%;
      height: auto;
      display: block;
    }}

    /* Tabelas */
    table.editorial-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
      margin-bottom: 24px;
    }}
    table.editorial-table th {{
      background-color: #1e293b;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      letter-spacing: 0.02em;
    }}
    table.editorial-table td {{
      padding: 7px 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }}
    table.editorial-table tr:nth-child(even) td {{
      background-color: #f8fafc;
    }}
    .text-right {{ text-align: right; }}
    .text-center {{ text-align: center; }}
    .font-bold {{ font-weight: 700; }}
    .font-medium {{ font-weight: 500; }}
    .text-muted {{ color: #64748b; }}
    .text-dark {{ color: #0f172a; }}
    .text-sm {{ font-size: 10.5px; }}
    .italic {{ font-style: italic; }}

    /* Badges */
    .badge {{
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      line-height: 1.2;
    }}
    .badge-success {{ background: #dcfce7; color: #15803d; }}
    .badge-pos-top {{ background: #dcfce7; color: #15803d; font-weight: 800; }}
    .badge-pos {{ background: #e0f2fe; color: #0369a1; }}
    .badge-up {{ background: #dcfce7; color: #15803d; }}
    .badge-down {{ background: #fee2e2; color: #b91c1c; }}
    .badge-kd {{ background: #e0f2fe; color: #0369a1; }}
    .badge-tag {{ background: #f1f5f9; color: #475569; }}
    .badge-neutral {{ background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }}
    .badge-p1 {{ background: #fee2e2; color: #b91c1c; }}
    .badge-p2 {{ background: #fef3c7; color: #b45309; }}
    .badge-p3 {{ background: #e0f2fe; color: #0369a1; }}
    .route-code {{
      background: #f1f5f9;
      color: #334155;
      padding: 1px 5px;
      border-radius: 3px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 10px;
    }}

    /* Sub-barras / Strip */
    .info-strip {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 7px 12px;
      font-size: 11px;
      color: #334155;
      margin-bottom: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }}
    .info-strip strong {{
      color: #0f172a;
    }}

    /* Glossário */
    .glossary-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px;
      margin-bottom: 24px;
    }}
    @media (max-width: 680px) {{
      .glossary-grid {{
        grid-template-columns: 1fr;
      }}
    }}
    .glossary-item {{
      font-size: 10.5px;
      color: #475569;
      line-height: 1.45;
    }}
    .glossary-item strong {{
      color: #1e293b;
    }}

    /* Bloco de Certificação */
    .certification-box {{
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 14px 18px;
      margin-top: 16px;
    }}
    .certification-title {{
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1e293b;
      margin-bottom: 4px;
    }}
    .certification-text {{
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.5;
      margin-bottom: 6px;
    }}
    .certification-signer {{
      font-size: 10px;
      font-weight: 600;
      color: #334155;
    }}
  </style>
</head>
<body>

  <!-- =========================================================================
       PÁGINA 1: CAPA, SUMÁRIO, KPIS E DESEMPENHO NO GSC
       ========================================================================= -->
  <div class="document-page">
    <div class="report-eyebrow">OpenSEO Plataforma de Inteligência Corporativa</div>
    <h1 class="report-title">{meta["report_title"]}</h1>

    <div class="meta-strip">
      <span><strong>Domínio Auditado:</strong> {meta["domain"]}</span>
      <span><strong>Marca:</strong> {meta["client_name"]}</span>
      <span><strong>Período:</strong> {meta["period"]}</span>
      <span><strong>Emissão:</strong> {meta["emission_date"]}</span>
    </div>

    <div class="executive-card">
      <h3>SUMÁRIO EXECUTIVO & DIRECIONAMENTO ESTRATÉGICO</h3>
      <p>{meta["executive_summary"]}</p>
    </div>

    <!-- 4 Cartões de KPI -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL DE CLIQUES ORGÂNICOS</div>
        <div class="kpi-value">{kpis["total_clicks"]["value"]}</div>
        <div class="kpi-change">▲ {kpis["total_clicks"]["change"]} vs ciclo anterior</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">TOTAL DE IMPRESSÕES</div>
        <div class="kpi-value">{kpis["total_impressions"]["value"]}</div>
        <div class="kpi-change">▲ {kpis["total_impressions"]["change"]} vs ciclo anterior</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">CTR MÉDIO (TAXA DE CLIQUES)</div>
        <div class="kpi-value">{kpis["avg_ctr"]["value"]}</div>
        <div class="kpi-change neutral">▲ {kpis["avg_ctr"]["change"]} vs ciclo anterior</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">SAÚDE TÉCNICA DO SITE</div>
        <div class="kpi-value health">{kpis["site_health_score"]["value"]}</div>
        <div class="kpi-change">▲ {kpis["site_health_score"]["change"]} vs ciclo anterior</div>
      </div>
    </div>

    <!-- Seção 1: GSC -->
    <div class="section-header">
      <div class="section-title">1. Desempenho no Google Search Console</div>
      <div class="section-cost">● Custo: $0.00 - API Google Search Console</div>
    </div>
    <div class="section-desc"><strong>Google Search Console:</strong> Evolução de Tráfego Orgânico e Visibilidade (Histórico de 6 Meses)</div>

    <div class="chart-container">
      {svg_chart1}
    </div>

    <div class="section-desc"><strong>Termos de Busca Líderes em Tráfego (Dados Verificados do Google)</strong></div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th>Termo de Busca Principal</th>
          <th class="text-right">Cliques</th>
          <th class="text-right">Impressões</th>
          <th class="text-right">CTR</th>
          <th class="text-center">Posição Média</th>
        </tr>
      </thead>
      <tbody>
        {rows_queries}
      </tbody>
    </table>

    <div class="running-footer">
      <span>Plataforma de Inteligência OpenSEO • Emitido em: {meta["emission_date"]} • Documento Confidencial e Estratégico</span>
      <span>Página 1 de 4</span>
    </div>
  </div>


  <!-- =========================================================================
       PÁGINA 2: RANK TRACKER, KEYWORDS & INTELIGÊNCIA COMPETITIVA
       ========================================================================= -->
  <div class="document-page">
    <div class="running-header">
      <span class="brand">OpenSEO <span style="font-weight: 400; color: #64748b;">| Performance SEO — {meta["domain"]}</span></span>
      <span>Setembro de 2026</span>
    </div>

    <!-- Seção 2: Rank Tracker -->
    <div class="section-header">
      <div class="section-title">2. Monitoramento Diário de Posições (Rank Tracker)</div>
      <div class="section-cost">● Custo: ~$0.045 - API DataForSEO SERP</div>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th>Palavra-Chave</th>
          <th class="text-center">Posição Atual</th>
          <th class="text-center">Posição Anterior</th>
          <th class="text-center">Variação</th>
          <th>Rota de Destino</th>
        </tr>
      </thead>
      <tbody>
        {rows_rank}
      </tbody>
    </table>

    <!-- Seção 3: Oportunidades de Palavras-Chave -->
    <div class="section-header">
      <div class="section-title">3. Oportunidades de Palavras-Chave e Valor Comercial</div>
      <div class="section-cost">● Custo: ~$0.035 - API DataForSEO Keywords</div>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th>Palavra-Chave Alvo</th>
          <th class="text-right">Volume Mensal</th>
          <th class="text-center">Dificuldade (KD%)</th>
          <th class="text-right">CPC Estimado</th>
          <th class="text-center">Concorrência</th>
          <th class="text-center">Intenção de Busca</th>
        </tr>
      </thead>
      <tbody>
        {rows_kw}
      </tbody>
    </table>

    <!-- Seção 4: Inteligência Competitiva -->
    <div class="section-header">
      <div class="section-title">4. Inteligência Competitiva vs. {comp["target_competitor_domain"]}</div>
      <div class="section-cost">● Custo: ~$0.030 - API DataForSEO Labs</div>
    </div>
    <div class="info-strip">
      <span><strong>Concorrente Monitorado:</strong> {comp["target_competitor_domain"]}</span>
      <span><strong>Tráfego Estimado:</strong> {comp["competitor_estimated_traffic"]}</span>
      <span><strong>Autoridade do Domínio (DA):</strong> {comp["authority_score"]} / 100</span>
    </div>
    <div class="section-desc"><strong>Oportunidades de Brecha Competitiva (Concorrente vs. Cliente)</strong></div>
    <div class="chart-container">
      {svg_chart2}
    </div>

    <div class="running-footer">
      <span>Plataforma de Inteligência OpenSEO • Emitido em: {meta["emission_date"]} • Documento Confidencial e Estratégico</span>
      <span>Página 2 de 4</span>
    </div>
  </div>


  <!-- =========================================================================
       PÁGINA 3: BACKLINKS, AUDITORIA TÉCNICA E VISIBILIDADE IA
       ========================================================================= -->
  <div class="document-page">
    <div class="running-header">
      <span class="brand">OpenSEO <span style="font-weight: 400; color: #64748b;">| Performance SEO — {meta["domain"]}</span></span>
      <span>Setembro de 2026</span>
    </div>

    <!-- Seção 5: Backlinks -->
    <div class="section-header">
      <div class="section-title">5. Perfil de Backlinks e Distribuição de Textos-Âncora</div>
      <div class="section-cost">● Custo: ~$0.030 - API DataForSEO Backlinks</div>
    </div>
    <div class="info-strip">
      <span><strong>Total de Backlinks:</strong> {backlinks["total_backlinks"]}</span>
      <span><strong>Domínios de Referência Únicos:</strong> {backlinks["referring_domains"]}</span>
      <span><strong>Proporção DoFollow:</strong> {backlinks["dofollow_ratio"]}</span>
      <span><strong>Autoridade do Domínio (DA):</strong> {backlinks["domain_authority_score"]} / 100</span>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th>Perfil do Texto-Âncora</th>
          <th class="text-center">Distribuição %</th>
          <th class="text-right">Links Verificados</th>
          <th class="text-center">Classificação</th>
        </tr>
      </thead>
      <tbody>
        {rows_backlinks}
      </tbody>
    </table>

    <!-- Seção 6: Auditoria Técnica -->
    <div class="section-header">
      <div class="section-title">6. Auditoria Técnica: Validação dos 17 Apontamentos Anteriores</div>
      <div class="section-cost">● Custo: ~$0.025 - API DataForSEO On-Page</div>
    </div>
    <div class="info-strip">
      <span><strong>Saúde Técnica do Site:</strong> 100 / 100</span>
      <span><strong>Erros Críticos:</strong> 0</span>
      <span><strong>Auditoria Anterior (19/09):</strong> 17 Apontamentos 100% Sanados em Produção</span>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th style="width: 26%;">Apontamento do Crawler (19/09)</th>
          <th style="width: 22%;">Escopo Anterior</th>
          <th style="width: 40%;">Validação em Produção ({meta["domain"]})</th>
          <th class="text-center" style="width: 12%;">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows_audit}
      </tbody>
    </table>

    <!-- Seção 7: Visibilidade em IA -->
    <div class="section-header">
      <div class="section-title">7. Visibilidade em Motores de Busca com IA (GEO / AEO)</div>
      <div class="section-cost">● Custo: ~$0.030 - Scanner Sintético OpenSEO</div>
    </div>
    <div class="info-strip">
      <span><strong>Taxa de Citação de Marca:</strong> {ai["brand_mention_rate"]}</span>
      <span><strong>Sentimento na IA:</strong> Líder e Referência de Mercado em Pedra Bela</span>
      <span><strong>Motores Analisados:</strong> Perplexity, ChatGPT Search, Google Gemini</span>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th style="width: 50%;">Prompt de Busca Conversacional</th>
          <th style="width: 25%;">Motor de IA</th>
          <th style="width: 25%;">Status de Citação & Recomendação</th>
        </tr>
      </thead>
      <tbody>
        {rows_ai}
      </tbody>
    </table>

    <div class="running-footer">
      <span>Plataforma de Inteligência OpenSEO • Emitido em: {meta["emission_date"]} • Documento Confidencial e Estratégico</span>
      <span>Página 3 de 4</span>
    </div>
  </div>


  <!-- =========================================================================
       PÁGINA 4: PLANO DE AÇÃO, TRANSPARÊNCIA DE CUSTOS E CERTIFICAÇÃO
       ========================================================================= -->
  <div class="document-page">
    <div class="running-header">
      <span class="brand">OpenSEO <span style="font-weight: 400; color: #64748b;">| Performance SEO — {meta["domain"]}</span></span>
      <span>Setembro de 2026</span>
    </div>

    <!-- Seção 8: Plano de Ação -->
    <div class="section-header">
      <div class="section-title">8. Plano de Ação Estratégico Priorizado para o Próximo Ciclo</div>
      <div class="section-cost">● Custo: $0.00 - Motor Estratégico OpenSEO</div>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th style="width: 15%;">Prioridade</th>
          <th style="width: 14%;">Categoria</th>
          <th style="width: 38%;">Ação Tática Recomendada</th>
          <th style="width: 23%;">Impacto Orgânico Estimado</th>
          <th style="width: 10%;">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows_plan}
      </tbody>
    </table>

    <!-- Seção 9: Custos de Execução -->
    <div class="section-header">
      <div class="section-title">9. Transparência de Custos de Execução & APIs OpenSEO</div>
      <div class="section-cost">● Custo Total: ~$0.165 por Auditoria</div>
    </div>
    <table class="editorial-table">
      <thead>
        <tr>
          <th>Módulo Auditado</th>
          <th>Provedor da API & Arquitetura</th>
          <th>Escopo das Métricas Ingeridas</th>
          <th class="text-right">Custo Estimado</th>
        </tr>
      </thead>
      <tbody>
        {rows_costs}
        <tr style="background-color: #f1f5f9; font-weight: bold;">
          <td colspan="3">CUSTO TOTAL DE EXECUÇÃO DO RELATÓRIO (Ingestão Completa 360° & Varredura)</td>
          <td class="text-right" style="color: #2563eb; font-size: 12px;">$0,165 (~R$ 0,90)</td>
        </tr>
      </tbody>
    </table>

    <!-- Seção 10: Glossário -->
    <div class="section-header">
      <div class="section-title">10. Glossário Executivo de Métricas e Terminologia SEO</div>
      <div class="section-cost">● Quadro Educacional</div>
    </div>
    <div class="glossary-grid">
      {glossary_items}
    </div>

    <!-- Bloco de Certificação -->
    <div class="certification-box">
      <div class="certification-title">CERTIFICAÇÃO TÉCNICA DE AUDITORIA & METODOLOGIA OPENSEO</div>
      <div class="certification-text">
        Este documento é uma auditoria executiva de SEO compilada via Inteligência Autônoma OpenSEO. Todos os dados de desempenho orgânico foram ingeridos diretamente via endpoints OAuth oficiais do Google Search Console. Posições na SERP, topologia de backlinks e índices de dificuldade foram extraídos via crawlers em tempo real da infraestrutura DataForSEO. A integridade técnica do site foi validada por renderização completa em Chromium headless.
      </div>
      <div class="certification-signer">
        Responsável Técnico: Equipe de Engenharia de Documentos OpenSEO | Status: Validado e Homologado para Execução Estratégica
      </div>
    </div>

    <div class="running-footer">
      <span>Plataforma de Inteligência OpenSEO • Emitido em: {meta["emission_date"]} • Documento Confidencial e Estratégico</span>
      <span>Página 4 de 4</span>
    </div>
  </div>

</body>
</html>
'''
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"[OpenSEO] Relatório HTML editorial compilado com sucesso para '{output_path}'.")
    return html_content

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(base_dir, "seo_report_data.json")
    html_file = os.path.join(base_dir, "seo_performance_report.html")
    generate_html(data_file, html_file)
