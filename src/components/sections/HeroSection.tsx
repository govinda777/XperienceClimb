'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';
import { useTheme } from '@/themes/ThemeProvider';

interface HeroSectionProps {
  cmsData?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    address?: string;
    distance?: string;
  };
}

export function HeroSection({ cmsData }: HeroSectionProps) {
  const { currentTheme } = useTheme();

  const handleScrollToPackages = () => {
    const element = document.getElementById('pacotes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const title = cmsData?.title ?? currentTheme.content.hero.title;
  const subtitle = cmsData?.subtitle ?? currentTheme.content.hero.subtitle;
  const backgroundImage = cmsData?.backgroundImage ?? currentTheme.seo.ogImage;
  const address = cmsData?.address ?? currentTheme.location.name;
  const distance = cmsData?.distance ?? currentTheme.location.distance;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-neutral-900"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-5xl font-bold md:text-7xl leading-tight text-white mb-4">
              {title}
            </h1>
          </div>

          {/* Hero Text */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="mb-8 text-2xl font-semibold text-climb-100 md:text-3xl">{subtitle}</h2>

            <div className="flex flex-col items-center justify-center space-y-4 text-lg md:flex-row md:space-x-8 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span>{distance}</span>
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
              Quero Escalar!
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="transform border-white/30 px-6 py-3 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
              onClick={() =>
                openWhatsApp(
                  CONTACT_INFO.phone,
                  'Olá! Gostaria de saber mais sobre a XperienceClimb e os pacotes de escalada 🏔'
                )
              }
            >
              💬 Falar no WhatsApp
            </Button>
          </div>
        </div>
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
