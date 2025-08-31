#!/usr/bin/env node

/**
 * Script para atualizar todos os temas para usar domínios dinâmicos
 * Remove externalDomain manual e usa processThemeImages()
 */

const fs = require('fs');
const path = require('path');

// Função para extrair domínio de uma URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

// Função para verificar se é URL externa
function isExternalUrl(url) {
  if (!url) return false;
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return true;
  }
  
  if (url.startsWith('//')) {
    return true;
  }
  
  return false;
}

// Função para processar uma imagem
function processImage(image) {
  const isExternal = image.isExternal ?? isExternalUrl(image.src);
  const externalDomain = isExternal ? (image.externalDomain ?? extractDomain(image.src)) : undefined;
  
  return {
    src: image.src,
    alt: image.alt,
    title: image.title,
    category: image.category,
    isExternal,
    externalDomain
  };
}

// Função para processar todas as imagens de um tema
function processThemeImages(images) {
  return images.map(image => processImage(image));
}

// Função para atualizar um arquivo de tema
function updateThemeFile(filePath) {
  console.log(`📝 Processando: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Verificar se já tem o import
  if (!content.includes('processThemeImages')) {
    // Adicionar import
    content = content.replace(
      "import { ThemeConfig } from '../types';",
      "import { ThemeConfig } from '../types';\nimport { processThemeImages } from '@/lib/image-utils';"
    );
  }
  
  // Encontrar e processar a seção de imagens
  const imagesMatch = content.match(/images:\s*\[([\s\S]*?)\],\s*categories:/);
  
  if (imagesMatch) {
    const imagesSection = imagesMatch[1];
    
    // Extrair todas as imagens
    const imageRegex = /\{\s*src:\s*['"`]([^'"`]+)['"`],\s*alt:\s*['"`]([^'"`]+)['"`],\s*title:\s*['"`]([^'"`]+)['"`],\s*category:\s*['"`]([^'"`]+)['"`],\s*isExternal:\s*(true|false)(?:,\s*externalDomain:\s*['"`]([^'"`]+)['"`])?\s*\}/g;
    
    const images = [];
    let match;
    
    while ((match = imageRegex.exec(imagesSection)) !== null) {
      images.push({
        src: match[1],
        alt: match[2],
        title: match[3],
        category: match[4],
        isExternal: match[5] === 'true'
      });
    }
    
    // Processar imagens
    const processedImages = processThemeImages(images);
    
    // Gerar nova seção de imagens
    const newImagesSection = processedImages.map(img => {
      const lines = [
        '      {',
        `        src: '${img.src}',`,
        `        alt: '${img.alt}',`,
        `        title: '${img.title}',`,
        `        category: '${img.category}',`,
        `        isExternal: ${img.isExternal}`
      ];
      
      if (img.externalDomain) {
        lines.push(`        externalDomain: '${img.externalDomain}'`);
      }
      
      lines.push('      }');
      return lines.join('\n');
    }).join(',\n');
    
    // Substituir a seção de imagens
    const newContent = content.replace(
      /images:\s*\[([\s\S]*?)\],\s*categories:/,
      `images: processThemeImages([\n${newImagesSection}\n    ]),\n    categories:`
    );
    
    // Salvar arquivo
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Atualizado: ${path.basename(filePath)}`);
  } else {
    console.log(`⚠️  Não encontrou seção de imagens em: ${path.basename(filePath)}`);
  }
}

// Função principal
function updateAllThemes() {
  console.log('🔄 Atualizando temas para usar domínios dinâmicos...\n');
  
  const themesDir = path.join(__dirname, '..', 'src', 'themes', 'configs');
  const files = fs.readdirSync(themesDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');
  
  console.log(`📁 Encontrados ${files.length} arquivos de tema:\n`);
  
  files.forEach(file => {
    const filePath = path.join(themesDir, file);
    updateThemeFile(filePath);
  });
  
  console.log('\n🎉 Processamento concluído!');
  console.log('\n📋 Resumo das mudanças:');
  console.log('- ✅ Removidos externalDomain manuais');
  console.log('- ✅ Adicionado import processThemeImages');
  console.log('- ✅ Domínios agora são extraídos automaticamente');
  console.log('- ✅ Código mais limpo e manutenível');
}

// Executar se chamado diretamente
if (require.main === module) {
  updateAllThemes();
}

module.exports = { updateAllThemes, processThemeImages };
