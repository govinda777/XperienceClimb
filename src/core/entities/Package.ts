export interface Package {
  id: PackageType;
  name: string;
  price: Money;
  description: string;
  features: string[];
  availability: PackageAvailability;
  rules: BookingRules;
}

export type PackageType = 'silver' | 'gold' | 'premium';

export interface Money {
  amount: number; // in cents
  currency: 'BRL';
}

export interface PackageAvailability {
  available: boolean;
  spotsLeft: number;
  nextAvailableDate?: Date;
  weatherConditions?: 'good' | 'warning' | 'poor';
  restrictions: string[];
}

export interface BookingRules {
  minAge: number;
  maxParticipants: number;
  requiresExperience: boolean;
  cancellationPolicy: string;
} 