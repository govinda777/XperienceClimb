import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  Mountain,
  Compass,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Guia de Escalada para Iniciantes em SP',
  description:
    'Aprenda como começar na escalada em rocha natural em São Paulo. Tudo sobre batismo de escalada, equipamentos de segurança homologados UIAA, melhores locais e dicas essenciais.',
  alternates: {
    canonical: 'https://climb.xperiencehubs.com/guia-escalada-iniciantes-sp',
  },
  openGraph: {
    title: 'Guia de Escalada para Iniciantes em SP | Xperience Climb',
    description:
      'Descubra como viver sua primeira experiência de escalada em rocha natural no interior de SP com instrutores credenciados e equipamentos UIAA.',
    url: 'https://climb.xperiencehubs.com/guia-escalada-iniciantes-sp',
    images: [
      {
        url: '/images/themes/pedra-bela/pedra-santuario-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Escalador iniciante em rocha natural na Pedra do Santuário em Pedra Bela - SP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia de Escalada para Iniciantes em SP | Xperience Climb',
    description:
      'Tudo sobre batismo de escalada em rocha em SP: equipamentos, segurança, locais como Pedra Bela e Fazenda Ipanema e dicas para a 1ª subida.',
    images: ['/images/themes/pedra-bela/pedra-santuario-1.jpg'],
  },
};

export default function GuiaIniciantesPage() {
  const publishDate = '10 de outubro de 2026';
  const baseUrl = 'https://climb.xperiencehubs.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Guia Definitivo de Escalada em Rocha para Iniciantes em SP',
    description:
      'Manual prático e técnico sobre como iniciar na escalada em rocha natural no interior de São Paulo com segurança, homologação UIAA e instrução profissional.',
    image: `${baseUrl}/images/themes/pedra-bela/pedra-santuario-1.jpg`,
    datePublished: '2026-10-10T12:00:00-03:00',
    dateModified: '2026-10-10T12:00:00-03:00',
    author: {
      '@type': 'Organization',
      name: 'Xperience Climb',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xperience Climb',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/guia-escalada-iniciantes-sp`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Preciso ter experiência prévia ou força física para a primeira escalada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não! O batismo de escalada foi concebido para pessoas sem nenhuma experiência esportiva prévia. A técnica de escalada prioriza equilíbrio, leitura corporal e uso das pernas, e não força bruta nos braços.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quais equipamentos são obrigatórios e necessários para iniciantes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os equipamentos individuais de segurança incluem capacete homologado (UIAA/CE), baudrier (cadeirinha acolchoada), sapatilhas de escalada com borracha aderente e sistema de freio assistido (como Petzl GriGri) operado pelo instrutor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Onde praticar escalada em rocha para iniciantes perto de São Paulo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os dois principais campos escola no estado de SP são a Pedra do Santuário em Pedra Bela (a 119 km da capital, com vias protegidas de 15m a 35m) e a Fazenda Ipanema em Iperó/Sorocaba (com rocha em meio à Mata Atlântica).',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#13343B]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-800 group"
          >
            <img
              src="/assets/logo.svg"
              alt="Logo Xperience Climb"
              width={40}
              height={40}
              className="w-10 h-10 shrink-0 group-hover:scale-105 transition-transform duration-300 ease-out"
            />
            <span className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Voltar para a Página Inicial
            </span>
          </Link>
          <span className="font-mono text-xs text-neutral-700">Artigo Técnico • {publishDate}</span>
        </div>
      </header>

      {/* Hero Cover */}
      <section className="relative overflow-hidden bg-[#080A0E] py-16 text-white md:py-24">
        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-[#FFD700]">
            <Compass className="h-3.5 w-3.5" />
            Manual de Campo • Iniciação Outdoor
          </div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl md:text-6xl text-white">
            Guia Definitivo de{' '}
            <span className="font-serif-it normal-case text-orange-400">Escalada em Rocha</span>{' '}
            para Iniciantes em SP
          </h1>
          <p className="mt-6 max-w-2xl text-base text-neutral-300 md:text-lg leading-relaxed">
            Tudo o que você precisa saber para viver sua primeira experiência vertical na rocha
            natural: equipamentos obrigatórios, protocolos de segurança internacional e os melhores
            picos a menos de 2 horas de São Paulo.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose prose-neutral max-w-none space-y-10 leading-relaxed text-neutral-800">
          {/* Introdução */}
          <section className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-forest-700" />
              1. O que é o Batismo de Escalada em Rocha?
            </h2>
            <p className="mt-4 text-neutral-700">
              O <strong>batismo de escalada</strong> é a vivência prática guiada onde quem nunca
              teve contato com o esporte realiza suas primeiras ascensões em rocha natural sob a
              tutela direta de instrutores certificados.
            </p>
            <p className="text-neutral-700">
              Diferente de academias indoor com agarras plásticas coloridas, a escalada outdoor
              envolve a leitura de fissuras, regletes e aderência no granito real, integrando o
              praticante à paisagem montanhosa e desenvolvendo concentração plena.
            </p>
          </section>

          {/* Equipamentos */}
          <section className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-forest-700" />
              2. Equipamentos Obrigatórios e Homologação UIAA / CE
            </h2>
            <p className="mt-4 text-neutral-700">
              Na escalada esportiva moderna, a segurança não é sorte: é física e redundância de
              sistemas. Todos os equipamentos homologados pela{' '}
              <strong>UIAA (União Internacional das Associações de Alpinismo)</strong> suportam
              cargas superiores a 2.000 kgf (20 kN):
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/50">
                <h3 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Baudrier (Cadeirinha)
                </h3>
                <p className="mt-1 text-xs text-neutral-700">
                  Cadeirinha técnica acolchoada que distribui o peso pelo quadril e coxas com ponto
                  de ancoragem central.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/50">
                <h3 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Capacete de Escalada
                </h3>
                <p className="mt-1 text-xs text-neutral-700">
                  Proteção craniana contra queda de pequenos fragmentos e impactos laterais, com
                  ventilação otimizada.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/50">
                <h3 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Sapatilhas Especiais
                </h3>
                <p className="mt-1 text-xs text-neutral-700">
                  Calçado ajustado com solado de borracha de alta fricção que permite apoiar em
                  micro-saliências da rocha.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/50">
                <h3 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Freio Auto-blocante (GriGri)
                </h3>
                <p className="mt-1 text-xs text-neutral-700">
                  Sistema de segurança dinâmico que trava instantaneamente a corda em caso de
                  escorregão do escalador.
                </p>
              </div>
            </div>
          </section>

          {/* Melhores Locais em SP */}
          <section className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <Compass className="h-6 w-6 text-forest-700" />
              3. Os 2 Melhores Picos para Iniciar em São Paulo
            </h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-xl border border-neutral-200 p-6 bg-gradient-to-r from-orange-50/50 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">
                    Pedra Bela - SP (Pedra do Santuário)
                  </h3>
                  <span className="font-mono text-xs font-bold text-orange-700">119 km de SP</span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">
                  O campo escola mais clássico do estado. Paredão de granito com vias escola de 15 a
                  35 metros perfeitamente grampeadas, base ampla e sombreada, além da maior tirolesa
                  da América Latina e gastronomia caipira típica.
                </p>
                <div className="mt-4">
                  <Link
                    href="/destinos/pedra-bela"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800 underline"
                  >
                    Ver detalhes do destino Pedra Bela <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-6 bg-gradient-to-r from-emerald-50/50 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">
                    Fazenda Ipanema (Iperó / Sorocaba - SP)
                  </h3>
                  <span className="font-mono text-xs font-bold text-forest-800">120 km de SP</span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">
                  Localizada na Floresta Nacional de Ipanema (FLONA), combina história geológica,
                  patrimônio histórico e setores de escalada esportiva protegidos no coração da Mata
                  Atlântica.
                </p>
                <div className="mt-4">
                  <Link
                    href="/destinos/fazenda-ipanema"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800 underline"
                  >
                    Ver detalhes da Fazenda Ipanema <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-forest-700" />
              4. Dúvidas Frequentes de Quem Vai Pela 1ª Vez
            </h2>
            <div className="mt-6 space-y-4">
              <div className="border-b border-neutral-200 pb-4">
                <h3 className="font-semibold text-neutral-900 text-base">
                  Tenho medo de altura. Posso fazer?
                </h3>
                <p className="mt-1 text-sm text-neutral-700">
                  Sim! O medo de altura é um reflexo natural de sobrevivência. Na escalada em
                  top-rope (com a corda vindo do alto), o escalador está 100% suspenso com folga
                  zero. Você sobe no seu próprio ritmo e pode pedir para descer a qualquer momento.
                </p>
              </div>
              <div className="border-b border-neutral-200 pb-4">
                <h3 className="font-semibold text-neutral-900 text-base">
                  Qual roupa devo vestir no dia?
                </h3>
                <p className="mt-1 text-sm text-neutral-700">
                  Calça comprida flexível (como legging ou calça tática), camiseta respirável e meia
                  confortável para calçar com a sapatilha de escalada. Evite anéis e mantenha
                  cabelos compridos presos.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-base">
                  Crianças e adolescentes podem participar?
                </h3>
                <p className="mt-1 text-sm text-neutral-700">
                  Sim, a idade mínima recomendada é de 8 anos, sempre acompanhados ou com
                  autorização formal dos responsáveis legais.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <section className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500 to-[#d85b3f] p-8 text-white shadow-xl text-center md:p-12">
            <h2 className="text-2xl font-extrabold uppercase md:text-3xl text-white">
              Pronto para Viver sua Primeira Escalada em Rocha?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-orange-100">
              Nossas vivências incluem todos os equipamentos homologados, instrução individualizada,
              seguro de acidentes pessoais e almoço caipira completo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#pacotes"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-bold text-orange-600 transition-all hover:bg-neutral-100 shadow-md hover:-translate-y-0.5"
              >
                Conhecer os Pacotes e Vagas
              </Link>
              <a
                href={`https://wa.me/55${CONTACT_INFO.phone.replace(/\D/g, '')}?text=Ol%C3%A1!%20Li%20o%20Guia%20do%20Iniciante%20e%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20pr%C3%B3xima%20sa%C3%ADda!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-white/80 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20 backdrop-blur-sm"
              >
                Falar com Instrutor via WhatsApp
              </a>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
