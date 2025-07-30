'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from '@/components/ui';
import { PACKAGES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export function PackagesSection() {
  const { addItem } = useCartStore();

  const handleAddToCart = (packageId: string) => {
    const pkg = PACKAGES[packageId];
    if (pkg) {
      addItem({
        packageId,
        packageName: pkg.name,
        price: pkg.price,
        quantity: 1,
        participantName: 'Participante', // This will be updated in checkout
      });
    }
  };

  return (
    <section id="pacotes" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            Pacotes de Escalada
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Escolha a experiência perfeita para o seu nível. Todos os pacotes incluem 
            equipamentos de segurança e instrução profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(PACKAGES).map((pkg) => (
            <Card
              key={pkg.id}
              interactive
              className={`relative overflow-hidden ${
                pkg.popular ? 'ring-2 ring-orange-400 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-orange-400 text-white px-4 py-1 text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl ${
                  pkg.shape === 'hexagon' ? 'clip-hexagon bg-climb-500' :
                  pkg.shape === 'triangle' ? 'clip-triangle bg-orange-400' :
                  'rounded-full bg-purple-500'
                } text-white`}>
                  {pkg.shape === 'hexagon' ? '🏔️' : 
                   pkg.shape === 'triangle' ? '⭐' : '👑'}
                </div>
                <CardTitle className="text-2xl font-bold text-climb-600">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-climb-600">
                      {formatPrice(pkg.price / 100)}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-neutral-500 line-through">
                        {formatPrice(pkg.originalPrice / 100)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-neutral-600 mt-1">
                    {pkg.duration} • {pkg.maxParticipants} pessoas máx.
                  </div>
                </div>

                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-climb-500 mt-1">✓</span>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="lg"
                  onClick={() => handleAddToCart(pkg.id)}
                >
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Dúvidas sobre qual pacote escolher?
          </p>
          <Button variant="ghost" size="lg">
            📞 Fale Conosco
          </Button>
        </div>
      </div>
    </section>
  );
}