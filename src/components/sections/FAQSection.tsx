'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';
import { FAQ_DATA, type FAQItem } from '@/lib/faq-data';

export { FAQ_DATA, type FAQItem };

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
            <HelpCircle className="h-4 w-4" />
            Tire Suas Dúvidas
          </div>
          <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
            Perguntas Frequentes sobre Escalada em Pedra Bela
          </h2>
          <p className="text-lg text-neutral-700 md:text-xl">
            Respondemos de forma clara às principais dúvidas sobre o batismo de escalada, logística,
            equipamentos inclusos e segurança na montanha.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mx-auto max-w-4xl space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-orange-300 bg-white shadow-md ring-1 ring-orange-200'
                    : 'border-neutral-200 bg-white hover:border-orange-200 hover:bg-orange-50/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="pr-4 text-lg font-bold text-neutral-900 md:text-xl">
                    {item.question}
                  </h3>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-orange-500 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-neutral-100 px-6 pb-6 pt-2">
                    <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp CTA */}
        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="mb-4 text-neutral-600">
            Ainda tem alguma dúvida específica sobre a sua aventura?
          </p>
          <Button
            size="lg"
            onClick={() =>
              openWhatsApp(
                CONTACT_INFO.phone,
                'Olá! Estava lendo as dúvidas frequentes e gostaria de fazer uma pergunta sobre a escalada em Pedra Bela 🧗‍♂️'
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Falar Diretamente com a Equipe
          </Button>
        </div>
      </div>
    </section>
  );
}
