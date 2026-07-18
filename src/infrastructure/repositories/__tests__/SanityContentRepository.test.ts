import { SanityContentRepository } from '@/infrastructure/repositories/SanityContentRepository';
import { LegacyContentRepository } from '@/infrastructure/repositories/LegacyContentRepository';

const mockFetch = jest.fn();

jest.mock('@sanity/client', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        fetch: mockFetch,
      };
    }),
  };
});

describe('SanityContentRepository', () => {
  let repository: SanityContentRepository;
  let legacyRepository: LegacyContentRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new SanityContentRepository();
    legacyRepository = new LegacyContentRepository();
  });

  it('should return site settings from Sanity when query succeeds', async () => {
    const mockSanitySite = {
      nextEventStartsAt: '2026-09-01T08:00:00Z',
      contactInfo: { email: 'sanity@xperienceclimb.com' },
      activeDestination: {
        name: 'Sanity Destination',
        slug: { current: 'sanity-dest' },
      },
    };
    mockFetch.mockResolvedValueOnce(mockSanitySite);

    const siteSettings = await repository.getActiveSite();
    expect(siteSettings).not.toBeNull();
    expect(siteSettings?.activeDestination?.id).toBe('sanity-dest');
    expect(siteSettings?.contactInfo?.email).toBe('sanity@xperienceclimb.com');
  });

  it('should fallback to LegacyContentRepository when Sanity query fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Sanity error'));

    const siteSettings = await repository.getActiveSite();
    const legacySiteSettings = await legacyRepository.getActiveSite();

    expect(siteSettings).not.toBeNull();
    expect(siteSettings).toEqual(legacySiteSettings);
  });

  it('should return home page from Sanity when query succeeds', async () => {
    const mockSanityHomePage = {
      title: 'Sanity Home',
      sectionOrder: ['hero', 'packages'],
    };
    mockFetch.mockResolvedValueOnce(mockSanityHomePage);

    const homePage = await repository.getHomePage();
    expect(homePage).not.toBeNull();
    expect(homePage?.title).toBe('Sanity Home');
  });

  it('should fallback to LegacyContentRepository for homepage when Sanity query fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Sanity error'));

    const homePage = await repository.getHomePage();
    const legacyHomePage = await legacyRepository.getHomePage();

    expect(homePage).not.toBeNull();
    expect(homePage).toEqual(legacyHomePage);
  });
});
