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
import { CONTACT_INFO, AVAILABLE_DATES } from '@/lib/constants';
import { WaitlistModal } from './WaitlistModal';
import {
  Calendar,
  Mountain,
  Compass,
  Sparkles,
  Check,
  Clock,
  MessageSquare,
  Gift,
} from 'lucide-react';

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

// Clean emoji prefixes from feature strings for clean outdoor typography
const cleanItemText = (text: string) => {
  return text.replace(/^[^\wÀ-ÿA-Za-z0-9]+/, '').trim();
};

// Topographic / Technical badge label
const getTechnicalBadge = (pkg: ApiPackage) => {
  if (pkg.shape === 'triangle' || pkg.id.includes('intermed') || pkg.id.includes('crux')) {
    return 'CRUX · INTERMEDIÁRIO';
  }
  if (pkg.shape === 'circle' || pkg.id.includes('avan') || pkg.id.includes('alma')) {
    return 'CUME · AVANÇADO';
  }
  return 'VIA · BATISMO';
};

// Minimalist technical icon replacing AI polygons
const renderTechnicalIcon = (pkg: ApiPackage) => {
  if (pkg.shape === 'triangle' || pkg.id.includes('intermed') || pkg.id.includes('crux')) {
    return <Compass className="h-5 w-5 text-orange-600" strokeWidth={1.5} />;
  }
  if (pkg.shape === 'circle' || pkg.id.includes('avan') || pkg.id.includes('alma')) {
    return <Sparkles className="h-5 w-5 text-amber-600" strokeWidth={1.5} />;
  }
  return <Mountain className="h-5 w-5 text-climb-600" strokeWidth={1.5} />;
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
        price: apiPkg.price,
        quantity: 1,
        participantName: 'Participante',
      });
      console.log('Item added, opening cart...');
      openCart();
    }
  };

  return (
    <section id="pacotes" className="relative bg-stone-100/70 py-24 text-stone-900">
      <div className="container mx-auto px-4">
        {/* Section Header with Editorial Outdoor Style */}
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/60 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-stone-700">
            <span>EXPEDIÇÃO & VIVÊNCIA</span>
          </div>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
            Pacotes de Escalada
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Escolha o nível da sua vivência na rocha. Todos os pacotes incluem guia certificado,
            equipamentos homologados e seguro aventura.
          </p>

          {/* Global Trip Date Banner */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50/90 px-6 py-2.5 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-orange-100/90">
              <Calendar className="h-5 w-5 text-orange-600 animate-pulse-soft" strokeWidth={1.75} />
              <span className="text-sm font-medium text-orange-900">
                Próxima Saída Confirmada:{' '}
                <strong className="font-bold underline decoration-orange-400 decoration-2 underline-offset-2">
                  {AVAILABLE_DATES.singleDateDisplay}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="text-center">
            <div className="animate-pulse space-y-8">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 rounded-2xl bg-stone-200"></div>
                ))}
              </div>
            </div>
          </div>
        ) : apiPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600">Erro ao carregar pacotes. Verifique a conexão.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-orange-600 underline hover:text-orange-700"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
            {apiPackages.map(pkg => {
              const isPopular = pkg.popular && !pkg.disabled;
              const isDisabled = pkg.disabled;

              return (
                <Card
                  key={pkg.id}
                  interactive={!isDisabled}
                  className={`relative flex flex-col rounded-3xl border bg-white p-7 transition-all duration-300 ${
                    isPopular
                      ? 'border-orange-500 shadow-xl shadow-orange-950/5 ring-1 ring-orange-500/30 md:-translate-y-2'
                      : 'border-stone-200 shadow-sm hover:border-stone-300 hover:shadow-lg'
                  } ${isDisabled ? 'opacity-65 grayscale-[30%] bg-stone-50/70' : ''}`}
                >
                  {/* Badge de Destaque Superior */}
                  {isPopular && (
                    <div className="absolute -top-3 left-6 rounded-full bg-orange-600 px-3.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-sm">
                      Mais Popular
                    </div>
                  )}

                  {/* Header com Insígnia Técnica Minimalista e Status */}
                  <CardHeader className="p-0 pb-5">
                    <div className="mb-4 flex items-center justify-between">
                      {/* Insígnia Técnica Vetorial (Substitui os polígonos genéricos) */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-800 shadow-inner">
                          {renderTechnicalIcon(pkg)}
                        </div>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-stone-500">
                          {getTechnicalBadge(pkg)}
                        </span>
                      </div>

                      {/* Badge de Indisponibilidade */}
                      {isDisabled && (
                        <span className="rounded-full border border-stone-300 bg-stone-200/80 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-stone-600">
                          Indisponível
                        </span>
                      )}
                    </div>

                    <CardTitle className="text-2xl font-bold tracking-tight text-stone-900">
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-stone-600">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col p-0">
                    {/* Bloco de Preço */}
                    <div className="my-5 border-y border-stone-100 py-4">
                      {pkg.originalPrice && (
                        <span className="block text-xs font-mono text-stone-400 line-through">
                          {formatPrice(pkg.originalPrice)}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black tracking-tight text-stone-900 font-mono">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                          / pessoa
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-stone-500">
                        <Clock className="h-3.5 w-3.5 text-stone-400" strokeWidth={1.5} />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Lista de Features com Ícones Técnicos Consistentes */}
                    <ul className="mb-6 space-y-2.5 text-sm text-stone-700 flex-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="h-3 w-3" strokeWidth={2} />
                          </span>
                          <span className="leading-snug">{cleanItemText(feature)}</span>
                        </li>
                      ))}

                      {/* Bônus Exclusivos com Divisor Limpo */}
                      {pkg.bonus && pkg.bonus.length > 0 && (
                        <li className="mt-4 border-t border-stone-200/80 pt-3">
                          <div className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-orange-700">
                            <Gift className="h-3.5 w-3.5 text-orange-600" strokeWidth={1.5} />
                            <span>BÔNUS EXCLUSIVOS:</span>
                          </div>
                          <ul className="space-y-1.5 pl-5">
                            {pkg.bonus.map((bonus, index) => (
                              <li
                                key={index}
                                className="list-disc text-xs font-medium text-stone-700"
                              >
                                {cleanItemText(bonus)}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </CardContent>

                  <CardFooter className="p-0 pt-2">
                    <Button
                      className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                        isDisabled
                          ? 'cursor-not-allowed bg-stone-200 text-stone-500 hover:bg-stone-200'
                          : isPopular
                            ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 hover:bg-orange-500'
                            : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                      size="lg"
                      onClick={() => {
                        if (isDisabled) {
                          setWaitlistPackage(pkg.name);
                        } else {
                          console.log('Button clicked for package:', pkg.id);
                          handleAddToCart(pkg.id);
                        }
                      }}
                    >
                      {isDisabled ? 'Entrar na Lista de Espera' : 'Adicionar ao Carrinho'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Suporte & Dúvidas (Fale Conosco) */}
        <div className="mt-16 text-center">
          <p className="mb-3 text-sm text-stone-600">Dúvidas sobre qual pacote escolher?</p>
          <Button
            variant="ghost"
            size="md"
            onClick={() =>
              openWhatsApp(
                CONTACT_INFO.phone,
                'Olá! Gostaria de saber mais sobre os pacotes de escalada da XperienceClimb 🏔️'
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-400"
          >
            <MessageSquare className="h-4 w-4 text-orange-600" strokeWidth={1.5} />
            <span>Fale Conosco</span>
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
