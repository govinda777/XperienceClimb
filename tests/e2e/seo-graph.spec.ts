import { test, expect } from '@playwright/test';

function tokenizeShingles(text: string, k = 3): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u00FF\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) {
    shingles.add(words.slice(i, i + k).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  Array.from(setA).forEach(item => {
    if (setB.has(item)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

test.describe('Advanced SEO Graph, Uniqueness & SSR Parity Suite', () => {
  test('1. Wave 1 SSR Check (javaScriptEnabled: false) & Anti-Duplication (Jaccard Similarity)', async ({
    browser,
  }) => {
    const ssrContext = await browser.newContext({ javaScriptEnabled: false });
    const page = await ssrContext.newPage();

    // Capture Wave 1 SSR HTML on Home (/)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const homeTitle = await page.title();
    const homeH1 = (await page.locator('h1').textContent())?.trim() || '';
    const homeMainText = (await page.locator('main').innerText()) || '';

    expect(homeTitle).toContain('Pedra Bela');
    expect(homeTitle).not.toContain('| Xperience Climb | Xperience Climb');
    expect(await page.locator('h1').count()).toBe(1);

    // Capture Wave 1 SSR HTML on /destinos/fazenda-ipanema
    await page.goto('/destinos/fazenda-ipanema', { waitUntil: 'domcontentloaded' });
    const flonaTitle = await page.title();
    const flonaH1 = (await page.locator('h1').textContent())?.trim() || '';
    const flonaMainText = (await page.locator('main').innerText()) || '';

    expect(flonaTitle).toContain('Fazenda Ipanema');
    expect(flonaTitle).not.toContain('| Xperience Climb | Xperience Climb');
    expect(await page.locator('h1').count()).toBe(1);
    expect(flonaH1).not.toBe(homeH1);
    expect(flonaH1.toUpperCase()).toContain('FAZENDA IPANEMA');

    // Compute 3-gram Jaccard Similarity between / and /destinos/fazenda-ipanema
    const homeShingles = tokenizeShingles(homeMainText, 3);
    const flonaShingles = tokenizeShingles(flonaMainText, 3);
    const similarity = jaccardSimilarity(homeShingles, flonaShingles);

    // Distinct canonical destinations must have < 0.55 3-gram similarity in SSR Wave 1
    expect(similarity).toBeLessThan(0.55);

    await ssrContext.close();
  });

  test('2. Crawl Graph & Orphan Page Detection from Home (/)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const hrefs = await page
      .locator('a[href]')
      .evaluateAll(links => links.map(a => a.getAttribute('href') || ''));

    // Every strategic route in sitemap.ts must be reachable within 1 click from Home (/)
    const requiredInternalRoutes = [
      '/guia-escalada-iniciantes-sp',
      '/destinos/pedra-bela',
      '/destinos/fazenda-ipanema',
      '/politica-de-privacidade',
      '/termos-de-uso',
    ];

    for (const route of requiredInternalRoutes) {
      expect(hrefs).toContain(route);
    }
  });

  test('3. JSON-LD Schema Integrity & Single FAQPage per Route', async ({ page }) => {
    const publicRoutes = [
      '/',
      '/guia-escalada-iniciantes-sp',
      '/destinos/fazenda-ipanema',
      '/politica-de-privacidade',
      '/termos-de-uso',
    ];

    for (const route of publicRoutes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      // Must have exactly 1 <h1>
      await expect(page.locator('h1')).toHaveCount(1);

      // Extract all application/ld+json scripts
      const jsonLdScripts = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll(scripts => scripts.map(s => s.textContent || ''));

      let faqPageCount = 0;
      for (const raw of jsonLdScripts) {
        const parsed = JSON.parse(raw);
        const entities = parsed['@graph'] ? parsed['@graph'] : [parsed];
        for (const entity of entities) {
          if (entity['@type'] === 'FAQPage') {
            faqPageCount++;
          }
        }
      }

      // Google Rich Results requirement: at most 1 FAQPage per URL
      expect(faqPageCount).toBeLessThanOrEqual(1);
    }
  });
});
