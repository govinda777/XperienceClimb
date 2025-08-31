import { Money } from './Package';
import { PaymentMethod } from './Coupon';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  payment: PaymentInfo;
  climbingDetails: ClimbingDetails;
  subtotal: Money;
  discount?: DiscountInfo;
  total: Money;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscountInfo {
  couponCode: string;
  couponId: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
  discountAmount: Money;
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
  healthDeclaration: boolean;
  tenis?: string; // Número do tênis (opcional)
}

export interface ClimbingDetails {
  selectedDate: Date;
  specialRequests?: string;
  dietaryRestrictions?: string[];
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  mercadoPagoPreferenceId?: string;
  cryptoPaymentId?: string;
  processedAt?: Date;
}

export type OrderStatus =
  | 'pending_payment'
  | 'pending_review'
  | 'pending_cancellation'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
