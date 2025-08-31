#!/usr/bin/env node

/**
 * Script para criar temas com URLs de imagens externas
 * 
 * Uso: node scripts/create-theme-with-external-images.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para fazer perguntas
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Função para perguntar se sim/não
function askYesNo(question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Função para perguntar múltiplas linhas
function askMultiLine(question) {
  return new Promise((resolve) => {
    console.log(question);
    console.log('Digite "END" em uma linha separada para finalizar:');
    
    const lines = [];
    const askLine = () => {
      rl.question('', (line) => {
        if (line.trim().toUpperCase() === 'END') {
          resolve(lines.join('\n'));
        } else {
          lines.push(line);
          askLine();
        }
      });
    };
    askLine();
  });
}

// Função para perguntar array
function askArray(question, itemName) {
  return new Promise(async (resolve) => {
    const items = [];
    console.log(question);
    
    while (true) {
      const item = await askQuestion(`${itemName} (ou "done" para finalizar): `);
      if (item.toLowerCase() === 'done') break;
      items.push(item);
    }
    
    resolve(items);
  });
}

// Serviços de imagem disponíveis
const IMAGE_SERVICES = {
  unsplash: {
    name: 'Unsplash',
    baseUrl: 'https://images.unsplash.com',
    description: 'Fotos gratuitas de alta qualidade'
  },
  picsum: {
    name: 'Picsum',
    baseUrl: 'https://picsum.photos',
    description: 'Imagens placeholder aleatórias'
  },
  placeholder: {
    name: 'Placeholder.com',
    baseUrl: 'https://via.placeholder.com',
    description: 'Placeholders simples'
  }
};

// Função para gerar URL de imagem
function generateImageUrl(service, width = 800, height = 600, query = '') {
  switch (service) {
    case 'unsplash':
      return `${IMAGE_SERVICES.unsplash.baseUrl}/photo-${Math.random().toString(36).substr(2, 9)}?w=${width}&h=${height}&fit=crop${query ? `&q=${query}` : ''}`;
    case 'picsum':
      return `${IMAGE_SERVICES.picsum.baseUrl}/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
    case 'placeholder':
      return `${IMAGE_SERVICES.placeholder.baseUrl}/${width}x${height}/CCCCCC/666666?text=${encodeURIComponent('Imagem')}`;
    default:
      return '';
  }
}

// Função principal
async function createThemeWithExternalImages() {
  console.log('🎨 Criador de Temas com Imagens Externas');
  console.log('=====================================\n');

  try {
    // Informações básicas do tema
    console.log('📋 INFORMAÇÕES BÁSICAS');
    console.log('----------------------');
    
    const themeId = await askQuestion('ID do tema (ex: meu-tema): ');
    const themeName = await askQuestion('Nome do tema: ');
    
    // Localização
    console.log('\n📍 INFORMAÇÕES DE LOCALIZAÇÃO');
    console.log('----------------------------');
    
    const locationName = await askQuestion('Nome da localização: ');
    const address = await askQuestion('Endereço: ');
    const city = await askQuestion('Cidade: ');
    const state = await askQuestion('Estado: ');
    const distance = await askQuestion('Distância (ex: 120km de São Paulo): ');
    const lat = await askQuestion('Latitude: ');
    const lng = await askQuestion('Longitude: ');
    const mapsUrl = await askQuestion('URL do Google Maps: ');
    
    // Direções
    console.log('\n🧭 DIREÇÕES');
    console.log('-----------');
    const directions = [];
    
    if (await askYesNo('Adicionar direções de chegada?')) {
      let step = 1;
      while (true) {
        const title = await askQuestion(`Título do passo ${step} (ou "done" para finalizar): `);
        if (title.toLowerCase() === 'done') break;
        
        const description = await askQuestion(`Descrição do passo ${step}: `);
        
        directions.push({
          step,
          title,
          description
        });
        
        step++;
      }
    }
    
    // Conteúdo
    console.log('\n📝 CONTEÚDO');
    console.log('-----------');
    
    const heroTitle = await askQuestion('Título do hero: ');
    const heroSubtitle = await askQuestion('Subtítulo do hero: ');
    const heroDescription = await askQuestion('Descrição do hero: ');
    
    const aboutTitle = await askQuestion('Título da seção sobre: ');
    const aboutDescription = await askQuestion('Descrição da seção sobre: ');
    
    // Destaques
    console.log('\n⭐ DESTAQUES');
    console.log('------------');
    const highlights = [];
    
    if (await askYesNo('Adicionar destaques?')) {
      let highlightCount = 1;
      while (true) {
        const icon = await askQuestion(`Ícone do destaque ${highlightCount} (ou "done" para finalizar): `);
        if (icon.toLowerCase() === 'done') break;
        
        const title = await askQuestion(`Título do destaque ${highlightCount}: `);
        const description = await askQuestion(`Descrição do destaque ${highlightCount}: `);
        
        highlights.push({
          icon,
          title,
          description
        });
        
        highlightCount++;
      }
    }
    
    // Caixa de informação
    const infoBoxTitle = await askQuestion('Título da caixa de informação: ');
    const infoBoxContent = await askMultiLine('Conteúdo da caixa de informação:');
    
    // Galeria
    console.log('\n🖼️ GALERIA');
    console.log('----------');
    
    console.log('\nServiços de imagem disponíveis:');
    Object.entries(IMAGE_SERVICES).forEach(([key, service]) => {
      console.log(`  ${key}: ${service.name} - ${service.description}`);
    });
    
    const galleryImages = [];
    const galleryCategories = { all: 'Todas' };
    
    if (await askYesNo('Adicionar imagens à galeria?')) {
      let imageCount = 1;
      while (true) {
        console.log(`\n--- Imagem ${imageCount} ---`);
        
        const service = await askQuestion('Serviço de imagem (unsplash/picsum/placeholder/custom): ');
        
        let imageSrc;
        if (service === 'custom') {
          imageSrc = await askQuestion('URL da imagem: ');
        } else if (IMAGE_SERVICES[service]) {
          const width = await askQuestion('Largura (padrão: 800): ') || '800';
          const height = await askQuestion('Altura (padrão: 600): ') || '600';
          const query = service === 'unsplash' ? await askQuestion('Query de busca (opcional): ') : '';
          
          imageSrc = generateImageUrl(service, width, height, query);
          console.log(`URL gerada: ${imageSrc}`);
        } else {
          console.log('Serviço inválido, usando Unsplash...');
          imageSrc = generateImageUrl('unsplash');
        }
        
        const imageAlt = await askQuestion('Texto alternativo da imagem: ');
        const imageTitle = await askQuestion('Título da imagem: ');
        const imageCategory = await askQuestion('Categoria da imagem: ');
        
        galleryImages.push({
          src: imageSrc,
          alt: imageAlt,
          title: imageTitle,
          category: imageCategory,
          isExternal: true,
          externalDomain: service === 'custom' ? 'custom' : IMAGE_SERVICES[service]?.baseUrl.replace('https://', '')
        });
        
        // Adicionar categoria se não existir
        if (!galleryCategories[imageCategory]) {
          const categoryLabel = await askQuestion(`Rótulo para categoria "${imageCategory}": `);
          galleryCategories[imageCategory] = categoryLabel;
        }
        
        if (!(await askYesNo('Adicionar mais imagens?'))) break;
        imageCount++;
      }
    }
    
    // Atividades
    console.log('\n🎯 ATIVIDADES');
    console.log('------------');
    const activities = [];
    
    if (await askYesNo('Adicionar atividades?')) {
      let activityCount = 1;
      while (true) {
        const id = await askQuestion(`ID da atividade ${activityCount} (ou "done" para finalizar): `);
        if (id.toLowerCase() === 'done') break;
        
        const name = await askQuestion(`Nome da atividade ${activityCount}: `);
        const description = await askQuestion(`Descrição da atividade ${activityCount}: `);
        const icon = await askQuestion(`Ícone da atividade ${activityCount}: `);
        const difficulty = await askQuestion(`Dificuldade (easy/medium/hard): `);
        const duration = await askQuestion(`Duração (opcional): `);
        const price = await askQuestion(`Preço em centavos (opcional): `);
        
        const activity = {
          id,
          name,
          description,
          icon,
          difficulty: difficulty || 'medium'
        };
        
        if (duration) activity.duration = duration;
        if (price) activity.price = parseInt(price);
        
        activities.push(activity);
        activityCount++;
      }
    }
    
    // Logística
    console.log('\n📅 LOGÍSTICA');
    console.log('------------');
    
    const openTime = await askQuestion('Horário de abertura: ');
    const closeTime = await askQuestion('Horário de fechamento: ');
    const meetingPoint = await askQuestion('Ponto de encontro: ');
    
    const importantNotes = await askArray('Notas importantes:', 'nota');
    const tips = await askArray('Dicas para os visitantes:', 'dica');
    
    // Comunidade
    console.log('\n👥 COMUNIDADE');
    console.log('------------');
    
    const localPartners = await askArray('Parceiros locais (IDs):', 'parceiro');
    const localInstructors = await askArray('Instrutores locais (IDs):', 'instrutor');
    const safetyProcedures = await askArray('Procedimentos de segurança (IDs):', 'procedimento');
    const visitedLocationId = await askQuestion('ID da localização visitada (opcional): ');
    
    // SEO
    console.log('\n🔍 SEO');
    console.log('----');
    
    const seoTitle = await askQuestion('Título SEO: ');
    const seoDescription = await askQuestion('Descrição SEO: ');
    const keywords = await askArray('Palavras-chave SEO:', 'palavra-chave');
    const ogImage = await askQuestion('URL da imagem OG: ');
    
    // Visual
    console.log('\n🎨 VISUAL');
    console.log('--------');
    
    const primaryColor = await askQuestion('Cor primária (hex): ') || '#2d5a3d';
    const accentColor = await askQuestion('Cor de destaque (hex): ') || '#7cb342';
    const backgroundColor = await askQuestion('Cor de fundo (hex): ') || '#f8fdf9';
    
    // Gerar configuração do tema
    const themeConfig = {
      id: themeId,
      name: themeName,
      location: {
        name: locationName,
        address,
        city,
        state,
        distance,
        coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
        mapsUrl,
        directions
      },
      content: {
        hero: {
          title: heroTitle,
          subtitle: heroSubtitle,
          description: heroDescription
        },
        about: {
          title: aboutTitle,
          description: aboutDescription,
          highlights,
          infoBox: {
            title: infoBoxTitle,
            content: infoBoxContent
          }
        }
      },
      gallery: {
        images: galleryImages,
        categories: galleryCategories
      },
      activities,
      logistics: {
        schedule: {
          openTime,
          closeTime
        },
        meetingPoint,
        importantNotes,
        tips
      },
      community: {
        localPartners,
        localInstructors,
        specificSafetyProcedures: safetyProcedures,
        visitedLocationId: visitedLocationId || undefined
      },
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords,
        ogImage
      },
      visual: {
        primaryColor,
        primaryColorHover: primaryColor,
        primaryColorActive: primaryColor,
        accentColor,
        backgroundColor,
        surfaceColor: '#ffffff',
        textColor: '#1b3b1f',
        textSecondaryColor: '#4a6b4d',
        borderColor: '#c8e6c9',
        gradientFrom: primaryColor,
        gradientTo: accentColor,
        heroOverlay: `${primaryColor}CC`,
        cardBackground: '#ffffff'
      }
    };
    
    // Salvar arquivo
    const configPath = path.join(__dirname, '..', 'src', 'themes', 'configs', `${themeId}.ts`);
    const configContent = `import { ThemeConfig } from '../types';

export const ${themeId.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Theme: ThemeConfig = ${JSON.stringify(themeConfig, null, 2)};
`;
    
    fs.writeFileSync(configPath, configContent);
    
    // Atualizar index.ts
    const indexPath = path.join(__dirname, '..', 'src', 'themes', 'configs', 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    const importStatement = `export * from './${themeId}';`;
    if (!indexContent.includes(importStatement)) {
      indexContent += `\n${importStatement}`;
      fs.writeFileSync(indexPath, indexContent);
    }
    
    console.log('\n✅ Tema criado com sucesso!');
    console.log(`📁 Arquivo salvo em: ${configPath}`);
    console.log('\n🎯 Próximos passos:');
    console.log('1. Revise as URLs das imagens geradas');
    console.log('2. Substitua por URLs específicas se necessário');
    console.log('3. Teste o tema na aplicação');
    console.log('4. Ajuste as cores e estilos conforme necessário');
    
  } catch (error) {
    console.error('❌ Erro ao criar tema:', error);
  } finally {
    rl.close();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createThemeWithExternalImages();
}

module.exports = { createThemeWithExternalImages };
