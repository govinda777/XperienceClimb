import { IPackageRepository } from '@/core/repositories/IPackageRepository';
import { Package } from '@/core/entities/Package';
import { PackageType } from '@/types';

export class PackageRepository implements IPackageRepository {
  private packagesCache: Package[] | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async findById(id: string): Promise<Package | null> {
    try {
      const packages = await this.getPackagesData();
      const packageData = packages.find(pkg => pkg.id === id);
      return packageData ? this.mapToPackageEntity(packageData) : null;
    } catch (error) {
      console.error('Error finding package by ID:', error);
      return null;
    }
  }

  async findAll(): Promise<Package[]> {
    try {
      const packages = await this.getPackagesData();
      return packages.map(pkg => this.mapToPackageEntity(pkg));
    } catch (error) {
      console.error('Error finding all packages:', error);
      return [];
    }
  }

  async checkAvailability(packageId: string, date?: Date): Promise<{
    available: boolean;
    spotsLeft: number;
    nextAvailableDate?: Date;
    weatherConditions?: 'good' | 'warning' | 'poor';
    restrictions: string[];
  }> {
    try {
      const packageData = await this.findById(packageId);
      if (!packageData) {
        return {
          available: false,
          spotsLeft: 0,
          restrictions: ['Pacote não encontrado']
        };
      }

      const baseAvailability = {
        available: true,
        spotsLeft: packageData.availability.spotsLeft,
        restrictions: [] as string[],
        nextAvailableDate: undefined as Date | undefined,
        weatherConditions: undefined as 'good' | 'warning' | 'poor' | undefined
      };

      if (date) {
        // Check if it's a Monday (maintenance day)
        if (date.getDay() === 1) {
          baseAvailability.available = false;
          baseAvailability.restrictions.push('Escalada não disponível às segundas-feiras (manutenção)');
          baseAvailability.nextAvailableDate = this.getNextAvailableDate(date);
        }

        // Mock weather conditions
        baseAvailability.weatherConditions = this.mockWeatherConditions();
        if (baseAvailability.weatherConditions === 'poor') {
          baseAvailability.available = false;
          baseAvailability.restrictions.push('Condições climáticas desfavoráveis');
        }
      }

      return baseAvailability;
    } catch (error) {
      console.error('Error checking package availability:', error);
      return {
        available: false,
        spotsLeft: 0,
        restrictions: ['Erro ao verificar disponibilidade']
      };
    }
  }

  private async getPackagesData(): Promise<PackageType[]> {
    const now = Date.now();
    
    // Return cached data if still valid
    if (this.packagesCache && now < this.cacheExpiry) {
      return this.packagesCache.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price.amount / 100, // Convert back to reais for API consistency
        description: pkg.description,
        features: pkg.features,
        bonus: [], // Default empty bonus for cached data
        shape: 'hexagon' as const, // Default shape for cached data
        color: 'climb-300',
        duration: '1 dia',
        maxParticipants: pkg.rules.maxParticipants,
        requiresExperience: pkg.rules.requiresExperience,
        minAge: pkg.rules.minAge,
        cancellationPolicy: pkg.rules.cancellationPolicy,
        popular: false
      }));
    }

    // Fetch fresh data
    const packagesData = await this.fetchPackagesFromAPI();
    
    // Cache the mapped entities
    this.packagesCache = packagesData.map(pkg => this.mapToPackageEntity(pkg));
    this.cacheExpiry = now + this.CACHE_DURATION;
    
    return packagesData;
  }

  private async fetchPackagesFromAPI(): Promise<PackageType[]> {
    const response = await fetch('/api/packages');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch packages: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  }

  private mapToPackageEntity(packageData: PackageType): Package {
    return {
      id: packageData.id,
      name: packageData.name,
      price: {
        amount: packageData.price * 100, // Convert to cents for Money entity
        currency: 'BRL'
      },
      description: packageData.description,
      features: packageData.features,
      availability: {
        available: true,
        spotsLeft: this.getSpotsLeft(packageData),
        restrictions: []
      },
      rules: {
        minAge: packageData.minAge || 12, // Use dynamic value or default
        maxParticipants: packageData.maxParticipants || 8,
        requiresExperience: packageData.requiresExperience || false, // Use dynamic value
        cancellationPolicy: packageData.cancellationPolicy || 'Cancelamento gratuito até 24h antes da atividade'
      }
    };
  }

  private getSpotsLeft(packageData: PackageType): number {
    // Mock logic - in real app would check actual bookings
    const maxSpots = packageData.maxParticipants || 8; // Use dynamic maxParticipants
    
    // Simulate some random bookings
    const bookedSpots = Math.floor(Math.random() * 3);
    return Math.max(0, maxSpots - bookedSpots);
  }

  private mockWeatherConditions(): 'good' | 'warning' | 'poor' {
    // Mock weather - in real app would call weather API
    const conditions = ['good', 'good', 'good', 'warning', 'poor'];
    return conditions[Math.floor(Math.random() * conditions.length)] as 'good' | 'warning' | 'poor';
  }

  private getNextAvailableDate(fromDate: Date): Date {
    const nextDate = new Date(fromDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    // Skip Mondays
    if (nextDate.getDay() === 1) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return nextDate;
  }
}