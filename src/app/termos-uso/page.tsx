import React from 'react';
import { Navigation } from '@/components/layout';
import { Footer } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | Xperience Climb',
  description: 'Termos e condições de uso dos serviços da Xperience Climb.',
};

export default function TermosUso() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-4xl font-bold text-climb-600 mb-8">Termos de Uso</h1>
        <div className="prose prose-lg">
          <p>
            Ao utilizar os serviços e o site da Xperience Climb, você concorda com os seguintes
            termos e condições.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p>
            A participação em nossas atividades implica na aceitação total destes termos,
            bem como na assinatura do termo de responsabilidade no dia do evento.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Condições de Participação</h2>
          <p>
            Os participantes devem estar em boas condições de saúde e seguir todas as orientações
            de segurança passadas pelos instrutores. A idade mínima pode variar conforme o pacote escolhido.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Política de Cancelamento</h2>
          <p>
            Cancelamentos devem ser comunicados com antecedência mínima de 48 horas para
            reembolso ou reagendamento, sujeitos à análise e disponibilidade.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes termos a qualquer momento, sendo sua
            responsabilidade revisá-los periodicamente.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
