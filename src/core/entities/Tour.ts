export interface Tour {
  id: string;
  name: string;
  themeId: string;
  location: TourLocation;
  description: string;
  activities: TourActivity[];
  logistics: TourLogistics;
  pricing: TourPricing;
  availability: TourAvailability;
  gallery: TourGallery;
  seo: TourSEO;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface TourLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: string;
  mapsUrl?: string;
  directions: DirectionStep[];
}

export interface DirectionStep {
  step: number;
  title: string;
  description: string;
}

export interface TourActivity {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  duration?: string;
  price?: number;
  included: boolean;
  requirements?: string[];
}

export interface TourLogistics {
  schedule: {
    openTime: string;
    closeTime: string;
    notes?: string;
  };
  meetingPoint: string;
  duration: string;
  groupSize: {
    min: number;
    max: number;
  };
  requirements: TourRequirement[];
  included: string[];
  notIncluded: string[];
  importantNotes: string[];
  tips: string[];
}

export interface TourRequirement {
  type: 'age' | 'experience' | 'physical' | 'equipment' | 'other';
  description: string;
  mandatory: boolean;
}

export interface TourPricing {
  basePrice: number; // in cents
  currency: 'BRL';
  seasonalPricing?: SeasonalPrice[];
  groupDiscounts?: GroupDiscount[];
  cancellationPolicy: string;
}

export interface SeasonalPrice {
  name: string;
  startDate: Date;
  endDate: Date;
  priceMultiplier: number; // 1.0 = base price, 1.2 = 20% increase
}

export interface GroupDiscount {
  minParticipants: number;
  discountPercentage: number;
}

export interface TourAvailability {
  available: boolean;
  spotsLeft?: number;
  nextAvailableDate?: Date;
  weatherDependent: boolean;
  seasonalAvailability?: {
    startMonth: number; // 1-12
    endMonth: number; // 1-12
  };
  blackoutDates?: Date[];
  restrictions: string[];
}

export interface TourGallery {
  images: TourImage[];
  videos?: TourVideo[];
  categories: Record<string, string>;
}

export interface TourImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  isPrimary?: boolean;
  order: number;
}

export interface TourVideo {
  id: string;
  src: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration?: number; // in seconds
}

export interface TourSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// Tour creation request interface
export interface CreateTourRequest {
  name: string;
  themeId: string;
  location: Omit<TourLocation, 'directions'> & {
    directions?: Omit<DirectionStep, 'step'>[];
  };
  description: string;
  activities: Omit<TourActivity, 'id'>[];
  logistics: TourLogistics;
  pricing: TourPricing;
  gallery?: Omit<TourGallery, 'images'> & {
    images?: Omit<TourImage, 'id' | 'order'>[];
  };
  seo: TourSEO;
}

// Tour update request interface
export interface UpdateTourRequest extends Partial<CreateTourRequest> {
  id: string;
}
