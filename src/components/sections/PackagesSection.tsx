'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@/components/ui';
import { formatPrice, openWhatsApp } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { CONTACT_INFO } from '@/lib/constants';
import { WaitlistModal } from './WaitlistModal';

// Interface for API package data (includes styling information)
interface ApiPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  bonus: string[];
  shape: 'hexagon' | 'triangle' | 'circle';
  color: string;
  duration: string;
  maxParticipants: number;
  popular: boolean;
  disabled: boolean;
}

// Helper function to get complete Tailwind classes
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    'climb-300': 'bg-climb-500',
    'orange-400': 'bg-orange-400',
    'purple-500': 'bg-purple-500',
    'climb-500': 'bg-climb-500',
  };
  return colorMap[color] || 'bg-gray-500';
};

export function PackagesSection() {
  const { addItem, openCart } = useCartStore();
  const [apiPackages, setApiPackages] = React.useState<ApiPackage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [waitlistPackage, setWaitlistPackage] = React.useState<string | null>(null);

  // Fetch API data with styling information
  React.useEffect(() => {
    console.log('🔍 useEffect executado - iniciando fetch dos pacotes');

    const fetchApiData = async () => {
      try {
        console.log('📡 Iniciando fetch para /api/packages');
        setLoading(true);

        const response = await fetch('/api/packages');
        console.log('📨 Response recebida:', response.status, response.statusText);

        const result = await response.json();
        console.log('📦 Dados recebidos:', result);

        if (result.success) {
          console.log('✅ Setando pacotes:', result.data.length, 'pacotes');
          setApiPackages(result.data);
        } else {
          console.error('❌ API retornou success: false');
        }
      } catch (error) {
        console.error('💥 Erro no fetch:', error);
        // Let the error be visible - no masking with fallbacks
      } finally {
        console.log('🏁 Finalizando loading');
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  const handleAddToCart = (packageId: string) => {
    console.log('Adding to cart:', packageId);
    const apiPkg = apiPackages.find(p => p.id === packageId);
    console.log('Found package:', apiPkg);

    if (apiPkg && !apiPkg.disabled) {
      addItem({
        packageId,
        packageName: apiPkg.name,
        price: apiPkg.price, // API already returns price in reais
        quantity: 1,
        participantName: 'Participante', // This will be updated in checkout
      });
      console.log('Item added, opening cart...');
      // Open cart modal automatically after adding item
      openCart();
    }
  };

  return (
    <section id="pacotes" className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
            Pacotes de Escalada
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-700">
            Escolha a experiência perfeita para o seu nível. Todos os pacotes incluem equipamentos
            de segurança e instrução profissional.
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-pulse space-y-8">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 rounded-lg bg-neutral-200"></div>
                ))}
              </div>
            </div>
          </div>
        ) : apiPackages.length === 0 ? (
          <div className="text-center">
            <p className="text-neutral-600">Erro ao carregar pacotes. Verifique a conexão.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-climb-600 underline hover:text-climb-700"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {apiPackages.map(pkg => {
              return (
                <Card
                  key={pkg.id}
                  interactive={true}
                  className={`relative overflow-hidden ${
                    pkg.popular && !pkg.disabled ? 'scale-105 ring-2 ring-orange-400' : ''
                  } ${pkg.disabled ? 'opacity-90 grayscale-[0.3]' : ''}`}
                >
                  {pkg.popular && !pkg.disabled && (
                    <div className="absolute right-0 top-0 bg-orange-400 px-4 py-1 text-sm font-semibold text-white">
                      Mais Popular
                    </div>
                  )}
                  {pkg.disabled && (
                    <div className="absolute right-0 top-0 bg-gray-500 px-4 py-1 text-sm font-semibold text-white">
                      Indisponível
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center text-2xl ${
                        pkg.shape === 'hexagon'
                          ? 'clip-hexagon'
                          : pkg.shape === 'triangle'
                            ? 'clip-triangle'
                            : 'rounded-full'
                      } ${getColorClass(pkg.color)} text-white`}
                    >
                      {pkg.shape === 'hexagon' ? '🏔️' : pkg.shape === 'triangle' ? '⭐' : '👑'}
                    </div>
                    <CardTitle className="text-2xl font-bold text-climb-600">{pkg.name}</CardTitle>
                    <CardDescription className="text-lg">{pkg.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-3xl font-bold text-climb-600">
                          {formatPrice(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-lg text-neutral-500 line-through">
                            {formatPrice(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-neutral-600">
                        {pkg.duration}
                        {/* • {pkg.maxParticipants} pessoas máx. */}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="mt-1 text-climb-500">✓</span>
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                      {pkg.bonus && pkg.bonus.length > 0 && (
                        <>
                          <li className="border-t border-neutral-200 pt-2">
                            <span className="text-sm font-semibold text-orange-600">
                              🎁 BÔNUS EXCLUSIVOS:
                            </span>
                          </li>
                          {pkg.bonus.map((bonus, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="font-medium text-neutral-700">{bonus}</span>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={pkg.disabled ? 'secondary' : pkg.popular ? 'primary' : 'outline'}
                      size="lg"
                      onClick={() => {
                        if (pkg.disabled) {
                          setWaitlistPackage(pkg.name);
                        } else {
                          console.log('Button clicked for package:', pkg.id);
                          handleAddToCart(pkg.id);
                        }
                      }}
                    >
                      {pkg.disabled ? 'Entrar na Lista de Espera' : 'Adicionar ao Carrinho'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-600">Dúvidas sobre qual pacote escolher?</p>
          <Button
            variant="ghost"
            size="lg"
            onClick={() =>
              openWhatsApp(
                CONTACT_INFO.phone,
                'Olá! Gostaria de saber mais sobre os pacotes de escalada da XperienceClimb 🏔️'
              )
            }
            className="transition-colors hover:bg-climb-50 hover:text-climb-600"
          >
            📞 Fale Conosco
          </Button>
        </div>
      </div>

      <WaitlistModal
        isOpen={!!waitlistPackage}
        onClose={() => setWaitlistPackage(null)}
        packageName={waitlistPackage || ''}
      />
    </section>
  );
}
