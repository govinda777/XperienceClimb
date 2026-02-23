import { Navigation } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  PackagesSection,
  IncludedServicesSection,
  GallerySection,
  SafetySection,
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
      <GallerySection />
      <SafetySection />
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
