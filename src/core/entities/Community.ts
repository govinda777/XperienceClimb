export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: PartnerCategory;
  location: {
    city: string;
    state: string;
  };
  contact: {
    email?: string;
    phone?: string;
    instagram?: string;
  };
  services: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PartnerCategory = 
  | 'equipment' // Equipamentos
  | 'accommodation' // Hospedagem
  | 'transport' // Transporte
  | 'food' // Alimentação
  | 'insurance' // Seguros
  | 'training' // Treinamento
  | 'retail' // Varejo
  | 'media' // Mídia/Marketing
  | 'other'; // Outros

export interface CertifiedInstructor {
  id: string;
  name: string;
  photo: string;
  bio: string;
  certifications: Certification[];
  specialties: InstructorSpecialty[];
  experience: {
    yearsActive: number;
    totalClients: number;
    routesCompleted: number;
  };
  location: {
    city: string;
    state: string;
    operatingRadius: number; // km
  };
  contact: {
    email?: string;
    phone?: string;
    instagram?: string;
    whatsapp?: string;
  };
  availability: {
    isActive: boolean;
    schedule: WeeklySchedule;
    priceRange: {
      min: number; // in cents
      max: number; // in cents
    };
  };
  rating: {
    average: number;
    totalReviews: number;
  };
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  level: CertificationLevel;
  issueDate: Date;
  expiryDate?: Date;
  certificateNumber: string;
  isValid: boolean;
}

export type CertificationLevel = 
  | 'basic' // Básico
  | 'intermediate' // Intermediário
  | 'advanced' // Avançado
  | 'instructor' // Instrutor
  | 'master'; // Mestre

export type InstructorSpecialty = 
  | 'sport_climbing' // Escalada Esportiva
  | 'traditional_climbing' // Escalada Tradicional
  | 'bouldering' // Boulder
  | 'multi_pitch' // Via Longa
  | 'rescue' // Resgate
  | 'kids_climbing' // Escalada Infantil
  | 'adaptive_climbing' // Escalada Adaptada
  | 'competition' // Competição
  | 'via_ferrata'; // Via Ferrata

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isAvailable: boolean;
  periods: TimePeriod[];
}

export interface TimePeriod {
  start: string; // HH:mm format
  end: string; // HH:mm format
}

export interface SafetyProcedure {
  id: string;
  title: string;
  category: SafetyCategory;
  priority: SafetyPriority;
  description: string;
  steps: SafetyStep[];
  equipment: SafetyEquipment[];
  warnings: string[];
  emergencyContacts: EmergencyContact[];
  lastUpdated: Date;
  version: string;
  isActive: boolean;
}

export type SafetyCategory = 
  | 'pre_climb' // Pré-escalada
  | 'during_climb' // Durante a escalada
  | 'post_climb' // Pós-escalada
  | 'emergency' // Emergência
  | 'equipment' // Equipamentos
  | 'weather' // Condições climáticas
  | 'group_management' // Gestão de grupo
  | 'first_aid'; // Primeiros socorros

export type SafetyPriority = 
  | 'critical' // Crítico
  | 'high' // Alto
  | 'medium' // Médio
  | 'low'; // Baixo

export interface SafetyStep {
  order: number;
  title: string;
  description: string;
  timeRequired?: number; // minutes
  isOptional: boolean;
  visualAid?: string; // image/video URL
}

export interface SafetyEquipment {
  name: string;
  isRequired: boolean;
  quantity: number;
  specifications?: string;
  checkpoints: string[];
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  isAvailable24h: boolean;
  location?: string;
}

export interface VisitedLocation {
  id: string;
  name: string;
  state: string;
  city: string;
  region: ClimbingRegion;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  images: LocationImage[];
  routes: ClimbingRoute[];
  facilities: LocationFacility[];
  access: AccessInfo;
  bestSeason: Season[];
  difficulty: {
    min: ClimbingGrade;
    max: ClimbingGrade;
  };
  popularity: number; // 1-5 stars
  lastVisited: Date;
  visitCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ClimbingRegion = 
  | 'southeast' // Sudeste
  | 'south' // Sul
  | 'northeast' // Nordeste
  | 'north' // Norte
  | 'midwest'; // Centro-Oeste

export interface LocationImage {
  url: string;
  caption: string;
  category: ImageCategory;
  photographer?: string;
  takenAt: Date;
}

export type ImageCategory = 
  | 'landscape' // Paisagem
  | 'route' // Via
  | 'access' // Acesso
  | 'facility' // Instalação
  | 'group' // Grupo
  | 'equipment'; // Equipamento

export interface ClimbingRoute {
  name: string;
  grade: ClimbingGrade;
  type: RouteType;
  length: number; // meters
  pitches: number;
  description: string;
  firstAscent?: {
    climber: string;
    date: Date;
  };
  isRecommended: boolean;
}

export type ClimbingGrade = 
  | 'I' | 'II' | 'III' | 'IV' | 'V'
  | 'V+' | 'VI' | 'VI+' | 'VII' | 'VII+'
  | 'VIII' | 'VIII+' | 'IX' | 'IX+'
  | 'X' | 'X+' | 'XI' | 'XI+' | 'XII';

export type RouteType = 
  | 'sport' // Esportiva
  | 'traditional' // Tradicional
  | 'mixed' // Mista
  | 'aid' // Artificial
  | 'boulder'; // Boulder

export interface LocationFacility {
  name: string;
  type: FacilityType;
  isAvailable: boolean;
  description?: string;
  cost?: number; // in cents
}

export type FacilityType = 
  | 'parking' // Estacionamento
  | 'restroom' // Banheiro
  | 'water' // Água
  | 'camping' // Camping
  | 'restaurant' // Restaurante
  | 'shop' // Loja
  | 'guide_service' // Serviço de guia
  | 'equipment_rental'; // Aluguel de equipamentos

export interface AccessInfo {
  difficulty: AccessDifficulty;
  duration: number; // minutes
  distance: number; // meters
  description: string;
  requirements: string[];
  restrictions: string[];
  parkingInfo: string;
  publicTransport?: string;
}

export type AccessDifficulty = 
  | 'easy' // Fácil
  | 'moderate' // Moderado
  | 'difficult' // Difícil
  | 'extreme'; // Extremo

export type Season = 
  | 'spring' // Primavera
  | 'summer' // Verão
  | 'autumn' // Outono
  | 'winter'; // Inverno

// Community aggregation interface
export interface CommunityData {
  partners: Partner[];
  instructors: CertifiedInstructor[];
  safetyProcedures: SafetyProcedure[];
  visitedLocations: VisitedLocation[];
  statistics: CommunityStatistics;
}

export interface CommunityStatistics {
  totalPartners: number;
  totalInstructors: number;
  totalProcedures: number;
  totalLocations: number;
  locationsByState: Record<string, number>;
  instructorsByState: Record<string, number>;
  partnersByCategory: Record<PartnerCategory, number>;
  lastUpdated: Date;
}
