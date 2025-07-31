import { Package, PackageAvailability } from '../entities/Package';

export interface IPackageRepository {
  findById(id: string): Promise<Package | null>;
  findAll(): Promise<Package[]>;
  checkAvailability(packageId: string, date?: Date): Promise<{
    available: boolean;
    spotsLeft: number;
    nextAvailableDate?: Date;
    weatherConditions?: 'good' | 'warning' | 'poor';
    restrictions: string[];
  }>;
  // Note: Packages are now dynamic data from API
}