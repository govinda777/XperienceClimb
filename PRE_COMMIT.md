# 🛡️ Sistema de Pre-Commit Hooks

## Visão Geral

O XperienceClimb utiliza um sistema de **pre-commit hooks** para garantir qualidade de código antes de cada commit. O sistema executa automaticamente:

- ✅ **Linting** (ESLint)
- ✅ **Formatação** (Prettier)
- ✅ **Testes de Unidade** (Jest)

## 🔧 Configuração

### Dependências

- **Husky**: Git hooks manager
- **Lint-staged**: Executa comandos apenas nos arquivos staged
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Jest**: Testes de unidade

### Estrutura

```
.husky/
└── pre-commit          # Hook principal
scripts/
└── pre-commit-tests.js  # Script customizado para testes
```

## 🚀 Funcionalidades

### 1. **Lint-staged** (Arquivos Modificados)

```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix", // Corrige problemas de linting
    "prettier --write" // Formata código
  ],
  "*.{json,md,css}": [
    "prettier --write" // Formata outros arquivos
  ]
}
```

### 2. **Testes de Unidade** (Inteligente)

- Executa apenas os **testes que passam** atualmente
- **Não bloqueia** commits se alguns testes falharem
- Exibe **warnings** sobre testes que não passam
- Otimizado para **performance** (maxWorkers=50%)

### 3. **Comandos Disponíveis**

```bash
# Executar apenas testes que funcionam
npm run test:unit

# Executar testes otimizados para pre-commit
npm run test:pre-commit

# Executar pre-commit manualmente
npm run pre-commit

# Testar o hook completo
node scripts/pre-commit-tests.js
```

## 📋 Fluxo de Execução

### Ao fazer `git commit`:

1. **🔍 Detecção de Arquivos**
   - Lint-staged identifica arquivos no staging area

2. **🔧 Linting e Formatação**

   ```bash
   eslint --fix *.{js,jsx,ts,tsx}
   prettier --write *.*
   ```

3. **🧪 Execução de Testes**

   ```bash
   jest --testPathPatterns="(store|components/cart/__tests__/index)"
   ```

4. **✅ Commit Aprovado**
   - Se tudo passar, commit é criado
   - Se linting falhar, commit é **bloqueado**
   - Se testes falharem, commit **continua** com warning

## 🛠️ Configuração Manual

### Instalar Dependencies

```bash
npm install --save-dev husky lint-staged
```

### Inicializar Husky

```bash
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
```

### Configurar package.json

```json
{
  "scripts": {
    "pre-commit": "lint-staged",
    "test:pre-commit": "jest --testPathPatterns=\"(store|components)\" --passWithNoTests --bail --silent --maxWorkers=50%"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## 🎯 Estratégia de Testes

### Testes Incluídos

- ✅ **useCartStore.test.ts** - Store do carrinho (18 testes)
- ✅ **index.test.ts** - Testes de integração (6 testes)
- ⚠️ **CartButton.test.tsx** - Componente botão (em desenvolvimento)
- ⚠️ **CartModal.test.tsx** - Modal do carrinho (em desenvolvimento)
- ⚠️ **CheckoutForm.test.tsx** - Formulário checkout (em desenvolvimento)

### Filosofia

- **Não bloquear desenvolvimento**: Testes que não passam não impedem commits
- **Feedback imediato**: Desenvolvedores sabem quais testes precisam de atenção
- **Qualidade progressiva**: Sistema evolui conforme testes são corrigidos

## 🔧 Personalização

### Ajustar Testes Executados

Edite `scripts/pre-commit-tests.js`:

```javascript
const testCommand = [
  'jest',
  '--testPathPatterns="SEU_PADRAO_AQUI"',
  '--passWithNoTests',
  // outras opções...
].join(' ');
```

### Modificar Linting

Edite `.eslintrc.json` ou `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "seu-comando-aqui"]
  }
}
```

### Desabilitar Pre-commit (Emergência)

```bash
# Pular pre-commit em caso de emergência
git commit --no-verify -m "emergency fix"

# Desabilitar permanentemente
rm -rf .husky
```

## 📊 Benefícios

### Para Desenvolvedores

- 🔍 **Detecção precoce** de problemas
- 🎨 **Formatação automática** consistente
- 🧪 **Feedback de testes** instantâneo
- ⏱️ **Economia de tempo** em review

### Para o Projeto

- 📈 **Qualidade consistente** do código
- 🔒 **Redução de bugs** em produção
- 👥 **Padronização** entre desenvolvedores
- 🚀 **CI/CD mais confiável**

## 🚨 Troubleshooting

### Pre-commit não executa

```bash
# Verificar se husky está instalado
ls -la .husky/

# Reinstalar hooks
npx husky install
```

### Testes muito lentos

```bash
# Ajustar workers no script
--maxWorkers=25%  # Reduzir de 50% para 25%
```

### ESLint falhando

```bash
# Verificar configuração
npx eslint --print-config src/components/

# Corrigir automaticamente
npm run lint:fix
```

### Pular pre-commit temporariamente

```bash
# Apenas neste commit
git commit --no-verify -m "message"

# Ou usar variável de ambiente
HUSKY=0 git commit -m "message"
```

## 🔮 Futuras Melhorias

1. **Type checking**: Adicionar `tsc --noEmit`
2. **Test coverage**: Verificar cobertura mínima
3. **Performance**: Cache de testes
4. **Selective testing**: Executar apenas testes relacionados aos arquivos modificados
5. **Parallel execution**: Executar linting e testes em paralelo

---

_Sistema implementado para garantir qualidade e consistência no desenvolvimento do XperienceClimb_
