export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface PackageType {
  id: string; // Dynamic package ID - can be any string
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  bonus: string[];
  shape: 'hexagon' | 'triangle' | 'circle';
  color: string;
  popular?: boolean;
  duration: string;
  maxParticipants: number;
  requiresExperience?: boolean; // Dynamic property instead of hardcoded logic
  minAge?: number; // Dynamic minimum age
  cancellationPolicy?: string; // Dynamic cancellation policy
  disabled?: boolean;
  isQuotation?: boolean; // Package with price on quotation
}

export interface CartItem {
  id: string;
  packageId: string;
  packageName: string;
  price: number;
  quantity: number;
  participantName: string;
  experience?: string;
  addedAt: Date;
  commerceProductId?: string; // Mapped product identifier from CMS
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentId?: string;
  mercadoPagoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}
