'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card } from '@/components/ui';
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  LogIn,
  ArrowLeft,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { CheckoutForm } from './CheckoutForm';

export function CartModal() {
  const {
    items,
    isOpen,
    isCheckoutOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    setCheckoutOpen,
  } = useCartStore();

  const { isLoggedIn, login } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted || !isOpen) return null;

  const wantsCheckout = Boolean((showCheckout || isCheckoutOpen) && items.length > 0);
  const isViewingCheckout = Boolean(isLoggedIn && wantsCheckout);
  const isAuthRequired = Boolean(!isLoggedIn && wantsCheckout);

  const handleCheckout = () => {
    setShowCheckout(true);
    if (setCheckoutOpen) {
      setCheckoutOpen(true);
    }
    if (!isLoggedIn) {
      login();
      return;
    }
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
    if (setCheckoutOpen) {
      setCheckoutOpen(false);
    }
  };

  const handleCheckoutSuccess = () => {
    clearCart();
    closeCart();
    setShowCheckout(false);
    if (setCheckoutOpen) {
      setCheckoutOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart} />

      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-forest-700" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold">
                {isViewingCheckout
                  ? 'Finalizar Compra'
                  : isAuthRequired
                    ? 'Identificação'
                    : 'Meu Carrinho'}
              </h2>
              {!isViewingCheckout && !isAuthRequired && (
                <span className="text-sm text-neutral-500">
                  ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {isViewingCheckout ? (
              <CheckoutForm
                cartItems={items}
                onBack={handleBackToCart}
                onSuccess={handleCheckoutSuccess}
              />
            ) : isAuthRequired ? (
              <AuthPromptScreen
                onLogin={login}
                onBack={handleBackToCart}
                totalPrice={getTotalPrice()}
                totalItems={getTotalItems()}
              />
            ) : (
              <CartContent
                items={items}
                onRemoveItem={removeItem}
                onUpdateQuantity={updateQuantity}
                onClearCart={clearCart}
                totalPrice={getTotalPrice()}
                onCheckout={handleCheckout}
                isLoggedIn={isLoggedIn}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartContentProps {
  items: any[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  totalPrice: number;
  onCheckout: () => void;
  isLoggedIn: boolean;
}

function CartContent({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  totalPrice,
  onCheckout,
  isLoggedIn,
}: CartContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <ShoppingCart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Carrinho vazio</h3>
          <p className="text-neutral-600 mb-4">
            Adicione experiências de escalada ao seu carrinho para continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">{item.packageName}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Participante: {item.participantName}
                </p>
                <p className="text-forest-800 font-semibold mt-2">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center font-medium">{item.quantity}</span>

                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-sm text-red-600 hover:text-red-700 mt-3 transition-colors"
            >
              Remover
            </button>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 p-4 space-y-4">
        {/* Clear Cart */}
        <button
          onClick={onClearCart}
          className="text-sm text-neutral-600 hover:text-neutral-700 transition-colors"
        >
          Limpar carrinho
        </button>

        {/* Total */}
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total:</span>
          <span className="text-forest-800">{formatPrice(totalPrice)}</span>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          size="lg"
          className="w-full"
          leftIcon={<CreditCard className="h-5 w-5" />}
        >
          {isLoggedIn ? 'Finalizar Compra' : 'Entrar e Comprar'}
        </Button>
      </div>
    </>
  );
}

interface AuthPromptScreenProps {
  onLogin: () => void;
  onBack: () => void;
  totalPrice: number;
  totalItems: number;
}

function AuthPromptScreen({ onLogin, onBack, totalPrice, totalItems }: AuthPromptScreenProps) {
  return (
    <div className="flex h-full flex-col justify-between p-6 bg-sand-50/50">
      <div className="space-y-6">
        {/* Badge & Título Outdoor Editorial */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" strokeWidth={1.5} />
            <span>Área Segura · Etapa Prévia</span>
          </div>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight text-ink-900 leading-tight">
            Identifique-se para <br />
            <span className="font-serifIt italic font-light text-forest-700 normal-case">
              finalizar sua reserva
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 mt-2 leading-relaxed">
            Para garantir sua vaga na rocha, emitir a apólice individual do Seguro Aventura e
            validar seu pedido, conecte sua conta antes de preencher os dados dos participantes.
          </p>
        </div>

        {/* Card Resumo do Carrinho */}
        <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-ink-500 mb-2">
            <span>RESUMO DO CARRINHO</span>
            <span>
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-1 border-t border-sand-100">
            <span className="text-sm font-medium text-ink-800">Total a Pagar:</span>
            <span className="font-display text-xl font-black text-forest-800">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Benefícios da Identificação */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-sand-200/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-ink-900">Seguro Aventura Individual</h4>
              <p className="text-[11px] text-ink-600 leading-snug">
                Apólice oficial emitida diretamente para o seu CPF/perfil verificado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-sand-200/60">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <LogIn className="w-4 h-4 text-amber-800" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-ink-900">Agilidade no Checkout</h4>
              <p className="text-[11px] text-ink-600 leading-snug">
                Seus dados principais são preenchidos automaticamente no formulário.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="space-y-3 pt-6 border-t border-sand-200">
        <Button
          onClick={onLogin}
          size="lg"
          className="w-full bg-forest-800 hover:bg-forest-900 text-white font-mono text-xs uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <LogIn className="w-4 h-4" strokeWidth={1.5} />
          <span>Entrar ou Criar Conta</span>
          <span>›</span>
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2.5 text-xs font-mono font-medium text-ink-600 hover:text-ink-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Ver Itens do Carrinho</span>
        </button>
      </div>
    </div>
  );
}
