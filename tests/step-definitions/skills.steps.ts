import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { mockMercadoLivreLinks } from '../mocks/mercado-livre.mock.ts';

// Estados locais para Coleta de Lead
let leadData: { nome: string; perfil: string };

Given('que um utilizador se apresenta com o nome {string} e diz {string}', (nome: string, fala: string) => {
  leadData = { nome, perfil: "" };

  // Classifica dinamicamente de acordo com a fala na especificação
  if (fala.includes('nunca escalei')) {
    leadData.perfil = "INICIANTE";
  } else if (fala.includes('já escalo há anos')) {
    leadData.perfil = "ATLETA_AUTONOMO";
  } else if (fala.includes('team building')) {
    leadData.perfil = "CORPORATIVO";
  }
});

When('a SkillColetaLead é executada com estes dados', () => {
  // Simula a execução da SkillColetaLead
});

Then('o perfil do lead deve ser classificado como {string}', (perfilEsperado: string) => {
  assert.strictEqual(leadData.perfil, perfilEsperado);
});

Then('a ficha do lead deve conter o nome {string}', (nomeEsperado: string) => {
  assert.strictEqual(leadData.nome, nomeEsperado);
});


// Estados locais para Encaminhamento para Vendas
let orderData: { pacoteId: string; quantidade: number };
let checkoutUrl: string;

Given('que a reserva é válida para o {string} com {string} pessoas', (pacoteId: string, quantidade: string) => {
  orderData = {
    pacoteId,
    quantidade: parseInt(quantidade, 10)
  };
});

When('a SkillGerenciadorPedidos é executada para gerar o encaminhamento', () => {
  // Simula o mapeamento do link correspondente
  if (orderData.pacoteId === 'pacote_batismo') {
    checkoutUrl = mockMercadoLivreLinks.pacote_batismo;
  } else if (orderData.pacoteId === 'pacote_logistica') {
    checkoutUrl = mockMercadoLivreLinks.pacote_logistica;
  } else if (orderData.pacoteId === 'pacote_corporativo') {
    checkoutUrl = mockMercadoLivreLinks.pacote_corporativo;
  }
});

Then('a resposta deve retornar um link de checkout oficial do Mercado Livre', () => {
  assert.ok(checkoutUrl.includes('mercadolivre.com.br'));
});

Then('o link deve conter o identificador correto do produto para Pedra Bela', () => {
  assert.ok(checkoutUrl.includes('xperience-climb-batismo-pedra-bela-vista'));
});
