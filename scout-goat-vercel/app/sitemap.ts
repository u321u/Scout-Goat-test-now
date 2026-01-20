import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://scoutgoatservices.com';
  const now = new Date();

  const pages = [
    '/',
    '/quote',
    '/junk-removal',
    '/house-cleaning',
    '/pressure-washing',
    '/pricing',
    '/service-areas',
    '/contact'
  ];

  return pages.map((p) => ({
    url: `${site}${p}`,
    lastModified: now,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : p === '/quote' ? 0.9 : 0.8
  }));
}
