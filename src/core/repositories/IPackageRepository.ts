import { Package, PackageAvailability } from '../entities/Package';

export interface IPackageRepository {
  findById(id: string): Promise<Package | null>;
  findAll(): Promise<Package[]>;
  checkAvailability(packageId: string, date?: Date): Promise<PackageAvailability>;
  // Note: Packages are static data from constants
} 