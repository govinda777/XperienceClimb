/**
 * Integration tests for Packages API endpoints
 * Tests the complete flow from HTTP request to response
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/packages/route';

// Mock the package repository and services
jest.mock('@/infrastructure/repositories/PackageRepository');
jest.mock('@/infrastructure/services/TourService');

// Mock data
const mockPackages = [
  {
    id: 'pkg-1',
    name: 'Escalada Iniciante',
    price: 150,
    originalPrice: 200,
    description: 'Perfeito para iniciantes na escalada',
    features: [
      'Instrução básica de segurança',
      'Equipamentos de proteção inclusos',
      'Acompanhamento de instrutor certificado'
    ],
    bonus: ['Lanche energético', 'Fotos da experiência'],
    shape: 'circle' as const,
    color: 'bg-green-500',
    duration: '4 horas',
    maxParticipants: 8,
    popular: false,
    disabled: false,
    category: 'beginner',
    difficulty: 'easy',
    includes: ['Capacete', 'Cadeirinha', 'Corda'],
    requirements: ['Idade mínima: 12 anos', 'Boa condição física'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
  },
  {
    id: 'pkg-2',
    name: 'Escalada Avançada',
    price: 250,
    description: 'Para escaladores experientes',
    features: [
      'Rotas desafiadoras',
      'Equipamentos profissionais',
      'Técnicas avançadas'
    ],
    bonus: ['Almoço gourmet', 'Certificado de participação'],
    shape: 'hexagon' as const,
    color: 'bg-orange-500',
    duration: '6 horas',
    maxParticipants: 6,
    popular: true,
    disabled: false,
    category: 'advanced',
    difficulty: 'hard',
    includes: ['Equipamentos profissionais', 'Guia especializado'],
    requirements: ['Experiência prévia obrigatória', 'Certificado médico'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    isActive: true,
  },
  {
    id: 'pkg-3',
    name: 'Escalada Premium',
    price: 350,
    description: 'Experiência exclusiva e personalizada',
    features: [
      'Instrutor particular',
      'Equipamentos premium',
      'Rota personalizada'
    ],
    bonus: ['Jantar especial', 'Vídeo profissional'],
    shape: 'triangle' as const,
    color: 'bg-purple-500',
    duration: '8 horas',
    maxParticipants: 4,
    popular: false,
    disabled: true, // This package is disabled
    category: 'premium',
    difficulty: 'expert',
    includes: ['Equipamentos premium', 'Serviço personalizado'],
    requirements: ['Experiência avançada', 'Reserva antecipada'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    isActive: false,
  },
];

describe('Packages API Integration Tests', () => {
  let mockPackageRepository: any;
  let mockTourService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup mocks
    const { PackageRepository } = require('@/infrastructure/repositories/PackageRepository');
    const { TourService } = require('@/infrastructure/services/TourService');
    
    mockPackageRepository = {
      findAll: jest.fn(),
      findByActive: jest.fn(),
    };
    
    mockTourService = {
      getAllTours: jest.fn(),
      getActiveTours: jest.fn(),
    };
    
    PackageRepository.mockImplementation(() => mockPackageRepository);
    TourService.mockImplementation(() => mockTourService);
  });

  describe('GET /api/packages', () => {
    it('should return all active packages successfully', async () => {
      // Arrange
      const activePackages = mockPackages.filter(pkg => pkg.isActive);
      mockPackageRepository.findByActive.mockResolvedValue(activePackages);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2); // Only active packages
      expect(data.data[0]).toMatchObject({
        id: 'pkg-1',
        name: 'Escalada Iniciante',
        price: 150,
        disabled: false,
      });
      expect(data.data[1]).toMatchObject({
        id: 'pkg-2',
        name: 'Escalada Avançada',
        price: 250,
        popular: true,
      });
    });

    it('should return empty array when no packages exist', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue([]);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockRejectedValue(new Error('Database connection failed'));
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to fetch packages');
    });

    it('should include all required package fields', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue([mockPackages[0]]);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      const packageData = data.data[0];
      expect(packageData).toHaveProperty('id');
      expect(packageData).toHaveProperty('name');
      expect(packageData).toHaveProperty('price');
      expect(packageData).toHaveProperty('description');
      expect(packageData).toHaveProperty('features');
      expect(packageData).toHaveProperty('bonus');
      expect(packageData).toHaveProperty('shape');
      expect(packageData).toHaveProperty('color');
      expect(packageData).toHaveProperty('duration');
      expect(packageData).toHaveProperty('maxParticipants');
      expect(packageData).toHaveProperty('popular');
      expect(packageData).toHaveProperty('disabled');
    });

    it('should handle packages with missing optional fields', async () => {
      // Arrange
      const packageWithoutOptionals = {
        ...mockPackages[0],
        originalPrice: undefined,
        bonus: undefined,
      };
      mockPackageRepository.findByActive.mockResolvedValue([packageWithoutOptionals]);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data[0]).not.toHaveProperty('originalPrice');
      expect(data.data[0]).not.toHaveProperty('bonus');
    });

    it('should return packages in correct format for frontend consumption', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(mockPackages.slice(0, 2));
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(data).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            features: expect.any(Array),
            shape: expect.stringMatching(/^(circle|hexagon|triangle)$/),
            color: expect.stringMatching(/^bg-/),
            duration: expect.any(String),
            maxParticipants: expect.any(Number),
            popular: expect.any(Boolean),
            disabled: expect.any(Boolean),
          }),
        ]),
      });
    });

    it('should handle concurrent requests correctly', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(mockPackages.slice(0, 2));
      
      const request1 = new NextRequest('http://localhost:3000/api/packages');
      const request2 = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const [response1, response2] = await Promise.all([
        GET(request1),
        GET(request2),
      ]);
      
      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);

      // Assert
      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(data1).toEqual(data2);
      expect(mockPackageRepository.findByActive).toHaveBeenCalledTimes(2);
    });

    it('should handle large datasets efficiently', async () => {
      // Arrange
      const largePackageList = Array.from({ length: 100 }, (_, i) => ({
        ...mockPackages[0],
        id: `pkg-${i}`,
        name: `Package ${i}`,
      }));
      mockPackageRepository.findByActive.mockResolvedValue(largePackageList);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const startTime = Date.now();
      const response = await GET(request);
      const endTime = Date.now();
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.data).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should properly serialize dates and complex objects', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue([mockPackages[0]]);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.data[0].features).toBeInstanceOf(Array);
      expect(data.data[0].bonus).toBeInstanceOf(Array);
      // Dates should be serialized as strings
      if (data.data[0].createdAt) {
        expect(typeof data.data[0].createdAt).toBe('string');
      }
    });

    it('should handle repository timeout gracefully', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockImplementation(
        () => new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 100)
        )
      );
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to fetch packages');
    });

    it('should validate response schema', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(mockPackages.slice(0, 1));
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(data).toMatchObject({
        success: expect.any(Boolean),
        data: expect.any(Array),
      });
      
      if (data.data.length > 0) {
        const packageData = data.data[0];
        expect(packageData.id).toMatch(/^pkg-/);
        expect(packageData.price).toBeGreaterThan(0);
        expect(packageData.maxParticipants).toBeGreaterThan(0);
        expect(['circle', 'hexagon', 'triangle']).toContain(packageData.shape);
      }
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle malformed data from repository', async () => {
      // Arrange
      const malformedData = [
        { id: 'pkg-1', name: null, price: 'invalid' }, // Invalid data
        null, // Null entry
        undefined, // Undefined entry
      ];
      mockPackageRepository.findByActive.mockResolvedValue(malformedData);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act & Assert
      // The API should either handle this gracefully or return an error
      const response = await GET(request);
      expect([200, 500]).toContain(response.status);
    });

    it('should handle repository returning non-array data', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(null);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
    });

    it('should handle memory pressure with large responses', async () => {
      // Arrange
      const veryLargePackageList = Array.from({ length: 10000 }, (_, i) => ({
        ...mockPackages[0],
        id: `pkg-${i}`,
        name: `Package ${i}`,
        description: 'A'.repeat(1000), // Large description
      }));
      mockPackageRepository.findByActive.mockResolvedValue(veryLargePackageList);
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act & Assert
      // Should either handle gracefully or implement pagination
      await expect(GET(request)).resolves.toBeDefined();
    });
  });

  describe('Performance and Caching', () => {
    it('should complete requests within acceptable time limits', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(mockPackages.slice(0, 2));
      
      const request = new NextRequest('http://localhost:3000/api/packages');

      // Act
      const startTime = performance.now();
      const response = await GET(request);
      await response.json();
      const endTime = performance.now();

      // Assert
      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(500); // Should complete within 500ms
    });

    it('should handle multiple concurrent requests without degradation', async () => {
      // Arrange
      mockPackageRepository.findByActive.mockResolvedValue(mockPackages.slice(0, 2));
      
      const requests = Array.from({ length: 10 }, () => 
        new NextRequest('http://localhost:3000/api/packages')
      );

      // Act
      const startTime = performance.now();
      const responses = await Promise.all(requests.map(req => GET(req)));
      const endTime = performance.now();

      // Assert
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
      expect(endTime - startTime).toBeLessThan(2000); // All requests within 2 seconds
    });
  });
});
