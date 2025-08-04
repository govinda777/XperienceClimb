'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Calendar } from 'lucide-react';

interface OrderDetails {
  orderId: string;
  total: number;
  items: { name: string; participant: string }[];
  climbingDate: string;
  paymentId?: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const externalReference = searchParams.get('external_reference');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the order details from your backend
    // using the payment_id or external_reference
    if (externalReference) {
      // Mock order details with dynamic package name
      setOrderDetails({
        orderId: externalReference,
        total: 25000, // R$ 250,00 in cents
        items: [{ name: 'Pacote Intermediário - Escalada Completa', participant: 'João Silva' }],
        climbingDate: '2025-08-16',
        paymentId: paymentId || undefined,
      });
    }
  }, [paymentId, externalReference]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-climb-50 to-climb-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Pagamento Confirmado!</h1>
        <p className="mb-8 text-gray-600">
          Sua reserva foi processada com sucesso. Prepare-se para uma aventura incrível!
        </p>

        {/* Order Details */}
        {orderDetails && (
          <div className="mb-6 rounded-lg bg-gray-50 p-6 text-left">
            <h3 className="mb-4 font-semibold text-gray-900">Detalhes da Reserva</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Pedido:</span>
                <span className="font-medium">#{orderDetails.orderId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(orderDetails.total / 100)}
                </span>
              </div>

              <div className="border-t pt-3">
                <span className="mb-2 block text-gray-600">Itens:</span>
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500">Participante: {item.participant}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Data da escalada:</span>
                <span className="font-medium">
                  {new Date(orderDetails.climbingDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                </span>
              </div>

              {orderDetails.paymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ID do pagamento:</span>
                  <span className="text-xs font-medium">{orderDetails.paymentId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-climb-500 px-6 py-3 font-medium text-white transition-colors hover:bg-climb-600">
            <Download className="h-4 w-4" />
            <span>Baixar Comprovante</span>
          </button>

          <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-100 px-6 py-3 font-medium text-orange-700 transition-colors hover:bg-orange-200">
            <Calendar className="h-4 w-4" />
            <span>Adicionar ao Calendário</span>
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-8 rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-900">Informações Importantes</h4>
          <ul className="space-y-1 text-left text-sm text-blue-800">
            <li>• Chegue 30 minutos antes do horário agendado</li>
            <li>• Traga roupas confortáveis e tênis fechado</li>
            <li>• Água e protetor solar são obrigatórios</li>
            <li>• Equipamentos de segurança serão fornecidos</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-6 text-center">
          <p className="text-sm text-gray-500">
            Em caso de dúvidas, entre em contato conosco pelo WhatsApp: (15) 99999-9999
          </p>
        </div>
      </div>
    </div>
  );
}
