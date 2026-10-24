import fs from 'fs';
import path from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import StructuredData from '../StructuredData';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { metadata as rootMetadata } from '@/app/layout';
import { metadata as homeMetadata } from '@/app/page';
import { metadata as guiaMetadata } from '@/app/guia-escalada-iniciantes-sp/page';
import { metadata as privacyMetadata } from '@/app/politica-de-privacidade/page';
import { metadata as termsMetadata } from '@/app/termos-de-uso/page';
import { generateMetadata as generateDestinoMetadata } from '@/app/destinos/[slug]/page';
import { pedraBellaTheme, fazendaIpanemaTheme } from '@/themes/configs';

describe('SEO Contracts & Technical Validation Suite', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const baseUrl = 'https://climb.xperiencehubs.com';

  describe('1. Physical Existence of OpenGraph, Twitter & Theme Images (No 404s)', () => {
    it('ensures all OpenGraph and theme SEO images exist physically in public/', () => {
      const imagePaths = [
        '/images/site-og.jpg',
        pedraBellaTheme.seo.ogImage,
        fazendaIpanemaTheme.seo.ogImage,
        '/images/themes/pedra-bela/hero.jpg',
        '/images/themes/fazenda-ipanema/hero.jpg',
        '/assets/logo.svg',
      ];

      for (const imgPath of imagePaths) {
        const fullPath = path.join(publicDir, imgPath);
        expect(fs.existsSync(fullPath)).toBe(true);
        const stats = fs.statSync(fullPath);
        expect(stats.size).toBeGreaterThan(1000);
      }
    });

    it('ensures all gallery, hero, destination and community images in Pedra Bela and Fazenda Ipanema exist locally and follow naming conventions', () => {
      const themes = [pedraBellaTheme, fazendaIpanemaTheme];
      const validFilePattern =
        /^\/images\/themes\/[a-z0-9-]+\/(hero|og-image|escalada-\d+|paisagem-\d+|restaurante-\d+|tirolesa-\d+|mapa-\d+|video-\d+)\.(jpg|png|mp4)$/;

      for (const theme of themes) {
        const rawMediaPaths = [
          theme.seo.ogImage,
          ...(theme.heroSection?.photo?.src ? [theme.heroSection.photo.src] : []),
          ...(theme.destinationSection?.cards?.map(c => c.image) || []),
          ...(theme.gallerySection?.images?.map(i => i.src) || []),
          ...(theme.gallerySection?.videos?.map(v => v.src) || []),
          ...(theme.communitySection?.locations?.map(l => l.image) || []),
          ...(theme.communitySection?.instructors?.map(i => i.photo) || []),
          ...(theme.gallery?.images?.map(i => i.src) || []),
        ];

        for (const item of rawMediaPaths) {
          const mediaPath = typeof item === 'string' ? item : item.src;
          expect(mediaPath).toMatch(validFilePattern);
          const fullPath = path.join(publicDir, mediaPath);
          expect(fs.existsSync(fullPath)).toBe(true);
        }
      }

      const allGalleryImages = [
        ...(pedraBellaTheme.gallerySection?.images || []),
        ...(fazendaIpanemaTheme.gallerySection?.images || []),
      ];

      for (const img of allGalleryImages) {
        expect(img.isExternal).not.toBe(true);
        expect(img.alt.trim().length).toBeGreaterThanOrEqual(10);
      }
    });
  });

  describe('2. Cross-Page Uniqueness Matrix & Title Template N-Gram Check', () => {
    it('prevents duplicate brand suffixes ("| Xperience Climb | Xperience Climb") and enforces length bounds', async () => {
      const templateObj = rootMetadata.title as { default: string; template: string };
      expect(templateObj.template).toBe('%s | Xperience Climb');

      const applyTemplate = (rawTitle: string) => templateObj.template.replace('%s', rawTitle);

      const pedraBelaMeta = await generateDestinoMetadata({
        params: Promise.resolve({ slug: 'pedra-bela' }),
      });
      const fazendaIpanemaMeta = await generateDestinoMetadata({
        params: Promise.resolve({ slug: 'fazenda-ipanema' }),
      });

      const resolvedPages = [
        {
          route: '/',
          title: homeMetadata.title as string,
          description: homeMetadata.description as string,
          canonical: (homeMetadata.alternates as { canonical: string }).canonical,
        },
        {
          route: '/destinos/pedra-bela',
          title: applyTemplate(pedraBelaMeta.title as string),
          description: pedraBelaMeta.description as string,
          canonical: (pedraBelaMeta.alternates as { canonical: string }).canonical,
        },
        {
          route: '/destinos/fazenda-ipanema',
          title: applyTemplate(fazendaIpanemaMeta.title as string),
          description: fazendaIpanemaMeta.description as string,
          canonical: (fazendaIpanemaMeta.alternates as { canonical: string }).canonical,
        },
        {
          route: '/guia-escalada-iniciantes-sp',
          title: applyTemplate(guiaMetadata.title as string),
          description: guiaMetadata.description as string,
          canonical: (guiaMetadata.alternates as { canonical: string }).canonical,
        },
        {
          route: '/politica-de-privacidade',
          title: applyTemplate(privacyMetadata.title as string),
          description: privacyMetadata.description as string,
          canonical: (privacyMetadata.alternates as { canonical: string }).canonical,
        },
        {
          route: '/termos-de-uso',
          title: applyTemplate(termsMetadata.title as string),
          description: termsMetadata.description as string,
          canonical: (termsMetadata.alternates as { canonical: string }).canonical,
        },
      ];

      const seenTitles = new Set<string>();
      const seenDescriptionsByCanonical = new Map<string, string>();

      for (const page of resolvedPages) {
        // 1. Check no duplicate brand suffix
        const brandOccurrences = (page.title.match(/Xperience Climb/gi) || []).length;
        expect(brandOccurrences).toBe(1);

        // 2. Check title length (30..65 chars)
        expect(page.title.length).toBeGreaterThanOrEqual(30);
        expect(page.title.length).toBeLessThanOrEqual(65);

        // 3. Check description length (110..165 chars)
        expect(page.description.length).toBeGreaterThanOrEqual(110);
        expect(page.description.length).toBeLessThanOrEqual(165);

        // 4. Canonical URL format
        expect(page.canonical.startsWith(baseUrl)).toBe(true);

        // 5. Unique titles for distinct canonical URLs
        if (!seenDescriptionsByCanonical.has(page.canonical)) {
          expect(seenTitles.has(page.title)).toBe(false);
          seenTitles.add(page.title);
          seenDescriptionsByCanonical.set(page.canonical, page.description);
        }
      }

      // Specifically verify /destinos/pedra-bela consolidates canonical to root Home
      expect((pedraBelaMeta.alternates as { canonical: string }).canonical).toBe(baseUrl);
      expect((fazendaIpanemaMeta.alternates as { canonical: string }).canonical).toBe(
        `${baseUrl}/destinos/fazenda-ipanema`
      );
    });
  });

  describe('3. Sitemap & Robots Consistency', () => {
    it('ensures no disallowed route in robots.ts is present in sitemap.ts', () => {
      const sitemapEntries = sitemap();
      const robotsConfig = robots();
      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
      const disallowedPaths = (rules.disallow as string[]) || [];

      expect(sitemapEntries.length).toBeGreaterThanOrEqual(5);

      for (const entry of sitemapEntries) {
        expect(entry.url.startsWith(baseUrl)).toBe(true);
        const urlPath = new URL(entry.url).pathname;

        for (const disallow of disallowedPaths) {
          expect(urlPath.startsWith(disallow)).toBe(false);
        }
      }
    });
  });

  describe('4. JSON-LD StructuredData Modularity & Anchor Resolution', () => {
    it('separates global entities from home-only FAQPage/Product/Event to prevent duplicate FAQPage on subpages', () => {
      const { container: globalContainer } = render(<StructuredData mode="global" />);
      const globalScript = globalContainer.querySelector('script[type="application/ld+json"]');
      expect(globalScript).not.toBeNull();
      const globalJson = JSON.parse(globalScript!.innerHTML);
      const globalTypes = globalJson['@graph'].map((item: { '@type': string | string[] }) =>
        Array.isArray(item['@type']) ? item['@type'].join(',') : item['@type']
      );

      expect(globalTypes).toContain('Organization');
      expect(globalTypes).toContain('ItemList');
      expect(globalTypes).not.toContain('FAQPage');
      expect(globalTypes).not.toContain('Product');

      const { container: homeContainer } = render(<StructuredData mode="home" />);
      const homeScript = homeContainer.querySelector('script[type="application/ld+json"]');
      expect(homeScript).not.toBeNull();
      const homeJson = JSON.parse(homeScript!.innerHTML);
      const homeTypes = homeJson['@graph'].map((item: { '@type': string }) => item['@type']);

      expect(homeTypes).toContain('FAQPage');
      expect(homeTypes).toContain('Product');
    });

    it('ensures all SiteNavigationElement anchors match real section IDs in src/components/sections/', () => {
      const { container } = render(<StructuredData mode="global" />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const json = JSON.parse(script!.innerHTML);
      const navList = json['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'ItemList'
      );

      // Read all section files and extract id="..."
      const sectionsDir = path.resolve(process.cwd(), 'src/components/sections');
      const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));
      const allSectionContent = sectionFiles
        .map(f => fs.readFileSync(path.join(sectionsDir, f), 'utf-8'))
        .join('\n');

      for (const navItem of navList.itemListElement) {
        const hash = new URL(navItem.url).hash.replace('#', '');
        expect(hash.length).toBeGreaterThan(0);
        expect(allSectionContent).toContain(`id="${hash}"`);
      }
    });
  });
});
