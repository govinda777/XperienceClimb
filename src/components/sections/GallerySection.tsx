'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: 'climb' | 'nature' | 'equipment';
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/climb.png',
    alt: 'Escalador nas rochas do Morro Araçoiaba',
    title: 'Escalada Técnica',
    category: 'climb'
  },
  {
    src: '/images/climb-2.jpg',
    alt: 'Vista panorâmica durante a escalada',
    title: 'Vista Panorâmica',
    category: 'climb'
  },
  {
    src: '/images/flona.jpg',
    alt: 'Floresta Nacional de Ipanema',
    title: 'Mata Atlântica Preservada',
    category: 'nature'
  },
  {
    src: '/images/flona-2.jpg',
    alt: 'Trilhas da Floresta Nacional',
    title: 'Trilhas Ecológicas',
    category: 'nature'
  },
  {
    src: '/images/setor-map.jpg',
    alt: 'Mapa dos setores de escalada',
    title: 'Setores de Escalada',
    category: 'equipment'
  }
];

const categories = {
  all: 'Todas',
  climb: 'Escalada',
  nature: 'Natureza',
  equipment: 'Equipamentos'
};

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <section id="galeria" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
              Galeria de Experiências
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
              Conheça a beleza única do Morro Araçoiaba e veja o que te espera 
              nesta experiência inesquecível de escalada.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(categories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => setSelectedCategory(key as keyof typeof categories)}
                  className="px-6 py-2"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.alt}</p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      image.category === 'climb' ? 'bg-climb-500 text-white' :
                      image.category === 'nature' ? 'bg-green-500 text-white' :
                      'bg-orange-400 text-white'
                    }`}>
                      {categories[image.category]}
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🔍</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-climb-500 text-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para Viver Essa Experiência?
              </h3>
              <p className="mb-6 opacity-90">
                Junte-se a centenas de aventureiros que já descobriram 
                a magia da escalada no Morro Araçoiaba.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('pacotes');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver Pacotes Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="object-contain max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
              <p className="text-sm opacity-90">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}