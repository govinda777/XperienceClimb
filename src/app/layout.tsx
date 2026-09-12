import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PrivyProvider } from '@/components/providers/PrivyProvider';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { ThemeStyleProvider } from '@/themes/components/ThemeStyleProvider';
import { ConsoleFilter } from '@/components/providers/ConsoleFilter';
import { AppAuthProvider } from '@/hooks/useAuth';
import '../styles/globals.css';

import CookieBanner from '@/components/analytics/CookieBanner';
import GoogleScripts from '@/components/analytics/GoogleScripts';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://climb.xperiencehubs.com'),
  title: 'Xperience Climb | Batismo e Escalada em Rocha em Pedra Bela - SP',
  description:
    'Viva o batismo de escalada em rocha natural em Pedra Bela - SP. Instrutores certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso. Reserve já!',
  keywords:
    'escalada em pedra bela, batismo de escalada sp, curso de escalada em rocha sp, turismo de aventura sp, pedra bela tirolesa e escalada, ecoturismo pedra bela, escalada esportiva são paulo',
  authors: [{ name: 'climb.xperiencehubs.com' }],
  alternates: {
    canonical: 'https://climb.xperiencehubs.com',
  },
  openGraph: {
    title: 'Xperience Climb | Batismo e Escalada em Rocha em Pedra Bela - SP',
    description:
      'Viva o batismo de escalada em rocha natural em Pedra Bela - SP. Instrutores certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso.',
    url: 'https://climb.xperiencehubs.com',
    siteName: 'Xperience Climb',
    locale: 'pt_BR',
    images: [
      {
        url: '/images/site.png',
        width: 1200,
        height: 630,
        alt: 'Xperience Climb Escalada em Rocha em Pedra Bela SP',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xperience Climb | Batismo e Escalada em Rocha em Pedra Bela - SP',
    description:
      'Viva o batismo de escalada em rocha natural em Pedra Bela - SP. Instrutores certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso.',
    images: ['/images/site.png'],
  },
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
        <FloatingChatButton />
      </body>
    </html>
  );
}
