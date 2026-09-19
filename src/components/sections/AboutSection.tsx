'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { normalizeImageUrl } from '@/lib/image-utils';
import { MapPin } from 'lucide-react';

export function AboutSection() {
  const { currentTheme } = useTheme();

  // Encontra, pela ordem: imagem específica configurada, imagem de natureza ou primeira imagem da galeria
  const natureImage = {
    src:
      currentTheme.content.about.image ||
      currentTheme.gallery.images.find(img => img.category === 'nature')?.src ||
      currentTheme.gallery.images[0]?.src,
    alt: currentTheme.content.about.image
      ? 'Destaque da localização'
      : currentTheme.gallery.images.find(img => img.category === 'nature')?.alt ||
        currentTheme.gallery.images[0]?.alt,
    isExternal:
      !currentTheme.content.about.image &&
      (currentTheme.gallery.images.find(img => img.category === 'nature')?.isExternal ||
        currentTheme.gallery.images[0]?.isExternal),
  };

  const stats =
    currentTheme.id === 'fazenda-ipanema'
      ? {
          stat1: { value: '960m', label: 'Morro Araçoiaba' },
          stat2: { value: '120km', label: 'de São Paulo (~1h30)' },
        }
      : {
          stat1: { value: '1.120m', label: 'Altitude no Cume' },
          stat2: { value: '120km', label: 'de São Paulo (~1h45)' },
        };

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
                {currentTheme.content.about.title}
              </h2>
              <p className="text-xl text-neutral-700 leading-relaxed">
                {currentTheme.content.about.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-6 mb-8">
              {currentTheme.content.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-climb-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{highlight.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-climb-600 mb-2">{highlight.title}</h3>
                    <p className="text-neutral-700">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <div className="mb-3 flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h3 className="text-lg font-semibold text-climb-600">
                  {currentTheme.content.about.infoBox.title}
                </h3>
              </div>
              <p className="text-neutral-700">{currentTheme.content.about.infoBox.content}</p>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[400px] w-full">
              <Image
                src={normalizeImageUrl(natureImage?.src || '')}
                alt={natureImage?.alt || 'Imagem da localização'}
                fill
                className="object-cover"
                unoptimized={natureImage?.isExternal}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

              {/* Tag de Localização no topo (evita colisão com o card inferior) */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 shadow-md backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-orange-400" />
                <span className="font-mono text-xs font-semibold text-white">
                  {currentTheme.location.city}, {currentTheme.location.state}
                </span>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl border border-neutral-200/80 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:-bottom-8 sm:-left-8 sm:p-6">
              <div className="grid grid-cols-2 gap-6 divide-x divide-neutral-200">
                <div className="text-center pr-3">
                  <div className="font-display text-2xl font-bold tracking-tight text-climb-600 sm:text-3xl">
                    {stats.stat1.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-neutral-600 sm:text-sm">
                    {stats.stat1.label}
                  </div>
                </div>
                <div className="text-center pl-3">
                  <div className="font-display text-2xl font-bold tracking-tight text-orange-600 sm:text-3xl">
                    {stats.stat2.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-neutral-600 sm:text-sm">
                    {stats.stat2.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
