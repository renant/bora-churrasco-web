import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      {
        userAgent: '*',
        allow: ['/recipes/', '/blog/', '/resultado/'],
      },
    ],
    sitemap: 'https://www.borachurrasco.app/sitemap.xml',
    host: 'https://www.borachurrasco.app',
  };
}
