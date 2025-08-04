import { Navigation } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  PackagesSection,
  GallerySection,
  SafetySection,
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
