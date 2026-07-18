import { LegacyContentRepository } from '@/infrastructure/repositories/LegacyContentRepository';

describe('LegacyContentRepository', () => {
  let repository: LegacyContentRepository;

  beforeEach(() => {
    repository = new LegacyContentRepository();
  });

  it('should return site settings', async () => {
    const siteSettings = await repository.getActiveSite();
    expect(siteSettings).not.toBeNull();
    expect(siteSettings?.activeDestination?.id).toBe('pedra-bela');
    expect(siteSettings?.contactInfo?.email).toBe('contato@xperienceclimb.com.br');
  });

  it('should return home page configuration', async () => {
    const homePage = await repository.getHomePage();
    expect(homePage).not.toBeNull();
    expect(homePage?.sectionOrder).toContain('hero');
  });

  it('should return destination by slug', async () => {
    const dest = await repository.getDestinationBySlug('pedra-bela');
    expect(dest).not.toBeNull();
    expect(dest?.name).toBe('Pedra Bela Vista');

    const ipanema = await repository.getDestinationBySlug('fazenda-ipanema');
    expect(ipanema).not.toBeNull();
    expect(ipanema?.name).toBe('Fazenda Ipanema / FLONA');
  });

  it('should return list of published packages', async () => {
    const pkgs = await repository.listPublishedPackages();
    expect(pkgs).toHaveLength(4);
    expect(pkgs[0].name).toBe('Pacote AGARRÃO');
  });

  it('should return list of testimonials', async () => {
    const testimonials = await repository.listTestimonials();
    expect(testimonials).toHaveLength(3);
    expect(testimonials[0].name).toBe('Ana Carolina');
  });

  it('should return list of services', async () => {
    const services = await repository.listIncludedServices();
    expect(services).toHaveLength(3);
    expect(services[0].title).toBe('Condutores Certificados');
  });

  it('should return list of safety procedures', async () => {
    const procedures = await repository.listSafetyProcedures();
    expect(procedures).toHaveLength(1);
    expect(procedures[0].title).toBe('Verificação Pré-Escalada');
  });

  it('should return list of visited locations', async () => {
    const locations = await repository.listVisitedLocations();
    expect(locations).toHaveLength(2);
    expect(locations[0].name).toBe('Pedra Bela Vista');
  });
});
