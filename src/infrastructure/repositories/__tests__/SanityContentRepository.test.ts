import { SanityContentRepository } from '@/infrastructure/repositories/SanityContentRepository';

describe('SanityContentRepository', () => {
  let repository: SanityContentRepository;

  beforeEach(() => {
    // Force mock mode explicitly
    repository = new SanityContentRepository(true);
  });

  it('should return site settings in mock mode', async () => {
    const siteSettings = await repository.getActiveSite();
    expect(siteSettings).not.toBeNull();
    expect(siteSettings?.activeDestination?.id).toBe('pedra-bela');
    expect(siteSettings?.contactInfo?.email).toBe('contato@xperienceclimb.com.br');
  });

  it('should return home page configuration in mock mode', async () => {
    const homePage = await repository.getHomePage();
    expect(homePage).not.toBeNull();
    expect(homePage?.sectionOrder).toContain('hero');
  });

  it('should return destination by slug in mock mode', async () => {
    const dest = await repository.getDestinationBySlug('pedra-bela');
    expect(dest).not.toBeNull();
    expect(dest?.name).toBe('Pedra Bela Vista');

    const ipanema = await repository.getDestinationBySlug('fazenda-ipanema');
    expect(ipanema).not.toBeNull();
    expect(ipanema?.name).toBe('Fazenda Ipanema / FLONA');
  });

  it('should return list of published packages in mock mode', async () => {
    const pkgs = await repository.listPublishedPackages();
    expect(pkgs).toHaveLength(4);
    expect(pkgs[0].name).toBe('Agarrão');
  });
});
