import { renderHook, waitFor } from '@testing-library/react';
import { usePackages } from '../usePackages';
import { Package } from '@/core/entities/Package';
import { AVAILABLE_DATES } from '@/lib/constants';

// Mock the repositories and use cases
const mockPackages: Package[] = [
  {
    id: 'basic-climbing',
    name: 'Basic Climbing Experience',
    description: 'Perfect for beginners',
    price: 150,
    duration: 4,
    maxParticipants: 8,
    difficulty: 'beginner',
    includes: ['Equipment', 'Guide', 'Safety briefing'],
    requirements: ['Minimum age: 12'],
    location: 'Setor A',
    images: ['climb1.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'advanced-climbing',
    name: 'Advanced Rock Climbing',
    description: 'For experienced climbers',
    price: 250,
    duration: 6,
    maxParticipants: 4,
    difficulty: 'advanced',
    includes: ['Advanced equipment', 'Expert guide'],
    requirements: ['Previous climbing experience required'],
    location: 'Setor B',
    images: ['climb2.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock the use cases first
jest.mock('@/core/use-cases/packages/GetAllPackages', () => {
  const execute = jest.fn();
  const GetAllPackages = jest.fn().mockImplementation(() => ({ execute }));
  // @ts-ignore
  GetAllPackages.mockExecute = execute;
  return { GetAllPackages };
});

jest.mock('@/core/use-cases/packages/GetPackageAvailability', () => {
  const execute = jest.fn();
  const GetPackageAvailability = jest.fn().mockImplementation(() => ({ execute }));
  // @ts-ignore
  GetPackageAvailability.mockExecute = execute;
  return { GetPackageAvailability };
});

// Mock the repository
jest.mock('@/infrastructure/repositories/PackageRepository', () => ({
  PackageRepository: jest.fn().mockImplementation(() => ({})),
}));

// Get the mocked classes
const { GetAllPackages } = require('@/core/use-cases/packages/GetAllPackages');
const { GetPackageAvailability } = require('@/core/use-cases/packages/GetPackageAvailability');

describe('usePackages Hook', () => {
  let mockGetAllPackages: any;
  let mockGetPackageAvailability: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Get the shared mocks
    // @ts-ignore
    const getAllPackagesExecute = GetAllPackages.mockExecute;
    // @ts-ignore
    const getPackageAvailabilityExecute = GetPackageAvailability.mockExecute;

    mockGetAllPackages = { execute: getAllPackagesExecute };
    mockGetPackageAvailability = { execute: getPackageAvailabilityExecute };
    
    mockGetAllPackages.execute.mockResolvedValue(mockPackages);
    mockGetPackageAvailability.execute.mockResolvedValue({
      available: true,
      spotsLeft: 5,
      restrictions: [],
    });
  });

  describe('initial state', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => usePackages());

      expect(result.current.loading).toBe(true);
      expect(result.current.packages).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });

  describe('successful package loading', () => {
    it('should load packages successfully', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.packages).toEqual(mockPackages);
      expect(result.current.error).toBeNull();
      expect(mockGetAllPackages.execute).toHaveBeenCalledTimes(1);
    });

    it('should provide package utility functions', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Test getPackageById
      const basicPackage = result.current.getPackageById('basic-climbing');
      expect(basicPackage).toEqual(mockPackages[0]);

      const nonExistentPackage = result.current.getPackageById('non-existent');
      expect(nonExistentPackage).toBeUndefined();

      // Test getPackagesByType
      const beginnerPackages = result.current.getPackagesByType(['basic-climbing']);
      expect(beginnerPackages).toHaveLength(1);
      expect(beginnerPackages[0]).toEqual(mockPackages[0]);
    });
  });

  describe('error handling', () => {
    it('should handle loading errors', async () => {
      const errorMessage = 'Failed to fetch packages';
      mockGetAllPackages.execute.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.packages).toEqual([]);
    });

    it('should handle non-Error objects', async () => {
      mockGetAllPackages.execute.mockRejectedValue('String error');

      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to fetch packages');
    });
  });

  describe('availability checking', () => {
    it('should check package availability successfully', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const availability = await result.current.checkAvailability('basic-climbing');

      expect(availability).toEqual({
        available: true,
        spotsLeft: 5,
        restrictions: [],
      });
      expect(mockGetPackageAvailability.execute).toHaveBeenCalledWith('basic-climbing', undefined);
    });

    it('should check availability with specific date', async () => {
      const { result } = renderHook(() => usePackages());
      const testDate = new Date(AVAILABLE_DATES.singleDateISO);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await result.current.checkAvailability('basic-climbing', testDate);

      expect(mockGetPackageAvailability.execute).toHaveBeenCalledWith('basic-climbing', testDate);
    });

    it('should handle availability check errors', async () => {
      mockGetPackageAvailability.execute.mockRejectedValue(new Error('Availability error'));

      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const availability = await result.current.checkAvailability('basic-climbing');

      expect(availability).toEqual({
        available: false,
        spotsLeft: 0,
        restrictions: ['Erro ao verificar disponibilidade'],
      });
    });
  });

  describe('refetch functionality', () => {
    it('should refetch packages successfully', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Clear the mock to track new calls
      mockGetAllPackages.execute.mockClear();

      await result.current.refetch();

      expect(mockGetAllPackages.execute).toHaveBeenCalledTimes(1);
    });

    it('should handle refetch errors', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Mock error on refetch
      mockGetAllPackages.execute.mockRejectedValue(new Error('Refetch error'));

      await result.current.refetch();

      await waitFor(() => {
        expect(result.current.error).toBe('Refetch error');
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('package filtering and searching', () => {
    it('should filter packages by multiple types', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const filteredPackages = result.current.getPackagesByType(['basic-climbing', 'advanced-climbing']);
      expect(filteredPackages).toHaveLength(2);
    });

    it('should return empty array for non-matching types', async () => {
      const { result } = renderHook(() => usePackages());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const filteredPackages = result.current.getPackagesByType(['non-existent-type']);
      expect(filteredPackages).toHaveLength(0);
    });
  });

  describe('loading states during operations', () => {
    it('should show loading during initial fetch', () => {
      // Delay the promise resolution to test loading state
      let resolvePromise: (value: Package[]) => void;
      const delayedPromise = new Promise<Package[]>((resolve) => {
        resolvePromise = resolve;
      });
      
      mockGetAllPackages.execute.mockReturnValue(delayedPromise);

      const { result } = renderHook(() => usePackages());

      expect(result.current.loading).toBe(true);
      expect(result.current.packages).toEqual([]);

      // Resolve the promise
      resolvePromise!(mockPackages);
    });
  });
});
