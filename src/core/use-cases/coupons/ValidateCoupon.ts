import { ICouponService } from '../../services/ICouponService';
import { ApplyCouponRequest, CouponValidationResult } from '../../entities/Coupon';

export class ValidateCoupon {
  constructor(private couponService: ICouponService) {}

  async execute(request: ApplyCouponRequest): Promise<CouponValidationResult> {
    try {
      // Basic validation
      if (!request.couponCode || request.couponCode.trim().length === 0) {
        return {
          isValid: false,
          error: 'Código do cupom é obrigatório'
        };
      }

      if (!request.orderAmount || request.orderAmount <= 0) {
        return {
          isValid: false,
          error: 'Valor do pedido inválido'
        };
      }

      // Validate coupon through service
      const result = await this.couponService.validateCoupon(request);
      
      return result;
    } catch (error) {
      console.error('Error validating coupon:', error);
      return {
        isValid: false,
        error: 'Erro interno ao validar cupom. Tente novamente.'
      };
    }
  }
}
