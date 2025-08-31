'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { PaymentMethod } from '@/core/entities/Coupon';

interface PaymentRetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onChangeMethod: () => void;
  paymentMethod: PaymentMethod;
  error: string;
  retryCount: number;
  maxRetries?: number;
}

export function PaymentRetryModal({
  isOpen,
  onClose,
  onRetry,
  onChangeMethod,
  paymentMethod,
  error,
  retryCount,
  maxRetries = 3
}: PaymentRetryModalProps) {
  if (!isOpen) return null;

  const getPaymentMethodName = (method: PaymentMethod) => {
    switch (method) {
      case 'mercadopago': return 'Cartão de Crédito';
      case 'pix': return 'PIX';
      case 'bitcoin': return 'Bitcoin';
      case 'usdt': return 'USDT';
      case 'whatsapp': return 'WhatsApp';
      case 'github': return 'GitHub Sponsors';
      default: return method;
    }
  };

  const canRetry = retryCount < maxRetries;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          
          <h3 className="text-lg font-semibold text-red-600">
            Falha no Pagamento
          </h3>

          <div className="text-center">
            <p className="mb-2 text-neutral-600">
              Ocorreu um erro ao processar seu pagamento via {getPaymentMethodName(paymentMethod)}:
            </p>
            <p className="font-medium text-red-600">{error}</p>
          </div>

          {canRetry && (
            <div className="flex w-full flex-col space-y-2">
              <Button
                onClick={onRetry}
                className="w-full"
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Tentar Novamente ({maxRetries - retryCount} tentativas restantes)
              </Button>

              <Button
                variant="outline"
                onClick={onChangeMethod}
                className="w-full"
              >
                Escolher Outro Método de Pagamento
              </Button>
            </div>
          )}

          {!canRetry && (
            <div className="flex w-full flex-col space-y-2">
              <p className="text-center text-neutral-600">
                Número máximo de tentativas excedido. Por favor, escolha outro método de pagamento
                ou entre em contato com nosso suporte.
              </p>

              <Button
                variant="outline"
                onClick={onChangeMethod}
                className="w-full"
              >
                Escolher Outro Método de Pagamento
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-neutral-600"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
