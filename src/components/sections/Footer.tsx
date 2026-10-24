'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';

export function Footer() {
  const { currentTheme } = useTheme();

  // Consome footerSection de pedra-bela.ts com fallback
  const footer = currentTheme?.footerSection || pedraBellaTheme.footerSection!;

  return (
    <footer
      id="footer"
      className="py-16 bg-sand-200/80 border-t border-sand-300 text-ink-600 font-mono text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Linha Superior do Footer: Logo, Links Rápidos e Atendimento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-sand-300">
          {/* COL 1: Marca & Descrição */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-terracotta-500 flex items-center justify-center text-white text-lg">
                🧗
              </div>
              <div>
                <div className="font-display font-black text-2xl tracking-wider text-ink-900 uppercase leading-none">
                  {footer.brand.name}{' '}
                  <span className="text-terracotta-500 font-serifIt italic font-light lowercase">
                    {footer.brand.accent}
                  </span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-forest-700 font-semibold mt-0.5">
                  {footer.brand.tagline}
                </div>
              </div>
            </div>
            <p className="text-xs text-ink-600 font-sans leading-relaxed mb-4">
              {footer.brand.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold">
              {footer.brand.seal}
            </div>
          </div>

          {/* COL 2: Navegação Rápida */}
          <div>
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-xs mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {footer.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-terracotta-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: Experiência */}
          <div>
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-xs mb-4">
              Experiência
            </h4>
            <ul className="space-y-2.5">
              {footer.experienceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-terracotta-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: Contato Direto */}
          <div>
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-xs mb-4">
              Contato Direto
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-ink-400 block text-[10px]">WhatsApp:</span>
                <a
                  href={footer.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-forest-700 hover:text-terracotta-500 transition-colors"
                >
                  {footer.contact.whatsappFormatted}
                </a>
              </li>
              <li>
                <span className="text-ink-400 block text-[10px]">Instagram:</span>
                <a
                  href={footer.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-500 transition-colors"
                >
                  {footer.contact.instagramHandle}
                </a>
              </li>
              <li>
                <span className="text-ink-400 block text-[10px]">E-mail:</span>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="hover:text-terracotta-500 transition-colors"
                >
                  {footer.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={footer.contact.ctaHref}
                  className="inline-block px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold transition-all shadow-sm"
                >
                  {footer.contact.ctaText}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior do Footer: Direitos e Termos Legais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-ink-500 text-[11px]">
          <div>{footer.legal.copyright}</div>
          <div className="flex items-center gap-4">
            <Link
              href={footer.legal.privacyHref}
              className="hover:text-terracotta-500 underline transition-colors"
            >
              Política de Privacidade
            </Link>
            <span>·</span>
            <Link
              href={footer.legal.termsHref}
              className="hover:text-terracotta-500 underline transition-colors"
            >
              Termos de Uso
            </Link>
            <span>·</span>
            <a
              href={footer.legal.backToTopHref}
              className="hover:text-forest-700 transition-colors font-bold"
            >
              Voltar ao Topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
