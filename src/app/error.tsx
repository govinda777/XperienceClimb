'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ops! Algo deu errado.</h2>

        <p className="text-gray-600 mb-8">
          Encontramos um problema inesperado ao carregar a aplicação. Pode ser uma instabilidade
          temporária.
        </p>

        <div className="space-y-4">
          <Button onClick={() => reset()} className="w-full bg-climb-500 hover:bg-climb-600">
            Tentar Novamente
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = '/')} className="w-full">
            Voltar para o Início
          </Button>
        </div>
      </div>
    </div>
  );
}
