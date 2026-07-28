# ADR-001: Adoção do Padrão Plan-then-Execute em Detrimento do ReAct

## Status
Aceito

## Contexto
Durante a conceção do novo agente inteligente para o bot do XperienceClimb, avaliámos dois padrões dominantes de raciocínio agêntico de mercado para seleção e uso de ferramentas (Skills): **ReAct (Reasoning + Acting)** e **Plan-then-Execute (P-t-E)**.

No ReAct, o modelo decide interativamente: *Pensar -> Agir -> Observar -> Pensar*, o que se traduz em chamadas recursivas sucessivas de LLM. No P-t-E, o modelo analisa a intenção do usuário, elabora um plano estruturado de chamadas de ferramentas de uma só vez, e então um motor rígido no servidor executa o plano completo antes da síntese final de resposta.

## Decisão
Decidimos adotar o padrão **Plan-then-Execute (P-t-E)** para a orquestração do bot de IA no Next.js 15.

## Consequências
* **Positivas:**
  * **Previsibilidade Operacional:** Redução drástica do risco de *loops* infinitos de chamadas de API, mantendo o robô sob rédeas seguras no servidor.
  * **Otimização de Custos e Latência:** Menor número de chamadas de ida e volta à LLM para resolver uma mesma solicitação, gerando enorme economia de *tokens* e respostas muito mais ágeis ao utilizador.
  * **Segurança Transacional:** O plano de ações gerado pode ser auditado programaticamente por validadores TypeScript antes de realizar mutações críticas de banco ou no `PaymentService` (Mercado Pago).
* **Negativas / Mitigações:**
  * Menor capacidade da LLM em se autocorrigir dinamicamente no meio da execução de múltiplas ferramentas se uma delas retornar um dado inesperado. *Mitigação:* Adição de regras e fallbacks rígidos no executor de Skills para lidar com retentativas ou acionar o handoff caso uma chamada falhe.
