import { NextRequest, NextResponse } from 'next/server';
import { CouponService } from '@/infrastructure/services/CouponService';
import { ValidateCoupon } from '@/core/use-cases/coupons/ValidateCoupon';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { couponCode, orderAmount, paymentMethod, userId } = body;

    // Validate required fields
    if (!couponCode || !orderAmount) {
      return NextResponse.json(
        { error: 'Código do cupom e valor do pedido são obrigatórios' },
        { status: 400 }
      );
    }

    if (orderAmount <= 0) {
      return NextResponse.json(
        { error: 'Valor do pedido deve ser maior que zero' },
        { status: 400 }
      );
    }

    // Initialize services
    const couponService = new CouponService();
    const validateCouponUseCase = new ValidateCoupon(couponService);

    // Validate coupon
    const result = await validateCouponUseCase.execute({
      couponCode: couponCode.trim().toUpperCase(),
      orderAmount: parseInt(orderAmount),
      paymentMethod,
      userId
    });

    if (result.isValid) {
      return NextResponse.json({
        success: true,
        valid: true,
        discountAmount: result.discountAmount,
        finalAmount: result.finalAmount
      });
    } else {
      return NextResponse.json({
        success: true,
        valid: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const couponService = new CouponService();
    const activeCoupons = await couponService.getActiveCoupons();
    
    // Return only public information about coupons
    const publicCoupons = activeCoupons.map(coupon => ({
      code: coupon.code,
      description: coupon.description,
      type: coupon.type,
      value: coupon.type === 'percentage' ? coupon.value : undefined, // Don't expose fixed amounts
      minOrderAmount: coupon.minOrderAmount,
      applicablePaymentMethods: coupon.applicablePaymentMethods,
      validUntil: coupon.validUntil
    }));

    return NextResponse.json({
      success: true,
      coupons: publicCoupons
    });
  } catch (error) {
    console.error('Error getting active coupons:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
