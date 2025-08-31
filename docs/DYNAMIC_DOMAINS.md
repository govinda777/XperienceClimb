# 🔄 Domínios Dinâmicos para Imagens Externas

Este documento explica como usar a abordagem dinâmica para extrair domínios de imagens externas automaticamente, eliminando a necessidade de definir `externalDomain` manualmente.

## 🎯 Visão Geral

A abordagem dinâmica oferece as seguintes vantagens:

- **🚀 Automatização**: Domínios são extraídos automaticamente das URLs
- **🔧 Manutenibilidade**: Menos código manual para manter
- **✅ Precisão**: Elimina erros de digitação em domínios
- **📝 Simplicidade**: Código mais limpo e legível
- **🔄 Flexibilidade**: Fácil mudança de URLs sem atualizar domínios

## 🛠️ Como Usar

### 1. Importar a Função

```typescript
import { processThemeImages } from '@/lib/image-utils';
```

### 2. Configurar Imagens

```typescript
// ❌ Antes (manual)
gallery: {
  images: [
    {
      src: 'https://images.unsplash.com/photo-123.jpg',
      alt: 'Escalada',
      title: 'Escalada Técnica',
      category: 'climb',
      isExternal: true,
      externalDomain: 'images.unsplash.com' // ← Manual
    }
  ]
}

// ✅ Agora (dinâmico)
gallery: {
  images: processThemeImages([
    {
      src: 'https://images.unsplash.com/photo-123.jpg',
      alt: 'Escalada',
      title: 'Escalada Técnica',
      category: 'climb',
      isExternal: true
      // externalDomain é extraído automaticamente
    }
  ])
}
```

## 🔧 Funções Disponíveis

### `processThemeImages(images)`

Processa um array de imagens, extraindo domínios automaticamente:

```typescript
import { processThemeImages } from '@/lib/image-utils';

const processedImages = processThemeImages([
  {
    src: 'https://images.unsplash.com/photo-123.jpg',
    alt: 'Escalada',
    title: 'Escalada Técnica',
    category: 'climb',
    isExternal: true
  },
  {
    src: 'https://picsum.photos/800/600',
    alt: 'Paisagem',
    title: 'Paisagem Natural',
    category: 'nature',
    isExternal: true
  }
]);

// Resultado:
// [
//   {
//     src: 'https://images.unsplash.com/photo-123.jpg',
//     alt: 'Escalada',
//     title: 'Escalada Técnica',
//     category: 'climb',
//     isExternal: true,
//     externalDomain: 'images.unsplash.com' // ← Extraído automaticamente
//   },
//   {
//     src: 'https://picsum.photos/800/600',
//     alt: 'Paisagem',
//     title: 'Paisagem Natural',
//     category: 'nature',
//     isExternal: true,
//     externalDomain: 'picsum.photos' // ← Extraído automaticamente
//   }
// ]
```

### `configureGalleryImage(image)`

Processa uma única imagem:

```typescript
import { configureGalleryImage } from '@/lib/image-utils';

const image = configureGalleryImage({
  src: 'https://images.unsplash.com/photo-123.jpg',
  alt: 'Escalada',
  title: 'Escalada Técnica',
  category: 'climb',
  isExternal: true
});

// Resultado:
// {
//   src: 'https://images.unsplash.com/photo-123.jpg',
//   alt: 'Escalada',
//   title: 'Escalada Técnica',
//   category: 'climb',
//   isExternal: true,
//   externalDomain: 'images.unsplash.com'
// }
```

## 📋 Exemplo Completo

### Tema com Domínios Dinâmicos

```typescript
// src/themes/configs/meu-tema.ts
import { ThemeConfig } from '../types';
import { processThemeImages } from '@/lib/image-utils';

export const meuTemaTheme: ThemeConfig = {
  id: 'meu-tema',
  name: 'Meu Tema',
  // ... outras configurações
  gallery: {
    images: processThemeImages([
      {
        src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        alt: 'Escalada técnica em rocha',
        title: 'Escalada Técnica',
        category: 'climb',
        isExternal: true
      },
      {
        src: 'https://picsum.photos/800/600?random=1',
        alt: 'Paisagem natural',
        title: 'Paisagem Natural',
        category: 'nature',
        isExternal: true
      },
      {
        src: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=Equipamentos',
        alt: 'Equipamentos de escalada',
        title: 'Equipamentos',
        category: 'equipment',
        isExternal: true
      },
      {
        src: 'https://meu-cdn.com/imagem.jpg',
        alt: 'Minha imagem',
        title: 'Imagem Customizada',
        category: 'climb',
        isExternal: true
      }
    ]),
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos'
    }
  }
};
```

## 🔄 Migração de Temas Existentes

### Script Automático

Use o script para migrar todos os temas existentes:

```bash
node scripts/update-themes-dynamic-domains.js
```

O script irá:
- ✅ Adicionar import `processThemeImages`
- ✅ Remover `externalDomain` manuais
- ✅ Envolver imagens com `processThemeImages()`
- ✅ Extrair domínios automaticamente

### Migração Manual

1. **Adicionar import**:
```typescript
import { processThemeImages } from '@/lib/image-utils';
```

2. **Remover externalDomain manuais**:
```typescript
// ❌ Remover isso
externalDomain: 'images.unsplash.com'
```

3. **Envolver com processThemeImages**:
```typescript
// ❌ Antes
images: [
  // ... imagens
],

// ✅ Depois
images: processThemeImages([
  // ... imagens
]),
```

## 🎯 Vantagens da Abordagem Dinâmica

### 1. **Automatização**
- Domínios são extraídos automaticamente
- Não precisa lembrar de atualizar manualmente
- Reduz erros de digitação

### 2. **Manutenibilidade**
- Menos código para manter
- Mudanças de URL não requerem atualização de domínio
- Código mais limpo

### 3. **Precisão**
- Elimina inconsistências entre URL e domínio
- Validação automática de URLs
- Tratamento de casos especiais

### 4. **Flexibilidade**
- Fácil troca de URLs
- Suporte a novos domínios automático
- Configuração simplificada

## 🔧 Detalhes Técnicos

### Extração de Domínio

A função `extractDomain()` extrai o hostname da URL:

```typescript
function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}
```

### Validação de URL Externa

A função `isExternalUrl()` verifica se é uma URL externa:

```typescript
function isExternalUrl(url: string): boolean {
  if (!url) return false;
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return true;
  }
  
  if (url.startsWith('//')) {
    return true;
  }
  
  return false;
}
```

## 🚀 Performance

### Benefícios
- ✅ Processamento em tempo de compilação
- ✅ Sem overhead em runtime
- ✅ Cache automático de domínios extraídos
- ✅ Validação otimizada

### Considerações
- ⚠️ URLs inválidas podem causar erros
- ⚠️ Domínios não confiáveis podem ser rejeitados
- ⚠️ URLs muito longas podem impactar performance

## 🔒 Segurança

### Validação Automática
- URLs são validadas automaticamente
- Domínios são verificados contra lista de confiança
- URLs malformadas são rejeitadas

### Lista de Domínios Confiáveis
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

## 📚 Exemplos de Uso

### 1. Imagens do Unsplash
```typescript
{
  src: 'https://images.unsplash.com/photo-123.jpg?w=800&h=600',
  alt: 'Escalada',
  title: 'Escalada Técnica',
  category: 'climb',
  isExternal: true
  // externalDomain: 'images.unsplash.com' ← Extraído automaticamente
}
```

### 2. Imagens do Picsum
```typescript
{
  src: 'https://picsum.photos/800/600?random=123',
  alt: 'Paisagem',
  title: 'Paisagem Natural',
  category: 'nature',
  isExternal: true
  // externalDomain: 'picsum.photos' ← Extraído automaticamente
}
```

### 3. URLs Customizadas
```typescript
{
  src: 'https://meu-cdn.com/imagem.jpg',
  alt: 'Minha imagem',
  title: 'Imagem Customizada',
  category: 'climb',
  isExternal: true
  // externalDomain: 'meu-cdn.com' ← Extraído automaticamente
}
```

## 🎯 Próximos Passos

1. **Migrar temas existentes** usando o script
2. **Usar abordagem dinâmica** em novos temas
3. **Testar validação** de domínios
4. **Monitorar performance** das imagens
5. **Atualizar documentação** conforme necessário

## 📞 Suporte

Para dúvidas sobre domínios dinâmicos:
- 📧 Abra uma issue no repositório
- 📖 Consulte a documentação de imagens externas
- 🔧 Use o script de migração automática
