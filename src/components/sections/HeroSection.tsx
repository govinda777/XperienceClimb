'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';
import { useTheme } from '@/themes/ThemeProvider';

export function HeroSection() {
  const { currentTheme } = useTheme();
  
  const handleScrollToPackages = () => {
    const element = document.getElementById('pacotes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-climb-500 via-climb-600 to-climb-700"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-elements">
          <div className="absolute left-[10%] top-20 h-20 w-20 animate-float rounded-full bg-white/10"></div>
          <div className="absolute right-[15%] top-40 h-16 w-16 animate-bounce-gentle bg-orange-400/20 clip-triangle"></div>
          <div className="absolute bottom-40 left-[20%] h-24 w-24 animate-pulse-soft bg-white/5 clip-hexagon"></div>
          <div className="absolute bottom-20 right-[10%] h-12 w-12 animate-float rounded-full bg-orange-400/30"></div>
          <div className="absolute left-[5%] top-1/2 h-18 w-18 animate-rotate-slow bg-white/10 clip-diamond"></div>
        </div>
      </div>

      {/* Organic Background Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl font-bold leading-none md:text-8xl">
              {currentTheme.content.hero.title.split(' ')[0]}
              <br />
              <span className="text-5xl text-orange-400 md:text-7xl">
                {currentTheme.content.hero.title.split(' ')[1]}
              </span>
            </h1>
          </div>

          {/* Hero Text */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="mb-8 text-2xl font-semibold text-climb-100 md:text-3xl">
              {currentTheme.content.hero.subtitle}
            </h2>

            <div className="flex flex-col items-center justify-center space-y-4 text-lg md:flex-row md:space-x-8 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <span>{currentTheme.location.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span>{currentTheme.location.distance}</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full border border-orange-400/30 bg-orange-400/20 px-4 py-2">
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold text-orange-100">VAGAS LIMITADAS</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex animate-slide-up flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              size="xl"
              className="transform bg-orange-400 px-8 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-500"
              onClick={handleScrollToPackages}
            >
              🧗‍♂️ Quero Escalar!
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="transform border-white/30 px-6 py-3 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
              onClick={() =>
                openWhatsApp(
                  CONTACT_INFO.phone,
                  'Olá! Gostaria de saber mais sobre a XperienceClimb e os pacotes de escalada 🏔️'
                )
              }
            >
              💬 Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-32 w-32 -rotate-12 transform bg-gradient-to-r from-orange-400/20 to-transparent clip-triangle"></div>
        <div className="absolute bottom-1/4 right-0 h-40 w-40 rotate-45 transform bg-gradient-to-l from-white/10 to-transparent clip-hexagon"></div>
        <div className="absolute right-1/4 top-1/2 h-20 w-20 rounded-full bg-orange-400/30"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/50"></div>
        </div>
      </div>
    </section>
  );
}
