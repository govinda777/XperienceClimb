# RFC: Migração do Bot XperienceClimb para Arquitetura Agêntica Baseada em Skills

- **Status:** Proposto
- **Autor:** Equipa de Arquitetura Xperience Hubs / Jules
- **Data:** Julho de 2026
- **Alvo:** Bot de Atendimento e Vendas do XperienceClimb (`climb.xperiencehubs.com`)

---

## 1. Contexto e Problema

Atualmente, a automação de atendimento do XperienceClimb assenta em fluxos determinísticos orquestrados via n8n. Embora eficaz para tarefas lineares, esta abordagem apresenta limitações severas:
* **Rigidez Conversacional:** Incapacidade de gerir desvios de assunto, dúvidas contextuais complexas ou interrupções.
* **Custo de Manutenção:** Qualquer alteração no fluxo de vendas ou catálogo exige a reestruturação visual de múltiplos nós.
* **Latência e Fragmentação:** Chamadas sequenciais a webhooks externos introduzem pontos de falha e atrasos na resposta ao utilizador.

---

## 2. Objetivo

Substituir o motor determinístico por uma **Arquitetura Agêntica Modular baseada em Skills**, onde uma LLM central (com acesso a ferramentas especificadas) orquestra dinamicamente a recolha de dados, a apresentação de produtos em Pedra Bela, a criação de pedidos e o transbordo humano (*handoff*).

---

## 3. Estrutura Modular de Skills

Cada *Skill* é uma unidade autónoma de capacidade, definida por metadados, schema de entrada/saída e lógica de execução.

```typescript
// types/skills.ts
export interface SkillDefinition<TInput = any, TOutput = any> {
  name: string;
  description: string;
  parameters: Record<string, any>; // JSON Schema
  execute: (input: TInput) => Promise<TOutput>;
}
```

### 3.1. Catalogação das Skills Propostas

#### A. `SkillColetaLead`
- **Finalidade:** Mapear o perfil do utilizador (Iniciante, Atleta Autónomo, Corporativo) e extrair dados de contacto (nome, e-mail, telefone).
- **Schema JSON:**
```json
{
  "name": "SkillColetaLead",
  "description": "Capta e atualiza as informações do lead e o seu perfil de escalada.",
  "parameters": {
    "type": "object",
    "properties": {
      "nome": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "telefone": { "type": "string" },
      "perfil": { "type": "string", "enum": ["INICIANTE", "ATLETA_AUTONOMO", "CORPORATIVO"] }
    },
    "required": ["nome", "perfil"]
  }
}
```

#### B. `SkillCatalogoProdutos`
- **Finalidade:** Consultar o repositório CMS (Sanity ou local fallback) para obter detalhes sobre os pacotes de escalada em Pedra Bela (ex: Batismo de Escalada, Logística Avançada, Team Building).
- **Schema JSON:**
```json
{
  "name": "SkillCatalogoProdutos",
  "description": "Consulta disponibilidade, preços e detalhes dos pacotes de escalada em Pedra Bela.",
  "parameters": {
    "type": "object",
    "properties": {
      "categoria": { "type": "string", "enum": ["batismo", "logistica", "corporativo", "todos"] },
      "dataDesejada": { "type": "string", "format": "date" }
    },
    "required": ["categoria"]
  }
}
```

#### C. `SkillGerenciadorPedidos`
- **Finalidade:** Registar reservas, validar regras de negócio e invocar o `PaymentService` para gerar o payload de pagamento via PIX / Mercado Pago.
- **Schema JSON:**
```json
{
  "name": "SkillGerenciadorPedidos",
  "description": "Cria a reserva do pacote selecionado e gera o QrCode/Copia-e-Cola PIX para pagamento.",
  "parameters": {
    "type": "object",
    "properties": {
      "leadId": { "type": "string" },
      "pacoteId": { "type": "string" },
      "quantidadePessoas": { "type": "integer", "minimum": 1 },
      "dataAgendamento": { "type": "string", "format": "date" }
    },
    "required": ["leadId", "pacoteId", "quantidadePessoas", "dataAgendamento"]
  }
}
```

#### D. `SkillHandoffHumano`
- **Finalidade:** Pausar a autonomia do agente e notificar um consultor humano quando o utilizador expressa dúvidas de segurança complexas, exigências personalizadas ou frustração.
- **Schema JSON:**
```json
{
  "name": "SkillHandoffHumano",
  "description": "Solicita a intervenção imediata de um guia ou consultor humano da Xperience.",
  "parameters": {
    "type": "object",
    "properties": {
      "motivo": { "type": "string" },
      "urgencia": { "type": "string", "enum": ["baixa", "media", "alta"] }
    },
    "required": ["motivo"]
  }
}
```

---

## 4. Padrão Arquitetural: Plan-then-Execute (P-t-E)

Para garantir previsibilidade e evitar loops de chamadas de API, adotamos o fluxo Plan-then-Execute:

```
[Utilizador] ---> ( Next.js 15 Route Handler )
                          |
                          v
                 [ 1. PLANNER (LLM) ]
    Gera um plano estruturado de execução de Skills em JSON
                          |
                          v
                 [ 2. EXECUTOR (Engine) ]
    Valida e executa as Skills em paralelo/sequência com segurança
                          |
                          v
               [ 3. SYNTHESIZER (LLM) ]
    Converte os resultados da execução na resposta final em pt-PT
                          |
                          v
                    [Utilizador]
```

### 4.1. Especificações dos Prompts de Sistema

#### Prompt do Planner
```markdown
Você é o Planner de IA do bot XperienceClimb.
Sua única responsabilidade é analisar a mensagem do usuário, o histórico da conversa e gerar um plano estruturado em formato JSON contendo as Skills necessárias para resolver o problema.

As habilidades disponíveis são:
1. SkillColetaLead: Use se o usuário se apresentar ou fornecer dados de perfil/contato.
2. SkillCatalogoProdutos: Use se o usuário perguntar por pacotes, preços ou passeios.
3. SkillGerenciadorPedidos: Use se o usuário quiser reservar ou pagar por um passeio.
4. SkillHandoffHumano: Use se o usuário estiver frustrado, fizer perguntas de segurança extremamente técnicas ou solicitar falar com uma pessoa.

Sua resposta DEVE ser estritamente em JSON no seguinte formato:
{
  "explanation": "Breve justificativa do plano",
  "actions": [
    {
      "skill": "NomeDaSkill",
      "args": { ... argumentos específicos ... }
    }
  ]
}
```

#### Prompt do Executor (Engine de Lógica)
O Executor não é uma chamada de LLM, mas sim uma engine rígida no Next.js que consome os JSON gerados pelo Planner, mapeando cada ação e invocando a função TypeScript correspondente de forma segura, com validações de concorrência e tratamento de exceções.

#### Prompt do Synthesizer
```markdown
Você é o Assistente Virtual do XperienceClimb, especialista em escaladas.
Seu objetivo é gerar a resposta final ao usuário de forma acolhedora, empática e prestativa, utilizando a linguagem formal do português europeu (pt-PT) padrão de Xperience Hubs.
Use os dados que foram coletados/resolvidos pelo Executor (fornecidos abaixo no contexto) para compor a sua resposta de forma factual, sem alucinar.

Contexto de Execução:
{executionResults}

Mensagem original do utilizador:
{userMessage}
```

---

## 5. Integração com a Aplicação Next.js 15

A orquestração será implementada via Server Action / Route Handler nativo no Next.js 15 (`src/app/api/chat/route.ts`), eliminando a necessidade de servidores intermédios. Ela se comunicará diretamente com os repositórios existentes (`SanityContentRepository`, `OrderRepository`) e serviços correspondentes.

```typescript
// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { runPlanner, executeSkills, synthesizeResponse } from '@/lib/agent-engine';

export async function POST(req: Request) {
  try {
    const { message, conversationHistory, userId, sessionId } = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Falta o sessionId ou a mensagem.' }, { status: 400 });
    }

    // 1. Fase de Planeamento (LLM Planner)
    const plan = await runPlanner(message, conversationHistory);

    // 2. Execução Segura das Skills no Servidor
    const executionResults = await executeSkills(plan.actions, { userId, sessionId });

    // 3. Síntese Final ao Utilizador (LLM Synthesizer)
    const finalResponse = await synthesizeResponse(message, executionResults, conversationHistory);

    return NextResponse.json({
      response: finalResponse,
      planExecuted: plan.actions,
      sessionId
    });
  } catch (error) {
    console.error('Erro na orquestração agêntica:', error);
    return NextResponse.json({ error: 'Erro interno ao processar atendimento.' }, { status: 500 });
  }
}
```

### 5.1. Acoplamento de Serviços Core

- **`SkillCatalogoProdutos`**: Instanciará diretamente o `SanityContentRepository` (via `ContentRepositoryFactory`) para consultar os pacotes dinâmicos e destinos ativos de forma a obter o catálogo mais atualizado sem passar pelo n8n.
- **`SkillGerenciadorPedidos`**: Utilizará o caso de uso `CreateOrder` e o `PaymentService` (Mercado Pago/PIX) para gerar preferências e o Pix Copia-e-Cola de forma síncrona diretamente no handler.
- **Redução de Custo e Latência**: Ao invés de dependermos de transições lentas de nós no n8n que demoram vários segundos, a orquestração baseada em LLM executa as chamadas em paralelo e retorna ao usuário em uma única rodada conversacional.
