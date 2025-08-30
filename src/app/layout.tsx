import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PrivyProvider } from '@/components/providers/PrivyProvider'
import { ThemeProvider } from '@/themes/ThemeProvider'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://xperienceclimb.vercel.app'),
  title: 'XperienceClimb - Escalada no Morro Araçoiaba',
  description: 'Experiências únicas de escalada na Floresta Nacional de Ipanema',
  keywords: 'escalada, climbing, aventura, morro araçoiaba, ipanema, são paulo',
  authors: [{ name: 'XperienceClimb' }],
  openGraph: {
    title: 'XperienceClimb - Escalada no Morro Araçoiaba',
    description: 'Experiências únicas de escalada na Floresta Nacional de Ipanema',
    images: ['/images/site.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XperienceClimb - Escalada no Morro Araçoiaba',
    description: 'Experiências únicas de escalada na Floresta Nacional de Ipanema',
    images: ['/images/site.png'],
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>
          <PrivyProvider>
            {children}
          </PrivyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 