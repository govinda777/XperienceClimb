'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { normalizeImageUrl } from '@/lib/image-utils';

export function AboutSection() {
  const { currentTheme } = useTheme();

  // Encontra, pela ordem: imagem específica configurada, imagem de natureza ou primeira imagem da galeria
  const natureImage = {
    src: currentTheme.content.about.image || currentTheme.gallery.images.find(img => img.category === 'nature')?.src || currentTheme.gallery.images[0]?.src,
    alt: currentTheme.content.about.image ? 'Destaque da localização' : (currentTheme.gallery.images.find(img => img.category === 'nature')?.alt || currentTheme.gallery.images[0]?.alt),
    isExternal: !currentTheme.content.about.image && (currentTheme.gallery.images.find(img => img.category === 'nature')?.isExternal || currentTheme.gallery.images[0]?.isExternal)
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
                    <h4 className="text-lg font-semibold text-climb-600 mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-neutral-700">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <div className="mb-3 flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h4 className="text-lg font-semibold text-climb-600">
                  {currentTheme.content.about.infoBox.title}
                </h4>
              </div>
              <p className="text-neutral-700">
                {currentTheme.content.about.infoBox.content}
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={normalizeImageUrl(natureImage?.src || '')}
                alt={natureImage?.alt || 'Imagem da localização'}
                width={600}
                height={400}
                className="h-[400px] w-full object-cover"
                unoptimized={natureImage?.isExternal}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">📍 {currentTheme.location.address}</p>
                <p className="text-xs opacity-90">{currentTheme.location.city}, {currentTheme.location.state}</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-climb-600">120km</div>
                  <div className="text-sm text-neutral-600">de São Paulo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-climb-600">600M</div>
                  <div className="text-sm text-neutral-600">anos de história</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
