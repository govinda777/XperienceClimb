'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const statusDetail = searchParams.get('status_detail');

  const getErrorMessage = (status: string | null, statusDetail: string | null) => {
    if (statusDetail === 'cc_rejected_insufficient_amount') {
      return 'Saldo insuficiente no cartão';
    }
    if (statusDetail === 'cc_rejected_bad_filled_card_number') {
      return 'Número do cartão inválido';
    }
    if (statusDetail === 'cc_rejected_bad_filled_security_code') {
      return 'Código de segurança inválido';
    }
    if (statusDetail === 'cc_rejected_bad_filled_date') {
      return 'Data de vencimento inválida';
    }
    if (status === 'rejected') {
      return 'Pagamento rejeitado pelo banco';
    }
    return 'Ocorreu um problema durante o processamento do pagamento';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Pagamento Não Aprovado
        </h1>
        <p className="text-neutral-600 mb-6">
          {getErrorMessage(status, statusDetail)}
        </p>

        {/* Error Details */}
        {(status || statusDetail) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-red-800 mb-2">Detalhes do Erro:</h4>
            <div className="text-sm text-red-700 space-y-1">
              {status && <p>Status: {status}</p>}
              {statusDetail && <p>Detalhe: {statusDetail}</p>}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-neutral-800 mb-2">O que fazer agora?</h4>
          <ul className="text-sm text-neutral-600 space-y-1 text-left">
            <li>• Verifique os dados do cartão</li>
            <li>• Confirme se há saldo disponível</li>
            <li>• Tente novamente com outro cartão</li>
            <li>• Entre em contato conosco se precisar de ajuda</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => window.history.back()}
          >
            Tentar Novamente
          </Button>
          
          <Link href="/" className="w-full">
            <Button variant="outline" size="lg" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 mb-2">Precisa de ajuda?</p>
          <p className="text-xs text-neutral-500">
            WhatsApp: (15) 99999-9999<br />
            E-mail: contato@xperienceclimb.com
          </p>
        </div>
      </div>
    </div>
  );
} 