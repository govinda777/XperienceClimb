import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { PrivyProvider } from '@/components/providers/PrivyProvider';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { ThemeStyleProvider } from '@/themes/components/ThemeStyleProvider';
import { ConsoleFilter } from '@/components/providers/ConsoleFilter';
import { AppAuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';

import CookieBanner from '@/components/analytics/CookieBanner';
import GoogleScripts from '@/components/analytics/GoogleScripts';
// import FloatingChatButton from '@/components/chat/FloatingChatButton';
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://climb.xperiencehubs.com'),
  title: {
    default: 'Vivência de Escalada em Rocha | Xperience Climb',
    template: '%s | Xperience Climb',
  },
  description:
    'Vivências de escalada em rocha e ecoturismo de aventura no interior de SP. Guias certificados, equipamentos homologados UIAA/CE, seguro e almoço incluso.',
  keywords:
    'escalada em pedra bela, vivencia de escalada sp, curso de escalada em rocha sp, turismo de aventura sp, pedra bela tirolesa e escalada, ecoturismo pedra bela, escalada esportiva são paulo, escalada fazenda ipanema',
  authors: [{ name: 'Xperience Climb', url: 'https://climb.xperiencehubs.com' }],
  creator: 'Xperience Climb',
  publisher: 'Xperience Climb',
  alternates: {
    canonical: 'https://climb.xperiencehubs.com',
  },
  openGraph: {
    title: 'Vivência de Escalada em Rocha | Xperience Climb',
    description:
      'Vivências de escalada em rocha e ecoturismo de aventura no interior de SP. Guias certificados, equipamentos homologados UIAA/CE, seguro e almoço incluso.',
    url: 'https://climb.xperiencehubs.com',
    siteName: 'Xperience Climb',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/site-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Climb - Vivência de Escalada em Rocha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivência de Escalada em Rocha | Xperience Climb',
    description:
      'Vivências de escalada em rocha e ecoturismo de aventura no interior de SP. Guias certificados, equipamentos homologados UIAA/CE, seguro e almoço incluso.',
    images: ['/images/site-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1116',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} bg-white`}>
        <ConsoleFilter />
        <GoogleScripts />
        <ThemeProvider>
          <ThemeStyleProvider>
            <PrivyProvider>
              <AppAuthProvider>{children}</AppAuthProvider>
            </PrivyProvider>
          </ThemeStyleProvider>
        </ThemeProvider>
        <CookieBanner />
        {/* <FloatingChatButton /> */}
      </body>
    </html>
  );
}
