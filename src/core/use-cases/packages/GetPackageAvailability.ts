import { IPackageRepository } from '../../repositories/IPackageRepository';
import { PackageAvailability } from '../../entities/Package';

export interface AvailabilityResult {
  available: boolean;
  spotsLeft: number;
  nextAvailableDate?: Date;
  weatherConditions?: 'good' | 'warning' | 'poor';
  restrictions: string[];
}

export class GetPackageAvailability {
  constructor(private packageRepository: IPackageRepository) {}

  async execute(packageId: string, date?: Date): Promise<AvailabilityResult> {
    try {
      const packageData = await this.packageRepository.findById(packageId);
      
      if (!packageData) {
        throw new Error('Package not found');
      }

      // Check availability with climbing-specific rules
      const availability = await this.checkClimbingAvailability(packageId, date);
      
      return {
        available: availability.available,
        spotsLeft: availability.spotsLeft,
        nextAvailableDate: availability.nextAvailableDate,
        weatherConditions: availability.weatherConditions,
        restrictions: availability.restrictions,
      };
    } catch (error) {
      console.error('Error checking package availability:', error);
      return {
        available: false,
        spotsLeft: 0,
        restrictions: ['Unable to check availability'],
      };
    }
  }

  private async checkClimbingAvailability(
    packageId: string, 
    date?: Date
  ): Promise<PackageAvailability> {
    // Business logic specific to climbing experiences
    const spotsLeft = await this.getSpotsLeft(packageId);
    
    const baseAvailability: PackageAvailability = {
      available: true,
      spotsLeft: spotsLeft,
      restrictions: [],
    };

    // Check date restrictions
    if (date) {
      const dayOfWeek = date.getDay();
      
      // No climbing on Mondays (maintenance day)
      if (dayOfWeek === 1) {
        baseAvailability.available = false;
        baseAvailability.restrictions.push('Climbing not available on Mondays (maintenance day)');
        baseAvailability.nextAvailableDate = this.getNextAvailableDate(date);
      }
      
      // Check weather conditions (mock logic)
      baseAvailability.weatherConditions = this.getWeatherConditions(date);
      if (baseAvailability.weatherConditions === 'poor') {
        baseAvailability.available = false;
        baseAvailability.restrictions.push('Poor weather conditions expected');
      }
    }

    // Check seasonal restrictions
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    
    if (month >= 6 && month <= 8) { // Winter months
      baseAvailability.restrictions.push('Winter season - earlier end times');
    }

    return baseAvailability;
  }

  private async getSpotsLeft(packageId: string): Promise<number> {
    // Get dynamic package data instead of hardcoded values
    const packageData = await this.packageRepository.findById(packageId);
    
    if (!packageData) {
      return 0;
    }
    
    const maxSpots = packageData.rules.maxParticipants;
    
    // Mock implementation - in real app would check actual bookings
    // Simulate some bookings
    const bookedSpots = Math.floor(Math.random() * 3);
    return Math.max(0, maxSpots - bookedSpots);
  }

  private getWeatherConditions(_date: Date): 'good' | 'warning' | 'poor' {
    // Mock weather API - in real app would call weather service
    const conditions: ('good' | 'warning' | 'poor')[] = ['good', 'good', 'warning', 'poor'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  private getNextAvailableDate(fromDate: Date): Date {
    const nextDate = new Date(fromDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    // Skip Mondays
    while (nextDate.getDay() === 1) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return nextDate;
  }
}