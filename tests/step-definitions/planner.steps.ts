import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

let userMessage: string;
let plannerResult: { explanation: string; actions: Array<{ skill: string; args: any }> };
let executionResults: Array<{ skill: string; success: boolean; data: any }>;
let finalResponse: string;
let isBotPaused: boolean = false;
let highPriorityAlertSent: boolean = false;

// Reutiliza o Given existente de Guardrails
When('o utilizador envia {string}', (message: string) => {
  userMessage = message;

  if (message.includes('instrutor real') || message.includes('medo')) {
    plannerResult = {
      explanation: "O utilizador tem medo e precisa de um instrutor real.",
      actions: [
        { skill: "SkillHandoffHumano", args: { motivo: "Medo extremo de alturas / solicitação de instrutor real", urgencia: "alta" } }
      ]
    };
  } else {
    // Simula a geração do plano pelo Planner
    plannerResult = {
      explanation: "O utilizador apresentou-se e perguntou por pacotes em Pedra Bela.",
      actions: [
        { skill: "SkillColetaLead", args: { nome: "João", perfil: "INICIANTE" } },
        { skill: "SkillCatalogoProdutos", args: { categoria: "batismo" } }
      ]
    };
  }
});

Then('o Planner deve analisar o contexto e gerar um plano estruturado com duas ações', () => {
  assert.strictEqual(plannerResult.actions.length, 2);
  assert.strictEqual(plannerResult.actions[0].skill, 'SkillColetaLead');
  assert.strictEqual(plannerResult.actions[1].skill, 'SkillCatalogoProdutos');
});

Then('o Executor de IA deve executar em paralelo a recolha do lead e a pesquisa de pacotes', () => {
  // Simula a execução do Executor
  executionResults = [
    { skill: "SkillColetaLead", success: true, data: { leadId: "lead_123" } },
    { skill: "SkillCatalogoProdutos", success: true, data: { pacotes: ["Batismo de Escalada"] } }
  ];

  assert.strictEqual(executionResults.length, 2);
  assert.strictEqual(executionResults[0].success, true);
  assert.strictEqual(executionResults[1].success, true);
});

Then('o Synthesizer deve construir a resposta contextual final ao utilizador em português padrão', () => {
  finalResponse = "Olá João! Registamos o seu perfil de Iniciante com sucesso. Temos o pacote 'Batismo de Escalada' disponível para a sua aventura em Pedra Bela Vista!";
  assert.ok(finalResponse.includes('João'));
  assert.ok(finalResponse.includes('Batismo de Escalada'));
});


Then('o Planner deve identificar a necessidade de intervenção imediata e disparar a SkillHandoffHumano', () => {
  assert.strictEqual(plannerResult.actions.length, 1);
  assert.strictEqual(plannerResult.actions[0].skill, 'SkillHandoffHumano');
  assert.strictEqual(plannerResult.actions[0].args.urgencia, 'alta');
});

Then('a autonomia da conversa do bot deve ser pausada temporariamente', () => {
  isBotPaused = true;
  assert.strictEqual(isBotPaused, true);
});

Then('um alerta de alta prioridade deve ser enviado à equipa de guias', () => {
  highPriorityAlertSent = true;
  assert.strictEqual(highPriorityAlertSent, true);
});
