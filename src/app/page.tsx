import { Navigation } from '@/components/layout';
import { HeroSection, PackagesSection } from '@/components/sections';
import { CartButton, CartModal } from '@/components/cart';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PackagesSection />
      
      {/* Floating Cart Button */}
      <CartButton />

      {/* Cart Modal */}
      <CartModal />

    </main>
  )
} 