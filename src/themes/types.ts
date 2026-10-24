import { StaticImageData } from 'next/image';

export interface DirectionStep {
  step: number;
  title: string;
  description: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  title: string;
  category: string;
  tag?: string;
  tagColor?: 'forest' | 'terracotta' | 'sun';
  isExternal?: boolean;
  externalDomain?: string;
  isVideo?: boolean;
}

export interface GalleryVideo {
  src: string;
  tag: string;
  tagColor?: 'forest' | 'terracotta';
  title: string;
  icon: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  meetingPointName?: string;
  meetingPointAddress?: string;
  meetingPointMapsUrl?: string;
  meetingPointNotes?: string;
  directions: DirectionStep[];
}

export interface ContentInfo {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    highlights: Highlight[];
    infoBox: {
      title: string;
      content: string;
    };
    image?: string | StaticImageData;
  };
}

export interface GalleryInfo {
  images: GalleryImage[];
  categories: Record<string, string>;
  videos?: GalleryVideo[];
}

export interface ActivityInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  duration?: string;
  price?: number;
}

export interface LogisticsInfo {
  schedule: {
    openTime: string;
    closeTime: string;
    notes?: string;
  };
  meetingPoint: string;
  importantNotes: string[];
  tips: string[];
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface CommunityInfo {
  localPartners: string[];
  localInstructors: string[];
  specificSafetyProcedures: string[];
  visitedLocationId?: string;
}

export interface VisualTheme {
  primaryColor: string;
  primaryColorHover: string;
  primaryColorActive: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textSecondaryColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  heroOverlay: string;
  cardBackground: string;
}

export interface TimelineEvent {
  time: string;
  activity: string;
  icon?: string;
  color?: 'forest' | 'terracotta' | 'sun';
}

export interface BeginnerInfo {
  title: string;
  description: string;
  highlights: Highlight[];
  finalMessage: string;
}

// =========================================================================
// NOVO DESIGN EDITORIAL & ESPECIFICAÇÃO DE SEÇÕES (DESIGN SYSTEM OFICIAL)
// =========================================================================

export interface BrandConfig {
  name: string;
  accent: string;
  tagline: string;
  icon: string;
  navLinks: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
}

export interface HeroConfig {
  badge: string;
  title: {
    line1: string;
    line2: string;
    line3Highlight: string;
    line4Prefix: string;
    line4Italic: string;
  };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  photo: {
    src: string;
    alt: string;
    topMetaBadge: string;
    bottomMetaBadge: string;
    sideBadges: string[];
    authorQuote: {
      author: string;
      quote: string;
      icon: string;
    };
    botanicalLeavesSvg: string;
  };
}

export interface DestinationCard {
  id: string;
  badgeNumber: string;
  badgeColor: 'forest' | 'terracotta' | 'sun';
  title: string;
  description: string;
  tag: string;
  image: string;
  alt: string;
}

export interface DestinationSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  cards: DestinationCard[];
}

export interface BeginnerSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  polaroid: {
    badge: string;
    illustrationSvg: string;
    alt: string;
    title: string;
    description: string;
    footerNote: string;
  };
  benefitCards: Array<{
    tag: string;
    tagColor: 'forest' | 'terracotta';
    title: string;
    description: string;
  }>;
}

export interface CalendarItemConfig {
  day: string;
  monthYear: string;
  status: string;
  statusColor: 'forest' | 'terracotta' | 'sun';
  ribbon?: string;
  durationType: string;
  title: string;
  location: string;
  distance: string;
  features: string[];
  spots: string;
  spotsColor: 'forest' | 'terracotta' | 'sun';
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
}

export interface CalendarSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: CalendarItemConfig[];
}

export interface PackageCardConfig {
  id: string;
  badge: string;
  badgeColor: 'forest' | 'terracotta' | 'forest-dark';
  statusBadge?: string;
  headerColor: 'forest' | 'terracotta' | 'forest-dark';
  prefix: string;
  name: string;
  duration: string;
  level: string;
  levelColor: string;
  description: string;
  originalPrice?: number;
  originalPriceFormatted?: string;
  price?: number;
  priceFormatted?: string;
  priceUnit?: string;
  installment?: string;
  features?: string[];
  bonusTitle?: string;
  bonus?: string[];
  statusText?: string;
  statusSubtext?: string;
  disabled: boolean;
  ctaText: string;
  ctaHref?: string;
  buttonStyle: 'terracotta' | 'disabled';
}

export interface PackageConfirmedDateConfig {
  prefix: string;
  date: string;
  otherDateCta: {
    label: string;
    href: string;
  };
}

export interface PackageAnnualBannerConfig {
  badge: string;
  title: string;
  description: string;
  duration: string;
  features: string[];
  bonusTitle?: string;
  bonus?: string[];
  rightTag?: string;
  rightHighlight?: string;
  ctaText: string;
  ctaHref: string;
}

export interface PackagesSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  nextConfirmedDate?: PackageConfirmedDateConfig;
  items: PackageCardConfig[];
  corporateCard?: PackageAnnualBannerConfig;
  annualCard?: PackageAnnualBannerConfig;
}

export interface ScheduleSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  hoursCard: {
    icon: string;
    tag: string;
    time: string;
    description: string;
  };
  checklistCard: {
    icon: string;
    title: string;
    items: string[];
  };
  corporateCard: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
  guideSupportCard: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

export interface SafetySectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  equipmentIcons: Array<{
    src: string;
    alt: string;
  }>;
  protocols: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface TimelineSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  events: TimelineEvent[];
}

export interface GalleryImageConfig {
  src: string;
  alt: string;
  tag: string;
  tagColor: 'forest' | 'terracotta' | 'sun';
  title: string;
  category?: 'escalada' | 'grupo' | 'paisagem';
  isExternal?: boolean;
}

export interface GalleryVideoConfig {
  src: string;
  tag: string;
  tagColor: 'forest' | 'terracotta';
  title: string;
  icon: string;
  category?: 'videos';
}

export interface GalleryCategoryTab {
  id: string;
  label: string;
}

export interface GallerySectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  categories?: GalleryCategoryTab[];
  images: GalleryImageConfig[];
  videos: GalleryVideoConfig[];
}

export interface InstructorConfig {
  name: string;
  photo: string;
  rating: string;
  location: string;
  experience: string;
  clients: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  priceRange: string;
  whatsapp: string;
  instagram: string;
}

export interface VisitedLocationConfig {
  name: string;
  location: string;
  difficulty: string;
  description: string;
  highlights: string;
  image: string;
}

export interface CommunitySectionConfig {
  title: string;
  titleAccent: string;
  description: string;
  stats: {
    instructorsCount: number;
    locationsCount: number;
  };
  instructors: InstructorConfig[];
  locations: VisitedLocationConfig[];
}

export interface LocationPointConfig {
  badge: string;
  badgeColor: 'terracotta' | 'forest';
  subtitle: string;
  title: string;
  address: string;
  notes: Array<{
    icon: string;
    text: string;
  }>;
  mapsUrl: string;
  buttonText: string;
  buttonColor: 'forest' | 'terracotta';
}

export interface LocationSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  points: LocationPointConfig[];
}

export interface FAQItem {
  question: string;
  answer: string;
  isOpenByDefault?: boolean;
}

export interface FAQSectionConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: FAQItem[];
}

export interface FooterConfig {
  brand: {
    name: string;
    accent: string;
    tagline: string;
    description: string;
    seal: string;
    logo?: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  experienceLinks: Array<{ label: string; href: string }>;
  contact: {
    whatsapp: string;
    whatsappFormatted: string;
    instagram: string;
    instagramHandle: string;
    email: string;
    ctaText: string;
    ctaHref: string;
  };
  legal: {
    copyright: string;
    privacyHref: string;
    termsHref: string;
    backToTopHref: string;
  };
}

export interface FloatingCtaConfig {
  icon: string;
  tag: string;
  title: string;
  href: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  location: LocationInfo;
  content: ContentInfo;
  gallery: GalleryInfo;
  activities: ActivityInfo[];
  logistics: LogisticsInfo;
  community: CommunityInfo;
  seo: SEOInfo;
  beginner: BeginnerInfo;
  timeline: TimelineEvent[];
  visual: VisualTheme;

  // Seções editoriais completas
  brand?: BrandConfig;
  heroSection?: HeroConfig;
  destinationSection?: DestinationSectionConfig;
  beginnerSection?: BeginnerSectionConfig;
  calendarSection?: CalendarSectionConfig;
  packagesSection?: PackagesSectionConfig;
  scheduleSection?: ScheduleSectionConfig;
  safetySection?: SafetySectionConfig;
  timelineSection?: TimelineSectionConfig;
  gallerySection?: GallerySectionConfig;
  communitySection?: CommunitySectionConfig;
  locationSection?: LocationSectionConfig;
  faqSection?: FAQSectionConfig;
  footerSection?: FooterConfig;
  floatingCta?: FloatingCtaConfig;
}
