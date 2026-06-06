'use client';

import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro Crítico</h2>
            <p className="text-gray-600 mb-8 text-sm break-words">
              {error.message || 'Ocorreu um erro fatal ao renderizar a aplicação.'}
            </p>
            <button
              onClick={() => reset()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Recarregar Aplicação
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
