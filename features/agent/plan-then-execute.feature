# language: pt

Funcionalidade: Orquestração Plan-then-Execute do Agente
  Como Motor de IA do Xperience Climb
  Para otimizar custos, reduzir a latência e evitar loops de conversação
  Eu devo planear todas as ações necessárias numa única chamada de LLM e depois executá-las no servidor.

  Cenário: Utilizador envia mensagem complexa que exige múltiplas ações
    Dado que o utilizador inicia uma conversa no chat do "climb.xperiencehubs.com"
    Quando o utilizador envia "Olá, sou o João, quero fazer uma escalada em Pedra Bela. Têm pacotes livres?"
    Então o Planner deve analisar o contexto e gerar um plano estruturado com duas ações
    E o Executor de IA deve executar em paralelo a recolha do lead e a pesquisa de pacotes
    E o Synthesizer deve construir a resposta contextual final ao utilizador em português padrão
