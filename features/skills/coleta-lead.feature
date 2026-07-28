# language: pt

Funcionalidade: Mapeamento de Perfil na Coleta de Lead
  Como Assistente Virtual da Xperience Climb
  Para qualificar adequadamente os contactos recebidos
  Eu devo identificar e classificar o perfil do lead em Iniciante, Atleta Autónomo ou Corporativo.

  Cenário: Mapeamento de lead com perfil Iniciante
    Dado que um utilizador se apresenta com o nome "Mariana" e diz "nunca escalei na vida"
    Quando a SkillColetaLead é executada com estes dados
    Então o perfil do lead deve ser classificado como "INICIANTE"
    E a ficha do lead deve conter o nome "Mariana"

  Cenário: Mapeamento de lead com perfil Atleta Autónomo
    Dado que um utilizador se apresenta com o nome "Carlos" e diz "já escalo há anos e tenho o meu próprio equipamento"
    Quando a SkillColetaLead é executada com estes dados
    Então o perfil do lead deve ser classificado como "ATLETA_AUTONOMO"
    E a ficha do lead deve conter o nome "Carlos"

  Cenário: Mapeamento de lead com perfil Corporativo
    Dado que um utilizador se apresenta com o nome "Beatriz" e diz "gostava de organizar um team building para a minha empresa de 20 pessoas"
    Quando a SkillColetaLead é executada com estes dados
    Então o perfil do lead deve ser classificado como "CORPORATIVO"
    E a ficha do lead deve conter o nome "Beatriz"
