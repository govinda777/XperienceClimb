import { IPackageRepository } from '../../repositories/IPackageRepository';
import { Package } from '../../entities/Package';

export class GetAllPackages {
  constructor(private packageRepository: IPackageRepository) {}

  async execute(): Promise<Package[]> {
    try {
      return await this.packageRepository.findAll();
    } catch (error) {
      console.error('Error fetching packages:', error);
      return [];
    }
  }
} 