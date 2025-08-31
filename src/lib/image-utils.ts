/**
 * Utilitários para gerenciamento de imagens externas
 */

export interface ImageUrlConfig {
  src: string;
  isExternal?: boolean;
  externalDomain?: string;
}

/**
 * Valida se uma URL é externa
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  
  // URLs que começam com http/https são externas
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return true;
  }
  
  // URLs que começam com // são externas (protocolo relativo)
  if (url.startsWith('//')) {
    return true;
  }
  
  return false;
}

/**
 * Extrai o domínio de uma URL
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Valida se uma URL de imagem é segura
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // URLs locais são sempre válidas
  if (!isExternalUrl(url)) {
    return true;
  }
  
  // Lista de domínios confiáveis para imagens
  const trustedDomains = [
    'images.unsplash.com',
    'picsum.photos',
    'via.placeholder.com',
    'imgur.com',
    'i.imgur.com',
    'cloudinary.com',
    'res.cloudinary.com',
    'amazonaws.com',
    's3.amazonaws.com',
    'googleusercontent.com',
    'lh3.googleusercontent.com',
    'facebook.com',
    'fbcdn.net',
    'instagram.com',
    'cdninstagram.com',
    'flickr.com',
    'staticflickr.com',
    'pexels.com',
    'images.pexels.com',
    'pixabay.com',
    'cdn.pixabay.com',
    'freepik.com',
    'img.freepik.com',
    'shutterstock.com',
    'image.shutterstock.com',
    'gettyimages.com',
    'media.gettyimages.com',
    'istockphoto.com',
    'media.istockphoto.com',
    'adobe.com',
    'cc-api-storage.adobe.com',
    '500px.com',
    'drscdn.500px.org',
    'deviantart.com',
    'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
    'behance.net',
    'mir-s3-cdn-cf.behance.net',
    'dribbble.com',
    'cdn.dribbble.com',
    'artstation.com',
    'cdnb.artstation.com',
    'cdn.artstation.com'
  ];
  
  const domain = extractDomain(url);
  if (!domain) return false;
  
  return trustedDomains.some(trustedDomain => 
    domain === trustedDomain || domain.endsWith(`.${trustedDomain}`)
  );
}

/**
 * Normaliza uma URL de imagem
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  
  // Se já é uma URL completa, retorna como está
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Se é uma URL relativa com //, adiciona https:
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  
  // Se é uma URL local, adiciona / no início se necessário
  if (!url.startsWith('/')) {
    return `/${url}`;
  }
  
  return url;
}

/**
 * Gera uma URL de placeholder para imagens
 */
export function getPlaceholderUrl(width: number = 400, height: number = 300, text?: string): string {
  const baseUrl = 'https://via.placeholder.com';
  const size = `${width}x${height}`;
  const color = 'CCCCCC';
  const textColor = '666666';
  const placeholderText = text || `${width}x${height}`;
  
  return `${baseUrl}/${size}/${color}/${textColor}?text=${encodeURIComponent(placeholderText)}`;
}

/**
 * Gera uma URL de imagem aleatória do Unsplash
 */
export function getUnsplashUrl(width: number = 400, height: number = 300, query?: string): string {
  const baseUrl = 'https://images.unsplash.com';
  const size = `${width}x${height}`;
  const searchQuery = query ? `?${encodeURIComponent(query)}` : '';
  
  return `${baseUrl}/random/${size}${searchQuery}`;
}

/**
 * Gera uma URL de imagem aleatória do Picsum
 */
export function getPicsumUrl(width: number = 400, height: number = 300, seed?: number): string {
  const baseUrl = 'https://picsum.photos';
  const size = `${width}/${height}`;
  const seedParam = seed ? `?random=${seed}` : '';
  
  return `${baseUrl}/${size}${seedParam}`;
}

/**
 * Configura uma imagem com validação
 */
export function configureImage(image: {
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
}): ImageUrlConfig {
  const isExternal = image.isExternal ?? isExternalUrl(image.src);
  const externalDomain = image.externalDomain ?? extractDomain(image.src) ?? undefined;
  
  return {
    src: normalizeImageUrl(image.src),
    isExternal,
    externalDomain
  };
}

/**
 * Configura uma imagem de galeria com domínio extraído automaticamente
 */
export function configureGalleryImage(image: {
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
}): {
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal: boolean;
  externalDomain?: string;
} {
  const isExternal = image.isExternal ?? isExternalUrl(image.src);
  const externalDomain = isExternal ? (image.externalDomain ?? extractDomain(image.src) ?? undefined) : undefined;
  
  return {
    src: normalizeImageUrl(image.src),
    alt: image.alt,
    title: image.title,
    category: image.category,
    isExternal,
    externalDomain
  };
}

/**
 * Processa todas as imagens de um tema, extraindo domínios automaticamente
 */
export function processThemeImages(images: Array<{
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
}>): Array<{
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal: boolean;
  externalDomain?: string;
}> {
  return images.map(image => configureGalleryImage(image));
}
