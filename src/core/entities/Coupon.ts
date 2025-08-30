export interface DiscountCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number; // Percentage (0-100) or amount in cents
  description: string;
  validFrom: Date;
  validUntil: Date;
  maxUses?: number;
  usedCount: number;
  minOrderAmount?: number; // Minimum order value in cents
  applicablePaymentMethods?: PaymentMethod[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

export type PaymentMethod = 'mercadopago' | 'pix' | 'bitcoin' | 'usdt' | 'whatsapp' | 'github';
