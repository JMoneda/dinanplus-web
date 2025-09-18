// app/robots.ts  
// Robots.txt optimizado
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/catalogo',
          '/catalogo/',
          '/contacto',
        ],
        disallow: [
          '/admin/',
          '/login',
          '/checkout',
          '/api/',
          '/private/',
          '/_next/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/catalogo',
          '/catalogo/',
          '/contacto', 
        ],
        disallow: [
          '/admin/',
          '/login',
          '/checkout',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://dinanplus-web.vercel.app//sitemap.xml',
  }
}