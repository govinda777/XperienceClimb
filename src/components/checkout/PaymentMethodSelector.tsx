'use client';

import React from 'react';
import { CreditCard, Smartphone, Bitcoin, DollarSign, Github } from 'lucide-react';
import { PaymentMethod } from '@/core/entities/Coupon';

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodChange: (method: PaymentMethod) => void;
  totalAmount: number; // in cents
  discountedAmount?: number; // in cents
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'mercadopago',
    name: 'Cartão de Crédito',
    description: 'Visa, Mastercard, Elo e outros',
    icon: <CreditCard className="h-6 w-6" />,
    badge: 'Mais Popular'
  },
  {
    id: 'pix',
    name: 'PIX',
    description: 'Pagamento instantâneo via PIX',
    icon: <Smartphone className="h-6 w-6" />,
    badge: 'Instantâneo'
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    description: 'Pagamento em Bitcoin (BTC)',
    icon: <Bitcoin className="h-6 w-6" />,
    badge: '15% OFF'
  },
  {
    id: 'usdt',
    name: 'USDT',
    description: 'Tether (USDT) na rede Ethereum',
    icon: <DollarSign className="h-6 w-6" />,
    badge: '15% OFF'
  },
  {
    id: 'github',
    name: 'GitHub Sponsors',
    description: 'Patrocínio via GitHub Sponsors',
    icon: <Github className="h-6 w-6" />,
    badge: 'Open Source'
  }
];

export function PaymentMethodSelector({ 
  selectedMethod, 
  onMethodChange, 
  totalAmount, 
  discountedAmount 
}: PaymentMethodSelectorProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount / 100);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          💳 Escolha o Método de Pagamento
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Valor Total:</p>
              {discountedAmount && discountedAmount !== totalAmount && (
                <p className="text-xs text-blue-600 line-through">
                  {formatPrice(totalAmount)}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-900">
                {formatPrice(discountedAmount || totalAmount)}
              </p>
              {discountedAmount && discountedAmount !== totalAmount && (
                <p className="text-xs text-green-600 font-medium">
                  Economia: {formatPrice(totalAmount - discountedAmount)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedMethod === method.id
                ? 'border-climb-500 bg-climb-50 shadow-md'
                : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
            } ${method.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !method.disabled && onMethodChange(method.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Radio Button */}
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'border-climb-500 bg-climb-500'
                      : 'border-neutral-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Icon */}
              <div className={`flex-shrink-0 ${
                selectedMethod === method.id ? 'text-climb-600' : 'text-neutral-500'
              }`}>
                {method.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${
                    selectedMethod === method.id ? 'text-climb-900' : 'text-neutral-900'
                  }`}>
                    {method.name}
                  </h4>
                  {method.badge && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      method.badge === 'Mais Popular'
                        ? 'bg-blue-100 text-blue-800'
                        : method.badge === 'Instantâneo'
                        ? 'bg-green-100 text-green-800'
                        : method.badge.includes('OFF')
                        ? 'bg-orange-100 text-orange-800'
                        : method.badge === 'Open Source'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {method.badge}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  selectedMethod === method.id ? 'text-climb-700' : 'text-neutral-600'
                }`}>
                  {method.description}
                </p>
              </div>
            </div>

            {/* Selected indicator */}
            {selectedMethod === method.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-climb-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Method Info */}
      {selectedMethod && (
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <PaymentMethodInfo method={selectedMethod} />
        </div>
      )}
    </div>
  );
}

function PaymentMethodInfo({ method }: { method: PaymentMethod }) {
  const getMethodInfo = () => {
    switch (method) {
      case 'mercadopago':
        return {
          title: '💳 Cartão de Crédito',
          items: [
            'Pagamento seguro via Mercado Pago',
            'Aceita Visa, Mastercard, Elo e outros',
            'Parcelamento disponível',
            'Confirmação instantânea'
          ]
        };
      case 'pix':
        return {
          title: '📱 PIX',
          items: [
            'Pagamento instantâneo 24/7',
            'QR Code para escaneamento',
            'Confirmação em segundos',
            'Sem taxas adicionais'
          ]
        };
      case 'bitcoin':
        return {
          title: '₿ Bitcoin',
          items: [
            'Pagamento em Bitcoin (BTC)',
            'Desconto especial de 15%',
            '1 confirmação necessária',
            'Válido por 1 hora'
          ]
        };
      case 'usdt':
        return {
          title: '💰 USDT',
          items: [
            'Tether (USDT) na rede Ethereum',
            'Desconto especial de 15%',
            '12 confirmações necessárias',
            'Válido por 1 hora'
          ]
        };
      case 'github':
        return {
          title: '🐙 GitHub Sponsors',
          items: [
            'Patrocínio via GitHub Sponsors',
            'Pagamento em USD convertido automaticamente',
            'Suporte ao desenvolvimento open source',
            'Confirmação via webhook do GitHub'
          ]
        };
      default:
        return { title: '', items: [] };
    }
  };

  const info = getMethodInfo();

  return (
    <div>
      <h4 className="font-medium text-neutral-900 mb-2">{info.title}</h4>
      <ul className="space-y-1">
        {info.items.map((item, index) => (
          <li key={index} className="text-sm text-neutral-600 flex items-center">
            <span className="w-1.5 h-1.5 bg-climb-500 rounded-full mr-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
