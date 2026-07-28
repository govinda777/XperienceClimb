# ADR-004: Segurança da API, Prevenção contra DDoS, Auditoria de Conversas/Tools e Conectividade MCP

## Status
Aceito

## Contexto
A evolução do bot de IA do XperienceClimb para uma arquitetura baseada em agentes com ferramentas (Skills) dinâmicas exige salvaguardas robustas de segurança, estabilidade e conformidade. Precisamos garantir a proteção rigorosa de segredos de terceiros (como a chave da API da LLM), resiliência contra ataques de negação de serviço (DDoS/Spam), rastreabilidade completa das interações e execuções de ferramentas, bem como um mecanismo seguro para expansão de dados e recursos via Model Context Protocol (MCP).

## Decisão
Implementar as seguintes estratégias transversais de segurança, governança e conectividade na arquitetura do bot do XperienceClimb:

### 1. Gestão Segura da API Key (Configuração Isolada no Servidor)
* **Decisão:** A chave de API da LLM (por exemplo, `LLM_API_KEY`) é configurada estritamente como uma variável de ambiente do lado do servidor (Server-Side Only).
* **Especificação:** Nenhuma chamada à LLM é iniciada pelo lado do cliente. O portal interage puramente através de Route Handlers isolados do Next.js 15 (ex: `/api/chat`), ocultando totalmente qualquer credencial no backend e impedindo o vazamento acidental no bundle JS exposto aos navegadores.

### 2. Prevenção a Ataques DDoS e Spam Conversacional
* **Decisão:** Adotar uma estratégia em camadas de controle de tráfego e limite de chamadas (Rate Limiting).
* **Mecanismos Implementados:**
  * **Rate Limiting em Memória:** Controle básico por endereço IP nas rotas de API do Next.js (ex: máximo de 5 requisições por janela de 1 minuto em memória local) para mitigar spammers de forma imediata.
  * **Isolamento de Estado:** Sessões de chat expiram e limpam histórico de forma automática para evitar o consumo abusivo de memória.
  * **Extensibilidade (Redis):** Estrutura preparada para transição rápida para armazenamento centralizado e persistente de Rate Limits em produção de alta demanda (ex: Upstash/Redis), garantindo que picos de chamadas maliciosas sejam bloqueados na camada de edge antes de gerarem cobrança na LLM.

### 3. Auditoria de Conversas e Rastreamento (Logging Conversacional)
* **Decisão:** Todo diálogo entre o utilizador e o agente deve ser auditável de maneira segura e em conformidade.
* **Mecanismo:** Armazenar de forma anonimizada o histórico de mensagens, contendo metadados como `sessionId`, timestamp e identificador confidencial do utilizador (userId vindo do Privy). Dados pessoais sensíveis e informações de meios de pagamento nunca são persistidos diretamente na base de logs conversacionais.

### 4. Auditoria de Execução de Tools (Skills)
* **Decisão:** Rastrear a execução de cada Skill em produção, provendo total visibilidade sobre as decisões autônomas do agente de IA.
* **Mecanismo:** Cada chamada à engine do Executor gera um log estruturado registrando:
  * Nome da Skill invocada (ex: `SkillGerenciadorPedidos`);
  * Argumentos fornecidos pelo Planner;
  * Tempo de latência de resposta do microsserviço ou banco de dados associado;
  * Status da execução (sucesso ou falha com detalhes do erro).
  * Isso impede que execuções erráticas do robô permaneçam silenciosas, facilitando a depuração e monitoração em tempo real.

### 5. Model Context Protocol (MCP) Seguro para Integração de Dados
* **Decisão:** Utilizar o Model Context Protocol (MCP) como barramento universal e seguro para que o bot consulte bases de dados ou acesse informações de parceiros/imagens de forma descentralizada.
* **Diretrizes de Segurança para o MCP:**
  * **Leitura Exclusiva (Read-Only):** Conectores MCP que dão acesso ao catálogo de destinos do Sanity ou bancos de dados locais devem operar em modo estrito de somente leitura.
  * **Gateways Autenticados:** Todo servidor de contexto MCP externo precisa requerer tokens portadores de autorização mútua (mTLS ou Bearer tokens assinados pelo backend do XperienceClimb), mitigando ataques de personificação ou sequestro de conexões de contexto.
  * **Sanitização de Respostas:** Respostas brutas vindas de servidores MCP são limpas pela engine do Executor antes de serem expostas à LLM Planner ou Synthesizer, prevenindo ataques de injeção de prompt indireta (Indirect Prompt Injection).

## Consequências
* **Positivas:**
  * **Elevada Postura de Segurança:** Chaves de API e fluxos de dados sensíveis nunca chegam ao navegador.
  * **Conformidade de Negócio:** Auditoria granular de conversas e ferramentas viabiliza o acompanhamento e otimização dos funis de vendas por administradores autorizados.
  * **Resiliência e Escalabilidade:** A prevenção de DDoS na camada de API assegura a previsibilidade financeira contra faturas abusivas de LLM.
* **Negativas:**
  * Pequeno aumento na latência de orquestração devido às etapas adicionais de sanitização de dados no MCP e geração de logs estruturados. *Mitigação:* Otimização das queries de logs por processos assíncronos não bloqueantes (background logging).
