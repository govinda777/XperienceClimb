'use client';

import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface PaymentProcessingModalProps {
  isOpen: boolean;
  status: 'processing' | 'success' | 'error';
  paymentMethod: string;
  errorMessage?: string;
  onClose: () => void;
}

export function PaymentProcessingModal({
  isOpen,
  status,
  paymentMethod,
  errorMessage,
  onClose
}: PaymentProcessingModalProps) {
  if (!isOpen) return null;

  const getPaymentMethodName = (method: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          {status === 'processing' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-climb-600" />
              <h3 className="text-lg font-semibold">Processando Pagamento</h3>
              <p className="text-center text-neutral-600">
                Estamos processando seu pagamento via {getPaymentMethodName(paymentMethod)}. 
                Por favor, aguarde...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <h3 className="text-lg font-semibold text-green-600">Pagamento Iniciado!</h3>
              <p className="text-center text-neutral-600">
                Seu pagamento via {getPaymentMethodName(paymentMethod)} foi iniciado com sucesso.
                Você será redirecionado em instantes.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-red-600" />
              <h3 className="text-lg font-semibold text-red-600">Erro no Pagamento</h3>
              <p className="text-center text-neutral-600">
                {errorMessage || 'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.'}
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Fechar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
