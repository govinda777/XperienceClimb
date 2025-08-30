# 🎯 Exemplo Prático: Criando o Tour "Pico do Jaraguá"

Este é um exemplo completo de como criar um novo passeio usando o sistema XperienceClimb.

## 🚀 Passo a Passo

### 1. Executar o Script

```bash
node scripts/create-tour.js
```

### 2. Respostas do Exemplo

```
🏔️  Welcome to XperienceClimb Tour Creator
=========================================

📋 BASIC TOUR INFORMATION
-------------------------
Tour ID (kebab-case, e.g., "pedra-grande"): pico-jaragua
Tour Name (e.g., "Pedra Grande"): Pico do Jaraguá

📍 LOCATION INFORMATION
----------------------
Location Name (e.g., "Morro da Pedra Grande"): Pico do Jaraguá
Address: Rua do Horto, 1799 - Horto Florestal
City: São Paulo
State: São Paulo
Distance from São Paulo (e.g., "80km de São Paulo"): 25km do centro de São Paulo
Latitude (decimal): -23.4558
Longitude (decimal): -46.7669
Google Maps URL (optional): https://maps.google.com/pico-jaragua

🗺️  DIRECTIONS
-------------
Add directions? (y/n): y
Step 1 title (or 'done' to finish): Saída do Centro
Step 1 description: Siga pela Marginal Tietê sentido oeste
Step 2 title (or 'done' to finish): Acesso Rodovia Anhanguera
Step 2 description: Pegue a Rodovia Anhanguera (SP-330) sentido Campinas
Step 3 title (or 'done' to finish): Saída Jaraguá
Step 3 description: Pegue a saída 18 - Jaraguá/Perus
Step 4 title (or 'done' to finish): Chegada
Step 4 description: Siga as placas para Parque Estadual do Jaraguá
Step 5 title (or 'done' to finish): done

📝 CONTENT INFORMATION
---------------------
Hero Title (e.g., "XPERIENCE CLIMB"): XPERIENCE CLIMB JARAGUÁ
Hero Subtitle: Conquiste o Ponto Mais Alto de São Paulo
Hero Description: Escalada urbana com vista panorâmica da Grande São Paulo

About Section Title: Escalada no Ponto Mais Alto de São Paulo
About Description: O Pico do Jaraguá, com 1.135 metros de altitude, é o ponto mais alto da cidade de São Paulo. Oferece uma experiência única de escalada urbana com vista panorâmica de 360° da Grande São Paulo.

✨ HIGHLIGHTS
------------
Add highlights? (y/n): y
Highlight title (or "done" to finish): Vista Panorâmica Única
Highlight icon (emoji): 🌆
Highlight description: Vista 360° da Grande São Paulo do ponto mais alto da cidade

Highlight title (or "done" to finish): Escalada Urbana
Highlight icon (emoji): 🏙️
Highlight description: Experiência única de escalada em ambiente urbano preservado

Highlight title (or "done" to finish): Fácil Acesso
Highlight icon (emoji): 🚗
Highlight description: Apenas 25km do centro, ideal para um bate-volta

Highlight title (or "done" to finish): done

📦 INFO BOX
----------
Info box title (optional): Sobre o Parque Estadual do Jaraguá
Info box content (optional): Criado em 1961, o Parque Estadual do Jaraguá preserva um dos últimos remanescentes de Mata Atlântica da região metropolitana de São Paulo. Além da escalada, oferece trilhas ecológicas e rica biodiversidade.

🎯 ACTIVITIES
------------
Add activities? (y/n): y
Activity name (or "done" to finish): Escalada no Pico
Activity description: Escalada técnica até o ponto mais alto de São Paulo
Activity icon (emoji): 🧗‍♂️
Difficulty (easy/medium/hard, optional): medium
Duration (optional): 4 horas
Price (optional, in cents): 

Activity name (or "done" to finish): Trilha Ecológica
Activity description: Caminhada interpretativa pela Mata Atlântica
Activity icon (emoji): 🥾
Difficulty (easy/medium/hard, optional): easy
Duration (optional): 2 horas
Price (optional, in cents): 

Activity name (or "done" to finish): done

🕐 LOGISTICS
-----------
Opening time (e.g., "8h"): 8h
Closing time (e.g., "17h"): 16h
Schedule notes (optional): Parque fecha às 16h, última entrada às 15h
Meeting point: Portaria do Parque Estadual do Jaraguá

Important notes:
(Enter each note and press Enter. Type 'done' when finished)
note: Parque fecha às 16h, chegue até 15h
note: Entrada gratuita no parque
note: Estacionamento disponível na entrada
note: done

Tips for visitors:
(Enter each tip and press Enter. Type 'done' when finished)
tip: Leve água e lanche
tip: Use protetor solar
tip: Calçado adequado para trilha
tip: Chegue cedo para aproveitar melhor
tip: done

🔍 SEO INFORMATION
-----------------
SEO Title (default: "XperienceClimb - Pico do Jaraguá"): 
SEO Description: Escalada no Pico do Jaraguá, o ponto mais alto de São Paulo. Vista panorâmica de 360° da Grande São Paulo. Experiência única de escalada urbana.

SEO Keywords:
(Enter each keyword and press Enter. Type 'done' when finished)
keyword: pico do jaraguá
keyword: escalada são paulo
keyword: ponto mais alto são paulo
keyword: escalada urbana
keyword: trilha jaraguá
keyword: mata atlântica
keyword: done

OG Image path (default: "/images/themes/pico-jaragua/og-image.jpg"): 

🖼️  GALLERY
----------
Add gallery images? (y/n): y
Image path (or "done" to finish): /images/themes/pico-jaragua/vista-panoramica.jpg
Image alt text: Vista panorâmica de São Paulo do Pico do Jaraguá
Image title: Vista Panorâmica
Image category: vista

Image path (or "done" to finish): /images/themes/pico-jaragua/escalada-pico.jpg
Image alt text: Escalador no Pico do Jaraguá
Image title: Escalada no Pico
Image category: escalada

Image path (or "done" to finish): /images/themes/pico-jaragua/trilha-mata.jpg
Image alt text: Trilha na Mata Atlântica do Jaraguá
Image title: Trilha Ecológica
Image category: natureza

Image path (or "done" to finish): done
Label for category "vista": Vistas
Label for category "escalada": Escalada
Label for category "natureza": Natureza
```

### 3. Resultado

```
✅ SUCCESS!
===========
✓ Theme configuration created: src/themes/configs/pico-jaragua.ts
✓ Theme index updated
✓ ThemeProvider updated

🎯 Next steps:
1. Add images to: public/images/themes/pico-jaragua/
2. Create packages for this tour in src/lib/constants.ts
3. Test the theme by adding ?theme=pico-jaragua to the URL

Example URL: http://localhost:3000?theme=pico-jaragua
```

## 📁 Arquivos Criados

### `src/themes/configs/pico-jaragua.ts`
```typescript
import { ThemeConfig } from '../types';

export const picoJaraguaTheme: ThemeConfig = {
  id: 'pico-jaragua',
  name: 'Pico do Jaraguá',
  location: {
    name: 'Pico do Jaraguá',
    address: 'Rua do Horto, 1799 - Horto Florestal',
    city: 'São Paulo',
    state: 'São Paulo',
    distance: '25km do centro de São Paulo',
    coordinates: { lat: -23.4558, lng: -46.7669 },
    mapsUrl: 'https://maps.google.com/pico-jaragua',
    directions: [
      {
        step: 1,
        title: 'Saída do Centro',
        description: 'Siga pela Marginal Tietê sentido oeste'
      },
      // ... mais direções
    ]
  },
  // ... resto da configuração
};
```

## 🖼️ Adicionando Imagens

Crie a pasta e adicione as imagens:

```bash
mkdir -p public/images/themes/pico-jaragua
```

Adicione os arquivos:
- `vista-panoramica.jpg`
- `escalada-pico.jpg`
- `trilha-mata.jpg`
- `og-image.jpg`

## 🎨 Testando o Novo Tema

1. **Inicie o servidor**:
```bash
npm run dev
```

2. **Acesse com o tema**:
```
http://localhost:3000?theme=pico-jaragua
```

3. **Verifique se**:
   - O tema carregou corretamente
   - As imagens aparecem
   - O conteúdo está correto
   - Os metadados SEO estão atualizados

## 💰 Criando Pacotes para o Tour

Adicione em `src/lib/constants.ts`:

```typescript
export const PACKAGES: Record<string, PackageType> = {
  // ... pacotes existentes
  jaraguaBasico: {
    id: 'jaragua-basico',
    name: 'Pacote PICO',
    price: 15900, // R$ 159.00
    description: 'Escalada no ponto mais alto de São Paulo',
    features: [
      '🧗‍♂️ Escalada no Pico do Jaraguá',
      '🌆 Vista 360° de São Paulo',
      '🥾 Trilha ecológica',
      '👨‍🏫 Guia especializado',
    ],
    bonus: ['📸 Fotos profissionais'],
    shape: 'circle',
    color: 'green-400',
    duration: '4 horas',
    maxParticipants: 10,
    popular: false,
    requiresExperience: false,
    minAge: 10,
    cancellationPolicy: 'Cancelamento gratuito até 24h antes',
  },
};
```

## 🔗 URLs de Exemplo

- **Tema Jaraguá**: `http://localhost:3000?theme=pico-jaragua`
- **Fazenda Ipanema**: `http://localhost:3000?theme=fazenda-ipanema`
- **Pedra Bela**: `http://localhost:3000?theme=pedra-bela`

## ✅ Checklist Final

- [ ] Script executado com sucesso
- [ ] Arquivos de tema criados
- [ ] Imagens adicionadas na pasta correta
- [ ] Tema testado no navegador
- [ ] Pacotes criados (opcional)
- [ ] SEO verificado
- [ ] Responsividade testada

---

**Pronto! Seu novo tour está criado e funcionando! 🎉**
