'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';

export function HeroSection() {
  const handleScrollToPackages = () => {
    const element = document.getElementById('pacotes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-climb-500 via-climb-600 to-climb-700">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-elements">
          <div className="absolute top-20 left-[10%] w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-[15%] w-16 h-16 bg-orange-400/20 clip-triangle animate-bounce-gentle"></div>
          <div className="absolute bottom-40 left-[20%] w-24 h-24 bg-white/5 clip-hexagon animate-pulse-soft"></div>
          <div className="absolute bottom-20 right-[10%] w-12 h-12 bg-orange-400/30 rounded-full animate-float"></div>
          <div className="absolute top-1/2 left-[5%] w-18 h-18 bg-white/10 clip-diamond animate-rotate-slow"></div>
        </div>
      </div>

      {/* Organic Background Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold leading-none">
              XPERIENCE
              <br />
              <span className="text-orange-400 text-5xl md:text-7xl">CLIMB</span>
            </h1>
          </div>

          {/* Hero Text */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-climb-100">
              Viva a Experiência Definitiva de Escalada
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span>{CONTACT_INFO.distance}</span>
              </div>
              <div className="flex items-center space-x-2 bg-orange-400/20 px-4 py-2 rounded-full border border-orange-400/30">
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold text-orange-100">VAGAS LIMITADAS</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="xl"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={handleScrollToPackages}
            >
              🧗‍♂️ Quero Escalar!
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-transparent clip-triangle transform -rotate-12"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-gradient-to-l from-white/10 to-transparent clip-hexagon transform rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-orange-400/30 rounded-full"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}