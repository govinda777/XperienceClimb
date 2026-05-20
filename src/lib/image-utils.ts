/**
 * Utilitários para gerenciamento de imagens externas
 */

import { StaticImageData } from 'next/image';

/**
 * Valida se uma URL é externa
 */
export function isExternalUrl(url: string | StaticImageData): boolean {
  if (!url) return false;
  if (typeof url !== 'string') return false; // StaticImageData is local

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
export function extractDomain(url: string | StaticImageData): string | null {
  if (typeof url !== 'string') return null;
  try {
    const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Normaliza uma URL de imagem
 */
export function normalizeImageUrl(url: string | StaticImageData): string | StaticImageData {
  if (!url) return '';
  if (typeof url !== 'string') return url;

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
 * Configura uma imagem de galeria com domínio extraído automaticamente
 */
export function configureGalleryImage(image: {
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
  isVideo?: boolean;
}): {
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  isExternal: boolean;
  externalDomain?: string;
  isVideo?: boolean;
} {
  const isExternal = image.isExternal ?? isExternalUrl(image.src);
  const externalDomain = isExternal
    ? (image.externalDomain ?? extractDomain(image.src) ?? undefined)
    : undefined;

  return {
    src: normalizeImageUrl(image.src),
    alt: image.alt,
    title: image.title,
    category: image.category,
    isExternal,
    externalDomain,
    isVideo: image.isVideo,
  };
}

/**
 * Processa todas as imagens de um tema, extraindo domínios automaticamente
 */
export function processThemeImages(
  images: Array<{
    src: string | StaticImageData;
    alt: string;
    title: string;
    category: string;
    isExternal?: boolean;
    externalDomain?: string;
    isVideo?: boolean;
  }>
): Array<{
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  isExternal: boolean;
  externalDomain?: string;
  isVideo?: boolean;
}> {
  return images.map(image => configureGalleryImage(image));
}
