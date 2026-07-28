# language: pt

Funcionalidade: Transbordo Inteligente com Human-in-the-Loop (Handoff)
  Como Agente de IA do Xperience Climb
  Para assegurar a satisfação do cliente e a segurança em situações críticas
  Eu devo pausar a autonomia do bot e acionar um consultor humano qualificado.

  Cenário: Utilizador expressa preocupação crítica de segurança ou frustração
    Dado que o utilizador inicia uma conversa no chat do "climb.xperiencehubs.com"
    Quando o utilizador envia "Estou com muito medo das alturas mas quero ir, preciso de falar com um instrutor real!"
    Então o Planner deve identificar a necessidade de intervenção imediata e disparar a SkillHandoffHumano
    E a autonomia da conversa do bot deve ser pausada temporariamente
    E um alerta de alta prioridade deve ser enviado à equipa de guias
