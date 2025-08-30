# 🏔️ XperienceClimb - Guia de Criação de Passeios

## Visão Geral

O XperienceClimb é uma plataforma hotsite para a comunidade de escalada que conecta interessados no esporte com instrutores certificados. A plataforma permite:

- **Criação rápida de novos passeios** com temas personalizados
- **Mudança dinâmica de tema** baseada no passeio selecionado via query parameter
- **Venda de pacotes** via PIX, Bitcoin, USDT e GitHub Pay
- **Gestão completa de tours** com dados de localização, atividades e logística

## 🚀 Como Criar um Novo Passeio

### 1. Executar o Script de Criação

```bash
# No diretório raiz do projeto
node scripts/create-tour.js
```

### 2. Preencher as Informações Solicitadas

O script irá solicitar as seguintes informações:

#### **Informações Básicas**
- **Tour ID**: Identificador único em kebab-case (ex: "pedra-grande")
- **Nome do Tour**: Nome descritivo (ex: "Pedra Grande")

#### **Localização**
- Nome do local
- Endereço completo
- Cidade e Estado
- Distância de São Paulo
- Coordenadas (latitude e longitude)
- URL do Google Maps (opcional)
- Direções passo-a-passo

#### **Conteúdo**
- Título principal (Hero)
- Subtítulo e descrição
- Título e descrição da seção "Sobre"
- Destaques com ícones e descrições
- Caixa de informações adicional

#### **Atividades**
- Nome, descrição e ícone de cada atividade
- Nível de dificuldade (fácil/médio/difícil)
- Duração e preço (opcionais)

#### **Logística**
- Horários de funcionamento
- Ponto de encontro
- Notas importantes
- Dicas para visitantes

#### **SEO**
- Título e descrição para mecanismos de busca
- Palavras-chave
- Imagem Open Graph

#### **Galeria**
- Imagens com categorias
- Títulos e textos alternativos

### 3. Resultado da Criação

Após completar o script, os seguintes arquivos serão criados/atualizados:

```
src/themes/configs/[tour-id].ts     # Configuração do tema
src/themes/configs/index.ts         # Índice atualizado
src/themes/ThemeProvider.tsx        # Provider atualizado
```

## 🎨 Como o Sistema de Temas Funciona

### Seleção Dinâmica via Query Parameter

O tema é selecionado automaticamente baseado no query parameter `theme`:

```
# Exemplos de URLs
https://xperienceclimb.com?theme=fazenda-ipanema
https://xperienceclimb.com?theme=pedra-bela
https://xperienceclimb.com?theme=seu-novo-passeio
```

### Prioridade de Seleção

1. **Query Parameter** (`?theme=tour-id`)
2. **localStorage** (tema salvo anteriormente)
3. **Tema padrão** (Fazenda Ipanema)

### Temas Dinâmicos vs Estáticos

- **Temas Estáticos**: Configurados em arquivos TypeScript
- **Temas Dinâmicos**: Carregados via API a partir dos dados do tour

## 📁 Estrutura de Arquivos Criados

```
XperienceClimb/
├── scripts/
│   └── create-tour.js              # Script de criação
├── src/
│   ├── core/
│   │   ├── entities/
│   │   │   └── Tour.ts             # Entidade Tour
│   │   ├── services/
│   │   │   └── ITourService.ts     # Interface do serviço
│   │   ├── repositories/
│   │   │   └── ITourRepository.ts  # Interface do repositório
│   │   └── use-cases/
│   │       └── tours/              # Casos de uso
│   ├── infrastructure/
│   │   ├── services/
│   │   │   └── TourService.ts      # Implementação do serviço
│   │   └── repositories/
│   │       └── TourRepository.ts   # Repositório em memória
│   ├── app/api/
│   │   └── tours/                  # APIs REST
│   └── themes/
│       ├── configs/
│       │   └── [tour-id].ts        # Configurações de tema
│       └── ThemeProvider.tsx       # Provider atualizado
└── public/images/themes/
    └── [tour-id]/                  # Imagens do tour
```

## 🛠️ APIs Disponíveis

### Listar Tours
```http
GET /api/tours
GET /api/tours?active=false  # Incluir inativos
```

### Obter Tour Específico
```http
GET /api/tours/[id]
```

### Obter Tema do Tour
```http
GET /api/tours/[id]/theme
```

### Criar Novo Tour
```http
POST /api/tours
Content-Type: application/json

{
  "name": "Nome do Tour",
  "themeId": "tour-id",
  "location": { ... },
  "description": "Descrição",
  "activities": [ ... ],
  "logistics": { ... },
  "pricing": { ... },
  "seo": { ... }
}
```

## 🖼️ Adicionando Imagens

Após criar um tour, adicione as imagens na pasta:

```
public/images/themes/[tour-id]/
├── hero-image.jpg
├── gallery-1.jpg
├── gallery-2.jpg
└── og-image.jpg
```

## 💰 Integração com Pagamentos

O sistema já está integrado com:

- **PIX** via Mercado Pago
- **Bitcoin/USDT** via Privy
- **GitHub Pay** para desenvolvedores

Os pacotes são criados automaticamente baseados nos dados do tour.

## 🔧 Personalização Avançada

### Modificar Tema Existente

1. Edite o arquivo `src/themes/configs/[tour-id].ts`
2. Atualize as informações necessárias
3. Reinicie o servidor de desenvolvimento

### Adicionar Novas Funcionalidades

1. **Entidades**: Modifique `src/core/entities/Tour.ts`
2. **Serviços**: Atualize `src/infrastructure/services/TourService.ts`
3. **APIs**: Adicione endpoints em `src/app/api/tours/`

## 🚨 Troubleshooting

### Tema não carrega
- Verifique se o `tour-id` está correto na URL
- Confirme se as imagens estão na pasta correta
- Verifique o console do navegador para erros

### Script de criação falha
- Certifique-se de estar no diretório raiz do projeto
- Verifique se o Node.js está instalado
- Execute `npm install` se necessário

### Erro de API
- Verifique se o servidor está rodando
- Confirme se o tour existe no repositório
- Verifique logs do servidor para detalhes

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação técnica em `ARQ.md`
2. Consulte os testes em `src/__tests__/`
3. Abra uma issue no repositório do projeto

---

**Desenvolvido para a comunidade XperienceClimb** 🧗‍♀️🏔️
