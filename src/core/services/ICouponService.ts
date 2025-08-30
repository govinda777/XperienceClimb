import { DiscountCoupon, CouponValidationResult, ApplyCouponRequest } from '../entities/Coupon';

export interface ICouponService {
  /**
   * Validates a coupon code and returns validation result with discount calculation
   */
  validateCoupon(request: ApplyCouponRequest): Promise<CouponValidationResult>;

  /**
   * Gets coupon details by code
   */
  getCouponByCode(code: string): Promise<DiscountCoupon | null>;

  /**
   * Marks a coupon as used (increments usage count)
   */
  markCouponAsUsed(couponId: string, userId?: string): Promise<void>;

  /**
   * Creates a new coupon (admin function)
   */
  createCoupon(coupon: Omit<DiscountCoupon, 'id' | 'usedCount' | 'createdAt' | 'updatedAt'>): Promise<DiscountCoupon>;

  /**
   * Gets all active coupons (admin function)
   */
  getActiveCoupons(): Promise<DiscountCoupon[]>;

  /**
   * Deactivates a coupon
   */
  deactivateCoupon(couponId: string): Promise<void>;
}
