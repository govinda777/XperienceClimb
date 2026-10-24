import { test, expect, type Page } from '@playwright/test';

interface DestinationSpec {
  slug: string;
  route: string;
  expectedName: string;
  expectedHeroHighlight: string;
}

const DESTINATIONS: DestinationSpec[] = [
  {
    slug: 'pedra-bela',
    route: '/destinos/pedra-bela',
    expectedName: 'Pedra Bela',
    expectedHeroHighlight: 'ROCHA',
  },
  {
    slug: 'fazenda-ipanema',
    route: '/destinos/fazenda-ipanema',
    expectedName: 'Fazenda Ipanema',
    expectedHeroHighlight: 'FAZENDA IPANEMA',
  },
];

interface ImageRenderReport {
  src: string;
  currentSrc: string;
  alt: string;
  complete: boolean;
  naturalWidth: number;
  naturalHeight: number;
  loading: string;
}

/**
 * Percorre todas as tags <img> visíveis na página, traz cada uma para a viewport
 * para acionar o IntersectionObserver de imagens lazy (`next/image`), aguarda o
 * término do decode/load e valida que 100% delas possuem `complete === true` e `naturalWidth > 0`.
 */
async function scrollAndAssertAllImagesRendered(page: Page, contextLabel: string) {
  const imageReports: ImageRenderReport[] = await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];

    for (const img of imgs) {
      img.scrollIntoView({ behavior: 'instant', block: 'center' });
      // Se for lazy, força eager ao entrar na viewport e aguarda carregamento
      if (img.loading === 'lazy') {
        img.loading = 'eager';
      }
      const start = Date.now();
      while ((!img.complete || img.naturalWidth === 0) && Date.now() - start < 8000) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return imgs.map(el => ({
      src: el.getAttribute('src') || '',
      currentSrc: el.currentSrc || '',
      alt: el.getAttribute('alt') || '',
      complete: el.complete,
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      loading: el.loading,
    }));
  });

  expect(
    imageReports.length,
    `[${contextLabel}] Nenhuma imagem encontrada na página`
  ).toBeGreaterThan(5);

  const brokenImages = imageReports.filter(
    img => !img.src || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0
  );

  expect(
    brokenImages,
    `[${contextLabel}] Imagens quebradas ou não renderizadas detectadas:\n${JSON.stringify(
      brokenImages,
      null,
      2
    )}`
  ).toEqual([]);
}

test.describe('Validação de Todos os Destinos e Renderização de Imagens (Zero Broken Images)', () => {
  test('Redirecionamento de /destinos para o destino padrão (/destinos/pedra-bela)', async ({
    page,
  }) => {
    await page.goto('/destinos', { waitUntil: 'load' });
    await expect(page).toHaveURL(/\/destinos\/pedra-bela$/);
    await expect(page.locator('h1')).toBeVisible();
  });

  for (const dest of DESTINATIONS) {
    test(`Destino [${dest.expectedName}] (${dest.route}) renderiza conteúdo e 100% das imagens sem falhas`, async ({
      page,
      request,
    }) => {
      const failedImageNetworkRequests: string[] = [];

      page.on('response', response => {
        const req = response.request();
        const url = response.url();
        const isImageRequest =
          req.resourceType() === 'image' ||
          url.includes('/_next/image') ||
          /\.(jpg|jpeg|png|svg|webp)(\?|$)/i.test(url);

        if (isImageRequest && response.status() >= 400) {
          failedImageNetworkRequests.push(`${response.status()} ${url}`);
        }
      });

      page.on('requestfailed', req => {
        const url = req.url();
        const isImageRequest =
          req.resourceType() === 'image' ||
          url.includes('/_next/image') ||
          /\.(jpg|jpeg|png|svg|webp)(\?|$)/i.test(url);
        const errorText = req.failure()?.errorText || 'unknown error';
        if (isImageRequest && !errorText.includes('ERR_ABORTED')) {
          failedImageNetworkRequests.push(`FAILED (${errorText}) ${url}`);
        }
      });

      await page.goto(dest.route, { waitUntil: 'load' });

      // 1. Valida identidade do destino no Hero e título
      await expect(page).toHaveTitle(new RegExp(dest.expectedName, 'i'));
      await expect(page.locator('h1')).toContainText(dest.expectedHeroHighlight);

      // 2. Valida imagem OpenGraph no <head>
      const ogImageContent = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content');
      expect(ogImageContent).toBeTruthy();
      const ogUrlPath = ogImageContent!.startsWith('http')
        ? new URL(ogImageContent!).pathname
        : ogImageContent!;
      const ogResponse = await request.get(ogUrlPath);
      expect(ogResponse.status(), `OG Image ${ogUrlPath} retornou erro`).toBe(200);
      expect(ogResponse.headers()['content-type']).toMatch(/^image\//);

      // 3. Faz scroll completo e valida todas as imagens visíveis por padrão
      await scrollAndAssertAllImagesRendered(page, `${dest.slug} - Inicial`);

      // 4. Valida imagens na seção Comunidade ao alternar para a aba "Locais"
      const communitySection = page.locator('#comunidade');
      await communitySection.scrollIntoViewIfNeeded();
      const locaisTabButton = communitySection.getByRole('button', { name: /Locais/i });
      await expect(locaisTabButton).toBeVisible();
      await locaisTabButton.click();

      await scrollAndAssertAllImagesRendered(page, `${dest.slug} - Aba Comunidade > Locais`);

      // 5. Valida categorias da Galeria e abertura do Lightbox (imagem ampliada)
      const gallerySection = page.locator('#galeria');
      await gallerySection.scrollIntoViewIfNeeded();

      const firstGalleryCard = gallerySection.locator('.grid > div.cursor-pointer').first();
      await expect(firstGalleryCard).toBeVisible();
      await firstGalleryCard.click();

      const closeModalBtn = page.getByRole('button', { name: 'Fechar visualização' });
      await expect(closeModalBtn).toBeVisible();

      await scrollAndAssertAllImagesRendered(page, `${dest.slug} - Lightbox Modal`);
      await closeModalBtn.click();

      // 6. Garante zero erros de rede em requisições de imagens durante toda a sessão
      expect(
        failedImageNetworkRequests,
        `Falhas de rede em imagens no destino ${dest.slug}: ${failedImageNetworkRequests.join(', ')}`
      ).toEqual([]);
    });
  }

  test('Troca dinâmica de destino pelo seletor do menu mantém todas as imagens íntegras', async ({
    page,
  }) => {
    await page.goto('/destinos/pedra-bela', { waitUntil: 'load' });

    const selectorBtn = page.getByRole('button', { name: /Selecionar destino/i });
    await expect(selectorBtn).toBeVisible();
    await selectorBtn.click();

    const fazendaOption = page.getByRole('option', { name: /Fazenda Ipanema/i });
    await expect(fazendaOption).toBeVisible();
    await fazendaOption.click();

    await expect(page).toHaveURL(/\/destinos\/fazenda-ipanema$/);
    await expect(page.locator('h1')).toContainText('FAZENDA IPANEMA');

    await scrollAndAssertAllImagesRendered(page, 'Troca de Destino via Navbar -> Fazenda Ipanema');
  });
});
