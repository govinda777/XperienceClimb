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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://climb.xperiencehubs.com'),
  title: 'Xperience Climb | Escalada Pedra Bela',
  description:
    'Descubra a liberdade de escalar em rocha natural. Experiências guiadas exclusivas de escalada e aventura em Pedra Bela.',
  keywords: 'escalada, climbing, aventura, são paulo, pedra bela, escalada em rocha',
  authors: [{ name: 'climb.xperiencehubs.com' }],
  openGraph: {
    title: 'Xperience Climb | Escalada em Rocha e Aventuras Naturais',
    description:
      'Viva uma experiência única de escalada e superação ao ar livre. Condições exclusivas, instrutores certificados e equipamentos premium 100% inclusos.',
    images: [
      {
        url: '/images/site-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Xperience Climb Escalada em Rocha',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xperience Climb | Escalada em Rocha e Aventuras Naturais',
    description:
      'Viva uma experiência única de escalada e superação ao ar livre. Condições exclusivas, instrutores certificados e equipamentos premium 100% inclusos.',
    images: ['/images/site-og.jpg'],
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
