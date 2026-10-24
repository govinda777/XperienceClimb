'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { useTheme } from '@/themes/ThemeProvider';
import { pedraBellaTheme } from '@/themes/configs/pedra-bela';
import { GalleryImageConfig } from '@/themes/types';

export function GallerySection() {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImageConfig | null>(null);

  // Consome gallerySection de pedra-bela.ts com fallback
  const gallery = currentTheme?.gallerySection || pedraBellaTheme.gallerySection!;
  const categories = gallery.categories || [
    { id: 'all', label: 'Todas' },
    { id: 'escalada', label: 'Escalada' },
    { id: 'grupo', label: 'Grupo & Base' },
    { id: 'paisagem', label: 'Cume & Paisagem' },
    { id: 'videos', label: 'Vídeos' },
  ];

  // Fecha modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const getTagColorClass = (color?: 'forest' | 'terracotta' | 'sun') => {
    switch (color) {
      case 'forest':
        return 'bg-forest-700 text-white';
      case 'terracotta':
        return 'bg-terracotta-500 text-white';
      case 'sun':
        return 'bg-sun-500 text-ink-900';
      default:
        return 'bg-forest-700 text-white';
    }
  };

  const filteredImages =
    activeTab === 'all'
      ? gallery.images
      : activeTab === 'videos'
        ? []
        : gallery.images.filter(img => img.category === activeTab);

  const showVideos = activeTab === 'all' || activeTab === 'videos';

  return (
    <section id="galeria" className="py-24 relative bg-sand-100/60 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest-700 font-bold mb-2">
              <span>{gallery.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-ink-900">
              {gallery.title}{' '}
              <span className="font-serifIt italic font-light text-terracotta-500 normal-case">
                {gallery.titleAccent}
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-600 max-w-sm leading-relaxed">
            {gallery.subtitle}
          </p>
        </div>

        {/* Abas de Categorias Interativas */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map(cat => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-md shadow-forest-900/20'
                    : 'bg-white/80 border border-sand-200 text-ink-600 hover:bg-white hover:text-ink-900 hover:border-sand-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid Editorial com Fotos Reais Inéditas */}
        {filteredImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredImages.map((photo, index) => (
              <div
                key={photo.src + index}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-3xl overflow-hidden shadow-soft border border-sand-200 bg-white h-72 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  unoptimized={photo.isExternal}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none"></div>

                {/* Ícone de Zoom no hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
                  <ZoomIn className="w-4 h-4" strokeWidth={1.5} />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1.5 ${getTagColorClass(
                      photo.tagColor
                    )}`}
                  >
                    {photo.tag}
                  </span>
                  <h4 className="font-bold text-sm text-white drop-shadow-sm leading-snug">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bloco de Vídeos Reais de Pedra Bela */}
        {showVideos && gallery.videos.length > 0 && (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-forest-700 font-bold">
                Gravações em Campo
              </span>
              <div className="h-px bg-sand-200 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gallery.videos.map((vid, vIdx) => (
                <div
                  key={vIdx}
                  className="bg-white p-5 rounded-3xl shadow-soft border border-sand-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-4">
                    <video controls preload="metadata" className="w-full h-full object-cover">
                      <source src={vid.src} type="video/mp4" />
                      Seu navegador não suporta a tag de vídeo.
                    </video>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          vid.tagColor === 'forest' ? 'text-forest-700' : 'text-terracotta-500'
                        }`}
                      >
                        {vid.tag}
                      </span>
                      <h4 className="font-bold text-ink-900 text-sm mt-0.5">{vid.title}</h4>
                    </div>
                    <span className="text-xl">{vid.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal para Visualização em Tela Cheia */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/90 transition-all focus:outline-none"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Imagem Ampliada */}
            <div className="relative w-full h-[65vh] bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                unoptimized={selectedPhoto.isExternal}
                className="object-contain"
                priority
              />
            </div>

            {/* Informações da Imagem */}
            <div className="p-6 bg-forest-900 text-white border-t border-forest-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1.5 ${getTagColorClass(
                    selectedPhoto.tagColor
                  )}`}
                >
                  {selectedPhoto.tag}
                </span>
                <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
                <p className="text-xs text-stone-300 mt-1 max-w-2xl">{selectedPhoto.alt}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider transition-all self-start sm:self-auto"
              >
                Voltar à galeria
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
