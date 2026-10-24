import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://climb.xperiencehubs.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-11T00:00:00-03:00'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinos/pedra-bela`,
      lastModified: new Date('2026-10-11T00:00:00-03:00'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinos/fazenda-ipanema`,
      lastModified: new Date('2026-10-11T00:00:00-03:00'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guia-escalada-iniciantes-sp`,
      lastModified: new Date('2026-10-11T00:00:00-03:00'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date('2026-09-19T00:00:00-03:00'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: new Date('2026-09-19T00:00:00-03:00'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
