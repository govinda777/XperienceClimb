'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card } from '@/components/ui';
import { X, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { CheckoutForm } from './CheckoutForm';

export function CartModal() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getTotalPrice,
    getTotalItems 
  } = useCartStore();
  
  const { isLoggedIn, login } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      login();
      return;
    }
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handleCheckoutSuccess = () => {
    clearCart();
    closeCart();
    setShowCheckout(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />
      
      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-climb-500" />
              <h2 className="text-lg font-semibold">
                {showCheckout ? 'Finalizar Compra' : 'Meu Carrinho'}
              </h2>
              {!showCheckout && (
                <span className="text-sm text-neutral-500">
                  ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {showCheckout ? (
              <CheckoutForm
                cartItems={items}
                onBack={handleBackToCart}
                onSuccess={handleCheckoutSuccess}
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
  isLoggedIn
}: CartContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <ShoppingCart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            Carrinho vazio
          </h3>
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
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">{item.packageName}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Participante: {item.participantName}
                </p>
                <p className="text-climb-600 font-semibold mt-2">
                  {formatPrice(item.price)}
                </p>
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
          <span className="text-climb-600">{formatPrice(totalPrice)}</span>
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