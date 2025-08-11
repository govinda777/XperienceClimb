'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';
import { openWhatsApp } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    openWhatsApp(
      CONTACT_INFO.phone,
      'Olá! Gostaria de mais informações sobre os pacotes de escalada no Morro Araçoiaba. 🏔️'
    );
  };

  const openInstagram = () => {
    window.open(`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`, '_blank');
  };

  const sendEmail = () => {
    const subject = 'Informações sobre Escalada - XperienceClimb';
    const body =
      'Olá! Gostaria de mais informações sobre os pacotes de escalada no Morro Araçoiaba.';
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-climb-700 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">
                XPERIENCE
                <span className="text-orange-400"> CLIMB</span>
              </h3>
              <p className="text-sm leading-relaxed text-climb-200">
                Viva a experiência definitiva de escalada no coração da Mata Atlântica. Segurança,
                aventura e natureza em perfeita harmonia.
              </p>
            </div>

            {/* Logo */}
            <div className="mb-6">
              <div className="relative h-20 w-20 rounded-lg bg-white/10 p-2">
                <Image
                  src="/images/logo.png"
                  alt="XperienceClimb Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pacotes')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Pacotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('galeria')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('seguranca')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Segurança
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('localizacao')}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  Localização
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg text-orange-400">📍</span>
                <div>
                  <p className="text-sm leading-relaxed text-climb-200">
                    {CONTACT_INFO.address}
                    <br />
                    Iperó, São Paulo
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg text-orange-400">📞</span>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg text-orange-400">✉️</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-climb-200 transition-colors hover:text-white"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg text-orange-400">🚗</span>
                <span className="text-sm text-climb-200">{CONTACT_INFO.distance}</span>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Fale Conosco</h4>
            <div className="space-y-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleWhatsAppClick}
                className="w-full justify-start"
              >
                💬 WhatsApp
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={openInstagram}
                className="w-full justify-start border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                📸 Instagram
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={sendEmail}
                className="w-full justify-start border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                ✉️ E-mail
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-4 text-xl font-bold">Receba Dicas e Novidades</h3>
            <p className="mb-6 text-sm text-climb-200">
              Cadastre-se para receber dicas de escalada, promoções exclusivas e novidades sobre o
              Morro Araçoiaba.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-orange-400 focus:outline-none"
              />
              <Button variant="secondary" size="md">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-climb-200">
              © {currentYear} XperienceClimb. Todos os direitos reservados.
            </div>

            <div className="flex items-center space-x-6 text-xs text-climb-200">
              <a href="#" className="transition-colors hover:text-white">
                Política de Privacidade
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
