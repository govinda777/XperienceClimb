import { ICouponService } from '../../services/ICouponService';
import { Money } from '../../entities/Package';
import { DiscountInfo } from '../../entities/Order';

export interface ApplyDiscountRequest {
  couponCode: string;
  subtotal: Money;
  userId?: string;
}

export interface ApplyDiscountResult {
  success: boolean;
  error?: string;
  discountInfo?: DiscountInfo;
  finalTotal?: Money;
}

export class ApplyDiscount {
  constructor(private couponService: ICouponService) {}

  async execute(request: ApplyDiscountRequest): Promise<ApplyDiscountResult> {
    try {
      // Validate coupon first
      const validationResult = await this.couponService.validateCoupon({
        couponCode: request.couponCode,
        orderAmount: request.subtotal.amount,
        userId: request.userId
      });

      if (!validationResult.isValid) {
        return {
          success: false,
          error: validationResult.error
        };
      }

      // Get coupon details
      const coupon = await this.couponService.getCouponByCode(request.couponCode);
      if (!coupon) {
        return {
          success: false,
          error: 'Cupom não encontrado'
        };
      }

      // Calculate discount
      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = Math.floor((request.subtotal.amount * coupon.value) / 100);
      } else {
        discountAmount = coupon.value;
      }

      // Ensure discount doesn't exceed subtotal
      discountAmount = Math.min(discountAmount, request.subtotal.amount);

      const finalTotal: Money = {
        amount: request.subtotal.amount - discountAmount,
        currency: request.subtotal.currency
      };

      const discountInfo: DiscountInfo = {
        couponCode: coupon.code,
        couponId: coupon.id,
        discountType: coupon.type,
        discountValue: coupon.value,
        discountAmount: {
          amount: discountAmount,
          currency: request.subtotal.currency
        }
      };

      return {
        success: true,
        discountInfo,
        finalTotal
      };
    } catch (error) {
      console.error('Error applying discount:', error);
      return {
        success: false,
        error: 'Erro interno ao aplicar desconto. Tente novamente.'
      };
    }
  }
}
