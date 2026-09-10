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
