# language: pt

Funcionalidade: Encaminhamento para Vendas via Mercado Livre
  Como Skill de Vendas do Xperience Climb
  Para converter o interesse do utilizador em compra real de forma segura
  Eu devo validar a reserva e obter o link de checkout do Mercado Livre correspondente ao pacote selecionado.

  Cenário: Redirecionamento bem sucedido para pacote de Batismo em Pedra Bela
    Dado que a reserva é válida para o "pacote_batismo" com "2" pessoas
    Quando a SkillGerenciadorPedidos é executada para gerar o encaminhamento
    Então a resposta deve retornar um link de checkout oficial do Mercado Livre
    E o link deve conter o identificador correto do produto para Pedra Bela
