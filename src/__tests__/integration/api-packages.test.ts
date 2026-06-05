/**
 * Integration tests for Packages API endpoints
 * Tests the complete flow from HTTP request to response
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/packages/route';

// We mock the constants to control the returned packages in tests
jest.mock('@/lib/constants', () => {
  return {
    get PACKAGES() {
      const mockData = (global as any).__MOCK_PACKAGES__;
      return mockData !== undefined ? mockData : {};
    },
  };
});

const mockPackagesData = {
  'pkg-1': {
    id: 'pkg-1',
    name: 'Escalada Iniciante',
    price: 15000,
    originalPrice: 20000,
    description: 'Perfeito para iniciantes',
    features: ['Segurança'],
    bonus: ['Fotos'],
    shape: 'circle',
    color: 'bg-green-500',
    duration: '4 horas',
    maxParticipants: 8,
    popular: false,
    disabled: false,
  },
  'pkg-2': {
    id: 'pkg-2',
    name: 'Escalada Avançada',
    price: 25000,
    description: 'Para experientes',
    shape: 'hexagon',
    disabled: true,
  },
};

describe('Packages API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).__MOCK_PACKAGES__ = mockPackagesData;
  });

  describe('GET /api/packages', () => {
    it('should return all packages successfully mapped', async () => {
      const request = new NextRequest('http://localhost:3000/api/packages');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0]).toMatchObject({
        id: 'pkg-1',
        name: 'Escalada Iniciante',
        price: 150, // Converted to reais
        originalPrice: 200,
      });
    });

    it('should return empty array when no packages exist', async () => {
      (global as any).__MOCK_PACKAGES__ = {};
      const request = new NextRequest('http://localhost:3000/api/packages');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual([]);
    });

    it('should handle packages with missing optional fields', async () => {
      (global as any).__MOCK_PACKAGES__ = {
        'pkg-3': {
          id: 'pkg-3',
          name: 'Minimal',
          price: 10000,
        },
      };

      const request = new NextRequest('http://localhost:3000/api/packages');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data[0]).not.toHaveProperty('originalPrice');
      expect(data.data[0]).not.toHaveProperty('bonus');
      // Should have defaults assigned by the route
      expect(data.data[0].shape).toBe('hexagon');
      expect(data.data[0].color).toBe('climb-300');
    });

    it('should handle invalid data gracefully', async () => {
      // Força um erro ao tentar iterar sobre null
      (global as any).__MOCK_PACKAGES__ = null;
      const request = new NextRequest('http://localhost:3000/api/packages');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to fetch packages');
    });

    it('should validate response schema', async () => {
      const request = new NextRequest('http://localhost:3000/api/packages');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toMatchObject({
        success: expect.any(Boolean),
        data: expect.any(Array),
      });

      const packageData = data.data[0];
      expect(packageData.id).toMatch(/^pkg-/);
      expect(packageData.price).toBeGreaterThan(0);
      expect(['circle', 'hexagon', 'triangle']).toContain(packageData.shape);
    });
  });
});
