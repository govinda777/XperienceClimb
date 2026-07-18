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
  TimelineSection,
  GallerySection,
  SafetySection,
  CommunitySection,
  LocationSection,
  Footer,
  IncludedServicesSection,
  TestimonialsSection,
} from '@/components/sections';
import { CartButton, CartModal } from '@/components/cart';

export const revalidate = 3600; // 1 hour cached statically

export default async function Home() {
  const cmsEnabled = process.env.NEXT_PUBLIC_CMS_ENABLED === 'true';
  const repository = new SanityContentRepository();

  // Fetch CMS settings
  const activeSite = cmsEnabled ? await repository.getActiveSite() : null;
  const homePage = cmsEnabled ? await repository.getHomePage() : null;
  const testimonials = cmsEnabled ? await repository.listTestimonials() : undefined;
  const services = cmsEnabled ? await repository.listIncludedServices() : undefined;
  const safetyProcedures = cmsEnabled ? await repository.listSafetyProcedures() : undefined;
  const visitedLocations = cmsEnabled ? await repository.listVisitedLocations() : undefined;

  // Build section order from CMS page config or fallback to default
  const defaultSectionOrder = [
    'hero',
    'about',
    'beginner',
    'calendar',
    'packages',
    'includedServices',
    'timeline',
    'gallery',
    'safety',
    'community',
    'location',
    'testimonials'
  ];

  const sectionOrder = homePage?.sectionOrder || defaultSectionOrder;

  const activeDest = activeSite?.activeDestination;

  // Mappers for prop injection
  const heroCmsData = activeDest?.content?.hero ? {
    title: activeDest.content.hero.title,
    subtitle: activeDest.content.hero.subtitle,
    description: activeDest.content.hero.description,
    backgroundImage: activeDest.content.hero.backgroundImage
  } : undefined;

  const aboutCmsData = activeDest?.content?.about ? {
    title: activeDest.content.about.title,
    description: activeDest.content.about.description,
    highlights: activeDest.content.about.highlights,
    image: activeDest.content.about.image
  } : undefined;

  const beginnerCmsData = activeDest?.beginnerSection ? {
    title: activeDest.beginnerSection.title,
    description: activeDest.beginnerSection.description,
    highlights: activeDest.beginnerSection.highlights
  } : undefined;

  const calendarCmsData = homePage?.calendarSection ? {
    title: homePage.calendarSection.title,
    description: homePage.calendarSection.description
  } : undefined;

  const packagesCmsData = homePage?.packagesSection ? {
    title: homePage.packagesSection.title,
    description: homePage.packagesSection.description
  } : undefined;

  const servicesCmsData = services ? {
    title: "Tudo Incluso nas Nossas Aventuras",
    description: "Cuidamos de toda a alimentação e hidratação para você.",
    services
  } : undefined;

  const testimonialsCmsData = testimonials ? {
    title: "O Que Nossos Aventureiros Dizem",
    description: "Centenas de escaladores já viveram essa experiência com a Xperience Climb.",
    testimonials
  } : undefined;

  const communityCmsData = visitedLocations || safetyProcedures || activeDest?.instructors ? {
    title: "Nossa Comunidade",
    description: "Os melhores guias, protocolos e locais em um só lugar.",
    instructors: activeDest?.instructors,
    procedures: safetyProcedures,
    locations: visitedLocations
  } : undefined;

  const safetyCmsData = activeDest?.safetySection ? {
    title: activeDest.safetySection.title,
    description: activeDest.safetySection.description,
    safetyItems: activeDest.safetySection.safetyItems,
    equipmentList: activeDest.safetySection.equipmentList
  } : undefined;

  return (
    <ThemeProvider initialCmsEnabled={cmsEnabled} initialActiveSite={activeSite}>
      <main className="min-h-screen">
        <Navigation />

        {/* Render sections conditionally and in order if defined */}
        {sectionOrder.map((sectionKey) => {
          switch (sectionKey) {
            case 'hero':
              return <HeroSection key="hero" cmsData={heroCmsData} />;
            case 'about':
              return <AboutSection key="about" cmsData={aboutCmsData} />;
            case 'beginner':
              return <BeginnerSection key="beginner" cmsData={beginnerCmsData} />;
            case 'calendar':
              return <CalendarSection key="calendar" cmsData={calendarCmsData} />;
            case 'packages':
              return (
                <div key="packages-group">
                  <PackagesSection cmsData={packagesCmsData} />
                  <AnnualPackageSection />
                </div>
              );
            case 'includedServices':
              return <IncludedServicesSection key="includedServices" cmsData={servicesCmsData} />;
            case 'timeline':
              return <TimelineSection key="timeline" />;
            case 'gallery':
              return <GallerySection key="gallery" />;
            case 'safety':
              return <SafetySection key="safety" cmsData={safetyCmsData} />;
            case 'community':
              return <CommunitySection key="community" cmsData={communityCmsData} />;
            case 'location':
              return <LocationSection key="location" />;
            case 'testimonials':
              return <TestimonialsSection key="testimonials" cmsData={testimonialsCmsData} />;
            default:
              return null;
          }
        })}

        <Footer />

        {/* Floating Cart Button */}
        <CartButton />

        {/* Cart Modal */}
        <CartModal />
      </main>
    </ThemeProvider>
  );
}
