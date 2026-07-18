import { Package } from '@/core/entities/Package';
import {
  ActiveSiteContent,
  DestinationContent,
  HomePageContent,
  IContentRepository,
  TestimonialContent,
  ServiceContent,
  SafetyProcedureContent,
  VisitedLocationContent,
} from '@/core/repositories/IContentRepository';
import { ConfigService } from '@/infrastructure/services/ConfigService';
import { LegacyContentRepository } from './LegacyContentRepository';
import { createClient } from '@sanity/client';

export class SanityContentRepository implements IContentRepository {
  private client: any;
  private readonly fallbackRepository: LegacyContentRepository;

  constructor() {
    this.fallbackRepository = new LegacyContentRepository();

    // Centralized Sanity credentials from ConfigService
    const projectId = ConfigService.getSanityProjectId();
    const dataset = ConfigService.getSanityDataset();

    this.client = createClient({
      projectId,
      dataset,
      apiVersion: '2026-07-16',
      useCdn: process.env.NODE_ENV === 'production',
      token: ConfigService.getSanityReadToken(),
    });
  }

  async getActiveSite(): Promise<ActiveSiteContent | null> {
    try {
      const query = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
        nextEventStartsAt,
        contactInfo,
        footerSettings,
        activeDestination-> {
          "id": slug.current,
          name,
          isPublished,
          eventStatus,
          visualConfig,
          locationDetails,
          content {
            hero {
              title,
              subtitle,
              description,
              "backgroundImage": backgroundImage.asset->url,
              ctaLabel,
              ctaHref
            },
            about {
              title,
              description,
              highlights,
              infoBox,
              "image": image.asset->url
            }
          },
          beginnerSection,
          safetySection,
          gallery {
            categories,
            images[] {
              "src": image.asset->url,
              alt,
              title,
              category
            }
          },
          timeline,
          logistics,
          activities,
          seo {
            title,
            description,
            keywords,
            "ogImage": ogImage.asset->url,
            noIndex
          },
          community {
            instructors[]-> {
              name,
              "photo": photo.asset->url,
              role,
              certifications,
              specialties
            },
            partners[]-> {
              name,
              "logo": logo.asset->url,
              websiteUrl
            }
          }
        }
      }`;
      const settings = await this.client.fetch(query);
      if (!settings) return this.fallbackRepository.getActiveSite();
      return {
        nextEventStartsAt: settings.nextEventStartsAt,
        contactInfo: settings.contactInfo || {},
        footerSettings: settings.footerSettings || {},
        activeDestination: settings.activeDestination
          ? this.mapDestination(settings.activeDestination)
          : null,
      };
    } catch (error) {
      console.error('Error fetching siteSettings from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.getActiveSite();
    }
  }

  async getHomePage(): Promise<HomePageContent | null> {
    try {
      const query = `*[_type == "homePage" && _id == "homePage"][0] {
        title,
        sectionOrder,
        calendarSection,
        packagesSection {
          title,
          description,
          "packageRefs": packageRefs[]->slug.current
        },
        includedServicesSection,
        safetySection,
        communitySection,
        testimonialsSection
      }`;
      const homePage = await this.client.fetch(query);
      if (!homePage) return this.fallbackRepository.getHomePage();
      return {
        title: homePage.title,
        sectionOrder: homePage.sectionOrder || [],
        calendarSection: homePage.calendarSection,
        packagesSection: homePage.packagesSection,
        includedServicesSection: homePage.includedServicesSection,
        safetySection: homePage.safetySection,
        communitySection: homePage.communitySection,
        testimonialsSection: homePage.testimonialsSection,
      };
    } catch (error) {
      console.error('Error fetching homePage from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.getHomePage();
    }
  }

  async getDestinationBySlug(slug: string): Promise<DestinationContent | null> {
    try {
      const query = `*[_type == "destination" && slug.current == $slug && isPublished == true][0] {
        "id": slug.current,
        name,
        isPublished,
        eventStatus,
        visualConfig,
        locationDetails,
        content {
          hero {
            title,
            subtitle,
            description,
            "backgroundImage": backgroundImage.asset->url,
            ctaLabel,
            ctaHref
          },
          about {
            title,
            description,
            highlights,
            infoBox,
            "image": image.asset->url
          }
        },
        beginnerSection,
        safetySection,
        gallery {
          categories,
          images[] {
            "src": image.asset->url,
            alt,
            title,
            category
          }
        },
        timeline,
        logistics,
        activities,
        seo {
          title,
          description,
          keywords,
          "ogImage": ogImage.asset->url,
          noIndex
        },
        community {
          instructors[]-> {
            name,
            "photo": photo.asset->url,
            role,
            certifications,
            specialties
          },
          partners[]-> {
            name,
            "logo": logo.asset->url,
            websiteUrl
          }
        }
      }`;
      const dest = await this.client.fetch(query, { slug });
      if (!dest) return this.fallbackRepository.getDestinationBySlug(slug);
      return this.mapDestination(dest);
    } catch (error) {
      console.error(
        `Error fetching destination by slug ${slug} from Sanity, falling back to legacy/mock:`,
        error
      );
      return this.fallbackRepository.getDestinationBySlug(slug);
    }
  }

  async listDestinations(): Promise<DestinationContent[]> {
    try {
      const query = `*[_type == "destination" && isPublished == true] {
        "id": slug.current,
        name,
        isPublished,
        eventStatus,
        visualConfig,
        locationDetails,
        content {
          hero {
            title,
            subtitle,
            description,
            "backgroundImage": backgroundImage.asset->url,
            ctaLabel,
            ctaHref
          },
          about {
            title,
            description,
            highlights,
            infoBox,
            "image": image.asset->url
          }
        }
      }`;
      const destinations = await this.client.fetch(query);
      if (!destinations || destinations.length === 0)
        return this.fallbackRepository.listDestinations();
      return destinations.map((d: any) => this.mapDestination(d));
    } catch (error) {
      console.error('Error listing destinations from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.listDestinations();
    }
  }

  async listPublishedPackages(): Promise<Package[]> {
    try {
      const query = `*[_type == "package" && !(_id in path('drafts.**'))] {
        "id": slug.current,
        name,
        kind,
        summary,
        description,
        badge,
        isFeatured,
        "coverImage": coverImage.asset->url,
        includedItems,
        cta,
        termsUrl,
        cancellationPolicy,
        eligibility,
        isQuotation,
        priceInCents,
        currency,
        commerceProductId,
        singleTripDestination-> {
          "id": slug.current
        }
      }`;
      const pkgs = await this.client.fetch(query);
      if (!pkgs || pkgs.length === 0) return this.fallbackRepository.listPublishedPackages();
      return pkgs.map((p: any) => this.mapPackage(p));
    } catch (error) {
      console.error('Error listing packages from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.listPublishedPackages();
    }
  }

  async listTestimonials(): Promise<TestimonialContent[]> {
    try {
      const query = `*[_type == "testimonial" && consent == true && !(_id in path('drafts.**'))] | order(order asc) {
        name,
        "photo": photo.asset->url,
        text,
        date,
        experience,
        rating
      }`;
      const testimonials = await this.client.fetch(query);
      if (!testimonials || testimonials.length === 0)
        return this.fallbackRepository.listTestimonials();
      return testimonials;
    } catch (error) {
      console.error('Error listing testimonials from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.listTestimonials();
    }
  }

  async listIncludedServices(): Promise<ServiceContent[]> {
    try {
      const query = `*[_type == "service" && !(_id in path('drafts.**'))] | order(order asc) {
        title,
        description,
        iconKey,
        condition
      }`;
      const services = await this.client.fetch(query);
      if (!services || services.length === 0) return this.fallbackRepository.listIncludedServices();
      return services;
    } catch (error) {
      console.error('Error listing services from Sanity, falling back to legacy/mock:', error);
      return this.fallbackRepository.listIncludedServices();
    }
  }

  async listSafetyProcedures(): Promise<SafetyProcedureContent[]> {
    try {
      const query = `*[_type == "safetyProcedure" && !(_id in path('drafts.**'))] | order(order asc) {
        title,
        description,
        details,
        iconKey
      }`;
      const safetyProcedures = await this.client.fetch(query);
      if (!safetyProcedures || safetyProcedures.length === 0)
        return this.fallbackRepository.listSafetyProcedures();
      return safetyProcedures;
    } catch (error) {
      console.error(
        'Error listing safetyProcedures from Sanity, falling back to legacy/mock:',
        error
      );
      return this.fallbackRepository.listSafetyProcedures();
    }
  }

  async listVisitedLocations(): Promise<VisitedLocationContent[]> {
    try {
      const query = `*[_type == "visitedLocation" && !(_id in path('drafts.**'))] {
        name,
        "slug": slug.current,
        region,
        "image": image.asset->url,
        description,
        status
      }`;
      const visitedLocations = await this.client.fetch(query);
      if (!visitedLocations || visitedLocations.length === 0)
        return this.fallbackRepository.listVisitedLocations();
      return visitedLocations;
    } catch (error) {
      console.error(
        'Error listing visitedLocations from Sanity, falling back to legacy/mock:',
        error
      );
      return this.fallbackRepository.listVisitedLocations();
    }
  }

  private mapDestination(dest: any): DestinationContent {
    return {
      id: dest.id || (dest.slug ? dest.slug.current : ''),
      name: dest.name,
      isPublished: dest.isPublished !== false,
      eventStatus: dest.eventStatus || 'planned',
      visualConfig: dest.visualConfig || {},
      locationDetails: dest.locationDetails || {},
      content: dest.content || {},
      beginnerSection: dest.beginnerSection || {},
      safetySection: dest.safetySection || {},
      gallery: dest.gallery || {},
      timeline: dest.timeline || [],
      logistics: dest.logistics || {},
      activities: dest.activities || [],
      seo: dest.seo || {},
      instructors: dest.instructors || [],
      partners: dest.partners || [],
    };
  }

  private mapPackage(pkg: any): Package {
    return {
      id: pkg.id,
      name: pkg.name,
      price: pkg.isQuotation
        ? { amount: 0, currency: 'BRL' }
        : { amount: pkg.priceInCents || 0, currency: 'BRL' },
      description: pkg.summary || '',
      features: pkg.includedItems ? pkg.includedItems.map((item: any) => item.title) : [],
      originalPrice: pkg.isQuotation ? undefined : pkg.priceInCents,
      cancellationPolicy: pkg.cancellationPolicy,
      requirements: pkg.eligibility,
      isActive: true,
      category: pkg.kind === 'annual' ? 'annual' : 'singleTrip',
      location: pkg.singleTripDestination ? pkg.singleTripDestination.id : undefined,
    };
  }
}
