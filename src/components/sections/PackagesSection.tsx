'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

// Interface for API package data (includes styling information)
interface ApiPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  shape: 'hexagon' | 'triangle' | 'circle';
  color: string;
  duration: string;
  maxParticipants: number;
  popular: boolean;
}

// Helper function to get complete Tailwind classes
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    'climb-300': 'bg-climb-500',
    'orange-400': 'bg-orange-400', 
    'purple-500': 'bg-purple-500',
    'climb-500': 'bg-climb-500'
  };
  return colorMap[color] || 'bg-gray-500';
};

export function PackagesSection() {
  const { addItem, openCart } = useCartStore();
  const [apiPackages, setApiPackages] = React.useState<ApiPackage[]>([]);
  const [loading, setLoading] = React.useState(true);

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
    
    if (apiPkg) {
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

        {loading ? (
          <div className="text-center">
            <div className="animate-pulse space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-neutral-200 h-96 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        ) : apiPackages.length === 0 ? (
          <div className="text-center">
            <p className="text-neutral-600">Erro ao carregar pacotes. Verifique a conexão.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-climb-600 hover:text-climb-700 underline"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {apiPackages.map((pkg) => {
              
              return (
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
                    pkg.shape === 'hexagon' ? 'clip-hexagon' :
                    pkg.shape === 'triangle' ? 'clip-triangle' :
                    'rounded-full'
                  } ${getColorClass(pkg.color)} text-white`}>
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
                      {formatPrice(pkg.price)}
                    </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-neutral-500 line-through">
                          {formatPrice(pkg.originalPrice)}
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
                    onClick={() => {
                      console.log('Button clicked for package:', pkg.id);
                      handleAddToCart(pkg.id);
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
              );
            })}
          </div>
        )}

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