import { notFound } from 'next/navigation';
import { SanityContentRepository } from '@/infrastructure/repositories/SanityContentRepository';
import { ThemeProvider } from '@/themes/ThemeProvider';
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
  Footer,
} from '@/components/sections';
import { CartButton, CartModal } from '@/components/cart';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = new SanityContentRepository();
  const destination = await repository.getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  // Map ActiveSiteContent structure for the ThemeProvider
  const mockActiveSite = {
    nextEventStartsAt: '',
    contactInfo: { phone: '', email: '', instagram: '' },
    footerSettings: { certificationsText: '', legalText: '' },
    activeDestination: destination,
  };

  return (
    <ThemeProvider initialCmsEnabled={true} initialActiveSite={mockActiveSite}>
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
        <Footer />

        {/* Floating Cart Button */}
        <CartButton />

        {/* Cart Modal */}
        <CartModal />
      </main>
    </ThemeProvider>
  );
}
