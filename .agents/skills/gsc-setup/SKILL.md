---
name: gsc-setup
description: >-
  Guia interativo para configurar e conectar o Google Search Console (GSC)
  ao OpenSEO e ao Next.js da XperienceClimb. Recebe o e-mail de login do usuário,
  orienta a criacao/delegacao da propriedade, injeta a tag de verificacao no codigo
  e valida a sincronizacao no painel do OpenSEO.
---

# GSC Setup Skill (Google Search Console & OpenSEO)

Esta skill orienta e automatiza a configuracao do **Google Search Console** para a **Xperience Climb** (`climb.xperiencehubs.com`) e sua integracao ao **OpenSEO**, resolvendo problemas como o aviso _"No properties available"_.

---

## 1. Visao Geral do Problema & Objetivo

Quando o OpenSEO exibe **"Not connected / No properties available"** para a conta conectada (ex: `govinda@govindasystems.com`), isso significa que:

1. A conta Google autenticada no OpenSEO ainda nao e proprietaria verificada da URL `https://climb.xperiencehubs.com/` no Google Search Console.
2. Ou a propriedade foi criada sob outro e-mail Google e precisa ter o acesso delegado para `govinda@govindasystems.com`.
3. Ou a propriedade ainda nao foi criada no Google Search Console.

**Custo:** R$ 0,00 (100% gratuito).

---

## 2. Fluxo de Execucao Passo a Passo

Sempre que esta skill for acionada ou o usuario pedir ajuda para configurar o Search Console:

### Passo 1: Identificar o Login / E-mail da Conta Google

Pergunte ou confirme com o usuario:

1. **Qual e-mail Google voce deseja usar como proprietario principal?**
   - **Opcao 1 (Recomendada):** `govinda@govindasystems.com` (ja logado no OpenSEO conforme o painel).
   - **Opcao 2:** Outra conta Google pessoal/corporativa (ex: conta que gerencia o DNS ou o Google Analytics).

---

### Passo 2: Criar a Propriedade no Google Search Console

Oriente o usuario a:

1. Acessar [Google Search Console](https://search.google.com/search-console/welcome) com o e-mail escolhido.
2. Na tela de adicionar propriedade, selecionar **"Prefixo do URL"** (URL prefix):
   - Inserir exatamente: `https://climb.xperiencehubs.com/`
   - _(Dica: Se preferir propriedade de Dominio completo `xperiencehubs.com`, sera necessaria entrada DNS TXT)._
3. Clicar em **Continuar**.

---

### Passo 3: Obter o Codigo de Verificacao & Injetar no Next.js

Na tela de metodos de verificacao do Google Search Console:

1. O Google oferece varios metodos. O mais rapido e confiavel para Next.js e a **Tag HTML** (`<meta name="google-site-verification" content="..." />`) ou o **Arquivo HTML**.
2. **Solicite ao usuario** a chave que aparece dentro do atributo `content="..."` (ou a linha inteira da tag HTML).
3. **Injecao automatica no codigo:**
   Abra `src/app/layout.tsx` e adicione a propriedade `verification` dentro de `metadata`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://climb.xperiencehubs.com'),
  title: {
    default: 'Vivência de Escalada em Rocha | Xperience Climb',
    template: '%s | Xperience Climb',
  },
  // ... demais campos existentes ...
  verification: {
    google: 'CODIGO_FORNECIDO_PELO_USUARIO',
  },
};
```

_(Ou, se o usuario baixar o arquivo `google[hash].html`, salve-o diretamente na pasta `public/` do projeto)._

4. Execute `npm run build` ou o linter para garantir que a alteracao esta valida.

---

### Passo 4: Concluir a Verificacao no Google

1. Peça ao usuario para voltar na aba do Google Search Console e clicar no botao verde **"Verificar"**.
2. O Google detectara a meta tag no HTML da pagina e confirmara: _"Propriedade verificada com sucesso"_.

---

### Passo 5: Vincular a Propriedade no OpenSEO

1. Com a propriedade verificada, oriente o usuario a acessar a pagina de integracao no OpenSEO:
   - `https://app.openseo.so/p/0e5c4f70-39ed-4b1f-a90f-f46de87b4281/search-performance`
2. No seletor **"Choose property"** / **"Select a property..."**:
   - A propriedade `https://climb.xperiencehubs.com/` agora estara visivel na lista suspensa!
   - Clique nela para selecionar e confirmar a conexao.
3. **Validacao via MCP:**
   - O assistente deve chamar a ferramenta `get_search_console_performance` do OpenSEO para confirmar que o status mudou para ativo e relatar os primeiros dados ou a conclusao bem-sucedida da integracao.

---

## 3. Cenarios Alternativos & Troubleshooting

### Cenário A: A propriedade já existe em outro e-mail Google

Se o usuario ja verificou `climb.xperiencehubs.com` em outra conta Google:

1. No Search Console da conta existente: va em **Configuracoes** (Settings) > **Usuarios e permissoes** (Users and permissions).
2. Clique em **Adicionar usuario** (Add user).
3. Digite `govinda@govindasystems.com` e defina a permissao como **Proprietario** (Owner) ou **Total** (Full).
4. No OpenSEO, recarregue a pagina. A propriedade aparecera instantaneamente.

### Cenário B: "No properties available" persiste apos verificacao

1. No OpenSEO, clique em **"Remove account"** ao lado de `govinda@govindasystems.com`.
2. Clique novamente em **"Connect Google Search Console"** para forçar o consentimento OAuth e atualizar a lista de propriedades da API do Google.
