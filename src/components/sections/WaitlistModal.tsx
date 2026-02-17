'use client';

import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

export function WaitlistModal({ isOpen, onClose, packageName }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }

    // Construct message
    const message = `Olá! Gostaria de entrar na lista de espera para o pacote *${packageName}*.\n\nMeus dados:\nNome: ${name}`;

    openWhatsApp(CONTACT_INFO.phone, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-climb-100 text-climb-600">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Lista de Espera</h2>
          <p className="mt-2 text-neutral-600">
            O pacote <span className="font-semibold text-climb-600">{packageName}</span> está
            indisponível no momento. Entre na lista de espera e avisaremos assim que abrir uma vaga!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="block w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-climb-500 focus:outline-none focus:ring-1 focus:ring-climb-500 transition-colors"
              placeholder="Digite seu nome"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center font-medium bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full text-lg h-12 mt-4" size="lg">
            Entrar na Lista
          </Button>

          <p className="text-xs text-center text-neutral-500 mt-4 leading-relaxed">
            Ao clicar, você será redirecionado para o WhatsApp
            <br />
            para confirmar seu interesse.
          </p>
        </form>
      </div>
    </div>
  );
}
