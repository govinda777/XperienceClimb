'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { Tag, Check, X, Loader2 } from 'lucide-react';

interface CouponInputProps {
  onCouponApply: (couponCode: string) => Promise<{
    success: boolean;
    error?: string;
    discountAmount?: number;
    finalAmount?: number;
  }>;
  onCouponRemove: () => void;
  appliedCoupon?: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  };
  disabled?: boolean;
}

export function CouponInput({ 
  onCouponApply, 
  onCouponRemove, 
  appliedCoupon, 
  disabled = false 
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Digite um código de cupom');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const result = await onCouponApply(couponCode.trim().toUpperCase());
      
      if (result.success) {
        setCouponCode('');
        setError(null);
      } else {
        setError(result.error || 'Erro ao aplicar cupom');
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemove();
    setCouponCode('');
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isValidating && !appliedCoupon) {
      handleApplyCoupon();
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount / 100);
  };

  return (
    <div className="space-y-4">
      <div className="border border-neutral-200 rounded-lg p-4 bg-white">
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-5 w-5 text-climb-600" />
          <h4 className="font-medium text-neutral-900">Cupom de Desconto</h4>
        </div>

        {!appliedCoupon ? (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Digite seu código de cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  disabled={disabled || isValidating}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-climb-500 focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-500"
                />
              </div>
              <Button
                onClick={handleApplyCoupon}
                disabled={disabled || isValidating || !couponCode.trim()}
                loading={isValidating}
                variant="outline"
                className="px-4"
              >
                {isValidating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Aplicar'
                )}
              </Button>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <X className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="text-xs text-neutral-500">
              <p className="mb-1">💡 Cupons disponíveis para teste:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setCouponCode('WELCOME10')}
                  className="text-left p-2 bg-neutral-50 rounded border hover:bg-neutral-100 transition-colors"
                  disabled={disabled || isValidating}
                >
                  <div className="font-mono text-xs font-medium text-climb-600">WELCOME10</div>
                  <div className="text-xs text-neutral-600">10% de desconto</div>
                </button>
                <button
                  onClick={() => setCouponCode('CLIMB50')}
                  className="text-left p-2 bg-neutral-50 rounded border hover:bg-neutral-100 transition-colors"
                  disabled={disabled || isValidating}
                >
                  <div className="font-mono text-xs font-medium text-climb-600">CLIMB50</div>
                  <div className="text-xs text-neutral-600">R$ 50 de desconto</div>
                </button>
                <button
                  onClick={() => setCouponCode('CRYPTO15')}
                  className="text-left p-2 bg-neutral-50 rounded border hover:bg-neutral-100 transition-colors"
                  disabled={disabled || isValidating}
                >
                  <div className="font-mono text-xs font-medium text-climb-600">CRYPTO15</div>
                  <div className="text-xs text-neutral-600">15% crypto only</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">
                    Cupom aplicado: <span className="font-mono">{appliedCoupon.code}</span>
                  </p>
                  <p className="text-sm text-green-700">
                    Desconto: {formatPrice(appliedCoupon.discountAmount)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveCoupon}
                disabled={disabled}
                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors disabled:opacity-50"
                title="Remover cupom"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">Novo total:</span>
                <span className="text-lg font-bold text-blue-900">
                  {formatPrice(appliedCoupon.finalAmount)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coupon Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <h5 className="text-sm font-medium text-amber-800 mb-2">💡 Dicas sobre cupons:</h5>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>• Cupons são aplicados antes da seleção do método de pagamento</li>
          <li>• Alguns cupons são específicos para determinados métodos de pagamento</li>
          <li>• Cupons têm validade e limite de uso</li>
          <li>• Apenas um cupom pode ser usado por pedido</li>
        </ul>
      </div>
    </div>
  );
}
