import { GET } from '../route';
import { NextResponse } from 'next/server';

jest.mock('@/infrastructure/repositories/SanityContentRepository', () => {
  return {
    SanityContentRepository: jest.fn().mockImplementation(() => {
      return {
        listPublishedPackages: jest.fn().mockResolvedValue([
          {
            id: 'agarrao-cms',
            name: 'Agarrão CMS',
            price: { amount: 15000, currency: 'BRL' },
            description: 'CMS Package description',
            features: ['CMS Feature 1'],
            commerceProductId: 'agarrao-cms-prod'
          }
        ])
      };
    })
  };
});

describe('Packages API Route', () => {
  const originalEnv = process.env.NEXT_PUBLIC_CMS_ENABLED;

  afterEach(() => {
    process.env.NEXT_PUBLIC_CMS_ENABLED = originalEnv;
  });

  it('should return static legacy packages when CMS is disabled', async () => {
    process.env.NEXT_PUBLIC_CMS_ENABLED = 'false';
    const request = new Request('http://localhost/api/packages');
    const response = await GET(request);
    const json = await response.json();

    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
    expect(json.data[0].id).not.toBe('agarrao-cms');
  });

  it('should return CMS packages when CMS is enabled', async () => {
    process.env.NEXT_PUBLIC_CMS_ENABLED = 'true';
    const request = new Request('http://localhost/api/packages');
    const response = await GET(request);
    const json = await response.json();

    expect(json.success).toBe(true);
    expect(json.data[0].id).toBe('agarrao-cms');
    expect(json.data[0].name).toBe('Agarrão CMS');
  });
});
