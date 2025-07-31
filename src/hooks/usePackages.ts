'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/core/entities/Package';
import { GetAllPackages } from '@/core/use-cases/packages/GetAllPackages';
import { GetPackageAvailability, AvailabilityResult } from '@/core/use-cases/packages/GetPackageAvailability';
import { PackageRepository } from '@/infrastructure/repositories/PackageRepository';

// Initialize repositories and use cases
const packageRepository = new PackageRepository();
const getAllPackagesUseCase = new GetAllPackages(packageRepository);
const getPackageAvailabilityUseCase = new GetPackageAvailability(packageRepository);

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const packagesData = await getAllPackagesUseCase.execute();
        setPackages(packagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const checkAvailability = async (packageId: string, date?: Date): Promise<AvailabilityResult> => {
    try {
      return await getPackageAvailabilityUseCase.execute(packageId, date);
    } catch (error) {
      console.error('Error checking availability:', error);
      return {
        available: false,
        spotsLeft: 0,
        restrictions: ['Erro ao verificar disponibilidade']
      };
    }
  };

  const getPackageById = (id: string): Package | undefined => {
    return packages.find(pkg => pkg.id === id);
  };

  const getPackagesByType = (types: string[]): Package[] => {
    return packages.filter(pkg => types.includes(pkg.id));
  };

  return {
    packages,
    loading,
    error,
    checkAvailability,
    getPackageById,
    getPackagesByType,
    
    // Refetch function
    refetch: async () => {
      try {
        setLoading(true);
        const packagesData = await getAllPackagesUseCase.execute();
        setPackages(packagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    }
  };
}