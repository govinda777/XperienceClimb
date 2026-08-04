---
name: bot-por-skill
description: >-
  Use esta skill para validar as funcionalidades do chatbot (Bot por skill), incluindo a captura de leads, esclarecimento de dúvidas, venda de pacotes de vivência, encaminhamento ao Mercado Livre e recolha de dados de cliente.
---

# Validação do Bot por Skill (Xperience Climb)

Esta skill permite validar a nova funcionalidade do bot inteligente com base no Gemini, garantindo que ele atende aos cinco requisitos essenciais:

1. **Capturar leads** (Classificando perfis: INICIANTE, ATLETA_AUTONOMO, CORPORATIVO)
2. **Tirar dúvidas** (Esclarecendo dúvidas de escalada em Pedra Bela Vista, logística e reservas)
3. **Vender pacotes de vivência** (Batismo de Escalada, Logística Avançada, Team Building)
4. **Encaminhar ao link do Mercado Livre** (Checkout seguro e oficial)
5. **Coletar dados do cliente na venda** (Nome, perfil, email, telefone, quantidade, data)

---

## Estrutura do Agente de IA

O bot utiliza o padrão **Plan-then-Execute (P-t-E)**:

- **Planner (LLM):** Analisa a conversa e gera um plano JSON de skills necessárias.
- **Executor:** Executa as skills identificadas (como `SkillColetaLead` ou `SkillGerenciadorPedidos`).
- **Synthesizer (LLM):** Consolida as respostas para o cliente em português padrão.

---

## Como Validar as Funcionalidades

### 1. Testes Automatizados (BDD & Jest)

Para verificar o comportamento através dos cenários de teste automatizados do projeto:

```bash
# Executa os testes BDD de fluxo de skills e planner
make test-bdd
```

### 2. Validação Direta da API do Gemini (Script de Teste)

Criámos um script utilitário para validar diretamente a chamada da API do Gemini configurada no seu `.env.local`. Este script simula interações com o modelo e valida as suas respostas.

Para executar o script de validação:

```bash
node .agents/skills/bot-por-skill/scripts/validate-bot.js
```

O script testará os seguintes fluxos:

- **Captura de Lead & Dúvidas:** Usuário iniciante pedindo informações.
- **Venda de Pacotes & Coleta de Dados:** Fluxo de interesse de compra informando dados.
- **Redirecionamento ao Mercado Livre:** Verificação de fornecimento de links corretos.
