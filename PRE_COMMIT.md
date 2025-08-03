# Pre-commit Hooks

Este projeto utiliza Husky para executar hooks antes de cada commit, garantindo a qualidade do código.

## Configuração Atual

### Hook Principal (`.husky/pre-commit`)

O hook principal executa:

1. **Linting e Formatação**: `npm run pre-commit`
   - Executa ESLint e Prettier nos arquivos modificados
   - Corrige automaticamente problemas de formatação

2. **Testes**: `yarn test:pre-commit`
   - Executa todos os testes com Jest
   - **FALHA O COMMIT** se qualquer teste falhar
   - Usa opções otimizadas para velocidade (`--bail`, `--silent`, `--maxWorkers=50%`)

## Scripts Disponíveis

### `yarn test:pre-commit`

- Executa todos os testes
- Para na primeira falha (`--bail`)
- Execução silenciosa (`--silent`)
- Otimizado para velocidade (`--maxWorkers=50%`)
- **Usado pelo pre-commit hook**

### `yarn test`

- Executa todos os testes com saída completa
- Útil para desenvolvimento e debugging

### `yarn test:watch`

- Executa testes em modo watch
- Útil para desenvolvimento

### `yarn test:coverage`

- Executa testes com relatório de cobertura

## Backup Option

Se você precisar fazer um commit com testes falhando (emergência):

```bash
# Opção 1: Forçar commit ignorando hooks
git commit --no-verify

# Opção 2: Usar script permissivo temporariamente
node scripts/pre-commit-tests.js
```

## Troubleshooting

### Testes Falhando no Pre-commit

1. **Execute os testes manualmente**:

   ```bash
   yarn test
   ```

2. **Corrija os problemas identificados**

3. **Tente o commit novamente**:
   ```bash
   git add .
   git commit -m "sua mensagem"
   ```

### Hook Não Executando

1. **Verifique se Husky está instalado**:

   ```bash
   yarn prepare
   ```

2. **Verifique permissões**:

   ```bash
   chmod +x .husky/pre-commit
   ```

3. **Reinstale Husky se necessário**:
   ```bash
   yarn add -D husky
   yarn prepare
   ```

## Benefícios

- ✅ **Qualidade Garantida**: Código só é commitado se todos os testes passarem
- ✅ **Formatação Consistente**: ESLint e Prettier mantêm padrões
- ✅ **Feedback Rápido**: Problemas são identificados antes do commit
- ✅ **Histórico Limpo**: Commits sempre contêm código testado

## Fluxo de Trabalho

1. **Desenvolva** seu código
2. **Teste** localmente: `yarn test`
3. **Faça commit**: `git commit -m "sua mensagem"`
4. **Pre-commit hook executa automaticamente**:
   - Linting e formatação
   - Testes
   - Commit só prossegue se tudo passar

## Configuração do IDE

Para melhor experiência, configure seu IDE para:

- **ESLint**: Executar automaticamente
- **Prettier**: Formatar ao salvar
- **Jest**: Executar testes em background

Isso garante que problemas sejam identificados antes mesmo do commit.
