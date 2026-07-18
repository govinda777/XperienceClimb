import { notFound } from 'next/navigation';
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const cmsEnabled = ConfigService.getCmsEnabled();
  const repository = getContentRepository();
  const destination = await repository.getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  // Fetch standard page components
  const homePage = await repository.getHomePage();
  const testimonials = await repository.listTestimonials();
  const services = await repository.listIncludedServices();
  const safetyProcedures = await repository.listSafetyProcedures();
  const visitedLocations = await repository.listVisitedLocations();

  // Map ActiveSiteContent structure for the ThemeProvider
  const mockActiveSite = {
    nextEventStartsAt: '',
    contactInfo: { phone: '', email: '', instagram: '' },
    footerSettings: { certificationsText: '', legalText: '' },
    activeDestination: destination,
  };

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

  // Prop Mappers
  const heroCmsData = destination.content?.hero ? {
    title: destination.content.hero.title,
    subtitle: destination.content.hero.subtitle,
    description: destination.content.hero.description,
    backgroundImage: destination.content.hero.backgroundImage
  } : undefined;

  const aboutCmsData = destination.content?.about ? {
    title: destination.content.about.title,
    description: destination.content.about.description,
    highlights: destination.content.about.highlights,
    image: destination.content.about.image
  } : undefined;

  const beginnerCmsData = destination.beginnerSection ? {
    title: destination.beginnerSection.title,
    description: destination.beginnerSection.description,
    highlights: destination.beginnerSection.highlights
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

  const communityCmsData = (visitedLocations && visitedLocations.length > 0) || (safetyProcedures && safetyProcedures.length > 0) || destination.instructors ? {
    title: homePage?.communitySection?.title,
    description: homePage?.communitySection?.description,
    instructors: destination.instructors,
    procedures: safetyProcedures,
    locations: visitedLocations
  } : undefined;

  const safetyCmsData = destination.safetySection ? {
    title: homePage?.safetySection?.title || destination.safetySection.title,
    description: destination.safetySection.description || destination.safetySection.description,
    safetyItems: destination.safetySection.safetyItems,
    equipmentList: destination.safetySection.equipmentList
  } : undefined;

  return (
    <ThemeProvider initialCmsEnabled={cmsEnabled} initialActiveSite={mockActiveSite}>
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
