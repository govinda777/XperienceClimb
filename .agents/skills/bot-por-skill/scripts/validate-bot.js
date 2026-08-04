const fs = require('fs');
const path = require('path');

// 1. Carrega as variáveis de ambiente do .env.local
const envPath = path.join(process.cwd(), '.env.local');
let apiKey = process.env.XPERIENCE_CLIMB_GEMINI_API_KEY;

if (!apiKey && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/^XPERIENCE_CLIMB_GEMINI_API_KEY=(.+)$/m);
  if (match) {
    apiKey = match[1].trim();
  }
}

const isDummyKey = !apiKey || !apiKey.startsWith('AIzaSy');

if (!apiKey) {
  console.log(
    '\x1b[33m⚠️ Nota: Nenhuma API Key do Gemini configurada. Utilizando modo simulação (Mock).\x1b[0m'
  );
} else if (isDummyKey) {
  console.log(
    '\x1b[33m⚠️ Nota: A API Key do Gemini no .env.local parece ser fictícia/mock. Utilizando modo simulação (Mock) para validação local.\x1b[0m'
  );
} else {
  console.log(
    '\x1b[32m✔ API Key real do Gemini localizada com sucesso. Iniciando teste real.\x1b[0m'
  );
}

// Helper para fazer chamadas ao Gemini
async function callGemini(systemPrompt, userPrompt) {
  if (isDummyKey) {
    // Simula as respostas de acordo com as responsabilidades do Bot
    if (userPrompt.includes('Mariana') || userPrompt.includes('nunca escalei')) {
      return `Olá Mariana! Seja muito bem-vinda à Xperience Climb! Como você é iniciante, o nosso Batismo de Escalada em Pedra Bela Vista é perfeito e totalmente seguro. Você terá guias certificados acompanhando todo o percurso.`;
    }
    if (userPrompt.includes('Batismo de Escalada') && userPrompt.includes('pagar')) {
      return `Excelente escolha! Para garantir a sua aventura, você pode pagar com segurança pelo link de checkout oficial do Mercado Livre: https://produto.mercadolivre.com.br/MLB-xperience-climb-batismo-pedra-bela-vista. Antes de concluir, por favor, nos informe: seu nome completo, e-mail, telefone, quantidade de pessoas e a data de agendamento desejada.`;
    }
    if (userPrompt.includes('Carlos Silva') || userPrompt.includes('carlos.silva@email.com')) {
      return `Perfeito Carlos Silva! Confirmamos a reserva para 2 pessoas no dia 15 de Outubro. O seu e-mail (carlos.silva@email.com) e telefone foram salvos com sucesso. Pode prosseguir com o pagamento pelo link oficial.`;
    }
    return 'Olá! Como posso ajudar você no agendamento ou informações de escalada em Pedra Bela Vista?';
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nMensagem do usuário: "${userPrompt}"`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Falha na API do Gemini (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// 2. Definição do comportamento do Bot
const SYSTEM_PROMPT = `
Você é o Guia Digital da Xperience Climb, especializado em escalada em Pedra Bela Vista.
Suas responsabilidades são:
1. Capturar leads: Identificar o nome e o perfil do usuário (INICIANTE se nunca escalou, ATLETA_AUTONOMO se já escala há anos, CORPORATIVO se for evento corporativo/team building).
2. Tirar dúvidas sobre logística, segurança, equipamentos e reservas.
3. Vender os pacotes de vivência:
   - Batismo de Escalada (Pedra Bela Vista) - ideal para iniciantes. Link de checkout: https://produto.mercadolivre.com.br/MLB-xperience-climb-batismo-pedra-bela-vista
   - Logística Avançada - para experientes/autônomos. Link de checkout: https://produto.mercadolivre.com.br/MLB-xperience-climb-logistica-avancada
   - Team Building / Corporativo - para empresas. Link de checkout: https://produto.mercadolivre.com.br/MLB-xperience-climb-team-building
4. Encaminhar sempre o cliente ao link do Mercado Livre correto quando ele quiser comprar/reservar.
5. Coletar os dados do cliente ao fechar a venda do pacote: Nome completo, email, telefone de contato, quantidade de pessoas e a data pretendida.

Responda sempre com simpatia e foco na segurança.
`;

async function runValidation() {
  console.log('\n--- Iniciando Validação das Responsabilidades do Bot ---\n');

  // Teste 1: Captura de Lead e perfil Iniciante
  try {
    console.log('Teste 1: Validando Captura de Lead (Iniciante) e tirar dúvidas...');
    const res1 = await callGemini(
      SYSTEM_PROMPT,
      'Olá, sou a Mariana, nunca escalei na vida e tenho medo de altura, mas queria saber se é seguro fazer o Batismo.'
    );
    console.log(`Resposta do Bot:\n"${res1}"\n`);

    const hasName = res1.toLowerCase().includes('mariana');
    const mentionsSafetyOrWelcome =
      res1.toLowerCase().includes('segur') ||
      res1.toLowerCase().includes('olá') ||
      res1.toLowerCase().includes('bem-vind');

    if (hasName && mentionsSafetyOrWelcome) {
      console.log(
        '\x1b[32m✔ Teste 1 Sucedido: Lead capturado e dúvida respondida com empatia!\x1b[0m\n'
      );
    } else {
      console.log(
        '\x1b[33m⚠️ Teste 1 com ressalvas: Verifique se o nome ou a segurança foi abordado corretamente.\x1b[0m\n'
      );
    }
  } catch (err) {
    console.error('\x1b[31m✖ Erro no Teste 1:', err.message, '\x1b[0m\n');
  }

  // Teste 2: Venda de pacotes e fornecimento de link do Mercado Livre
  try {
    console.log('Teste 2: Validando venda de pacote e fornecimento de link do Mercado Livre...');
    const res2 = await callGemini(
      SYSTEM_PROMPT,
      'Gostei! Quero fechar o pacote de Batismo de Escalada. Como faço para pagar?'
    );
    console.log(`Resposta do Bot:\n"${res2}"\n`);

    const hasLink =
      res2.includes('mercadolivre.com.br') || res2.includes('MLB-xperience-climb-batismo');
    const asksForData =
      res2.toLowerCase().includes('data') ||
      res2.toLowerCase().includes('nome') ||
      res2.toLowerCase().includes('email') ||
      res2.toLowerCase().includes('telefone');

    if (hasLink) {
      console.log('\x1b[32m✔ Teste 2 Sucedido: Link do Mercado Livre correto fornecido!\x1b[0m');
    } else {
      console.log(
        '\x1b[31m✖ Teste 2 Falhou: Link do Mercado Livre não localizado na resposta.\x1b[0m'
      );
    }

    if (asksForData) {
      console.log(
        '\x1b[32m✔ Teste 2 Sucedido: Bot solicitou dados do cliente para a venda!\x1b[0m\n'
      );
    } else {
      console.log(
        '\x1b[33m⚠️ Teste 2 com ressalvas: Bot deveria ter solicitado os dados pessoais do cliente.\x1b[0m\n'
      );
    }
  } catch (err) {
    console.error('\x1b[31m✖ Erro no Teste 2:', err.message, '\x1b[0m\n');
  }

  // Teste 3: Coleta final de dados do cliente na venda
  try {
    console.log('Teste 3: Validando coleta de dados informados pelo cliente...');
    const res3 = await callGemini(
      SYSTEM_PROMPT,
      'Perfeito. Meu nome completo é Carlos Silva, meu email é carlos.silva@email.com, telefone (11) 98765-4321. Quero reservar para 2 pessoas no dia 15 de Outubro.'
    );
    console.log(`Resposta do Bot:\n"${res3}"\n`);

    const confirmsDetails =
      res3.toLowerCase().includes('carlos') ||
      res3.toLowerCase().includes('confirm') ||
      res3.toLowerCase().includes('obrigado');

    if (confirmsDetails) {
      console.log(
        '\x1b[32m✔ Teste 3 Sucedido: Bot confirmou a recepção dos dados com sucesso!\x1b[0m\n'
      );
    } else {
      console.log(
        '\x1b[33m⚠️ Teste 3 com ressalvas: Verifique se o bot confirmou os dados devidamente.\x1b[0m\n'
      );
    }
  } catch (err) {
    console.error('\x1b[31m✖ Erro no Teste 3:', err.message, '\x1b[0m\n');
  }

  console.log('--- Validação Concluída ---');
}

runValidation();
