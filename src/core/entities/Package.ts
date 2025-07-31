export interface Package {
  id: string; // Dynamic package ID
  name: string;
  price: Money;
  description: string;
  features: string[];
  availability: PackageAvailability;
  rules: BookingRules;
}

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