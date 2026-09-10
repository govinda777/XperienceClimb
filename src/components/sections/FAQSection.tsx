'use client';

import React, { useState } from 'react';

const faqData = [
  {
    question: 'Preciso ter experiência prévia para fazer o batismo de escalada?',
    answer: 'Não! O batismo de escalada é desenhado exatamente para iniciantes. Nossos instrutores certificados acompanharão você em todos os momentos, e nós fornecemos todos os equipamentos de segurança necessários.'
  },
  {
    question: 'O que levar para o dia de escalada em Pedra Bela?',
    answer: 'Recomendamos roupas leves e confortáveis (que permitam amplitude de movimento), tênis esportivo, protetor solar, repelente, óculos de sol, boné e garrafa de água.'
  },
  {
    question: 'Como funciona o transporte para a Pedra Bela?',
    answer: 'Depende do pacote escolhido. O Pacote Anual, por exemplo, inclui transporte. Nos demais pacotes, o encontro é diretamente no ponto de encontro em Pedra Bela, mas podemos organizar caronas na comunidade.'
  },
  {
    question: 'Há limite de idade para participar?',
    answer: 'Geralmente a idade mínima é de 12 anos acompanhado dos responsáveis para os pacotes básicos, mas recomendamos verificar a indicação de cada pacote específico na hora da reserva.'
  },
  {
    question: 'Em caso de chuva, a escalada acontece?',
    answer: 'A segurança é nossa prioridade. Em caso de chuva forte ou condições climáticas adversas, a atividade é reagendada para garantir a melhor e mais segura experiência.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-neutral-600">
            Tire suas dúvidas e prepare-se para a aventura.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4 border border-neutral-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 bg-neutral-50 hover:bg-neutral-100 flex justify-between items-center focus:outline-none transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-neutral-800">{faq.question}</h3>
                <span className="text-climb-600 font-bold text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-neutral-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
