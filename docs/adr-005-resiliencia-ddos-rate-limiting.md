# ADR-005: Resiliência a DDoS e Rate Limiting no Ambiente Serverless

## Status

Aceito

## Contexto

O endpoint de chat da aplicação (`/api/chat`) comunica-se diretamente com a API do Gemini, o que gera custos de consumo baseados em tokens. Caso ocorra um ataque de negação de serviço (DDoS) ou abuso por meio de scripts/bots automatizados, o limite de requisições do Gemini pode ser atingido rapidamente e a fatura de consumo de API pode crescer de forma descontrolada.

Atualmente, o projeto utiliza um sistema de rate limiting simplificado baseado em memória (`Map` do JavaScript). No entanto, como a aplicação Next.js é implantada na Vercel utilizando Serverless Functions:

1. O estado da memória não é compartilhado entre diferentes instâncias da função que respondem a requisições concorrentes.
2. O mapa de rate limit em memória é resetado a cada cold start (quando a função serverless é reciclada pela Vercel).
3. Isso resulta em um rate limit ineficaz contra ataques DDoS distribuídos na camada de aplicação.

## Decisão

Implementar uma arquitetura de proteção em camadas para mitigação de DDoS e controle de abuso no endpoint `/api/chat`:

1. **Rate Limiting Distribuído e Persistente (Vercel KV / Upstash Redis):**
   Utilizar o Redis (através do serviço Vercel KV ou Upstash) acoplado com o algoritmo _Sliding Window_ da biblioteca `@upstash/ratelimit` para persistir o contador de requisições por IP de forma global em todos os nós da borda (Edge/Serverless).

2. **Mecanismo de Fallback Gracioso:**
   Para garantir que o ambiente de desenvolvimento local funcione sem exigir credenciais ativas do Redis, o código do rate limiter deve detectar a ausência das variáveis de ambiente (`KV_REST_API_URL` e `KV_REST_API_TOKEN`) e reverter automaticamente para o rate limit em memória com log de aviso.

3. **Recomendações de Infraestrutura:**
   - **Vercel Web Application Firewall (WAF) / Firewall Rules:** Bloqueio de tráfego de IPs maliciosos ou geolocalizações não-alvo.
   - **Integração com Cloudflare (Opcional/Recomendado):** Utilizar proteção contra bots e desafios de navegador (Turnstile ou JS Challenge) para a rota `/api/chat`.

## Consequências

### Positivas

- **Segurança de Custo:** Protege a API Key do Gemini contra faturamento excessivo por abuso automatizado.
- **Consistência:** O rate limit funciona uniformemente em qualquer instância serverless ou região da Vercel.
- **Desenvolvimento Simplificado:** O fallback para o limitador em memória garante que o projeto continue executável localmente sem configurações adicionais complexas.

### Negativas

- Introduz uma pequena latência adicional (normalmente < 15ms) na validação da requisição ao consultar o Redis na borda.
- Dependência de um serviço de banco de dados chave-valor (Vercel KV ou Upstash Redis) no ambiente de produção.
