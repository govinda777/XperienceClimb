import { getContentRepository } from '@/infrastructure/repositories/ContentRepositoryFactory';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Navigation } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  BeginnerSection,
  CalendarSection,
  PackagesSection,
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
import { ConfigService } from '@/infrastructure/services/ConfigService';

export const revalidate = 3600; // 1 hour cached statically

export default async function Home() {
  const cmsEnabled = ConfigService.getCmsEnabled();
  const repository = getContentRepository();

  // Fetch CMS settings
  const activeSite = await repository.getActiveSite();
  const homePage = await repository.getHomePage();
  const testimonials = await repository.listTestimonials();
  const services = await repository.listIncludedServices();
  const safetyProcedures = await repository.listSafetyProcedures();
  const visitedLocations = await repository.listVisitedLocations();

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

  const servicesCmsData = services && services.length > 0 ? {
    title: homePage?.includedServicesSection?.title,
    description: homePage?.includedServicesSection?.description,
    services
  } : undefined;

  const testimonialsCmsData = testimonials && testimonials.length > 0 ? {
    title: homePage?.testimonialsSection?.title,
    description: homePage?.testimonialsSection?.description,
    testimonials
  } : undefined;

  const communityCmsData = (visitedLocations && visitedLocations.length > 0) || (safetyProcedures && safetyProcedures.length > 0) || activeDest?.instructors ? {
    title: homePage?.communitySection?.title,
    description: homePage?.communitySection?.description,
    instructors: activeDest?.instructors,
    procedures: safetyProcedures,
    locations: visitedLocations
  } : undefined;

  const safetyCmsData = activeDest?.safetySection ? {
    title: homePage?.safetySection?.title || activeDest.safetySection.title,
    description: homePage?.safetySection?.description || activeDest.safetySection.description,
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
              return <PackagesSection key="packages-group" cmsData={packagesCmsData} />;
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
