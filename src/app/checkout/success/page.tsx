'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Calendar, CreditCard } from 'lucide-react';

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
        items: [
          { name: 'Pacote Intermediário - Escalada Completa', participant: 'João Silva' }
        ],
        climbingDate: '2025-08-16',
        paymentId: paymentId || undefined
      });
    }
  }, [paymentId, externalReference]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-climb-50 to-climb-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pagamento Confirmado!
        </h1>
        <p className="text-gray-600 mb-8">
          Sua reserva foi processada com sucesso. Prepare-se para uma aventura incrível!
        </p>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Detalhes da Reserva</h3>
            
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
                    currency: 'BRL'
                  }).format(orderDetails.total / 100)}
                </span>
              </div>
              
              <div className="border-t pt-3">
                <span className="text-gray-600 block mb-2">Itens:</span>
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
                  <span className="font-medium text-xs">{orderDetails.paymentId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-climb-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-climb-600 transition-colors flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Baixar Comprovante</span>
          </button>
          
          <button className="w-full bg-orange-100 text-orange-700 py-3 px-6 rounded-lg font-medium hover:bg-orange-200 transition-colors flex items-center justify-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Adicionar ao Calendário</span>
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Informações Importantes</h4>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Chegue 30 minutos antes do horário agendado</li>
            <li>• Traga roupas confortáveis e tênis fechado</li>
            <li>• Água e protetor solar são obrigatórios</li>
            <li>• Equipamentos de segurança serão fornecidos</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            Em caso de dúvidas, entre em contato conosco pelo WhatsApp: (15) 99999-9999
          </p>
        </div>
      </div>
    </div>
  );
}