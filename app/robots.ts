import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/adminlogin', '/api/*'],
    },
    sitemap: 'https://irkinnovations.com/sitemap.xml',
  };
}
