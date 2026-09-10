import React from 'react';
import { CONTACT_INFO, PACKAGES, AVAILABLE_DATES } from '@/lib/constants';
import { FAQ_DATA } from '@/lib/faq-data';

export default function StructuredData() {
  const baseUrl = 'https://climb.xperiencehubs.com';

  // 1. LocalBusiness / TouristAttraction / SportsActivityLocation
  const localBusinessSchema = {
    '@type': ['TouristAttraction', 'SportsActivityLocation', 'LocalBusiness'],
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Xperience Climb - Batismo de Escalada e Aventura em Pedra Bela',
    description:
      'Vivências de escalada em rocha natural e ecoturismo de aventura na Pedra do Santuário em Pedra Bela - SP. Instrução especializada, equipamentos UIAA/CE e total segurança.',
    url: baseUrl,
    telephone: '+55-11-99541-3539',
    email: CONTACT_INFO.email,
    priceRange: '$$',
    image: `${baseUrl}/images/site.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Bernardino de Lima Paes, 07 - Centro (Padaria São João)',
      addressLocality: 'Pedra Bela',
      addressRegion: 'SP',
      postalCode: '12990-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.78544,
      longitude: -46.45512,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:45',
        closes: '17:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'São Paulo' },
      { '@type': 'City', name: 'Pedra Bela' },
      { '@type': 'City', name: 'Bragança Paulista' },
      { '@type': 'City', name: 'Campinas' },
      { '@type': 'City', name: 'Atibaia' },
    ],
    sameAs: [`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`],
  };

  // 2. Products / Offers
  const productSchemas = [PACKAGES.basico, PACKAGES.intermediario, PACKAGES.avancado]
    .filter(Boolean)
    .map(pkg => ({
      '@type': 'Product',
      '@id': `${baseUrl}/#product-${pkg.id}`,
      name: `${pkg.name} - Escalada em Pedra Bela`,
      description: `${pkg.description} Inclui: ${pkg.features.join(', ')}.`,
      image: `${baseUrl}/images/site.png`,
      brand: {
        '@type': 'Brand',
        name: 'Xperience Climb',
      },
      offers: {
        '@type': 'Offer',
        price: (pkg.price / 100).toFixed(2),
        priceCurrency: 'BRL',
        availability: pkg.disabled ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        url: `${baseUrl}/#pacotes`,
        priceValidUntil: '2026-12-31',
        seller: {
          '@id': `${baseUrl}/#localbusiness`,
        },
      },
    }));

  // 3. Event (Próxima Saída Confirmada)
  const eventSchema = {
    '@type': 'Event',
    '@id': `${baseUrl}/#event-proxima-saida`,
    name: 'Saída de Escalada em Rocha e Batismo - Pedra Bela',
    description:
      'Experiência imersiva de batismo de escalada em rocha natural no Campo Escola de Pedra Bela - SP com instrutores certificados, seguro aventura e almoço completo incluso.',
    startDate: `${AVAILABLE_DATES.singleDateISO}T08:45:00-03:00`,
    endDate: `${AVAILABLE_DATES.singleDateISO}T17:00:00-03:00`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: `${baseUrl}/images/site.png`,
    location: {
      '@type': 'Place',
      name: 'Padaria São João (Ponto de Encontro) / Pedra do Santuário',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Bernardino de Lima Paes, 07 - Centro',
        addressLocality: 'Pedra Bela',
        addressRegion: 'SP',
        postalCode: '12990-000',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -22.78544,
        longitude: -46.45512,
      },
    },
    organizer: {
      '@id': `${baseUrl}/#localbusiness`,
    },
    offers: {
      '@type': 'Offer',
      price: (PACKAGES.basico.price / 100).toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/#pacotes`,
      validFrom: '2026-01-01',
    },
  };

  // 4. FAQPage Schema
  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${baseUrl}/#faq`,
    mainEntity: FAQ_DATA.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Unified Graph
  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, ...productSchemas, eventSchema, faqSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
    />
  );
}
