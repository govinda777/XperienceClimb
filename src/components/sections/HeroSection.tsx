'use client';

import React from 'react';
import { Button, GripBlob, useParallax } from '@/components/ui';
import { openWhatsApp } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';
import { useTheme } from '@/themes/ThemeProvider';
import { MapPin, ShieldCheck, ArrowUpRight, MessageCircle, Compass } from 'lucide-react';

export function HeroSection() {
  const { currentTheme } = useTheme();
  const p = useParallax();

  const handleScrollToPackages = () => {
    const element = document.getElementById('pacotes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax calculados com movimentação fluida
  const tBg = {
    transform: `translate3d(${p.mx * -10}px, ${p.my * -8}px, 0) scale(1.06)`,
    transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
  };

  const tFgFast = {
    transform: `translate3d(${p.mx * -35}px, ${p.my * 20}px, 0)`,
    transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
  };

  const tFgSlow = {
    transform: `translate3d(${p.mx * 25}px, ${p.my * -15}px, 0)`,
    transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
  };

  // Vídeo real e local de escalada de Pedra Bela
  const videoUrl = '/images/themes/pedra-bela/XperienceClimb-03.mp4';
  const posterUrl = '/images/themes/pedra-bela/pedra-santuario-1.jpg';

  return (
    <section
      id="hero"
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e272c] via-[#13343b] to-[#1a444d] text-[#fcfcf9]"
    >
      {/* 1. VÍDEO REAL DE PEDRA BELA COM ILUMINAÇÃO NATURAL E RÚSTICA */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        style={tBg}
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: 'contrast(1.05) brightness(0.55) saturate(1.1)',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Gradiente orgânico e acolhedor (Verde Petróleo Florestal + Tom de Pôr do Sol Terroso) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,39,44,0.85) 0%, rgba(19,52,59,0.55) 40%, rgba(20,58,66,0.88) 85%, rgba(252,252,249,0.05) 100%)',
          }}
        />

        {/* Linhas topográficas sutis em tom de mata/areia */}
        <svg
          viewBox="0 0 1600 900"
          className="absolute inset-0 h-full w-full opacity-20 mix-blend-overlay"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 760 C300 700, 700 720, 1000 660 C1300 600, 1600 540, 1600 540 L1600 900 L0 900 Z"
            fill="rgba(244,162,97,0.18)"
          />
          <path
            d="M0 600 C300 540, 700 580, 1000 500 C1300 420, 1600 380, 1600 380"
            fill="none"
            stroke="rgba(244,162,97,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* 2. ILUMINAÇÃO ACONCHEGANTE (HALO DOURADO / TERRACOTA DE FIM DE TARDE) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-[10vh] left-[15vw] h-[75vw] w-[75vw] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(244,162,97,0.2), rgba(0,0,0,0) 70%)',
          }}
        />
        <div
          className="absolute bottom-10 right-[5vw] h-[55vw] w-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(33,128,141,0.25), rgba(0,0,0,0) 70%)',
          }}
        />
      </div>

      {/* 3. AGARRAS DE ESCALADA ORGÂNICAS EM TONS DE ROCHA E ARGILA */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Grip 1: Terracota Natural (Via Escola de Batismo 4°) */}
        <div
          className="pointer-events-auto absolute hidden md:block"
          style={{
            ...tFgFast,
            top: '18vh',
            right: '12vw',
            width: '92px',
            height: '92px',
          }}
        >
          <GripBlob
            fill="#e76f51"
            label="4°"
            labelColor="#ffffff"
            title="Via Escola 4° Grau - Ideal para Batismo"
            className="animate-drift"
          />
        </div>

        {/* Grip 2: Verde Musgo / Mata (Setor dos Pinheiros 5°) */}
        <div
          className="pointer-events-auto absolute hidden md:block"
          style={{
            ...tFgSlow,
            top: '32vh',
            left: '8vw',
            width: '78px',
            height: '78px',
          }}
        >
          <GripBlob
            fill="#21808d"
            label="5°"
            labelColor="#ffffff"
            title="Via 5° Grau - Evolução na Rocha"
          />
        </div>

        {/* Grip 3: Arenito / Giz de Magnésio (Setor Principal 6°a) */}
        <div
          className="pointer-events-auto absolute hidden md:block"
          style={{
            ...tFgFast,
            bottom: '22vh',
            right: '20vw',
            width: '84px',
            height: '84px',
          }}
        >
          <GripBlob
            fill="#f4e8c1"
            label="6°"
            labelColor="#13343b"
            title="Pedra do Santuário - 1.100m"
          />
        </div>
      </div>

      {/* 4. CONTEÚDO PRINCIPAL (TRÍADE EDITORIAL + TONS TERROSOS) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* TAG TÉCNICA DE EXPEDIÇÃO (RÚSTICA & PRECISA) */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-black/40 px-4 py-1.5 shadow-md backdrop-blur-md">
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-orange-300 uppercase">
              EXPEDIÇÃO
            </span>
            <span className="text-white/30">|</span>
            <span className="font-mono text-[11px] tracking-widest text-climb-200 uppercase">
              PEDRA BELA · ALT 1.100M
            </span>
          </div>

          {/* TÍTULO EDITORIAL COM TRÍADE TIPOGRÁFICA EM HARMONIA COM O SITE */}
          <h1 className="font-display max-w-5xl text-5xl font-black leading-[0.92] tracking-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-[102px]">
            <span className="block drop-shadow-sm">VIVÊNCIA DE ESCALADA</span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[88px]">
              em conexão com a{' '}
              <span className="font-serif-it font-light normal-case text-orange-400 drop-shadow-[0_0_30px_rgba(244,162,97,0.4)]">
                natureza.
              </span>
            </span>
            <span className="stroke-text-light block text-4xl sm:text-6xl md:text-7xl lg:text-[90px]">
              PEDRA BELA · SP
            </span>
          </h1>

          {/* SUBTÍTULO ACOLHEDOR */}
          <p className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-climb-100 sm:text-lg md:text-xl">
            {currentTheme.content.hero.subtitle ||
              'Viva a emoção da escalada na maior rocha do estado de SP. Instrutores certificados, equipamentos homologados UIAA/CE e segurança total para sua primeira vez.'}
          </p>

          {/* CHIPS TÉCNICOS RÚSTICOS E ACOLHEDORES */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3.5 py-2 text-climb-100 backdrop-blur-md transition-colors hover:border-orange-400/40">
              <MapPin className="h-4 w-4 text-orange-400" strokeWidth={1.5} />
              <span>{currentTheme.location.address || 'Pedra Bela - SP'}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3.5 py-2 text-climb-100 backdrop-blur-md transition-colors hover:border-orange-400/40">
              <Compass className="h-4 w-4 text-orange-400" strokeWidth={1.5} />
              <span>{currentTheme.location.distance || '1h30 da Capital'}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3.5 py-2 text-climb-100 backdrop-blur-md transition-colors hover:border-orange-400/40">
              <ShieldCheck className="h-4 w-4 text-climb-300" strokeWidth={1.5} />
              <span>Padrão UIAA / CE</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-orange-400/40 bg-orange-400/15 px-3.5 py-2 text-orange-200 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400"></span>
              </span>
              <span className="font-mono text-xs font-bold tracking-wider text-orange-200 uppercase">
                Vagas Limitadas por Turma
              </span>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO HARMONIZADOS (TERRACOTA + VERDE DA MARCA) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button
              size="xl"
              variant="accent"
              className="group w-full sm:w-auto"
              onClick={handleScrollToPackages}
            >
              <span>Quero Escalar</span>
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>

            <Button
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() =>
                openWhatsApp(
                  CONTACT_INFO.phone,
                  'Olá! Gostaria de saber mais sobre a XperienceClimb e tirar dúvidas sobre o batismo de escalada 🏔️'
                )
              }
            >
              <MessageCircle className="mr-2 h-5 w-5 text-green-400" />
              <span>Falar no WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 5. TRANSIÇÃO SUAVE E ORGÂNICA PARA A PRÓXIMA SEÇÃO */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

      {/* 6. INDICADOR DE SCROLL EDITORIAL */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-neutral-700">
        <span className="font-mono text-[9px] font-semibold tracking-[0.3em] uppercase">
          Explorar
        </span>
        <div className="h-6 w-[1px] bg-gradient-to-b from-neutral-700 via-neutral-500 to-transparent"></div>
      </div>
    </section>
  );
}
