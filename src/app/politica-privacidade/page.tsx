import React from 'react';
import { Navigation } from '@/components/layout';
import { Footer } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Xperience Climb',
  description: 'Política de privacidade e tratamento de dados da Xperience Climb.',
};

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <h1 className="text-4xl font-bold text-climb-600 mb-8">Política de Privacidade</h1>
        <div className="prose prose-lg">
          <p>
            A Xperience Climb valoriza a privacidade dos seus usuários. Esta Política de Privacidade
            descreve como coletamos, usamos e protegemos as suas informações pessoais.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, como nome, email e telefone,
            quando preenche formulários em nosso site ou entra em contato conosco.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso das Informações</h2>
          <p>
            Utilizamos suas informações para processar reservas, responder a dúvidas, enviar
            atualizações sobre nossos pacotes e melhorar nossos serviços.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Proteção de Dados</h2>
          <p>
            Implementamos medidas de segurança para proteger suas informações pessoais contra
            acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Contato</h2>
          <p>
            Se tiver dúvidas sobre nossa Política de Privacidade, entre em contato através
            dos nossos canais oficiais de atendimento.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
