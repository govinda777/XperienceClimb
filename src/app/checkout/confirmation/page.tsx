'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { OrderRepository } from '@/infrastructure/repositories/OrderRepository';
import { Order } from '@/core/entities/Order';
import { formatPrice } from '@/lib/utils';

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get('orderId');
  const paymentMethod = searchParams.get('method');
  const status = searchParams.get('status');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('ID do pedido não encontrado');
        setLoading(false);
        return;
      }

      try {
        const orderRepository = new OrderRepository();
        const orderData = await orderRepository.findById(orderId);

        if (!orderData) {
          setError('Pedido não encontrado');
        } else {
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Erro ao carregar detalhes do pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle2 className="h-16 w-16 text-green-600" />,
          title: 'Pagamento Confirmado!',
          description: 'Seu pagamento foi processado com sucesso.',
          color: 'text-green-600'
        };
      case 'pending':
        return {
          icon: <Loader2 className="h-16 w-16 animate-spin text-yellow-500" />,
          title: 'Pagamento em Processamento',
          description: 'Seu pagamento está sendo processado. Aguarde a confirmação.',
          color: 'text-yellow-500'
        };
      case 'failed':
        return {
          icon: <XCircle className="h-16 w-16 text-red-600" />,
          title: 'Falha no Pagamento',
          description: 'Houve um problema ao processar seu pagamento.',
          color: 'text-red-600'
        };
      default:
        return {
          icon: <Loader2 className="h-16 w-16 animate-spin text-neutral-500" />,
          title: 'Status Desconhecido',
          description: 'Não foi possível determinar o status do pagamento.',
          color: 'text-neutral-500'
        };
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-climb-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4">
        <XCircle className="h-16 w-16 text-red-600" />
        <h1 className="text-xl font-semibold text-red-600">Erro</h1>
        <p className="text-center text-neutral-600">{error}</p>
        <Button href="/" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Voltar para Home
        </Button>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <div className="mx-auto max-w-4xl p-4">
      {/* Status Header */}
      <div className="mb-8 flex flex-col items-center space-y-4 text-center">
        {statusInfo.icon}
        <h1 className={`text-2xl font-bold ${statusInfo.color}`}>
          {statusInfo.title}
        </h1>
        <p className="text-neutral-600">{statusInfo.description}</p>
      </div>

      {order && (
        <div className="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          {/* Order Summary */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Resumo do Pedido</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-4 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.packageName}</p>
                    <p className="text-sm text-neutral-600">
                      {item.participantDetails?.name}
                    </p>
                  </div>
                  <p className="font-semibold text-climb-600">
                    {formatPrice(item.price.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Detalhes do Pagamento</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Método de Pagamento</span>
                <span>{getPaymentMethodName(paymentMethod || order.payment.method)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className={statusInfo.color}>{statusInfo.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Data</span>
                <span>
                  {order.payment.processedAt
                    ? new Date(order.payment.processedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Pendente'}
                </span>
              </div>
              {order.payment.transactionId && (
                <div className="flex justify-between">
                  <span>ID da Transação</span>
                  <span className="font-mono">{order.payment.transactionId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-climb-600">{formatPrice(order.total.amount)}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">Próximos Passos</h3>
            <ul className="list-inside list-disc space-y-2 text-blue-700">
              <li>Você receberá um e-mail com a confirmação do pedido</li>
              <li>Nossa equipe entrará em contato via WhatsApp para coordenar os detalhes</li>
              <li>Prepare-se para uma experiência incrível de escalada!</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button
              href="/"
              variant="outline"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Voltar para Home
            </Button>

            {status === 'failed' && (
              <Button
                href={`/checkout/retry?orderId=${orderId}`}
                className="bg-red-600 hover:bg-red-700"
              >
                Tentar Novamente
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
