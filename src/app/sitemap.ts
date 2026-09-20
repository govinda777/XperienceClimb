import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://climb.xperiencehubs.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-09-19T00:00:00-03:00'),
      changeFrequency: 'weekly',
      priority: 1.0,
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
