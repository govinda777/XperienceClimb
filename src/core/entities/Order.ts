import { Money } from './Package';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  payment: PaymentInfo;
  climbingDetails: ClimbingDetails;
  total: Money;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  packageId: string;
  packageName: string;
  price: Money;
  quantity: number;
  participantDetails: ParticipantDetails;
}

export interface ParticipantDetails {
  name: string;
  age: number;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  emergencyContact: EmergencyContact;
  healthDeclaration: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface ClimbingDetails {
  selectedDate: Date;
  specialRequests?: string;
  dietaryRestrictions?: string[];
}

export interface PaymentInfo {
  method: 'mercadopago' | 'whatsapp';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  mercadoPagoPreferenceId?: string;
  processedAt?: Date;
}

export type OrderStatus = 'pending_payment' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

 