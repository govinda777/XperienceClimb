import { GetAllPackages } from '../packages/GetAllPackages';
import { IPackageRepository } from '../../repositories/IPackageRepository';
import { Package } from '../../entities/Package';

// Mock repository
const mockPackageRepository: jest.Mocked<IPackageRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByActive: jest.fn(),
  findByPriceRange: jest.fn(),
  delete: jest.fn(),
};

describe('GetAllPackages Use Case', () => {
  let getAllPackages: GetAllPackages;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllPackages = new GetAllPackages(mockPackageRepository);
    
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('execute', () => {
    const mockPackages: Package[] = [
      {
        id: 'pkg-1',
        name: 'Escalada Iniciante',
        price: 150,
        originalPrice: 200,
        description: 'Perfeito para iniciantes',
        features: ['Instrução básica', 'Equipamentos inclusos'],
        bonus: ['Lanche', 'Fotos'],
        shape: 'circle',
        color: 'bg-green-500',
        duration: '4 horas',
        maxParticipants: 8,
        popular: false,
        disabled: false,
        category: 'beginner',
        difficulty: 'easy',
        includes: ['Equipamentos', 'Instrução'],
        requirements: ['Idade mínima 12 anos'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        isActive: true,
      },
      {
        id: 'pkg-2',
        name: 'Escalada Avançada',
        price: 250,
        description: 'Para escaladores experientes',
        features: ['Rotas desafiadoras', 'Equipamentos profissionais'],
        bonus: ['Almoço', 'Certificado'],
        shape: 'hexagon',
        color: 'bg-orange-500',
        duration: '6 horas',
        maxParticipants: 6,
        popular: true,
        disabled: false,
        category: 'advanced',
        difficulty: 'hard',
        includes: ['Equipamentos profissionais', 'Guia especializado'],
        requirements: ['Experiência prévia obrigatória'],
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
        isActive: true,
      },
    ];

    describe('successful execution', () => {
      it('should return all packages when repository succeeds', async () => {
        mockPackageRepository.findAll.mockResolvedValue(mockPackages);

        const result = await getAllPackages.execute();

        expect(result).toEqual(mockPackages);
        expect(mockPackageRepository.findAll).toHaveBeenCalledTimes(1);
      });

      it('should return empty array when no packages exist', async () => {
        mockPackageRepository.findAll.mockResolvedValue([]);

        const result = await getAllPackages.execute();

        expect(result).toEqual([]);
        expect(mockPackageRepository.findAll).toHaveBeenCalledTimes(1);
      });

      it('should preserve all package properties', async () => {
        mockPackageRepository.findAll.mockResolvedValue(mockPackages);

        const result = await getAllPackages.execute();

        expect(result[0]).toMatchObject({
          id: 'pkg-1',
          name: 'Escalada Iniciante',
          price: 150,
          originalPrice: 200,
          description: 'Perfeito para iniciantes',
          features: ['Instrução básica', 'Equipamentos inclusos'],
          bonus: ['Lanche', 'Fotos'],
          shape: 'circle',
          color: 'bg-green-500',
          duration: '4 horas',
          maxParticipants: 8,
          popular: false,
          disabled: false,
        });

        expect(result[1]).toMatchObject({
          id: 'pkg-2',
          name: 'Escalada Avançada',
          price: 250,
          popular: true,
          disabled: false,
        });
      });

      it('should maintain package order from repository', async () => {
        const orderedPackages = [mockPackages[1], mockPackages[0]]; // Reversed order
        mockPackageRepository.findAll.mockResolvedValue(orderedPackages);

        const result = await getAllPackages.execute();

        expect(result[0].id).toBe('pkg-2');
        expect(result[1].id).toBe('pkg-1');
      });
    });

    describe('error handling', () => {
      it('should return empty array when repository throws error', async () => {
        const error = new Error('Database connection failed');
        mockPackageRepository.findAll.mockRejectedValue(error);

        const result = await getAllPackages.execute();

        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error fetching packages:', error);
      });

      it('should handle network errors gracefully', async () => {
        const networkError = new Error('Network timeout');
        mockPackageRepository.findAll.mockRejectedValue(networkError);

        const result = await getAllPackages.execute();

        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error fetching packages:', networkError);
      });

      it('should handle non-Error objects being thrown', async () => {
        mockPackageRepository.findAll.mockRejectedValue('String error');

        const result = await getAllPackages.execute();

        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error fetching packages:', 'String error');
      });

      it('should handle null/undefined errors', async () => {
        mockPackageRepository.findAll.mockRejectedValue(null);

        const result = await getAllPackages.execute();

        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith('Error fetching packages:', null);
      });
    });

    describe('repository interaction', () => {
      it('should call repository findAll method exactly once', async () => {
        mockPackageRepository.findAll.mockResolvedValue(mockPackages);

        await getAllPackages.execute();

        expect(mockPackageRepository.findAll).toHaveBeenCalledTimes(1);
        expect(mockPackageRepository.findAll).toHaveBeenCalledWith();
      });

      it('should not call other repository methods', async () => {
        mockPackageRepository.findAll.mockResolvedValue(mockPackages);

        await getAllPackages.execute();

        expect(mockPackageRepository.create).not.toHaveBeenCalled();
        expect(mockPackageRepository.update).not.toHaveBeenCalled();
        expect(mockPackageRepository.findById).not.toHaveBeenCalled();
        expect(mockPackageRepository.findByActive).not.toHaveBeenCalled();
        expect(mockPackageRepository.delete).not.toHaveBeenCalled();
      });
    });

    describe('data integrity', () => {
      it('should not modify package data', async () => {
        const originalPackages = JSON.parse(JSON.stringify(mockPackages));
        mockPackageRepository.findAll.mockResolvedValue(mockPackages);

        const result = await getAllPackages.execute();

        expect(result).toEqual(originalPackages);
        expect(mockPackages).toEqual(originalPackages);
      });

      it('should handle packages with missing optional fields', async () => {
        const minimalPackages: Package[] = [
          {
            id: 'pkg-minimal',
            name: 'Minimal Package',
            price: 100,
            description: 'Basic package',
            features: [],
            shape: 'circle',
            color: 'bg-blue-500',
            duration: '2 horas',
            maxParticipants: 4,
            popular: false,
            disabled: false,
            category: 'basic',
            difficulty: 'easy',
            includes: [],
            requirements: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(minimalPackages);

        const result = await getAllPackages.execute();

        expect(result).toEqual(minimalPackages);
        expect(result[0].bonus).toBeUndefined();
        expect(result[0].originalPrice).toBeUndefined();
      });

      it('should handle packages with all optional fields', async () => {
        const fullPackages: Package[] = [
          {
            ...mockPackages[0],
            bonus: ['Extra 1', 'Extra 2', 'Extra 3'],
            originalPrice: 300,
            requirements: ['Req 1', 'Req 2'],
            includes: ['Include 1', 'Include 2'],
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(fullPackages);

        const result = await getAllPackages.execute();

        expect(result[0].bonus).toHaveLength(3);
        expect(result[0].originalPrice).toBe(300);
        expect(result[0].requirements).toHaveLength(2);
        expect(result[0].includes).toHaveLength(2);
      });
    });

    describe('edge cases', () => {
      it('should handle very large number of packages', async () => {
        const largePackageList: Package[] = Array.from({ length: 1000 }, (_, i) => ({
          ...mockPackages[0],
          id: `pkg-${i}`,
          name: `Package ${i}`,
        }));

        mockPackageRepository.findAll.mockResolvedValue(largePackageList);

        const result = await getAllPackages.execute();

        expect(result).toHaveLength(1000);
        expect(result[0].id).toBe('pkg-0');
        expect(result[999].id).toBe('pkg-999');
      });

      it('should handle packages with special characters in names', async () => {
        const specialPackages: Package[] = [
          {
            ...mockPackages[0],
            id: 'pkg-special',
            name: 'Escalada "Ação & Aventura" - 100% Radical!',
            description: 'Pacote com caracteres especiais: áéíóú çñü',
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(specialPackages);

        const result = await getAllPackages.execute();

        expect(result[0].name).toBe('Escalada "Ação & Aventura" - 100% Radical!');
        expect(result[0].description).toBe('Pacote com caracteres especiais: áéíóú çñü');
      });

      it('should handle packages with zero price', async () => {
        const freePackages: Package[] = [
          {
            ...mockPackages[0],
            id: 'pkg-free',
            name: 'Free Package',
            price: 0,
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(freePackages);

        const result = await getAllPackages.execute();

        expect(result[0].price).toBe(0);
      });

      it('should handle packages with very high prices', async () => {
        const expensivePackages: Package[] = [
          {
            ...mockPackages[0],
            id: 'pkg-expensive',
            name: 'Premium Package',
            price: 999999.99,
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(expensivePackages);

        const result = await getAllPackages.execute();

        expect(result[0].price).toBe(999999.99);
      });

      it('should handle disabled packages', async () => {
        const disabledPackages: Package[] = [
          {
            ...mockPackages[0],
            disabled: true,
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(disabledPackages);

        const result = await getAllPackages.execute();

        expect(result[0].disabled).toBe(true);
      });

      it('should handle inactive packages', async () => {
        const inactivePackages: Package[] = [
          {
            ...mockPackages[0],
            isActive: false,
          },
        ];

        mockPackageRepository.findAll.mockResolvedValue(inactivePackages);

        const result = await getAllPackages.execute();

        expect(result[0].isActive).toBe(false);
      });
    });

    describe('performance considerations', () => {
      it('should handle repository timeout gracefully', async () => {
        const timeoutError = new Error('Query timeout');
        mockPackageRepository.findAll.mockRejectedValue(timeoutError);

        const startTime = Date.now();
        const result = await getAllPackages.execute();
        const endTime = Date.now();

        expect(result).toEqual([]);
        expect(endTime - startTime).toBeLessThan(1000); // Should fail fast
      });

      it('should not cache results between calls', async () => {
        const firstCall = [mockPackages[0]];
        const secondCall = [mockPackages[1]];

        mockPackageRepository.findAll
          .mockResolvedValueOnce(firstCall)
          .mockResolvedValueOnce(secondCall);

        const result1 = await getAllPackages.execute();
        const result2 = await getAllPackages.execute();

        expect(result1).toEqual(firstCall);
        expect(result2).toEqual(secondCall);
        expect(mockPackageRepository.findAll).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('constructor', () => {
    it('should initialize with package repository', () => {
      const instance = new GetAllPackages(mockPackageRepository);
      
      expect(instance).toBeInstanceOf(GetAllPackages);
    });

    it('should handle null repository in constructor', () => {
      expect(() => {
        new GetAllPackages(null as any);
      }).not.toThrow();
    });
  });
});
