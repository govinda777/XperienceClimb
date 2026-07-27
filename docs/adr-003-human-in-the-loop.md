# ADR-003: Implementação de Human-in-the-Loop (HITL) para Handoff de Atendimento

## Status
Aceito

## Contexto
A escalada em rocha natural é uma atividade desportiva que envolve perceção de risco e questões de segurança física crítica. Embora o agente de IA seja altamente capaz de esclarecer dúvidas e gerir reservas, existem cenários (medo extremo de alturas, requisitos médicos específicos ou reservas corporativas customizadas) em que a empatia e a autoridade humanas são indispensáveis.

## Decisão
Implementar um mecanismo nativo de **Human-in-the-Loop (HITL)** ativado através da `SkillHandoffHumano`. Quando disparada, a autonomia do agente é temporariamente pausada, o estado da sessão é persisitido e um alerta de alta prioridade é enviado aos guias da Xperience via Webhook / WhatsApp.

## Consequências
* **Positivas:**
  * **Segurança e Confiança:** Garante que hesitações críticas sobre equipamentos, EPIs e condições meteorológicas recebam validação direta de instrutores certificados.
  * **Taxa de Conversão Elevada em B2B:** Clientes corporativos são encaminhados instantaneamente para a equipa de mentoria e desenvolvimento organizacional.
  * **Incentivo à Experiência:** Mantém o compromisso de hospitalidade rigorosa do Xperience Hubs.
* **Negativas:**
  * Exige que a equipa de guias/consultores mantenha uma janela de monitorização para responder ao *handoff* dentro de SLA adequado.
