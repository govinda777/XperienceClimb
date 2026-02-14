import { GET } from '../route';
import { PACKAGES } from '@/lib/constants';

describe('GET /api/packages', () => {
  it('should return packages with prices in reais', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(Object.values(PACKAGES).length);

    // Check first package
    const firstPackage = data.data[0];
    const originalPackage = Object.values(PACKAGES).find(p => p.id === firstPackage.id);

    expect(originalPackage).toBeDefined();
    if (originalPackage) {
      expect(firstPackage.price).toBe(originalPackage.price / 100);
      if (originalPackage.originalPrice) {
        expect(firstPackage.originalPrice).toBe(originalPackage.originalPrice / 100);
      }
    }
  });
});
