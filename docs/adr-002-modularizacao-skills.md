# ADR-002: Modularização da Lógica de Negócio em Skills Independentes

## Status
Aceito

## Contexto
O ecossistema Xperience Hubs exige que regras de negócio (como preços de pacotes de escalada em Pedra Bela, métodos de pagamento e recolha de leads) mudem sem afetar o comportamento central da inteligência artificial. No modelo n8n anterior, a lógica estava acoplada visual e estruturalmente ao fluxo.

## Decisão
Adotar o padrão de **Skills Isoladas**, onde cada funcionalidade do bot é encapsulada numa Skill autónoma com metadados estritos (JSON Schema) e executores dedicados em TypeScript no Next.js 15.

## Consequências
* **Positivas:**
  * **Governança e Reutilização:** As Skills podem ser testadas unitariamente (ex: `SkillGerenciadorPedidos.test.ts`) sem necessidade de simular conversas completas da LLM.
  * **Evolução Contínua:** Alterar a regra de reserva ou integrar novas APIs (como a API do FreeClimb ou TourChain Web3) requer apenas a atualização ou adição de uma nova Skill, sem alterar o código core do agente.
  * **Desempenho:** O *payload* do sistema mantêm-se leve, injetando apenas as definições de schemas necessárias no contexto do Planner.
* **Negativas:**
  * Requer rigor no alinhamento de versionamento entre os Schemas definidos na LLM e o código TypeScript de suporte.
