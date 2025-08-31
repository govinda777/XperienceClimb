import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

export interface CustomWorld extends World {
  // React Testing Library
  component?: RenderResult;
  
  // Test data
  testUser?: {
    id: string;
    email: string;
    name: string;
  };
  
  testPackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
  }>;
  
  availablePackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
    description?: string;
    maxParticipants?: number;
    available?: boolean;
  }>;
  
  // Cart state
  cartItems?: Array<{
    id: string;
    packageId: string;
    quantity: number;
    price: number;
  }>;
  
  // Authentication state
  isAuthenticated?: boolean;
  userEmail?: string;
  
  // Navigation state
  currentPage?: string;
  
  // Selected items
  selectedPackage?: {
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
    description?: string;
    maxParticipants?: number;
    available?: boolean;
  };
  
  selectedQuantity?: number;
  
  // Participant details
  participantDetails?: Record<string, any>;
  
  // Booking details
  climbingDate?: Date;
  specialRequests?: string;
  bookingId?: string;
  bookingStatus?: string;
  
  // Payment details
  selectedPaymentMethod?: string;
  pixPaymentData?: {
    qrCode: string;
    pixKey: string;
    expiresAt: Date;
  };
  cryptoPaymentData?: {
    address: string;
    amount: string;
    exchangeRate: number;
  };
  mercadoPagoUrl?: string;
  emailSent?: boolean;
  totalPrice?: number;
  existingBooking?: {
    id: string;
    status: string;
    climbingDate: Date;
    participants: number;
    totalAmount: number;
    paid?: boolean;
  };
  cancellationRequest?: {
    bookingId?: string;
    requestedAt: Date;
    reason?: string;
  };
  cancellationOptions?: {
    fullRefund: boolean;
    partialRefund: boolean;
    reschedule: boolean;
  };
  refundInitiated?: boolean;
  cancellationConfirmationSent?: boolean;
  confirmedBooking?: {
    id: string;
    climbingDate: Date;
    status: string;
    participants: number;
    totalAmount: number;
    rescheduled?: boolean;
  };
  weatherConditions?: {
    safe: boolean;
    reason: string;
    reschedulingRequired: boolean;
  };
  weatherAlertSent?: boolean;
  newClimbingDate?: Date;
  updatedConfirmationSent?: boolean;
  customerProfile?: {
    country: string;
    international: boolean;
    language?: string;
  };
  priceDisplayCurrency?: string;
  contentLanguage?: string;
  internationalContact?: {
    phone: string;
    address: string;
    country: string;
  };
  
  // Coupon details
  availableCoupon?: {
    code: string;
    discount: number;
    valid: boolean;
  };
  
  appliedCoupon?: {
    code: string;
    discount: number;
    valid: boolean;
    used?: boolean;
  };
  
  finalPrice?: number;
  
  // Helper methods
  renderComponent(component: ReactElement): RenderResult;
  cleanup(): void;
}

export class XperienceClimbWorld extends World implements CustomWorld {
  testUser?: {
    id: string;
    email: string;
    name: string;
  };
  
  testPackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
  }>;
  
  availablePackages?: Array<{
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
    description?: string;
    maxParticipants?: number;
    available?: boolean;
  }>;
  
  cartItems?: Array<{
    id: string;
    packageId: string;
    quantity: number;
    price: number;
  }>;
  
  isAuthenticated?: boolean;
  userEmail?: string;
  
  currentPage?: string;
  
  selectedPackage?: {
    id: string;
    name: string;
    price: number;
    experienceLevel: string;
    description?: string;
    maxParticipants?: number;
    available?: boolean;
  };
  
  selectedQuantity?: number;
  
  participantDetails?: Record<string, any>;
  
  climbingDate?: Date;
  specialRequests?: string;
  bookingId?: string;
  bookingStatus?: string;
  
  selectedPaymentMethod?: string;
  
  pixPaymentData?: {
    qrCode: string;
    pixKey: string;
    expiresAt: Date;
  };
  cryptoPaymentData?: {
    address: string;
    amount: string;
    exchangeRate: number;
  };
  mercadoPagoUrl?: string;
  emailSent?: boolean;
  totalPrice?: number;
  existingBooking?: {
    id: string;
    status: string;
    climbingDate: Date;
    participants: number;
    totalAmount: number;
    paid?: boolean;
  };
  cancellationRequest?: {
    bookingId?: string;
    requestedAt: Date;
    reason?: string;
  };
  cancellationOptions?: {
    fullRefund: boolean;
    partialRefund: boolean;
    reschedule: boolean;
  };
  refundInitiated?: boolean;
  cancellationConfirmationSent?: boolean;
  confirmedBooking?: {
    id: string;
    climbingDate: Date;
    status: string;
    participants: number;
    totalAmount: number;
    rescheduled?: boolean;
  };
  weatherConditions?: {
    safe: boolean;
    reason: string;
    reschedulingRequired: boolean;
  };
  weatherAlertSent?: boolean;
  newClimbingDate?: Date;
  updatedConfirmationSent?: boolean;
  customerProfile?: {
    country: string;
    international: boolean;
    language?: string;
  };
  priceDisplayCurrency?: string;
  contentLanguage?: string;
  internationalContact?: {
    phone: string;
    address: string;
    country: string;
  };
  
  availableCoupon?: {
    code: string;
    discount: number;
    valid: boolean;
  };
  
  appliedCoupon?: {
    code: string;
    discount: number;
    valid: boolean;
    used?: boolean;
  };
  
  finalPrice?: number;
  
  component?: RenderResult;

  constructor(options: IWorldOptions) {
    super(options);
    
    // Initialize test data
    this.testPackages = [
      {
        id: 'basic-climbing',
        name: 'Basic Climbing Experience',
        price: 150,
        experienceLevel: 'beginner'
      },
      {
        id: 'advanced-climbing',
        name: 'Advanced Rock Climbing',
        price: 250,
        experienceLevel: 'advanced'
      },
      {
        id: 'family-climbing',
        name: 'Family Climbing Adventure',
        price: 200,
        experienceLevel: 'beginner'
      }
    ];
    
    this.cartItems = [];
    this.isAuthenticated = false;
  }

  renderComponent(component: ReactElement): RenderResult {
    this.component = render(component);
    return this.component;
  }

  cleanup(): void {
    if (this.component) {
      this.component.unmount();
    }
  }
}

setWorldConstructor(XperienceClimbWorld);
