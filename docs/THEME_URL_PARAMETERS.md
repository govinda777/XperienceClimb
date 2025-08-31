# 🎨 Theme Query Parameters

O sistema de temas do XperienceClimb agora suporta mudança de temas via query parameters na URL, permitindo compartilhar links específicos para cada destino de escalada.

## 🌐 URLs Disponíveis

### Fazenda Ipanema (Floresta Nacional de Ipanema)
```
https://xperienceclimb.vercel.app/?theme=fazenda-ipanema
```

### Pedra Bela
```
https://xperienceclimb.vercel.app/?theme=pedra-bela
```

## 🔧 Como Funciona

### 1. Seleção via URL
- Acesse a URL com o parâmetro `?theme=pedra-bela` ou `?theme=fazenda-ipanema`
- O tema será automaticamente carregado e aplicado
- O seletor de temas mostrará um indicador visual (●) quando o tema vier da URL

### 2. Mudança Dinâmica
- Use o seletor de temas no cabeçalho da página
- A URL será automaticamente atualizada com o novo tema
- O tema será salvo no localStorage para futuras visitas

### 3. Prioridade de Carregamento
1. **Query Parameter** - Se presente na URL, tem prioridade máxima
2. **LocalStorage** - Tema salvo anteriormente pelo usuário
3. **Padrão** - Fazenda Ipanema como tema padrão

## 📱 Exemplos de Uso

### Links Diretos para Destinos
```html
<!-- Link para Pedra Bela -->
<a href="https://xperienceclimb.vercel.app/?theme=pedra-bela">
  Conheça Pedra Bela
</a>

<!-- Link para Fazenda Ipanema -->
<a href="https://xperienceclimb.vercel.app/?theme=fazenda-ipanema">
  Conheça Fazenda Ipanema
</a>
```

### Compartilhamento em Redes Sociais
```javascript
// URL para compartilhar Pedra Bela
const pedraBelaUrl = 'https://xperienceclimb.vercel.app/?theme=pedra-bela';

// URL para compartilhar Fazenda Ipanema  
const fazendaIpanemaUrl = 'https://xperienceclimb.vercel.app/?theme=fazenda-ipanema';
```

## 🎯 Características dos Temas

### Pedra Bela (`pedra-bela`)
- **Localização**: Pedra Bela, São Paulo (119km de São Paulo)
- **Atividades**: Tirolesa de 2km, escalada, cachoeiras, quadriciclo
- **Destaque**: Maior tirolesa da América Latina
- **Cores**: Tons de laranja e vermelho

### Fazenda Ipanema (`fazenda-ipanema`)
- **Localização**: Iperó, São Paulo (120km de São Paulo)
- **Atividades**: Escalada técnica em quartzito
- **Destaque**: Unidade de Conservação Federal (ICMBio)
- **Cores**: Tons de verde da Mata Atlântica

## 🔧 Implementação Técnica

### Estrutura de Arquivos
```
src/
├── themes/
│   ├── configs/
│   │   ├── pedra-bela.ts          # Configuração do tema Pedra Bela
│   │   └── fazenda-ipanema.ts      # Configuração do tema Fazenda Ipanema
│   └── ThemeProvider.tsx          # Provider com lógica de query params
├── components/theme/
│   └── ThemeSelector.tsx          # Seletor com indicador visual
└── lib/
    └── theme-utils.ts             # Funções utilitárias
```

### Funções Utilitárias
```typescript
import { generateThemeUrl, getThemeFromUrl, isValidThemeId } from '@/lib/theme-utils';

// Gerar URL com tema
const url = generateThemeUrl('/home', 'pedra-bela');
// Resultado: '/home?theme=pedra-bela'

// Verificar tema da URL
const theme = getThemeFromUrl(searchParams);
// Resultado: 'pedra-bela' ou null

// Validar ID do tema
const isValid = isValidThemeId('pedra-bela');
// Resultado: true
```

## 🚀 Benefícios

### Para Usuários
- **Links Diretos**: Acesse diretamente o destino desejado
- **Compartilhamento**: Compartilhe links específicos para cada destino
- **Persistência**: Tema salvo automaticamente para próximas visitas
- **Indicador Visual**: Saiba quando o tema veio da URL

### Para Marketing
- **Campanhas Específicas**: Links diretos para cada destino
- **SEO Otimizado**: URLs específicas para cada tema
- **Analytics**: Rastreamento de preferências por destino
- **Conversão**: Redução de passos para escolha do destino

## 🔍 Testando

### URLs de Teste
1. **Tema Padrão**: `https://xperienceclimb.vercel.app/`
2. **Pedra Bela**: `https://xperienceclimb.vercel.app/?theme=pedra-bela`
3. **Fazenda Ipanema**: `https://xperienceclimb.vercel.app/?theme=fazenda-ipanema`

### Verificações
- ✅ Tema carrega corretamente da URL
- ✅ Seletor mostra indicador visual
- ✅ URL atualiza ao trocar tema
- ✅ Tema persiste no localStorage
- ✅ SEO meta tags atualizam
- ✅ Título da página atualiza

## 📝 Notas Importantes

- Os temas são carregados estaticamente para performance
- O sistema funciona tanto no cliente quanto no servidor
- URLs inválidas redirecionam para o tema padrão
- O indicador visual (●) aparece apenas quando o tema vem da URL
- Todas as mudanças são instantâneas sem reload da página
