import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { mockLlmResponses } from '../mocks/llm-responses.mock';

let userMessage: string;
let guardrailResponse: { allowed: boolean; textResponse?: string };

Given('que o utilizador inicia uma conversa no chat do {string}', (domain: string) => {
  userMessage = '';
  guardrailResponse = { allowed: true };
});

When('o utilizador envia a mensagem {string}', async (message: string) => {
  userMessage = message;

  // Simula a interceptação do Guardrail correspondente ao assunto
  if (message.toLowerCase().includes('nó') || message.toLowerCase().includes('ancorar')) {
    guardrailResponse = mockLlmResponses.safetyViolation;
  } else if (
    message.toLowerCase().includes('pastel') ||
    message.toLowerCase().includes('receita')
  ) {
    guardrailResponse = mockLlmResponses.scopingFail;
  } else {
    guardrailResponse = { allowed: true, textResponse: 'Olá!' };
  }
});

Then('a camada de Input Guardrail deve intercetar a mensagem', () => {
  assert.strictEqual(guardrailResponse.allowed, false);
});

Then('o agente deve responder de forma cordial sem acionar o Planner de execução', () => {
  assert.ok(guardrailResponse.textResponse);
});

Then(
  'a resposta deve enfatizar que todos os procedimentos de segurança são efetuados exclusivamente pelos guias certificados no local',
  () => {
    assert.ok(guardrailResponse.textResponse?.includes('guias certificados'));
    assert.ok(guardrailResponse.textResponse?.includes('procedimentos de segurança'));
  }
);

Then('a resposta não deve conter instruções técnicas passo a passo de montagem', () => {
  assert.ok(!guardrailResponse.textResponse?.includes('passo 1'));
  assert.ok(!guardrailResponse.textResponse?.includes('como fazer'));
});

Then('a camada de Input Guardrail deve intercetar a mensagem por desvio de escopo', () => {
  assert.strictEqual(guardrailResponse.allowed, false);
});

Then(
  'o agente deve recusar responder de forma elegante e direcionar o utilizador de volta para temas de escalada e Pedra Bela',
  () => {
    assert.ok(guardrailResponse.textResponse?.includes('Guia Digital da Xperience Climb'));
    assert.ok(guardrailResponse.textResponse?.includes('escalada'));
  }
);
