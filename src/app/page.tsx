export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-climb-500 text-center mb-8">
          🧗‍♂️ XperienceClimb
        </h1>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-neutral-700 mb-6">
            Bem-vindo ao XperienceClimb! Estamos migrando para uma nova experiência em Next.js.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-climb-600 mb-4">
              🚀 Status da Migração
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Repositório Git configurado</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Next.js 14 configurado</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>Tailwind CSS configurado</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span>TypeScript configurado</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">🔄</span>
                <span>Componentes React em desenvolvimento</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">⏳</span>
                <span>Sistema de autenticação (Privy)</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">⏳</span>
                <span>Carrinho de compras</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">⏳</span>
                <span>Integração Mercado Pago</span>
              </div>
            </div>
          </div>
          
          <div className="bg-climb-50 rounded-lg p-6 border border-climb-200">
            <h3 className="text-xl font-semibold text-climb-700 mb-2">
              🎯 Próximos Passos
            </h3>
            <p className="text-climb-600">
              Continuamos implementando os componentes React, sistema de autenticação e carrinho de compras. 
              Em breve teremos a experiência completa!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 