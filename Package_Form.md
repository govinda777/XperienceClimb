# Documentação do Formulário de Carrinho - XperienceClimb

## Visão Geral

O formulário de carrinho do XperienceClimb é um processo de checkout em 3 etapas que permite aos usuários finalizar a reserva de suas experiências de escalada. O sistema coleta informações essenciais sobre os participantes, detalhes da escalada e confirmação do pedido.

## Estrutura do Formulário

### Como Funciona com Múltiplos Participantes

O sistema funciona com o conceito de **"1 pacote = 1 pessoa"**. Isso significa que:

- **Se você selecionar 2 pacotes AGARRÃO**: Serão 2 pessoas diferentes, cada uma com seus próprios dados
- **Se você selecionar 1 pacote CRUX e 1 pacote ALMA VERTICAL**: Serão 2 pessoas diferentes, cada uma com seus próprios dados
- **Se você selecionar 3 pacotes do mesmo tipo**: Serão 3 pessoas diferentes, cada uma com seus próprios dados

**Exemplo Prático:**

- Carrinho com 2x Pacote AGARRÃO = 2 formulários separados para preencher
- Carrinho com 1x Pacote CRUX + 1x Pacote ALMA VERTICAL = 2 formulários separados para preencher

**Como o Sistema Renderiza:**
O sistema cria um formulário separado para cada item no carrinho, mesmo que sejam do mesmo tipo de pacote. Cada formulário terá:

- Cabeçalho identificando o pacote e participante
- Campos específicos para aquela pessoa
- Validação independente dos dados

### Etapa 1: Detalhes dos Participantes

**Objetivo**: Coletar informações pessoais e de segurança de cada participante

**IMPORTANTE**: Cada pacote representa uma pessoa. Se você selecionar múltiplos pacotes (mesmo sendo o mesmo tipo), será necessário preencher os dados pessoais para cada pessoa individualmente.

#### Campos Obrigatórios por Participante:

1. **Nome Completo** \*
   - Tipo: Texto
   - Descrição: Nome completo do participante
   - Validação: Campo obrigatório

2. **Idade** \*
   - Tipo: Número
   - Descrição: Idade do participante
   - Validação: Mínimo 12 anos, máximo 99 anos
   - Observação: Idade mínima varia conforme o pacote selecionado

3. **Número do Tenis** \*
   - Tipo: Texto
   - Descrição: Número do tenis do participante
   - Validação: Campo obrigatório

4. **Nível de Experiência** \*
   - Tipo: Select
   - Opções:
     - Minha primeira vez
     - Iniciante
     - Intermediário
     - Avançado
   - Descrição: Nível de experiência em escalada do participante

5. **Declaração de Saúde** \*
   - Tipo: Checkbox
   - Descrição: "Declaro estar em boas condições físicas e de saúde para praticar escalada esportiva"
   - Validação: Deve ser marcado para prosseguir

### Etapa 2: Data da Escalada

**Objetivo**: Confirmar a data da atividade e coletar solicitações especiais

#### Campos:

1. **Data da Escalada** \*
   - Tipo: Campo somente leitura
   - Descrição: Data única disponível para a experiência
   - Valor atual: 16 de Agosto de 2025
   - Status: Disponível (indicador visual)

2. **Solicitações Especiais** (Opcional)
   - Tipo: Textarea
   - Descrição: Campo para solicitações especiais ou informações importantes
   - Linhas: 3
   - Placeholder: "Alguma solicitação especial ou informação importante?"

#### Informações Importantes Exibidas:

- Atividade sujeita às condições climáticas
- Equipamentos de segurança inclusos
- Idade mínima: 12 anos

### Etapa 3: Confirmação

**Objetivo**: Revisar todos os detalhes antes da finalização

#### Seções de Confirmação:

1. **Resumo do Pedido**
   - Lista de pacotes selecionados
   - Nome de cada participante
   - Preço individual de cada item
   - Total geral do pedido

2. **Data da Escalada**
   - Data formatada por extenso
   - Solicitações especiais (se houver)

## Fluxo de Validação

### Validação por Etapa:

#### Etapa 1 - Detalhes dos Participantes:

- **Para cada participante**: Todos os campos obrigatórios devem estar preenchidos
- **Para cada participante**: Idade deve estar dentro dos limites permitidos
- **Para cada participante**: Declaração de saúde deve estar marcada
- **Para cada participante**: Contato de emergência deve ter nome e telefone
- **Validação por pacote**: Cada pacote no carrinho deve ter seus dados completos preenchidos

#### Etapa 2 - Data da Escalada:

- Data deve corresponder à data única disponível
- Campo de data é fixo e não pode ser alterado

#### Etapa 3 - Confirmação:

- Apenas revisão, sem validações adicionais

## Processo de Finalização

### Após a Confirmação:

1. **Verificação de Autenticação**
   - Sistema verifica se o usuário está logado
   - Se não autenticado, exibe alerta

2. **Criação do Pedido**
   - Dados são enviados para o backend
   - Pedido é criado no sistema

3. **Processamento de Pagamento**
   - **Prioridade**: Redirecionamento para WhatsApp
   - **Fallback**: Redirecionamento para Mercado Pago

---

## Formulario WhatsApp

> Todos os campos que o usuario preenche no formulario do carrinho devem ser enviados para o whatsapp +

**IMPORTANTE**: Para cada participante (cada pacote), os seguintes dados devem ser enviados:

### Dados por Participante:

- Nome Completo: [nome do participante]
- Idade: [idade do participante]
- Número do Tênis: [número do tênis]
- Nível de Experiência: [nível selecionado]
- Declaração de Saúde: [confirmado]

### Dados de Contato de Emergência (por participante):

- Nome do Contato de Emergência: ?
- Telefone do Contato de Emergência: ?

### Dados Adicionais Necessários (por participante):

- RG:?
- CPF:?
- Data de Nascimento:?
- Email:?
- Endereço:?
- Cidade:?
- Estado:?
- CEP:?

**Observação**: Se houver múltiplos participantes, os dados devem ser organizados por pessoa, identificando claramente qual participante cada informação pertence.

### Métodos de Pagamento:

1. **WhatsApp (Prioritário)**
   - Gera link direto para WhatsApp
   - Inclui resumo do pedido
   - Permite pagamento via PIX ou transferência

2. **Mercado Pago (Fallback)**
   - Redirecionamento para checkout online
   - Múltiplas formas de pagamento
   - Processamento automático

## Estrutura de Dados

### Dados Coletados:

```typescript
interface FormData {
  participantDetails: Record<string, ParticipantDetails>; // Chave = ID do item do carrinho
  climbingDetails: ClimbingDetails;
}

// Cada item no carrinho gera um conjunto de dados de participante
interface CartItem {
  id: string; // ID único do item no carrinho
  packageId: string; // ID do pacote selecionado
  packageName: string; // Nome do pacote
  price: number; // Preço do pacote
  quantity: number; // Sempre 1 (1 pacote = 1 pessoa)
}
```

interface ParticipantDetails {
name: string;
age: number;
experienceLevel: 'beginner' | 'intermediate' | 'advanced';
emergencyContact: EmergencyContact;
healthDeclaration: boolean;
}

interface EmergencyContact {
name: string;
phone: string;
}

interface ClimbingDetails {
selectedDate: Date;
specialRequests?: string;
dietaryRestrictions?: string[];
}

```

## Pacotes Disponíveis

### Pacote AGARRÃO (Básico)
- **Preço**: R$ 199,00
- **Idade mínima**: 12 anos
- **Máximo de participantes**: 8
- **Experiência necessária**: Não

### Pacote CRUX (Intermediário)
- **Preço**: R$ 299,00
- **Idade mínima**: 12 anos
- **Máximo de participantes**: 6
- **Experiência necessária**: Não
- **Destaque**: Pacote mais popular

### Pacote ALMA VERTICAL (Avançado)
- **Preço**: R$ 435,00
- **Idade mínima**: 12 anos
- **Máximo de participantes**: 4
- **Experiência necessária**: Sim
- **Duração**: 2 dias

## Considerações de Segurança

### Validações Implementadas:
- Verificação de idade mínima por pacote
- Declaração obrigatória de saúde
- Contato de emergência obrigatório
- Autenticação do usuário antes da finalização

### Dados Sensíveis:
- Informações pessoais são coletadas apenas para fins de segurança
- Contatos de emergência são obrigatórios para todas as atividades
- Declaração de saúde é necessária para participação

## Responsividade

### Design Adaptativo:
- Interface otimizada para dispositivos móveis
- Campos de formulário responsivos
- Navegação por etapas em telas pequenas
- Indicadores visuais de progresso

## Tratamento de Erros

### Cenários de Erro:
1. **Usuário não autenticado**
   - Alerta: "Usuário não autenticado"
   - Ação: Redirecionamento para login

2. **Erro na criação do pedido**
   - Alerta: "Erro ao processar pedido"
   - Ação: Tentativa de reprocessamento

3. **Falha no pagamento**
   - Fallback automático entre WhatsApp e Mercado Pago
   - Mensagens de erro específicas

## Melhorias Futuras

### Funcionalidades Planejadas:
- Múltiplas datas disponíveis
- Seleção de horários
- Upload de documentos médicos
- Histórico de pedidos
- Notificações por email/SMS
- Sistema de avaliações pós-atividade

---

**Última atualização**: Dezembro 2024
**Versão do documento**: 1.0
**Responsável**: Equipe XperienceClimb
```
