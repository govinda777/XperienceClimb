import { ICouponService } from '@/core/services/ICouponService';
import { DiscountCoupon, CouponValidationResult, ApplyCouponRequest } from '@/core/entities/Coupon';

export class CouponService implements ICouponService {
  // In a real application, this would be stored in a database
  // For now, we'll use a static array for demonstration
  private coupons: DiscountCoupon[] = [
    {
      id: 'welcome10',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      description: 'Desconto de 10% para novos clientes',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      maxUses: 100,
      usedCount: 0,
      minOrderAmount: 5000, // R$ 50.00 minimum
      applicablePaymentMethods: ['mercadopago', 'pix', 'bitcoin', 'usdt'],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'climb50',
      code: 'CLIMB50',
      type: 'fixed_amount',
      value: 5000, // R$ 50.00
      description: 'Desconto fixo de R$ 50,00',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      maxUses: 50,
      usedCount: 0,
      minOrderAmount: 10000, // R$ 100.00 minimum
      applicablePaymentMethods: ['mercadopago', 'pix'],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'crypto15',
      code: 'CRYPTO15',
      type: 'percentage',
      value: 15,
      description: 'Desconto de 15% para pagamentos em crypto',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      maxUses: 25,
      usedCount: 0,
      minOrderAmount: 3000, // R$ 30.00 minimum
      applicablePaymentMethods: ['bitcoin', 'usdt'],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  private usageTracking: Record<string, string[]> = {}; // couponId -> userIds

  async validateCoupon(request: ApplyCouponRequest): Promise<CouponValidationResult> {
    try {
      const coupon = await this.getCouponByCode(request.couponCode.toUpperCase());
      
      if (!coupon) {
        return {
          isValid: false,
          error: 'Cupom não encontrado'
        };
      }

      // Check if coupon is active
      if (!coupon.isActive) {
        return {
          isValid: false,
          error: 'Cupom não está ativo'
        };
      }

      // Check validity dates
      const now = new Date();
      if (now < coupon.validFrom) {
        return {
          isValid: false,
          error: 'Cupom ainda não é válido'
        };
      }

      if (now > coupon.validUntil) {
        return {
          isValid: false,
          error: 'Cupom expirado'
        };
      }

      // Check usage limit
      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        return {
          isValid: false,
          error: 'Cupom esgotado'
        };
      }

      // Check minimum order amount
      if (coupon.minOrderAmount && request.orderAmount < coupon.minOrderAmount) {
        const minAmount = (coupon.minOrderAmount / 100).toFixed(2);
        return {
          isValid: false,
          error: `Valor mínimo do pedido: R$ ${minAmount}`
        };
      }

      // Check payment method compatibility
      if (request.paymentMethod && coupon.applicablePaymentMethods) {
        if (!coupon.applicablePaymentMethods.includes(request.paymentMethod)) {
          return {
            isValid: false,
            error: 'Cupom não válido para este método de pagamento'
          };
        }
      }

      // Check user usage (if userId provided)
      if (request.userId && this.usageTracking[coupon.id]) {
        if (this.usageTracking[coupon.id].includes(request.userId)) {
          return {
            isValid: false,
            error: 'Você já utilizou este cupom'
          };
        }
      }

      // Calculate discount
      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = Math.floor((request.orderAmount * coupon.value) / 100);
      } else {
        discountAmount = coupon.value;
      }

      // Ensure discount doesn't exceed order amount
      discountAmount = Math.min(discountAmount, request.orderAmount);

      const finalAmount = request.orderAmount - discountAmount;

      return {
        isValid: true,
        discountAmount,
        finalAmount
      };
    } catch (error) {
      console.error('Error validating coupon:', error);
      return {
        isValid: false,
        error: 'Erro interno ao validar cupom'
      };
    }
  }

  async getCouponByCode(code: string): Promise<DiscountCoupon | null> {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    return coupon || null;
  }

  async markCouponAsUsed(couponId: string, userId?: string): Promise<void> {
    const coupon = this.coupons.find(c => c.id === couponId);
    if (coupon) {
      coupon.usedCount += 1;
      coupon.updatedAt = new Date();

      // Track user usage
      if (userId) {
        if (!this.usageTracking[couponId]) {
          this.usageTracking[couponId] = [];
        }
        this.usageTracking[couponId].push(userId);
      }
    }
  }

  async createCoupon(couponData: Omit<DiscountCoupon, 'id' | 'usedCount' | 'createdAt' | 'updatedAt'>): Promise<DiscountCoupon> {
    const newCoupon: DiscountCoupon = {
      ...couponData,
      id: `coupon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      usedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.coupons.push(newCoupon);
    return newCoupon;
  }

  async getActiveCoupons(): Promise<DiscountCoupon[]> {
    const now = new Date();
    return this.coupons.filter(coupon => 
      coupon.isActive && 
      coupon.validFrom <= now && 
      coupon.validUntil >= now
    );
  }

  async deactivateCoupon(couponId: string): Promise<void> {
    const coupon = this.coupons.find(c => c.id === couponId);
    if (coupon) {
      coupon.isActive = false;
      coupon.updatedAt = new Date();
    }
  }
}
