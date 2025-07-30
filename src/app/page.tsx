import { Navigation } from '@/components/layout';
import { HeroSection, PackagesSection } from '@/components/sections';
import { CartButton } from '@/components/cart';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PackagesSection />
      <CartButton />
      
      {/* Temporary Development Status */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-climb-600 mb-6">
              🚀 Status da Migração
            </h2>
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Navegação interativa</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Seção Hero responsiva</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Pacotes de escalada</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Carrinho de compras (Zustand)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-orange-500 mr-2">🔄</span>
                  <span>Seções restantes</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">⏳</span>
                  <span>Autenticação Privy</span>
                </div>
              </div>
            </div>
            
            <div className="bg-climb-50 rounded-lg p-6 border border-climb-200">
              <h3 className="text-xl font-semibold text-climb-700 mb-2">
                ⚡ Próximos Passos
              </h3>
              <p className="text-climb-600">
                Implementação da programação, galeria, parceiros e sistema de autenticação.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 