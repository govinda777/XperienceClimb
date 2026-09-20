# Tutorial: Controle de Acesso IP no DataForSEO

Este guia explica o que é o recurso de **Acesso IP (IP Whitelist)** do [DataForSEO](https://app.dataforseo.com/api-access), quando utilizá-lo, o motivo do aviso de segurança emitido pela própria plataforma e o passo a passo prático para configuração.

---

## 1. O que é o Acesso IP?

O **Acesso IP** é uma camada de proteção perimetral no DataForSEO. Quando ativado, a API passa a aceitar requisições **exclusivamente** dos endereços IP (IPv4 ou IPv6) cadastrados na lista de permissões (_whitelist_). Qualquer requisição vinda de um IP não listado é rejeitada com status de erro `403 Forbidden`.

---

## 2. Por que o DataForSEO exibe o aviso de atenção?

> [!WARNING]
> _"Evite usar essa configuração com o conector DataForSEO ou outras ferramentas de integração para garantir a funcionalidade adequada."_

A razão técnica por trás desse alerta é simples:

1. **IPs Dinâmicos de Conectores em Nuvem:** Se você integrar sua conta DataForSEO com o **OpenSEO (SaaS)**, **Vercel**, **Cloudflare Workers** ou ferramentas no-code, os servidores dessas plataformas realizam chamadas a partir de centenas de IPs dinâmicos que mudam constantemente. Bloquear o acesso por IP impedirá que esses conectores funcionem.
2. **IPs Residenciais Dinâmicos:** A maioria dos provedores de internet domésticos no Brasil (Claro, Vivo, etc.) utiliza IP dinâmico, que muda periodicamente ou sempre que o modem é reiniciado. Se você cadastrar apenas o seu IP atual, a API deixará de funcionar assim que o IP mudar.

---

## 3. Devo configurar o Acesso IP para o projeto XperienceClimb?

| Cenário de Uso                         | Recomendação                              | Motivo                                                                                                                                                            |
| :------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenSEO Nuvem + Agentes Locais**     | ❌ **Manter desativado** (ou lista vazia) | Garante que o OpenSEO e as chamadas locais funcionem sem interrupção por troca de IP.                                                                             |
| **Scripts locais na sua máquina**      | ⚠️ **Opcional com cautela**               | Você precisará atualizar a lista sempre que seu provedor de internet alterar seu IP.                                                                              |
| **Servidor de Produção / VPS Própria** | ✅ **Altamente recomendado**              | Se você tiver um servidor dedicado com **IP Fixo/Estático** (ex: AWS Elastic IP, DigitalOcean Droplet), cadastrar o IP protege suas credenciais contra vazamento. |

---

## 4. Passo a Passo de Configuração

Caso você tenha um **servidor com IP fixo** ou queira restringir o acesso ao seu IP atual:

### Passo 1: Descobrir o seu IP Público Atual

No terminal, execute o comando:

```bash
curl -s https://ifconfig.me
```

_O retorno será o seu endereço IPv4 público (ex: `177.136.241.10`)._

Se estiver configurando um servidor de produção (VPS/Cloud), obtenha o IP estático do servidor:

```bash
curl -s https://api.ipify.org
```

---

### Passo 2: Acessar o Painel do DataForSEO

1. Acesse [app.dataforseo.com/api-access](https://app.dataforseo.com/api-access).
2. Localize a seção **Acesso IP** (_IP Access_).
3. Clique em **Adicionar IP** (_Add IP_).

---

### Passo 3: Cadastrar os Endereços Permitidos

1. Insira o endereço IP identificado no Passo 1.
2. Se você trabalha com múltiplos ambientes, cadastre todos:
   - IP do servidor de produção (VPS).
   - IP do servidor de homologação/staging.
   - IP do seu escritório ou VPN corporativa fixa.
3. Salve as alterações.

---

### Passo 4: Testar a Conexão

Após salvar, faça uma chamada de verificação no terminal:

```bash
curl -s -X GET https://api.dataforseo.com/v3/appendix/user_data \
  -H "Authorization: Basic <SUA_CHAVE_BASE64_AQUI>" | grep -o '"status_code":[0-9]*'
```

- **Se o retorno for `"status_code":20000`:** Seu IP está liberado e a conexão está funcionando.
- **Se o retorno for erro de autenticação ou IP restrito:** Seu IP atual não foi reconhecido ou houve divergência.

---

## 5. Como Reverter ou Desbloquear

Se por algum motivo suas chamadas começarem a falhar por bloqueio de IP:

1. Acesse o painel web [DataForSEO API Access](https://app.dataforseo.com/api-access) pelo navegador.
2. Na seção **Acesso IP**, remova os IPs cadastrados ou desative a trava.
3. Quando a lista estiver vazia, o DataForSEO volta a aceitar qualquer chamada autenticada com seu Login/Senha (Basic Auth), independentemente da origem.
