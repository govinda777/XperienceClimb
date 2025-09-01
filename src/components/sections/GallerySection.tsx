'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useTheme } from '@/themes/ThemeProvider';
import { normalizeImageUrl } from '@/lib/image-utils';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: string;
  isExternal?: boolean;
  externalDomain?: string;
}

export function GallerySection() {
  const { currentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? currentTheme.gallery.images 
    : currentTheme.gallery.images.filter(img => img.category === selectedCategory);

  const handleImageError = (image: GalleryImage) => {
    console.warn(`Failed to load image: ${image.src}`);
    // Você pode implementar fallback aqui se necessário
  };

  return (
    <>
      <section id="galeria" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
              Galeria de Experiências
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
              Conheça a beleza única de {currentTheme.location.name} e veja o que te espera 
              nesta experiência inesquecível.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(currentTheme.gallery.categories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => setSelectedCategory(key)}
                  className="px-6 py-2"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={normalizeImageUrl(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(image)}
                    unoptimized={image.isExternal} // Otimização desabilitada para imagens externas
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.alt}</p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                      {currentTheme.gallery.categories[image.category] || image.category}
                    </span>
                  </div>

                  {/* External Image Indicator */}
                  {image.isExternal && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 backdrop-blur-sm text-white">
                        🌐 Externa
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
            <div className="relative">
              <Image
                src={normalizeImageUrl(selectedImage.src)}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="rounded-lg object-contain max-h-[80vh]"
                onError={() => handleImageError(selectedImage)}
                unoptimized={selectedImage.isExternal}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-lg opacity-90">{selectedImage.alt}</p>
                {selectedImage.isExternal && (
                  <p className="text-sm opacity-75 mt-2">
                    🌐 Imagem externa de {selectedImage.externalDomain || 'serviço externo'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}