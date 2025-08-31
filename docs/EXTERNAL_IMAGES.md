# 🌐 Sistema de Imagens Externas

Este documento explica como usar o sistema de imagens externas implementado no XperienceClimb, que permite usar URLs de serviços externos em vez de armazenar imagens localmente.

## 📋 Visão Geral

O sistema de imagens externas oferece as seguintes vantagens:

- **💾 Economia de armazenamento**: Não precisa hospedar imagens localmente
- **🚀 Performance**: CDNs especializadas em imagens
- **🔄 Flexibilidade**: Fácil troca de imagens sem reupload
- **💰 Economia**: Redução de custos de hospedagem
- **📱 Responsividade**: Otimização automática de tamanhos

## 🛠️ Configuração

### 1. Next.js Config

O `next.config.js` já está configurado para aceitar domínios externos:

```javascript
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'via.placeholder.com',
      // ... outros domínios
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
```

### 2. Tipos Atualizados

A interface `GalleryImage` foi expandida:

```typescript
interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean; // Indica se é URL externa
  externalDomain?: string; // Domínio para validação
}
```

## 🎨 Serviços Suportados

### Unsplash
```typescript
{
  src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  alt: 'Escalada técnica',
  title: 'Escalada Técnica',
  category: 'climb',
  isExternal: true,
  externalDomain: 'images.unsplash.com'
}
```

### Picsum (Placeholder)
```typescript
{
  src: 'https://picsum.photos/800/600?random=123',
  alt: 'Imagem placeholder',
  title: 'Placeholder',
  category: 'nature',
  isExternal: true,
  externalDomain: 'picsum.photos'
}
```

### Placeholder.com
```typescript
{
  src: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=Imagem',
  alt: 'Imagem placeholder',
  title: 'Placeholder',
  category: 'equipment',
  isExternal: true,
  externalDomain: 'via.placeholder.com'
}
```

### URLs Customizadas
```typescript
{
  src: 'https://meu-cdn.com/imagem.jpg',
  alt: 'Minha imagem',
  title: 'Imagem Customizada',
  category: 'climb',
  isExternal: true,
  externalDomain: 'meu-cdn.com'
}
```

## 🔧 Utilitários

### Funções Disponíveis

```typescript
import { 
  isExternalUrl, 
  extractDomain, 
  isValidImageUrl, 
  normalizeImageUrl,
  getPlaceholderUrl,
  getUnsplashUrl,
  getPicsumUrl,
  configureImage 
} from '@/lib/image-utils';
```

### Exemplos de Uso

```typescript
// Verificar se é URL externa
const isExternal = isExternalUrl('https://images.unsplash.com/photo.jpg');

// Extrair domínio
const domain = extractDomain('https://images.unsplash.com/photo.jpg');
// Retorna: 'images.unsplash.com'

// Validar URL
const isValid = isValidImageUrl('https://images.unsplash.com/photo.jpg');

// Normalizar URL
const normalized = normalizeImageUrl('//images.unsplash.com/photo.jpg');
// Retorna: 'https://images.unsplash.com/photo.jpg'

// Gerar placeholder
const placeholder = getPlaceholderUrl(800, 600, 'Escalada');
// Retorna: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=Escalada'

// Gerar URL do Unsplash
const unsplash = getUnsplashUrl(800, 600, 'rock climbing');
// Retorna: 'https://images.unsplash.com/random/800x600?rock%20climbing'

// Configurar imagem
const image = configureImage({
  src: 'https://images.unsplash.com/photo.jpg',
  alt: 'Escalada',
  title: 'Escalada Técnica',
  category: 'climb'
});
```

## 🎯 Como Usar nos Temas

### 1. Configuração Manual

```typescript
// src/themes/configs/meu-tema.ts
export const meuTemaTheme: ThemeConfig = {
  // ... outras configurações
  gallery: {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalador nas rochas',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      // ... mais imagens
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza'
    }
  }
};
```

### 2. Script Automático

Use o script para criar temas com imagens externas:

```bash
node scripts/create-theme-with-external-images.js
```

O script irá:
- Perguntar sobre o tema
- Oferecer serviços de imagem
- Gerar URLs automaticamente
- Criar o arquivo de configuração

## 🖼️ Componentes Atualizados

### GallerySection

O componente já está atualizado para:
- Normalizar URLs automaticamente
- Mostrar indicador de imagem externa
- Tratar erros de carregamento
- Desabilitar otimização para imagens externas

### AboutSection

Também atualizado para:
- Usar URLs normalizadas
- Tratar imagens externas
- Fallback para imagens locais

## 🔒 Segurança

### Validação de Domínios

O sistema valida domínios confiáveis:

```typescript
const trustedDomains = [
  'images.unsplash.com',
  'picsum.photos',
  'via.placeholder.com',
  'imgur.com',
  'cloudinary.com',
  // ... outros domínios
];
```

### URLs Permitidas

- URLs que começam com `http://` ou `https://`
- URLs com protocolo relativo (`//`)
- URLs locais (que começam com `/`)

## 📱 Responsividade

### Otimização Automática

O Next.js Image otimiza automaticamente:

```typescript
<Image
  src={normalizeImageUrl(image.src)}
  alt={image.alt}
  fill
  className="object-cover"
  unoptimized={image.isExternal} // Desabilita para externas
/>
```

### Parâmetros de URL

Muitos serviços suportam parâmetros:

```typescript
// Unsplash
'https://images.unsplash.com/photo.jpg?w=800&h=600&fit=crop&q=80'

// Picsum
'https://picsum.photos/800/600?random=123&blur=2'

// Placeholder
'https://via.placeholder.com/800x600/CCCCCC/666666?text=Imagem'
```

## 🚀 Performance

### Lazy Loading

O Next.js Image já implementa lazy loading:

```typescript
<Image
  src={image.src}
  alt={image.alt}
  loading="lazy" // Carregamento preguiçoso
  placeholder="blur" // Placeholder blur
/>
```

### Cache

Imagens externas são cacheadas pelo navegador e CDNs.

## 🔧 Troubleshooting

### Erro: "Invalid src prop"

**Problema**: URL inválida ou domínio não permitido

**Solução**:
1. Verifique se a URL está correta
2. Adicione o domínio ao `next.config.js`
3. Use `normalizeImageUrl()` para normalizar

### Erro: "Image failed to load"

**Problema**: Imagem não carrega

**Solução**:
1. Verifique se a URL está acessível
2. Use fallback com `onError`
3. Considere usar placeholder

### Erro: "Domain not allowed"

**Problema**: Domínio não está na lista de confiança

**Solução**:
1. Adicione o domínio ao `next.config.js`
2. Ou use um serviço já suportado

## 📚 Exemplos Completos

### Tema com Imagens Externas

```typescript
// src/themes/configs/exemplo-externo.ts
export const exemploExternoTheme: ThemeConfig = {
  id: 'exemplo-externo',
  name: 'Exemplo com Imagens Externas',
  // ... outras configurações
  gallery: {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalada técnica em rocha',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true,
        externalDomain: 'images.unsplash.com'
      },
      {
        src: 'https://picsum.photos/800/600?random=1',
        alt: 'Paisagem natural',
        title: 'Paisagem Natural',
        category: 'nature',
        isExternal: true,
        externalDomain: 'picsum.photos'
      },
      {
        src: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=Equipamentos',
        alt: 'Equipamentos de escalada',
        title: 'Equipamentos',
        category: 'equipment',
        isExternal: true,
        externalDomain: 'via.placeholder.com'
      }
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos'
    }
  }
};
```

### Hook Customizado

```typescript
// src/hooks/useExternalImages.ts
import { useState, useEffect } from 'react';
import { isValidImageUrl, normalizeImageUrl } from '@/lib/image-utils';

export function useExternalImages(images: GalleryImage[]) {
  const [validImages, setValidImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateImages = async () => {
      const valid = images.filter(img => isValidImageUrl(img.src));
      setValidImages(valid);
      setLoading(false);
    };

    validateImages();
  }, [images]);

  return { validImages, loading };
}
```

## 🎯 Próximos Passos

1. **Teste o sistema** com os temas existentes
2. **Crie novos temas** usando o script
3. **Personalize URLs** conforme necessário
4. **Monitore performance** das imagens externas
5. **Considere cache** para melhor performance

## 📞 Suporte

Para dúvidas sobre o sistema de imagens externas:

- Consulte este documento
- Verifique os exemplos nos temas
- Use o script de criação automática
- Teste com diferentes serviços

---

**Sistema de Imagens Externas - XperienceClimb** 🏔️
