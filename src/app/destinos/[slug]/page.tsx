import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pedraBellaTheme, fazendaIpanemaTheme } from '@/themes/configs';
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

  const destinationTitle = `Vivência de Escalada em ${theme.location.name || theme.name}`;
  const fullDestinationTitle = `${destinationTitle} | Xperience Climb`;

  return {
    title: destinationTitle,
    description: theme.seo.description,
    alternates: {
      canonical: `https://climb.xperiencehubs.com/destinos/${slug}`,
    },
    openGraph: {
      title: fullDestinationTitle,
      description: theme.seo.description,
      url: `https://climb.xperiencehubs.com/destinos/${slug}`,
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
    notFound();
  }

  return (
    <>
      <DestinationThemeSync slug={slug} />
      <Home />
    </>
  );
}
