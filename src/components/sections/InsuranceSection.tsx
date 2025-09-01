'use client';

import React from 'react';

export function InsuranceSection() {
  
  return (
    <section id="seguro" className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
            🛡️ Seguro Incluso em Todas as Aventuras
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-700">
            Sua segurança é nossa prioridade. Todas as nossas experiências incluem seguro completo de acidentes pessoais.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Insurance Coverage */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-climb-600">
                    Cobertura Completa
                  </h3>
                  <p className="text-neutral-600">
                    Seguro de acidentes pessoais incluído
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-green-500">✓</span>
                  <div>
                    <h4 className="font-semibold text-climb-600">Acidentes Pessoais</h4>
                    <p className="text-sm text-neutral-600">
                      Cobertura em caso de acidentes durante a atividade
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-green-500">✓</span>
                  <div>
                    <h4 className="font-semibold text-climb-600">Despesas Médicas</h4>
                    <p className="text-sm text-neutral-600">
                      Reembolso de despesas médicas e hospitalares
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-green-500">✓</span>
                  <div>
                    <h4 className="font-semibold text-climb-600">Despesas Odontológicas</h4>
                    <p className="text-sm text-neutral-600">
                      Cobertura para tratamentos odontológicos emergenciais
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-green-500">✓</span>
                  <div>
                    <h4 className="font-semibold text-climb-600">Resgate e Socorro</h4>
                    <p className="text-sm text-neutral-600">
                      Serviços de resgate e primeiros socorros
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-green-500">✓</span>
                  <div>
                    <h4 className="font-semibold text-climb-600">Cobertura Nacional</h4>
                    <p className="text-sm text-neutral-600">
                      Válido em todo o território brasileiro
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Details */}
            <div className="rounded-2xl bg-climb-500 p-8 text-white">
              <div className="mb-4 flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h3 className="text-xl font-bold">Informações Importantes</h3>
              </div>
              <ul className="space-y-2 text-climb-100">
                <li>• Seguro ativo durante toda a duração da atividade</li>
                <li>• Cobertura automática para todos os participantes</li>
                <li>• Não requer cadastro adicional</li>
                <li>• Documentação disponível mediante solicitação</li>
              </ul>
            </div>
          </div>

          {/* Insurance Benefits */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                  🚑
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-climb-600">
                    Benefícios do Seguro
                  </h3>
                  <p className="text-neutral-600">
                    Tranquilidade para sua aventura
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-800">Tranquilidade Total</h4>
                  <p className="text-sm text-blue-700">
                    Aproveite sua aventura com a certeza de estar protegido em qualquer situação.
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-green-800">Sem Custos Extras</h4>
                  <p className="text-sm text-green-700">
                    O seguro está incluído no valor da experiência, sem taxas adicionais.
                  </p>
                </div>

                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">Suporte 24h</h4>
                  <p className="text-sm text-orange-700">
                    Equipe de emergência disponível 24 horas por dia durante a atividade.
                  </p>
                </div>
              </div>
            </div>

            {/* More Information Link */}
            <div className="rounded-2xl bg-gradient-to-r from-climb-500 to-climb-600 p-8 text-white">
              <div className="mb-4 flex items-center space-x-3">
                <span className="text-2xl">ℹ️</span>
                <h3 className="text-xl font-bold">Precisa de Mais Informações?</h3>
              </div>
              <p className="mb-6 text-climb-100">
                Para mais detalhes sobre cobertura, sinistros e procedimentos de socorro, 
                entre em contato conosco.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre o seguro das aventuras."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 rounded-lg bg-white px-6 py-3 text-climb-600 transition-all duration-300 hover:bg-climb-50 hover:shadow-lg"
                >
                  <span>📞</span>
                  <span className="font-semibold">Falar com Especialista</span>
                </a>
                <div className="text-sm text-climb-100">
                  <p>📧 Email: seguro@xperienceclimb.com</p>
                  <p>📱 WhatsApp: +55 11 99999-9999</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Certificate */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                🏆
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-climb-600">
              Certificado de Seguro
            </h3>
            <p className="mb-6 text-neutral-600">
              Nossa empresa possui certificação completa para operação de turismo de aventura 
              com seguro obrigatório conforme legislação brasileira.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                🏛️ Autorização ICMBio
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                🛡️ Seguro Obrigatório
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                📋 Certificação ABETA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
