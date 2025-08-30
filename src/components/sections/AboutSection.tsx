'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
// import { Button } from '@/components/ui';

export function AboutSection() {
  const { currentTheme } = useTheme();
  
  return (
    <section id="sobre" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-climb-600 md:text-5xl">
                {currentTheme.content.about.title.split(' ').slice(0, -2).join(' ')}
                <span className="text-orange-400"> {currentTheme.content.about.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
              <p className="text-xl leading-relaxed text-neutral-700">
                {currentTheme.content.about.description}
              </p>
            </div>

            <div className="space-y-4">
              {currentTheme.content.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl text-white ${
                    index === 0 ? 'bg-climb-500' : 
                    index === 1 ? 'bg-orange-400' : 
                    'bg-purple-500'
                  }`}>
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-climb-600">
                      {highlight.title}
                    </h3>
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
                src={currentTheme.gallery.images.find(img => img.category === 'nature')?.src || currentTheme.gallery.images[0].src}
                alt={currentTheme.gallery.images.find(img => img.category === 'nature')?.alt || currentTheme.gallery.images[0].alt}
                width={600}
                height={400}
                className="h-[400px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">📍 {currentTheme.location.address}</p>
                <p className="text-xs opacity-90">{currentTheme.location.city}, {currentTheme.location.state}</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-climb-600">50+</div>
                  <div className="text-sm text-neutral-600">Vias Diferentes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">600M</div>
                  <div className="text-sm text-neutral-600">Anos de História</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 rounded-2xl bg-orange-400 p-4 text-center text-white shadow-lg">
              <div className="text-xl font-bold">{currentTheme.location.distance.split(' ')[0]}</div>
              <div className="text-xs">de São Paulo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
