import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { pedraBellaTheme, fazendaIpanemaTheme } from '@/themes/configs';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { DestinationThemeSync } from './DestinationThemeSync';
import Home from '@/app/page';

import type { ThemeConfig } from '@/themes/types';

interface Props {
  params: Promise<{ slug: string }>;
}

const THEMES: Record<string, ThemeConfig> = {
  'pedra-bela': pedraBellaTheme,
  'fazenda-ipanema': fazendaIpanemaTheme,
};

export function generateStaticParams() {
  return [{ slug: 'pedra-bela' }, { slug: 'fazenda-ipanema' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = THEMES[slug];
  if (!theme) return {};

  const destinationLabel = slug === 'pedra-bela' ? 'Pedra Bela - SP' : 'Fazenda Ipanema - SP';
  const destinationTitle = `Vivência de Escalada em ${destinationLabel}`;
  const fullDestinationTitle = `${destinationTitle} | Xperience Climb`;
  const canonicalUrl =
    slug === 'pedra-bela'
      ? 'https://climb.xperiencehubs.com'
      : `https://climb.xperiencehubs.com/destinos/${slug}`;

  return {
    title: destinationTitle,
    description: theme.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullDestinationTitle,
      description: theme.seo.description,
      url: canonicalUrl,
      images: [
        {
          url: theme.seo.ogImage || '/images/site-og.jpg',
          width: 1200,
          height: 630,
          alt: theme.seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullDestinationTitle,
      description: theme.seo.description,
      images: [theme.seo.ogImage || '/images/site-og.jpg'],
    },
  };
}

export default async function DestinoPage({ params }: Props) {
  const { slug } = await params;
  const theme = THEMES[slug];

  if (!theme) {
    redirect('/destinos/pedra-bela');
  }

  return (
    <ThemeProvider initialThemeId={slug}>
      <DestinationThemeSync slug={slug} />
      <Home />
    </ThemeProvider>
  );
}
