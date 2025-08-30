# Sistema de Temas - XperienceClimb

## Visão Geral

Este documento descreve o planejamento para implementação de um sistema de temas flexível que permite alternar facilmente entre diferentes destinos de escalada, como **Fazenda Ipanema** e **Pedra Bela**.

## Objetivos

1. **Flexibilidade**: Permitir mudança rápida entre temas/destinos
2. **Manutenibilidade**: Centralizar configurações em arquivos dedicados
3. **Escalabilidade**: Facilitar adição de novos destinos no futuro
4. **Consistência**: Manter a mesma estrutura de componentes

## Análise dos Elementos que Mudam Entre Temas

### 1. Informações de Localização
- **Endereço**: Floresta Nacional de Ipanema → Pedra Bela, SP
- **Distância**: 120km de São Paulo → 119km de São Paulo
- **Coordenadas GPS**: Diferentes para cada local
- **Instruções de chegada**: Rotas específicas para cada destino

### 2. Conteúdo Textual
- **Nome do local**: Morro Araçoiaba → Pedra Bela
- **Descrições**: Mata Atlântica/FLONA → Natureza/Montanhas
- **Características únicas**: Quartzito 600M anos → Tirolesa 2km
- **Atividades disponíveis**: Escalada → Escalada + Tirolesa + Cachoeiras

### 3. Galeria de Imagens
- **Imagens atuais (Fazenda Ipanema)**:
  - `/images/climb.jpg` - Escalada no Morro Araçoiaba
  - `/images/climb-2.jpg` - Vista panorâmica
  - `/images/flona.jpg` - Floresta Nacional
  - `/images/flona-2.jpg` - Trilhas da FLONA
  - `/images/setor-map.jpg` - Mapa dos setores

- **Novas imagens necessárias (Pedra Bela)**:
  - Tirolesa de 2km
  - Pedra do Santuário
  - Pedra Maria Antônia
  - Cachoeiras (Boca da Mata, Antônio Souza)
  - Corredeiras dos Tuncuns
  - Templo Budista
  - Paisagens das montanhas

### 4. Informações de Contato e Logística
- **Horários de funcionamento**: Podem variar
- **Pontos de encontro**: Diferentes para cada local
- **Cronograma**: Específico para cada destino

### 5. Características Específicas
- **Fazenda Ipanema**: Unidade de conservação, história de 600M anos
- **Pedra Bela**: Tirolesa maior da América Latina, múltiplas atividades

## Arquitetura do Sistema de Temas

### 1. Estrutura de Arquivos

```
src/
├── themes/
│   ├── index.ts                    # Exportações principais
│   ├── types.ts                    # Tipos TypeScript
│   ├── ThemeProvider.tsx           # Context Provider
│   ├── useTheme.ts                 # Hook customizado
│   └── configs/
│       ├── fazenda-ipanema.ts      # Configuração Fazenda Ipanema
│       ├── pedra-bela.ts           # Configuração Pedra Bela
│       └── index.ts                # Exportações das configurações
├── components/
│   └── theme/
│       ├── ThemeSelector.tsx       # Componente para trocar tema
│       └── index.ts
└── lib/
    └── theme-utils.ts              # Utilitários para temas
```

### 2. Tipos TypeScript

```typescript
// src/themes/types.ts
export interface ThemeConfig {
  id: string;
  name: string;
  location: LocationInfo;
  content: ContentInfo;
  gallery: GalleryInfo;
  activities: ActivityInfo[];
  logistics: LogisticsInfo;
  seo: SEOInfo;
}

export interface LocationInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  directions: DirectionStep[];
}

export interface ContentInfo {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    highlights: Highlight[];
    infoBox: {
      title: string;
      content: string;
    };
  };
}

export interface GalleryInfo {
  images: GalleryImage[];
  categories: Record<string, string>;
}

export interface ActivityInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  duration?: string;
  price?: number;
}

export interface LogisticsInfo {
  schedule: {
    openTime: string;
    closeTime: string;
    notes?: string;
  };
  meetingPoint: string;
  importantNotes: string[];
  tips: string[];
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}
```

### 3. Configurações dos Temas

#### Fazenda Ipanema (Atual)
```typescript
// src/themes/configs/fazenda-ipanema.ts
export const fazendaIpanemaTheme: ThemeConfig = {
  id: 'fazenda-ipanema',
  name: 'Fazenda Ipanema',
  location: {
    name: 'Morro Araçoiaba',
    address: 'Floresta Nacional de Ipanema',
    city: 'Iperó',
    state: 'São Paulo',
    distance: '120km de São Paulo',
    coordinates: { lat: -23.4255562, lng: -47.5980568 },
    mapsUrl: 'https://www.google.com/maps/place/Centro+de+Visitantes/@-23.4255562,-47.5980568...',
    directions: [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Raposo Tavares (SP-270) sentido interior'
      },
      // ... outras direções
    ]
  },
  content: {
    hero: {
      title: 'XPERIENCE CLIMB',
      subtitle: 'Viva a Experiência Definitiva de Escalada',
      description: 'Escalada no coração da Mata Atlântica'
    },
    about: {
      title: 'Escalada no Coração da Mata Atlântica',
      description: 'O Morro Araçoiaba, localizado na Floresta Nacional de Ipanema...',
      highlights: [
        {
          icon: '🏔️',
          title: 'Rochas Naturais Únicas',
          description: 'Formações rochosas de quartzito com mais de 600 milhões de anos...'
        },
        // ... outros highlights
      ],
      infoBox: {
        title: 'Sobre a Floresta Nacional de Ipanema (Flona)',
        content: 'A Floresta Nacional de Ipanema, antes conhecida como "Fazenda Ipanema"...'
      }
    }
  },
  gallery: {
    images: [
      {
        src: '/images/themes/fazenda-ipanema/climb.jpg',
        alt: 'Escalador nas rochas do Morro Araçoiaba',
        title: 'Escalada Técnica',
        category: 'climb'
      },
      // ... outras imagens
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      nature: 'Natureza',
      equipment: 'Equipamentos'
    }
  },
  activities: [
    {
      id: 'rock-climbing',
      name: 'Escalada em Rocha',
      description: 'Escalada técnica em formações de quartzito',
      icon: '🧗',
      difficulty: 'medium'
    }
  ],
  logistics: {
    schedule: {
      openTime: '8h',
      closeTime: '17h',
      notes: 'Horário de funcionamento do parque'
    },
    meetingPoint: 'Centro de Visitantes da FLONA',
    importantNotes: [
      'Horário de funcionamento do parque: 8h às 17h',
      'Estacionamento gratuito disponível'
    ],
    tips: [
      'Chegue com antecedência',
      'Traga protetor solar'
    ]
  },
  seo: {
    title: 'XperienceClimb - Escalada na Fazenda Ipanema',
    description: 'Viva a experiência definitiva de escalada no Morro Araçoiaba...',
    keywords: ['escalada', 'fazenda ipanema', 'morro araçoiaba', 'flona'],
    ogImage: '/images/themes/fazenda-ipanema/og-image.jpg'
  }
};
```

#### Pedra Bela (Nova)
```typescript
// src/themes/configs/pedra-bela.ts
export const pedraBellaTheme: ThemeConfig = {
  id: 'pedra-bela',
  name: 'Pedra Bela',
  location: {
    name: 'Pedra Bela',
    address: 'Pedra Bela',
    city: 'Pedra Bela',
    state: 'São Paulo',
    distance: '119km de São Paulo',
    coordinates: { lat: -22.7894, lng: -46.4567 }, // Coordenadas aproximadas
    mapsUrl: 'https://www.google.com/maps/place/Pedra+Bela+-+SP',
    directions: [
      {
        step: 1,
        title: 'Saída de São Paulo',
        description: 'Siga pela Rodovia Fernão Dias (BR 381) até Bragança Paulista'
      },
      {
        step: 2,
        title: 'Rodovia Capitão Bardoino',
        description: 'Continue pela Rodovia Capitão Bardoino (BR 146)'
      },
      {
        step: 3,
        title: 'Chegada',
        description: 'Siga pela Rodovia José Bueno de Miranda até Pedra Bela'
      }
    ]
  },
  content: {
    hero: {
      title: 'XPERIENCE CLIMB',
      subtitle: 'Aventura Completa em Pedra Bela',
      description: 'Escalada, tirolesa e natureza exuberante'
    },
    about: {
      title: 'Aventura Completa na Natureza de Pedra Bela',
      description: 'Pedra Bela oferece uma experiência única combinando escalada, tirolesa e contato com a natureza...',
      highlights: [
        {
          icon: '🚁',
          title: 'Tirolesa Gigante',
          description: 'A maior tirolesa da América Latina com quase 2km de extensão'
        },
        {
          icon: '🏔️',
          title: 'Montanhas Espetaculares',
          description: 'Pedra do Santuário e Pedra Maria Antônia com vistas panorâmicas'
        },
        {
          icon: '💧',
          title: 'Cachoeiras Refrescantes',
          description: 'Cachoeiras Boca da Mata e Antônio Souza para relaxar'
        }
      ],
      infoBox: {
        title: 'Sobre Pedra Bela',
        content: 'Pedra Bela é uma pequena cidade do interior de São Paulo com exuberante natureza...'
      }
    }
  },
  gallery: {
    images: [
      {
        src: '/images/themes/pedra-bela/tirolesa.jpg',
        alt: 'Tirolesa de 2km em Pedra Bela',
        title: 'Tirolesa Gigante',
        category: 'adventure'
      },
      {
        src: '/images/themes/pedra-bela/pedra-santuario.jpg',
        alt: 'Vista da Pedra do Santuário',
        title: 'Pedra do Santuário',
        category: 'climb'
      },
      // ... outras imagens
    ],
    categories: {
      all: 'Todas',
      climb: 'Escalada',
      adventure: 'Aventura',
      nature: 'Natureza',
      waterfalls: 'Cachoeiras'
    }
  },
  activities: [
    {
      id: 'zipline',
      name: 'Tirolesa',
      description: 'Tirolesa de 2km - a maior da América Latina',
      icon: '🚁',
      difficulty: 'easy',
      duration: '1min 40s',
      price: 4000 // R$ 40,00
    },
    {
      id: 'rock-climbing',
      name: 'Escalada',
      description: 'Escalada na Pedra do Santuário e Pedra Maria Antônia',
      icon: '🧗',
      difficulty: 'medium'
    },
    {
      id: 'waterfalls',
      name: 'Cachoeiras',
      description: 'Banho nas cachoeiras Boca da Mata e Antônio Souza',
      icon: '💧',
      difficulty: 'easy'
    },
    {
      id: 'atv',
      name: 'Quadriciclo',
      description: 'Passeios ecológicos de quadriciclo',
      icon: '🏍️',
      difficulty: 'easy',
      price: 9000 // R$ 90,00 - R$ 160,00
    }
  ],
  logistics: {
    schedule: {
      openTime: '9h',
      closeTime: '17h',
      notes: 'Funcionamento nos finais de semana e feriados'
    },
    meetingPoint: 'Portal da Cidade - Pedra Bela',
    importantNotes: [
      'Tirolesa funciona apenas nos finais de semana e feriados',
      'Entrada gratuita nas cachoeiras',
      'Consultar agenda do Templo Budista'
    ],
    tips: [
      'Traga roupas de banho para as cachoeiras',
      'Use protetor solar',
      'Calçados adequados para trilha'
    ]
  },
  seo: {
    title: 'XperienceClimb - Aventura Completa em Pedra Bela',
    description: 'Viva uma experiência única com escalada, tirolesa e cachoeiras em Pedra Bela...',
    keywords: ['pedra bela', 'tirolesa', 'escalada', 'cachoeiras', 'aventura'],
    ogImage: '/images/themes/pedra-bela/og-image.jpg'
  }
};
```

### 4. Context Provider e Hook

```typescript
// src/themes/ThemeProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from './types';
import { fazendaIpanemaTheme, pedraBellaTheme } from './configs';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  setTheme: (themeId: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  'fazenda-ipanema': fazendaIpanemaTheme,
  'pedra-bela': pedraBellaTheme,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(fazendaIpanemaTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar tema salvo do localStorage ou usar padrão
    const savedTheme = localStorage.getItem('xperience-theme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      setCurrentTheme(themes[savedTheme as keyof typeof themes]);
    }
    setIsLoading(false);
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes[themeId as keyof typeof themes];
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('xperience-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: Object.values(themes),
        setTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// src/themes/useTheme.ts
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## Plano de Implementação

### Fase 1: Estrutura Base (1-2 dias)
1. **Criar estrutura de arquivos**
   - Criar pasta `src/themes/`
   - Definir tipos TypeScript
   - Implementar ThemeProvider e useTheme

2. **Migrar dados atuais**
   - Extrair informações hardcoded para `fazenda-ipanema.ts`
   - Organizar imagens em `public/images/themes/fazenda-ipanema/`

### Fase 2: Configuração Pedra Bela (2-3 dias)
1. **Criar configuração Pedra Bela**
   - Implementar `pedra-bela.ts` com base nas informações do site
   - Preparar estrutura de imagens para Pedra Bela

2. **Coletar e organizar imagens**
   - Baixar imagens do site da Viajali e outras fontes
   - Otimizar e organizar em `public/images/themes/pedra-bela/`

### Fase 3: Atualização dos Componentes (3-4 dias)
1. **Atualizar componentes para usar temas**
   - `HeroSection.tsx`: Usar `theme.content.hero`
   - `AboutSection.tsx`: Usar `theme.content.about`
   - `LocationSection.tsx`: Usar `theme.location`
   - `GallerySection.tsx`: Usar `theme.gallery`

2. **Criar componente ThemeSelector**
   - Interface para alternar entre temas
   - Pode ser um dropdown no header ou página admin

### Fase 4: Testes e Refinamentos (1-2 dias)
1. **Testes de funcionalidade**
   - Verificar troca de temas
   - Validar todas as seções
   - Testar responsividade

2. **Otimizações**
   - Lazy loading de imagens
   - Preload de temas
   - SEO dinâmico

### Fase 5: Documentação e Deploy (1 dia)
1. **Documentação**
   - Guia para adicionar novos temas
   - Documentação da API

2. **Deploy e monitoramento**
   - Deploy da nova versão
   - Monitorar performance

## Organização das Imagens

### Estrutura Proposta
```
public/
└── images/
    └── themes/
        ├── fazenda-ipanema/
        │   ├── hero-bg.jpg
        │   ├── climb-1.jpg
        │   ├── climb-2.jpg
        │   ├── flona-1.jpg
        │   ├── flona-2.jpg
        │   ├── setor-map.jpg
        │   └── og-image.jpg
        └── pedra-bela/
            ├── hero-bg.jpg
            ├── tirolesa-1.jpg
            ├── tirolesa-2.jpg
            ├── pedra-santuario-1.jpg
            ├── pedra-santuario-2.jpg
            ├── pedra-maria-antonia.jpg
            ├── cachoeira-boca-mata.jpg
            ├── cachoeira-antonio-souza.jpg
            ├── corredeiras-tuncuns.jpg
            ├── templo-budista.jpg
            ├── quadriciclo.jpg
            ├── escalada-1.jpg
            ├── escalada-2.jpg
            ├── paisagem-1.jpg
            ├── paisagem-2.jpg
            └── og-image.jpg
```

### Imagens Necessárias para Pedra Bela
Com base no site da Viajali, precisaremos das seguintes imagens:

1. **Tirolesa** (2-3 imagens)
   - Vista da tirolesa de 2km
   - Pessoa descendo na tirolesa
   - Vista aérea do percurso

2. **Pedra do Santuário** (2-3 imagens)
   - Vista panorâmica do topo
   - Igreja no cume
   - Escadaria de 320 degraus

3. **Pedra Maria Antônia** (2 imagens)
   - Vista do pico
   - Trilha de acesso

4. **Cachoeiras** (3-4 imagens)
   - Cachoeira Boca da Mata
   - Cachoeira Antônio Souza
   - Corredeiras dos Tuncuns
   - Piscinas naturais

5. **Atividades** (2-3 imagens)
   - Escalada nas pedras
   - Passeio de quadriciclo
   - Trilhas ecológicas

6. **Paisagens** (3-4 imagens)
   - Vista panorâmica das montanhas
   - Mata preservada
   - Pôr do sol
   - Vista aérea da cidade

## Benefícios do Sistema

### 1. Flexibilidade
- Mudança de tema com um clique
- Fácil adição de novos destinos
- Configuração centralizada

### 2. Manutenibilidade
- Código organizado e modular
- Separação clara de responsabilidades
- Facilita debugging e updates

### 3. Escalabilidade
- Estrutura preparada para múltiplos temas
- Fácil adição de novas funcionalidades
- Reutilização de componentes

### 4. SEO Dinâmico
- Meta tags específicas por tema
- URLs e conteúdo otimizados
- Melhor indexação por destino

## Considerações Técnicas

### 1. Performance
- Lazy loading de imagens por tema
- Preload do tema ativo
- Otimização de bundle size

### 2. UX/UI
- Transições suaves entre temas
- Loading states durante mudança
- Feedback visual claro

### 3. Acessibilidade
- Alt texts específicos por tema
- Contraste adequado
- Navegação por teclado

### 4. SEO
- Meta tags dinâmicas
- Structured data por tema
- Sitemap atualizado

## Próximos Passos

1. **Aprovação do plano**: Revisar e aprovar a arquitetura proposta
2. **Coleta de imagens**: Obter imagens de qualidade para Pedra Bela
3. **Implementação**: Seguir as fases do plano de implementação
4. **Testes**: Validar funcionalidade e performance
5. **Deploy**: Lançar o sistema de temas

## Conclusão

Este sistema de temas proporcionará uma base sólida e flexível para o XperienceClimb, permitindo fácil alternância entre destinos e preparando o projeto para futuras expansões. A arquitetura modular garante manutenibilidade e escalabilidade, enquanto a experiência do usuário permanece consistente e profissional.
