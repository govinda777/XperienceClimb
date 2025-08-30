#!/usr/bin/env node

/**
 * XperienceClimb - Tour Creation Script
 * 
 * This script collects tour information via console input and creates:
 * 1. A new tour configuration
 * 2. A new theme configuration
 * 3. Updates the theme system to support the new tour
 * 
 * Usage: node scripts/create-tour.js
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper function to ask for array input
async function askArray(question, itemName = 'item') {
  console.log(question);
  console.log(`(Enter each ${itemName} and press Enter. Type 'done' when finished)`);
  
  const items = [];
  while (true) {
    const item = await askQuestion(`${itemName}: `);
    if (item.toLowerCase() === 'done') break;
    if (item) items.push(item);
  }
  return items;
}

// Helper function to ask yes/no questions
async function askYesNo(question) {
  const answer = await askQuestion(`${question} (y/n): `);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

// Helper function to validate required fields
function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    throw new Error(`${fieldName} is required`);
  }
  return value.trim();
}

// Main tour creation function
async function createTour() {
  console.log('🏔️  Welcome to XperienceClimb Tour Creator');
  console.log('=========================================\n');

  try {
    // Basic Tour Information
    console.log('📋 BASIC TOUR INFORMATION');
    console.log('-------------------------');
    
    const tourId = validateRequired(
      await askQuestion('Tour ID (kebab-case, e.g., "pedra-grande"): '), 
      'Tour ID'
    );
    
    const tourName = validateRequired(
      await askQuestion('Tour Name (e.g., "Pedra Grande"): '), 
      'Tour Name'
    );

    // Location Information
    console.log('\n📍 LOCATION INFORMATION');
    console.log('----------------------');
    
    const locationName = validateRequired(
      await askQuestion('Location Name (e.g., "Morro da Pedra Grande"): '), 
      'Location Name'
    );
    
    const address = validateRequired(
      await askQuestion('Address: '), 
      'Address'
    );
    
    const city = validateRequired(
      await askQuestion('City: '), 
      'City'
    );
    
    const state = validateRequired(
      await askQuestion('State: '), 
      'State'
    );
    
    const distance = await askQuestion('Distance from São Paulo (e.g., "80km de São Paulo"): ');
    
    const lat = parseFloat(await askQuestion('Latitude (decimal): '));
    const lng = parseFloat(await askQuestion('Longitude (decimal): '));
    
    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid coordinates provided');
    }
    
    const mapsUrl = await askQuestion('Google Maps URL (optional): ');

    // Directions
    console.log('\n🗺️  DIRECTIONS');
    console.log('-------------');
    const directions = [];
    
    if (await askYesNo('Add directions?')) {
      let stepNumber = 1;
      while (true) {
        const stepTitle = await askQuestion(`Step ${stepNumber} title (or 'done' to finish): `);
        if (stepTitle.toLowerCase() === 'done') break;
        
        const stepDescription = await askQuestion(`Step ${stepNumber} description: `);
        
        directions.push({
          step: stepNumber,
          title: stepTitle,
          description: stepDescription
        });
        
        stepNumber++;
      }
    }

    // Content Information
    console.log('\n📝 CONTENT INFORMATION');
    console.log('---------------------');
    
    const heroTitle = validateRequired(
      await askQuestion('Hero Title (e.g., "XPERIENCE CLIMB"): '), 
      'Hero Title'
    );
    
    const heroSubtitle = validateRequired(
      await askQuestion('Hero Subtitle: '), 
      'Hero Subtitle'
    );
    
    const heroDescription = validateRequired(
      await askQuestion('Hero Description: '), 
      'Hero Description'
    );
    
    const aboutTitle = validateRequired(
      await askQuestion('About Section Title: '), 
      'About Title'
    );
    
    const aboutDescription = validateRequired(
      await askQuestion('About Description: '), 
      'About Description'
    );

    // Highlights
    console.log('\n✨ HIGHLIGHTS');
    console.log('------------');
    const highlights = [];
    
    if (await askYesNo('Add highlights?')) {
      while (true) {
        const title = await askQuestion('Highlight title (or "done" to finish): ');
        if (title.toLowerCase() === 'done') break;
        
        const icon = await askQuestion('Highlight icon (emoji): ');
        const description = await askQuestion('Highlight description: ');
        
        highlights.push({ icon, title, description });
      }
    }

    // Info Box
    console.log('\n📦 INFO BOX');
    console.log('----------');
    const infoBoxTitle = await askQuestion('Info box title (optional): ');
    const infoBoxContent = await askQuestion('Info box content (optional): ');

    // Activities
    console.log('\n🎯 ACTIVITIES');
    console.log('------------');
    const activities = [];
    
    if (await askYesNo('Add activities?')) {
      while (true) {
        const activityName = await askQuestion('Activity name (or "done" to finish): ');
        if (activityName.toLowerCase() === 'done') break;
        
        const activityId = activityName.toLowerCase().replace(/\s+/g, '-');
        const activityDescription = await askQuestion('Activity description: ');
        const activityIcon = await askQuestion('Activity icon (emoji): ');
        const difficulty = await askQuestion('Difficulty (easy/medium/hard, optional): ');
        const duration = await askQuestion('Duration (optional): ');
        const price = await askQuestion('Price (optional, in cents): ');
        
        const activity = {
          id: activityId,
          name: activityName,
          description: activityDescription,
          icon: activityIcon
        };
        
        if (difficulty) activity.difficulty = difficulty;
        if (duration) activity.duration = duration;
        if (price && !isNaN(parseInt(price))) activity.price = parseInt(price);
        
        activities.push(activity);
      }
    }

    // Logistics
    console.log('\n🕐 LOGISTICS');
    console.log('-----------');
    const openTime = await askQuestion('Opening time (e.g., "8h"): ');
    const closeTime = await askQuestion('Closing time (e.g., "17h"): ');
    const scheduleNotes = await askQuestion('Schedule notes (optional): ');
    const meetingPoint = await askQuestion('Meeting point: ');
    
    const importantNotes = await askArray('Important notes:', 'note');
    const tips = await askArray('Tips for visitors:', 'tip');

    // SEO Information
    console.log('\n🔍 SEO INFORMATION');
    console.log('-----------------');
    const seoTitle = await askQuestion(`SEO Title (default: "XperienceClimb - ${tourName}"): `) || `XperienceClimb - ${tourName}`;
    const seoDescription = await askQuestion('SEO Description: ');
    const keywords = await askArray('SEO Keywords:', 'keyword');
    const ogImage = await askQuestion(`OG Image path (default: "/images/themes/${tourId}/og-image.jpg"): `) || `/images/themes/${tourId}/og-image.jpg`;

    // Gallery Information
    console.log('\n🖼️  GALLERY');
    console.log('----------');
    const galleryImages = [];
    const galleryCategories = { all: 'Todas' };
    
    if (await askYesNo('Add gallery images?')) {
      while (true) {
        const imageSrc = await askQuestion('Image path (or "done" to finish): ');
        if (imageSrc.toLowerCase() === 'done') break;
        
        const imageAlt = await askQuestion('Image alt text: ');
        const imageTitle = await askQuestion('Image title: ');
        const imageCategory = await askQuestion('Image category: ');
        
        galleryImages.push({
          src: imageSrc,
          alt: imageAlt,
          title: imageTitle,
          category: imageCategory
        });
        
        // Add category if not exists
        if (!galleryCategories[imageCategory]) {
          const categoryLabel = await askQuestion(`Label for category "${imageCategory}": `);
          galleryCategories[imageCategory] = categoryLabel;
        }
      }
    }

    // Generate the theme configuration
    const themeConfig = {
      id: tourId,
      name: tourName,
      location: {
        name: locationName,
        address,
        city,
        state,
        distance: distance || `Distance from ${city}`,
        coordinates: { lat, lng },
        mapsUrl: mapsUrl || '',
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
            title: infoBoxTitle || '',
            content: infoBoxContent || ''
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
          openTime: openTime || '8h',
          closeTime: closeTime || '17h',
          notes: scheduleNotes || ''
        },
        meetingPoint: meetingPoint || '',
        importantNotes,
        tips
      },
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords,
        ogImage
      }
    };

    // Create the theme file
    await createThemeFile(tourId, tourName, themeConfig);
    
    // Update theme configs index
    await updateThemeIndex(tourId, tourName);
    
    // Update ThemeProvider
    await updateThemeProvider(tourId, tourName);

    console.log('\n✅ SUCCESS!');
    console.log('===========');
    console.log(`✓ Theme configuration created: src/themes/configs/${tourId}.ts`);
    console.log('✓ Theme index updated');
    console.log('✓ ThemeProvider updated');
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Add images to: public/images/themes/${tourId}/`);
    console.log(`2. Create packages for this tour in src/lib/constants.ts`);
    console.log(`3. Test the theme by adding ?theme=${tourId} to the URL`);
    console.log(`\nExample URL: http://localhost:3000?theme=${tourId}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Function to create theme file
async function createThemeFile(tourId, tourName, themeConfig) {
  const themeContent = `import { ThemeConfig } from '../types';

export const ${toCamelCase(tourId)}Theme: ThemeConfig = ${JSON.stringify(themeConfig, null, 2)};
`;

  const themePath = path.join(__dirname, '..', 'src', 'themes', 'configs', `${tourId}.ts`);
  
  // Ensure directory exists
  const themeDir = path.dirname(themePath);
  if (!fs.existsSync(themeDir)) {
    fs.mkdirSync(themeDir, { recursive: true });
  }
  
  fs.writeFileSync(themePath, themeContent);
}

// Function to update theme index
async function updateThemeIndex(tourId, tourName) {
  const indexPath = path.join(__dirname, '..', 'src', 'themes', 'configs', 'index.ts');
  
  let indexContent = '';
  if (fs.existsSync(indexPath)) {
    indexContent = fs.readFileSync(indexPath, 'utf8');
  }
  
  const exportLine = `export { ${toCamelCase(tourId)}Theme } from './${tourId}';`;
  
  if (!indexContent.includes(exportLine)) {
    indexContent += `${exportLine}\n`;
    fs.writeFileSync(indexPath, indexContent);
  }
}

// Function to update ThemeProvider
async function updateThemeProvider(tourId, tourName) {
  const providerPath = path.join(__dirname, '..', 'src', 'themes', 'ThemeProvider.tsx');
  
  if (!fs.existsSync(providerPath)) {
    console.warn('ThemeProvider.tsx not found, skipping update');
    return;
  }
  
  let providerContent = fs.readFileSync(providerPath, 'utf8');
  
  // Add import
  const importRegex = /import { (.+) } from '\.\/configs';/;
  const match = providerContent.match(importRegex);
  
  if (match) {
    const existingImports = match[1];
    const newImport = `${toCamelCase(tourId)}Theme`;
    
    if (!existingImports.includes(newImport)) {
      const updatedImports = `${existingImports}, ${newImport}`;
      providerContent = providerContent.replace(importRegex, `import { ${updatedImports} } from './configs';`);
    }
  } else {
    // Add import if not exists
    const importLine = `import { ${toCamelCase(tourId)}Theme } from './configs';\n`;
    providerContent = importLine + providerContent;
  }
  
  // Add to themes object
  const themesRegex = /const themes = \{([^}]+)\};/s;
  const themesMatch = providerContent.match(themesRegex);
  
  if (themesMatch) {
    const existingThemes = themesMatch[1];
    const newThemeEntry = `  '${tourId}': ${toCamelCase(tourId)}Theme,`;
    
    if (!existingThemes.includes(`'${tourId}':`)) {
      const updatedThemes = existingThemes.trim() + '\n' + newThemeEntry;
      providerContent = providerContent.replace(themesRegex, `const themes = {\n${updatedThemes}\n};`);
    }
  }
  
  fs.writeFileSync(providerPath, providerContent);
}

// Helper function to convert kebab-case to camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Run the script
if (require.main === module) {
  createTour().catch(console.error);
}

module.exports = { createTour };
