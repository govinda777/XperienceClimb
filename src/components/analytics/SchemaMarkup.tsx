'use client';

import React from 'react';
import Script from 'next/script';
import { PACKAGES } from '@/lib/constants';

export function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Xperience Climb",
    "image": "https://climb.xperiencehubs.com/images/site-og.jpg",
    "description": "Viva uma experiência única de escalada e superação ao ar livre em Pedra Bela.",
    "url": "https://climb.xperiencehubs.com",
    "telephone": "+5511995413539",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Estrada da Pedra Bela",
      "addressLocality": "Pedra Bela",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -22.7958,
      "longitude": -46.4462
    },
    "sameAs": [
      "https://instagram.com/xperiencehubs"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": Object.values(PACKAGES).map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pkg.name,
        "description": pkg.description,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "price": (pkg.price / 100).toString(),
          "availability": pkg.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
