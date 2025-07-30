'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // In a real implementation, fetch order details from your backend
    // using the payment_id or external_reference
    if (externalReference) {
      // Mock order details
      setOrderDetails({
        orderId: externalReference,
        total: 25000, // R$ 250,00 in cents
        items: [
          { name: 'Pacote Gold - Escalada Intermediária', participant: 'João Silva' }
        ],
        climbingDate: '2024-08-15',
        paymentId: paymentId
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
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Pagamento Aprovado!
        </h1>
        <p className="text-neutral-600 mb-6">
          Sua compra foi processada com sucesso. Em breve você receberá um e-mail com todos os detalhes.
        </p>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-neutral-900 mb-3">Detalhes do Pedido</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Pedido:</span>
                <span className="font-medium">#{orderDetails.orderId.slice(-8)}</span>
              </div>
              
              {paymentId && (
                <div className="flex justify-between">
                  <span className="text-neutral-600">Pagamento:</span>
                  <span className="font-medium">#{paymentId}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-neutral-600">Total:</span>
                <span className="font-semibold text-climb-600">
                  {formatPrice(orderDetails.total)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200">
              <div className="flex items-center text-sm text-neutral-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Data da escalada: {new Date(orderDetails.climbingDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-amber-800 mb-2">Próximos Passos:</h4>
          <ul className="text-sm text-amber-700 space-y-1 text-left">
            <li>• Você receberá um e-mail de confirmação</li>
            <li>• Nosso time entrará em contato para coordenar os detalhes</li>
            <li>• Apresente-se no local com 30 minutos de antecedência</li>
            <li>• Traga documento com foto e roupas adequadas</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/" className="w-full">
            <Button size="lg" className="w-full">
              Voltar ao Início
            </Button>
          </Link>
          
          <Link href="/meus-pedidos" className="w-full">
            <Button variant="outline" size="lg" className="w-full">
              Ver Meus Pedidos
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-xs text-neutral-500 mt-6">
          Precisa de ajuda? Entre em contato conosco pelo WhatsApp: (15) 99999-9999
        </p>
      </div>
    </div>
  );
} 