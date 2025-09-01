import { Package } from '../entities/Package';

export interface IPackageRepository {
  findById(_id: string): Promise<Package | null>;
  findAll(): Promise<Package[]>;
  checkAvailability(_packageId: string, _date?: Date): Promise<{
    available: boolean;
    spotsLeft: number;
    nextAvailableDate?: Date;
    weatherConditions?: 'good' | 'warning' | 'poor';
    restrictions: string[];
  }>;
  // Note: Packages are now dynamic data from API
}