import type { Metadata } from 'next';
import { Navigation } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  BeginnerSection,
  CalendarSection,
  PackagesSection,
  AnnualPackageSection,
  ScheduleSection,
  TimelineSection,
  GallerySection,
  SafetySection,
  CommunitySection,
  LocationSection,
  FAQSection,
  Footer,
} from '@/components/sections';
import { CartButton, CartModal } from '@/components/cart';

export const metadata: Metadata = {
  title: 'Vivência de Escalada em Pedra Bela - SP | Xperience Climb',
  description:
    'Vivência de escalada em rocha natural em Pedra Bela - SP. Guias certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso. Reserve já!',
  alternates: {
    canonical: 'https://climb.xperiencehubs.com',
  },
  openGraph: {
    title: 'Vivência de Escalada em Pedra Bela - SP | Xperience Climb',
    description:
      'Vivência de escalada em rocha natural em Pedra Bela - SP. Guias certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso. Reserve já!',
    url: 'https://climb.xperiencehubs.com',
    images: [
      {
        url: '/images/site-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Vivência de Escalada em Pedra Bela - SP | Xperience Climb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivência de Escalada em Pedra Bela - SP | Xperience Climb',
    description:
      'Vivência de escalada em rocha natural em Pedra Bela - SP. Guias certificados, equipamentos homologados UIAA/CE, seguro aventura e almoço incluso. Reserve já!',
    images: ['/images/site-og.jpg'],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <BeginnerSection />
      <CalendarSection />
      <PackagesSection />
      <AnnualPackageSection />
      <ScheduleSection />
      <TimelineSection />
      <GallerySection />
      <SafetySection />
      <CommunitySection />
      <LocationSection />
      <FAQSection />
      {/* <TestimonialsSection /> */}
      <Footer />

      {/* Floating Cart Button */}
      <CartButton />

      {/* Cart Modal */}
      <CartModal />
    </main>
  );
}
