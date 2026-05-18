export interface Money {
  amount: number; // in cents
  currency: 'BRL';
}

export interface Package {
  id: string; // Dynamic package ID
  name: string;
  price: number | Money;
  description: string;
  features?: string[];
  availability?: PackageAvailability;
  rules?: BookingRules;

  // Compatibility fields for testing and packages matching PackageType
  originalPrice?: number | Money;
  bonus?: string[];
  shape?: 'hexagon' | 'triangle' | 'circle';
  color?: string;
  popular?: boolean;
  duration?: string;
  maxParticipants?: number;
  requiresExperience?: boolean;
  minAge?: number;
  cancellationPolicy?: string;
  disabled?: boolean;
  category?: string;
  difficulty?: string;
  includes?: string[];
  requirements?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  location?: string;
  images?: string[];
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
