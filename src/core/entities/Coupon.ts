export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number; // Percentage (0-100) or amount in cents
  description: string;
  validFrom: Date;
  validUntil: Date;
  maxUses?: number;
  usageLimit?: number; // Compatibility field
  usedCount: number;
  minOrderAmount?: number; // Minimum order value in cents
  minimumAmount?: {
    amount: number;
    currency: 'BRL';
  }; // Compatibility field
  applicablePaymentMethods?: PaymentMethod[];
  applicablePackages?: any[]; // Compatibility field
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscountCoupon = Coupon;

export interface CouponValidationResult {
  isValid: boolean;
  error?: string;
  discountAmount?: number;
  finalAmount?: number;
}

export interface ApplyCouponRequest {
  couponCode: string;
  orderAmount: number; // in cents
  paymentMethod?: PaymentMethod;
  userId?: string;
}

export type PaymentMethod =
  | 'mercadopago'
  | 'pix'
  | 'bitcoin'
  | 'usdt'
  | 'whatsapp'
  | 'github'
  | 'crypto';
