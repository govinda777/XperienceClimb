export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface PackageType {
  id: 'silver' | 'gold' | 'premium';
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  shape: 'hexagon' | 'triangle' | 'circle';
  color: string;
  popular?: boolean;
  duration: string;
  maxParticipants: number;
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