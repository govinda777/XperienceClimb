'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import { useCartStore } from '@/store/useCartStore';
import { Calendar, MessageCircle, Check, Sparkles, Clock } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

export function PackagesSection() {
  const { currentTheme } = useTheme();
  const { addItem, openCheckout } = useCartStore();
  const { isLoggedIn, login } = useAuth();

  // Consome packagesSection de pedra-bela.ts com fallback
  const pkgSection = currentTheme?.packagesSection || pedraBellaTheme.packagesSection!;

  const handlePackageClick = (pkg: (typeof pkgSection.items)[0]) => {
    if (pkg.disabled) return;

    if (pkg.price) {
      addItem({
        packageId: pkg.id,
        packageName: `${pkg.prefix} ${pkg.name}`,
        price: pkg.price, // Valor em Reais (ex: 277), formatPrice e CreateOrder cuidam do cálculo correto
        quantity: 1,
        participantName: 'Participante',
      });
    }

    if (!isLoggedIn) {
      openCheckout();
      login();
    } else {
      openCheckout();
    }
  };

  return (
    <section id="pacotes" className="py-24 relative bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
            {pkgSection.badge}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
            {pkgSection.title}{' '}
            <span className="font-serifIt italic font-light text-sun-500 normal-case">
              {pkgSection.titleAccent}
            </span>
          </h2>
        </div>

        {/* Banner com a Próxima Data Confirmada & Botão para Solicitar Outra Data via WhatsApp */}
        {pkgSection.nextConfirmedDate && (
          <div className="mb-12 flex flex-wrap items-center gap-4">
            {/* Pílula com a Próxima Saída Confirmada */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FFF7F2] border border-[#FCD9C6] text-ink-900 shadow-xs">
              <Calendar className="w-5 h-5 text-terracotta-500 shrink-0" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-ink-900">
                {pkgSection.nextConfirmedDate.prefix}{' '}
                <strong className="font-bold underline decoration-terracotta-500 underline-offset-4 decoration-2">
                  {pkgSection.nextConfirmedDate.date}
                </strong>
              </span>
            </div>

            {/* Botão que encaminha para o WhatsApp para solicitar outra data */}
            {pkgSection.nextConfirmedDate.otherDateCta && (
              <a
                href={pkgSection.nextConfirmedDate.otherDateCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>{pkgSection.nextConfirmedDate.otherDateCta.label}</span>
                <span className="text-sm leading-none">›</span>
              </a>
            )}
          </div>
        )}

        {/* Os 3 Cards de Pacotes fiéis ao Design System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {pkgSection.items.map(pkg => {
            const isPopular = pkg.statusBadge === 'MAIS PROCURADO';
            const isDisabled = pkg.disabled;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl overflow-hidden border border-sand-200 shadow-soft flex flex-col justify-between transition-all bg-white hover:shadow-hover hover:-translate-y-1`}
              >
                <div>
                  {/* Topo Técnico do Card */}
                  <div
                    className={`p-6 relative text-white ${
                      pkg.headerColor === 'forest'
                        ? 'bg-forest-700'
                        : pkg.headerColor === 'terracotta'
                          ? 'bg-terracotta-500/90'
                          : 'bg-forest-900/95'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[11px] font-bold text-sand-200 uppercase tracking-widest">
                        {pkg.badge}
                      </span>
                      {pkg.statusBadge && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isPopular
                              ? 'bg-emerald-400 text-forest-950 font-black'
                              : 'bg-white/20 text-white'
                          }`}
                        >
                          {pkg.statusBadge}
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-xs text-sand-300">{pkg.prefix}</div>
                    <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Corpo do Card */}
                  <div className="p-6">
                    {/* Duração & Nível */}
                    <div className="flex items-center justify-between text-xs font-mono text-ink-600 pb-3 border-b border-sand-200 mb-4">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-forest-700" strokeWidth={1.5} />
                        {pkg.duration}
                      </span>
                      <span className={`font-bold ${pkg.levelColor}`}>{pkg.level}</span>
                    </div>

                    {/* Descrição */}
                    <p className="text-xs text-ink-600 leading-relaxed mb-5 min-h-[34px]">
                      {pkg.description}
                    </p>

                    {/* Bloco de Preços "De / Por" */}
                    <div className="mb-6 p-4 rounded-2xl bg-sand-50/80 border border-sand-200">
                      <div className="flex items-baseline gap-2 mb-1">
                        {pkg.originalPriceFormatted && (
                          <span className="line-through font-mono text-xs text-ink-400">
                            {pkg.originalPriceFormatted}
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase font-bold text-forest-700">
                          {isDisabled ? 'Valor Referência:' : 'Por apenas:'}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-4xl font-black text-ink-900 tracking-tight">
                          {pkg.priceFormatted}
                        </span>
                        <span className="font-mono text-xs text-ink-500">{pkg.priceUnit}</span>
                      </div>
                      {pkg.installment && (
                        <span className="font-mono text-[10px] text-forest-700 block mt-1">
                          {pkg.installment}
                        </span>
                      )}
                    </div>

                    {/* Lista de Benefícios Inclusos */}
                    {pkg.features && pkg.features.length > 0 && (
                      <div className="mb-6">
                        <span className="font-mono text-[10px] uppercase font-bold text-ink-400 tracking-wider block mb-3">
                          O que está incluso:
                        </span>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-700">
                              <Check
                                className="w-4 h-4 text-forest-600 shrink-0 mt-0.5"
                                strokeWidth={2.5}
                              />
                              <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bloco de Bônus Exclusivos */}
                    {pkg.bonus && pkg.bonus.length > 0 && (
                      <div className="mb-2 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                        <span className="font-mono text-[10px] font-bold tracking-wider text-amber-900 uppercase flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          {pkg.bonusTitle || 'BÔNUS EXCLUSIVOS:'}
                        </span>
                        {pkg.bonus.map((b, i) => (
                          <div
                            key={i}
                            className="text-xs font-semibold text-amber-950 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="p-6 pt-2">
                  {!isDisabled ? (
                    <button
                      type="button"
                      onClick={() => handlePackageClick(pkg)}
                      className="w-full py-4 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>{pkg.ctaText}</span>
                      <span>›</span>
                    </button>
                  ) : (
                    <a
                      href={pkg.ctaHref || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-ink-800 hover:text-ink-950 font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 text-forest-700" strokeWidth={1.5} />
                      <span>{pkg.ctaText}</span>
                      <span>›</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Horizontal VIP do Programa Anual com todos os benefícios */}
        {pkgSection.annualCard && (
          <div className="rounded-3xl bg-forest-900 border border-forest-800 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 font-mono text-[10px] font-bold uppercase tracking-wider text-sun-300 mb-4">
                  <span>{pkgSection.annualCard.badge}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-4 mb-3">
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    {pkgSection.annualCard.title}
                  </h3>
                  <span className="font-mono text-xs text-sun-400 font-bold">
                    ⏱ {pkgSection.annualCard.duration}
                  </span>
                </div>

                <p className="text-sand-200 text-sm leading-relaxed mb-6 max-w-2xl">
                  {pkgSection.annualCard.description}
                </p>

                {/* Grade de Benefícios do Anual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {pkgSection.annualCard.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-sand-100">
                      <Check className="w-4 h-4 text-sun-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bônus Kit VIP */}
                {pkgSection.annualCard.bonus && (
                  <div className="p-3.5 rounded-2xl bg-forest-800/80 border border-forest-700/60 max-w-xl">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-sun-300 uppercase flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-sun-400" />
                      {pkgSection.annualCard.bonusTitle || 'BÔNUS EXCLUSIVOS:'}
                    </span>
                    {pkgSection.annualCard.bonus.map((b, i) => (
                      <span key={i} className="text-xs text-white font-medium block">
                        🎁 {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA do Anual */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-forest-800/60 border border-forest-700/50">
                <span className="font-mono text-[11px] text-sand-300 uppercase tracking-widest font-bold mb-2">
                  Passaporte Exclusivo
                </span>
                <span className="font-display text-2xl font-black text-sun-300 mb-4">
                  12 VAGAS / ANO
                </span>
                <a
                  href={pkgSection.annualCard.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-sun-500 hover:bg-sun-600 text-forest-950 font-mono text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  <span>{pkgSection.annualCard.ctaText}</span>
                  <span>›</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
