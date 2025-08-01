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
    const body = 'Olá! Gostaria de mais informações sobre os pacotes de escalada no Morro Araçoiaba.';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                XPERIENCE
                <span className="text-orange-400"> CLIMB</span>
              </h3>
              <p className="text-climb-200 text-sm leading-relaxed">
                Viva a experiência definitiva de escalada no coração da Mata Atlântica. 
                Segurança, aventura e natureza em perfeita harmonia.
              </p>
            </div>

            {/* Logo */}
            <div className="mb-6">
              <div className="relative w-20 h-20 bg-white/10 rounded-lg p-2">
                <Image
                  src="/images/logo.png"
                  alt="XperienceClimb Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                ICMBio Autorizado
              </span>
              <span className="px-2 py-1 bg-orange-400/20 text-orange-300 text-xs rounded">
                ABETA Certificado
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pacotes')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Pacotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('galeria')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('seguranca')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Segurança
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('localizacao')}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  Localização
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-orange-400 text-lg">📍</span>
                <div>
                  <p className="text-climb-200 text-sm leading-relaxed">
                    {CONTACT_INFO.address}
                    <br />
                    Iperó, São Paulo
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-orange-400 text-lg">📞</span>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-orange-400 text-lg">✉️</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-climb-200 hover:text-white transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-orange-400 text-lg">🚗</span>
                <span className="text-climb-200 text-sm">
                  {CONTACT_INFO.distance}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Fale Conosco
            </h4>
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
                className="w-full justify-start bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                📸 Instagram
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={sendEmail}
                className="w-full justify-start bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                ✉️ E-mail
              </Button>
            </div>

            {/* Operating Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h5 className="font-semibold mb-2 text-white">
                Horário de Funcionamento
              </h5>
              <div className="text-xs text-climb-200 space-y-1">
                <div className="flex justify-between">
                  <span>Seg - Sex:</span>
                  <span>8h às 17h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sáb - Dom:</span>
                  <span>7h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Feriados:</span>
                  <span>7h às 18h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">
              Receba Dicas e Novidades
            </h3>
            <p className="text-climb-200 mb-6 text-sm">
              Cadastre-se para receber dicas de escalada, promoções exclusivas 
              e novidades sobre o Morro Araçoiaba.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-orange-400"
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-climb-200 text-sm">
              © {currentYear} XperienceClimb. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-climb-200">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}