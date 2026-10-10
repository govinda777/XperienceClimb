'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from '@/themes/ThemeProvider';
import { normalizeImageUrl } from '@/lib/image-utils';
import { Play, X, Camera } from 'lucide-react';

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
  isVideo?: boolean;
}

export function GallerySection() {
  const { currentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? currentTheme.gallery.images
      : currentTheme.gallery.images.filter(img => img.category === selectedCategory);

  const handleImageError = (image: GalleryImage) => {
    const imgSrc = typeof image.src === 'string' ? image.src : 'Local Image';
    console.warn(`Failed to load image: ${imgSrc}`);
  };

  return (
    <>
      <section id="galeria" className="py-24 bg-stone-100/60 text-stone-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200/60 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-stone-700">
              <Camera className="h-3.5 w-3.5 text-stone-600" strokeWidth={1.5} />
              <span>REGISTROS VISUAIS</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
              Galeria de Experiências
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10">
              Conheça a imponência de {currentTheme.location.name} e a atmosfera das nossas saídas
              na rocha.
            </p>

            {/* Functional Pill Filters */}
            <div className="flex flex-wrap justify-center gap-2.5">
              {Object.entries(currentTheme.gallery.categories).map(([key, label]) => {
                const isActive = selectedCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-md shadow-stone-900/20'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Photography Grid - Breathable and Uncluttered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={`gallery-img-${index}`}
                className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-200 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative">
                  {image.isVideo ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <video
                        src={typeof image.src === 'string' ? image.src : ''}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        preload="none"
                        muted
                        loop
                        playsInline
                        onMouseOver={e => e.currentTarget.play()}
                        onMouseOut={e => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white transition-transform duration-300 group-hover:scale-110">
                          <Play
                            className="h-6 w-6 fill-current text-white ml-0.5"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={normalizeImageUrl(image.src)}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => handleImageError(image)}
                      unoptimized={image.isExternal}
                      placeholder={typeof image.src !== 'string' ? 'blur' : undefined}
                    />
                  )}

                  {/* Subtle Gradient & Hover Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {currentTheme.gallery.categories[image.category] || image.category}
                    </span>
                    <h3 className="text-lg font-bold leading-tight drop-shadow-sm">
                      {image.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-200 line-clamp-1 opacity-90">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
              {selectedImage.isVideo ? (
                <video
                  src={typeof selectedImage.src === 'string' ? selectedImage.src : ''}
                  className="max-h-[80vh] w-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <div className="relative h-[75vh] w-full">
                  <Image
                    src={normalizeImageUrl(selectedImage.src)}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    onError={() => handleImageError(selectedImage)}
                    unoptimized={selectedImage.isExternal}
                    placeholder={typeof selectedImage.src !== 'string' ? 'blur' : undefined}
                  />
                </div>
              )}

              <div className="p-6 bg-stone-900/90 text-white backdrop-blur-md border-t border-white/10">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {currentTheme.gallery.categories[selectedImage.category] ||
                    selectedImage.category}
                </span>
                <h3 className="text-xl font-bold tracking-tight">{selectedImage.title}</h3>
                <p className="text-sm text-stone-300 mt-1">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
