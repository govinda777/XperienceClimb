import { IPackageRepository } from '@/core/repositories/IPackageRepository';
import { Package, PackageAvailability, Money } from '@/core/entities/Package';
import { PACKAGES } from '@/lib/constants';

export class PackageRepository implements IPackageRepository {
  async findById(id: string): Promise<Package | null> {
    try {
      const packageData = PACKAGES[id];
      
      if (!packageData) {
        return null;
      }

      // Convert static package data to domain entity
      return this.mapToPackageEntity(packageData);
    } catch (error) {
      console.error('Error finding package by ID:', error);
      return null;
    }
  }

  async findAll(): Promise<Package[]> {
    try {
      return Object.values(PACKAGES).map(pkg => this.mapToPackageEntity(pkg));
    } catch (error) {
      console.error('Error finding all packages:', error);
      return [];
    }
  }

  async checkAvailability(packageId: string, date?: Date): Promise<PackageAvailability> {
    try {
      // Mock availability logic - in real app would check actual bookings
      const baseAvailability: PackageAvailability = {
        available: true,
        spotsLeft: this.getSpotsLeft(packageId),
        restrictions: []
      };

      // Check date-specific restrictions
      if (date) {
        const dayOfWeek = date.getDay();
        
        // No climbing on Mondays (maintenance)
        if (dayOfWeek === 1) {
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

  private mapToPackageEntity(packageData: any): Package {
    const price: Money = {
      amount: packageData.price * 100, // Convert to cents
      currency: 'BRL'
    };

    return {
      id: packageData.id,
      name: packageData.name,
      price,
      description: packageData.description,
      features: packageData.features,
      availability: {
        available: true,
        spotsLeft: this.getSpotsLeft(packageData.id),
        restrictions: []
      },
      rules: {
        minAge: 12, // Default minimum age
        maxParticipants: packageData.maxParticipants || 8,
        requiresExperience: packageData.id === 'premium',
        cancellationPolicy: 'Cancelamento gratuito até 24h antes da atividade'
      }
    };
  }

  private getSpotsLeft(packageId: string): number {
    // Mock logic - in real app would check actual bookings
    const maxSpots = {
      silver: 8,
      gold: 6,
      premium: 4
    };
    
    // Simulate some random bookings
    const bookedSpots = Math.floor(Math.random() * 3);
    return Math.max(0, (maxSpots[packageId as keyof typeof maxSpots] || 8) - bookedSpots);
  }

  private mockWeatherConditions(): 'good' | 'warning' | 'poor' {
    // Mock weather - in real app would call weather API
    const conditions = ['good', 'good', 'good', 'warning', 'poor'];
    return conditions[Math.floor(Math.random() * conditions.length)] as 'good' | 'warning' | 'poor';
  }

  private getNextAvailableDate(fromDate: Date): Date {
    const nextDate = new Date(fromDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    // Skip to Tuesday if it's a Monday
    if (nextDate.getDay() === 1) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return nextDate;
  }
} 