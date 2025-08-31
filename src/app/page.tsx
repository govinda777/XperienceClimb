import { Navigation } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  PackagesSection,
  IncludedServicesSection,
  GallerySection,
  SafetySection,
  InsuranceSection,
  CommunitySection,
  LocationSection,
  Footer,
} from '@/components/sections';
import { CartButton, CartModal } from '@/components/cart';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PackagesSection />
      <IncludedServicesSection />
      <GallerySection />
      <SafetySection />
      <InsuranceSection />
      <CommunitySection />
      <LocationSection />
      {/* <TestimonialsSection /> */}
      <Footer />

      {/* Floating Cart Button */}
      <CartButton />

      {/* Cart Modal */}
      <CartModal />
    </main>
  );
}
