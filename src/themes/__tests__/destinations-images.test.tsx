import fs from 'fs';
import path from 'path';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { generateStaticParams } from '@/app/destinos/[slug]/page';
import { pedraBellaTheme, fazendaIpanemaTheme } from '@/themes/configs';
import { THEME_IDS, isValidThemeId } from '@/lib/theme-utils';
import { COMMUNITY_DATA } from '@/lib/community-data';
import { TourRepository } from '@/infrastructure/repositories/TourRepository';
import { Navigation } from '@/components/layout/Navigation';
import {
  HeroSection,
  AboutSection,
  BeginnerSection,
  SafetySection,
  GallerySection,
  CommunitySection,
  Footer,
} from '@/components/sections';
import type { ThemeConfig } from '@/themes/types';

const THEMES_BY_SLUG: Record<string, ThemeConfig> = {
  'pedra-bela': pedraBellaTheme,
  'fazenda-ipanema': fazendaIpanemaTheme,
};

let activeTestTheme: ThemeConfig = pedraBellaTheme;

jest.mock('next/navigation', () => ({
  usePathname: () => `/destinos/${activeTestTheme.id}`,
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/themes/ThemeProvider', () => ({
  useTheme: () => ({
    currentTheme: activeTestTheme,
    availableThemes: [pedraBellaTheme, fazendaIpanemaTheme],
    setTheme: jest.fn(),
    isLoading: false,
    refreshThemes: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

/**
 * Extrai o caminho local (em `public/`) a partir de um atributo `src` de `<img>`
 * (suporta tanto caminhos diretos `/images/...` quanto URLs otimizadas `/_next/image?url=...`).
 */
function resolveLocalPublicPathFromImgSrc(src: string): string {
  if (src.startsWith('/_next/image')) {
    const urlObj = new URL(src, 'http://localhost');
    const encodedUrl = urlObj.searchParams.get('url');
    return encodedUrl ? decodeURIComponent(encodedUrl) : src;
  }
  return src;
}

const validatedFilesCache = new Set<string>();

/**
 * Valida rapidamente (lendo apenas os primeiros 16 bytes para binários) se o arquivo físico
 * existe em `public/`, não está vazio e possui assinatura binária (magic bytes / estrutura SVG)
 * válida compatível com sua extensão para evitar imagens corrompidas ou quebradas.
 */
function assertValidPublicMediaFile(mediaUrl: string, publicDir: string) {
  expect(typeof mediaUrl).toBe('string');
  const normalizedUrl = resolveLocalPublicPathFromImgSrc(mediaUrl);
  expect(normalizedUrl.startsWith('/')).toBe(true);

  const cleanRelativePath = normalizedUrl.split('?')[0].replace(/^\/+/, '');
  const fullPath = path.join(publicDir, cleanRelativePath);

  if (validatedFilesCache.has(fullPath)) {
    return;
  }

  expect(fs.existsSync(fullPath)).toBe(true);

  const stats = fs.statSync(fullPath);
  expect(stats.isFile()).toBe(true);
  expect(stats.size).toBeGreaterThan(0);

  const ext = path.extname(fullPath).toLowerCase();

  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.mp4') {
    const header = Buffer.alloc(16);
    const fd = fs.openSync(fullPath, 'r');
    try {
      const bytesRead = fs.readSync(fd, header, 0, 16, 0);
      expect(bytesRead).toBeGreaterThanOrEqual(8);
    } finally {
      fs.closeSync(fd);
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG magic bytes: FF D8 FF
      expect(stats.size).toBeGreaterThan(100);
      expect(header[0]).toBe(0xff);
      expect(header[1]).toBe(0xd8);
      expect(header[2]).toBe(0xff);
    } else if (ext === '.png') {
      // PNG magic bytes: 89 50 4E 47
      expect(stats.size).toBeGreaterThan(100);
      expect(header[0]).toBe(0x89);
      expect(header[1]).toBe(0x50);
      expect(header[2]).toBe(0x4e);
      expect(header[3]).toBe(0x47);
    } else if (ext === '.mp4') {
      // MP4 box signature 'ftyp' nos bytes 4..8
      expect(stats.size).toBeGreaterThan(1000);
      expect(header.subarray(4, 8).toString('ascii')).toBe('ftyp');
    }
  } else if (ext === '.svg') {
    const content = fs.readFileSync(fullPath, 'utf8');
    expect(content).toContain('<svg');
    expect(content).toContain('</svg>');
  } else {
    throw new Error(`Extensão de mídia não suportada ou inesperada: ${ext} em ${mediaUrl}`);
  }

  validatedFilesCache.add(fullPath);
}

/**
 * Coleta todas as URLs de imagens/ícones/vídeos configuradas em um ThemeConfig
 */
function extractAllThemeImagePaths(theme: ThemeConfig): string[] {
  const paths: string[] = [];

  const addIfString = (val?: unknown) => {
    if (typeof val === 'string' && val.trim().length > 0) {
      paths.push(val);
    } else if (val && typeof val === 'object' && 'src' in val) {
      const srcVal = (val as { src: unknown }).src;
      if (typeof srcVal === 'string' && srcVal.trim().length > 0) {
        paths.push(srcVal);
      }
    }
  };

  // 1. Brand / Navbar
  addIfString(theme.brand?.icon);

  // 2. Hero Section
  addIfString(theme.heroSection?.photo?.src);
  addIfString(theme.heroSection?.photo?.botanicalLeavesSvg);

  // 3. Destination Section (#lugar)
  for (const card of theme.destinationSection?.cards || []) {
    addIfString(card.image);
  }

  // 4. Beginner Section (#batismo)
  addIfString(theme.beginnerSection?.polaroid?.illustrationSvg);

  // 5. Safety Section (#seguranca)
  for (const icon of theme.safetySection?.equipmentIcons || []) {
    addIfString(icon.src);
  }

  // 6. Gallery Section (#galeria)
  for (const img of theme.gallerySection?.images || []) {
    addIfString(img.src);
  }
  for (const vid of theme.gallerySection?.videos || []) {
    addIfString(vid.src);
  }

  // 7. Community Section (#comunidade)
  for (const instructor of theme.communitySection?.instructors || []) {
    addIfString(instructor.photo);
  }
  for (const location of theme.communitySection?.locations || []) {
    addIfString(location.image);
  }

  // 8. Footer Section (#footer)
  addIfString(theme.footerSection?.brand?.logo);

  // 9. SEO & Retro-compatibility fields
  addIfString(theme.seo?.ogImage);
  addIfString(theme.content?.about?.image);
  for (const img of theme.gallery?.images || []) {
    addIfString(img.src);
  }

  return paths;
}

describe('Validação Automatizada de Todos os Destinos e Integridade de Imagens', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const staticParams = generateStaticParams();
  const destinationSlugs = staticParams.map(param => param.slug);

  it('garante que todos os destinos registrados em THEME_IDS possuem rota estática em /destinos/[slug]', () => {
    const themeIdValues = Object.values(THEME_IDS);
    expect(destinationSlugs.length).toBeGreaterThanOrEqual(2);

    for (const themeId of themeIdValues) {
      expect(destinationSlugs).toContain(themeId);
      expect(isValidThemeId(themeId)).toBe(true);
      expect(THEMES_BY_SLUG[themeId]).toBeDefined();
    }
  });

  describe.each(destinationSlugs)('Destino: /destinos/%s', slug => {
    const theme = THEMES_BY_SLUG[slug];

    beforeEach(() => {
      activeTestTheme = theme;
    });

    it('possui configuração completa de seções obrigatórias e textos de acessibilidade (alt)', () => {
      expect(theme).toBeDefined();
      expect(theme.id).toBe(slug);
      expect(theme.name.trim().length).toBeGreaterThan(0);

      // Hero photo & alt
      expect(theme.heroSection?.photo?.src).toBeTruthy();
      expect(theme.heroSection?.photo?.alt?.trim().length).toBeGreaterThanOrEqual(5);

      // Cards do lugar
      expect(theme.destinationSection?.cards?.length).toBeGreaterThanOrEqual(2);
      for (const card of theme.destinationSection!.cards) {
        expect(card.image).toBeTruthy();
        expect(card.alt.trim().length).toBeGreaterThanOrEqual(5);
      }

      // Galeria de fotos
      expect(theme.gallerySection?.images?.length).toBeGreaterThanOrEqual(4);
      for (const img of theme.gallerySection!.images) {
        expect(img.src).toBeTruthy();
        expect(img.alt.trim().length).toBeGreaterThanOrEqual(10);
      }

      // Comunidade (Instrutores e Locais)
      expect(theme.communitySection?.instructors?.length).toBeGreaterThanOrEqual(1);
      expect(theme.communitySection?.locations?.length).toBeGreaterThanOrEqual(2);
    });

    it('não possui nenhuma imagem, ícone ou vídeo quebrado/corrompido no disco (public/)', () => {
      const mediaPaths = extractAllThemeImagePaths(theme);
      expect(mediaPaths.length).toBeGreaterThan(10);

      for (const mediaPath of mediaPaths) {
        assertValidPublicMediaFile(mediaPath, publicDir);
      }
    });

    it('renderiza todas as seções visuais do destino no DOM sem nenhuma tag <img> quebrada ou sem src válido', () => {
      const { container, getByRole } = render(
        <div>
          <Navigation />
          <HeroSection />
          <AboutSection />
          <BeginnerSection />
          <GallerySection />
          <SafetySection />
          <CommunitySection />
          <Footer />
        </div>
      );

      const collectAndValidateDomImages = () => {
        const imgElements = Array.from(container.querySelectorAll('img'));
        expect(imgElements.length).toBeGreaterThan(10);

        for (const imgEl of imgElements) {
          const srcAttr = imgEl.getAttribute('src');
          expect(srcAttr).toBeTruthy();
          assertValidPublicMediaFile(srcAttr!, publicDir);
        }
      };

      // 1. Valida todas as tags <img> na renderização inicial (aba Instrutores + Galeria Todas)
      collectAndValidateDomImages();

      // 2. Alterna para a aba "Locais" na seção Comunidade e valida as imagens renderizadas
      const locaisBtn = getByRole('button', { name: /Locais/i });
      fireEvent.click(locaisBtn);
      collectAndValidateDomImages();
    });
  });

  it('valida integridade de todas as imagens referenciadas em TourRepository e COMMUNITY_DATA', () => {
    const repo = TourRepository.getInstance();
    const tours = repo.exportData();
    expect(tours.length).toBeGreaterThanOrEqual(2);

    const additionalPaths: string[] = [];

    for (const tour of tours) {
      if (tour.seo?.ogImage) additionalPaths.push(tour.seo.ogImage);
      for (const img of tour.gallery?.images || []) {
        if (typeof img.src === 'string') additionalPaths.push(img.src);
      }
    }

    for (const partner of COMMUNITY_DATA.partners) {
      if (partner.logo) additionalPaths.push(partner.logo);
    }
    for (const instructor of COMMUNITY_DATA.instructors) {
      if (instructor.photo) additionalPaths.push(instructor.photo);
    }
    for (const proc of COMMUNITY_DATA.safetyProcedures) {
      for (const step of proc.steps) {
        if (step.visualAid) additionalPaths.push(step.visualAid);
      }
    }
    for (const loc of COMMUNITY_DATA.visitedLocations) {
      for (const img of loc.images) {
        if (img.url) additionalPaths.push(img.url);
      }
    }

    expect(additionalPaths.length).toBeGreaterThan(0);
    for (const mediaPath of additionalPaths) {
      assertValidPublicMediaFile(mediaPath, publicDir);
    }
  });
});
